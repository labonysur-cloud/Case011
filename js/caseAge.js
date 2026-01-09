/* ===================================
   CASE011 - Dynamic Case Age System
   Real-time visual aging of cases
   =================================== */

class CaseAgeTracker {
    constructor(caseHash) {
        this.caseHash = caseHash;
        this.openedDate = this.getOpenedDate();
        this.ageCategory = this.calculateAgeCategory();
    }

    getOpenedDate() {
        try {
            const saved = localStorage.getItem(`case_opened_${this.caseHash}`);
            if (saved) {
                return new Date(saved);
            }
        } catch (error) {
            console.error('Failed to load case opened date:', error);
        }

        // First time opening this case
        const now = new Date();
        try {
            localStorage.setItem(`case_opened_${this.caseHash}`, now.toISOString());
        } catch (error) {
            console.error('Failed to save case opened date:', error);
        }
        return now;
    }

    getDaysSinceOpened() {
        const now = new Date();
        const diffTime = Math.abs(now - this.openedDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    calculateAgeCategory() {
        const days = this.getDaysSinceOpened();

        if (days <= 7) {
            return 'fresh';
        } else if (days <= 30) {
            return 'aging';
        } else {
            return 'cold';
        }
    }

    applyCaseAgeStyles() {
        const days = this.getDaysSinceOpened();
        const category = this.calculateAgeCategory();

        // Apply to case briefing section
        const briefingSection = document.querySelector('.case-briefing');
        if (briefingSection) {
            briefingSection.classList.remove('case-age-fresh', 'case-age-aging', 'case-age-cold');
            briefingSection.classList.add(`case-age-${category}`);
        }

        // Apply to notebook section
        const notebookSection = document.querySelector('.notebook-section');
        if (notebookSection) {
            notebookSection.classList.remove('case-age-fresh', 'case-age-aging', 'case-age-cold');
            notebookSection.classList.add(`case-age-${category}`);
        }

        // Add age indicator to header
        this.addAgeIndicator(days, category);
    }

    addAgeIndicator(days, category) {
        const caseMetaDiv = document.querySelector('.case-meta');
        if (!caseMetaDiv) return;

        // Remove existing age indicator
        const existingIndicator = document.getElementById('caseAgeIndicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        // Create new age indicator
        const ageIndicator = document.createElement('span');
        ageIndicator.id = 'caseAgeIndicator';
        ageIndicator.className = 'case-age-indicator';

        let statusText = '';
        let statusClass = '';

        if (category === 'fresh') {
            statusText = `ACTIVE - Day ${days}`;
            statusClass = 'age-fresh';
        } else if (category === 'aging') {
            statusText = `AGING - ${days} Days`;
            statusClass = 'age-aging';
        } else {
            statusText = `COLD CASE - ${days} Days`;
            statusClass = 'age-cold';
        }

        ageIndicator.innerHTML = `<span class="age-badge ${statusClass}">${statusText}</span>`;
        caseMetaDiv.insertBefore(ageIndicator, caseMetaDiv.firstChild);
    }

    getAgeStats() {
        return {
            days: this.getDaysSinceOpened(),
            category: this.calculateAgeCategory(),
            openedDate: this.openedDate
        };
    }
}

// Helper function to format age for display
function formatCaseAge(days) {
    if (days === 1) {
        return '1 day';
    } else if (days < 30) {
        return `${days} days`;
    } else if (days < 365) {
        const months = Math.floor(days / 30);
        return `${months} month${months > 1 ? 's' : ''}`;
    } else {
        const years = Math.floor(days / 365);
        return `${years} year${years > 1 ? 's' : ''}`;
    }
}
