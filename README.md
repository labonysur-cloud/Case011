# 🕵️ CASE011: Archives of the Unexplained

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-green.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Each case is real. Each trail is incomplete. The truth is in the details.**

> A professional-grade investigation platform that transforms real-world mysteries into interactive detective experiences. Powered by live OSINT scraping from Wikipedia, featuring a retro-terminal aesthetic and zero-dependency architecture.

## 🎯 Live Demo

**[Launch Investigation Terminal →](https://your-username.github.io/case011/)**

*Replace with your actual deployment URL after hosting*
Check Mine :         https://case011.netlify.app/
---

## ✨ Features

### 🔍 **Live OSINT Intelligence**
- Real-time case generation from Wikipedia's mystery archives
- 13+ categories: Disappearances, UFOs, Cryptids, Unsolved Crimes, Archaeological Anomalies
- Zero API keys required - completely free to run

### 📝 **Interactive Investigation Notebook**
- Auto-save functionality (localStorage)
- One-click timestamp insertion
- Word/character counter
- Export to PDF
- Smart highlighting for key terms

### 🎨 **Immersive Retro Interface**
- CRT monitor effects
- Typewriter animations
- Film grain overlay
- Three themes: Dark, CRT, Light
- Ambient soundscapes (Terminal Hum, Rain, Vintage Radio)

### 📊 **Progress Tracking**
- Investigation timer
- Achievement system
- Signal strength indicator (proximity to solution)
- Case aging visualization
- Secret code detector

### 🏛️ **Community Archive**
- Submit your theories
- Browse other investigators' work
- Reopen and build upon existing cases
- Search and filter by category
- Voting system

---

## 🚀 Quick Start

### Option 1: Direct File Access
Simply open `index.html` in your browser. Most features will work immediately.

### Option 2: Local Server (Recommended)
For full Wikipedia API support:

```bash
# Using Node.js
npx -y serve . -p 8000

# Using Python 3
python -m http.server 8000

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

---

## 🏗️ Project Structure

```
case011/
├── index.html              # Landing page with typewriter briefing
├── case.html               # Main investigation interface
├── archive.html            # Community submissions archive
├── mysteries.html          # Case catalog browser
├── submit.html             # Theory submission portal
├── assets/
│   └── logo.png           # Brand identity
├── styles/
│   ├── main.css           # Core design system
│   ├── components.css     # UI components
│   └── animations.css     # CRT effects & animations
└── js/
    ├── aiGenerator.js     # Live Wikipedia OSINT scraper
    ├── caseGenerator.js   # 66+ pre-seeded cases
    ├── notebook.js        # Note-taking system
    ├── storage.js         # Archive management
    ├── progressTracker.js # Achievement system
    ├── signalStrength.js  # Solution proximity indicator
    ├── themeSwitcher.js   # Theme management
    ├── ambience.js        # Audio atmosphere
    └── utils.js           # Utility functions
```

---

## 🎮 How to Use

1. **Open a Case**: Click "OPEN CASE FILE" on the landing page
2. **Investigate**: Read the briefing, examine artifacts, follow Wikipedia links
3. **Document**: Take notes in the interactive notebook
4. **Analyze**: Use timestamps, track your progress, look for patterns
5. **Conclude**: Develop your theory based on evidence
6. **Submit**: Share your investigation with the community archive

---

## 🌐 Deployment

### GitHub Pages
1. Go to repository Settings → Pages
2. Select `main` branch as source
3. Save and wait for deployment
4. Access at: `https://username.github.io/case011/`

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/case011)

1. Click "Deploy to Netlify"
2. Connect your GitHub account
3. Deploy automatically

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/case011)

1. Click "Deploy with Vercel"
2. Import your repository
3. Deploy instantly

---

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Data Source**: Wikipedia API (CORS-enabled)
- **Storage**: Browser localStorage
- **Dependencies**: Zero! Completely standalone
- **Fonts**: Google Fonts (Special Elite, Courier Prime, Playfair Display)

---

## 📚 Case Database

The platform includes **66+ pre-seeded cases** across multiple categories:

- 🔐 **Cryptographic**: Voynich Manuscript, Zodiac Ciphers, Beale Ciphers
- 👤 **Disappearances**: Dyatlov Pass, D.B. Cooper, Amelia Earhart
- 🏛️ **Archaeological**: Antikythera Mechanism, Nazca Lines, Göbekli Tepe
- 👽 **Paranormal**: Roswell, Bermuda Triangle, Tunguska Event
- 🔬 **Scientific**: Wow! Signal, Dark Matter, Fermi Paradox

Plus unlimited live cases from Wikipedia's mystery categories!

---

## 🔒 Privacy & Security

- ✅ **No tracking** - Zero analytics or cookies
- ✅ **No accounts** - No registration required
- ✅ **Local storage** - All data stays on your device
- ✅ **No API keys** - Completely free to use
- ✅ **Open source** - Fully transparent code

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute:
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Add new case seeds
- 🎨 Improve UI/UX
- 📖 Enhance documentation
- 🌍 Translate to other languages

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Wikipedia** - For providing free access to human knowledge
- **Google Fonts** - For beautiful typography
- **The Mystery Community** - For keeping curiosity alive

---

## 📞 Support

- 📧 Open an [Issue](https://github.com/yourusername/case011/issues)
- 💬 Start a [Discussion](https://github.com/yourusername/case011/discussions)
- ⭐ Star this repo if you find it interesting!

---

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Advanced search filters
- [ ] Case difficulty ratings
- [ ] Collaborative investigations
- [ ] Mobile app (PWA)
- [ ] Dark web case integration
- [ ] AI-powered clue suggestions

---

<div align="center">

**Remember: The trail is incomplete. The truth is in the details.**

Made with 🔍 for curious minds

[⬆ Back to Top](#-case011-archives-of-the-unexplained)

</div>
