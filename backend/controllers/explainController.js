/**
 * LexiWizard — Explain Controller
 * Handles legal text simplification requests.
 */

const { explain } = require("../agents/tools/explainer");

async function handleExplain(req, res) {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Text is required for explanation" });
    }

    if (text.trim().length < 20) {
      return res.status(400).json({
        error: "Text is too short. Please provide at least 20 characters.",
      });
    }

    const result = await explain(text);

    res.json({
      success: true,
      ...result.result,
    });
  } catch (error) {
    console.error("Explanation error:", error);
    res.status(500).json({
      error: "Failed to explain text",
      details: error.message,
    });
  }
}

module.exports = { handleExplain };
