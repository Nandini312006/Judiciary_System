/**
 * LexiWizard — Explainer Tool
 * Converts complex legal language into simple English.
 */

const { generateContent, parseAIResponse } = require("../../services/aiService");
const { EXPLAINER_PROMPT } = require("../prompts");

/**
 * Explain legal text in simple English.
 * @param {string} text - Legal text to simplify
 * @returns {Promise<{simplified: string, keyTerms: Array, analogy: string}>}
 */
async function explain(text) {
  console.log("🔧 EXPLAINER tool executing...");

  const prompt = `Here is the legal text to explain in simple English:\n\n${text}`;
  const response = await generateContent(prompt, EXPLAINER_PROMPT);
  const parsed = parseAIResponse(response);

  return {
    tool: "EXPLAINER",
    result: parsed,
  };
}

module.exports = { explain };
