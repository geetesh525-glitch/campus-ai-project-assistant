import uuid
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import StudySchedule
from app.models.schemas import StudyTaskCreate, StudyTaskUpdate, StudyTaskResponse

router = APIRouter(prefix="/study-planner", tags=["Study Planner"])

@router.get("/tasks", response_model=list[StudyTaskResponse])
async def get_study_tasks(db: Session = Depends(get_db)):
    tasks = db.query(StudySchedule).order_by(StudySchedule.created_at.desc()).all()
    # Provide realistic starter tasks if database is empty
    if not tasks:
        sample_tasks = [
            StudySchedule(
                id=str(uuid.uuid4()),
                user_id="default-student",
                title="Review DBMS Normalization & BCNF",
                subject="Database Systems",
                deadline="Tomorrow at 5:00 PM",
                estimated_hours=2,
                completed=False,
                priority="High"
            ),
            StudySchedule(
                id=str(uuid.uuid4()),
                user_id="default-student",
                title="Prepare 10-slide Research Deck on OS Kernels",
                subject="Operating Systems",
                deadline="Friday, 11:59 PM",
                estimated_hours=3,
                completed=False,
                priority="Medium"
            ),
            StudySchedule(
                id=str(uuid.uuid4()),
                user_id="default-student",
                title="Practice Computer Networks Viva Questions",
                subject="Computer Networks",
                deadline="Next Monday, 9:00 AM",
                estimated_hours=1,
                completed=True,
                priority="Low"
            )
        ]
        db.add_all(sample_tasks)
        db.commit()
        tasks = sample_tasks

    return [
        StudyTaskResponse(
            id=t.id,
            title=t.title,
            subject=t.subject,
            deadline=t.deadline,
            estimatedHours=t.estimated_hours,
            completed=t.completed,
            priority=t.priority
        )
        for t in tasks
    ]

@router.post("/tasks", response_model=StudyTaskResponse)
async def create_study_task(payload: StudyTaskCreate, db: Session = Depends(get_db)):
    if not payload.title.strip() or not payload.subject.strip():
        raise HTTPException(status_code=400, detail="Title and subject are required.")

    task = StudySchedule(
        id=str(uuid.uuid4()),
        user_id="default-student",
        title=payload.title.strip(),
        subject=payload.subject.strip(),
        deadline=payload.deadline.strip(),
        estimated_hours=payload.estimatedHours,
        completed=False,
        priority=payload.priority
    )
    db.add(task)
    db.commit()
    db.refresh(task)

    return StudyTaskResponse(
        id=task.id,
        title=task.title,
        subject=task.subject,
        deadline=task.deadline,
        estimatedHours=task.estimated_hours,
        completed=task.completed,
        priority=task.priority
    )

@router.patch("/tasks/{task_id}", response_model=StudyTaskResponse)
async def update_task(task_id: str, payload: StudyTaskUpdate, db: Session = Depends(get_db)):
    task = db.query(StudySchedule).filter(StudySchedule.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")

    if payload.completed is not None:
        task.completed = payload.completed
    if payload.title is not None:
        task.title = payload.title
    if payload.deadline is not None:
        task.deadline = payload.deadline

    db.commit()
    db.refresh(task)

    return StudyTaskResponse(
        id=task.id,
        title=task.title,
        subject=task.subject,
        deadline=task.deadline,
        estimatedHours=task.estimated_hours,
        completed=task.completed,
        priority=task.priority
    )

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str, db: Session = Depends(get_db)):
    task = db.query(StudySchedule).filter(StudySchedule.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")

    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}
