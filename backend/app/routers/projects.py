import uuid
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import Project, UploadedDocument, AgentTask, AgentExecutionLog, GeneratedFile, StudySchedule
from app.models.schemas import ProjectCreate, ProjectResponse

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("/dashboard-summary")
async def get_dashboard_summary(db: Session = Depends(get_db)):
    """Returns actual real database records for the student dashboard."""
    project_count = db.query(Project).count()
    doc_count = db.query(UploadedDocument).count()
    files_count = db.query(GeneratedFile).count()
    pending_tasks = db.query(StudySchedule).filter(StudySchedule.completed == False).count()

    recent_projects = db.query(Project).order_by(Project.updated_at.desc()).limit(4).all()
    recent_docs = db.query(UploadedDocument).order_by(UploadedDocument.uploaded_at.desc()).limit(4).all()
    recent_tasks = db.query(StudySchedule).filter(StudySchedule.completed == False).order_by(StudySchedule.created_at.desc()).limit(4).all()
    recent_files = db.query(GeneratedFile).order_by(GeneratedFile.created_at.desc()).limit(4).all()

    return {
        "counts": {
            "projects": project_count,
            "documents": doc_count,
            "generatedFiles": files_count,
            "pendingTasks": pending_tasks
        },
        "recentProjects": [
            {
                "id": p.id,
                "title": p.title,
                "subject": p.subject,
                "status": p.status,
                "updatedAt": p.updated_at.strftime("%b %d, %Y")
            }
            for p in recent_projects
        ],
        "recentDocuments": [
            {
                "id": d.id,
                "fileName": d.file_name,
                "pageCount": d.page_count,
                "uploadedAt": d.uploaded_at.strftime("%b %d, %H:%M")
            }
            for d in recent_docs
        ],
        "upcomingDeadlines": [
            {
                "id": t.id,
                "title": t.title,
                "subject": t.subject,
                "deadline": t.deadline,
                "priority": t.priority
            }
            for t in recent_tasks
        ],
        "recentFiles": [
            {
                "id": f.id,
                "fileName": f.file_name,
                "fileType": f.file_type,
                "downloadUrl": f.download_url
            }
            for f in recent_files
        ]
    }

@router.get("/history")
async def get_execution_history(db: Session = Depends(get_db)):
    """Returns history of all tasks and agent execution logs."""
    tasks = db.query(AgentTask).order_by(AgentTask.started_at.desc()).all()
    result = []
    for t in tasks:
        logs = db.query(AgentExecutionLog).filter(AgentExecutionLog.task_id == t.id).all()
        result.append({
            "id": t.id,
            "taskName": t.task_name,
            "agentAssigned": t.agent_assigned,
            "status": t.status,
            "startedAt": t.started_at.strftime("%b %d, %Y %I:%M %p"),
            "logs": [
                {
                    "agentName": l.agent_name,
                    "stepName": l.step_name,
                    "thought": l.thought,
                    "output": l.output,
                    "status": l.status,
                    "createdAt": l.created_at.strftime("%H:%M:%S")
                }
                for l in logs
            ]
        })
    return result

@router.post("", response_model=ProjectResponse)
async def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    proj = Project(
        id=str(uuid.uuid4()),
        user_id="default-student",
        title=payload.title,
        description=payload.description or "",
        subject=payload.subject or "General",
        status="In Progress"
    )
    db.add(proj)
    db.commit()
    db.refresh(proj)

    return ProjectResponse(
        id=proj.id,
        title=proj.title,
        description=proj.description,
        subject=proj.subject,
        status=proj.status,
        createdAt=proj.created_at.isoformat(),
        updatedAt=proj.updated_at.isoformat(),
        documents=[],
        tasks=[],
        files=[]
    )
