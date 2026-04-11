/**
 * LexiWizard — Summarizer Tool
 * Summarizes legal text into structured output.
 */

const { generateContent, parseAIResponse } = require("../../services/aiService");
const { SUMMARIZER_PROMPT } = require("../prompts");

/**
 * Summarize legal text.
 * @param {string} text - Legal text to summarize
 * @returns {Promise<{summary: string, keyPoints: string[], judgment: string}>}
 */
async function summarize(text) {
  console.log("🔧 SUMMARIZER tool executing...");

  const prompt = `Here is the legal text to summarize:\n\n${text}`;
  const response = await generateContent(prompt, SUMMARIZER_PROMPT);
  const parsed = parseAIResponse(response);

  return {
    tool: "SUMMARIZER",
    result: parsed,
  };
}

module.exports = { summarize };
