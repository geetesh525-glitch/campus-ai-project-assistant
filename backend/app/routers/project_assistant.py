import uuid
from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    ProjectIdeaGenerateRequest,
    ProjectIdeaItem,
    ProjectArchitectureRequest,
    ProjectArchitectureResponse,
    ProjectRoadmapRequest,
    ProjectRoadmapResponse
)

router = APIRouter(prefix="/project-assistant", tags=["AI Project Assistant"])

CURATED_PROJECT_IDEAS = {
    "AI & Machine Learning": [
        {
            "title": "MediScan AI: Multi-Modal Clinical Report & Radiology Synthesizer",
            "tagline": "RAG-driven diagnostic assistant for cross-referencing patient history with CT scan annotations.",
            "problemStatement": "Radiologists face severe diagnostic backlogs, while patients struggle to comprehend complex clinical terminology across fragmented scan reports.",
            "proposedSolution": "An end-to-end multi-modal platform that extracts chest X-ray features using Vision Transformers (ViT) and correlates them with patient EHRs using localized RAG.",
            "keyFeatures": [
                "Automated pathology localization on X-rays/MRIs",
                "Patient-friendly and physician-technical bilingual report generation",
                "Differential diagnosis suggestions with confidence bounds",
                "HIPAA-compliant on-device vector storage"
            ],
            "suggestedTechStack": {
                "Frontend": ["React", "TypeScript", "Tailwind CSS", "Cornerstone.js"],
                "Backend": ["FastAPI", "PyTorch", "HuggingFace Transformers"],
                "Database": ["PostgreSQL with pgvector", "MinIO object storage"],
                "ML Models": ["BioClinical-BERT", "TorchXRayVision"]
            },
            "industryRelevance": "High demand in telehealth and hospital workflow automation.",
            "noveltyFactor": "Combines multi-modal image classification directly with conversational RAG explanation."
        },
        {
            "title": "Autonomous Edge Guard: Distributed Drone Surveillance for Campus Safety",
            "tagline": "Real-time incident detection and geo-fenced path tracking on low-power edge nodes.",
            "problemStatement": "Campus safety monitoring relying on manual CCTV reviews leads to delayed emergency responses during nighttime hours.",
            "proposedSolution": "Edge-deployed YOLOv9 computer vision models running on Jetson Nano devices coupled with an autonomous drone patrol coordinator.",
            "keyFeatures": [
                "Real-time perimeter intrusion and anomaly detection",
                "Encrypted WebRTC live camera telemetry",
                "Automatic emergency alert dispatch to campus security",
                "Battery-conserving dynamic patrol trajectory planning"
            ],
            "suggestedTechStack": {
                "Frontend": ["React", "Mapbox GL", "Chart.js"],
                "Backend": ["FastAPI", "WebSockets", "Celery", "Redis"],
                "Hardware/Edge": ["NVIDIA Jetson Orin Nano", "ROS2", "YOLOv9"],
                "Database": ["TimescaleDB for GPS telemetry"]
            },
            "industryRelevance": "Smart campus, smart cities, and industrial site monitoring.",
            "noveltyFactor": "Edge-inference with zero cloud reliance for real-time latency."
        }
    ],
    "Cloud & DevOps": [
        {
            "title": "AutoKube FinOps: Predictive Kubernetes Autoscaler & Cloud Waste Eliminator",
            "tagline": "Machine learning driven resource reallocation preventing 40%+ idle cloud compute expenditure.",
            "problemStatement": "Organizations over-provision Kubernetes cluster nodes by 30-50% to prevent tail-latency spikes, wasting millions annually.",
            "proposedSolution": "A custom Kubernetes Kubernetes Operator utilizing LSTM traffic forecasting to adjust pod CPU/Memory requests proactively before traffic surges occur.",
            "keyFeatures": [
                "Proactive predictive Horizontal Pod Autoscaling (HPA)",
                "Per-namespace cost attribution and carbon footprint calculation",
                "Automated Spot Instance bid management and graceful eviction handling",
                "One-click Helm chart deployment"
            ],
            "suggestedTechStack": {
                "Frontend": ["Next.js", "Tailwind CSS", "Recharts"],
                "Backend": ["Go / Golang Operator SDK", "FastAPI analytics service"],
                "Infrastructure": ["Kubernetes", "Prometheus", "Grafana", "Helm"],
                "Database": ["VictoriaMetrics", "PostgreSQL"]
            },
            "industryRelevance": "Critical priority across high-growth startups and tech enterprises.",
            "noveltyFactor": "Replaces reactive threshold-based autoscaling with proactive time-series forecast models."
        }
    ],
    "Cybersecurity": [
        {
            "title": "ZeroTrust Sentinel: Dynamic Behavioral Micro-Segmentation for Distributed APIs",
            "tagline": "Continuous biometric and API token risk-scoring preventing lateral movement attacks.",
            "problemStatement": "Static API keys and perimeter-only firewalls leave internal services vulnerable once a single boundary gateway is breached.",
            "proposedSolution": "An eBPF-powered service mesh sidecar proxy that calculates real-time threat scores for every intra-service RPC invocation.",
            "keyFeatures": [
                "eBPF kernel-level packet inspection with microsecond overhead",
                "Dynamic mutual TLS (mTLS) certificate rotation",
                "Machine-learning behavioral anomaly detection on JSON payloads",
                "Automated circuit-breaking on compromised nodes"
            ],
            "suggestedTechStack": {
                "Frontend": ["React", "Vis.js for topological dependency graph"],
                "Backend": ["Rust", "eBPF (Aya)", "FastAPI management plane"],
                "Database": ["ClickHouse for high-throughput security audit logs"],
                "Security": ["Open Policy Agent (OPA)", "SPIFFE/SPIRE"]
            },
            "industryRelevance": "Highest-priority security directive across modern cloud infrastructures.",
            "noveltyFactor": "Uses Linux kernel eBPF hooks rather than heavy user-space reverse proxies."
        }
    ]
}

@router.post("/generate-ideas", response_model=list[ProjectIdeaItem])
async def generate_project_ideas(payload: ProjectIdeaGenerateRequest):
    domain = payload.domain
    ideas = CURATED_PROJECT_IDEAS.get(domain, CURATED_PROJECT_IDEAS["AI & Machine Learning"])

    result = []
    for item in ideas:
        result.append(ProjectIdeaItem(
            id=str(uuid.uuid4()),
            title=item["title"],
            tagline=item["tagline"],
            problemStatement=item["problemStatement"],
            proposedSolution=item["proposedSolution"],
            keyFeatures=item["keyFeatures"],
            suggestedTechStack=item["suggestedTechStack"],
            industryRelevance=item["industryRelevance"],
            noveltyFactor=item["noveltyFactor"]
        ))
    return result

@router.post("/build-architecture", response_model=ProjectArchitectureResponse)
async def build_project_architecture(payload: ProjectArchitectureRequest):
    title = payload.projectTitle
    stack_list = payload.techStack or ["React", "FastAPI", "PostgreSQL", "Docker"]

    layers = [
        {
            "layerName": "Presentation & Client Tier",
            "components": ["Single Page Application (SPA)", "State Store", "WebSockets Audio/Stream Handler", "Responsive UI System"],
            "technologies": [s for s in stack_list if any(k in s.lower() for k in ["react", "vue", "next", "tailwind", "client"]) or s == stack_list[0]]
        },
        {
            "layerName": "API Gateway & Ingress Layer",
            "components": ["Reverse Proxy / Load Balancer", "JWT Authentication Guard", "Rate Limiter", "CORS Middleware"],
            "technologies": ["Nginx / Traefik", "OAuth 2.0 / JWT", "FastAPI Ingress"]
        },
        {
            "layerName": "Core Application & AI Orchestration",
            "components": ["Async Business Logic Router", "RAG Vector Retrieval Service", "Task Queue Worker", "Document Ingestion Engine"],
            "technologies": [s for s in stack_list if any(k in s.lower() for k in ["fastapi", "python", "pytorch", "transformers", "node", "go"]) or "FastAPI" in s]
        },
        {
            "layerName": "Data Persistence & Vector Store",
            "components": ["Relational Schema (User / Tasks)", "Vector Database (Embeddings)", "Object Storage (PDFs & Artifacts)", "In-Memory Cache"],
            "technologies": ["PostgreSQL", "ChromaDB / pgvector", "Redis Cache", "Local File Storage"]
        }
    ]

    data_flow = [
        "1. Client initiates TLS-encrypted request via JWT-authenticated REST/WebSocket payload.",
        "2. API Gateway validates request schema, checks rate limits, and routes to appropriate service container.",
        "3. Core Engine queries Vector Database (ChromaDB) to retrieve semantic context chunks.",
        "4. Multi-agent processing engine synthesizes grounded response with exact citations.",
        "5. Artifact builder generates formatted .docx/.pptx files and persists record to PostgreSQL.",
        "6. Event response streamed back to client with real-time UI status updates."
    ]

    security_scaling = [
        "End-to-End Encryption: TLS 1.3 in transit and AES-256 for resting vector embeddings.",
        "Horizontal Container Scaling: Stateless backend services deployed via Docker Compose / Kubernetes.",
        "Zero-Trust Access Control: Role-based permissions strictly enforced at every route handler.",
        "Resilient Failure Handling: Idempotent database transactions with automatic rollback."
    ]

    mermaid = f"""graph TD
    Client["Client Interface (React / Mobile)"] -->|HTTPS / WSS| Gateway["API Gateway & Auth Guard"]
    Gateway --> Router["FastAPI Microservices"]
    Router --> RAG["Semantic RAG & Vector Engine"]
    Router --> Worker["Async Task Workers"]
    RAG --> Chroma[("ChromaDB Vector Store")]
    Router --> DB[("PostgreSQL / SQLite Database")]
    Worker --> Storage[("Artifact Storage (DOCX / PPTX)")]
    """

    return ProjectArchitectureResponse(
        projectTitle=title,
        architecturalPattern="Decoupled Modular N-Tier Architecture with Semantic RAG & Async Worker Queue",
        layers=layers,
        dataFlowSteps=data_flow,
        securityAndScaling=security_scaling,
        mermaidDiagram=mermaid
    )

@router.post("/roadmap", response_model=ProjectRoadmapResponse)
async def generate_project_roadmap(payload: ProjectRoadmapRequest):
    weeks = payload.durationWeeks or 12

    phases = [
        {
            "phaseNumber": 1,
            "title": "Phase 1: Research, Problem Formulation & Tech Spike",
            "timeframe": f"Weeks 1 - {weeks // 4}",
            "deliverables": [
                "Finalize IEEE problem statement and literature review",
                "Define database schema and API route contracts",
                "Prototype zero-risk technology spike (RAG & Model benchmarks)",
                "Submit formal Project Synopsis to Department Review Board"
            ]
        },
        {
            "phaseNumber": 2,
            "title": "Phase 2: Core Backend Engine & Data Pipeline",
            "timeframe": f"Weeks {weeks // 4 + 1} - {weeks // 2}",
            "deliverables": [
                "Implement database models, migrations, and CRUD routes",
                "Build PyMuPDF ingestion and vector indexing pipeline",
                "Integrate authentication and role-based permissions",
                "Establish unit test suite with 80%+ code coverage"
            ]
        },
        {
            "phaseNumber": 3,
            "title": "Phase 3: Frontend Integration & Advanced AI Collaboration",
            "timeframe": f"Weeks {weeks // 2 + 1} - {weeks * 3 // 4}",
            "deliverables": [
                "Develop responsive SaaS dashboard with light/dark theme",
                "Connect real-time agent execution tracking and typing indicators",
                "Implement export pipelines for .DOCX and .PPTX generation",
                "Conduct Mid-Term Project Defense and faculty demonstration"
            ]
        },
        {
            "phaseNumber": 4,
            "title": "Phase 4: Optimization, Security Hardening & Final Viva",
            "timeframe": f"Weeks {weeks * 3 // 4 + 1} - {weeks}",
            "deliverables": [
                "Perform stress testing, latency profiling, and security auditing",
                "Deploy production build on cloud infrastructure",
                "Author comprehensive 80-page IEEE Capstone Project Report",
                "Final Viva Voce examination and live committee presentation"
            ]
        }
    ]

    milestones = [
        "Milestone A: Synopsis Approved by HOD Committee (Week 4)",
        "Milestone B: Working Prototype Demonstration with Real Data (Week 8)",
        "Milestone C: Complete End-to-End System Integration (Week 11)",
        "Milestone D: Final Viva Defense & Plagiarism Clearance (<10%) (Week 14)"
    ]

    criteria = [
        "Technical Depth & Algorithmic Rigor (30%)",
        "System Architecture & Code Organization (25%)",
        "Practical Utility & Demo Quality (25%)",
        "Project Report & Viva Defense Performance (20%)"
    ]

    return ProjectRoadmapResponse(
        projectTitle=payload.projectTitle,
        phases=phases,
        milestones=milestones,
        evaluationCriteria=criteria
    )
