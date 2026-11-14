/**
 * LexiWizard — AI Service
 * Handles calls to the AI backend and returns readable text.
 * Uses Groq's OpenAI-compatible API with the openai/gpt-oss-120b model.
 */

let apiKey = null;

/**
 * Initialize the Groq AI client.
 * Called once on server startup.
 */
function initializeAI() {
    apiKey = process.env.GROQ_API_KEY?.trim() || null;
    if (!apiKey || apiKey === "your_groq_api_key_here") {
        console.error(
            "⚠️  GROQ_API_KEY is not set. Please add GROQ_API_KEY to backend/.env and restart the server."
        );
        console.error("   Get a free key at: https://console.groq.com/keys");
        return false;
    }
    console.log("✅ Groq AI initialized successfully (openai/gpt-oss-120b)");
    return true;
}

/**
 * Generate content using Groq API.
 * @param {string} prompt - The user/tool prompt
 * @param {string} systemInstruction - System-level instruction
 * @param {number} maxRetries - Number of retry attempts
 * @returns {string} Generated text response
 */
async function generateContent(prompt, systemInstruction = "", maxRetries = 3) {
    // If AI is not initialized, throw a clear error so the frontend can display it.
    if (!apiKey) {
        throw new Error(
            "GROQ_API_KEY is not set. Create backend/.env and add GROQ_API_KEY=<your_key>."
        );
    }

    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const messages = [];

            if (systemInstruction) {
                messages.push({ role: "system", content: systemInstruction });
            }

            messages.push({ role: "user", content: prompt });

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages,
                    temperature: 0.7,
                    max_tokens: 4096,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                const snippet = errorBody.length > 200 ? `${errorBody.slice(0, 200)}...` : errorBody;

                if (response.status === 401 || response.status === 403) {
                    throw new Error(
                        `Groq API authentication failed (${response.status}). Check GROQ_API_KEY in backend/.env. Response: ${snippet}`
                    );
                }

                throw new Error(`Groq API error (${response.status}): ${snippet}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            lastError = error;
            console.error(`AI attempt ${attempt}/${maxRetries} failed:`, error.message);

            if (attempt < maxRetries) {
                // Exponential backoff
                const delay = Math.pow(2, attempt) * 1000;
                console.log(`Retrying in ${delay / 1000}s...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw new Error(`AI generation failed after ${maxRetries} attempts: ${lastError?.message}`);
}

/**
 * Parse AI response as JSON, handling markdown code blocks.
 * @param {string} text - Raw AI response text
 * @returns {object} Parsed JSON object
 */
function extractFirstJsonObject(text) {
    const start = text.indexOf("{");
    if (start === -1) return null;

    let depth = 0;
    let inString = false;
    let escape = false;

    for (let i = start; i < text.length; i++) {
        const char = text[i];

        if (escape) {
            escape = false;
            continue;
        }

        if (char === "\\") {
            escape = true;
            continue;
        }

        if (char === '"') {
            inString = !inString;
            continue;
        }

        if (inString) {
            continue;
        }

        if (char === "{") {
            depth += 1;
        } else if (char === "}") {
            depth -= 1;
            if (depth === 0) {
                return text.slice(start, i + 1);
            }
        }
    }

    return null;
}

function parseAIResponse(text) {
    let cleaned = text.trim();

    // Strip markdown code block wrappers if present
    if (cleaned.startsWith("```json")) {
        cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith("```")) {
        cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith("```")) {
        cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();

    // Normalize line endings and escape raw newlines inside JSON strings.
    cleaned = cleaned.replace(/\r\n?/g, "\n");
    let sanitized = "";
    let inString = false;
    let escape = false;

    for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];

        if (escape) {
            sanitized += char;
            escape = false;
            continue;
        }

        if (char === "\\") {
            sanitized += char;
            escape = true;
            continue;
        }

        if (char === '"') {
            sanitized += char;
            inString = !inString;
            continue;
        }

        if (inString && char === "\n") {
            sanitized += "\\n";
            continue;
        }

        sanitized += char;
    }

    // Attempt direct JSON parse first.
    try {
        return JSON.parse(sanitized);
    } catch (e) {
        const extracted = extractFirstJsonObject(sanitized);
        if (extracted) {
            try {
                return JSON.parse(extracted);
            } catch (innerError) {
                console.error("Failed fallback JSON parse:", innerError.message);
            }
        }

        console.error("Failed to parse AI response as JSON:", e.message);
        console.error("Raw response:", text.substring(0, 1000));
        return { raw: text, parseError: true };
    }
}

module.exports = {
    initializeAI,
    generateContent,
    parseAIResponse,
};