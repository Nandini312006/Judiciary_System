/**
 * LexiWizard — Summarize Controller
 * Handles text summarization requests.
 */

const { summarize } = require("../agents/tools/summarizer");

async function handleSummarize(req, res) {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Text is required for summarization" });
    }

    if (text.trim().length < 50) {
      return res.status(400).json({
        error: "Text is too short. Please provide at least 50 characters for meaningful summarization.",
      });
    }

    const result = await summarize(text);

    res.json({
      success: true,
      ...result.result,
    });
  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({
      error: "Failed to summarize text",
      details: error.message,
    });
  }
}

module.exports = { handleSummarize };
