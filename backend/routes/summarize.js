/**
 * LexiWizard — Summarize Route
 */

const express = require("express");
const { handleSummarize } = require("../controllers/summarizeController");

const router = express.Router();

router.post("/", handleSummarize);

module.exports = router;
