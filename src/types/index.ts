export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'researcher' | 'admin' | 'faculty';
  institution?: string;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  pageCount: number;
  uploadedAt: string;
  summary?: string;
  keyTopics?: string[];
}

export interface TopicElaboration {
  id: string;
  title: string;
  pageNumbers: number[];
  definition: string;
  elaboration: string;
  corePrinciples: string[];
  practicalApplication: string;
  examSignificance: string;
  commonPitfalls: string;
}

export interface ChapterSectionSummary {
  pageNumber: number;
  title: string;
  overview: string;
  keyPoints: string[];
}

export interface ProbableQuestion {
  question: string;
  questionType: string;
  marksWeightage: number;
  modelAnswerOutline: string[];
}

export interface ComparativeDistinction {
  title: string;
  comparisonCriteria: string[];
  entityA: { name: string; details: string[] };
  entityB: { name: string; details: string[] };
}

export interface ExamNotesData {
  mustKnowDefinitions: { term: string; definition: string }[];
  highYieldFormulasAndTheorems: { name: string; formula: string }[];
  probableExamQuestions: ProbableQuestion[];
  comparativeDistinctions: ComparativeDistinction[];
  examinerTips: string[];
}

export interface DocumentDetailedAnalysis {
  id: string;
  fileName: string;
  pageCount: number;
  executiveSummary: string;
  methodologyOverview: string;
  chapters: ChapterSectionSummary[];
  topics: TopicElaboration[];
  examNotes: ExamNotesData;
  suggestedQuestions: string[];
}

export type AgentStatus = 'Waiting' | 'Working' | 'Completed' | 'Failed' | 'Needs Review';

export interface AgentExecutionLog {
  id: string;
  agentName: string;
  stepName: string;
  thought?: string;
  output?: string;
  status: AgentStatus;
  timestamp: string;
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  description: string;
  currentTask: string;
  status: AgentStatus;
  progress: number;
  outputSummary?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  subject: string;
  status: 'In Progress' | 'Completed' | 'Draft';
  createdAt: string;
  updatedAt: string;
  documents: UploadedDocument[];
  logs: AgentExecutionLog[];
}

export interface AssignmentRequest {
  subject: string;
  topic: string;
  instructions: string;
  answerLength: 'Short' | 'Medium' | 'Comprehensive';
  explanationStyle: 'Simple' | 'Detailed' | 'Bullet Points';
}

export interface AssignmentOutput {
  id: string;
  topic: string;
  subject: string;
  content: string;
  sections: { title: string; content: string }[];
  docxUrl?: string;
  pdfUrl?: string;
  createdAt: string;
}

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  speakerNotes: string;
}

export type SlideItem = PresentationSlide;

export interface PresentationDeck {
  id: string;
  topic: string;
  audience: string;
  slideCount: number;
  slides: PresentationSlide[];
  pptxUrl?: string;
  createdAt: string;
}

export interface VivaQuestion {
  id: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  modelAnswer: string;
  explanation: string;
  sourceContext?: string;
}

export interface VivaEvaluation {
  score: number; // 0 - 100
  accuracyGrade: 'Excellent' | 'Good' | 'Needs Improvement';
  feedback: string;
  suggestions: string[];
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  estimatedHours: number;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface UserPreferences {
  openAiApiKey?: string;
  defaultCitationStyle: 'APA' | 'IEEE' | 'MLA' | 'Harvard';
  explanationTone: 'Academic' | 'Simple' | 'Concise';
  webResearchEnabled: boolean;
  studyTimeSlots: string[];
}

// --- Smart Campus Platform Types ---

export interface CampusChatMessage {
  id: string;
  sessionId: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedQuestions?: string[];
  sources?: string[];
  timestamp: string;
}

export interface ProjectIdea {
  title: string;
  tagline?: string;
  problemStatement: string;
  proposedSolution: string;
  recommendedTechStack?: string[];
  suggestedTechStack?: Record<string, string[]>;
  noveltyScore?: number;
  noveltyFactor?: string;
  estimatedWeeks?: number;
  keyModules?: string[];
  keyFeatures?: string[];
}

export type ProjectIdeaItem = ProjectIdea;

export interface ArchitectureLayer {
  name?: string;
  layerName?: string;
  description?: string;
  components: string[];
  technologies?: string[];
}

export interface ProjectArchitectureResponse {
  projectTitle: string;
  overview?: string;
  architecturalPattern?: string;
  layers: ArchitectureLayer[];
  dataFlowSteps: string[];
  securityScalability?: string[];
  securityAndScaling?: string[];
  mermaidDiagram: string;
}

export interface RoadmapPhase {
  phase?: number;
  phaseNumber?: number;
  name?: string;
  title?: string;
  weeks?: string;
  timeframe?: string;
  tasks?: string[];
  deliverable?: string;
  deliverables?: string[];
}

export interface ProjectRoadmapResponse {
  projectTitle: string;
  durationWeeks: number;
  phases: RoadmapPhase[];
  milestones?: string[];
  submissionChecklist?: string[];
  evaluationCriteria?: string[];
}

export interface ResumeReviewResponse {
  score?: number;
  atsScore?: number;
  targetRole?: string;
  strengths: string[];
  improvements?: string[];
  criticalImprovements?: string[];
  missingKeywords: string[];
  bulletRewrites?: { original: string; improved: string; reason: string }[];
  actionPlan?: string[];
  recommendedActionPlan?: string[];
  formattingAndImpactScore?: Record<string, number>;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty?: string;
  modelAnswer: string;
  interviewerTips?: string[];
  keyEvaluationPoints?: string[];
  followUpQuestion?: string;
}

export interface InterviewPrepResponse {
  role: string;
  difficulty?: string;
  topic?: string;
  questions: InterviewQuestion[];
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  description?: string;
  problemStatement?: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: string;
  solutionExplanation?: string;
}

export type CodingPracticeProblem = CodingProblem;

export interface CodeEvaluationResponse {
  problemId?: string;
  verdict?: string;
  passed?: boolean;
  timeComplexity: string;
  spaceComplexity: string;
  feedback: string;
  suggestions: string[];
  testCasesPassed?: number;
  totalTestCases?: number;
}

export interface SemesterRoadmap {
  semester?: number;
  term?: string;
  focusArea?: string;
  focus?: string;
  topics: string[];
  milestone?: string;
}

export interface CareerRoadmapResponse {
  targetRole?: string;
  title?: string;
  estimatedMonths?: number;
  semesters: SemesterRoadmap[];
  recommendedCertifications?: string[];
}

export interface CampusAnnouncement {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  targetAudience?: string;
  priority?: string;
  isPinned?: boolean;
  publishedDate?: string;
  createdAt?: string;
  active?: boolean;
}

export type AnnouncementItem = CampusAnnouncement;

export interface CampusDocument {
  id: string;
  title: string;
  category: string;
  filename: string;
  uploadDate: string;
  vectorCount: number;
}

export interface AdminDashboardStats {
  totalStudents: number;
  totalProjects?: number;
  totalDocumentsIndexed?: number;
  documentsIndexed?: number;
  totalChatQueries?: number;
  queriesResolved?: number;
  totalPresentationsGenerated?: number;
  totalAssignmentsGenerated?: number;
  agentTasksCompleted?: number;
  announcementsActive?: number;
  storageUsedMB?: number;
  systemHealth: string;
  activeModel?: string;
}

export type AdminStats = AdminDashboardStats;
