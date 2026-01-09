/* ===================================
   CASE011 - Theme Switcher (CRT Mode)
   Real-time visual theme switching
   =================================== */

class ThemeSwitcher {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.applyTheme(this.currentTheme);
    }

    loadTheme() {
        try {
            return localStorage.getItem('case011_theme') || 'dark';
        } catch (error) {
            return 'dark';
        }
    }

    saveTheme(theme) {
        try {
            localStorage.setItem('case011_theme', theme);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    }

    applyTheme(theme) {
        const body = document.body;

        // Remove all theme classes
        body.classList.remove('theme-dark', 'theme-crt', 'theme-light');

        // Add new theme class
        body.classList.add(`theme-${theme}`);

        this.currentTheme = theme;
        this.saveTheme(theme);

        // Update theme switcher buttons
        this.updateThemeButtons();
    }

    updateThemeButtons() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            const btnTheme = btn.dataset.theme;
            if (btnTheme === this.currentTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    switchTheme(theme) {
        this.applyTheme(theme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme switcher
let themeSwitcher = null;

function getThemeSwitcher() {
    if (!themeSwitcher) {
        themeSwitcher = new ThemeSwitcher();
    }
    return themeSwitcher;
}
