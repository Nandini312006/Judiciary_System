/**
 * LexiWizard — Upload Controller
 * Handles PDF file uploads and text extraction.
 */

const { extractText } = require("../services/pdfService");

async function handleUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are accepted" });
    }

    const result = await extractText(req.file.buffer);

    if (!result.text || result.text.length === 0) {
      return res.status(422).json({
        error: "Could not extract text from this PDF. It may be image-based.",
      });
    }

    res.json({
      success: true,
      text: result.text,
      pages: result.pages,
      info: result.info,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Failed to process PDF",
      details: error.message,
    });
  }
}

module.exports = { handleUpload };
