from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.core.database import get_db
from app.core.config import settings
from app.models.entities import UserPreferences, UploadedDocument, AgentTask, AgentExecutionLog, GeneratedFile

router = APIRouter(prefix="/settings", tags=["Settings & Memory"])

class SettingsUpdate(BaseModel):
    openAiApiKey: Optional[str] = None
    defaultCitationStyle: Optional[str] = "APA"
    explanationTone: Optional[str] = "Academic"
    webResearchEnabled: Optional[bool] = True

@router.get("")
async def get_settings(db: Session = Depends(get_db)):
    pref = db.query(UserPreferences).filter(UserPreferences.user_id == "default-student").first()
    has_env_key = bool(settings.OPENAI_API_KEY)
    
    return {
        "hasOpenAiApiKey": has_env_key or bool(pref and pref.open_ai_api_key),
        "openAiApiKeyMasked": "sk-••••••••••••••••" if (has_env_key or (pref and pref.open_ai_api_key)) else "",
        "defaultCitationStyle": pref.default_citation_style if pref else "APA",
        "explanationTone": pref.explanation_tone if pref else "Academic",
        "webResearchEnabled": pref.web_research_enabled if pref else True
    }

@router.post("")
async def save_settings(payload: SettingsUpdate, db: Session = Depends(get_db)):
    pref = db.query(UserPreferences).filter(UserPreferences.user_id == "default-student").first()
    if not pref:
        pref = UserPreferences(user_id="default-student")
        db.add(pref)

    if payload.openAiApiKey is not None and payload.openAiApiKey.strip():
        pref.open_ai_api_key = payload.openAiApiKey.strip()
        settings.OPENAI_API_KEY = payload.openAiApiKey.strip()
    
    if payload.defaultCitationStyle:
        pref.default_citation_style = payload.defaultCitationStyle
    if payload.explanationTone:
        pref.explanation_tone = payload.explanationTone
    if payload.webResearchEnabled is not None:
        pref.web_research_enabled = payload.webResearchEnabled

    db.commit()
    return {"message": "Settings saved successfully"}

@router.post("/clear-memory")
async def clear_memory(db: Session = Depends(get_db)):
    """Allows user to clear all execution history and saved documents."""
    db.query(AgentExecutionLog).delete()
    db.query(AgentTask).delete()
    db.query(GeneratedFile).delete()
    db.query(UploadedDocument).delete()
    db.commit()
    return {"message": "All project data and execution history cleared."}
