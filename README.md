# ⚖️ LexiWizard — AI Legal Assistant

LexiWizard helps lawyers and legal professionals work faster by summarizing documents, explaining legal language, and answering questions in plain English.

## What it does

- **Summarize PDFs** — Upload case files and get clear summaries with the most important points.
- **Explain law** — Turn technical legal text into easy-to-read language.
- **Legal chat** — Ask questions and get practical answers with relevant legal context.
- **Agent-driven workflow** — The backend chooses the right tools, runs them in order, and combines the results.

## Tech stack

- Frontend: Next.js 14, Tailwind CSS v4, React
- Backend: Node.js, Express
- AI: Gemini 2.0 Flash (configurable via `.env`)
- PDF handling: `pdf-parse`, `multer`

## Quick start

### 1. Backend

```bash
cd backend
npm install
# create backend/.env and add your GROQ_API_KEY
npm run dev
```

Backend runs on `http://localhost:5001`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

## API endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/upload` | Upload a PDF and extract text |
| POST | `/api/summarize` | Summarize legal content |
| POST | `/api/explain` | Simplify legal language |
| POST | `/api/agent` | Run the AI agent workflow |
| GET | `/api/health` | Check service health |

## Project layout

```
codex/
├── frontend/          # Next.js app and UI components
│   ├── src/app/       # Pages for chat, explain, summarize
│   ├── src/components/ # UI widgets
│   └── src/lib/       # API client code
├── backend/           # Express server and AI services
│   ├── routes/        # API routes
│   ├── controllers/   # Request handlers
│   ├── services/      # AI and PDF utilities
│   └── agents/        # Agent orchestration logic
└── README.md
```

## How the agent works

1. Analyze user intent
2. Choose the right tools
3. Run the tools in order
4. Combine the results into a final answer
