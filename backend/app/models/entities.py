import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="student") # student, admin, faculty
    created_at = Column(DateTime, default=datetime.utcnow)

    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")
    schedules = relationship("StudySchedule", back_populates="user", cascade="all, delete-orphan")
    preferences = relationship("UserPreferences", back_populates="user", uselist=False, cascade="all, delete-orphan")

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    subject = Column(String(100), default="General")
    status = Column(String(50), default="In Progress")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="projects")
    documents = relationship("UploadedDocument", back_populates="project", cascade="all, delete-orphan")
    tasks = relationship("AgentTask", back_populates="project", cascade="all, delete-orphan")
    files = relationship("GeneratedFile", back_populates="project", cascade="all, delete-orphan")

class UploadedDocument(Base):
    __tablename__ = "uploaded_documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, default=0)
    page_count = Column(Integer, default=0)
    summary = Column(Text, default="")
    key_topics = Column(JSON, default=list)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="documents")

class AgentTask(Base):
    __tablename__ = "agent_tasks"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    task_name = Column(String(255), nullable=False)
    agent_assigned = Column(String(100), nullable=False)
    status = Column(String(50), default="Waiting") # Waiting, Working, Completed, Failed, Needs Review
    execution_plan = Column(JSON, default=dict)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    project = relationship("Project", back_populates="tasks")
    logs = relationship("AgentExecutionLog", back_populates="task", cascade="all, delete-orphan")

class AgentExecutionLog(Base):
    __tablename__ = "agent_execution_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    task_id = Column(String(36), ForeignKey("agent_tasks.id"), nullable=False)
    agent_name = Column(String(100), nullable=False)
    step_name = Column(String(255), nullable=False)
    thought = Column(Text, default="")
    output = Column(Text, default="")
    status = Column(String(50), default="Completed")
    created_at = Column(DateTime, default=datetime.utcnow)

    task = relationship("AgentTask", back_populates="logs")

class GeneratedFile(Base):
    __tablename__ = "generated_files"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    file_type = Column(String(50), nullable=False) # docx, pptx, pdf
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, default=0)
    download_url = Column(String(500), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="files")

class StudySchedule(Base):
    __tablename__ = "study_schedules"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    subject = Column(String(100), nullable=False)
    deadline = Column(String(100), nullable=False)
    estimated_hours = Column(Integer, default=2)
    completed = Column(Boolean, default=False)
    priority = Column(String(20), default="Medium")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="schedules")

class UserPreferences(Base):
    __tablename__ = "user_preferences"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, unique=True)
    open_ai_api_key = Column(String(255), default="")
    default_citation_style = Column(String(50), default="APA")
    explanation_tone = Column(String(50), default="Academic")
    web_research_enabled = Column(Boolean, default=True)

    user = relationship("User", back_populates="preferences")

# --- NEW EXTENSIONS FOR CAMPUS AI UPGRADE ---

class CampusAnnouncement(Base):
    __tablename__ = "campus_announcements"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    category = Column(String(50), default="Academic") # Academic, Examination, Hostel, Event, Placement
    content = Column(Text, nullable=False)
    priority = Column(String(20), default="Normal") # Urgent, High, Normal
    author = Column(String(100), default="Dean Academic Affairs")
    published_date = Column(DateTime, default=datetime.utcnow)
    active = Column(Boolean, default=True)

class CampusKnowledgeDoc(Base):
    __tablename__ = "campus_knowledge_docs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="General Regulation") # Academic Calendar, Exam Regulations, Hostel Rules, Fee Structure, Syllabus
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    page_count = Column(Integer, default=1)
    summary = Column(Text, default="")
    uploaded_by = Column(String(100), default="Administrator")
    created_at = Column(DateTime, default=datetime.utcnow)

class CampusChatMessage(Base):
    __tablename__ = "campus_chat_messages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), default="default-student")
    session_id = Column(String(50), default="default-session")
    role = Column(String(20), nullable=False) # user, assistant
    content = Column(Text, nullable=False)
    language = Column(String(10), default="en") # en, hi
    source_citations = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
