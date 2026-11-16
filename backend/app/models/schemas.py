from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class UserResponse(BaseModel):
    id: str
    email: str
    fullName: str
    role: str

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    subject: Optional[str] = "General"

class ProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    subject: str
    status: str
    createdAt: str
    updatedAt: str
    documents: List[Dict[str, Any]] = []
    tasks: List[Dict[str, Any]] = []
    files: List[Dict[str, Any]] = []

# --- Enhanced PDF Analyzer Schemas ---
class TopicElaboration(BaseModel):
    id: str
    title: str
    pageNumbers: List[int]
    definition: str
    elaboration: str
    corePrinciples: List[str]
    practicalApplication: str
    examSignificance: str
    commonPitfalls: str

class ChapterSectionSummary(BaseModel):
    pageNumber: int
    title: str
    overview: str
    keyPoints: List[str]

class ProbableQuestion(BaseModel):
    question: str
    questionType: str # "Long Answer (10 Marks)", "Short Answer (5 Marks)", "Viva Voce"
    marksWeightage: int
    modelAnswerOutline: List[str]

class ComparativeDistinction(BaseModel):
    title: str
    comparisonCriteria: List[str]
    entityA: Dict[str, Any]
    entityB: Dict[str, Any]

class ExamNotesData(BaseModel):
    mustKnowDefinitions: List[Dict[str, str]]
    highYieldFormulasAndTheorems: List[Dict[str, str]]
    probableExamQuestions: List[ProbableQuestion]
    comparativeDistinctions: List[ComparativeDistinction]
    examinerTips: List[str]

class DocumentDetailedAnalysis(BaseModel):
    id: str
    fileName: str
    pageCount: int
    executiveSummary: str
    methodologyOverview: str
    chapters: List[ChapterSectionSummary]
    topics: List[TopicElaboration]
    examNotes: ExamNotesData
    suggestedQuestions: List[str]

class DocumentResponse(BaseModel):
    id: str
    projectId: str
    fileName: str
    fileSize: int
    pageCount: int
    summary: str
    keyTopics: List[str]
    uploadedAt: str

class RAGQueryRequest(BaseModel):
    documentId: str
    query: str

class RAGQueryResponse(BaseModel):
    query: str
    answer: str
    sourcePages: List[int]
    citations: List[Dict[str, Any]]
    suggestedFollowUps: List[str] = []

class ElaborateTopicRequest(BaseModel):
    documentId: str
    topicTitle: str

class AssignmentGenerateRequest(BaseModel):
    projectId: Optional[str] = None
    documentId: Optional[str] = None
    subject: str
    topic: str
    instructions: Optional[str] = ""
    answerLength: str = "Medium" # Short, Medium, Comprehensive
    explanationStyle: str = "Detailed" # Simple, Detailed, Bullet Points

class AssignmentResponse(BaseModel):
    id: str
    topic: str
    subject: str
    content: str
    sections: List[Dict[str, str]]
    docxUrl: Optional[str] = None
    createdAt: str

class PresentationGenerateRequest(BaseModel):
    projectId: Optional[str] = None
    documentId: Optional[str] = None
    topic: str
    slideCount: int = 8
    audience: str = "College Undergraduates"
    durationMinutes: int = 15

class SlideItem(BaseModel):
    slideNumber: int
    title: str
    bulletPoints: List[str]
    speakerNotes: str

class PresentationResponse(BaseModel):
    id: str
    topic: str
    audience: str
    slideCount: int
    slides: List[SlideItem]
    pptxUrl: Optional[str] = None
    createdAt: str

class VivaGenerateRequest(BaseModel):
    projectId: Optional[str] = None
    documentId: Optional[str] = None
    subject: str
    topic: str
    count: int = 5

class VivaQuestionItem(BaseModel):
    id: str
    question: str
    difficulty: str # Easy, Medium, Hard
    modelAnswer: str
    explanation: str
    sourcePage: Optional[int] = None

class VivaEvaluateRequest(BaseModel):
    questionId: str
    question: str
    modelAnswer: str
    studentAnswer: str

class VivaEvaluationResponse(BaseModel):
    score: int
    accuracyGrade: str
    feedback: str
    suggestions: List[str]

class StudyTaskCreate(BaseModel):
    title: str
    subject: str
    deadline: str
    estimatedHours: int = 2
    priority: str = "Medium"

class StudyTaskUpdate(BaseModel):
    completed: Optional[bool] = None
    title: Optional[str] = None
    deadline: Optional[str] = None

class StudyTaskResponse(BaseModel):
    id: str
    title: str
    subject: str
    deadline: str
    estimatedHours: int
    completed: bool
    priority: str

class AgentWorkspaceExecuteRequest(BaseModel):
    projectId: Optional[str] = None
    documentId: Optional[str] = None
    taskDescription: str
    enableWebSearch: bool = False

class AgentExecutionStatus(BaseModel):
    agentName: str
    role: str
    status: str
    progress: int
    currentTask: str
    thought: Optional[str] = None
    outputSummary: Optional[str] = None

class AgentCollaborationResponse(BaseModel):
    taskId: str
    planSummary: str
    participatingAgents: List[str]
    agentsStatus: List[AgentExecutionStatus]
    finalResult: Dict[str, Any]
    generatedFiles: List[Dict[str, str]]
