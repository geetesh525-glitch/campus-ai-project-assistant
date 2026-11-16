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

# --- NEW SCHEMAS FOR CAMPUS AI SMART PLATFORM ---

# 1. Smart Campus Chatbot
class CampusChatRequest(BaseModel):
    message: str
    sessionId: Optional[str] = "default-session"
    language: Optional[str] = "en" # "en" or "hi"
    includeKnowledgeBase: Optional[bool] = True

class CampusChatResponse(BaseModel):
    reply: str
    language: str
    sessionId: str
    suggestedQuestions: List[str] = []
    sourceCitations: List[Dict[str, Any]] = []

# 2. AI Project Assistant
class ProjectIdeaGenerateRequest(BaseModel):
    domain: str # "AI & Machine Learning", "Full-Stack Web3", "Cloud & DevOps", "IoT & Embedded", "Cybersecurity", "HealthTech"
    academicYear: str = "BTech Final Year"
    complexityLevel: str = "Advanced"

class ProjectIdeaItem(BaseModel):
    id: str
    title: str
    tagline: str
    problemStatement: str
    proposedSolution: str
    keyFeatures: List[str]
    suggestedTechStack: Dict[str, List[str]]
    industryRelevance: str
    noveltyFactor: str

class ProjectArchitectureRequest(BaseModel):
    projectTitle: str
    domain: str
    techStack: List[str]

class ProjectArchitectureResponse(BaseModel):
    projectTitle: str
    architecturalPattern: str # e.g. "Microservices + Event-Driven Eventual Consistency"
    layers: List[Dict[str, Any]]
    dataFlowSteps: List[str]
    securityAndScaling: List[str]
    mermaidDiagram: str

class ProjectRoadmapRequest(BaseModel):
    projectTitle: str
    durationWeeks: int = 12

class ProjectRoadmapResponse(BaseModel):
    projectTitle: str
    phases: List[Dict[str, Any]]
    milestones: List[str]
    evaluationCriteria: List[str]

# 3. Career Assistant
class ResumeReviewRequest(BaseModel):
    resumeText: str
    targetRole: str = "Software Development Engineer (SDE-1)"

class ResumeReviewResponse(BaseModel):
    atsScore: int # 0 to 100
    strengths: List[str]
    criticalImprovements: List[str]
    missingKeywords: List[str]
    formattingAndImpactScore: Dict[str, int]
    recommendedActionPlan: List[str]

class TechnicalInterviewRequest(BaseModel):
    role: str = "Full Stack Engineer"
    experienceLevel: str = "Entry Level / Campus Placement"
    topic: str = "Data Structures & Systems Design"

class CodingPracticeProblem(BaseModel):
    id: str
    title: str
    difficulty: str # Easy, Medium, Hard
    category: str # Arrays, Graphs, Dynamic Programming, System Design
    problemStatement: str
    examples: List[Dict[str, str]]
    constraints: List[str]
    starterCode: str
    solutionExplanation: str

class CodeEvaluationRequest(BaseModel):
    problemId: str
    code: str
    language: str = "python"

class CodeEvaluationResponse(BaseModel):
    verdict: str # "Accepted", "Wrong Answer", "Time Limit Exceeded"
    timeComplexity: str
    spaceComplexity: str
    feedback: str
    suggestions: List[str]

# 4. Admin & Campus Knowledge Base
class AnnouncementCreate(BaseModel):
    title: str
    category: str
    content: str
    priority: str = "Normal"
    author: Optional[str] = "Dean Academic Affairs"

class AnnouncementResponse(BaseModel):
    id: str
    title: str
    category: str
    content: str
    priority: str
    author: str
    publishedDate: str
    active: bool

class AdminStatsResponse(BaseModel):
    totalStudents: int
    documentsIndexed: int
    agentTasksCompleted: int
    queriesResolved: int
    announcementsActive: int
    storageUsedMB: float
    systemHealth: str
