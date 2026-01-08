# Case011 - AI Integration Guide

## AI Features Overview

Case011 now includes **AI-powered case generation** that can:

1. **Fetch real-world mysteries from the internet** (Wikipedia, news sources)
2. **Generate unique case briefings** using AI language models
3. **Create dynamic artifacts** with live search results
4. **Produce completely new cases** based on trending mysteries

---

## How AI Mode Works

### 1. AI Toggle on Landing Page

On the homepage, you'll see a checkbox:

```
☐ ENABLE AI MODE (Generates unique cases from internet)
```

- **Unchecked (Default)**: Uses the 10 pre-curated mystery cases
- **Checked**: Activates AI to generate unique cases from real-world data

### 2. AI Case Generation Process

When AI mode is enabled:

1. **Topic Selection**: Uses the case hash to deterministically select a mystery topic
2. **Web Scraping**: Searches Wikipedia and other sources for information
3. **Artifact Generation**: Creates links to:
   - Wikipedia articles
   - YouTube documentaries
   - Google Scholar research papers
4. **AI Briefing**: Uses HuggingFace AI to generate a compelling case briefing
5. **Display**: Shows "AI ENHANCED" badge on the case page

---

## AI Technology Stack

### HuggingFace Inference API

- **Model**: Mistral-7B-Instruct-v0.2 (free, no API key required)
- **Purpose**: Generate engaging case briefings
- **Fallback**: If AI fails, uses template-based generation

### Web Data Sources

1. **Wikipedia API**
   - Fetches mystery summaries
   - Provides historical context
   - Links to detailed articles

2. **YouTube Search**
   - Documentary links
   - Investigation videos
   - Expert analysis

3. **Google Scholar**
   - Academic research
   - Scientific papers
   - Peer-reviewed studies

---

## 20+ AI-Generated Case Topics

The AI can generate cases about:

### Cryptographic Mysteries
- Cicada 3301 puzzle
- Kryptos CIA sculpture
- Phaistos Disc inscription
- Linear A script (Minoan)
- Indus Valley script
- Rongorongo (Easter Island)

### Disappearances & Unsolved Cases
- Mary Celeste ghost ship
- Black Dahlia murder
- Jack the Ripper identity
- Amelia Earhart disappearance
- Malaysian Airlines MH370

### Archaeological Enigmas
- Nazca Lines (Peru)
- Stonehenge construction
- Atlantis lost civilization
- Easter Island Moai statues

### Scientific Phenomena
- Bermuda Triangle
- Wow signal from space
- Tunguska event
- Loch Ness Monster

### Historical Mysteries
- Shroud of Turin authenticity
- And many more...

---

## How to Use AI Mode

### Step 1: Enable AI Mode
1. Go to http://localhost:8000
2. Check the "ENABLE AI MODE" checkbox
3. Click "OPEN CASE FILE"

### Step 2: Wait for Generation
- You'll see: "Generating AI-powered case briefing... This may take a moment."
- The AI typically takes 5-15 seconds to generate content
- If AI fails, it automatically falls back to template-based cases

### Step 3: Investigate
- Look for the "AI ENHANCED" badge (cyan color)
- Read the AI-generated briefing
- Click on dynamically generated artifact links
- Take notes and submit your investigation

---

## AI vs Template Mode Comparison

| Feature | Template Mode | AI Mode |
|---------|--------------|---------|
| **Cases** | 10 pre-curated | 20+ dynamic topics |
| **Briefing** | Hand-written | AI-generated |
| **Artifacts** | Curated links | Live search results |
| **Speed** | Instant | 5-15 seconds |
| **Variety** | Fixed | Unique each time |
| **Reliability** | 100% | 95% (has fallback) |

---

## Technical Details

### AI Prompt Engineering

The AI uses this prompt structure:

```
You are a detective case file writer. Create a mysterious and engaging case briefing for investigators.

Case Title: [Topic]
Category: [Category]
Difficulty: [Difficulty]

Write a compelling 3-paragraph briefing that:
1. Introduces the mystery with specific details and dates
2. Describes the puzzling evidence and unanswered questions
3. Challenges the investigator to analyze the evidence

Keep it factual, mysterious, and engaging. Write in past tense. Do not provide solutions.
```

### API Integration

```javascript
// HuggingFace API call
const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        inputs: prompt,
        parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.9
        }
    })
});
```

### Wikipedia Integration

```javascript
// Search Wikipedia for mystery topics
const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=5&format=json&origin=*`;
```

---

## Benefits of AI Mode

### 1. Infinite Variety
- Never run out of cases
- Each hash generates a unique case
- Fresh content every time

### 2. Real-World Connection
- Links to actual Wikipedia articles
- Current documentaries and research
- Up-to-date information

### 3. Educational Value
- Exposes users to diverse mysteries
- Encourages deeper research
- Connects to academic sources

### 4. Community Engagement
- Share unique AI-generated cases
- Compare different AI interpretations
- Discuss AI vs human-written cases

---

## Limitations & Considerations

### 1. AI Generation Time
- Takes 5-15 seconds (vs instant for templates)
- May timeout on slow connections
- Automatically falls back to templates if it fails

### 2. Content Quality
- AI-generated text may vary in quality
- Sometimes less polished than hand-written cases
- Occasionally needs regeneration

### 3. API Availability
- Requires internet connection
- HuggingFace API may have rate limits
- Free tier has usage restrictions

### 4. Content Safety
- AI is instructed to be factual and appropriate
- No solutions provided (only mysteries)
- Based on publicly available information

---

## Future AI Enhancements

### Planned Features
1. **AI-Powered Clue Generation**
   - Generate hints based on user's notes
   - Adaptive difficulty

2. **Real-Time Mystery Scraping**
   - Fetch latest unsolved cases from news
   - Update case database automatically

3. **AI Investigation Assistant**
   - Analyze user's notes
   - Suggest research directions
   - Provide feedback on theories

4. **Multi-Language Support**
   - Generate cases in different languages
   - Translate artifacts

5. **Advanced AI Models**
   - Option to use GPT-4 or Claude
   - Better quality briefings
   - More sophisticated analysis

---

## Troubleshooting

### AI Mode Not Working?

**Problem**: "Generating..." message stays forever

**Solutions**:
1. Check internet connection
2. Wait 30 seconds (AI model may be loading)
3. Refresh page and try again
4. Disable AI mode and use template mode

**Problem**: AI-generated text looks weird

**Solutions**:
1. Refresh to regenerate
2. Try a different case hash
3. Report issue for improvement

**Problem**: "AI ENHANCED" badge not showing

**Solutions**:
1. This means AI generation failed
2. System fell back to template mode
3. Try enabling AI mode again

---

## Privacy & Data

### What Data is Sent?
- Case topic/title only
- No personal information
- No user notes or submissions

### What Data is Stored?
- AI-generated briefings (in browser only)
- No server-side storage
- All data stays local

### Third-Party APIs Used
- HuggingFace Inference API (AI generation)
- Wikipedia API (article search)
- No tracking or analytics

---

## Conclusion

AI Mode transforms Case011 from a platform with 10 fixed cases into an **infinite mystery generator** that pulls from the vast repository of real-world unsolved mysteries on the internet.

**Try it now:**
1. Go to http://localhost:8000
2. Check "ENABLE AI MODE"
3. Click "OPEN CASE FILE"
4. Experience AI-powered investigation!

---

**Note**: AI mode is experimental and continuously improving. Feedback welcome!
