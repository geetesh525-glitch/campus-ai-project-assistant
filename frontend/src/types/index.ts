export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'researcher';
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
