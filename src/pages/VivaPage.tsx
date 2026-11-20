import React, { useState, useEffect } from 'react';
import {
  Award,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { campusApi } from '../services/api';
import { VivaQuestion, VivaEvaluation } from '../types';

export const VivaPage: React.FC = () => {
  const [subject, setSubject] = useState('Database Systems');
  const [topic, setTopic] = useState('Normalization, Boyce-Codd Normal Form, and Lossless Joins');
  const [questionCount, setQuestionCount] = useState(5);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [availableDocs, setAvailableDocs] = useState<any[]>([]);

  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<VivaQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<VivaQuestion | null>(null);

  // Mock Viva interaction
  const [studentAnswer, setStudentAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<VivaEvaluation | null>(null);

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

  const handleGenerateQuestions = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setEvaluation(null);
    setStudentAnswer('');

    try {
      const res = await campusApi.generateVivaQuestions({
        subject,
        topic,
        count: questionCount,
        documentId: selectedDocId || undefined,
      });

      setQuestions(res);
      if (res.length > 0) {
        setSelectedQuestion(res[0]);
      }
    } catch (e) {
      console.error('Viva generation error:', e);
    } finally {
      setGenerating(false);
    }
  };

  const handleEvaluateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestion || !studentAnswer.trim()) return;
    setEvaluating(true);

    try {
      const res = await campusApi.evaluateVivaAnswer({
        questionId: selectedQuestion.id,
        question: selectedQuestion.question,
        modelAnswer: selectedQuestion.modelAnswer,
        studentAnswer: studentAnswer.trim(),
      });

      setEvaluation(res);
    } catch (e) {
      console.error('Evaluation error:', e);
    } finally {
      setEvaluating(false);
    }
  };

  const getDifficultyBadge = (level: string) => {
    switch (level) {
      case 'Easy':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] text-[#32845A]">Easy</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF7EC] text-[#C18A36]">Medium</span>;
      case 'Hard':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FBEAE9] text-[#C45454]">Hard</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Config */}
      <div className="academic-card p-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#315B85] mb-1">
          <Award className="w-4 h-4" />
          <span>ORAL DEFENSE (VIVA VOCE) EXAMINATION TUTOR</span>
        </div>
        <h2 className="text-base font-semibold text-[#202938]">Viva Voce Preparation & Mock Assessment</h2>
        <p className="text-xs text-[#687386] mt-0.5">
          Generate tiered oral exam questions based on your course material and practice with instant examiner feedback and scoring.
        </p>

        <div className="mt-4 pt-4 border-t border-[#E5E9EF] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-medium text-[#202938] mb-1">Subject / Discipline</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="academic-input w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium text-[#202938] mb-1">Topic / Exam Syllabus Area</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="academic-input w-full"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[#687386]">Reference PDF:</span>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="academic-input py-1 text-xs"
            >
              <option value="">No PDF (Domain Theory)</option>
              {availableDocs.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.fileName}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerateQuestions}
            disabled={generating || !topic.trim()}
            className="academic-btn-primary text-xs flex items-center space-x-1.5 py-2 px-4 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{generating ? 'Formulating Questions...' : 'Generate Viva Question Set'}</span>
          </button>
        </div>
      </div>

      {/* Questions & Interactive Mock Session */}
      {questions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Column 1: Questions List */}
          <div className="academic-card p-4 lg:col-span-1 space-y-2 text-xs">
            <h3 className="font-semibold text-[#202938] pb-2 border-b border-[#E5E9EF]">
              Viva Question Bank ({questions.length})
            </h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setEvaluation(null);
                    setStudentAnswer('');
                  }}
                  className={`p-3 rounded border cursor-pointer transition-colors ${
                    selectedQuestion?.id === q.id
                      ? 'bg-[#EAF1F8] border-[#315B85] text-[#315B85]'
                      : 'bg-white border-[#E5E9EF] text-[#202938] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#687386]">Q#{idx + 1}</span>
                    {getDifficultyBadge(q.difficulty)}
                  </div>
                  <p className="text-xs font-medium line-clamp-2">{q.question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Mock Viva Simulator */}
          <div className="lg:col-span-2 space-y-4">
            {selectedQuestion && (
              <div className="academic-card p-5 space-y-4 text-xs">
                {/* Active Question Banner */}
                <div className="p-4 bg-[#F7F8FA] rounded border border-[#E5E9EF] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#315B85] text-xs">Examiner Question:</span>
                    {getDifficultyBadge(selectedQuestion.difficulty)}
                  </div>
                  <h3 className="text-sm font-semibold text-[#202938] leading-snug">
                    "{selectedQuestion.question}"
                  </h3>
                  <p className="text-[11px] text-[#687386] italic">
                    Focus: {selectedQuestion.explanation}
                  </p>
                </div>

                {/* Model Answer Toggle/Preview */}
                <details className="p-3 bg-white rounded border border-[#E5E9EF]">
                  <summary className="font-semibold text-[#315B85] cursor-pointer hover:underline text-xs">
                    Reveal Model Examiner Answer
                  </summary>
                  <p className="mt-2 text-[#202938] leading-relaxed pt-2 border-t border-[#E5E9EF]">
                    {selectedQuestion.modelAnswer}
                  </p>
                </details>

                {/* Student Answer Input Form */}
                <form onSubmit={handleEvaluateAnswer} className="space-y-3">
                  <div>
                    <label className="block font-medium text-[#202938] mb-1">
                      Your Oral Response (Type your answer as if speaking to the panel):
                    </label>
                    <textarea
                      rows={4}
                      value={studentAnswer}
                      onChange={(e) => setStudentAnswer(e.target.value)}
                      placeholder="e.g. In Boyce-Codd Normal Form, every determinant is strictly a superkey..."
                      className="academic-input w-full"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={evaluating || !studentAnswer.trim()}
                      className="academic-btn-primary text-xs flex items-center space-x-1.5 py-2 px-4 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{evaluating ? 'Examiner Evaluating...' : 'Submit to Viva Board'}</span>
                    </button>
                  </div>
                </form>

                {/* Evaluation Feedback Report */}
                {evaluation && (
                  <div className="p-4 bg-white rounded border-2 border-[#315B85] space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E5E9EF]">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-[#315B85]" />
                        <span className="font-semibold text-[#202938] text-sm">Examiner Assessment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-[#315B85]">{evaluation.score} / 100</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          evaluation.accuracyGrade === 'Excellent'
                            ? 'bg-[#E8F5E9] text-[#32845A]'
                            : evaluation.accuracyGrade === 'Good'
                            ? 'bg-[#EAF1F8] text-[#315B85]'
                            : 'bg-[#FBEAE9] text-[#C45454]'
                        }`}>
                          {evaluation.accuracyGrade}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#202938] mb-1">Examiner Feedback:</h4>
                      <p className="text-[#687386] leading-relaxed">{evaluation.feedback}</p>
                    </div>

                    {evaluation.suggestions?.length > 0 && (
                      <div className="pt-2 border-t border-[#E5E9EF]">
                        <h4 className="font-semibold text-[#202938] mb-1">Key Recommendations for Viva Day:</h4>
                        <ul className="list-disc list-inside space-y-1 text-[#687386]">
                          {evaluation.suggestions.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
