from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.entities import Project, AgentTask, AgentExecutionLog, GeneratedFile
from app.models.schemas import AgentWorkspaceExecuteRequest, AgentCollaborationResponse
from app.agents.academic_crew import academic_orchestrator, AGENTS

router = APIRouter(prefix="/agents", tags=["AI Agents Workspace"])

@router.get("/list")
async def get_agents():
    """Returns profiles and capabilities of all 5 specialized agents."""
    return [
        {
            "id": agent.id,
            "name": agent.name,
            "role": agent.role,
            "goal": agent.goal,
            "backstory": agent.backstory,
            "status": "Waiting"
        }
        for agent in AGENTS.values()
    ]

@router.post("/execute", response_model=AgentCollaborationResponse)
async def execute_task(payload: AgentWorkspaceExecuteRequest, db: Session = Depends(get_db)):
    if not payload.taskDescription.strip():
        raise HTTPException(status_code=400, detail="Task description cannot be empty.")

    # Execute multi-agent orchestration
    result = academic_orchestrator.execute_workflow(
        task_description=payload.taskDescription,
        document_id=payload.documentId,
        enable_web_search=payload.enableWebSearch
    )

    # Persist execution task and logs
    project_id = payload.projectId or "default-project"
    task_record = AgentTask(
        id=result["taskId"],
        project_id=project_id,
        task_name=f"Academic Collaboration: {payload.taskDescription[:40]}...",
        agent_assigned="Academic Crew (5 Agents)",
        status="Completed",
        execution_plan={"planSummary": result["planSummary"]}
    )
    db.add(task_record)

    for item in result["agentsStatus"]:
        log_record = AgentExecutionLog(
            task_id=result["taskId"],
            agent_name=item["agentName"],
            step_name=item["currentTask"],
            thought=item["thought"] or "",
            output=item["outputSummary"] or "",
            status=item["status"]
        )
        db.add(log_record)

    # Persist generated files
    for gf in result["generatedFiles"]:
        file_rec = GeneratedFile(
            project_id=project_id,
            file_type=gf["type"],
            file_name=gf["fileName"],
            file_path=gf["fileName"],
            download_url=gf["downloadUrl"]
        )
        db.add(file_rec)

    db.commit()

    return AgentCollaborationResponse(
        taskId=result["taskId"],
        planSummary=result["planSummary"],
        participatingAgents=result["participatingAgents"],
        agentsStatus=result["agentsStatus"],
        finalResult=result["finalResult"],
        generatedFiles=result["generatedFiles"]
    )
