# Case011 - AI Integration Guide

This guide explains how to use free, high-quality, open-source AI models to power your investigation platform.

## 1. Top Recommendations (Free Tiers)

To keep your project serverless and free, I recommend these API providers that host open-source models:

| Provider | Best Model | Why use it? |
| :--- | :--- | :--- |
| **Groq** | Llama 3 (70B/8B) | **Extremely fast.** Best free tier for high-performance open models. |
| **Hugging Face** | Mistral / Phi-3 | Great for standard inference without heavy setup. (Already partially used). |
| **Mistral AI** | Mistral Large | Very reliable and smart; has a "La Plateforme" free tier. |
| **Ollama** | Any (Llama, Gemma) | **Local AI.** Run it on your own machine for unlimited free generations. |

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
