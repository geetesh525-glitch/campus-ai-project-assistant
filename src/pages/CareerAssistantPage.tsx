import React, { useState, useEffect } from 'react';
import {
  FileText,
  MessageSquare,
  Code2,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Target
} from 'lucide-react';
import { api } from '../services/api';
import type {
  ResumeReviewResponse,
  CodingPracticeProblem,
  CodeEvaluationResponse
} from '../types';

export const CareerAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'interview' | 'coding' | 'roadmap'>('resume');

  // Resume Review State
  const [resumeText, setResumeText] = useState<string>(
    `Geetesh Kumar\nB.Tech Computer Science and Engineering, 2026\nCGPA: 8.9/10\n\nSKILLS:\nPython, JavaScript, React, FastAPI, SQL, Git, Linux, PyMuPDF, ChromaDB\n\nPROJECTS:\nCampus AI Academic Assistant\n- Built an intelligent university platform using FastAPI and React.\n- Implemented RAG pipeline with PyMuPDF for document indexing.\n- Created multi-agent workspace for academic report generation.\n\nSmart IoT Energy Meter\n- Designed ESP32 sensor for power consumption tracking.\n- Displayed real-time metrics on React dashboard via WebSockets.`
  );
  const [targetRole, setTargetRole] = useState<string>('Software Development Engineer (SDE-1)');
  const [resumeLoading, setResumeLoading] = useState<boolean>(false);
  const [resumeResult, setResumeResult] = useState<ResumeReviewResponse | null>(null);

  // Technical Mock Interview State
  const [interviewTopic, setInterviewTopic] = useState<string>('Data Structures & Algorithms, Python, System Design');
  const [interviewRole, setInterviewRole] = useState<string>('Full Stack Engineer');
  const [interviewDiff, setInterviewDiff] = useState<string>('Entry Level / Campus Placement');
  const [interviewLoading, setInterviewLoading] = useState<boolean>(false);
  const [interviewResult, setInterviewResult] = useState<any>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);

  // Coding Practice State
  const [problems, setProblems] = useState<CodingPracticeProblem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<CodingPracticeProblem | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [evaluatingCode, setEvaluatingCode] = useState<boolean>(false);
  const [codeResult, setCodeResult] = useState<CodeEvaluationResponse | null>(null);

  // Career Roadmap State
  const [roadmapLoading, setRoadmapLoading] = useState<boolean>(false);
  const [roadmapResult, setRoadmapResult] = useState<any>(null);

  useEffect(() => {
    // Load default coding problems
    api.getCodingProblems()
      .then((res: any) => {
        if (Array.isArray(res) && res.length > 0) {
          setProblems(res);
          setSelectedProblem(res[0]);
          setUserCode(res[0].starterCode || '');
        }
      })
      .catch((err) => console.error('Error fetching coding problems:', err));
  }, []);

  const handleReviewResume = async () => {
    if (!resumeText.trim()) return;
    setResumeLoading(true);
    try {
      const res = await api.reviewResume({
        resumeText,
        targetRole
      });
      if (res) {
        setResumeResult(res);
      }
    } catch (err) {
      console.error('Error evaluating resume:', err);
    } finally {
      setResumeLoading(false);
    }
  };

  const handleGenerateInterview = async () => {
    setInterviewLoading(true);
    try {
      const res = await api.getInterviewPrep({
        topic: interviewTopic,
        role: interviewRole,
        experienceLevel: interviewDiff
      });
      if (res) {
        setInterviewResult(res);
        setExpandedQuestion(0);
      }
    } catch (err) {
      console.error('Error generating interview questions:', err);
    } finally {
      setInterviewLoading(false);
    }
  };

  const handleEvaluateCode = async () => {
    if (!selectedProblem || !userCode.trim()) return;
    setEvaluatingCode(true);
    try {
      const res = await api.evaluateCode({
        problemId: selectedProblem.id,
        language: 'python',
        code: userCode
      });
      if (res) {
        setCodeResult(res);
      }
    } catch (err) {
      console.error('Error evaluating code:', err);
    } finally {
      setEvaluatingCode(false);
    }
  };

  const handleLoadRoadmap = async () => {
    setRoadmapLoading(true);
    try {
      const res = await api.getSkillRoadmap();
      if (res) {
        setRoadmapResult(res);
      }
    } catch (err) {
      console.error('Error fetching skill roadmap:', err);
    } finally {
      setRoadmapLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#315B85] to-[#4F46E5] dark:from-[#0F172A] dark:to-[#312E81] rounded-xl p-6 text-white shadow-sm border border-[#CBD5E1]/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-semibold uppercase tracking-wider">
                Campus Placement & SDE Career Suite
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">AI Career & Placement Assistant</h1>
            <p className="text-xs text-blue-100 dark:text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Automated ATS Resume Scorer, Company Mock Interview Simulator, Interactive DSA Sandbox, and Semester Placement Roadmaps designed for engineering students.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'resume'
                  ? 'bg-white text-[#1E3A8A] shadow'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Resume Scorer
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'interview'
                  ? 'bg-white text-[#1E3A8A] shadow'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Mock Interview
            </button>
            <button
              onClick={() => setActiveTab('coding')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'coding'
                  ? 'bg-white text-[#1E3A8A] shadow'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              DSA Sandbox
            </button>
            <button
              onClick={() => {
                setActiveTab('roadmap');
                if (!roadmapResult) handleLoadRoadmap();
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-white text-[#1E3A8A] shadow'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Placement Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: RESUME SCORER */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Resume Form */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>Resume Content & ATS Parameters</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                Target Job Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white"
              >
                <option value="Software Development Engineer (SDE-1)">SDE 1 (Software Development Engineer)</option>
                <option value="Backend Developer (FastAPI / Cloud)">Backend Developer (FastAPI / Cloud)</option>
                <option value="Full-Stack Engineer (React & Python)">Full-Stack Engineer (React & Python)</option>
                <option value="Data Scientist & AI Specialist">Data Scientist & AI Specialist</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                Resume Plain Text (Paste or Type)
              </label>
              <textarea
                rows={12}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume contents here (Education, Skills, Experience, Projects)..."
                className="w-full text-xs p-3 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white font-mono leading-relaxed"
              />
            </div>

            <button
              onClick={handleReviewResume}
              disabled={resumeLoading}
              className="w-full py-2.5 rounded-lg bg-[#315B85] hover:bg-[#27496B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              {resumeLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Running ATS Evaluation...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Resume with ATS AI</span>
                </>
              )}
            </button>
          </div>

          {/* Resume Result Output */}
          <div className="lg:col-span-7 space-y-4">
            {!resumeResult && !resumeLoading ? (
              <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-10 text-center shadow-sm h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-[#202938] dark:text-white">
                  ATS Resume Audit Ready
                </h4>
                <p className="text-xs text-[#687386] dark:text-[#9CA3AF] max-w-sm mt-1">
                  Click "Analyze Resume with ATS AI" to receive your real-time score, missing technical keywords, strengths, and recommended action plan.
                </p>
                <button
                  onClick={handleReviewResume}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#315B85] dark:bg-[#2563EB] text-white text-xs font-medium"
                >
                  Analyze Sample Resume
                </button>
              </div>
            ) : resumeResult ? (
              <div className="space-y-4">
                {/* Score Header Card */}
                <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#687386] dark:text-[#9CA3AF]">
                      Target: {targetRole}
                    </span>
                    <h3 className="text-base font-bold text-[#202938] dark:text-white mt-0.5">
                      ATS Screening Verdict: Candidate Recommended
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#315B85] dark:text-[#60A5FA]">
                        {resumeResult.atsScore}/100
                      </div>
                      <div className="text-[10px] text-[#32845A] font-semibold">
                        Top 15% Percentile
                      </div>
                    </div>
                  </div>
                </div>

                {/* Missing Keywords & Strengths */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-4 shadow-sm">
                    <h4 className="text-xs font-bold text-[#32845A] dark:text-[#34D399] mb-2 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Key Resume Strengths</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#4B5563] dark:text-[#D1D5DB]">
                      {resumeResult.strengths && resumeResult.strengths.map((str: string, sIdx: number) => (
                        <li key={sIdx} className="flex items-start space-x-1.5">
                          <span className="text-[#32845A] font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Keywords */}
                  <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-4 shadow-sm">
                    <h4 className="text-xs font-bold text-[#C18A36] dark:text-[#FBBF24] mb-2 flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Missing High-Impact ATS Keywords</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {resumeResult.missingKeywords && resumeResult.missingKeywords.map((kw: string, kIdx: number) => (
                        <span
                          key={kIdx}
                          className="px-2 py-0.5 rounded text-[11px] bg-[#FEF3C7] dark:bg-[#78350F]/40 text-[#92400E] dark:text-[#FDE68A] font-medium border border-[#FDE68A] dark:border-[#78350F]"
                        >
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Improvements & Action Plan */}
                <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-[#202938] dark:text-white flex items-center space-x-1.5">
                    <Target className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
                    <span>Action Plan Before Next Placement Round</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#4B5563] dark:text-[#D1D5DB]">
                    {resumeResult.recommendedActionPlan && resumeResult.recommendedActionPlan.map((act: string, aIdx: number) => (
                      <li key={aIdx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#32845A] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* TAB 2: TECHNICAL MOCK INTERVIEW */}
      {activeTab === 'interview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>Interview Parameters</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={interviewRole}
                onChange={(e) => setInterviewRole(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                Topics & Domain Focus
              </label>
              <input
                type="text"
                value={interviewTopic}
                onChange={(e) => setInterviewTopic(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                Experience Level
              </label>
              <select
                value={interviewDiff}
                onChange={(e) => setInterviewDiff(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white"
              >
                <option value="Entry Level / Campus Placement">Entry Level / Campus Placement</option>
                <option value="Product Tech & High Scale">Product Tech & High Scale</option>
              </select>
            </div>

            <button
              onClick={handleGenerateInterview}
              disabled={interviewLoading}
              className="w-full py-2.5 rounded-lg bg-[#315B85] hover:bg-[#27496B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              {interviewLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Interview Session...</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Simulate Mock Technical Interview</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {!interviewResult && !interviewLoading ? (
              <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-10 text-center shadow-sm flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-[#202938] dark:text-white">
                  Mock Interview Ready
                </h4>
                <p className="text-xs text-[#687386] dark:text-[#9CA3AF] max-w-sm mt-1">
                  Click simulate to generate realistic interview questions, model answers, rubric points, and follow-ups.
                </p>
                <button
                  onClick={handleGenerateInterview}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#315B85] dark:bg-[#2563EB] text-white text-xs font-medium"
                >
                  Start Demo SDE Interview
                </button>
              </div>
            ) : interviewResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#202938] dark:text-white">
                    Questions for {interviewResult.role}
                  </h3>
                  <span className="text-xs text-[#687386] dark:text-[#9CA3AF]">
                    {interviewResult.questions ? interviewResult.questions.length : 0} Technical Questions
                  </span>
                </div>

                {interviewResult.questions && interviewResult.questions.map((q: any, idx: number) => {
                  const isExpanded = expandedQuestion === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
                        className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-[#F8FAFC] dark:hover:bg-[#161F30]"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="w-6 h-6 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EEF2F6] dark:bg-[#1E293B] text-[#315B85] dark:text-[#93C5FD]">
                                {q.category}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-[#202938] dark:text-white">
                              {q.question}
                            </h4>
                          </div>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#687386] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#687386] shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 border-t border-[#E5E9EF] dark:border-[#1F2937] space-y-3 text-xs bg-[#FBFBFC] dark:bg-[#0F172A]/50">
                          <div>
                            <span className="font-semibold text-[#32845A] dark:text-[#34D399] block mb-1">
                              Ideal Model Answer:
                            </span>
                            <div className="p-3 rounded-lg bg-white dark:bg-[#111827] border border-[#CBD5E1]/50 dark:border-[#334155] text-[#374151] dark:text-gray-200 leading-relaxed font-mono whitespace-pre-wrap">
                              {q.modelAnswer}
                            </div>
                          </div>

                          {q.keyEvaluationPoints && (
                            <div>
                              <span className="font-semibold text-[#687386] dark:text-[#9CA3AF] block mb-1">
                                Interviewer Evaluation Rubric:
                              </span>
                              <ul className="space-y-1">
                                {q.keyEvaluationPoints.map((tip: string, tIdx: number) => (
                                  <li key={tIdx} className="flex items-center space-x-1.5 text-[#4B5563] dark:text-[#D1D5DB]">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#32845A] shrink-0" />
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* TAB 3: CODING PRACTICE SANDBOX */}
      {activeTab === 'coding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Problem Selector & Spec */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
                <span>Curated SDE Problems</span>
              </span>
              <span className="text-[10px] text-[#687386]">Python 3</span>
            </h3>

            {/* Problem Select Dropdown */}
            <div className="space-y-1">
              {problems.map((p) => {
                const isSelected = selectedProblem?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProblem(p);
                      setUserCode(p.starterCode || '');
                      setCodeResult(null);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#315B85] dark:border-[#60A5FA] bg-[#EAF1F8] dark:bg-[#1E293B]'
                        : 'border-[#E5E9EF] dark:border-[#1F2937] hover:bg-[#F8FAFC] dark:hover:bg-[#161F30]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-[#202938] dark:text-white">{p.title}</div>
                      <div className="text-[10px] text-[#687386] dark:text-[#9CA3AF]">{p.category}</div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.difficulty === 'Easy'
                          ? 'bg-[#ECFDF5] text-[#059669]'
                          : p.difficulty === 'Medium'
                          ? 'bg-[#FEF3C7] text-[#D97706]'
                          : 'bg-[#FEE2E2] text-[#DC2626]'
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedProblem && (
              <div className="pt-3 border-t border-[#E5E9EF] dark:border-[#1F2937] space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-[#202938] dark:text-white mb-1">Problem Statement</h4>
                  <p className="text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                    {selectedProblem.problemStatement}
                  </p>
                </div>

                {selectedProblem.examples && selectedProblem.examples.length > 0 && (
                  <div>
                    <h5 className="font-bold text-[#687386] dark:text-[#9CA3AF] mb-1">Example 1:</h5>
                    <pre className="p-2.5 rounded bg-[#F7F8FA] dark:bg-[#161F30] font-mono text-[11px] text-[#334155] dark:text-gray-300">
                      Input: {selectedProblem.examples[0].input}{'\n'}
                      Output: {selectedProblem.examples[0].output}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interactive Code Editor & Evaluator */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#202938] dark:text-white flex items-center space-x-1.5">
                <Code2 className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
                <span>Python Solution Sandbox</span>
              </h4>

              <button
                onClick={() => {
                  if (selectedProblem) setUserCode(selectedProblem.starterCode || '');
                }}
                className="text-[11px] text-[#687386] hover:text-[#202938] dark:hover:text-white flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Starter</span>
              </button>
            </div>

            {/* Code Box */}
            <textarea
              rows={12}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full p-4 rounded-lg bg-[#0F172A] text-[#E2E8F0] font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              spellCheck={false}
            />

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#687386] dark:text-[#9CA3AF]">
                Static complexity & testcase verification engine
              </span>
              <button
                onClick={handleEvaluateCode}
                disabled={evaluatingCode}
                className="px-4 py-2 rounded-lg bg-[#32845A] hover:bg-[#276746] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all"
              >
                {evaluatingCode ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Evaluating Runtime...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Run & Verify Complexity</span>
                  </>
                )}
              </button>
            </div>

            {/* Evaluation Result */}
            {codeResult && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  codeResult.verdict === 'Accepted'
                    ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/30 border-[#A7F3D0] dark:border-[#065F46]'
                    : 'bg-[#FFFBEB] dark:bg-[#78350F]/30 border-[#FDE68A] dark:border-[#78350F]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {codeResult.verdict === 'Accepted' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#D97706]" />
                    )}
                    <span className="font-bold text-[#1F2937] dark:text-white">
                      {codeResult.verdict}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-[#111827] font-mono text-[10px] font-bold text-[#2563EB]">
                      Time: {codeResult.timeComplexity}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white dark:bg-[#111827] font-mono text-[10px] font-bold text-[#7C3AED]">
                      Space: {codeResult.spaceComplexity}
                    </span>
                  </div>
                </div>

                <p className="text-[#374151] dark:text-gray-200">{codeResult.feedback}</p>

                {codeResult.suggestions && codeResult.suggestions.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/10 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                      Optimization Suggestions:
                    </span>
                    {codeResult.suggestions.map((s: string, idx: number) => (
                      <div key={idx} className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB] flex items-center space-x-1">
                        <span>•</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PLACEMENT ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white mb-3 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>B.Tech Semester-Wise Placement Roadmap</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleLoadRoadmap}
                disabled={roadmapLoading}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#315B85] dark:bg-[#2563EB] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm"
              >
                {roadmapLoading ? (
                  <span>Loading Plan...</span>
                ) : (
                  <>
                    <Target className="w-3.5 h-3.5" />
                    <span>Refresh Semester Roadmap</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {roadmapResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roadmapResult.semesters && roadmapResult.semesters.map((sem: any, sIdx: number) => (
                  <div
                    key={sIdx}
                    className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center text-xs font-bold">
                          {sIdx + 1}
                        </span>
                        <span className="text-[10px] font-semibold text-[#687386]">
                          {sem.term}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#202938] dark:text-white mb-2">
                        {sem.focus}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#4B5563] dark:text-[#D1D5DB]">
                        {sem.topics && sem.topics.map((t: string, tIdx: number) => (
                          <li key={tIdx} className="flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#32845A] shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
