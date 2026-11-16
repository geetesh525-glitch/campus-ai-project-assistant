import uuid
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import GeneratedFile
from app.models.schemas import AssignmentGenerateRequest, AssignmentResponse
from app.services.docx_service import docx_service
from app.services.rag_service import rag_service

router = APIRouter(prefix="/assignments", tags=["Assignments"])

@router.post("/generate", response_model=AssignmentResponse)
async def generate_assignment(payload: AssignmentGenerateRequest, db: Session = Depends(get_db)):
    topic = payload.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Assignment topic is required.")

    # Context from PDF if documentId is provided
    rag_context = ""
    if payload.documentId:
        q_res = rag_service.query(payload.documentId, topic, top_k=3)
        rag_context = q_res.get("answer", "")

    # Build structured assignment sections
    sections = [
        {
            "title": "1. Problem Formulation & Objective",
            "content": (
                f"The primary goal of this assignment is to examine '{topic}' in the context of {payload.subject}. "
                f"Student guidelines specify a {payload.explanationStyle.lower()} approach with a {payload.answerLength.lower()} level of technical depth.\n\n"
                f"{payload.instructions if payload.instructions else 'Strict adherence to academic terminology and structured reasoning.'}"
            )
        },
        {
            "title": "2. Theoretical Background & Literature Analysis",
            "content": (
                f"A systematic review reveals key theoretical foundations regarding {topic}. "
                + (f"Material extracted directly from the reference document indicates:\n{rag_context}\n\n" if rag_context else "")
                + "- Fundamental postulates and core terminology.\n"
                + "- Structural constraints and computational implications.\n"
                + "- Standard analytical methodologies applied in university coursework."
            )
        },
        {
            "title": "3. Step-by-Step Assignment Solutions & Derivations",
            "content": (
                f"Detailed answer structure for {topic}:\n\n"
                "• Phase A: Decomposition into primary entities and dependencies.\n"
                "• Phase B: Application of standard theorems and normalizations.\n"
                "• Phase C: Edge case verification and conflict minimization.\n"
                "• Phase D: Mathematical/empirical validation of the finalized solution."
            )
        },
        {
            "title": "4. Academic Conclusion & Review",
            "content": (
                f"In conclusion, the analysis for '{topic}' satisfies the assigned academic criteria. "
                "The methodology provides verifiable consistency, minimizing redundancies and providing clear reproducible steps."
            )
        }
    ]

    full_content = "\n\n".join([f"=== {s['title']} ===\n{s['content']}" for s in sections])
    assign_id = str(uuid.uuid4())
    filename = f"Assignment_{payload.subject[:10]}_{assign_id[:6]}.docx"

    docx_service.generate_assignment_document(
        filename=filename,
        subject=payload.subject,
        topic=topic,
        student_name="Student",
        sections=sections,
        explanation_style=payload.explanationStyle
    )

    docx_url = f"/api/files/download/{filename}"

    # Record in database
    gen_file = GeneratedFile(
        project_id=payload.projectId or "default-project",
        file_type="docx",
        file_name=filename,
        file_path=filename,
        download_url=docx_url
    )
    db.add(gen_file)
    db.commit()

    return AssignmentResponse(
        id=assign_id,
        topic=topic,
        subject=payload.subject,
        content=full_content,
        sections=sections,
        docxUrl=docx_url,
        createdAt=str(uuid.uuid1())
    )
