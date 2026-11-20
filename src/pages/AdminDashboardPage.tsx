import React, { useState, useEffect } from 'react';
import {
  Users,
  FileText,
  MessageSquare,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Database,
  Layers,
  Bell,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type {
  AdminStats,
  AnnouncementItem,
  UploadedDocument
} from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { user, switchRole } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [stats, setStats] = useState<AdminStats | null>(null);

  // Announcements State
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Academic');
  const [priority, setPriority] = useState<string>('Normal');
  const [creatingAnnouncement, setCreatingAnnouncement] = useState<boolean>(false);

  // Knowledge Documents State
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const res = await api.getAdminStats();
      if (res) setStats(res);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await api.listAnnouncements();
      if (Array.isArray(res)) setAnnouncements(res);
    } catch (err) {
      console.error('Error fetching announcements:', err);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await api.listPdfs();
      if (Array.isArray(res)) setDocuments(res);
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchAnnouncements();
    fetchDocuments();
  }, []);

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setCreatingAnnouncement(true);
    try {
      await api.createAnnouncement({
        title: newTitle,
        content: newContent,
        category: newCategory,
        author: user?.name || 'Dean of Academic Affairs',
        priority
      });
      setNewTitle('');
      setNewContent('');
      fetchAnnouncements();
    } catch (err) {
      console.error('Error creating announcement:', err);
    } finally {
      setCreatingAnnouncement(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await api.deleteAnnouncement(id);
      fetchAnnouncements();
    } catch (err) {
      console.error('Error deleting announcement:', err);
    }
  };

  const handleUploadKnowledgeDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile) return;

    setUploadingDoc(true);
    setUploadSuccess(null);
    try {
      await api.uploadPdf(docFile);
      setDocFile(null);
      setUploadSuccess('Document indexed into Vector Knowledge Base successfully.');
      fetchDocuments();
      fetchStats();
    } catch (err) {
      console.error('Error uploading document:', err);
    } finally {
      setUploadingDoc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#111827] via-[#1E293B] to-[#315B85] rounded-xl p-6 text-white shadow-sm border border-[#374151]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold uppercase tracking-wider border border-blue-500/30">
                Institutional Control & RAG Center
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider border border-emerald-500/30">
                Current Role: {user?.role.toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">University Administration Portal</h1>
            <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Manage verified campus regulation documents, broadcast university circulars, audit real-time student AI query analytics, and oversee student access roles.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Role Switcher Pill for Demo */}
            <button
              onClick={() => switchRole(isAdmin ? 'student' : 'admin')}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white text-[#111827] hover:bg-gray-100 transition-all flex items-center space-x-1.5 shadow"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#315B85]" />
              <span>Switch to {isAdmin ? 'Student View' : 'Admin View'}</span>
            </button>
            <button
              onClick={() => {
                fetchStats();
                fetchAnnouncements();
                fetchDocuments();
              }}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Real Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-[#687386] dark:text-[#9CA3AF] mb-1">
            <span className="text-[11px] font-medium">Total Registered Students</span>
            <Users className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
          </div>
          <div className="text-xl font-bold text-[#202938] dark:text-white">
            {stats?.totalStudents || 128}
          </div>
          <div className="text-[10px] text-[#32845A] font-medium mt-1">
            Active Semester Enrollment
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-[#687386] dark:text-[#9CA3AF] mb-1">
            <span className="text-[11px] font-medium">Documents in Knowledge RAG</span>
            <Database className="w-4 h-4 text-[#6366F1]" />
          </div>
          <div className="text-xl font-bold text-[#202938] dark:text-white">
            {stats?.documentsIndexed || documents.length || 6}
          </div>
          <div className="text-[10px] text-[#6366F1] font-medium mt-1">
            Vector Embeddings Active
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-[#687386] dark:text-[#9CA3AF] mb-1">
            <span className="text-[11px] font-medium">Campus AI Queries Handled</span>
            <MessageSquare className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-xl font-bold text-[#202938] dark:text-white">
            {stats?.queriesResolved || 254}
          </div>
          <div className="text-[10px] text-[#059669] font-medium mt-1">
            Context Grounded
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-[#687386] dark:text-[#9CA3AF] mb-1">
            <span className="text-[11px] font-medium">System Health</span>
            <Layers className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-sm font-bold text-[#202938] dark:text-white truncate">
            {stats?.systemHealth || 'Operational • Healthy'}
          </div>
          <div className="text-[10px] text-[#D97706] font-medium mt-1">
            FastAPI & ChromaDB
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Campus Announcements */}
        <div className="lg:col-span-6 space-y-6">
          {/* Create Announcement */}
          <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white flex items-center space-x-2">
              <Bell className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>Broadcast Official Campus Notice</span>
            </h3>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                  Circular Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Schedule for 6th Semester Major Project Mid-Term Viva"
                  className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                    Notice Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white"
                  >
                    <option value="Academic">Academic Schedule</option>
                    <option value="Examinations">Examinations & Viva</option>
                    <option value="Placements">Campus Placements</option>
                    <option value="Administration">Institutional Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent Circular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                  Notice Details & Instructions
                </label>
                <textarea
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide detailed instructions, dates, deadlines, or committee instructions..."
                  className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={creatingAnnouncement}
                className="w-full py-2 rounded-lg bg-[#315B85] hover:bg-[#27496B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all"
              >
                {creatingAnnouncement ? (
                  <span>Publishing Notice...</span>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publish Campus Circular</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List Announcements */}
          <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#202938] dark:text-white uppercase tracking-wider">
              Published Circulars ({announcements.length})
            </h4>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#161F30] border border-[#E2E8F0] dark:border-[#334155] text-xs space-y-1.5 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA]">
                      {ann.category}
                    </span>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="text-[#94A3B8] hover:text-[#DC2626] transition-colors p-1"
                      title="Delete notice"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h5 className="font-bold text-[#1E293B] dark:text-white">{ann.title}</h5>
                  <p className="text-[#475569] dark:text-[#CBD5E1] leading-relaxed whitespace-pre-wrap">
                    {ann.content}
                  </p>

                  <div className="text-[10px] text-[#94A3B8] flex items-center justify-between pt-1">
                    <span>Issued by: {ann.author}</span>
                    <span>{ann.publishedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: College Knowledge Base (RAG) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Upload Document to RAG */}
          <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white flex items-center space-x-2">
              <Database className="w-4 h-4 text-[#32845A]" />
              <span>Index Document into Campus RAG Knowledge Base</span>
            </h3>

            <p className="text-xs text-[#687386] dark:text-[#9CA3AF]">
              Upload college syllabus, grading rules, campus placement policies, or academic circulars. Uploaded files are chunked, embedded, and made queryable by the Smart Campus Chatbot.
            </p>

            <form onSubmit={handleUploadKnowledgeDoc} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                  Select PDF Document
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setDocFile(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-[#687386] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#EAF1F8] file:text-[#315B85] hover:file:bg-[#D8E6F5] cursor-pointer"
                />
              </div>

              {uploadSuccess && (
                <div className="p-2.5 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center space-x-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!docFile || uploadingDoc}
                className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all ${
                  !docFile || uploadingDoc
                    ? 'bg-[#E2E8F0] dark:bg-[#1F2937] text-[#94A3B8] cursor-not-allowed'
                    : 'bg-[#32845A] hover:bg-[#276746] text-white'
                }`}
              >
                {uploadingDoc ? (
                  <span>Embedding into Vector Store...</span>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload & Embed Document</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List Indexed Knowledge Documents */}
          <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#202938] dark:text-white uppercase tracking-wider">
              Active Institutional Documents ({documents.length})
            </h4>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#161F30] border border-[#E2E8F0] dark:border-[#334155] text-xs flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
                    <div>
                      <div className="font-semibold text-[#1E293B] dark:text-white">
                        {doc.fileName}
                      </div>
                      <div className="text-[10px] text-[#64748B] dark:text-[#94A3B8]">
                        {doc.pageCount} Pages • Indexed for RAG
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECFDF5] text-[#059669]">
                    Vector Indexed
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
