/* ===================================
   CASE011 - AI Generator
   AI-powered case generation using HuggingFace
   =================================== */

// HuggingFace API configuration (Legacy/Fallback)
const HUGGINGFACE_API = 'https://api-inference.huggingface.co/models/';
const AI_MODELS = {
    textGeneration: 'mistralai/Mistral-7B-Instruct-v0.2',
    summarization: 'facebook/bart-large-cnn'
};

// Oracle Engine configuration (Transformers.js Client-side AI)
let oracleEngine = null;
const ORACLE_MODEL = 'Xenova/gpt4all-mini';

/**
 * Generate AI-powered case briefing
 * @param {Object} caseTemplate - Base case template
 * @returns {Promise<Object>} Enhanced case with AI-generated content
 */
async function generateAICase(caseTemplate) {
    try {
        const prompt = createCasePrompt(caseTemplate);
        const aiContent = await queryHuggingFace(prompt, AI_MODELS.textGeneration);

        return {
            ...caseTemplate,
            briefing: aiContent || caseTemplate.briefing,
            aiGenerated: true,
            generatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('AI generation failed, using template:', error);
        return {
            ...caseTemplate,
            aiGenerated: false
        };
    }
}

/**
 * Create prompt for AI case generation
 * @param {Object} caseTemplate - Case template
 * @returns {string} Formatted prompt
 */
function createCasePrompt(caseTemplate) {
    return `You are a detective case file writer. Create a mysterious and engaging case briefing for investigators.

Case Title: ${caseTemplate.title}
Category: ${caseTemplate.category}
Difficulty: ${caseTemplate.difficulty}

Write a compelling 3-paragraph briefing that:
1. Introduces the mystery with specific details and dates
2. Describes the puzzling evidence and unanswered questions
3. Challenges the investigator to analyze the evidence

Keep it factual, mysterious, and engaging. Write in past tense. Do not provide solutions.

Briefing:`;
}

/**
 * Query HuggingFace Inference API
 * @param {string} prompt - Input prompt
 * @param {string} model - Model name
 * @returns {Promise<string>} Generated text
 */
async function queryHuggingFace(prompt, model) {
    try {
        const response = await fetch(`${HUGGINGFACE_API}${model}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 500,
                    temperature: 0.7,
                    top_p: 0.9,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();

        if (Array.isArray(result) && result[0]?.generated_text) {
            return formatAIResponse(result[0].generated_text);
        }

        return null;
    } catch (error) {
        console.error('HuggingFace API error:', error);
        return null;
    }
}

/**
 * Format AI response into HTML paragraphs
 * @param {string} text - Raw AI text
 * @returns {string} Formatted HTML
 */
function formatAIResponse(text) {
    // Clean up the text
    const cleaned = text.trim();

    // Split into paragraphs
    const paragraphs = cleaned.split('\n\n').filter(p => p.trim().length > 0);

    // Convert to HTML
    const html = paragraphs
        .map(p => `<p>${p.trim()}</p>`)
        .join('\n            ');

    return html;
}

/**
 * Fetch real-world mysteries from Wikipedia
 * @returns {Promise<Array>} List of mystery topics
 */
async function fetchRealWorldMysteries() {
    const mysteryCategories = [
        'List_of_unsolved_deaths',
        'List_of_cryptographic_mysteries',
        'List_of_archaeological_mysteries',
        'List_of_unexplained_phenomena'
    ];

    const mysteries = [];

    for (const category of mysteryCategories) {
        try {
            const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${category}`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                mysteries.push({
                    title: data.title,
                    extract: data.extract,
                    url: data.content_urls?.desktop?.page
                });
            }
        } catch (error) {
            console.error(`Failed to fetch ${category}:`, error);
        }
    }

    return mysteries;
}

/**
 * Search for mystery-related content
 * @param {string} query - Search query
 * @returns {Promise<Array>} Search results
 */
async function searchMysteries(query) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=5&format=json&origin=*`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Search failed');
        }

        const [, titles, descriptions, urls] = await response.json();

        return titles.map((title, index) => ({
            title: title,
            description: descriptions[index],
            url: urls[index]
        }));
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

/**
 * Generate artifacts from search results
 * @param {string} caseTopic - Case topic
 * @returns {Promise<Array>} Generated artifacts
 */
async function generateArtifacts(caseTopic) {
    const artifacts = [];

    // Search Wikipedia
    const wikiResults = await searchMysteries(caseTopic);
    if (wikiResults.length > 0) {
        artifacts.push({
            type: 'article',
            title: `Wikipedia - ${wikiResults[0].title}`,
            description: wikiResults[0].description,
            url: wikiResults[0].url
        });
    }

    // Add YouTube documentary search
    const youtubeQuery = encodeURIComponent(`${caseTopic} documentary`);
    artifacts.push({
        type: 'video',
        title: `Documentary: ${caseTopic}`,
        description: 'Video investigation and analysis',
        url: `https://www.youtube.com/results?search_query=${youtubeQuery}`
    });

    // Add Google Scholar search
    const scholarQuery = encodeURIComponent(caseTopic);
    artifacts.push({
        type: 'research',
        title: `Academic Research - ${caseTopic}`,
        description: 'Scholarly articles and papers',
        url: `https://scholar.google.com/scholar?q=${scholarQuery}`
    });

    return artifacts;
}

/**
 * Create a completely new AI-generated case
 * @param {string} caseHash - Case hash for determinism
 * @returns {Promise<Object>} Generated case
 */
async function createAIGeneratedCase(caseHash) {
    try {
        // Use hash to select a mystery topic
        const topics = [
            'Bermuda Triangle disappearances',
            'Nazca Lines Peru',
            'Stonehenge construction mystery',
            'Mary Celeste ghost ship',
            'Wow signal from space',
            'Shroud of Turin authenticity',
            'Loch Ness Monster sightings',
            'Atlantis lost civilization',
            'Easter Island Moai statues',
            'Tunguska event explosion',
            'Black Dahlia murder',
            'Jack the Ripper identity',
            'Amelia Earhart disappearance',
            'Malaysian Airlines MH370',
            'Cicada 3301 puzzle',
            'Kryptos CIA sculpture',
            'Phaistos Disc inscription',
            'Linear A script Minoan',
            'Indus Valley script',
            'Rongorongo Easter Island script'
        ];

        const seed = hashString(caseHash);
        const topic = getRandomItem(topics, seed);

        // Determine category
        const category = determineCategory(topic);
        const difficulty = ['easy', 'medium', 'hard'][seed % 3];

        // Generate artifacts
        const artifacts = await generateArtifacts(topic);

        // Create template
        const template = {
            id: `ai-${caseHash}`,
            title: topic,
            category: category,
            difficulty: difficulty,
            briefing: `<p>Loading AI-generated briefing for ${topic}...</p>`,
            artifacts: artifacts
        };

        // Try to enhance with AI
        const enhancedCase = await generateAICase(template);

        return enhancedCase;
    } catch (error) {
        console.error('Failed to create AI case:', error);
        // Fallback to template-based generation
        return null;
    }
}

/**
 * Determine category from topic
 * @param {string} topic - Case topic
 * @returns {string} Category
 */
function determineCategory(topic) {
    const lowerTopic = topic.toLowerCase();

    if (lowerTopic.includes('cipher') || lowerTopic.includes('code') || lowerTopic.includes('script')) {
        return 'cryptographic';
    }
    if (lowerTopic.includes('disappear') || lowerTopic.includes('missing') || lowerTopic.includes('murder')) {
        return 'disappearance';
    }
    if (lowerTopic.includes('ancient') || lowerTopic.includes('artifact') || lowerTopic.includes('ruins')) {
        return 'archaeological';
    }
    if (lowerTopic.includes('space') || lowerTopic.includes('signal') || lowerTopic.includes('explosion')) {
        return 'scientific';
    }

    return 'historical';
}

/**
 * Initialize the Oracle Engine (Deep Archival Decryption)
 * @param {Function} progressCallback - Callback for download progress
 * @returns {Promise<boolean>} Success status
 */
async function initOracleEngine(progressCallback) {
    if (oracleEngine) return true;

    // Thematic status messages based on progress
    const getThematicMessage = (p) => {
        if (p < 30) return "ESTABLISHING SECURE CONNECTION...";
        if (p < 60) return "DECRYPTING ARCHIVAL DATA STREAMS...";
        if (p < 90) return "RECONSTRUCTING HISTORICAL FRAGMENTS...";
        return "FINALIZING DEEP ANALYSIS...";
    };

    const statusText = document.getElementById('aiStatusText');
    const progressBar = document.getElementById('aiProgressBar');
    const progressPercent = document.getElementById('aiProgressPercent');

    try {
        const { pipeline } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.3.0');

        oracleEngine = await pipeline('text-generation', ORACLE_MODEL, {
            progress_callback: (p) => {
                if (p.status === 'progress') {
                    if (statusText) statusText.textContent = getThematicMessage(p.progress);
                    if (progressBar) progressBar.style.width = `${p.progress}%`;
                    if (progressPercent) progressPercent.textContent = `${Math.round(p.progress)}%`;
                    if (progressCallback) progressCallback(p.progress);
                }
            }
        });
        return true;
    } catch (error) {
        console.error('Oracle Engine failed to boot:', error);
        return false;
    }
}

/**
 * Generate case using the Oracle Engine
 * @param {string} seed - Case seed/hash
 * @returns {Promise<Object>} Generated case
 */
async function generateWithOracle(seed) {
    if (!oracleEngine) {
        const booted = await initOracleEngine();
        if (!booted) return null;
    }

    const statusText = document.getElementById('aiStatusText');
    if (statusText) statusText.textContent = "RUNNING DEEP HEURISTIC ANALYSIS...";

    const prompt = `
    System: Act as an expert criminal investigator and historian. Generate a detailed mystery investigation file in JSON format.
    Case ID: ${seed}
    Requirement: 3 paragraphs of briefing, 3 artifacts with URLs.
    Format: JSON only.
    
    Response: { "title": "The name of the mystery", "briefing": "...", "artifacts": [...] }`;

    try {
        const result = await oracleEngine(prompt, {
            max_new_tokens: 600,
            temperature: 0.8,
            do_sample: true,
            top_p: 0.95
        });

        const text = result[0].generated_text.split('Response:')[1] || result[0].generated_text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            const caseData = JSON.parse(jsonMatch[0]);
            return {
                ...caseData,
                id: `oracle-${seed}`,
                category: determineCategory(caseData.title),
                difficulty: ['easy', 'medium', 'hard'][hashString(seed) % 3],
                aiGenerated: true,
                oracleEngine: true
            };
        }
        return null;
    } catch (error) {
        console.error('Oracle Analysis failed:', error);
        return null;
    }
}

/**
 * Enhanced case generator (Oracle Primary)
 * @param {string} hash - Case hash
 * @param {boolean} useAI - Whether to use AI generation
 * @returns {Promise<Object>} Case data
 */
async function generateCaseWithAI(hash, useAI = true) {
    // Primary: Oracle Engine (Browser-side)
    try {
        const oracleCase = await generateWithOracle(hash);
        if (oracleCase) return oracleCase;
    } catch (e) {
        console.warn('Oracle Engine failed, falling back to cloud...');
    }

    // Secondary: Cloud Fallback
    const aiCase = await createAIGeneratedCase(hash);
    if (aiCase) return aiCase;

    // Tertiary: Static Template
    return generateCase(hash);
}

/**
 * Check if AI is available
 * @returns {Promise<boolean>} AI availability
 */
async function checkAIAvailability() {
    try {
        const response = await fetch(`${HUGGINGFACE_API}${AI_MODELS.textGeneration}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                inputs: 'test',
                parameters: { max_new_tokens: 10 }
            })
        });

        return response.ok || response.status === 503; // 503 means model is loading
    } catch (error) {
        return false;
    }
}
