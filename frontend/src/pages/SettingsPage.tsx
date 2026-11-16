import React, { useState, useEffect } from 'react';
import {
  Settings,
  Key,
  Shield,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Save,
  BookOpen,
  Database,
  Sun,
  Moon
} from 'lucide-react';
import { campusApi } from '../services/api';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [openAiKey, setOpenAiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [citationStyle, setCitationStyle] = useState('APA');
  const [tone, setTone] = useState('Academic');
  const [webSearch, setWebSearch] = useState(true);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await campusApi.getSettings();
      setHasKey(data.hasOpenAiApiKey);
      setCitationStyle(data.defaultCitationStyle || 'APA');
      setTone(data.explanationTone || 'Academic');
      setWebSearch(data.webResearchEnabled !== false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await campusApi.saveSettings({
        openAiApiKey: openAiKey || undefined,
        defaultCitationStyle: citationStyle,
        explanationTone: tone,
        webResearchEnabled: webSearch,
      });

      setSavedSuccess(true);
      if (openAiKey) setHasKey(true);
      setOpenAiKey('');
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleClearMemory = async () => {
    if (!window.confirm('Are you sure you want to clear all project files, documents, and execution history?')) {
      return;
    }

    setClearing(true);
    try {
      await campusApi.clearMemory();
      setClearSuccess(true);
      setTimeout(() => setClearSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="academic-card p-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#315B85] mb-1">
          <Settings className="w-4 h-4" />
          <span>STUDENT PREFERENCES & AI MEMORY CONTROLS</span>
        </div>
        <h2 className="text-base font-semibold text-[#202938]">Platform Settings & Privacy</h2>
        <p className="text-xs text-[#687386] mt-0.5">
          Configure API credentials, preferred citation styles, explanation depth, and manage your stored academic materials.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Interface Appearance & Theme Mode */}
        <div className="academic-card p-5 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E9EF] dark:border-[#1F2937]">
            <div className="flex items-center space-x-2">
              {isDark ? <Moon className="w-4 h-4 text-[#60A5FA]" /> : <Sun className="w-4 h-4 text-[#F59E0B]" />}
              <h3 className="font-semibold text-[#202938] dark:text-white">Interface Appearance & Theme Mode</h3>
            </div>
            <span className="text-[11px] font-bold uppercase text-[#315B85] dark:text-[#60A5FA]">
              Active: {theme.toUpperCase()}
            </span>
          </div>

          <p className="text-[#687386] dark:text-[#9CA3AF]">
            Select your preferred display theme for the Campus AI academic workspace. Dark mode reduces eye strain during night study sessions.
          </p>

          <div className="flex items-center space-x-3 pt-1">
            <button
              type="button"
              onClick={() => { if (isDark) toggleTheme(); }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded border text-xs font-semibold transition-all ${
                !isDark
                  ? 'bg-white border-[#315B85] text-[#315B85] shadow-sm'
                  : 'bg-[#F7F8FA] dark:bg-[#1F2937] border-[#E5E9EF] dark:border-[#374151] text-[#687386] dark:text-[#9CA3AF]'
              }`}
            >
              <Sun className="w-4 h-4 text-[#F59E0B]" />
              <span>Light Mode</span>
            </button>

            <button
              type="button"
              onClick={() => { if (!isDark) toggleTheme(); }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded border text-xs font-semibold transition-all ${
                isDark
                  ? 'bg-[#1E293B] border-[#3B82F6] text-[#60A5FA] shadow-sm'
                  : 'bg-[#F7F8FA] dark:bg-[#1F2937] border-[#E5E9EF] dark:border-[#374151] text-[#687386] dark:text-[#9CA3AF]'
              }`}
            >
              <Moon className="w-4 h-4 text-[#60A5FA]" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* LLM API Key Configuration */}
        <div className="academic-card p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E9EF]">
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-[#315B85]" />
              <h3 className="font-semibold text-[#202938]">OpenAI API Integration</h3>
            </div>
            {hasKey ? (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E8F5E9] text-[#32845A]">
                API Key Configured
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FEF7EC] text-[#C18A36]">
                Using Local Deterministic Synthesizer
              </span>
            )}
          </div>

          <p className="text-[#687386] leading-relaxed">
            Enter your personal OpenAI API Key if you wish to run agents against live GPT-4o-mini endpoints. If left unconfigured, Campus AI operates with built-in high-accuracy deterministic academic synthesizers.
          </p>

          <div>
            <label className="block font-medium text-[#202938] mb-1">OpenAI API Key (sk-...)</label>
            <input
              type="password"
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              placeholder={hasKey ? '••••••••••••••••••••••••••••••••' : 'sk-proj-...'}
              className="academic-input w-full font-mono"
            />
          </div>
        </div>

        {/* Academic Preferences */}
        <div className="academic-card p-5 space-y-4 text-xs">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#E5E9EF]">
            <BookOpen className="w-4 h-4 text-[#315B85]" />
            <h3 className="font-semibold text-[#202938]">Academic Preferences & AI Memory</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#202938] mb-1">Default Citation Format</label>
              <select
                value={citationStyle}
                onChange={(e) => setCitationStyle(e.target.value)}
                className="academic-input w-full"
              >
                <option value="APA">APA 7th Edition (Standard Social/Applied Sciences)</option>
                <option value="IEEE">IEEE (Engineering & Computer Science standard)</option>
                <option value="MLA">MLA 9th Edition</option>
                <option value="Harvard">Harvard Reference Format</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#202938] mb-1">Explanation Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="academic-input w-full"
              >
                <option value="Academic">Formal Academic & Technical</option>
                <option value="Simple">Intuitive & Conceptual</option>
                <option value="Concise">Concise & Exam-Focused</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-2 cursor-pointer text-[#202938]">
              <input
                type="checkbox"
                checked={webSearch}
                onChange={(e) => setWebSearch(e.target.checked)}
                className="rounded border-[#CBD5E1] text-[#315B85]"
              />
              <span>Enable External Research Verification when analyzing topics</span>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={saving}
            className="academic-btn-primary text-xs flex items-center space-x-1.5 py-2 px-5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>

          {savedSuccess && (
            <span className="text-xs text-[#32845A] font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </span>
          )}
        </div>
      </form>

      {/* AI Memory Deletion Card */}
      <div className="academic-card p-5 border-l-4 border-l-[#C45454] space-y-3 text-xs">
        <div className="flex items-center space-x-2 text-[#C45454] font-semibold">
          <Trash2 className="w-4 h-4" />
          <span>STUDENT PRIVACY & MEMORY CONTROLS</span>
        </div>
        <h3 className="font-semibold text-[#202938]">Clear Project Data & Execution Memory</h3>
        <p className="text-[#687386] leading-relaxed">
          Permanent removal of all indexed documents, RAG embeddings, generated assignments, slide decks, and agent execution logs from the backend database.
        </p>

        <div>
          <button
            onClick={handleClearMemory}
            disabled={clearing}
            className="px-4 py-2 rounded text-xs font-semibold bg-[#FBEAE9] text-[#C45454] border border-[#FFCDD2] hover:bg-[#FFCDD2] transition-colors"
          >
            {clearing ? 'Clearing Memory...' : 'Permanently Delete Saved Data'}
          </button>

          {clearSuccess && (
            <span className="ml-3 text-[#32845A] font-medium">
              Memory and saved files successfully cleared.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
