/**
 * LexiWizard — Agent Controller
 * Handles agentic AI pipeline requests.
 */

const { runAgent } = require("../agents/orchestrator");

async function handleAgent(req, res) {
  try {
    const { query, context } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: "Query is required" });
    }

    console.log(`\n🤖 Agent received query: "${query.substring(0, 100)}..."`);

    const result = await runAgent(query, context || "");

    res.json({
      success: true,
      steps: result.steps,
      toolResults: result.toolResults,
      finalAnswer: result.finalAnswer,
      sections: result.sections,
    });
  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({
      error: "Agent processing failed",
      details: error.message,
    });
  }
}

module.exports = { handleAgent };
