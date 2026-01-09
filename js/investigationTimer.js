/* ===================================
   CASE011 - Investigation Timer
   Real-time session tracking
   =================================== */

class InvestigationTimer {
    constructor(caseHash) {
        this.caseHash = caseHash;
        this.startTime = Date.now();
        this.elapsedTime = this.loadElapsedTime();
        this.isRunning = false;
        this.intervalId = null;
    }

    loadElapsedTime() {
        try {
            const saved = localStorage.getItem(`timer_${this.caseHash}`);
            return saved ? parseInt(saved, 10) : 0;
        } catch (error) {
            return 0;
        }
    }

    saveElapsedTime() {
        try {
            localStorage.setItem(`timer_${this.caseHash}`, this.elapsedTime.toString());
        } catch (error) {
            console.error('Failed to save timer:', error);
        }
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startTime = Date.now();

        this.intervalId = setInterval(() => {
            this.elapsedTime += 1000; // Add 1 second
            this.updateDisplay();
            this.saveElapsedTime();
        }, 1000);
    }

    stop() {
        if (!this.isRunning) return;

        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.saveElapsedTime();
    }

    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.saveElapsedTime();
        this.updateDisplay();
    }

    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    updateDisplay() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.textContent = this.formatTime(this.elapsedTime);
        }
    }

    getElapsedTime() {
        return this.elapsedTime;
    }
}
