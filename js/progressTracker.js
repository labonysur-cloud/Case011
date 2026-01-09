/* ===================================
   CASE011 - Investigation Progress Tracker
   Real-time progress monitoring
   =================================== */

class ProgressTracker {
    constructor(caseHash) {
        this.caseHash = caseHash;
        this.metrics = this.loadMetrics();
        this.startTime = this.metrics.startTime || Date.now();
        this.updateInterval = null;
    }

    loadMetrics() {
        try {
            const saved = localStorage.getItem(`progress_${this.caseHash}`);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to load progress metrics:', error);
        }

        return {
            startTime: Date.now(),
            timeSpent: 0,
            wordCount: 0,
            timestampsAdded: 0,
            artifactsViewed: new Set(),
            lastUpdate: Date.now(),
            unlockedSecrets: []
        };
    }

    saveMetrics() {
        try {
            // Convert Set to Array for JSON serialization
            const metricsToSave = {
                ...this.metrics,
                artifactsViewed: Array.from(this.metrics.artifactsViewed)
            };
            localStorage.setItem(`progress_${this.caseHash}`, JSON.stringify(metricsToSave));
        } catch (error) {
            console.error('Failed to save progress metrics:', error);
        }
    }

    updateWordCount(count) {
        this.metrics.wordCount = count;
        this.saveMetrics();
        this.updateDisplay();
    }

    incrementTimestamps() {
        this.metrics.timestampsAdded++;
        this.saveMetrics();
        this.updateDisplay();
    }

    markArtifactViewed(artifactId) {
        if (!this.metrics.artifactsViewed) {
            this.metrics.artifactsViewed = new Set();
        }
        this.metrics.artifactsViewed.add(artifactId);
        this.saveMetrics();
        this.updateDisplay();
    }

    unlockSecret(secretId) {
        if (!this.metrics.unlockedSecrets) {
            this.metrics.unlockedSecrets = [];
        }
        if (!this.metrics.unlockedSecrets.includes(secretId)) {
            this.metrics.unlockedSecrets.push(secretId);
            this.saveMetrics();
            this.updateDisplay();
        }
    }

    updateTimeSpent() {
        const now = Date.now();
        const sessionTime = now - this.metrics.lastUpdate;
        this.metrics.timeSpent += sessionTime;
        this.metrics.lastUpdate = now;
        this.saveMetrics();
        this.updateDisplay();
    }

    calculateProgress() {
        let progress = 0;
        const weights = {
            wordCount: 0.4,      // 40% - most important
            artifacts: 0.25,     // 25%
            time: 0.15,          // 15%
            timestamps: 0.1,     // 10%
            secrets: 0.1         // 10%
        };

        // Word count progress (target: 500 words)
        const wordProgress = Math.min(this.metrics.wordCount / 500, 1);
        progress += wordProgress * weights.wordCount;

        // Artifacts viewed (assume 4 artifacts per case)
        const artifactProgress = Math.min((this.metrics.artifactsViewed?.size || 0) / 4, 1);
        progress += artifactProgress * weights.artifacts;

        // Time spent (target: 30 minutes)
        const timeProgress = Math.min(this.metrics.timeSpent / (30 * 60 * 1000), 1);
        progress += timeProgress * weights.time;

        // Timestamps added (target: 5)
        const timestampProgress = Math.min(this.metrics.timestampsAdded / 5, 1);
        progress += timestampProgress * weights.timestamps;

        // Secrets unlocked (bonus)
        const secretProgress = Math.min((this.metrics.unlockedSecrets?.length || 0) / 3, 1);
        progress += secretProgress * weights.secrets;

        return Math.min(Math.round(progress * 100), 100);
    }

    getAchievements() {
        const achievements = [];

        if (this.metrics.wordCount >= 500) {
            achievements.push({ id: 'deep_researcher', name: 'Deep Researcher', desc: 'Wrote 500+ words' });
        }
        if (this.metrics.timestampsAdded >= 5) {
            achievements.push({ id: 'time_keeper', name: 'Time Keeper', desc: 'Added 5+ timestamps' });
        }
        if ((this.metrics.artifactsViewed?.size || 0) >= 4) {
            achievements.push({ id: 'evidence_collector', name: 'Evidence Collector', desc: 'Viewed all artifacts' });
        }
        if (this.metrics.timeSpent >= 60 * 60 * 1000) {
            achievements.push({ id: 'dedicated_investigator', name: 'Dedicated Investigator', desc: 'Spent 1+ hour' });
        }
        if ((this.metrics.unlockedSecrets?.length || 0) >= 1) {
            achievements.push({ id: 'secret_finder', name: 'Secret Finder', desc: 'Unlocked hidden clues' });
        }

        return achievements;
    }

    updateDisplay() {
        const progressPercent = this.calculateProgress();
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        const achievementsList = document.getElementById('achievementsList');

        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }

        if (progressText) {
            progressText.textContent = `${progressPercent}%`;
        }

        if (achievementsList) {
            const achievements = this.getAchievements();
            achievementsList.innerHTML = achievements.map(ach =>
                `<span class="achievement-badge" title="${ach.desc}">${ach.name}</span>`
            ).join('');
        }
    }

    startTracking() {
        // Update time spent every 30 seconds
        this.updateInterval = setInterval(() => {
            this.updateTimeSpent();
        }, 30000);

        // Initial display update
        this.updateDisplay();
    }

    stopTracking() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateTimeSpent(); // Final update
        }
    }

    getStats() {
        return {
            progress: this.calculateProgress(),
            wordCount: this.metrics.wordCount,
            timeSpent: this.metrics.timeSpent,
            timestampsAdded: this.metrics.timestampsAdded,
            artifactsViewed: this.metrics.artifactsViewed?.size || 0,
            achievements: this.getAchievements()
        };
    }
}

// Helper function to format time
function formatTimeSpent(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}
