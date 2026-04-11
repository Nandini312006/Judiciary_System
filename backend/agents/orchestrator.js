/**
 * LexiWizard — Agent Orchestrator
 * Core agentic AI system with multi-step reasoning.
 * 
 * Pipeline:
 * 1. Analyze user intent → classify which tools to use
 * 2. Execute selected tools sequentially
 * 3. Combine results into a coherent final answer
 */

const { generateContent, parseAIResponse } = require("../services/aiService");
const {
  INTENT_CLASSIFIER_PROMPT,
  RESULT_COMBINER_PROMPT,
} = require("./prompts");
const { summarize } = require("./tools/summarizer");
const { explain } = require("./tools/explainer");
const { fetchLaws } = require("./tools/lawFetcher");

// Tool registry
const TOOLS = {
  SUMMARIZER: summarize,
  EXPLAINER: explain,
  LAW_FETCHER: fetchLaws,
};

/**
 * Run the full agentic pipeline.
 * @param {string} query - User's question or request
 * @param {string} context - Optional legal text context
 * @returns {Promise<{steps: Array, toolResults: Array, finalAnswer: string, sections: Array}>}
 */
async function runAgent(query, context = "") {
  const steps = [];
  const toolResults = [];

  // ─── Step 1: Analyze Intent ───────────────────────────────────
  steps.push({
    step: 1,
    action: "Analyzing your query to understand what you need...",
    status: "running",
  });

  const intentPrompt = context
    ? `User query: "${query}"\n\nProvided legal text/context:\n${context.substring(0, 3000)}`
    : `User query: "${query}"`;

  const intentRaw = await generateContent(intentPrompt, INTENT_CLASSIFIER_PROMPT);
  const intent = parseAIResponse(intentRaw);

  steps[0].status = "completed";
  steps[0].result = {
    intent: intent.intent || "General legal query",
    selectedTools: intent.tools || ["EXPLAINER"],
    reasoning: intent.reasoning || "Defaulting to explanation",
  };

  // Validate tools
  const selectedTools = (intent.tools || ["EXPLAINER"]).filter(
    (t) => TOOLS[t] !== undefined
  );

  if (selectedTools.length === 0) {
    selectedTools.push("EXPLAINER");
  }

  // ─── Step 2: Execute Tools ────────────────────────────────────
  for (let i = 0; i < selectedTools.length; i++) {
    const toolName = selectedTools[i];
    const stepNum = i + 2;

    steps.push({
      step: stepNum,
      action: `Executing ${toolName} tool...`,
      status: "running",
    });

    try {
      const toolFn = TOOLS[toolName];
      const input = context || query;
      const result = await toolFn(input);

      toolResults.push(result);
      steps[stepNum - 1].status = "completed";
      steps[stepNum - 1].result = result;
    } catch (error) {
      console.error(`Tool ${toolName} failed:`, error.message);
      steps[stepNum - 1].status = "failed";
      steps[stepNum - 1].error = error.message;
    }
  }

  // ─── Step 3: Combine Results ──────────────────────────────────
  const combineStep = {
    step: steps.length + 1,
    action: "Combining all results into a comprehensive answer...",
    status: "running",
  };
  steps.push(combineStep);

  let finalAnswer = "";
  let sections = [];

  try {
    const combinePrompt = `
User's original query: "${query}"

Tool results to combine:
${JSON.stringify(toolResults, null, 2)}

Please combine these results into a single, coherent, comprehensive answer.
    `;

    const combinedRaw = await generateContent(combinePrompt, RESULT_COMBINER_PROMPT);
    const combined = parseAIResponse(combinedRaw);

    finalAnswer = combined.finalAnswer || "Unable to generate a combined response.";
    sections = combined.sections || [];
    combineStep.status = "completed";
  } catch (error) {
    console.error("Result combination failed:", error.message);
    combineStep.status = "failed";

    // Fallback: just concatenate tool results
    finalAnswer = toolResults
      .map((r) => JSON.stringify(r.result, null, 2))
      .join("\n\n---\n\n");
  }

  return {
    steps: steps.map((s) => ({
      step: s.step,
      action: s.action,
      status: s.status,
    })),
    toolResults,
    finalAnswer,
    sections,
  };
}

module.exports = { runAgent };
