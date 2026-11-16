import React, { useState, useEffect } from 'react';
import {
  Presentation,
  Download,
  Sparkles,
  Layers,
  MessageSquare,
  Clock,
  Users
} from 'lucide-react';
import { campusApi } from '../services/api';
import { SlideItem } from '../types';

export const PresentationPage: React.FC = () => {
  const [topic, setTopic] = useState('Relational Normalization: 1NF through BCNF & Systems Architecture');
  const [slideCount, setSlideCount] = useState(6);
  const [audience, setAudience] = useState('College Undergraduates');
  const [duration, setDuration] = useState(15);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [availableDocs, setAvailableDocs] = useState<any[]>([]);

  const [generating, setGenerating] = useState(false);
  const [deck, setDeck] = useState<any>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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

    try {
      const res = await campusApi.generatePresentation({
        topic,
        slideCount,
        audience,
        durationMinutes: duration,
        documentId: selectedDocId || undefined,
      });

      setDeck(res);
      setActiveSlideIndex(0);
    } catch (e) {
      console.error('Presentation error:', e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Config Card */}
      <div className="academic-card p-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#315B85] mb-1">
          <Presentation className="w-4 h-4" />
          <span>POWERPOINT (.PPTX) SLIDE DECK GENERATOR</span>
        </div>
        <h2 className="text-base font-semibold text-[#202938]">Academic Slide Deck Studio</h2>
        <p className="text-xs text-[#687386] mt-0.5">
          Generate clean university presentation decks complete with slide titles, structured bullet points, and speaker notes.
        </p>

        {/* Inputs */}
        <div className="mt-4 pt-4 border-t border-[#E5E9EF] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-3">
            <label className="block font-medium text-[#202938] mb-1">Presentation Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="academic-input w-full"
              placeholder="e.g. Distributed Consensus in Modern Computing"
            />
          </div>

          <div>
            <label className="block font-medium text-[#202938] mb-1">Target Slide Count</label>
            <select
              value={slideCount}
              onChange={(e) => setSlideCount(Number(e.target.value))}
              className="academic-input w-full"
            >
              <option value={4}>4 Slides (Lightning Talk)</option>
              <option value={6}>6 Slides (Standard Seminar)</option>
              <option value={8}>8 Slides (Detailed Lecture)</option>
              <option value={10}>10 Slides (Comprehensive Defense)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-[#202938] mb-1">Target Audience</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="academic-input w-full"
              placeholder="e.g. College Undergraduates"
            />
          </div>

          <div>
            <label className="block font-medium text-[#202938] mb-1">Duration (Minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="academic-input w-full"
            />
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
            <span>{generating ? 'Building Deck...' : 'Generate Slide Deck'}</span>
          </button>
        </div>
      </div>

      {/* Slide Deck Preview */}
      {deck && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-[#202938]">Deck Overview:</span>{' '}
              <span className="text-[#687386]">{deck.slideCount} Slides Generated</span>
            </div>

            {deck.pptxUrl && (
              <a
                href={deck.pptxUrl}
                download
                className="academic-btn-primary text-xs flex items-center space-x-1.5 py-1.5 px-3"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PowerPoint (.pptx)</span>
              </a>
            )}
          </div>

          {/* Slide Navigator & Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Slide List Sidebar */}
            <div className="space-y-2 lg:col-span-1 max-h-[460px] overflow-y-auto pr-1 text-xs">
              {deck.slides.map((s: SlideItem, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    activeSlideIndex === idx
                      ? 'bg-[#EAF1F8] border-[#315B85] text-[#315B85] font-semibold'
                      : 'bg-white border-[#E5E9EF] text-[#202938] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-[#687386] mb-0.5">
                    Slide {s.slideNumber}
                  </div>
                  <div className="truncate text-xs">{s.title}</div>
                </button>
              ))}
            </div>

            {/* Active Slide Canvas Preview */}
            <div className="lg:col-span-3 space-y-3">
              {/* 16:9 Presentation Canvas */}
              <div className="academic-card aspect-[16/9] p-8 flex flex-col justify-between border-2 border-[#CBD5E1] bg-white relative">
                <div>
                  <div className="text-xs font-bold text-[#687386] uppercase tracking-wider mb-2">
                    Slide {deck.slides[activeSlideIndex]?.slideNumber} of {deck.slides.length}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#315B85] mb-6">
                    {deck.slides[activeSlideIndex]?.title}
                  </h3>

                  <ul className="space-y-3 text-sm text-[#202938]">
                    {deck.slides[activeSlideIndex]?.bulletPoints?.map((bp: string, i: number) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#315B85] font-bold mt-0.5">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E5E9EF] flex items-center justify-between text-xs text-[#687386]">
                  <span>Campus AI Presentation Studio</span>
                  <span>Target Audience: {deck.audience}</span>
                </div>
              </div>

              {/* Speaker Notes */}
              <div className="academic-card p-4 text-xs bg-[#F7F8FA]">
                <div className="flex items-center space-x-1.5 font-semibold text-[#202938] mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#315B85]" />
                  <span>Speaker Notes for Presenter:</span>
                </div>
                <p className="text-[#687386] leading-relaxed italic">
                  "{deck.slides[activeSlideIndex]?.speakerNotes}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
