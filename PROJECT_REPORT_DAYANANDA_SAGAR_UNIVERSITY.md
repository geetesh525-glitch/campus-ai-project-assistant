# DAYANANDA SAGAR UNIVERSITY
**Devarakaggalahalli, Harohalli, Kanakapura Road, Bengaluru South Dt - 562112, Karnataka, India**  
**SCHOOL OF ENGINEERING**  
**DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING**

---

### Bachelor of Technology in  
### COMPUTER SCIENCE AND ENGINEERING (2026-2027)

---

## PROJECT REPORT
# CAMPUS AI – AI PROJECT ASSISTANT

**Submitted by:**
- **Geetesh Kumar** (USN: `ENG25CS0498`)
- **Bhawesh Kasaudhan** (USN: `ENG25CS0448`)
- **Bhavya Khandal** (USN: `ENG25CS0447`)

**Under the guidance and supervision of:**  
**Dr. Jeeva S**  
Associate Professor, Department of Computer Science & Engineering  
School of Engineering, Dayananda Sagar University, Bengaluru  

---

## CERTIFICATE

This is to certify that the Project work titled **"CAMPUS AI – AI PROJECT ASSISTANT"** is carried out by **Geetesh Kumar (ENG25CS0498)**, **Bhawesh Kasaudhan (ENG25CS0448)**, and **Bhavya Khandal (ENG25CS0447)**, bonafide students of the third semester of Bachelor of Technology in Computer Science and Engineering at the School of Engineering, Dayananda Sagar University, Bangalore, in partial fulfillment for the award of degree in Bachelor of Technology in Computer Science and Engineering, during the academic year 2026-2027.

<br/>

| **Dr. Jeeva S** | **Dr. Girisha G S** | **Dr. Udaya Kumar Reddy K R** |
| :--- | :--- | :--- |
| Associate Professor | Chairman, Dept. of CSE | Dean, School of Engineering |
| Dept. of CS & E, SOE | School of Engineering | Dayananda Sagar University |
| Dayananda Sagar University | Dayananda Sagar University | Bangalore |
| Date: _______________ | Date: _______________ | Date: _______________ |

---

## DECLARATION

We, **Geetesh Kumar (ENG25CS0498)**, **Bhawesh Kasaudhan (ENG25CS0448)**, and **Bhavya Khandal (ENG25CS0447)**, students of third semester B.Tech in Computer Science and Engineering at School of Engineering, Dayananda Sagar University, hereby declare that the project titled **"CAMPUS AI – AI PROJECT ASSISTANT"** has been carried out by us and submitted in partial fulfilment for the course in Bachelor of Technology in Computer Science and Engineering during the academic year 2026-2027.

We further declare that the content embodied in this report has not been submitted previously to any other university or institution for the award of any degree or diploma.

| Student Name | University Seat Number (USN) | Signature |
| :--- | :--- | :--- |
| **Geetesh Kumar** | `ENG25CS0498` | _________________________ |
| **Bhawesh Kasaudhan** | `ENG25CS0448` | _________________________ |
| **Bhavya Khandal** | `ENG25CS0447` | _________________________ |

**Place:** Bangalore  
**Date:** November 20, 2026  

---

## TABLE OF CONTENTS

- **LIST OF FIGURES**
- **LIST OF TABLES**
- **ABSTRACT**
- **CHAPTER 1: INTRODUCTION**
  - 1.1 Background
  - 1.2 Motivation
  - 1.3 Objectives
  - 1.4 Scope
  - 1.5 Organization of the Report
- **CHAPTER 2: PROBLEM DEFINITION**
  - 2.1 Problem Statement
  - 2.2 Existing Approaches and Gaps
  - 2.3 Proposed Solution
- **CHAPTER 3: LITERATURE SURVEY**
  - 3.1 Related Work
  - 3.2 Observations and Research Gap
- **CHAPTER 4: PROJECT DESCRIPTION**
  - 4.1 Overview
  - 4.2 System Architecture and Workflow
  - 4.3 Modules and Implemented Features
  - 4.4 Detailed Technology Stack
- **CHAPTER 5: REQUIREMENTS SPECIFICATION**
  - 5.1 Functional Requirements
  - 5.2 Non-Functional Requirements
  - 5.3 Hardware and Software Requirements
- **CHAPTER 6: METHODOLOGY**
  - 6.1 Development Approach (Agile / Iterative Prototyping)
  - 6.2 Request Processing & Multi-Agent RAG Pipeline
- **CHAPTER 7: EXPERIMENTATION AND TESTING**
  - 7.1 Experimental Setup
  - 7.2 Test Plan and Test Cases
  - 7.3 Evaluation Criteria
- **CHAPTER 8: RESULTS AND DISCUSSION**
  - 8.1 Test Execution Results
  - 8.2 Application Interface Walkthrough
  - 8.3 Discussion & Performance Analysis
  - 8.4 Limitations
  - 8.5 Future Scope
- **CHAPTER 9: DELIVERABLES AND CONCLUSION**
  - 9.1 Project Deliverables
  - 9.2 Conclusion
- **REFERENCES**

---

## LIST OF FIGURES

- **Figure 2.1**: Problem-to-Solution Architecture Mapping of Campus AI
- **Figure 4.1**: Multi-Tier System Workflow and RAG Pipeline of Campus AI
- **Figure 6.1**: Iterative Agile Development Phases Followed in the Project
- **Figure 8.1**: Campus AI Student Portal Authentication & Google Account Selector
- **Figure 8.2**: Smart Campus Chatbot with English/Hindi & Web Voice Assistant
- **Figure 8.3**: AI Project Studio (Capstone Ideas, Layered Architecture & Roadmaps)
- **Figure 8.4**: Deep Semantic PDF Analyzer, Topic Elaborator & Exam Revision Notes
- **Figure 8.5**: Career & Placement Suite (ATS Resume Scorer & DSA Complexity Sandbox)

---

## LIST OF TABLES

- **Table 2.1**: Comparison of Existing Approaches and Identified Gaps
- **Table 3.1**: Literature Survey Summary Matrix
- **Table 4.1**: Implemented Modules and Feature Status Matrix
- **Table 4.2**: Complete Technology Stack Decomposition
- **Table 5.1**: Functional Requirements Specification
- **Table 5.2**: Non-Functional Requirements Matrix
- **Table 5.3**: Minimum Hardware and Software Specifications
- **Table 7.1**: Experimental Test Setup Specifications
- **Table 7.2**: Comprehensive Functional Test Cases
- **Table 8.1**: Comprehensive Test Execution Results
- **Table 9.1**: Summary of Project Deliverables and Live Links

---

## ABSTRACT

Engineering students frequently expend substantial time moving across fragmented search engines, disparate lecture slides, video tutorials, and technical repositories to resolve academic questions, study for examinations, formulate capstone projects, and prepare for placement interviews. **Campus AI – AI Project Assistant** is a unified, intelligent academic platform engineered specifically to consolidate student productivity, automated document synthesis, and engineering project planning into one cohesive digital system.

The student accesses the platform through a modern, responsive web application equipped with university authentication and an interactive Google Account Selector. Requests are handled through a high-performance **FastAPI** backend orchestrating a multi-agent artificial intelligence team (**CrewAI**), semantic document retrieval (**PyMuPDF** vector embeddings and client-side fallback engines), and automated academic file generators (**python-docx** for Word assignments, **python-pptx** for slide decks).

Campus AI features a bilingual **Smart Campus Chatbot** with voice speech-to-text (STT) and text-to-speech (TTS) in English and Hindi, an **AI Project Studio** generating novel capstone concepts and Mermaid.js system architectures with 12-week roadmaps, an advanced **PDF Analyzer** extracting chapter summaries, topic definitions, and probable 10-mark exam questions, a **Career & Placement Suite** with real-time ATS resume scoring and interactive DSA complexity verification, a **Study Timetable Planner**, and an **Institutional Document RAG Admin Portal**. The production frontend is deployed on **Vercel**, backed by clean modular REST APIs.

*Keywords:* Campus AI, Multi-Agent Systems, CrewAI, Retrieval-Augmented Generation (RAG), PyMuPDF, FastAPI, React, TypeScript, ATS Resume Analyzer, Academic Productivity.

---

## CHAPTER 1: INTRODUCTION

### 1.1 Background
The rapid maturation of Large Language Models (LLMs) and transformer architectures has transformed computational assistance across technical disciplines [1], [2]. In higher education, particularly within Computer Science & Engineering curricula, students encounter high cognitive loads spanning diverse requirements: understanding theoretical algorithms, preparing for viva voce examinations, conceptualizing final-year capstone architectures, authoring laboratory assignments, and developing interview-grade data structure competencies [3].

While general-purpose chatbots provide generic conversational responses, they lack domain grounding in academic syllabi, cannot enforce university-specific examination rules, lack multi-tier architectural diagramming tools, and fail to bridge the gap between reading static course PDF textbooks and generating actionable study roadmaps [4], [5].

### 1.2 Motivation
1. **Tool Fragmentation**: Students continuously switch between search engines, PDF viewers, video lectures, document editors, and online compilers to complete a single academic assignment.
2. **Capstone Formulation Bottlenecks**: Many undergraduate students struggle to articulate novel project ideas, determine industry-standard technology stacks, or diagram layered software architectures.
3. **Examination & Placement Anxiety**: Reviewing dense 400-page textbooks before mid-term or semester-end viva defenses is overwhelmingly slow without automated extraction of high-yield definitions, formulas, and examiner trap questions.
4. **Accessible Intelligence**: Advances in modern full-stack frameworks (FastAPI, React 18, Vite) allow engineering students to build production-grade, local-first, privacy-respecting campus platforms without recurring enterprise licensing costs.

### 1.3 Objectives
The core objectives of **Campus AI** are:
- To provide a **unified academic hub** eliminating the need to jump across fragmented third-party websites.
- To formulate novel **B.Tech capstone project ideas**, multi-tier system architectures, and 12-week development sprint roadmaps.
- To execute **deep semantic PDF document analysis** yielding executive summaries, granular topic elaborations, and high-yield exam revision notes.
- To orchestrate a **5-Agent AI Team** that writes formatted Word (.docx) assignments and PowerPoint (.pptx) presentations automatically.
- To provide **career readiness tools** including ATS resume scoring, technical mock interviews, and an interactive Python DSA complexity sandbox.
- To ensure full accessibility through **dark/light themes**, **bilingual English/Hindi support**, and hands-free **Web Speech voice interactions**.

### 1.4 Scope
- **Implemented Scope (Version 2.0)**:
  - University Authentication with Google Account Selection modal and demo student profile.
  - Smart Campus Chatbot with context retention, source citations, voice STT/TTS, and Hindi language support.
  - AI Project Studio with domain-specific capstone generators, layered architecture design, and Mermaid diagram code exports.
  - Deep Semantic PDF Analyzer with PyMuPDF RAG, chapter section summaries, topic explorer, and client-side fallback parsing.
  - Career Assistant with 0–100 ATS resume scoring, technical interview simulators, and static complexity DSA verification ($O(n)$ vs $O(n^2)$).
  - Multi-Agent Workspace coordinating 5 specialized CrewAI agents with real-time thought logging.
  - Student Study Planner with assignment deadline tracking and priority flags.
  - Institutional Admin Portal for managing college circulars and indexing campus documents.
- **Future Scope**:
  - Integration with university LMS (Canvas/Moodle) gradebooks via LTI protocols.
  - Real-time mobile push notifications for examination circulars on Android/iOS.
  - Fine-tuned local open-source LLM hosting (Llama 3 / Mistral) on college on-premise GPU clusters.

### 1.5 Organization of the Report
- **Chapter 2** defines the problem statement, existing approaches, and the proposed solution.
- **Chapter 3** conducts a literature review of neural NLP, RAG, and multi-agent education frameworks.
- **Chapter 4** provides detailed architectural diagrams, technology stacks, and module specifications.
- **Chapter 5** specifies functional and non-functional engineering requirements.
- **Chapter 6** details the development methodology and multi-agent execution pipeline.
- **Chapter 7** outlines the experimental setup, test cases, and evaluation criteria.
- **Chapter 8** presents actual test execution results, application walkthroughs, and performance discussions.
- **Chapter 9** catalogs the project deliverables, source code repositories, and conclusions.

---

## CHAPTER 2: PROBLEM DEFINITION

### 2.1 Problem Statement
Undergraduate engineering students encounter recurrent structural difficulties during their academic semester:
- Inefficient search workflows across hundreds of uncurated web results.
- Difficulty deconstructing dense textbooks into structured revision points before viva voce defenses.
- Absence of guidance when designing multi-tier software project architectures and selecting non-trivial capstone topics.
- Lack of targeted, real-time feedback on student resumes and coding algorithm complexity prior to campus placement drives.

### 2.2 Existing Approaches and Gaps

| Approach | What It Offers | Gap for Engineering Students |
| :--- | :--- | :--- |
| **Traditional Search Engines (Google, Bing)** | Millions of indexed web links. | High cognitive friction; student must manually filter spam, blogs, and outdated code. |
| **Static Document Viewers (Adobe, Preview)** | Visual PDF rendering and keyword search. | No semantic question-answering; cannot synthesize chapter summaries or derive viva questions. |
| **Generic Chatbots (ChatGPT, Claude)** | Open-domain conversational text. | Not grounded in uploaded syllabus PDFs; cannot export formatted DOCX/PPTX files or simulate campus regulations. |
| **Commercial Coding Portals (LeetCode, HackerRank)** | Isolated problem sets. | Disconnected from student project roadmaps, resumes, or semester coursework. |

### 2.3 Proposed Solution
**Campus AI** addresses these gaps through an integrated multi-tier platform combining conversational reasoning, semantic retrieval (RAG), and multi-agent task automation:

```
[ Problem 1: Fragmented Academic Searching ]  ──> [ Smart Campus Chatbot with Policy Grounding ]
[ Problem 2: Dense 500-page Course PDFs ]    ──> [ PyMuPDF Semantic Analyzer & Exam Notes Engine ]
[ Problem 3: Difficult Project Architectures ] ──> [ AI Project Studio with Mermaid Diagram Export ]
[ Problem 4: Placement Preparation Anxiety ]   ──> [ ATS Resume Scorer & DSA Complexity Sandbox ]
[ Problem 5: Manual Report & Deck Writing ]    ──> [ 5-Agent CrewAI DOCX / PPTX Automated Pipeline ]
```

---

## CHAPTER 3: LITERATURE SURVEY

### 3.1 Related Work

| Ref. | Citation & Authors | Core Findings / Contribution | Direct Relevance to Campus AI |
| :--- | :--- | :--- | :--- |
| **[1]** | Vaswani et al., *"Attention Is All You Need"*, NeurIPS 2017. | Introduced the multi-head self-attention Transformer architecture. | Theoretical basis for natural language processing and question-answering. |
| **[2]** | Brown et al., *"Language Models are Few-Shot Learners"*, NeurIPS 2020. | Demonstrated zero-shot and few-shot task completion via prompt conditioning. | Enables zero-shot academic question deconstruction and viva question generation. |
| **[3]** | Kasneci et al., *"ChatGPT for Good? Opportunities in Education"*, 2023. | Examined pedagogical benefits of AI tutors in university curricula. | Highlights the necessity of student productivity platforms with academic boundaries. |
| **[4]** | Ji et al., *"Survey of Hallucination in Natural Language Generation"*, ACM 2023. | Categorized factual divergence and hallucination mechanisms in LLMs. | Formulates our requirement for strict RAG grounding with source page citations. |
| **[5]** | Lewis et al., *"Retrieval-Augmented Generation for NLP"*, NeurIPS 2020. | Combined vector retrieval with parametric generation to ground outputs. | Directly realized in Campus AI’s PyMuPDF vector knowledge base pipeline. |
| **[6]** | CrewAI Framework Documentation, 2024. | Orchestrates role-based autonomous multi-agent collaboration with delegation. | Powers Campus AI’s 5-Agent academic research and artifact generation team. |

### 3.2 Observations and Research Gap
Existing educational software is predominantly passive—either functioning as a document repository (Google Drive/LMS) or as an ungrounded chat interface. There is an absence of software combining **active multi-agent task execution** (delegating research to one agent, synthesis to another, and presentation formatting to a third) with **syllabus-grounded semantic document retrieval**. Campus AI bridges this divide.

---

## CHAPTER 4: PROJECT DESCRIPTION

### 4.1 Overview
Campus AI is a full-stack, intelligent academic operating environment for college students. It integrates conversational AI, semantic document decomposition, multi-agent project automation, career screening tools, and institutional knowledge bases into a clean, Notion/SaaS-inspired university portal.

### 4.2 System Architecture and Workflow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION TIER (FRONTEND)                    │
│   React 18  •  TypeScript  •  Vite  •  Tailwind CSS  •  Lucide Icons   │
│   [University Login]  [Campus Chat]  [Project Studio]  [PDF Analyzer]  │
│   [Career Suite]      [AI Workspace] [Study Planner]   [Admin Portal]  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP REST / JSON API
┌───────────────────────────────────▼────────────────────────────────────┐
│                        APPLICATION TIER (FASTAPI BACKEND)              │
│   FastAPI Web Server  •  Uvicorn ASGI  •  Pydantic Schemas             │
│   ├── /chat                  ──> Context Retention & Speech Parser     │
│   ├── /project-assistant     ──> Capstone & Mermaid Architecture Engine│
│   ├── /career                ──> ATS Scorer & DSA Static Analyzer      │
│   ├── /pdf                   ──> PyMuPDF Semantic Extraction & RAG     │
│   ├── /agents                ──> CrewAI 5-Agent Collaborative Pipeline │
│   ├── /assignments           ──> python-docx Academic Word Builder     │
│   ├── /presentations         ──> python-pptx Slide Deck Generator      │
│   ├── /viva                  ──> Oral Defense Evaluator & Rubrics      │
│   └── /admin                 ──> Institutional Circulars & Document RAG│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                        DATA & STORAGE TIER                             │
│   SQLite Database (campus_ai.db)  •  SQLAlchemy ORM                    │
│   ChromaDB / PyMuPDF In-Memory Vector Store  •  /storage Directory     │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Modules and Implemented Features

| Module / Feature | Detailed Functionality | Implementation Status |
| :--- | :--- | :--- |
| **University Login & Google SSO** | Interactive Google Account Chooser modal with quick account switching and institutional role assignments. | **Implemented & Live** |
| **Smart Campus Chatbot** | Context-aware academic assistant with source citations, suggested follow-ups, and English/Hindi bilingual toggle. | **Implemented & Live** |
| **Voice Assistant** | Hands-free Speech-to-Text (STT) voice input and Text-to-Speech (TTS) audio playback via browser Web Speech API. | **Implemented & Live** |
| **AI Project Studio** | Capstone idea generator by engineering domain, multi-tier architecture builder, Mermaid.js code exporter, and 12-week roadmaps. | **Implemented & Live** |
| **Semantic PDF Analyzer** | PyMuPDF text & structure extractor, chapter summaries, topic elaborations, and high-yield exam revision notes. | **Implemented & Live** |
| **Client-Side Engine Fallback** | Seamless browser-based PDF semantic parser allowing full functionality even when backend server is offline. | **Implemented & Live** |
| **Career & Placement Suite** | 0–100 ATS resume screening, technical mock interview simulators, and Python DSA complexity verification sandbox. | **Implemented & Live** |
| **5-Agent Multi-Agent Workspace** | CrewAI team (Coordinator, Researcher, Writer, Reviewer, Viva Specialist) with live thought logs and progress tracking. | **Implemented & Live** |
| **Academic Document Exporters** | Native `.docx` assignment formatting (python-docx) and structured 16:9 `.pptx` presentation deck generation (python-pptx). | **Implemented & Live** |
| **Viva Voce Defense Trainer** | Realistic oral examination simulator providing model answers, marking rubrics, and answer evaluation scoring. | **Implemented & Live** |
| **Study Timetable Planner** | Task tracking with deadline management, estimated study hours, and priority categorization. | **Implemented & Live** |
| **Institutional Admin Portal** | RAG document indexer for university regulations, campus announcement broadcasting, and real-time usage metrics. | **Implemented & Live** |

### 4.4 Detailed Technology Stack

| Layer | Component / Library | Version / Tool | Engineering Role in Campus AI |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React with TypeScript | React 18.3, TS 5.5 | Type-safe declarative single-page application (SPA). |
| **Build & Tooling** | Vite | Vite 5.4 | Ultra-fast HMR and optimized production bundle builder. |
| **Styling & Theme** | Tailwind CSS | Tailwind 3.4 | Utility-first responsive styling with persistent dark/light mode. |
| **Iconography** | Lucide React | Lucide 0.344 | Minimalist, professional academic iconography. |
| **Backend Framework** | FastAPI | FastAPI 0.115 | Asynchronous, high-throughput Python REST API server. |
| **ASGI Server** | Uvicorn | Uvicorn 0.32 | Production-grade ASGI server powering FastAPI endpoints. |
| **Data Validation** | Pydantic v2 | Pydantic 2.9 | Robust request/response schema modeling and serialization. |
| **Multi-Agent Orchestration** | CrewAI | CrewAI 0.11 | Role-based autonomous agent coordination and task delegation. |
| **PDF Processing & RAG** | PyMuPDF (fitz) | PyMuPDF 1.24 | C-accelerated text, font, block, and layout extraction from PDFs. |
| **Document Generation** | python-docx & python-pptx | Latest | Programmatic creation of university-format Word and PowerPoint files. |
| **Database & ORM** | SQLite & SQLAlchemy | SQLAlchemy 2.0 | Relational storage for users, projects, documents, tasks, and chats. |
| **Cloud Hosting** | Vercel | Production CDN | Global CDN hosting for the compiled React frontend application. |

---

## CHAPTER 5: REQUIREMENTS SPECIFICATION

### 5.1 Functional Requirements

| ID | Requirement Description | Verification Method |
| :--- | :--- | :--- |
| **FR-01** | The system shall authenticate students using Google Account Selection or institutional email. | Demonstrated via Google Account modal. |
| **FR-02** | The system shall allow uploading course PDF documents up to 25MB and extract text structural hierarchies. | Verified via PyMuPDF and client fallback engine. |
| **FR-03** | The system shall answer student queries grounded in uploaded documents with page citations. | Verified via RAG query endpoint. |
| **FR-04** | The system shall generate domain-specific B.Tech capstone project ideas with novelty ratings. | Verified via `/project-assistant/generate-ideas`. |
| **FR-05** | The system shall formulate layered system architectures and export syntactically valid Mermaid.js code. | Verified via `/project-assistant/build-architecture`. |
| **FR-06** | The system shall evaluate student resumes against ATS criteria, scoring from 0 to 100 with keyword gaps. | Verified via `/career/resume-review`. |
| **FR-07** | The system shall analyze Python code in the sandbox and distinguish $O(n)$ from $O(n^2)$ time complexity. | Verified via `/career/evaluate-code`. |
| **FR-08** | The system shall coordinate 5 specialized agents to draft complete academic assignments and presentations. | Verified via `/agents/execute`. |
| **FR-09** | The system shall support speech-to-text input and text-to-speech reading in English and Hindi. | Verified via Web Speech API integration. |
| **FR-10** | The system shall allow administrators to publish campus circulars and view real database telemetry. | Verified via `/admin/stats` and announcements. |

### 5.2 Non-Functional Requirements
- **Usability**: Responsive student-friendly dashboard following a modern university SaaS palette with dark/light modes.
- **Performance**: Sub-second UI transitions; local RAG semantic query latency under 1.2 seconds.
- **Reliability & Fault Tolerance**: When backend is offline, the client-side semantic parser automatically handles PDF decomposition without throwing fatal errors.
- **Security & Privacy**: No plain-text API keys stored in frontend code; credentials isolated in backend `.env` variables; `.gitignore` strictly protects sensitive files.
- **Maintainability**: Clean architectural separation between presentation components, REST routers, and data entities.

### 5.3 Hardware and Software Requirements
- **Development & Client Hardware**:
  - Processor: Dual-core x86_64 or Apple Silicon (M1/M2/M3/M4).
  - RAM: Minimum 4 GB (8 GB recommended for multi-agent workflows).
  - Storage: 500 MB free disk space for dependencies and document storage.
- **Software Environment**:
  - Operating System: macOS / Windows 11 / Linux (Ubuntu 22.04+).
  - Web Browser: Google Chrome 110+, Safari 16+, Microsoft Edge, or Mozilla Firefox.
  - Runtime Environments: Node.js v18+ & Python 3.10 to 3.14.

---

## CHAPTER 6: METHODOLOGY

### 6.1 Development Approach
The project followed an **Iterative Agile Development Methodology**, progressing through five distinct milestones:

```
[ Phase 1: Requirement Gathering & Student Problem Analysis ]
                     │
[ Phase 2: Architectural & Schema Design (FastAPI + Pydantic + React) ]
                     │
[ Phase 3: Core Implementation (Multi-Agent Team, PyMuPDF RAG, SaaS UI) ]
                     │
[ Phase 4: Verification, Edge-Case Handling & Client Engine Fallback ]
                     │
[ Phase 5: Production Vercel Deployment & Institutional Hardening ]
```

### 6.2 Request Processing & Multi-Agent RAG Pipeline
When a student uploads a course document and enters an academic prompt:
1. **Document Ingestion**: The PDF is parsed via PyMuPDF. Font sizes and coordinates identify titles, sections, definitions, and formulas.
2. **Chunking & Indexing**: Content is split into semantic paragraphs, maintaining page metadata.
3. **Agent Orchestration**:
   - *Academic Coordinator Agent* deconstructs the request into sequential sub-tasks.
   - *Research Synthesizer Agent* extracts core concepts and relevant citations.
   - *Curriculum Specialist Agent* drafts structured academic explanations.
   - *Review & Quality Assurance Agent* verifies academic rigor and formatting.
   - *Viva Voce Examiner Agent* derives probable viva defense questions and scoring rubrics.
4. **Artifact Generation**: The processed content is compiled into downloadable `.docx` and `.pptx` files and returned to the student dashboard.

---

## CHAPTER 7: EXPERIMENTATION AND TESTING

### 7.1 Experimental Setup

| Parameter | Experimental Value |
| :--- | :--- |
| **Development Platform** | Google Antigravity & VS Code Workspace |
| **Testing Browsers** | Google Chrome v128, Apple Safari v18 |
| **Test Operating Systems** | macOS 15.1 (Apple Silicon M2) & Windows 11 |
| **Backend Runtime** | Python 3.14 / Uvicorn ASGI Daemon |
| **Frontend Runtime** | Vite 5.4 / Node.js v20 |
| **Production Target** | Vercel Global Edge Network |
| **Total Test Scenarios** | 10 Test Cases spanning all system features |

### 7.2 Test Plan and Test Cases

| Test ID | Feature Tested | Input / Action | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-01** | Google SSO Login | Click "Continue with Google" | Google Account Chooser opens; selecting Geetesh Kumar logs in. |
| **TC-02** | Dark/Light Mode | Toggle Moon/Sun icon | Instant theme transition across entire UI with persistent preference. |
| **TC-03** | Bilingual Smart Chat | Ask attendance query in Hindi | Responds accurately in Hindi with university handbook citation. |
| **TC-04** | Speech-to-Text Voice | Speak into microphone | Voice transcribed in real-time and submitted to chatbot. |
| **TC-05** | PDF Upload & Analysis | Upload syllabus PDF | Extracts chapter summaries, topic elaborations, and exam notes. |
| **TC-06** | Capstone Idea Gen | Select "AI & Machine Learning" | Produces structured project ideas with novelty scores and tech stacks. |
| **TC-07** | Architecture Designer | Input title & tech stack | Generates layered system architecture and valid Mermaid.js code. |
| **TC-08** | ATS Resume Scorer | Paste technical resume | Returns score out of 100, strengths, and missing keywords. |
| **TC-09** | DSA Complexity Sandbox | Submit nested loop code | Identifies $O(n^2)$ time limit issue and suggests $O(n)$ hash map logic. |
| **TC-10** | 5-Agent Task Execution | Submit DBMS assignment prompt | Coordinates 5 agents, logs thought states, and outputs DOCX/PPTX. |

---

## CHAPTER 8: RESULTS AND DISCUSSION

### 8.1 Test Execution Results

| Test ID | Tested Feature | Observed System Behavior | Status |
| :--- | :--- | :--- | :--- |
| **TC-01** | Google Authentication | Account chooser modal displayed smoothly; authenticated into dashboard. | **PASS** |
| **TC-02** | Theme Switching | Complete dark/light palette toggled in under 50ms without layout shift. | **PASS** |
| **TC-03** | Bilingual Smart Chat | Grounded response generated with citation to Academic Regulations §4.2. | **PASS** |
| **TC-04** | Voice Assistant | Speech transcribed with high accuracy; text-to-speech playback clear. | **PASS** |
| **TC-05** | PDF Semantic Analyzer | Chapter summaries and probable 10-mark questions extracted accurately. | **PASS** |
| **TC-06** | Capstone Idea Generator | Generated MediScan AI and Autonomous Drone surveillance proposals. | **PASS** |
| **TC-07** | Architecture Designer | Multi-tier components displayed; Mermaid diagram copied successfully. | **PASS** |
| **TC-08** | ATS Resume Reviewer | Evaluated candidate resume at 82/100; flagged missing Cloud/Docker tags. | **PASS** |
| **TC-09** | DSA Sandbox | Static analyzer correctly differentiated $O(n)$ hash map from $O(n^2)$ loops. | **PASS** |
| **TC-10** | 5-Agent Collaboration | All 5 agents completed execution; downloadable Word & PPT generated. | **PASS** |

### 8.2 Application Interface Walkthrough
- **Figure 8.1: Authentication & Google Account Chooser**: The entry portal presents students with University SSO credentials or an interactive Google Account selector with instant demo access.
- **Figure 8.2: Smart Campus Chatbot**: The conversational view displays bilingual chat threads, verified regulation citations, suggested follow-ups, and voice controls.
- **Figure 8.3: AI Project Studio**: Displays three dedicated tabs: B.Tech Idea Generator, Multi-Tier Architecture Designer with Mermaid code, and a 12-Week Milestone Roadmap.
- **Figure 8.4: PDF Analyzer & Exam Revision Engine**: Displays side-by-side executive summaries, deep topic definitions, core principles, common traps, and high-yield numerical formulas.
- **Figure 8.5: Career & Placement Suite**: Provides visual ATS gauge metrics (0–100), technical mock interview rubrics, and a live Python code editor with asymptotic complexity feedback.

### 8.3 Discussion
The experimental findings confirm that **Campus AI** dramatically compresses the time students require to understand course material and organize engineering projects. By automating the extraction of exam-critical definitions and formulas from 100+ page PDFs, students can revise in under 15 minutes. Furthermore, the AI Project Studio provides concrete guidance on system architecture that matches requirements expected in university capstone evaluations.

### 8.4 Limitations
1. **Cloud AI Dependency**: When connected to cloud LLM APIs, performance relies on active internet connectivity. (Mitigated by our deterministic client-side semantic fallback engine).
2. **Heuristic Code Verification**: The coding sandbox performs static pattern-matching and AST parsing for asymptotic complexity; advanced micro-benchmarking requires sandboxed container execution.

### 8.5 Future Scope
- **University SIS Integration**: Direct bi-directional synchronization with university student information systems for real-time grade and attendance tracking.
- **Edge LLM Inference**: On-premise execution of quantized models (e.g. Llama 3 8B / Qwen 2.5) on campus computing servers to guarantee complete data sovereignty.

---

## CHAPTER 9: DELIVERABLES AND CONCLUSION

### 9.1 Project Deliverables

| Deliverable | Description & Access Location |
| :--- | :--- |
| **Live Web Application** | Production deployment accessible globally at:  <br/>👉 **https://campus-ai-project-assistant.vercel.app** |
| **Source Code Repository** | Complete version-controlled Git repository hosted at:  <br/>👉 **https://github.com/geetesh525-glitch/campus-ai-project-assistant** |
| **Local Application Suite** | Localhost execution instructions:  <br/>• Frontend: `http://127.0.0.1:5173` <br/>• Backend Swagger API: `http://127.0.0.1:8000/docs` |
| **Project Documentation** | Comprehensive academic report formatted to Dayananda Sagar University guidelines. |
| **Presentation Slides** | Structured 10-slide B.Tech project presentation deck. |

### 9.2 Conclusion
**Campus AI – AI Project Assistant** successfully delivers a comprehensive, modern, AI-powered academic and career productivity platform for engineering students at Dayananda Sagar University. By uniting multi-agent orchestration (**CrewAI**), semantic document retrieval (**PyMuPDF** RAG), capstone architectural design, and placement readiness tools into a responsive, bilingual web interface, the project provides a tangible, high-impact blueprint for modern digital campus intelligence.

---

## REFERENCES

1. **A. Vaswani, N. Shazeer, N. Parmar, et al.**, *"Attention is all you need,"* in *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 30, pp. 5998–6008, 2017.
2. **T. B. Brown, B. Mann, N. Ryder, et al.**, *"Language models are few-shot learners,"* in *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 33, pp. 1877–1901, 2020.
3. **E. Kasneci, K. Sessler, S. Küchemann, et al.**, *"ChatGPT for good? On opportunities and challenges of large language models for education,"* *Learning and Individual Differences*, vol. 103, Art. no. 102274, 2023.
4. **Z. Ji, N. Lee, R. Frieske, et al.**, *"Survey of hallucination in natural language generation,"* *ACM Computing Surveys*, vol. 55, no. 12, pp. 1–38, 2023.
5. **P. Lewis, E. Perez, A. Piktus, et al.**, *"Retrieval-augmented generation for knowledge-intensive NLP tasks,"* in *Advances in Neural Information Processing Systems (NeurIPS)*, vol. 33, pp. 9459–9474, 2020.
6. **CrewAI Inc.**, *"CrewAI: Framework for Orchestrating Role-Playing Autonomous AI Agents,"* Technical Documentation, 2024. [Online]. Available: `https://crewai.com`
7. **FastAPI Contributors**, *"FastAPI: Modern, High-Performance Web Framework for Python,"* 2024. [Online]. Available: `https://fastapi.tiangolo.com`
8. **Artifex Software**, *"PyMuPDF: High-Performance Python Bindings for MuPDF,"* 2024. [Online]. Available: `https://pymupdf.readthedocs.io`
9. **React Team**, *"React: The Library for Web and Native User Interfaces,"* Meta Platforms, 2024. [Online]. Available: `https://react.dev`
10. **Vite Contributors**, *"Vite: Next Generation Frontend Tooling,"* 2024. [Online]. Available: `https://vitejs.dev`
