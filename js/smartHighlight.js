/* ===================================
   CASE011 - Smart Search & Highlighting
   Real-time keyword highlighting system
   =================================== */

class SmartHighlighter {
    constructor() {
        this.keywords = new Set();
        this.highlightedElements = new Map();
    }

    extractKeywords(text) {
        if (!text || text.length < 10) return [];

        // Extract potential keywords (capitalized words, dates, names, locations)
        const words = text.split(/\s+/);
        const keywords = [];

        words.forEach(word => {
            const cleaned = word.replace(/[^\w\s-]/g, '');

            // Capitalized words (potential names/places)
            if (/^[A-Z][a-z]+/.test(cleaned) && cleaned.length > 3) {
                keywords.push(cleaned);
            }

            // Dates (YYYY, YYYY-MM-DD, etc.)
            if (/\d{4}/.test(cleaned)) {
                keywords.push(cleaned);
            }

            // Multi-word phrases in quotes
            const quotedMatches = text.match(/"([^"]+)"/g);
            if (quotedMatches) {
                quotedMatches.forEach(match => {
                    keywords.push(match.replace(/"/g, ''));
                });
            }
        });

        return [...new Set(keywords)];
    }

    highlightInElement(element, keywords) {
        if (!element || keywords.length === 0) return;

        const originalHTML = element.getAttribute('data-original-html') || element.innerHTML;
        if (!element.getAttribute('data-original-html')) {
            element.setAttribute('data-original-html', originalHTML);
        }

        let highlightedHTML = originalHTML;

        keywords.forEach(keyword => {
            if (keyword.length < 3) return; // Skip very short keywords

            const regex = new RegExp(`(${this.escapeRegex(keyword)})`, 'gi');
            highlightedHTML = highlightedHTML.replace(regex, '<mark class="smart-highlight">$1</mark>');
        });

        element.innerHTML = highlightedHTML;
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    clearHighlights(element) {
        if (!element) return;

        const originalHTML = element.getAttribute('data-original-html');
        if (originalHTML) {
            element.innerHTML = originalHTML;
        }
    }

    highlightBriefing(notebookContent) {
        const keywords = this.extractKeywords(notebookContent);
        this.keywords = new Set(keywords);

        // Highlight in briefing text
        const briefingElement = document.getElementById('briefingText');
        if (briefingElement && keywords.length > 0) {
            this.highlightInElement(briefingElement, keywords);
        }

        // Highlight in artifact descriptions
        document.querySelectorAll('.artifact-desc').forEach(desc => {
            this.highlightInElement(desc, keywords);
        });

        // Update keyword count display
        this.updateKeywordDisplay(keywords);
    }

    updateKeywordDisplay(keywords) {
        const keywordDisplay = document.getElementById('keywordDisplay');
        if (!keywordDisplay) return;

        if (keywords.length === 0) {
            keywordDisplay.innerHTML = '<span class="keyword-empty">No keywords detected</span>';
            return;
        }

        const keywordTags = keywords.slice(0, 10).map(kw =>
            `<span class="keyword-tag">${kw}</span>`
        ).join('');

        const moreText = keywords.length > 10 ? `<span class="keyword-more">+${keywords.length - 10} more</span>` : '';

        keywordDisplay.innerHTML = keywordTags + moreText;
    }

    addJumpToButtons() {
        const highlights = document.querySelectorAll('.smart-highlight');
        highlights.forEach((highlight, index) => {
            highlight.setAttribute('data-highlight-id', index);
            highlight.style.cursor = 'pointer';
            highlight.title = 'Referenced in notes';
        });
    }

    startMonitoring(notebookElement) {
        if (!notebookElement) return;

        // Debounced highlighting
        let highlightTimeout;
        notebookElement.addEventListener('input', () => {
            clearTimeout(highlightTimeout);
            highlightTimeout = setTimeout(() => {
                this.highlightBriefing(notebookElement.value);
                this.addJumpToButtons();
            }, 1000); // Wait 1 second after typing stops
        });

        // Initial highlight
        if (notebookElement.value) {
            this.highlightBriefing(notebookElement.value);
            this.addJumpToButtons();
        }
    }
}
