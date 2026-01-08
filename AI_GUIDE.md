# Case011 - AI Integration Guide

This guide explains how to use free, high-quality, open-source AI models to power your investigation platform.

## 1. Top Recommendations (Free Tiers)

To keep your project serverless and free, I recommend these API providers that host open-source models:

| Provider | Best Model | Why use it? |
| :--- | :--- | :--- |
| **Transformers.js**| GPT4All-Mini | **Best for Case011.** Runs 100% in the user's browser. Zero cost. |
| **Groq** | Llama 3 (70B/8B) | **Extremely fast.** Cloud-based. Best for mobile users. |
| **Hugging Face** | Mistral / Phi-3 | Standard cloud inference. (Used as legacy fallback). |
| **Ollama** | Any (Llama, Gemma) | **Local AI.** Great for your own development on your i5 laptop. |

---

## 2. Using Groq (Highly Recommended)
Groq is currently the fastest way to use Llama 3 for free.

1. Get a free API key at [console.groq.com](https://console.groq.com/).
2. Add this to your project (e.g., in a new `js/groqAI.js`):

```javascript
async function queryGroq(prompt) {
    const apiKey = "YOUR_GROQ_API_KEY"; // Use environment variables for production!
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [{ role: "user", content: prompt }]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}
```

---

## 3. Local AI with Ollama
If you want 100% privacy and zero costs (no API limits), use Ollama.

1. Download Ollama from [ollama.com](https://ollama.com/).
2. Run `ollama run llama3` in your terminal.
3. Your project can talk to it locally:

```javascript
async function queryLocalAI(prompt) {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
            model: "llama3",
            prompt: prompt,
            stream: false
        })
    });
    const data = await response.json();
    return data.response;
}
```

---

## 4. Current Invisible AI (`js/aiGenerator.js`)
Your project is already set up to use **Hugging Face Inference API** as a fallback. It uses:
- `mistralai/Mistral-7B-Instruct-v0.2` for briefings.
- `facebook/bart-large-cnn` for summaries.

**To improve it:**
Update the `HUGGINGFACE_API_KEY` in your environment (if you add one to headers) to avoid rate limits on the public tier.

---

## 5. Local AI vs. Cloud AI (Important!)
You asked: *"What about other users?"*

| Type | Used by | How it works |
| :--- | :--- | :--- |
| **Local AI (Ollama)** | **Only You** | Runs on your laptop's CPU/RAM. Other people visiting your website **cannot** access your laptop's Ollama. |
| **Cloud AI (Groq/Hugging Face)** | **Everyone** | Runs on a server in the internet. When a user visits your site, the code calls the API, and the AI works for them instantly. |

**Verdict:** Use **Ollama** for your own testing/development, but use **Groq** or **Hugging Face** if you want your website visitors to experience the AI features.

---

## 6. Hardware Advice (Your Laptop)
**Specs:** i5-1235U | 8GB RAM | 512GB SSD

**Ollama Verdict:** **YES**, you can run Ollama.
- **Recommended Models**: Stay with "Small/Light" models for speed:
    - `ollama run phi3` (Microsoft) - Very smart for its size.
    - `ollama run gemma:2b` (Google) - Extremely fast on your CPU.
- **Tip**: Close heavy apps like Chrome while running AI to free up your 8GB RAM.

---

## 7. Free Deployment Guide (Go Live!)
Since your project is built with HTML/JS, you can host it 100% for free.

### Option A: GitHub Pages (Easiest)
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment**, set source to `Deploy from a branch`.
4. Select `main` branch and `/ (root)` folder. Click **Save**.
5. Your site is live at: `https://[your-username].github.io/Case011/`

### Option B: Netlify (Fastest)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop your `case011` folder into the box.
3. You get a live link immediately.
