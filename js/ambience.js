/* ===================================
   CASE011 - Ambient Soundscape System
   Real-time audio atmosphere control
   =================================== */

class AmbienceController {
    constructor() {
        this.audioContext = null;
        this.currentTrack = null;
        this.gainNode = null;
        this.isPlaying = false;
        this.volume = 0.3; // Default 30%
        this.currentMode = 'silent';

        // Load saved preferences
        this.loadPreferences();

        // Initialize audio context on user interaction
        this.initAudioContext();
    }

    initAudioContext() {
        // Create audio context (lazy initialization for browser compatibility)
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            this.gainNode.gain.value = this.volume;
        }
    }

    loadPreferences() {
        try {
            const savedMode = localStorage.getItem('ambience_mode');
            const savedVolume = localStorage.getItem('ambience_volume');

            if (savedMode) this.currentMode = savedMode;
            if (savedVolume) this.volume = parseFloat(savedVolume);
        } catch (error) {
            console.error('Failed to load ambience preferences:', error);
        }
    }

    savePreferences() {
        try {
            localStorage.setItem('ambience_mode', this.currentMode);
            localStorage.setItem('ambience_volume', this.volume.toString());
        } catch (error) {
            console.error('Failed to save ambience preferences:', error);
        }
    }

    async playMode(mode) {
        this.initAudioContext();

        // Stop current track
        this.stop();

        if (mode === 'silent') {
            this.currentMode = 'silent';
            this.savePreferences();
            return;
        }

        // Generate audio based on mode
        switch (mode) {
            case 'terminal':
                this.playTerminalHum();
                break;
            case 'rain':
                this.playRain();
                break;
            case 'radio':
                this.playVintageRadio();
                break;
        }

        this.currentMode = mode;
        this.isPlaying = true;
        this.savePreferences();
    }

    playTerminalHum() {
        // Create white noise with low-frequency hum
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Add low-pass filter for terminal hum effect
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        // Add oscillator for electrical hum
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 60; // 60Hz electrical hum

        const oscGain = this.audioContext.createGain();
        oscGain.gain.value = 0.1;

        whiteNoise.connect(filter);
        filter.connect(this.gainNode);
        oscillator.connect(oscGain);
        oscGain.connect(this.gainNode);

        whiteNoise.start();
        oscillator.start();

        this.currentTrack = { whiteNoise, oscillator };
    }

    playRain() {
        // Create filtered noise for rain effect
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(2, bufferSize, this.audioContext.sampleRate);

        for (let channel = 0; channel < 2; channel++) {
            const output = noiseBuffer.getChannelData(channel);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
        }

        const rainNoise = this.audioContext.createBufferSource();
        rainNoise.buffer = noiseBuffer;
        rainNoise.loop = true;

        // Band-pass filter for rain sound
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 0.5;

        // Add some reverb-like delay
        const delay = this.audioContext.createDelay();
        delay.delayTime.value = 0.03;

        const delayGain = this.audioContext.createGain();
        delayGain.gain.value = 0.3;

        rainNoise.connect(filter);
        filter.connect(this.gainNode);
        filter.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(this.gainNode);

        rainNoise.start();

        this.currentTrack = { rainNoise };
    }

    playVintageRadio() {
        // Create muffled static with occasional tonal elements
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.3;
        }

        const staticNoise = this.audioContext.createBufferSource();
        staticNoise.buffer = noiseBuffer;
        staticNoise.loop = true;

        // Low-pass filter for muffled effect
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 2000;

        // Add subtle oscillator for radio carrier wave
        const carrier = this.audioContext.createOscillator();
        carrier.type = 'sine';
        carrier.frequency.value = 440;

        const carrierGain = this.audioContext.createGain();
        carrierGain.gain.value = 0.05;

        staticNoise.connect(filter);
        filter.connect(this.gainNode);
        carrier.connect(carrierGain);
        carrierGain.connect(this.gainNode);

        staticNoise.start();
        carrier.start();

        this.currentTrack = { staticNoise, carrier };
    }

    stop() {
        if (this.currentTrack) {
            Object.values(this.currentTrack).forEach(node => {
                try {
                    if (node.stop) node.stop();
                } catch (e) {
                    // Already stopped
                }
            });
            this.currentTrack = null;
        }
        this.isPlaying = false;
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        if (this.gainNode) {
            this.gainNode.gain.value = this.volume;
        }
        this.savePreferences();
    }

    getVolume() {
        return this.volume;
    }

    getCurrentMode() {
        return this.currentMode;
    }

    isActive() {
        return this.isPlaying;
    }
}

// Global instance
let ambienceController = null;

function getAmbienceController() {
    if (!ambienceController) {
        ambienceController = new AmbienceController();
    }
    return ambienceController;
}
