/* ===================================
   CASE011 - Signal Strength Indicator
   Real-time proximity to solution tracking
   =================================== */

// Solution keywords for each case (more comprehensive than secrets)
const SOLUTION_KEYWORDS = {
    'voynich-manuscript': {
        keywords: [
            'hoax', 'constructed language', 'turkish', 'latin abbreviations',
            'herbal manuscript', 'cipher', 'carbon dating', 'vellum',
            'wilfrid voynich', 'roger bacon', 'john dee', 'botanical',
            'astronomical', 'pharmaceutical', 'recipe'
        ],
        weight: {
            high: ['hoax', 'constructed language', 'turkish'],
            medium: ['cipher', 'herbal manuscript', 'latin abbreviations'],
            low: ['carbon dating', 'vellum', 'botanical']
        }
    },
    'dyatlov-pass': {
        keywords: [
            'avalanche', 'infrasound', 'katabatic wind', 'paradoxical undressing',
            'hypothermia', 'panic', 'tent', 'injuries', 'radiation',
            'military test', 'yeti', 'ufo', 'natural disaster'
        ],
        weight: {
            high: ['avalanche', 'katabatic wind', 'infrasound'],
            medium: ['hypothermia', 'paradoxical undressing', 'panic'],
            low: ['tent', 'injuries', 'radiation']
        }
    },
    'zodiac-cipher': {
        keywords: [
            'homophonic substitution', 'z340', 'z408', 'transposition',
            'polyalphabetic', 'route cipher', 'arthur leigh allen',
            'gary francis poste', 'cipher', 'cryptography'
        ],
        weight: {
            high: ['homophonic substitution', 'transposition', 'z340'],
            medium: ['polyalphabetic', 'route cipher', 'z408'],
            low: ['cipher', 'cryptography']
        }
    },
    'mh370': {
        keywords: [
            'inmarsat', 'satellite ping', 'arc', 'debris', 'indian ocean',
            'pilot suicide', 'hijacking', 'mechanical failure', 'hypoxia',
            'diego garcia', 'search area', 'flaperon'
        ],
        weight: {
            high: ['inmarsat', 'satellite ping', 'arc'],
            medium: ['debris', 'indian ocean', 'search area'],
            low: ['pilot suicide', 'hijacking', 'mechanical failure']
        }
    },
    'cicada-3301': {
        keywords: [
            'steganography', 'liber primus', 'runes', 'onion routing',
            'pgp', 'cryptography', 'recruitment', 'intelligence agency',
            'puzzle', 'gematria', 'cicada', 'anonymous'
        ],
        weight: {
            high: ['steganography', 'liber primus', 'runes'],
            medium: ['onion routing', 'pgp', 'gematria'],
            low: ['recruitment', 'puzzle', 'cryptography']
        }
    }
};

class SignalStrengthIndicator {
    constructor(caseId, caseHash) {
        this.caseId = caseId;
        this.caseHash = caseHash;
        this.currentStrength = 0;
        this.foundKeywords = new Set();
        this.lastNotebookContent = '';
    }

    analyzeNotebook(notebookContent) {
        if (!notebookContent || notebookContent === this.lastNotebookContent) {
            return this.currentStrength;
        }

        this.lastNotebookContent = notebookContent;
        const contentLower = notebookContent.toLowerCase();

        const caseKeywords = SOLUTION_KEYWORDS[this.caseId];
        if (!caseKeywords) return 0;

        // Reset found keywords
        this.foundKeywords.clear();
        let totalScore = 0;
        let maxScore = 0;

        // Calculate max possible score
        if (caseKeywords.weight.high) maxScore += caseKeywords.weight.high.length * 3;
        if (caseKeywords.weight.medium) maxScore += caseKeywords.weight.medium.length * 2;
        if (caseKeywords.weight.low) maxScore += caseKeywords.weight.low.length * 1;

        // Check for keywords and calculate score
        caseKeywords.keywords.forEach(keyword => {
            if (contentLower.includes(keyword.toLowerCase())) {
                this.foundKeywords.add(keyword);

                // Determine weight
                let weight = 1;
                if (caseKeywords.weight.high && caseKeywords.weight.high.includes(keyword)) {
                    weight = 3;
                } else if (caseKeywords.weight.medium && caseKeywords.weight.medium.includes(keyword)) {
                    weight = 2;
                }

                totalScore += weight;
            }
        });

        // Calculate strength as percentage (0-100)
        this.currentStrength = Math.min(Math.round((totalScore / maxScore) * 100), 100);

        return this.currentStrength;
    }

    getSignalBars() {
        // Convert percentage to 5-bar system
        if (this.currentStrength >= 80) return 5;
        if (this.currentStrength >= 60) return 4;
        if (this.currentStrength >= 40) return 3;
        if (this.currentStrength >= 20) return 2;
        if (this.currentStrength > 0) return 1;
        return 0;
    }

    getHint() {
        const bars = this.getSignalBars();
        const caseKeywords = SOLUTION_KEYWORDS[this.caseId];

        if (!caseKeywords) return '';

        if (bars === 0) {
            return 'SIGNAL WEAK - BEGIN RESEARCH INTO CORE EVIDENCE';
        } else if (bars === 1) {
            return 'SIGNAL DETECTED - EXPLORE ALTERNATIVE THEORIES';
        } else if (bars === 2) {
            return 'SIGNAL MODERATE - CONSIDER TECHNICAL ASPECTS';
        } else if (bars === 3) {
            return 'SIGNAL STRONG - INVESTIGATE SCIENTIFIC EXPLANATIONS';
        } else if (bars === 4) {
            return 'SIGNAL VERY STRONG - VERIFY PRIMARY SOURCES';
        } else {
            return 'MAXIMUM SIGNAL - COMPREHENSIVE ANALYSIS ACHIEVED';
        }
    }

    updateDisplay() {
        const signalContainer = document.getElementById('signalStrength');
        if (!signalContainer) return;

        const bars = this.getSignalBars();
        const hint = this.getHint();

        // Update signal bars
        const barsHTML = Array.from({ length: 5 }, (_, i) => {
            const isActive = i < bars;
            return `<div class="signal-bar ${isActive ? 'active' : ''}"></div>`;
        }).join('');

        signalContainer.innerHTML = `
            <div class="signal-bars">${barsHTML}</div>
            <div class="signal-percentage">${this.currentStrength}%</div>
            <div class="signal-hint">${hint}</div>
        `;
    }

    startMonitoring(notebookElement) {
        if (!notebookElement) return;

        // Real-time monitoring on input
        notebookElement.addEventListener('input', () => {
            this.analyzeNotebook(notebookElement.value);
            this.updateDisplay();
        });

        // Periodic check every 10 seconds
        setInterval(() => {
            this.analyzeNotebook(notebookElement.value);
            this.updateDisplay();
        }, 10000);

        // Initial analysis
        this.analyzeNotebook(notebookElement.value);
        this.updateDisplay();
    }
}
