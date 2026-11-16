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
  AlertCircle
} from 'lucide-react';
import { campusApi } from '../services/api';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({ onNavigate }) => {
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

  const quickActions = [
    { id: 'pdf-analyzer', label: 'Analyze a PDF', desc: 'Extract notes & RAG Q&A', icon: FileText },
    { id: 'research', label: 'Start Research', desc: 'Synthesize topic literature', icon: Search },
    { id: 'assignments', label: 'Create Assignment', desc: 'Draft structured answers', icon: BookOpen },
    { id: 'presentations', label: 'Generate Presentation', desc: 'Build slide deck with notes', icon: Presentation },
    { id: 'viva', label: 'Practice Viva', desc: 'Mock oral defense questions', icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="academic-card p-6 border-l-4 border-l-[#315B85]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#202938]">Welcome back, Student</h2>
            <p className="text-xs text-[#687386] mt-1 max-w-2xl">
              Your academic workspace is active. You have{' '}
              <span className="font-semibold text-[#202938]">{data.counts.pendingTasks} pending study tasks</span> and{' '}
              <span className="font-semibold text-[#202938]">{data.counts.documents} uploaded documents</span> ready for multi-agent synthesis.
            </p>
          </div>
          <button
            onClick={() => onNavigate('agent-workspace')}
            className="academic-btn-primary text-xs shrink-0 flex items-center space-x-1.5 self-start md:self-auto"
          >
            <span>Launch 5-Agent Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#687386] mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <button
                key={qa.id}
                onClick={() => onNavigate(qa.id)}
                className="academic-card p-4 text-left academic-card-hover group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded bg-[#EAF1F8] text-[#315B85] flex items-center justify-center mb-2.5 group-hover:bg-[#315B85] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-[#202938] group-hover:text-[#315B85]">{qa.label}</div>
                  <div className="text-[11px] text-[#687386] mt-0.5">{qa.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Grid: Deadlines + Documents + Generated Files */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Upcoming Deadlines */}
        <div className="academic-card p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9EF]">
            <h3 className="text-xs font-semibold text-[#202938] flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#315B85]" />
              <span>Upcoming Deadlines</span>
            </h3>
            <button
              onClick={() => onNavigate('study-planner')}
              className="text-[11px] text-[#315B85] font-medium hover:underline"
            >
              Planner
            </button>
          </div>

          {data.upcomingDeadlines.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
              <p className="text-xs text-[#687386]">No upcoming deadlines registered.</p>
              <button
                onClick={() => onNavigate('study-planner')}
                className="text-xs text-[#315B85] font-medium mt-2 hover:underline"
              >
                + Add Assignment Deadline
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.upcomingDeadlines.map((t) => (
                <div key={t.id} className="p-2.5 bg-[#F7F8FA] rounded border border-[#E5E9EF] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#202938] truncate">{t.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      t.priority === 'High' ? 'bg-[#FBEAE9] text-[#C45454]' : 'bg-[#EAF1F8] text-[#315B85]'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#687386] mt-1 flex items-center space-x-1">
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
        <div className="academic-card p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9EF]">
            <h3 className="text-xs font-semibold text-[#202938] flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#315B85]" />
              <span>Recent Course Material</span>
            </h3>
            <button
              onClick={() => onNavigate('pdf-analyzer')}
              className="text-[11px] text-[#315B85] font-medium hover:underline"
            >
              Upload
            </button>
          </div>

          {data.recentDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
              <p className="text-xs text-[#687386]">No documents analyzed yet.</p>
              <button
                onClick={() => onNavigate('pdf-analyzer')}
                className="text-xs text-[#315B85] font-medium mt-2 hover:underline"
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
                  className="p-2.5 bg-[#F7F8FA] rounded border border-[#E5E9EF] text-xs hover:border-[#CBD5E1] cursor-pointer"
                >
                  <div className="font-medium text-[#202938] truncate">{doc.fileName}</div>
                  <div className="text-[11px] text-[#687386] mt-1 flex items-center justify-between">
                    <span>{doc.pageCount} Pages • Indexed for RAG</span>
                    <span>{doc.uploadedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Generated Files & Downloads */}
        <div className="academic-card p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9EF]">
            <h3 className="text-xs font-semibold text-[#202938] flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-[#315B85]" />
              <span>Generated Documents</span>
            </h3>
            <button
              onClick={() => onNavigate('history')}
              className="text-[11px] text-[#315B85] font-medium hover:underline"
            >
              View All
            </button>
          </div>

          {data.recentFiles.length === 0 ? (
            <div className="text-center py-8">
              <Download className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
              <p className="text-xs text-[#687386]">No files generated yet.</p>
              <p className="text-[11px] text-[#687386] mt-1">Use Assignment or Presentation generator to create outputs.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {data.recentFiles.map((f) => (
                <div key={f.id} className="p-2.5 bg-[#F7F8FA] rounded border border-[#E5E9EF] text-xs flex items-center justify-between">
                  <div className="overflow-hidden mr-2">
                    <div className="font-medium text-[#202938] truncate">{f.fileName}</div>
                    <span className="text-[10px] uppercase font-semibold text-[#315B85]">{f.fileType} format</span>
                  </div>
                  <a
                    href={f.downloadUrl}
                    download
                    className="p-1.5 text-[#315B85] hover:text-[#27496B] hover:bg-white rounded border border-transparent hover:border-[#E5E9EF]"
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
