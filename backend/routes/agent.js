/**
 * LexiWizard — Agent Route
 */

const express = require("express");
const { handleAgent } = require("../controllers/agentController");

const router = express.Router();

router.post("/", handleAgent);

module.exports = router;
