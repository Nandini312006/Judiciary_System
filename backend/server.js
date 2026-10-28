/**
 * LexiWizard — Express Server
 * Main entry point for the backend API.
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { initializeAI } = require("./services/aiService");

// Import routes
const uploadRoutes = require("./routes/upload");
const summarizeRoutes = require("./routes/summarize");
const explainRoutes = require("./routes/explain");
const agentRoutes = require("./routes/agent");

const app = express();
const PORT = process.env.PORT || 5001;

// ─── Middleware ──────────────────────────────────────────────────
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:3001",
            "https://judiciary-system-delta.vercel.app"
        ],


        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ─── Root Info ──────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.json({
        message: "LexiWizard backend is running.",
        api: {
            health: "/api/health",
            upload: "/api/upload",
            summarize: "/api/summarize",
            explain: "/api/explain",
            agent: "/api/agent",
        },
    });
});

// ─── Health Check ───────────────────────────────────────────────
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "LexiWizard API",
        timestamp: new Date().toISOString(),
    });
});

// ─── Routes ─────────────────────────────────────────────────────
app.use("/api/upload", uploadRoutes);
app.use("/api/summarize", summarizeRoutes);
app.use("/api/explain", explainRoutes);
app.use("/api/agent", agentRoutes);

// ─── Error Handler ──────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);

    // Multer errors
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ error: "File too large. Maximum size is 10MB." });
    }

    res.status(500).json({
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

// ─── Start Server ───────────────────────────────────────────────
async function start() {
    // Initialize AI service
    initializeAI();

    const server = app.listen(PORT, () => {
        console.log(`\nLexiWizard API Server running on http://localhost:${PORT}\n`);
    });

    server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.error(`\nPort ${PORT} is already in use. Please stop the process using port ${PORT} or set a different PORT in your environment.`);
        } else {
            console.error("Server error:", error);
        }
        process.exit(1);
    });
}

start().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});