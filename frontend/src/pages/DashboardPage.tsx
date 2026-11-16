import React, { useEffect, useState } from 'react';
import {
  FileText,
  Search,
  BookOpen,
  Presentation,
  Award,
  Calendar,
  Clock,
  ArrowRight,
  FileCheck,
  Download,
  MessageSquare,
  Cpu,
  Briefcase,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { campusApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    counts: { projects: number; documents: number; generatedFiles: number; pendingTasks: number };
    recentProjects: any[];
    recentDocuments: any[];
    upcomingDeadlines: any[];
    recentFiles: any[];
  }>({
    counts: { projects: 0, documents: 0, generatedFiles: 0, pendingTasks: 0 },
    recentProjects: [],
    recentDocuments: [],
    upcomingDeadlines: [],
    recentFiles: []
  });

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await campusApi.getDashboardSummary();
      setData(res);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const flagshipFeatures = [
    {
      id: 'campus-chat',
      title: 'Smart Campus Chatbot',
      desc: 'Ask about university regulations, project rules, syllabus & placements with voice STT & Hindi support.',
      icon: MessageSquare,
      gradient: 'from-blue-600 to-indigo-600',
      badge: 'Context-Aware RAG'
    },
    {
      id: 'project-assistant',
      title: 'AI Project Studio',
      desc: 'Formulate novel capstone ideas, design multi-tier system architectures, and export 12-week roadmaps.',
      icon: Cpu,
      gradient: 'from-indigo-600 to-purple-600',
      badge: 'Capstone Architect'
    },
    {
      id: 'career-assistant',
      title: 'Career & Placement Suite',
      desc: 'Audit your resume with ATS scoring, practice technical mock interviews, and solve curated DSA problems.',
      icon: Briefcase,
      gradient: 'from-purple-600 to-pink-600',
      badge: 'Placement Ready'
    },
    {
      id: 'admin-portal',
      title: 'Institutional Document RAG',
      desc: 'Index verified university circulars, check live query statistics, and manage role credentials.',
      icon: ShieldAlert,
      gradient: 'from-slate-700 to-blue-900',
      badge: 'Knowledge Hub'
    }
  ];

  const quickActions = [
    { id: 'pdf-analyzer', label: 'PDF Analyzer & Q&A', desc: 'Detailed notes, summaries & RAG search', icon: FileText },
    { id: 'agent-workspace', label: '5-Agent Team', desc: 'Orchestrate CrewAI research and drafting', icon: Sparkles },
    { id: 'assignments', label: 'Assignment Generator', desc: 'Academic answers in formatted DOCX', icon: BookOpen },
    { id: 'presentations', label: 'Presentation Generator', desc: 'Structured slide decks in PPTX', icon: Presentation },
    { id: 'viva', label: 'Viva Voce Defense', desc: 'Mock viva questions & cross-examination', icon: Award },
    { id: 'study-planner', label: 'Study Timetable', desc: 'Track deadlines & exam revisions', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome SaaS Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E3A8A] via-[#315B85] to-[#4338CA] p-6 md:p-8 text-white shadow-md border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-semibold tracking-wider uppercase backdrop-blur-sm">
                Campus AI v2.0 • Intelligent Platform
              </span>
              <span className="text-blue-200 text-xs">
                {user?.role === 'admin' ? 'Administrator' : 'Engineering Scholar'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              {language === 'hi'
                ? `स्वागत है, ${user?.name || 'विद्यार्थी'}!`
                : `Welcome back, ${user?.name || 'Student'}!`}
            </h2>
            <p className="text-xs md:text-sm text-blue-100 dark:text-gray-200 mt-2 leading-relaxed">
              Your unified campus intelligence hub is ready. You have{' '}
              <span className="font-bold text-white underline decoration-blue-300">
                {data.counts.pendingTasks} pending study tasks
              </span>{' '}
              and{' '}
              <span className="font-bold text-white underline decoration-blue-300">
                {data.counts.documents} uploaded documents
              </span>{' '}
              indexed into your personal knowledge base.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('campus-chat')}
              className="px-4 py-2.5 rounded-lg bg-white text-[#1E3A8A] hover:bg-blue-50 text-xs font-bold flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#315B85]" />
              <span>Ask Campus Chatbot</span>
            </button>
            <button
              onClick={() => onNavigate('agent-workspace')}
              className="px-4 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-semibold flex items-center justify-center space-x-2 backdrop-blur-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Multi-Agent Task</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Flagship AI Modules */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687386] dark:text-[#9CA3AF] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#315B85] dark:text-[#60A5FA]" />
            <span>Campus AI Flagship Modules</span>
          </h3>
          <span className="text-[11px] text-[#315B85] dark:text-[#60A5FA] font-medium">
            Next-Gen Academic Productivity
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {flagshipFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => onNavigate(feat.id)}
                className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] hover:border-[#315B85] dark:hover:border-[#6366F1] rounded-xl p-5 text-left shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${feat.gradient} text-white flex items-center justify-center shadow-sm`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#93C5FD]">
                      {feat.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#202938] dark:text-white group-hover:text-[#315B85] dark:group-hover:text-[#60A5FA] transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-[#687386] dark:text-[#9CA3AF] mt-1.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E9EF] dark:border-[#1F2937] flex items-center justify-between text-xs font-semibold text-[#315B85] dark:text-[#60A5FA]">
                  <span>Launch Tool</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Academic Tools Bar */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#687386] dark:text-[#9CA3AF] mb-3">
          Academic Utilities & Multi-Agent Tools
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <button
                key={qa.id}
                onClick={() => onNavigate(qa.id)}
                className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] hover:border-[#CBD5E1] dark:hover:border-[#374151] rounded-xl p-3.5 text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center mb-2 group-hover:bg-[#315B85] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#202938] dark:text-white group-hover:text-[#315B85] dark:group-hover:text-[#60A5FA] truncate">
                    {qa.label}
                  </div>
                  <div className="text-[10px] text-[#687386] dark:text-[#9CA3AF] mt-0.5 line-clamp-2">
                    {qa.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Grid: Deadlines + Documents + Generated Files */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Upcoming Deadlines */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9EF] dark:border-[#1F2937]">
            <h3 className="text-xs font-bold text-[#202938] dark:text-white flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>Upcoming Deadlines</span>
            </h3>
            <button
              onClick={() => onNavigate('study-planner')}
              className="text-[11px] text-[#315B85] dark:text-[#60A5FA] font-semibold hover:underline"
            >
              Open Planner
            </button>
          </div>

          {data.upcomingDeadlines.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 text-[#CBD5E1] dark:text-[#374151] mx-auto mb-2" />
              <p className="text-xs text-[#687386] dark:text-[#9CA3AF]">No upcoming deadlines registered.</p>
              <button
                onClick={() => onNavigate('study-planner')}
                className="text-xs text-[#315B85] dark:text-[#60A5FA] font-medium mt-2 hover:underline"
              >
                + Add Assignment Deadline
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.upcomingDeadlines.map((t) => (
                <div key={t.id} className="p-2.5 bg-[#F7F8FA] dark:bg-[#161F30] rounded-lg border border-[#E5E9EF] dark:border-[#334155] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#202938] dark:text-white truncate">{t.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      t.priority === 'High'
                        ? 'bg-[#FBEAE9] dark:bg-[#78350F]/40 text-[#C45454] dark:text-[#F87171]'
                        : 'bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA]'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#687386] dark:text-[#9CA3AF] mt-1 flex items-center space-x-1">
                    <span>{t.subject}</span>
                    <span>•</span>
                    <span className="font-medium">{t.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Uploaded Course Documents */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9EF] dark:border-[#1F2937]">
            <h3 className="text-xs font-bold text-[#202938] dark:text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>Recent Course Material</span>
            </h3>
            <button
              onClick={() => onNavigate('pdf-analyzer')}
              className="text-[11px] text-[#315B85] dark:text-[#60A5FA] font-semibold hover:underline"
            >
              Upload PDF
            </button>
          </div>

          {data.recentDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-[#CBD5E1] dark:text-[#374151] mx-auto mb-2" />
              <p className="text-xs text-[#687386] dark:text-[#9CA3AF]">No documents analyzed yet.</p>
              <button
                onClick={() => onNavigate('pdf-analyzer')}
                className="text-xs text-[#315B85] dark:text-[#60A5FA] font-medium mt-2 hover:underline"
              >
                Upload your first PDF
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => onNavigate('pdf-analyzer')}
                  className="p-2.5 bg-[#F7F8FA] dark:bg-[#161F30] rounded-lg border border-[#E5E9EF] dark:border-[#334155] text-xs hover:border-[#CBD5E1] cursor-pointer"
                >
                  <div className="font-semibold text-[#202938] dark:text-white truncate">{doc.fileName}</div>
                  <div className="text-[11px] text-[#687386] dark:text-[#9CA3AF] mt-1 flex items-center justify-between">
                    <span>{doc.pageCount} Pages • Indexed for RAG</span>
                    <span>{doc.uploadedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Generated Files & Downloads */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9EF] dark:border-[#1F2937]">
            <h3 className="text-xs font-bold text-[#202938] dark:text-white flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>Generated Artifacts</span>
            </h3>
            <button
              onClick={() => onNavigate('history')}
              className="text-[11px] text-[#315B85] dark:text-[#60A5FA] font-semibold hover:underline"
            >
              All Files
            </button>
          </div>

          {data.recentFiles.length === 0 ? (
            <div className="text-center py-8">
              <Download className="w-8 h-8 text-[#CBD5E1] dark:text-[#374151] mx-auto mb-2" />
              <p className="text-xs text-[#687386] dark:text-[#9CA3AF]">No files generated yet.</p>
              <p className="text-[11px] text-[#687386] dark:text-[#9CA3AF] mt-1">Use Assignment or Presentation generator to create outputs.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentFiles.map((f) => (
                <div key={f.id} className="p-2.5 bg-[#F7F8FA] dark:bg-[#161F30] rounded-lg border border-[#E5E9EF] dark:border-[#334155] text-xs flex items-center justify-between">
                  <div className="overflow-hidden mr-2">
                    <div className="font-semibold text-[#202938] dark:text-white truncate">{f.fileName}</div>
                    <span className="text-[10px] uppercase font-bold text-[#315B85] dark:text-[#60A5FA]">{f.fileType} format</span>
                  </div>
                  <a
                    href={f.downloadUrl}
                    download
                    className="p-1.5 text-[#315B85] dark:text-[#60A5FA] hover:text-[#27496B] hover:bg-white dark:hover:bg-[#1F2937] rounded-lg border border-transparent hover:border-[#E5E9EF] dark:hover:border-[#334155]"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
