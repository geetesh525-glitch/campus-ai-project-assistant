from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.routers import (
    pdf,
    agents,
    assignments,
    presentations,
    viva,
    study_planner,
    files,
    projects,
    settings_router
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Campus AI: Intelligent Academic Assistant Backend API",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables
@app.on_event("startup")
def on_startup():
    init_db()

# Include Routers
app.include_router(pdf.router, prefix=settings.API_V1_PREFIX)
app.include_router(agents.router, prefix=settings.API_V1_PREFIX)
app.include_router(assignments.router, prefix=settings.API_V1_PREFIX)
app.include_router(presentations.router, prefix=settings.API_V1_PREFIX)
app.include_router(viva.router, prefix=settings.API_V1_PREFIX)
app.include_router(study_planner.router, prefix=settings.API_V1_PREFIX)
app.include_router(files.router, prefix=settings.API_V1_PREFIX)
app.include_router(projects.router, prefix=settings.API_V1_PREFIX)
app.include_router(settings_router.router, prefix=settings.API_V1_PREFIX)

@app.get("/")
def root():
    return {
        "app": "Campus AI",
        "status": "Online",
        "description": "Multi-agent intelligent academic assistant API"
    }

@app.get("/api/health")
def health():
    return {"status": "ok"}
