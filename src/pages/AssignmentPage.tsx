import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Download,
  Sparkles,
  FileCheck,
  Edit3,
  Check,
  AlertCircle
} from 'lucide-react';
import { campusApi } from '../services/api';

export const AssignmentPage: React.FC = () => {
  const [subject, setSubject] = useState('Database Management Systems');
  const [topic, setTopic] = useState('Functional Dependencies, Normalization & Boyce-Codd Normal Form');
  const [instructions, setInstructions] = useState('Provide clear step-by-step mathematical reasoning and anomaly examples.');
  const [answerLength, setAnswerLength] = useState('Medium');
  const [explanationStyle, setExplanationStyle] = useState('Detailed');
  const [selectedDocId, setSelectedDocId] = useState('');
  const [availableDocs, setAvailableDocs] = useState<any[]>([]);

  const [generating, setGenerating] = useState(false);
  const [assignmentResult, setAssignmentResult] = useState<any>(null);
  const [editableContent, setEditableContent] = useState('');
  const [savedEditNotice, setSavedEditNotice] = useState(false);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      const docs = await campusApi.listPdfs();
      setAvailableDocs(docs);
      if (docs.length > 0) setSelectedDocId(docs[0].id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setSavedEditNotice(false);

    try {
      const res = await campusApi.generateAssignment({
        subject,
        topic,
        instructions,
        answerLength,
        explanationStyle,
        documentId: selectedDocId || undefined,
      });

      setAssignmentResult(res);
      setEditableContent(res.content);
    } catch (e) {
      console.error('Assignment generation error:', e);
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveEdits = () => {
    setSavedEditNotice(true);
    setTimeout(() => setSavedEditNotice(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="academic-card p-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#315B85] mb-1">
          <BookOpen className="w-4 h-4" />
          <span>ASSIGNMENT DRAFTING & WORD (.DOCX) EXPORTER</span>
        </div>
        <h2 className="text-base font-semibold text-[#202938]">Academic Assignment Generator</h2>
        <p className="text-xs text-[#687386] mt-0.5">
          Generate structured, university-grade assignment answers with custom formatting, live editing, and immediate DOCX download.
        </p>

        {/* Form Inputs */}
        <div className="mt-4 pt-4 border-t border-[#E5E9EF] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-medium text-[#202938] mb-1">Course / Subject Name</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="academic-input w-full"
              placeholder="e.g. Database Management Systems"
            />
          </div>

          <div>
            <label className="block font-medium text-[#202938] mb-1">Assignment Topic / Question</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="academic-input w-full"
              placeholder="e.g. Normalization and BCNF"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium text-[#202938] mb-1">Assignment Instructions & Rubric</label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="academic-input w-full"
              placeholder="e.g. Include definition of 1NF, 2NF, 3NF and real-world database examples."
            />
          </div>

          <div>
            <label className="block font-medium text-[#202938] mb-1">Answer Length</label>
            <select
              value={answerLength}
              onChange={(e) => setAnswerLength(e.target.value)}
              className="academic-input w-full"
            >
              <option value="Short">Short (~500 Words)</option>
              <option value="Medium">Medium (~1000 Words)</option>
              <option value="Comprehensive">Comprehensive (~1800 Words)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-[#202938] mb-1">Explanation Style</label>
            <select
              value={explanationStyle}
              onChange={(e) => setExplanationStyle(e.target.value)}
              className="academic-input w-full"
            >
              <option value="Detailed">Detailed Academic Prose</option>
              <option value="Simple">Simple & Intuitive</option>
              <option value="Bullet Points">Structured Bullet Points</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E5E9EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[#687386]">Reference PDF:</span>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="academic-input py-1 text-xs"
            >
              <option value="">No PDF (Domain Knowledge)</option>
              {availableDocs.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.fileName}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || !topic.trim()}
            className="academic-btn-primary text-xs flex items-center space-x-1.5 py-2 px-4 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{generating ? 'Drafting Assignment...' : 'Generate Assignment Solution'}</span>
          </button>
        </div>
      </div>

      {/* Output & Editable Section */}
      {assignmentResult && (
        <div className="academic-card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E9EF]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#32845A]">
                Structured Draft Ready
              </span>
              <h3 className="text-sm font-semibold text-[#202938]">{assignmentResult.topic}</h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveEdits}
                className="academic-btn-secondary text-xs flex items-center space-x-1 py-1.5 px-3"
              >
                <Check className="w-3.5 h-3.5 text-[#32845A]" />
                <span>{savedEditNotice ? 'Saved!' : 'Save Edits'}</span>
              </button>

              {assignmentResult.docxUrl && (
                <a
                  href={assignmentResult.docxUrl}
                  download
                  className="academic-btn-primary text-xs flex items-center space-x-1.5 py-1.5 px-3 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .DOCX</span>
                </a>
              )}
            </div>
          </div>

          {/* Editable Live Textarea */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#687386] mb-1.5">
              <span className="flex items-center space-x-1">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editable Academic Text (Review and modify before submission):</span>
              </span>
            </div>
            <textarea
              rows={14}
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              className="academic-input w-full font-mono text-xs leading-relaxed"
            />
          </div>
        </div>
      )}
    </div>
  );
};
