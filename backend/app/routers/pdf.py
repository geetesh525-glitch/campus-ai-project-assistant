import os
import uuid
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.models.entities import UploadedDocument, Project, GeneratedFile
from app.models.schemas import (
    DocumentResponse,
    DocumentDetailedAnalysis,
    RAGQueryRequest,
    RAGQueryResponse,
    ElaborateTopicRequest,
    TopicElaboration
)
from app.services.rag_service import rag_service
from app.services.docx_service import docx_service

router = APIRouter(prefix="/pdf", tags=["PDF Analyzer"])

@router.post("/upload", response_model=DocumentResponse)
async def upload_pdf(
    file: UploadFile = File(...),
    projectId: str = "default-project",
    db: Session = Depends(get_db)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    doc_id = str(uuid.uuid4())
    safe_filename = f"{doc_id}_{file.filename}"
    file_path = os.path.join(settings.STORAGE_PATH, safe_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_size = os.path.getsize(file_path)

    try:
        meta = rag_service.extract_and_index_pdf(file_path, doc_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract and index PDF: {str(e)}")

    # Ensure project exists
    project = db.query(Project).filter(Project.id == projectId).first()
    if not project:
        project = Project(
            id=projectId,
            user_id="default-student",
            title="Academic Workspace",
            description="Active study project",
            subject="General"
        )
        db.add(project)
        db.commit()

    doc_record = UploadedDocument(
        id=doc_id,
        project_id=projectId,
        file_name=file.filename,
        file_path=file_path,
        file_size=file_size,
        page_count=meta["page_count"],
        summary=meta["summary"][:600] + "..." if len(meta["summary"]) > 600 else meta["summary"],
        key_topics=meta["key_topics"]
    )
    db.add(doc_record)
    db.commit()
    db.refresh(doc_record)

    return DocumentResponse(
        id=doc_record.id,
        projectId=doc_record.project_id,
        fileName=doc_record.file_name,
        fileSize=doc_record.file_size,
        pageCount=doc_record.page_count,
        summary=doc_record.summary,
        keyTopics=doc_record.key_topics or [],
        uploadedAt=doc_record.uploaded_at.isoformat()
    )

@router.get("/list")
async def list_documents(db: Session = Depends(get_db)):
    docs = db.query(UploadedDocument).order_by(UploadedDocument.uploaded_at.desc()).all()
    # Re-index any documents stored in DB if not in memory
    for d in docs:
        if d.id not in rag_service._doc_store and os.path.exists(d.file_path):
            try:
                rag_service.extract_and_index_pdf(d.file_path, d.id)
            except Exception as e:
                print(f"[Warning: could not re-index {d.file_name}]: {e}")

    return [
        {
            "id": d.id,
            "fileName": d.file_name,
            "fileSize": d.file_size,
            "pageCount": d.page_count,
            "summary": d.summary,
            "keyTopics": d.key_topics or [],
            "uploadedAt": d.uploaded_at.strftime("%b %d, %H:%M")
        }
        for d in docs
    ]

@router.get("/{document_id}/analysis", response_model=DocumentDetailedAnalysis)
async def get_document_analysis(document_id: str, db: Session = Depends(get_db)):
    """Returns the full, deeply elaborated analysis for a document."""
    analysis = rag_service.get_full_analysis(document_id)
    if not analysis:
        # Check if in DB and re-index
        doc = db.query(UploadedDocument).filter(UploadedDocument.id == document_id).first()
        if doc and os.path.exists(doc.file_path):
            rag_service.extract_and_index_pdf(doc.file_path, doc.id)
            analysis = rag_service.get_full_analysis(document_id)

    if not analysis:
        raise HTTPException(status_code=404, detail="Document analysis not found or document was not processed.")

    return DocumentDetailedAnalysis(**analysis)

@router.post("/query", response_model=RAGQueryResponse)
async def query_document(payload: RAGQueryRequest):
    if not payload.documentId or not payload.query:
        raise HTTPException(status_code=400, detail="Document ID and query are required.")

    result = rag_service.query(payload.documentId, payload.query)
    return RAGQueryResponse(
        query=payload.query,
        answer=result["answer"],
        sourcePages=result["source_pages"],
        citations=result["citations"],
        suggestedFollowUps=result.get("suggested_follow_ups", [])
    )

@router.post("/elaborate-topic", response_model=TopicElaboration)
async def elaborate_topic(payload: ElaborateTopicRequest):
    if not payload.documentId or not payload.topicTitle:
        raise HTTPException(status_code=400, detail="Document ID and topic title are required.")

    result = rag_service.elaborate_topic(payload.documentId, payload.topicTitle)
    return TopicElaboration(**result)

@router.get("/{document_id}/export-notes")
async def export_study_guide(document_id: str, db: Session = Depends(get_db)):
    """Generates an editable Word (.docx) study guide of the entire elaborated analysis."""
    analysis = rag_service.get_full_analysis(document_id)
    if not analysis:
        doc = db.query(UploadedDocument).filter(UploadedDocument.id == document_id).first()
        if doc and os.path.exists(doc.file_path):
            rag_service.extract_and_index_pdf(doc.file_path, doc.id)
            analysis = rag_service.get_full_analysis(document_id)

    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found.")

    sections = [
        {
            "title": "1. Executive Document Overview & Scope",
            "content": analysis["executiveSummary"] + "\n\nMethodology:\n" + analysis["methodologyOverview"]
        },
        {
            "title": "2. Section-by-Section Academic Breakdown",
            "content": "\n\n".join([
                f"Page {ch['pageNumber']}: {ch['title']}\n{ch['overview']}\nKey Points:\n" + "\n".join([f"- {kp}" for kp in ch["keyPoints"]])
                for ch in analysis["chapters"]
            ])
        },
        {
            "title": "3. Elaborated Core Concepts & Principles",
            "content": "\n\n".join([
                f"### {t['title']} (Pages {t['pageNumbers']})\nDefinition: {t['definition']}\n\nElaboration:\n{t['elaboration']}\n\nCore Principles:\n"
                + "\n".join([f"- {cp}" for cp in t["corePrinciples"]])
                + f"\n\nPractical Application: {t['practicalApplication']}\nExam Advice: {t['examSignificance']}\nCommon Pitfalls: {t['commonPitfalls']}"
                for t in analysis["topics"]
            ])
        },
        {
            "title": "4. Comprehensive Exam Preparation Notes & Questions",
            "content": (
                "MUST-KNOW DEFINITIONS:\n"
                + "\n".join([f"- {d['term']}: {d['definition']}" for d in analysis["examNotes"]["mustKnowDefinitions"]])
                + "\n\nHIGH-YIELD FORMULAS & THEOREMS:\n"
                + "\n".join([f"- {f['name']}: {f['formula']}" for f in analysis["examNotes"]["highYieldFormulasAndTheorems"]])
                + "\n\nPROBABLE EXAM QUESTIONS:\n"
                + "\n\n".join([
                    f"Q ({q['marksWeightage']} Marks): {q['question']}\nModel Answer Outline:\n" + "\n".join([f"  • {step}" for step in q["modelAnswerOutline"]])
                    for q in analysis["examNotes"]["probableExamQuestions"]
                ])
                + "\n\nEXAMINER TIPS & GRADING ADVICE:\n"
                + "\n".join([f"- {tip}" for tip in analysis["examNotes"]["examinerTips"]])
            )
        }
    ]

    filename = f"StudyGuide_{analysis['fileName'][:15].replace(' ', '_')}_{document_id[:6]}.docx"
    docx_service.generate_assignment_document(
        filename=filename,
        subject="Academic Study Guide",
        topic=f"Complete Coursework Notes: {analysis['fileName']}",
        student_name="Student",
        sections=sections
    )

    download_url = f"/api/files/download/{filename}"

    gen_file = GeneratedFile(
        project_id="default-project",
        file_type="docx",
        file_name=filename,
        file_path=filename,
        download_url=download_url
    )
    db.add(gen_file)
    db.commit()

    return {"downloadUrl": download_url, "fileName": filename}
