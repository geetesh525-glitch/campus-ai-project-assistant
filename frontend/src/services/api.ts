import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const campusApi = {
  // --- Dashboard ---
  getDashboardSummary: async () => {
    const res = await axiosInstance.get('/projects/dashboard-summary');
    return res.data;
  },

  // --- PDF ---
  uploadPdf: async (file: File, projectId?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) formData.append('projectId', projectId);
    const res = await axiosInstance.post('/pdf/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  listPdfs: async () => {
    const res = await axiosInstance.get('/pdf/list');
    return res.data;
  },

  getDocumentAnalysis: async (documentId: string) => {
    const res = await axiosInstance.get(`/pdf/${documentId}/analysis`);
    return res.data;
  },

  queryPdfRAG: async (documentId: string, query: string) => {
    const res = await axiosInstance.post('/pdf/query', { documentId, query });
    return res.data;
  },

  elaborateTopic: async (documentId: string, topicTitle: string) => {
    const res = await axiosInstance.post('/pdf/elaborate-topic', { documentId, topicTitle });
    return res.data;
  },

  exportPdfNotes: async (documentId: string) => {
    const res = await axiosInstance.get(`/pdf/${documentId}/export-notes`);
    return res.data;
  },

  // --- Agents ---
  executeMultiAgentTask: async (payload: {
    projectId?: string;
    documentId?: string;
    taskDescription: string;
    enableWebSearch?: boolean;
  }) => {
    const res = await axiosInstance.post('/agents/execute', payload);
    return res.data;
  },

  executeAgents: async (payload: {
    taskDescription: string;
    documentId?: string;
    projectId?: string;
    enableWebSearch?: boolean;
  }) => {
    const res = await axiosInstance.post('/agents/execute', payload);
    return res.data;
  },

  getAgentStatus: async (taskId: string) => {
    const res = await axiosInstance.get(`/agents/status/${taskId}`);
    return res.data;
  },

  getExecutionHistory: async () => {
    const res = await axiosInstance.get('/projects/history');
    return res.data;
  },

  // --- Assignments ---
  generateAssignment: async (payload: {
    projectId?: string;
    documentId?: string;
    subject: string;
    topic: string;
    instructions?: string;
    answerLength?: string;
    explanationStyle?: string;
  }) => {
    const res = await axiosInstance.post('/assignments/generate', payload);
    return res.data;
  },

  // --- Presentations ---
  generatePresentation: async (payload: {
    projectId?: string;
    documentId?: string;
    topic: string;
    slideCount?: number;
    audience?: string;
    durationMinutes?: number;
  }) => {
    const res = await axiosInstance.post('/presentations/generate', payload);
    return res.data;
  },

  // --- Viva Voce ---
  generateVivaQuestions: async (payload: {
    projectId?: string;
    documentId?: string;
    subject: string;
    topic: string;
    count?: number;
  }) => {
    const res = await axiosInstance.post('/viva/generate', payload);
    return res.data;
  },

  evaluateVivaAnswer: async (payload: {
    questionId: string;
    question: string;
    modelAnswer: string;
    studentAnswer: string;
  }) => {
    const res = await axiosInstance.post('/viva/evaluate', payload);
    return res.data;
  },

  // --- Projects ---
  getProjects: async () => {
    const res = await axiosInstance.get('/projects');
    return res.data;
  },

  createProject: async (payload: { title: string; description?: string; subject?: string }) => {
    const res = await axiosInstance.post('/projects', payload);
    return res.data;
  },

  getProject: async (id: string) => {
    const res = await axiosInstance.get(`/projects/${id}`);
    return res.data;
  },

  // --- Files ---
  getGeneratedFiles: async (projectId?: string) => {
    const params = projectId ? { projectId } : {};
    const res = await axiosInstance.get('/files', { params });
    return res.data;
  },

  // --- Study Planner ---
  getStudyTasks: async () => {
    const res = await axiosInstance.get('/study-planner/tasks');
    return res.data;
  },

  createStudyTask: async (payload: {
    title: string;
    subject: string;
    deadline: string;
    estimatedHours: number;
    priority?: string;
  }) => {
    const res = await axiosInstance.post('/study-planner/tasks', payload);
    return res.data;
  },

  updateStudyTask: async (taskId: string, payload: any) => {
    const res = await axiosInstance.patch(`/study-planner/tasks/${taskId}`, payload);
    return res.data;
  },

  toggleStudyTask: async (taskId: string) => {
    const res = await axiosInstance.patch(`/study-planner/tasks/${taskId}/toggle`);
    return res.data;
  },

  deleteStudyTask: async (taskId: string) => {
    const res = await axiosInstance.delete(`/study-planner/tasks/${taskId}`);
    return res.data;
  },

  // --- Settings & Memory ---
  getSettings: async () => {
    const res = await axiosInstance.get('/settings');
    return res.data;
  },

  saveSettings: async (payload: any) => {
    const res = await axiosInstance.post('/settings', payload);
    return res.data;
  },

  clearMemory: async () => {
    const res = await axiosInstance.post('/settings/clear-memory');
    return res.data;
  },

  // --- Smart Campus Chatbot ---
  sendCampusChatMessage: async (payload: {
    message: string;
    sessionId?: string;
    language?: string;
    includeKnowledgeBase?: boolean;
  }) => {
    const res = await axiosInstance.post('/chat/message', payload);
    return res.data;
  },

  getCampusChatHistory: async (sessionId: string) => {
    const res = await axiosInstance.get(`/chat/history/${sessionId}`);
    return res.data;
  },

  clearCampusChatHistory: async (sessionId: string) => {
    const res = await axiosInstance.delete(`/chat/history/${sessionId}`);
    return res.data;
  },

  // --- AI Project Assistant ---
  generateProjectIdeas: async (payload: {
    domain: string;
    academicYear?: string;
    complexityLevel?: string;
  }) => {
    const res = await axiosInstance.post('/project-assistant/generate-ideas', payload);
    return res.data;
  },

  buildProjectArchitecture: async (payload: {
    projectTitle: string;
    domain: string;
    techStack: string[];
  }) => {
    const res = await axiosInstance.post('/project-assistant/build-architecture', payload);
    return res.data;
  },

  generateProjectRoadmap: async (payload: {
    projectTitle: string;
    durationWeeks?: number;
  }) => {
    const res = await axiosInstance.post('/project-assistant/roadmap', payload);
    return res.data;
  },

  // --- Career Assistant ---
  reviewResume: async (payload: {
    resumeText: string;
    targetRole?: string;
  }) => {
    const res = await axiosInstance.post('/career/resume-review', payload);
    return res.data;
  },

  getInterviewPrep: async (payload: {
    role: string;
    topic?: string;
    experienceLevel?: string;
  }) => {
    const res = await axiosInstance.post('/career/interview-prep', payload);
    return res.data;
  },

  getCodingProblems: async () => {
    const res = await axiosInstance.get('/career/coding-problems');
    return res.data;
  },

  evaluateCode: async (payload: {
    problemId: string;
    code: string;
    language?: string;
  }) => {
    const res = await axiosInstance.post('/career/evaluate-code', payload);
    return res.data;
  },

  getSkillRoadmap: async () => {
    const res = await axiosInstance.get('/career/skill-roadmap');
    return res.data;
  },

  // --- Admin Dashboard & Campus Knowledge ---
  getAdminStats: async () => {
    const res = await axiosInstance.get('/admin/stats');
    return res.data;
  },

  listAnnouncements: async () => {
    const res = await axiosInstance.get('/admin/announcements');
    return res.data;
  },

  createAnnouncement: async (payload: {
    title: string;
    category: string;
    content: string;
    priority?: string;
    author?: string;
  }) => {
    const res = await axiosInstance.post('/admin/announcements', payload);
    return res.data;
  },

  deleteAnnouncement: async (id: string) => {
    const res = await axiosInstance.delete(`/admin/announcements/${id}`);
    return res.data;
  },

  updateUserRole: async (userId: string, role: string) => {
    const res = await axiosInstance.patch(`/admin/users/${userId}/role?role=${role}`);
    return res.data;
  },
};

// Aliases for convenient importing
export const api = campusApi;
export default campusApi;
