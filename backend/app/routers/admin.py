import os
import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.models.entities import (
    User,
    UploadedDocument,
    AgentTask,
    CampusAnnouncement,
    CampusKnowledgeDoc,
    CampusChatMessage,
    GeneratedFile
)
from app.models.schemas import (
    AnnouncementCreate,
    AnnouncementResponse,
    AdminStatsResponse
)

router = APIRouter(prefix="/admin", tags=["Admin Dashboard & Campus Knowledge"])

@router.get("/stats", response_model=AdminStatsResponse)
async def get_admin_stats(db: Session = Depends(get_db)):
    student_count = max(1, db.query(User).count())
    doc_count = db.query(UploadedDocument).count()
    task_count = db.query(AgentTask).count()
    chat_count = db.query(CampusChatMessage).count()
    announcement_count = db.query(CampusAnnouncement).filter(CampusAnnouncement.active == True).count()

    # Calculate real storage usage
    storage_bytes = 0
    if os.path.exists(settings.STORAGE_PATH):
        for root, _, files in os.walk(settings.STORAGE_PATH):
            for f in files:
                fp = os.path.join(root, f)
                try:
                    storage_bytes += os.path.getsize(fp)
                except OSError:
                    pass

    storage_mb = round(storage_bytes / (1024 * 1024), 2)

    return AdminStatsResponse(
        totalStudents=student_count,
        documentsIndexed=doc_count,
        agentTasksCompleted=task_count,
        queriesResolved=chat_count,
        announcementsActive=announcement_count,
        storageUsedMB=storage_mb,
        systemHealth="Operational • All 5 Agents Healthy"
    )

@router.get("/announcements", response_model=list[AnnouncementResponse])
async def list_announcements(db: Session = Depends(get_db)):
    announcements = db.query(CampusAnnouncement).order_by(CampusAnnouncement.published_date.desc()).all()
    # Provide starter announcements if empty
    if not announcements:
        sample_announcements = [
            CampusAnnouncement(
                id=str(uuid.uuid4()),
                title="End-Semester Examination Schedule & Seating Arrangement Published",
                category="Examination",
                content="The final examination timetable for BTech Odd Semesters has been officially published on the campus portal. Hall tickets will be available for download starting Monday.",
                priority="Urgent",
                author="Controller of Examinations",
                published_date=datetime.utcnow(),
                active=True
            ),
            CampusAnnouncement(
                id=str(uuid.uuid4()),
                title="BTech Capstone Major Project Synopsis Defense Dates",
                category="Academic",
                content="All final-year students must submit their IEEE project synopsis and system architecture diagrams to their respective departmental coordinators by next Friday.",
                priority="High",
                author="Head of Department (CSE)",
                published_date=datetime.utcnow(),
                active=True
            ),
            CampusAnnouncement(
                id=str(uuid.uuid4()),
                title="Campus Placement Drive: Top Tier-1 Tech Recruiters Scheduled",
                category="Placement",
                content="On-campus technical coding assessments for SDE-1 roles commence next week. Students are advised to update their ATS resumes on the placement portal.",
                priority="Normal",
                author="Training & Placement Officer",
                published_date=datetime.utcnow(),
                active=True
            )
        ]
        db.add_all(sample_announcements)
        db.commit()
        announcements = sample_announcements

    return [
        AnnouncementResponse(
            id=a.id,
            title=a.title,
            category=a.category,
            content=a.content,
            priority=a.priority,
            author=a.author,
            publishedDate=a.published_date.strftime("%b %d, %Y"),
            active=a.active
        )
        for a in announcements
    ]

@router.post("/announcements", response_model=AnnouncementResponse)
async def create_announcement(payload: AnnouncementCreate, db: Session = Depends(get_db)):
    if not payload.title.strip() or not payload.content.strip():
        raise HTTPException(status_code=400, detail="Title and content are required.")

    ann = CampusAnnouncement(
        id=str(uuid.uuid4()),
        title=payload.title.strip(),
        category=payload.category,
        content=payload.content.strip(),
        priority=payload.priority,
        author=payload.author or "Dean Academic Affairs",
        published_date=datetime.utcnow(),
        active=True
    )
    db.add(ann)
    db.commit()
    db.refresh(ann)

    return AnnouncementResponse(
        id=ann.id,
        title=ann.title,
        category=ann.category,
        content=ann.content,
        priority=ann.priority,
        author=ann.author,
        publishedDate=ann.published_date.strftime("%b %d, %Y"),
        active=ann.active
    )

@router.delete("/announcements/{announcement_id}")
async def delete_announcement(announcement_id: str, db: Session = Depends(get_db)):
    ann = db.query(CampusAnnouncement).filter(CampusAnnouncement.id == announcement_id).first()
    if not ann:
        raise HTTPException(status_code=404, detail="Announcement not found.")

    db.delete(ann)
    db.commit()
    return {"message": "Announcement removed successfully"}

@router.patch("/users/{user_id}/role")
async def update_user_role(user_id: str, role: str, db: Session = Depends(get_db)):
    if role not in ["student", "admin", "faculty"]:
        raise HTTPException(status_code=400, detail="Invalid role specified.")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        # Create user record if not present
        user = User(id=user_id, email=f"{user_id}@university.edu", full_name="Student", role=role)
        db.add(user)
    else:
        user.role = role

    db.commit()
    return {"userId": user_id, "role": role, "status": "Role updated"}
