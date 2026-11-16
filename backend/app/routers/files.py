import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.core.config import settings

router = APIRouter(prefix="/files", tags=["Files"])

@router.api_route("/download/{filename}", methods=["GET", "HEAD"])
async def download_file(filename: str):
    # Prevent directory traversal attacks
    safe_filename = os.path.basename(filename)
    file_path = os.path.join(settings.STORAGE_PATH, safe_filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found.")

    media_type = "application/octet-stream"
    if safe_filename.endswith(".docx"):
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    elif safe_filename.endswith(".pptx"):
        media_type = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    elif safe_filename.endswith(".pdf"):
        media_type = "application/pdf"

    return FileResponse(
        path=file_path,
        media_type=media_type,
        filename=safe_filename
    )
