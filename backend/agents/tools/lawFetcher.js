/**
 * LexiWizard — Law Fetcher Tool
 * Finds relevant laws, IPC sections, and acts related to a query.
 */

const { generateContent, parseAIResponse } = require("../../services/aiService");
const { LAW_FETCHER_PROMPT } = require("../prompts");

/**
 * Fetch relevant laws and legal provisions.
 * @param {string} query - User's legal question or context
 * @returns {Promise<{laws: Array, advice: string}>}
 */
async function fetchLaws(query) {
  console.log("🔧 LAW_FETCHER tool executing...");

  const prompt = `Here is the legal query to research:\n\n${query}`;
  const response = await generateContent(prompt, LAW_FETCHER_PROMPT);
  const parsed = parseAIResponse(response);

  return {
    tool: "LAW_FETCHER",
    result: parsed,
  };
}

module.exports = { fetchLaws };
