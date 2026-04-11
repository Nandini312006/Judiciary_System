/**
 * LexiWizard — Explain Route
 */

const express = require("express");
const { handleExplain } = require("../controllers/explainController");

const router = express.Router();

router.post("/", handleExplain);

module.exports = router;
