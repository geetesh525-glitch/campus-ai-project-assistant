import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Calendar,
  CheckCircle2,
  Code,
  ArrowRight,
  Database,
  Cpu,
  Shield,
  Clock,
  Copy,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { api } from '../services/api';
import type {
  ProjectArchitectureResponse,
  ProjectRoadmapResponse
} from '../types';

export const ProjectAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ideas' | 'architecture' | 'roadmap'>('ideas');

  // Idea Generator State
  const [domain, setDomain] = useState<string>('AI & Machine Learning');
  const [level, setLevel] = useState<string>('Advanced');
  const [ideasLoading, setIdeasLoading] = useState<boolean>(false);
  const [ideasList, setIdeasList] = useState<any[]>([]);

  // Architecture State
  const [archTitle, setArchTitle] = useState<string>('Smart Academic Portal with Multi-Agent Orchestration');
  const [archDomain, setArchDomain] = useState<string>('Full-Stack Web & AI');
  const [archTech, setArchTech] = useState<string>('React, FastAPI, PostgreSQL, ChromaDB, PyMuPDF, TailwindCSS');
  const [archLoading, setArchLoading] = useState<boolean>(false);
  const [archResult, setArchResult] = useState<ProjectArchitectureResponse | null>(null);

  // Roadmap State
  const [roadTitle, setRoadTitle] = useState<string>('Smart Academic Portal with Multi-Agent Orchestration');
  const [roadWeeks, setRoadWeeks] = useState<number>(12);
  const [roadLoading, setRoadLoading] = useState<boolean>(false);
  const [roadResult, setRoadResult] = useState<ProjectRoadmapResponse | null>(null);

  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Initialize sample project idea if view=project
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('view=project')) {
      setIdeasList([
        {
          title: 'Campus AI – Intelligent Academic & Multi-Agent Project Assistant',
          tagline: 'Centralized AI-driven academic assistant with RAG document retrieval & CrewAI autonomous workflows',
          noveltyFactor: 'High Impact • 9.2/10',
          problemStatement: 'Students struggle with fragmented academic tools, inefficient syllabus research, and lack of guided project planning across semesters.',
          proposedSolution: 'A unified single-platform assistant providing bilingual smart chat, PyMuPDF RAG analysis, automated milestone scheduling, and DOCX/PPTX report building.',
          suggestedTechStack: {
            Frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite'],
            Backend: ['Python', 'FastAPI', 'Uvicorn', 'SQLite'],
            AI: ['Google Gemini API', 'CrewAI', 'PyMuPDF RAG']
          },
          keyFeatures: [
            '5-Agent CrewAI Workspace for automated task decomposition',
            'Retrieval-Augmented Generation (RAG) over PDF lecture notes',
            'Voice Assistant with real-time Speech-to-Text and Text-to-Speech',
            'Career ATS resume scanner and interactive DSA sandbox'
          ]
        }
      ]);
    }
  }, []);

  // Handlers
  const handleGenerateIdeas = async () => {
    setIdeasLoading(true);
    try {
      const res = await api.generateProjectIdeas({
        domain,
        academicYear: 'BTech Final Year',
        complexityLevel: level
      });
      if (Array.isArray(res)) {
        setIdeasList(res);
      }
    } catch (err) {
      console.error('Error generating project ideas:', err);
    } finally {
      setIdeasLoading(false);
    }
  };

  const handleBuildArchitecture = async () => {
    setArchLoading(true);
    try {
      const res = await api.buildProjectArchitecture({
        projectTitle: archTitle,
        domain: archDomain,
        techStack: archTech.split(',').map((t) => t.trim()).filter(Boolean)
      });
      if (res) {
        setArchResult(res);
      }
    } catch (err) {
      console.error('Error building architecture:', err);
    } finally {
      setArchLoading(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    setRoadLoading(true);
    try {
      const res = await api.generateProjectRoadmap({
        projectTitle: roadTitle,
        durationWeeks: roadWeeks
      });
      if (res) {
        setRoadResult(res);
      }
    } catch (err) {
      console.error('Error generating roadmap:', err);
    } finally {
      setRoadLoading(false);
    }
  };

  const transferIdeaToStudio = (idea: any) => {
    setArchTitle(idea.title);
    if (idea.suggestedTechStack) {
      const allTech = Object.values(idea.suggestedTechStack).flat().join(', ');
      setArchTech(allTech);
    }
    setRoadTitle(idea.title);
    setActiveTab('architecture');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#315B85] to-[#4338CA] dark:from-[#1E293B] dark:to-[#312E81] rounded-xl p-6 text-white shadow-sm border border-[#CBD5E1]/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-semibold uppercase tracking-wider">
                B.Tech Capstone & Major Project Suite
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">AI Project Assistant & System Architect</h1>
            <p className="text-xs text-blue-100 dark:text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Design production-grade engineering projects. Brainstorm novel ideas, generate end-to-end layered system architecture with Mermaid diagrams, and establish 12-week development roadmaps.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'ideas'
                  ? 'bg-white text-[#315B85] shadow'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              1. Idea Generator
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'architecture'
                  ? 'bg-white text-[#315B85] shadow'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              2. System Architecture
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-white text-[#315B85] shadow'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              3. 12-Week Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: IDEA GENERATOR */}
      {activeTab === 'ideas' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Form */}
          <div className="lg:col-span-1 bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-[#C18A36]" />
              <span>Project Parameters</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                Engineering Domain
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white focus:ring-2 focus:ring-[#315B85]"
              >
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Cloud & DevOps">Cloud & DevOps Infrastructure</option>
                <option value="IoT & Embedded Systems">IoT & Embedded Systems</option>
                <option value="Cybersecurity">Cybersecurity & Zero Trust</option>
                <option value="Full-Stack Web3">Full-Stack Web3 & Distributed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                Complexity Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white focus:ring-2 focus:ring-[#315B85]"
              >
                <option value="Advanced">Advanced (Final Year B.Tech Capstone)</option>
                <option value="Intermediate">Intermediate (3rd Year Mini Project)</option>
                <option value="Prototype">Prototype (Hackathon MVP)</option>
              </select>
            </div>

            <button
              onClick={handleGenerateIdeas}
              disabled={ideasLoading}
              className="w-full py-2.5 rounded-lg bg-[#315B85] hover:bg-[#27496B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all"
            >
              {ideasLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Synthesizing Ideas...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Capstone Ideas</span>
                </>
              )}
            </button>
          </div>

          {/* Right Ideas List */}
          <div className="lg:col-span-2 space-y-4">
            {ideasList.length === 0 && !ideasLoading ? (
              <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-10 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-[#202938] dark:text-white">
                  No Project Ideas Generated Yet
                </h4>
                <p className="text-xs text-[#687386] dark:text-[#9CA3AF] max-w-md mx-auto mt-1">
                  Select your engineering domain and click "Generate Capstone Ideas" to receive high-impact project concepts with tech stacks and novelty scores.
                </p>
                <button
                  onClick={handleGenerateIdeas}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#315B85] dark:bg-[#2563EB] text-white text-xs font-medium hover:opacity-90"
                >
                  Generate Sample AI Projects
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {ideasList.map((idea, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm hover:border-[#315B85] dark:hover:border-[#6366F1] transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA]">
                            Idea #{index + 1}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ECFDF5] dark:bg-[#064E3B] text-[#059669] dark:text-[#34D399]">
                            {idea.noveltyFactor || 'High Impact'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#202938] dark:text-white">
                          {idea.title}
                        </h4>
                        <p className="text-xs text-[#687386] dark:text-[#9CA3AF] mt-0.5">
                          {idea.tagline}
                        </p>
                      </div>

                      <button
                        onClick={() => transferIdeaToStudio(idea)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#315B85] dark:bg-[#2563EB] text-white hover:bg-[#27496B] dark:hover:bg-[#1D4ED8] flex items-center space-x-1 shrink-0 shadow-sm transition-all"
                        title="Transfer this idea to Architecture Designer"
                      >
                        <span>Architect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-[#F7F8FA] dark:bg-[#161F30] border border-[#E5E9EF] dark:border-[#334155]/50">
                        <span className="font-semibold text-[#C45454] dark:text-[#F87171] block mb-1">
                          Problem Statement
                        </span>
                        <p className="text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                          {idea.problemStatement}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F7F8FA] dark:bg-[#161F30] border border-[#E5E9EF] dark:border-[#334155]/50">
                        <span className="font-semibold text-[#32845A] dark:text-[#34D399] block mb-1">
                          Proposed Solution
                        </span>
                        <p className="text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                          {idea.proposedSolution}
                        </p>
                      </div>
                    </div>

                    {idea.suggestedTechStack && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-medium text-[#687386] dark:text-[#9CA3AF] mr-1">
                          Tech Stack:
                        </span>
                        {Object.entries(idea.suggestedTechStack).map(([category, items]: [string, any]) => (
                          <span
                            key={category}
                            className="px-2 py-0.5 rounded text-[11px] bg-[#EEF2F6] dark:bg-[#1E293B] text-[#315B85] dark:text-[#93C5FD] font-mono border border-[#CBD5E1]/50 dark:border-[#334155]"
                          >
                            {category}: {Array.isArray(items) ? items.join(', ') : String(items)}
                          </span>
                        ))}
                      </div>
                    )}

                    {idea.keyFeatures && (
                      <div className="mt-2.5 pt-2 border-t border-[#E5E9EF] dark:border-[#1F2937] flex flex-wrap gap-2 text-[11px] text-[#687386] dark:text-[#9CA3AF]">
                        <span className="font-medium text-[#202938] dark:text-gray-300">Key Features:</span>
                        {idea.keyFeatures.map((m: string, mIdx: number) => (
                          <span key={mIdx} className="flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3 text-[#32845A]" />
                            <span>{m}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SYSTEM ARCHITECTURE DESIGNER */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white mb-3 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>Project Architecture Specifications</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={archTitle}
                  onChange={(e) => setArchTitle(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                  Domain / Category
                </label>
                <input
                  type="text"
                  value={archDomain}
                  onChange={(e) => setArchDomain(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                  Technology Stack
                </label>
                <input
                  type="text"
                  value={archTech}
                  onChange={(e) => setArchTech(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white font-medium"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleBuildArchitecture}
                disabled={archLoading}
                className="px-5 py-2.5 rounded-lg bg-[#315B85] hover:bg-[#27496B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center space-x-2 shadow-sm transition-all"
              >
                {archLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Synthesizing Architecture...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Generate Multi-Tier Architecture & Diagram</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Architecture Result Output */}
          {archResult && (
            <div className="space-y-6">
              {/* Architecture Overview */}
              <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
                <h4 className="text-sm font-bold text-[#202938] dark:text-white mb-2">
                  System Architecture Overview: {archResult.projectTitle}
                </h4>
                <p className="text-xs text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                  Pattern: <span className="font-semibold text-[#315B85] dark:text-[#60A5FA]">{archResult.architecturalPattern}</span>
                </p>
              </div>

              {/* Layer Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {archResult.layers.map((layer: any, lIdx: number) => (
                  <div
                    key={lIdx}
                    className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-4 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center mb-2">
                        {lIdx === 0 && <Code className="w-4 h-4" />}
                        {lIdx === 1 && <Cpu className="w-4 h-4" />}
                        {lIdx === 2 && <Database className="w-4 h-4" />}
                        {lIdx >= 3 && <Shield className="w-4 h-4" />}
                      </div>
                      <h5 className="text-xs font-bold text-[#202938] dark:text-white">
                        {layer.layerName || layer.name}
                      </h5>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E5E9EF] dark:border-[#1F2937]">
                      <div className="text-[10px] font-semibold text-[#687386] dark:text-[#9CA3AF] mb-1">
                        Components:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {layer.components && layer.components.map((c: string, cIdx: number) => (
                          <span
                            key={cIdx}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-[#F1F5F9] dark:bg-[#1E293B] text-[#315B85] dark:text-[#93C5FD] font-mono border border-[#CBD5E1]/50 dark:border-[#334155]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Flow & Security Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Data Flow */}
                <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
                  <h5 className="text-xs font-bold text-[#202938] dark:text-white mb-3 flex items-center space-x-1.5">
                    <ArrowRight className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
                    <span>Data Flow & Request Lifecycle</span>
                  </h5>
                  <div className="space-y-2 text-xs">
                    {archResult.dataFlowSteps && archResult.dataFlowSteps.map((step: string, sIdx: number) => (
                      <div key={sIdx} className="flex items-start space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <p className="text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security & Scalability */}
                <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
                  <h5 className="text-xs font-bold text-[#202938] dark:text-white mb-3 flex items-center space-x-1.5">
                    <Shield className="w-4 h-4 text-[#32845A]" />
                    <span>Security, Auth & Scalability Architecture</span>
                  </h5>
                  <div className="space-y-2 text-xs">
                    {archResult.securityAndScaling && archResult.securityAndScaling.map((sec: string, secIdx: number) => (
                      <div key={secIdx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#32845A] shrink-0 mt-0.5" />
                        <p className="text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
                          {sec}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mermaid Diagram Code */}
              {archResult.mermaidDiagram && (
                <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
                      <h5 className="text-xs font-bold text-[#202938] dark:text-white">
                        Mermaid.js Architectural Diagram
                      </h5>
                    </div>
                    <button
                      onClick={() => copyToClipboard(archResult.mermaidDiagram)}
                      className="px-2.5 py-1 rounded text-xs font-medium bg-[#F1F5F9] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] flex items-center space-x-1"
                    >
                      {copiedCode ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#32845A]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Mermaid Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 rounded-lg bg-[#0F172A] text-[#38BDF8] font-mono text-xs overflow-x-auto leading-relaxed">
                    {archResult.mermaidDiagram}
                  </pre>
                  <p className="text-[10px] text-[#687386] dark:text-[#9CA3AF] mt-2">
                    Tip: You can paste this code directly into your GitHub Markdown README.md or Notion report to render the interactive system architecture diagram.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: 12-WEEK ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#202938] dark:text-white mb-3 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#315B85] dark:text-[#60A5FA]" />
              <span>B.Tech Project Development Roadmap</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={roadTitle}
                  onChange={(e) => setRoadTitle(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-medium text-[#687386] dark:text-[#9CA3AF] mb-1">
                  Semester Duration (Weeks)
                </label>
                <select
                  value={roadWeeks}
                  onChange={(e) => setRoadWeeks(Number(e.target.value))}
                  className="w-full p-2 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white font-medium"
                >
                  <option value={8}>8 Weeks (Accelerated Mini Project)</option>
                  <option value={12}>12 Weeks (Standard Semester Capstone)</option>
                  <option value={16}>16 Weeks (Full Year Major Project Phase 1)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerateRoadmap}
                disabled={roadLoading}
                className="px-5 py-2.5 rounded-lg bg-[#315B85] hover:bg-[#27496B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center space-x-2 shadow-sm transition-all"
              >
                {roadLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Structuring Milestones...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Generate 12-Week Sprint Schedule</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Roadmap Result */}
          {roadResult && (
            <div className="space-y-6">
              {/* Phases */}
              <div className="space-y-4">
                {roadResult.phases && roadResult.phases.map((phase: any, pIdx: number) => (
                  <div
                    key={pIdx}
                    className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-[#315B85] dark:bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold">
                          {pIdx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-[#202938] dark:text-white">
                          Phase {phase.phaseNumber || (pIdx + 1)}: {phase.title}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA]">
                        {phase.timeframe || 'Weeks 1-4'}
                      </span>
                    </div>

                    <div className="text-xs mt-3">
                      <div className="font-semibold text-[#32845A] dark:text-[#34D399] mb-1">
                        Key Deliverables / Viva Artifacts:
                      </div>
                      <ul className="space-y-1">
                        {phase.deliverables && phase.deliverables.map((d: string, dIdx: number) => (
                          <li key={dIdx} className="flex items-start space-x-1.5 text-[#4B5563] dark:text-[#D1D5DB]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#32845A] shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Milestones & Evaluation Criteria */}
              {roadResult.milestones && (
                <div className="bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl p-5 shadow-sm">
                  <h4 className="text-xs font-bold text-[#202938] dark:text-white mb-3 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#32845A]" />
                    <span>Final Capstone Submission & Viva Voce Checklist</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {roadResult.milestones.map((item: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 p-2.5 rounded-lg bg-[#F7F8FA] dark:bg-[#161F30] border border-[#E5E9EF] dark:border-[#334155]/60"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#32845A] shrink-0" />
                        <span className="text-[#374151] dark:text-gray-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
