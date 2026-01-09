/* ===================================
   CASE011 - Hidden Secrets System
   Real-time keyword detection and unlocking
   =================================== */

// Secret keywords for each case
const CASE_SECRETS = {
    'voynich-manuscript': {
        keywords: ['carbon dating', 'vellum', 'cipher', 'botanical'],
        secret: {
            type: 'research',
            title: 'CLASSIFIED: Recent AI Decryption Attempt',
            description: 'A 2023 machine learning analysis suggests possible Turkish origin',
            url: 'https://www.nature.com/articles/voynich-ai-analysis'
        }
    },
    'dyatlov-pass': {
        keywords: ['avalanche', 'infrasound', 'katabatic', 'paradoxical undressing'],
        secret: {
            type: 'article',
            title: 'CLASSIFIED: 2020 Scientific Explanation',
            description: 'Swiss researchers propose slab avalanche theory with wind patterns',
            url: 'https://www.nature.com/articles/dyatlov-avalanche'
        }
    },
    'zodiac-cipher': {
        keywords: ['z340', 'homophonic', 'transposition', 'polyalphabetic'],
        secret: {
            type: 'article',
            title: 'CLASSIFIED: 2020 Z340 Solution Method',
            description: 'The exact cryptographic technique used to crack the 51-year cipher',
            url: 'https://www.fbi.gov/zodiac-z340-solution'
        }
    },
    'mh370': {
        keywords: ['inmarsat', 'satellite ping', 'arc', 'debris analysis'],
        secret: {
            type: 'article',
            title: 'CLASSIFIED: Ocean Drift Analysis',
            description: 'Detailed drift modeling of confirmed debris locations',
            url: 'https://www.scientificamerican.com/mh370-drift-analysis'
        }
    },
    'cicada-3301': {
        keywords: ['steganography', 'liber primus', 'runes', 'onion routing'],
        secret: {
            type: 'article',
            title: 'CLASSIFIED: Solver Testimonials',
            description: 'Anonymous accounts from those who claim to have solved the puzzle',
            url: 'https://www.wired.com/cicada-solvers'
        }
    }
};

class SecretDetector {
    constructor(caseId, caseHash) {
        this.caseId = caseId;
        this.caseHash = caseHash;
        this.unlockedSecrets = this.loadUnlockedSecrets();
        this.checkInterval = null;
        this.lastNotebookContent = '';
    }

    loadUnlockedSecrets() {
        try {
            const saved = localStorage.getItem(`secrets_${this.caseHash}`);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to load unlocked secrets:', error);
            return [];
        }
    }

    saveUnlockedSecrets() {
        try {
            localStorage.setItem(`secrets_${this.caseHash}`, JSON.stringify(this.unlockedSecrets));
        } catch (error) {
            console.error('Failed to save unlocked secrets:', error);
        }
    }

    checkForSecrets(notebookContent) {
        if (!notebookContent || notebookContent === this.lastNotebookContent) {
            return;
        }

        this.lastNotebookContent = notebookContent;
        const contentLower = notebookContent.toLowerCase();

        const caseSecrets = CASE_SECRETS[this.caseId];
        if (!caseSecrets) return;

        // Check if any keywords are present
        const foundKeywords = caseSecrets.keywords.filter(keyword =>
            contentLower.includes(keyword.toLowerCase())
        );

        // Unlock secret if enough keywords found and not already unlocked
        if (foundKeywords.length >= 2 && !this.unlockedSecrets.includes(this.caseId)) {
            this.unlockSecret(caseSecrets.secret);
        }
    }

    unlockSecret(secret) {
        // Add to unlocked list
        this.unlockedSecrets.push(this.caseId);
        this.saveUnlockedSecrets();

        // Show unlock animation
        this.showUnlockNotification(secret);

        // Add secret artifact to the page
        this.addSecretArtifact(secret);

        // Update progress tracker
        if (window.progressTracker) {
            window.progressTracker.unlockSecret(this.caseId);
        }
    }

    showUnlockNotification(secret) {
        // Create notification overlay
        const overlay = document.createElement('div');
        overlay.className = 'secret-unlock-overlay';
        overlay.innerHTML = `
            <div class="secret-unlock-content">
                <div class="unlock-header">
                    <span class="unlock-icon">CLASSIFIED DATA UNLOCKED</span>
                </div>
                <h3 class="unlock-title">${secret.title}</h3>
                <p class="unlock-desc">${secret.description}</p>
                <button class="primary-btn unlock-close-btn">ACKNOWLEDGE</button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Add screen flicker effect
        document.body.classList.add('screen-flicker');
        setTimeout(() => {
            document.body.classList.remove('screen-flicker');
        }, 500);

        // Close button handler
        overlay.querySelector('.unlock-close-btn').addEventListener('click', () => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 300);
        });

        // Auto-close after 10 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.classList.add('fade-out');
                setTimeout(() => overlay.remove(), 300);
            }
        }, 10000);
    }

    addSecretArtifact(secret) {
        const artifactsGrid = document.getElementById('artifactsGrid');
        if (!artifactsGrid) return;

        const artifactCount = artifactsGrid.children.length;

        const secretCard = document.createElement('div');
        secretCard.className = 'artifact-card secret-artifact';
        secretCard.innerHTML = `
            <div class="artifact-header">
                <span class="artifact-number">ARTIFACT ${String(artifactCount + 1).padStart(2, '0')}</span>
                <span class="artifact-type secret-badge">CLASSIFIED</span>
            </div>
            <h4 class="artifact-title">${secret.title}</h4>
            <p class="artifact-desc">${secret.description}</p>
            <a href="${secret.url}" target="_blank" class="artifact-link" rel="noopener noreferrer">
                View Evidence
            </a>
        `;

        artifactsGrid.appendChild(secretCard);

        // Update artifact count
        const countElement = document.getElementById('artifactCount');
        if (countElement) {
            countElement.textContent = `${artifactCount + 1} items`;
        }

        // Scroll to new artifact
        secretCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    startMonitoring(notebookElement) {
        if (!notebookElement) return;

        // Check on input
        notebookElement.addEventListener('input', () => {
            this.checkForSecrets(notebookElement.value);
        });

        // Also check periodically (every 5 seconds)
        this.checkInterval = setInterval(() => {
            this.checkForSecrets(notebookElement.value);
        }, 5000);

        // Initial check
        this.checkForSecrets(notebookElement.value);
    }

    stopMonitoring() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }
    }

    isUnlocked() {
        return this.unlockedSecrets.includes(this.caseId);
    }
}

// Helper function to get case ID from case data
function getCaseIdFromTitle(title) {
    const titleMap = {
        'The Voynich Manuscript': 'voynich-manuscript',
        'The Dyatlov Pass Incident': 'dyatlov-pass',
        'The Zodiac Killer Ciphers': 'zodiac-cipher',
        'Malaysian Airlines Flight MH370': 'mh370',
        'The Cicada 3301 Puzzle': 'cicada-3301'
    };

    return titleMap[title] || null;
}
