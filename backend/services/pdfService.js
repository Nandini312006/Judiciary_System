/**
 * LexiWizard — PDF Service
 * Extracts text content from uploaded PDF files.
 */

const pdfParse = require("pdf-parse");

/**
 * Extract text from a PDF buffer.
 * @param {Buffer} pdfBuffer - The PDF file buffer
 * @returns {Promise<{text: string, pages: number, info: object}>}
 */
async function extractText(pdfBuffer) {
  try {
    const data = await pdfParse(pdfBuffer);

    return {
      text: data.text.trim(),
      pages: data.numpages,
      info: {
        title: data.info?.Title || "Unknown",
        author: data.info?.Author || "Unknown",
        creationDate: data.info?.CreationDate || "Unknown",
      },
    };
  } catch (error) {
    console.error("PDF extraction error:", error.message);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

module.exports = {
  extractText,
};
