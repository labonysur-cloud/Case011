# Case011 - Mystery Investigation Platform

**Each case is real. Each trail is incomplete.**

A real-world mystery investigation platform that gives players procedurally generated investigative cases based on real, unresolved, or archival events. The platform encourages research, note-taking, writing, and critical thinking while providing a cinematic and immersive experience.

## Features

- **Procedural Case Generation**: Each case is deterministically generated based on a unique hash, ensuring the same hash always produces the same case
- **Real-World Mysteries**: 10 curated cases based on actual historical mysteries including:
- **Real-World Mysteries**: 20 curated cases based on actual unsolved historical events
- **Procedural Generation**: Each case hash generates a unique, deterministic investigation
- **Interactive Notebook**: Take notes with timestamps, auto-save functionality
- **Community Archive**: Submit and browse investigations from other detectives
- **Research-Based**: All cases link to real sources (Wikipedia, documentaries, academic papers)
- **Retro Detective Aesthetic**: Immersive typewriter fonts and vintage styling
- **Free & Lightweight**: No backend, no login, works offline after first load

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required!

### Using a Local Server (Recommended)

For the best experience, serve the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx -y serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## How to Use

1. **Start Investigation**: Click "Open Case File" on the landing page
2. **Read Briefing**: Review the case details and background
3. **Examine Artifacts**: Click through the evidence links (articles, videos, research)
4. **Take Notes**: Use the interactive notebook to document your findings
5. **Submit**: When ready, submit your investigation to the community archive
6. **Explore Archive**: Read other investigators' theories and reopen cases

## Project Structure

```
case011/
├── index.html              # Landing page
├── case.html               # Case investigation page
├── submit.html             # Submission page
├── archive.html            # Community archive
├── styles/
│   ├── main.css           # Core design system
│   ├── components.css     # Component styles
│   └── animations.css     # Animation effects
├── js/
│   ├── utils.js           # Utility functions
│   ├── caseGenerator.js   # Case generation logic
│   ├── notebook.js        # Note-taking system
│   └── storage.js         # Archive management
└── README.md
```

## Technology Stack

- **Frontend**: Pure HTML, CSS, JavaScript (no frameworks)
- **Fonts**: Google Fonts (Courier Prime, Special Elite, Playfair Display)
- **Storage**: localStorage for notebooks and submissions
- **Deployment**: Can be hosted on GitHub Pages, Netlify, or any static hosting

## Educational Benefits

- **Critical Thinking**: Analyzing clues and multiple sources
- **Research Skills**: Searching archives, articles, and videos
- **Writing**: Documenting findings and narrative theories
- **Attention**: Counteracts doom-scrolling habits
- **Collaboration**: Share and review community submissions

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Future Enhancements

- AI-powered case generation using HuggingFace API
- Real-time collaboration features
- Advanced archive filtering and search
- Progressive Web App (PWA) support
- Mobile app version
- Integration with open data sources

## Contributing

This is an open platform for learning and exploration. Feel free to:
- Add new case seeds
- Improve the UI/UX
- Enhance the notebook features
- Add new artifact types
- Translate to other languages

## License

Free to use for educational and personal purposes.

## Credits

Created as part of the Case011 project - a platform for critical thinkers and curious minds.

All case information is based on publicly available historical records and research.

---

**Remember**: Each case is real. Each trail is incomplete. The truth is in the details.
