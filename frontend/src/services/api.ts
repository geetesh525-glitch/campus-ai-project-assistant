import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const campusApi = {
  // Dashboard
  getDashboardSummary: async () => {
    const res = await api.get('/projects/dashboard-summary');
    return res.data;
  },

  // PDF
  uploadPdf: async (file: File, projectId?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) formData.append('projectId', projectId);
    const res = await api.post('/pdf/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  listPdfs: async () => {
    const res = await api.get('/pdf/list');
    return res.data;
  },

  getDocumentAnalysis: async (documentId: string) => {
    const res = await api.get(`/pdf/${documentId}/analysis`);
    return res.data;
  },

  queryPdfRAG: async (documentId: string, query: string) => {
    const res = await api.post('/pdf/query', { documentId, query });
    return res.data;
  },

  elaborateTopic: async (documentId: string, topicTitle: string) => {
    const res = await api.post('/pdf/elaborate-topic', { documentId, topicTitle });
    return res.data;
  },

  exportPdfNotes: async (documentId: string) => {
    const res = await api.get(`/pdf/${documentId}/export-notes`);
    return res.data;
  },

  // Agents
  getAgents: async () => {
    const res = await api.get('/agents/list');
    return res.data;
  },

  executeAgents: async (payload: {
    taskDescription: string;
    documentId?: string;
    enableWebSearch?: boolean;
    projectId?: string;
  }) => {
    const res = await api.post('/agents/execute', payload);
    return res.data;
  },

  getExecutionHistory: async () => {
    const res = await api.get('/projects/history');
    return res.data;
  },

  // Assignments
  generateAssignment: async (payload: {
    subject: string;
    topic: string;
    instructions?: string;
    answerLength?: string;
    explanationStyle?: string;
    documentId?: string;
  }) => {
    const res = await api.post('/assignments/generate', payload);
    return res.data;
  },

  // Presentations
  generatePresentation: async (payload: {
    topic: string;
    slideCount?: number;
    audience?: string;
    durationMinutes?: number;
    documentId?: string;
  }) => {
    const res = await api.post('/presentations/generate', payload);
    return res.data;
  },

  // Viva
  generateVivaQuestions: async (payload: {
    subject: string;
    topic: string;
    count?: number;
    documentId?: string;
  }) => {
    const res = await api.post('/viva/generate', payload);
    return res.data;
  },

  evaluateVivaAnswer: async (payload: {
    questionId: string;
    question: string;
    modelAnswer: string;
    studentAnswer: string;
  }) => {
    const res = await api.post('/viva/evaluate', payload);
    return res.data;
  },

  // Study Planner
  getStudyTasks: async () => {
    const res = await api.get('/study-planner/tasks');
    return res.data;
  },

  createStudyTask: async (payload: {
    title: string;
    subject: string;
    deadline: string;
    estimatedHours: number;
    priority: string;
  }) => {
    const res = await api.post('/study-planner/tasks', payload);
    return res.data;
  },

  updateStudyTask: async (taskId: string, payload: { completed?: boolean; title?: string; deadline?: string }) => {
    const res = await api.patch(`/study-planner/tasks/${taskId}`, payload);
    return res.data;
  },

  deleteStudyTask: async (taskId: string) => {
    const res = await api.delete(`/study-planner/tasks/${taskId}`);
    return res.data;
  },

  // Settings & Memory
  getSettings: async () => {
    const res = await api.get('/settings');
    return res.data;
  },

  saveSettings: async (payload: any) => {
    const res = await api.post('/settings', payload);
    return res.data;
  },

  clearMemory: async () => {
    const res = await api.post('/settings/clear-memory');
    return res.data;
  },
};

export default api;
