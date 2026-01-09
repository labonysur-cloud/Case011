/* ===================================
   CASE011 - LIVE OSINT Scraper
   Fetches real-world mysteries from Wikipedia
   Zero API Keys | Zero Cost | 100% Authentic
   =================================== */

const WIKI_API = 'https://en.wikipedia.org/w/api.php';
const MYSTERY_CATEGORIES = [
    'Category:Unexplained_disappearances',
    'Category:Unsolved_deaths',
    'Category:UFO_sightings',
    'Category:Paranormal_events',
    'Category:Urban_legends',
    'Category:Mythological_creatures',
    'Category:Ghost_towns',
    'Category:Maritime_mysteries',
    'Category:Missing_aircraft',
    'Category:Missing_ships',
    'Category:Unsolved_crimes',
    'Category:Out-of-place_artifacts',
    'Category:Abandoned_buildings',
    'Category:Cryptids'
];

/**
 * Fetch a random case from Wikipedia
 * @param {string} hash - Case hash (used for deterministic seeding if needed)
 * @returns {Promise<Object>} Formatted case data
 */
async function generateCaseWithAI(hash, useAI = true) {
    try {
        console.log('Initiating OSINT Live Scan...');

        // 1. Pick a random category
        const category = MYSTERY_CATEGORIES[Math.floor(Math.random() * MYSTERY_CATEGORIES.length)];

        // 2. Get members of that category
        const listUrl = `${WIKI_API}?action=query&list=categorymembers&cmtitle=${category}&cmlimit=50&format=json&origin=*`;
        const listResponse = await fetch(listUrl);
        const listData = await listResponse.json();

        const members = listData.query.categorymembers.filter(m => m.ns === 0); // Only articles
        if (!members || members.length === 0) throw new Error('No archival records found in category');

        // 3. Pick a random article
        const randomArticle = members[Math.floor(Math.random() * members.length)];
        const pageTitle = randomArticle.title;

        // 4. Get article details (summary and image)
        const detailsUrl = `${WIKI_API}?action=query&prop=extracts|pageimages|info&exintro&explaintext&inlinkcontext=html&titles=${encodeURIComponent(pageTitle)}&pithumbsize=1000&format=json&origin=*`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        const pages = detailsData.query.pages;
        const pageId = Object.keys(pages)[0];
        const page = pages[pageId];

        if (!page || page.missing === "") throw new Error('Archives corrupted or inaccessible');

        // 5. Format into Case011 structure
        return {
            hash: hash,
            title: page.title.toUpperCase(),
            category: category.replace('Category:', '').replace(/_/g, ' '),
            difficulty: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
            briefing: formatWikiBriefing(page.extract),
            image: page.thumbnail ? page.thumbnail.source : null,
            wikipedia: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
            artifacts: [
                {
                    title: "PRIMARY ARCHIVAL RECORD",
                    type: "DOCUMENT",
                    description: `Original record of ${page.title} retrieved from the central knowledge repository.`,
                    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`
                },
                {
                    title: "SIGNAL FRAGMENT",
                    type: "IMAGE",
                    description: "Visual reconstruction of the subject matter.",
                    url: page.thumbnail ? page.thumbnail.source : "https://via.placeholder.com/800x600?text=SIGNAL+LOST"
                }
            ],
            aiGenerated: true,
            osint: true,
            generatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('OSINT Scan failed:', error);
        // Fallback to static case
        if (typeof generateCase === 'function') {
            return generateCase(hash);
        }
        return null;
    }
}

/**
 * Format Wikipedia extract into a "classified" briefing
 * @param {string} text - Raw Wikipedia extract
 * @returns {string} Formatted HTML briefing
 */
function formatWikiBriefing(text) {
    if (!text) return "<p>SIGNAL LOST: Case briefing unavailable.</p>";

    // Clean up text (remove citations like [1], [2], etc.)
    const cleanText = text.replace(/\[\d+\]/g, '');

    // Split into sentences and wrap in paragraphs with detective flair
    const sentences = cleanText.split('. ');
    let html = `
        <div class="briefing-header">DEEP ARCHIVAL RECONSTRUCTION // SOURCE: WIKIPEDIA CORE</div>
        <p class="classified-stamp">TOP SECRET // EYES ONLY // ARCHIVAL INTERCEPT</p>
    `;

    // Group sentences into paragraphs
    for (let i = 0; i < sentences.length; i += 3) {
        const pText = sentences.slice(i, i + 3).join('. ') + (i + 3 < sentences.length ? '.' : '');
        if (pText.trim().length > 5) {
            html += `<p class="briefing-para">${pText}</p>`;
        }
    }

    html += `
        <div class="briefing-footer">
            <div class="footer-meta">
                <span class="transmission-code">REF: ${Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                <span class="transmission-status">SIGNAL STRENGTH: STABLE</span>
            </div>
            <div class="footer-end">END OF CLASSIFIED RECORD</div>
        </div>
    `;

    return html;
}
