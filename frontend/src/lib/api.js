/**
 * LexiWizard — API Client
 * Handles communication with the backend API.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:5001/api`
    : "http://localhost:5001/api");

/**
 * Generic fetch wrapper with error handling.
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Cannot connect to the server. Make sure the backend is running on port 5001."
      );
    }
    throw error;
  }
}

/**
 * Upload a PDF file and extract text.
 * @param {File} file - PDF file object
 * @returns {Promise<{text: string, pages: number, info: object}>}
 */
export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("pdf", file);

  return apiRequest("/upload", {
    method: "POST",
    body: formData,
  });
}

/**
 * Summarize legal text.
 * @param {string} text - Legal text to summarize
 * @returns {Promise<{summary: string, keyPoints: string[], judgment: string}>}
 */
export async function summarizeText(text) {
  return apiRequest("/summarize", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

/**
 * Explain legal text in simple English.
 * @param {string} text - Legal text to explain
 * @returns {Promise<{simplified: string, keyTerms: Array, analogy: string}>}
 */
export async function explainText(text) {
  return apiRequest("/explain", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

/**
 * Send a query to the AI agent.
 * @param {string} query - User's legal question
 * @param {string} context - Optional legal text context
 * @returns {Promise<{steps: Array, toolResults: Array, finalAnswer: string, sections: Array}>}
 */
export async function askAgent(query, context = "") {
  return apiRequest("/agent", {
    method: "POST",
    body: JSON.stringify({ query, context }),
  });
}

/**
 * Check backend health.
 */
export async function checkHealth() {
  return apiRequest("/health", { method: "GET" });
}
