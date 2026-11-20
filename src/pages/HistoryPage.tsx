import React, { useState, useEffect } from 'react';
import {
  History,
  Layers,
  FileCheck,
  Download,
  Bot,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { campusApi } from '../services/api';

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await campusApi.getExecutionHistory();
      setHistory(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="academic-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#315B85] mb-1">
              <History className="w-4 h-4" />
              <span>PROJECT AUDIT TRAIL & ARTIFACT LOGS</span>
            </div>
            <h2 className="text-base font-semibold text-[#202938]">Academic Execution History</h2>
            <p className="text-xs text-[#687386] mt-0.5">
              Review previous multi-agent tasks, inspect step-by-step reasoning logs, and re-download generated assignment and presentation files.
            </p>
          </div>

          <button
            onClick={loadHistory}
            className="academic-btn-secondary text-xs flex items-center space-x-1 py-1.5 px-3"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="academic-card p-12 text-center text-xs text-[#687386]">
          <Layers className="w-10 h-10 text-[#CBD5E1] mx-auto mb-2" />
          <h3 className="font-semibold text-[#202938]">No Execution History Found</h3>
          <p className="mt-1">Tasks submitted in the AI Workspace or modules will be logged here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="academic-card p-5 text-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#E5E9EF] gap-2">
                <div>
                  <h3 className="font-semibold text-sm text-[#202938]">{item.taskName}</h3>
                  <div className="text-[11px] text-[#687386] mt-0.5">
                    Assigned: <span className="font-medium text-[#315B85]">{item.agentAssigned}</span> • Started: {item.startedAt}
                  </div>
                </div>

                <span className="self-start sm:self-auto px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#E8F5E9] text-[#32845A] border border-[#C8E6C9]">
                  {item.status}
                </span>
              </div>

              {/* Agent Logs */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-semibold uppercase text-[#687386] tracking-wider">
                  Participating Agent Breakdown
                </div>
                {item.logs?.map((log: any, idx: number) => (
                  <div key={idx} className="p-3 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#315B85]">{log.agentName}</span>
                      <span className="text-[10px] text-[#687386]">{log.createdAt}</span>
                    </div>
                    <div className="text-[11px] text-[#202938] font-medium">{log.stepName}</div>
                    {log.thought && (
                      <div className="text-[11px] text-[#687386] italic">Thought: "{log.thought}"</div>
                    )}
                    {log.output && (
                      <div className="text-[11px] text-[#202938] whitespace-pre-wrap mt-1">
                        {log.output}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
