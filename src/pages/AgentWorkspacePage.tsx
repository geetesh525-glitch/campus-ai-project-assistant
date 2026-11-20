import React, { useState, useEffect } from 'react';
import {
  Bot,
  Play,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Download,
  Sparkles,
  Search,
  BookOpen,
  Presentation,
  Award,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { campusApi } from '../services/api';
import { AgentInfo, AgentStatus } from '../types';

export const AgentWorkspacePage: React.FC = () => {
  const [taskPrompt, setTaskPrompt] = useState(
    'Explain normalization, prepare assignment answers, create a 10-slide presentation, and generate viva questions.'
  );
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [enableWebSearch, setEnableWebSearch] = useState<boolean>(false);
  const [availableDocs, setAvailableDocs] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [agents, setAgents] = useState<AgentInfo[]>([
    {
      id: 'planner',
      name: 'Planning Agent',
      role: 'Academic Project Manager',
      description: 'Understands student requirements, breaks requests into sub-tasks, and coordinates the execution plan.',
      currentTask: 'Idle / Awaiting student request',
      status: 'Waiting',
      progress: 0,
    },
    {
      id: 'researcher',
      name: 'Research Agent',
      role: 'Academic Research Specialist',
      description: 'Queries PDF chunks using RAG, extracts key facts, and gathers verified citations.',
      currentTask: 'Idle / Awaiting document dispatch',
      status: 'Waiting',
      progress: 0,
    },
    {
      id: 'writer',
      name: 'Content Creation Agent',
      role: 'Academic Content Writer',
      description: 'Drafts academic answers, assignment explanations, and presentation slide structures.',
      currentTask: 'Idle / Awaiting research input',
      status: 'Waiting',
      progress: 0,
    },
    {
      id: 'factchecker',
      name: 'Fact-Checking Agent',
      role: 'Academic Quality Reviewer',
      description: 'Cross-checks drafts against source text, flags unverified claims, and verifies citation fidelity.',
      currentTask: 'Idle / Awaiting draft submission',
      status: 'Waiting',
      progress: 0,
    },
    {
      id: 'viva',
      name: 'Viva Preparation Agent',
      role: 'Academic Tutor',
      description: 'Constructs tiered oral exam questions and establishes grading criteria for defense preparation.',
      currentTask: 'Idle / Awaiting topic finalization',
      status: 'Waiting',
      progress: 0,
    },
  ]);

  const [generatedFiles, setGeneratedFiles] = useState<any[]>([]);
  const [finalResult, setFinalResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadDocs();
    loadHistory();
  }, []);

  const loadDocs = async () => {
    try {
      const docs = await campusApi.listPdfs();
      setAvailableDocs(docs);
      if (docs.length > 0) {
        setSelectedDocId(docs[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadHistory = async () => {
    try {
      const hist = await campusApi.getExecutionHistory();
      setHistory(hist);
    } catch (e) {
      console.error(e);
    }
  };

  const runCollaboration = async () => {
    if (!taskPrompt.trim()) return;
    setIsExecuting(true);

    // Update statuses to working
    setAgents((prev) =>
      prev.map((a, i) => ({
        ...a,
        status: i === 0 ? 'Working' : 'Waiting',
        currentTask: i === 0 ? 'Deconstructing requirements...' : 'Waiting for preceding agent',
        progress: i === 0 ? 30 : 0,
      }))
    );

    try {
      const response = await campusApi.executeAgents({
        taskDescription: taskPrompt,
        documentId: selectedDocId || undefined,
        enableWebSearch,
      });

      // Map backend agent statuses
      setAgents((prev) =>
        prev.map((agent) => {
          const match = response.agentsStatus.find((s: any) => s.agentName === agent.name);
          if (match) {
            return {
              ...agent,
              status: match.status as AgentStatus,
              currentTask: match.currentTask,
              progress: 100,
              outputSummary: match.outputSummary,
            };
          }
          return agent;
        })
      );

      setGeneratedFiles(response.generatedFiles || []);
      setFinalResult(response.finalResult);
      await loadHistory();
    } catch (err: any) {
      console.error('Agent execution error:', err);
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          status: 'Failed',
          currentTask: 'Execution interrupted: ' + (err.response?.data?.detail || err.message),
        }))
      );
    } finally {
      setIsExecuting(false);
    }
  };

  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'Working':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF1F8] text-[#315B85] border border-[#CBD5E1]">
            <Clock className="w-3 h-3 animate-spin" />
            <span>Working</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F5E9] text-[#32845A] border border-[#C8E6C9]">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FBEAE9] text-[#C45454] border border-[#FFCDD2]">
            <AlertCircle className="w-3 h-3" />
            <span>Failed</span>
          </span>
        );
      case 'Needs Review':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FEF7EC] text-[#C18A36] border border-[#FFE0B2]">
            <AlertCircle className="w-3 h-3" />
            <span>Needs Review</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#F7F8FA] text-[#687386] border border-[#E5E9EF]">
            <span>Waiting</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Description */}
      <div className="academic-card p-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#315B85] mb-1">
          <Bot className="w-4 h-4" />
          <span>CREWAI MULTI-AGENT COORDINATION WORKSPACE</span>
        </div>
        <h2 className="text-base font-semibold text-[#202938]">Academic Multi-Agent Team</h2>
        <p className="text-xs text-[#687386] mt-1 max-w-3xl">
          Submit any complex multi-step academic request. Five specialized CrewAI agents collaborate sequentially to deconstruct your instructions, analyze PDF materials, generate assignments, create presentations, verify citations, and prepare viva questions.
        </p>

        {/* Task Form */}
        <div className="mt-4 pt-4 border-t border-[#E5E9EF] space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#202938] mb-1">
              Student Request / Instructions
            </label>
            <textarea
              rows={3}
              value={taskPrompt}
              onChange={(e) => setTaskPrompt(e.target.value)}
              className="academic-input w-full"
              placeholder="e.g. Explain normalization, prepare assignment answers, create a 10-slide presentation, and generate viva questions."
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-[#687386]" />
                <span className="text-[#687386]">Reference PDF:</span>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="academic-input py-1 text-xs"
                >
                  <option value="">None (Use Pure Academic Synthesis)</option>
                  {availableDocs.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.fileName} ({doc.pageCount} pages)
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center space-x-1.5 cursor-pointer text-[#687386]">
                <input
                  type="checkbox"
                  checked={enableWebSearch}
                  onChange={(e) => setEnableWebSearch(e.target.checked)}
                  className="rounded border-[#CBD5E1] text-[#315B85] focus:ring-0"
                />
                <span>Web literature search</span>
              </label>
            </div>

            <button
              onClick={runCollaboration}
              disabled={isExecuting || !taskPrompt.trim()}
              className="academic-btn-primary text-xs flex items-center justify-center space-x-1.5 py-2 px-4 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isExecuting ? 'Agents Working...' : 'Execute Multi-Agent Task'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Specialized Agent Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#687386]">
            Active Agents in Execution Pipeline
          </h3>
          <span className="text-xs text-[#687386]">5 Specialized Roles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, idx) => (
            <div key={agent.id} className="academic-card p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-semibold text-[#315B85] uppercase tracking-wider">
                      Agent {idx + 1}
                    </span>
                    <h4 className="text-xs font-semibold text-[#202938]">{agent.name}</h4>
                    <p className="text-[11px] text-[#687386] font-medium">{agent.role}</p>
                  </div>
                  {getStatusBadge(agent.status)}
                </div>

                <p className="text-[11px] text-[#687386] mt-2 mb-3 leading-relaxed">
                  {agent.description}
                </p>

                <div className="p-2.5 bg-[#F7F8FA] rounded border border-[#E5E9EF] mb-3">
                  <div className="text-[10px] uppercase font-semibold text-[#687386] mb-1">
                    Current Task & Output
                  </div>
                  <div className="text-xs text-[#202938] font-medium line-clamp-3">
                    {agent.outputSummary ? agent.outputSummary : agent.currentTask}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] text-[#687386] mb-1">
                  <span>Progress</span>
                  <span>{agent.progress}%</span>
                </div>
                <div className="w-full bg-[#E5E9EF] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#315B85] h-1.5 transition-all duration-300"
                    style={{ width: `${agent.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Outputs & Downloads */}
      {generatedFiles.length > 0 && (
        <div className="academic-card p-5 border-l-4 border-l-[#32845A]">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#32845A] mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>TASK COMPLETED SUCCESSFULLY • GENERATED ARTIFACTS</span>
          </div>
          <h3 className="text-xs font-semibold text-[#202938] mb-2">
            Download Final Assignment & Presentation Files
          </h3>

          <div className="flex flex-wrap gap-3">
            {generatedFiles.map((f, i) => (
              <a
                key={i}
                href={f.downloadUrl}
                download
                className="academic-btn-secondary text-xs flex items-center space-x-2 py-2 px-3 border-[#CBD5E1]"
              >
                <Download className="w-3.5 h-3.5 text-[#315B85]" />
                <span className="font-semibold text-[#202938]">{f.fileName}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EAF1F8] text-[#315B85] font-bold uppercase">
                  {f.type}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Execution History Table */}
      <div className="academic-card p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9EF]">
          <h3 className="text-xs font-semibold text-[#202938] flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#315B85]" />
            <span>Execution Audit Trail & Inspection</span>
          </h3>
          <span className="text-[11px] text-[#687386]">Transparent agent steps</span>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-6 text-xs text-[#687386]">
            No previous execution logs recorded. Submit a task above to observe collaborative agent execution.
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF] text-xs">
                <div className="flex items-center justify-between font-semibold text-[#202938] mb-1.5">
                  <span className="truncate">{item.taskName}</span>
                  <span className="text-[11px] text-[#687386] font-normal">{item.startedAt}</span>
                </div>
                <div className="space-y-1.5 mt-2">
                  {item.logs?.map((l: any, idx: number) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px] text-[#687386]">
                      <span className="font-semibold text-[#315B85] shrink-0 w-36 truncate">{l.agentName}:</span>
                      <span className="text-[#202938]">{l.output || l.stepName}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
