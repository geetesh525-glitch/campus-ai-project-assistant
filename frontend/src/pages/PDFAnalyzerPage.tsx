import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Search,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles,
  ArrowRight,
  Send,
  Download,
  BookMarked,
  Award,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Info,
  Lightbulb,
  Table
} from 'lucide-react';
import { campusApi } from '../services/api';
import {
  DocumentDetailedAnalysis,
  TopicElaboration,
  ChapterSectionSummary,
  ProbableQuestion,
  ComparativeDistinction
} from '../types';

export const PDFAnalyzerPage: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [analysis, setAnalysis] = useState<DocumentDetailedAnalysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);

  // Upload states
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'rag' | 'summary' | 'topics' | 'exam-notes'>('rag');

  // RAG Query states
  const [query, setQuery] = useState('');
  const [asking, setAsking] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    {
      query: string;
      answer: string;
      sourcePages: number[];
      citations: any[];
      suggestedFollowUps?: string[];
    }[]
  >([]);

  // Topic Explorer state
  const [selectedTopic, setSelectedTopic] = useState<TopicElaboration | null>(null);
  const [topicSearchTerm, setTopicSearchTerm] = useState('');

  // Export state
  const [exportingNotes, setExportingNotes] = useState(false);
  const [exportedFileUrl, setExportedFileUrl] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState(false);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      const docs = await campusApi.listPdfs();
      setDocuments(docs);
      if (docs.length > 0) {
        handleSelectDocument(docs[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectDocument = async (docId: string) => {
    setSelectedDocId(docId);
    setLoadingAnalysis(true);
    setExportedFileUrl(null);
    try {
      const found = documents.find((d) => d.id === docId);
      if (found) setSelectedDoc(found);

      const detailed = await campusApi.getDocumentAnalysis(docId);
      setAnalysis(detailed);
      if (detailed.topics?.length > 0) {
        setSelectedTopic(detailed.topics[0]);
      }
    } catch (e) {
      console.error('Failed to load detailed analysis:', e);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Only PDF files are supported.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setUploadError('File size exceeds the 25MB limit.');
      return;
    }

    setUploadError(null);
    setUploading(true);

    try {
      const doc = await campusApi.uploadPdf(file);
      setDocuments((prev) => [doc, ...prev]);
      await handleSelectDocument(doc.id);
    } catch (err: any) {
      setUploadError(err.response?.data?.detail || 'Failed to parse PDF with PyMuPDF.');
    } finally {
      setUploading(false);
    }
  };

  const handleAskQuestion = async (customQuery?: string) => {
    const q = (customQuery || query).trim();
    if (!q || !selectedDocId) return;

    setQuery('');
    setAsking(true);

    try {
      const res = await campusApi.queryPdfRAG(selectedDocId, q);
      setChatHistory((prev) => [
        ...prev,
        {
          query: q,
          answer: res.answer,
          sourcePages: res.sourcePages,
          citations: res.citations,
          suggestedFollowUps: res.suggestedFollowUps || [],
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        {
          query: q,
          answer: 'Error retrieving answer: ' + (err.response?.data?.detail || err.message),
          sourcePages: [],
          citations: [],
        },
      ]);
    } finally {
      setAsking(false);
    }
  };

  const handleExportDocx = async () => {
    if (!selectedDocId) return;
    setExportingNotes(true);
    try {
      const res = await campusApi.exportPdfNotes(selectedDocId);
      setExportedFileUrl(res.downloadUrl);
      window.open(res.downloadUrl, '_blank');
    } catch (e) {
      console.error('Failed to export notes:', e);
    } finally {
      setExportingNotes(false);
    }
  };

  const handleCopyNotes = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const filteredTopics = analysis?.topics?.filter((t) =>
    t.title.toLowerCase().includes(topicSearchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(topicSearchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      {/* Top Document Management Bar */}
      <div className="academic-card p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#315B85] mb-1">
              <FileText className="w-4 h-4" />
              <span>ADVANCED ACADEMIC PDF ANALYZER & RAG ENGINE</span>
            </div>
            <h2 className="text-base font-semibold text-[#202938]">
              Document Ingestion, Semantic Search & Topic Elaboration
            </h2>
            <p className="text-xs text-[#687386] mt-0.5 max-w-3xl">
              Extracts text page-by-page using PyMuPDF. Generates detailed executive summaries, section breakdowns, deep-dive topic elaborations, and high-yield examination notes with zero invented citations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {analysis && (
              <button
                onClick={handleExportDocx}
                disabled={exportingNotes}
                className="academic-btn-secondary text-xs flex items-center space-x-1.5 py-2 px-3 border-[#CBD5E1]"
                title="Download comprehensive study guide as Word document"
              >
                <Download className="w-3.5 h-3.5 text-[#315B85]" />
                <span>{exportingNotes ? 'Exporting...' : 'Export Study Guide (.DOCX)'}</span>
              </button>
            )}

            <label className="academic-btn-primary text-xs flex items-center space-x-1.5 cursor-pointer py-2 px-3 shadow-sm">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Processing with PyMuPDF...' : 'Upload PDF'}</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {uploadError && (
          <div className="mt-3 p-2.5 rounded bg-[#FBEAE9] border border-[#FFCDD2] text-xs text-[#C45454] flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Document Selector Pills */}
        {documents.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#E5E9EF] flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[#687386] font-medium shrink-0">Active Documents:</span>
            {documents.map((d) => (
              <button
                key={d.id}
                onClick={() => handleSelectDocument(d.id)}
                className={`px-3 py-1.5 rounded border text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                  selectedDocId === d.id
                    ? 'bg-[#EAF1F8] border-[#315B85] text-[#315B85] font-semibold'
                    : 'bg-white border-[#E5E9EF] text-[#687386] hover:bg-[#F7F8FA]'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>{d.fileName}</span>
                <span className="text-[10px] opacity-75 font-normal">({d.pageCount} pgs)</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Workspace */}
      {!selectedDocId || loadingAnalysis ? (
        <div className="academic-card p-12 text-center text-xs text-[#687386]">
          <FileText className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3 animate-pulse" />
          <h3 className="font-semibold text-sm text-[#202938]">
            {loadingAnalysis ? 'Analyzing Document with PyMuPDF...' : 'No Document Selected'}
          </h3>
          <p className="mt-1">
            {loadingAnalysis
              ? 'Parsing pages, extracting mathematical definitions, and structuring topic elaborations...'
              : 'Select a document above or upload a PDF to inspect chapter summaries and exam notes.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Document Header & Navigation Tabs */}
          <div className="academic-card px-5 pt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#E5E9EF]">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-[#202938]">{analysis?.fileName}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5E9] text-[#32845A] border border-[#C8E6C9]">
                    Indexed for RAG ({analysis?.pageCount} Pages)
                  </span>
                </div>
                <div className="text-[11px] text-[#687386] mt-0.5">
                  Semantic chunking active • Verified source page attribution
                </div>
              </div>

              {/* 4 Specialized Sub-Feature Tabs */}
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('rag')}
                  className={`px-3 py-1.5 rounded font-medium flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'rag' ? 'bg-[#315B85] text-white shadow-sm' : 'text-[#687386] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Q&A (RAG Engine)</span>
                </button>
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-3 py-1.5 rounded font-medium flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'summary' ? 'bg-[#315B85] text-white shadow-sm' : 'text-[#687386] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Document & Chapter Summary</span>
                </button>
                <button
                  onClick={() => setActiveTab('topics')}
                  className={`px-3 py-1.5 rounded font-medium flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'topics' ? 'bg-[#315B85] text-white shadow-sm' : 'text-[#687386] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>Elaborated Key Topics ({analysis?.topics?.length || 0})</span>
                </button>
                <button
                  onClick={() => setActiveTab('exam-notes')}
                  className={`px-3 py-1.5 rounded font-medium flex items-center space-x-1.5 transition-colors ${
                    activeTab === 'exam-notes' ? 'bg-[#315B85] text-white shadow-sm' : 'text-[#687386] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Exam Notes & High-Yield Questions</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SUB-FEATURE 1: ADVANCED SEMANTIC Q&A (RAG INTERROGATOR) */}
            {/* ========================================================================= */}
            {activeTab === 'rag' && (
              <div className="py-4 space-y-4">
                {/* Suggested Inquiry Chips */}
                {analysis?.suggestedQuestions && analysis.suggestedQuestions.length > 0 && (
                  <div className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF] text-xs">
                    <div className="text-[11px] font-semibold text-[#687386] mb-1.5 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-[#315B85]" />
                      <span>Suggested High-Yield Inquiries for this Document:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.suggestedQuestions.map((sq, i) => (
                        <button
                          key={i}
                          onClick={() => handleAskQuestion(sq)}
                          disabled={asking}
                          className="px-2.5 py-1 rounded bg-white text-[#315B85] border border-[#CBD5E1] text-[11px] hover:bg-[#EAF1F8] transition-colors text-left"
                        >
                          {sq}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question & Answer Conversation Thread */}
                <div className="space-y-4 min-h-[220px] max-h-[500px] overflow-y-auto pr-1 text-xs">
                  {chatHistory.length === 0 ? (
                    <div className="p-8 text-center bg-[#F7F8FA] rounded border border-[#E5E9EF] text-[#687386]">
                      <Search className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
                      <p className="font-medium text-[#202938]">Interactive Academic RAG Interrogator</p>
                      <p className="text-[11px] mt-1 max-w-md mx-auto">
                        Ask any specific question regarding definitions, theorems, formulas, or anomalies in this document.
                        Responses provide deep theoretical elaboration accompanied by exact page numbers and evidence snippets.
                      </p>
                    </div>
                  ) : (
                    chatHistory.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        {/* Student Query Box */}
                        <div className="p-3 bg-white rounded border border-[#CBD5E1] font-medium text-[#202938] flex items-start space-x-2">
                          <span className="text-[#315B85] font-bold text-xs">Q:</span>
                          <span className="text-xs">{item.query}</span>
                        </div>

                        {/* RAG Answer Container */}
                        <div className="p-4 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-3">
                          <div className="text-[#202938] leading-relaxed whitespace-pre-wrap text-xs font-sans">
                            {item.answer}
                          </div>

                          {/* Source Citations with Excerpt Snippets */}
                          {item.citations && item.citations.length > 0 && (
                            <div className="pt-3 border-t border-[#E5E9EF] space-y-2">
                              <div className="text-[11px] font-semibold text-[#687386] flex items-center space-x-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-[#315B85]" />
                                <span>Verified Primary Citations from PDF:</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {item.citations.map((c: any, cIdx: number) => (
                                  <div
                                    key={cIdx}
                                    className="p-2.5 bg-white rounded border border-[#E5E9EF] text-[11px] space-y-1"
                                  >
                                    <div className="flex items-center justify-between font-semibold text-[#315B85]">
                                      <span>Page {c.page}</span>
                                      {c.heading && <span className="text-[10px] text-[#687386] truncate max-w-[150px]">{c.heading}</span>}
                                    </div>
                                    <p className="text-[#687386] italic line-clamp-2">"{c.snippet}"</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Follow-up Question Chips */}
                          {item.suggestedFollowUps && item.suggestedFollowUps.length > 0 && (
                            <div className="pt-2 border-t border-[#E5E9EF] flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-semibold text-[#687386]">Follow-up:</span>
                              {item.suggestedFollowUps.map((fu, fIdx) => (
                                <button
                                  key={fIdx}
                                  onClick={() => handleAskQuestion(fu)}
                                  disabled={asking}
                                  className="text-[10px] px-2 py-0.5 rounded bg-white text-[#315B85] border border-[#CBD5E1] hover:bg-[#EAF1F8]"
                                >
                                  {fu}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAskQuestion();
                  }}
                  className="flex items-center space-x-2 pt-2 border-t border-[#E5E9EF]"
                >
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about normal forms, lossless joins, anomalies, or formulas..."
                    className="academic-input flex-1 text-xs"
                    disabled={asking}
                  />
                  <button
                    type="submit"
                    disabled={asking || !query.trim()}
                    className="academic-btn-primary text-xs flex items-center space-x-1.5 py-2 px-4 disabled:opacity-50"
                  >
                    <span>{asking ? 'Retrieving Passages...' : 'Query RAG'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* SUB-FEATURE 2: IN-DEPTH DOCUMENT & CHAPTER SUMMARY */}
            {/* ========================================================================= */}
            {activeTab === 'summary' && analysis && (
              <div className="py-4 space-y-5 text-xs">
                {/* Executive Summary Card */}
                <div className="p-4 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-[#202938]">Executive Academic Overview</h4>
                    <button
                      onClick={() => handleCopyNotes(analysis.executiveSummary)}
                      className="text-[#687386] hover:text-[#202938] flex items-center space-x-1 text-[11px]"
                    >
                      {copiedState ? <Check className="w-3 h-3 text-[#32845A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedState ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[#202938] leading-relaxed whitespace-pre-wrap">
                    {analysis.executiveSummary}
                  </p>
                </div>

                {/* Methodology Overview */}
                <div className="p-4 bg-white rounded border border-[#E5E9EF] space-y-1.5">
                  <h4 className="font-semibold text-[#315B85] text-xs">Curriculum Methodology & Algorithmic Framework</h4>
                  <p className="text-[#687386] leading-relaxed">
                    {analysis.methodologyOverview}
                  </p>
                </div>

                {/* Chapter & Page Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#202938] text-xs uppercase tracking-wider text-[#687386]">
                    Chapter-by-Chapter / Page-by-Page Detailed Analysis
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analysis.chapters.map((ch) => (
                      <div key={ch.pageNumber} className="p-4 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-2">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#E5E9EF]">
                          <span className="font-semibold text-[#202938] text-xs truncate mr-2">{ch.title}</span>
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-[#EAF1F8] text-[#315B85] shrink-0">
                            Page {ch.pageNumber}
                          </span>
                        </div>
                        <p className="text-[#687386] text-xs leading-relaxed">{ch.overview}</p>
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-semibold text-[#202938]">Key Mechanisms:</span>
                          <ul className="space-y-1">
                            {ch.keyPoints.map((kp, idx) => (
                              <li key={idx} className="flex items-start space-x-1.5 text-[11px] text-[#687386]">
                                <span className="text-[#315B85] font-bold">•</span>
                                <span>{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* SUB-FEATURE 3: ELABORATED KEY TOPICS (DEEP-DIVE EXPLORER) */}
            {/* ========================================================================= */}
            {activeTab === 'topics' && analysis && (
              <div className="py-4 space-y-4 text-xs">
                {/* Search Bar for Topics */}
                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-[#687386] absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={topicSearchTerm}
                      onChange={(e) => setTopicSearchTerm(e.target.value)}
                      placeholder="Search among elaborated topics (e.g. BCNF, Anomalies, Closures)..."
                      className="academic-input w-full pl-8 text-xs"
                    />
                  </div>
                  <span className="text-[11px] text-[#687386] shrink-0">
                    Showing {filteredTopics.length} of {analysis.topics.length} Elaborated Concepts
                  </span>
                </div>

                {/* Topics Layout: Sidebar selector + Full Elaboration Pane */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left Column: Topic List Cards */}
                  <div className="space-y-2 lg:col-span-1 max-h-[550px] overflow-y-auto pr-1">
                    {filteredTopics.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTopic(t)}
                        className={`p-3 rounded border cursor-pointer transition-colors ${
                          selectedTopic?.id === t.id
                            ? 'bg-[#EAF1F8] border-[#315B85] text-[#315B85]'
                            : 'bg-white border-[#E5E9EF] text-[#202938] hover:bg-[#F7F8FA]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#315B85] border border-[#CBD5E1]">
                            Page(s) {t.pageNumbers.join(', ')}
                          </span>
                        </div>
                        <h5 className="font-semibold text-xs leading-snug">{t.title}</h5>
                        <p className="text-[11px] text-[#687386] line-clamp-2 mt-1">{t.definition}</p>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: In-Depth Topic Deep Dive */}
                  <div className="lg:col-span-2">
                    {selectedTopic ? (
                      <div className="academic-card p-5 space-y-4 border-2 border-[#CBD5E1]">
                        {/* Title & Page Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E9EF]">
                          <div>
                            <span className="text-[10px] font-bold text-[#315B85] uppercase tracking-wider">
                              Elaborated Concept Deep-Dive
                            </span>
                            <h4 className="text-base font-bold text-[#202938]">{selectedTopic.title}</h4>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setActiveTab('rag');
                                handleAskQuestion(`Explain ${selectedTopic.title} and how it applies to course examinations.`);
                              }}
                              className="academic-btn-secondary text-[11px] py-1 px-2.5 flex items-center space-x-1"
                            >
                              <Search className="w-3 h-3 text-[#315B85]" />
                              <span>Query in RAG</span>
                            </button>
                            <span className="text-[11px] font-semibold text-[#315B85] px-2 py-0.5 rounded bg-[#EAF1F8]">
                              Page {selectedTopic.pageNumbers.join(', ')}
                            </span>
                          </div>
                        </div>

                        {/* Formal Academic Definition */}
                        <div className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-1">
                          <div className="text-[10px] font-bold uppercase text-[#687386]">Formal Academic Definition</div>
                          <p className="text-xs text-[#202938] font-medium leading-relaxed">
                            {selectedTopic.definition}
                          </p>
                        </div>

                        {/* Detailed Elaboration */}
                        <div className="space-y-1.5">
                          <h5 className="font-semibold text-xs text-[#202938]">Comprehensive Theoretical Elaboration</h5>
                          <p className="text-[#687386] leading-relaxed whitespace-pre-wrap text-xs">
                            {selectedTopic.elaboration}
                          </p>
                        </div>

                        {/* Core Principles */}
                        <div className="space-y-2">
                          <h5 className="font-semibold text-xs text-[#202938]">Core Governing Rules & Axioms:</h5>
                          <ul className="space-y-1.5">
                            {selectedTopic.corePrinciples.map((cp, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-xs text-[#687386]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#32845A] shrink-0 mt-0.5" />
                                <span>{cp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Practical Application */}
                        <div className="p-3 bg-[#F8FAFC] rounded border border-[#E5E9EF] space-y-1">
                          <div className="text-[10px] font-bold uppercase text-[#315B85] flex items-center space-x-1">
                            <Lightbulb className="w-3 h-3" />
                            <span>Practical Real-World Application</span>
                          </div>
                          <p className="text-xs text-[#202938] leading-relaxed">
                            {selectedTopic.practicalApplication}
                          </p>
                        </div>

                        {/* Exam Advice & Common Pitfalls */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="p-3 bg-[#FEF7EC] rounded border border-[#FFE0B2] space-y-1">
                            <div className="text-[10px] font-bold uppercase text-[#C18A36] flex items-center space-x-1">
                              <Award className="w-3 h-3" />
                              <span>Examination Significance</span>
                            </div>
                            <p className="text-[11px] text-[#202938] leading-relaxed">
                              {selectedTopic.examSignificance}
                            </p>
                          </div>

                          <div className="p-3 bg-[#FBEAE9] rounded border border-[#FFCDD2] space-y-1">
                            <div className="text-[10px] font-bold uppercase text-[#C45454] flex items-center space-x-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>Common Pitfalls to Avoid</span>
                            </div>
                            <p className="text-[11px] text-[#202938] leading-relaxed">
                              {selectedTopic.commonPitfalls}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="academic-card p-12 text-center text-xs text-[#687386]">
                        Select any topic from the list to view its complete academic elaboration.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* SUB-FEATURE 4: HIGH-YIELD EXAM NOTES & QUESTIONS */}
            {/* ========================================================================= */}
            {activeTab === 'exam-notes' && analysis && (
              <div className="py-4 space-y-6 text-xs">
                {/* 1. Must-Know Definitions */}
                <div className="academic-card p-5 space-y-3">
                  <h4 className="font-semibold text-sm text-[#202938] flex items-center space-x-2">
                    <BookMarked className="w-4 h-4 text-[#315B85]" />
                    <span>Essential Definitions Cheat-Sheet (2-Mark Questions)</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {analysis.examNotes.mustKnowDefinitions.map((def, i) => (
                      <div key={i} className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-1">
                        <span className="font-semibold text-[#315B85] text-xs">{def.term}</span>
                        <p className="text-[#687386] text-[11px] leading-relaxed">{def.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. High-Yield Formulas & Theorems */}
                <div className="academic-card p-5 space-y-3">
                  <h4 className="font-semibold text-sm text-[#202938] flex items-center space-x-2">
                    <Table className="w-4 h-4 text-[#315B85]" />
                    <span>Mathematical Formulas, Theorems & Formal Tests</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {analysis.examNotes.highYieldFormulasAndTheorems.map((f, i) => (
                      <div key={i} className="p-3 bg-white rounded border border-[#CBD5E1] space-y-1">
                        <div className="text-[11px] font-semibold text-[#202938]">{f.name}</div>
                        <div className="font-mono text-xs font-bold text-[#315B85] p-2 bg-[#EAF1F8] rounded">
                          {f.formula}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Probable Long & Short Exam Questions */}
                <div className="academic-card p-5 space-y-4">
                  <h4 className="font-semibold text-sm text-[#202938] flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#315B85]" />
                    <span>Probable University Exam Questions with Model Answer Blueprints</span>
                  </h4>

                  <div className="space-y-3">
                    {analysis.examNotes.probableExamQuestions.map((pq, idx) => (
                      <div key={idx} className="p-4 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#202938] text-xs">Question #{idx + 1}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pq.marksWeightage === 10
                              ? 'bg-[#EAF1F8] text-[#315B85]'
                              : 'bg-[#FEF7EC] text-[#C18A36]'
                          }`}>
                            {pq.questionType}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-[#202938] leading-snug">"{pq.question}"</h5>

                        <div className="pt-2 border-t border-[#E5E9EF] space-y-1.5">
                          <span className="text-[11px] font-semibold text-[#315B85]">Model Scoring Blueprint:</span>
                          <ul className="space-y-1">
                            {pq.modelAnswerOutline.map((step, sIdx) => (
                              <li key={sIdx} className="flex items-start space-x-2 text-[11px] text-[#687386]">
                                <span className="font-bold text-[#315B85]">•</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Comparative Matrices */}
                <div className="academic-card p-5 space-y-4">
                  <h4 className="font-semibold text-sm text-[#202938] flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-[#315B85]" />
                    <span>High-Yield Comparative Distinctions (Side-by-Side Analysis)</span>
                  </h4>

                  {analysis.examNotes.comparativeDistinctions.map((comp, idx) => (
                    <div key={idx} className="p-4 bg-white rounded border border-[#E5E9EF] space-y-3">
                      <h5 className="font-bold text-xs text-[#315B85]">{comp.title}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {/* Entity A */}
                        <div className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-1.5">
                          <span className="font-bold text-[#202938]">{comp.entityA.name}</span>
                          <ul className="space-y-1 text-[#687386] text-[11px]">
                            {comp.entityA.details.map((d, dIdx) => (
                              <li key={dIdx} className="flex items-start space-x-1.5">
                                <span className="text-[#315B85]">•</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Entity B */}
                        <div className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-1.5">
                          <span className="font-bold text-[#202938]">{comp.entityB.name}</span>
                          <ul className="space-y-1 text-[#687386] text-[11px]">
                            {comp.entityB.details.map((d, dIdx) => (
                              <li key={dIdx} className="flex items-start space-x-1.5">
                                <span className="text-[#32845A]">•</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5. Examiner Tips */}
                <div className="academic-card p-5 border-l-4 border-l-[#C18A36] space-y-2">
                  <h4 className="font-semibold text-xs text-[#C18A36] uppercase tracking-wider flex items-center space-x-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>Examiner Insights & Oral Defense Tips</span>
                  </h4>
                  <ul className="space-y-2 text-[#202938] text-xs">
                    {analysis.examNotes.examinerTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="font-bold text-[#C18A36] mt-0.5">#{idx + 1}</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
