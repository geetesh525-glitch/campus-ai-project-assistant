# Campus AI – Intelligent Academic Assistant

Campus AI is a full-stack, university-grade academic productivity platform. It features five specialized AI agents that collaborate to help students analyze course PDFs, complete assignments, conduct systematic research, generate professional slide decks, organize study timetables, and prepare for viva voce examinations.

---

## 🏛️ System Architecture

```
Campus AI
├── frontend/               # React + TypeScript + Vite + Tailwind CSS + Lucide Icons
│   ├── src/pages/          # Landing, Dashboard, AI Workspace, PDF Analyzer, Assignments,
│   │                       # Presentations, Viva Preparation, Study Planner, History, Settings
│   ├── src/components/     # Navigation Sidebar, Top Navbar, Reusable Academic UI Cards
│   └── src/services/       # API client with REST & RAG query handlers
└── backend/                # FastAPI + PyMuPDF + python-docx + python-pptx + SQLite / Supabase
    ├── app/agents/         # 5 Specialized CrewAI Collaborative Agents
    ├── app/services/       # RAG engine (PyMuPDF), DOCX builder, PPTX builder
    ├── app/routers/        # Modular FastAPI REST API routes
    └── app/models/         # SQLAlchemy DB models & Pydantic schemas
```

---

## 🤖 The 5 Specialized AI Agents

1. **Planning Agent (Academic Project Manager)**: Deconstructs user instructions, schedules task breakdown, and coordinates agent handoffs.
2. **Research Agent (Academic Research Specialist)**: Queries indexed PDF chunks using RAG, extracts grounded evidence, and cites verified page numbers.
3. **Content Creation Agent (Academic Content Writer)**: Drafts structured assignment answers, summaries, and PowerPoint slide content with speaker notes.
4. **Fact-Checking Agent (Academic Quality Reviewer)**: Audits statements against source document pages to ensure academic integrity and prevent hallucinations.
5. **Viva Preparation Agent (Academic Tutor)**: Constructs tiered oral defense questions (Easy, Medium, Hard) with model answers and interactive mock scoring (0-100).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (v3.11 - v3.14)

### 2. Backend Setup
```bash
cd backend
source venv/bin/activate    # Or create: python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
The backend API documentation is available at `http://127.0.0.1:8000/docs`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open **`http://127.0.0.1:5173`** in your web browser.

---

## 📁 Key Features

- **Academic PDF Analyzer & RAG**: Upload course material; text is indexed using PyMuPDF and queried with exact page numbers.
- **Assignment Generator**: Produces editable solutions formatted for university submission and exports directly to `.docx`.
- **Presentation Generator**: Generates 16:9 slide decks with bullet points and speaker notes in PowerPoint `.pptx`.
- **Interactive Viva Voce Simulator**: Formulates tiered oral defense questions and grades student verbal/written answers with actionable examiner feedback.
- **Study Timetable**: Tracks assignments, deadlines, priorities, and workload estimates.
- **AI Memory & Privacy**: User-controlled persistence with one-click data deletion.
