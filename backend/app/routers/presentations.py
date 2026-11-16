import uuid
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import GeneratedFile
from app.models.schemas import PresentationGenerateRequest, PresentationResponse, SlideItem
from app.services.pptx_service import pptx_service
from app.services.rag_service import rag_service

router = APIRouter(prefix="/presentations", tags=["Presentation Generator"])

@router.post("/generate", response_model=PresentationResponse)
async def generate_presentation(payload: PresentationGenerateRequest, db: Session = Depends(get_db)):
    topic = payload.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Presentation topic is required.")

    rag_text = ""
    if payload.documentId:
        q_res = rag_service.query(payload.documentId, topic, top_k=2)
        rag_text = q_res.get("answer", "")

    count = max(3, min(payload.slideCount, 15))
    slides: list[SlideItem] = []

    slide_templates = [
        ("Executive Overview & Academic Objectives", [
            f"Contextual importance of {topic} in higher education",
            "Clear research questions and target outcomes",
            "Scope of today's academic demonstration"
        ], f"Good morning. Today we will explore {topic}, specifically tailored for {payload.audience}."),

        ("Theoretical Foundations & Background", [
            "Historical development and underlying mathematical/logical models",
            "Core nomenclature and taxonomic definitions",
            "Foundational theorems governing this domain"
        ], "Let's first establish common ground regarding the fundamental terminology and theoretical baseline."),

        ("Key Principles & Architecture", [
            "Decomposition of primary structural components",
            "Operational mechanics and functional constraints",
            "Integration with modern standard practices"
        ], "Notice how the structural components interact to guarantee consistency and minimize overhead."),

        ("Literature Analysis & Case Studies", [
            "Empirical results extracted from academic literature",
            "Benchmark comparisons and performance evaluation",
            "Observed trends across modern deployments"
        ], "The literature highlights both strengths and edge-case limitations in real-world scenarios."),

        ("Tradeoffs, Challenges & Discussion", [
            "Analytical tradeoffs between performance and simplicity",
            "Common failure modes and how to prevent them",
            "Open research questions in the field"
        ], "Every architectural design involves deliberate tradeoffs. Let us critically analyze them."),

        ("Conclusion & Viva Voce Key Takeaways", [
            "Synthesis of the presented methodology",
            "Core concepts most frequently tested in examinations",
            "References and questions from the panel"
        ], "In conclusion, keep these core takeaways in mind. Thank you, and I welcome questions from the examination board.")
    ]

    for i in range(count):
        idx = i % len(slide_templates)
        title, bullets, notes = slide_templates[idx]
        if i == 0:
            title = f"Overview: {topic}"
        elif i == count - 1:
            title = "Summary & Key Takeaways"
        
        slides.append(SlideItem(
            slideNumber=i + 1,
            title=title,
            bulletPoints=bullets,
            speakerNotes=notes
        ))

    pres_id = str(uuid.uuid4())
    filename = f"Deck_{topic[:12].replace(' ', '_')}_{pres_id[:6]}.pptx"

    # Build PPTX with python-pptx
    pptx_service.generate_presentation(
        filename=filename,
        topic=topic,
        audience=payload.audience,
        slides_data=[s.model_dump() for s in slides]
    )

    download_url = f"/api/files/download/{filename}"

    gen_file = GeneratedFile(
        project_id=payload.projectId or "default-project",
        file_type="pptx",
        file_name=filename,
        file_path=filename,
        download_url=download_url
    )
    db.add(gen_file)
    db.commit()

    return PresentationResponse(
        id=pres_id,
        topic=topic,
        audience=payload.audience,
        slideCount=len(slides),
        slides=slides,
        pptxUrl=download_url,
        createdAt=str(uuid.uuid1())
    )
