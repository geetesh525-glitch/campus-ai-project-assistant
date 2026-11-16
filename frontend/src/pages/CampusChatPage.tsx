import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Languages,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { voiceAssistant } from '../services/voiceAssistant';
import type { CampusChatMessage } from '../types';

export const CampusChatPage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [messages, setMessages] = useState<CampusChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [sessionId] = useState<string>(() => `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt chips
  const suggestedPrompts = [
    {
      en: 'What are the rules for 75% minimum attendance and medical leave?',
      hi: '75% न्यूनतम उपस्थिति और मेडिकल लीव के क्या नियम हैं?',
      tag: 'Academic Rules'
    },
    {
      en: 'What is the syllabus & marking scheme for 6th Sem BTech Major Project?',
      hi: 'बीटेक 6th सेमेस्टर मेजर प्रोजेक्ट का सिलेबस और मार्किंग स्कीम क्या है?',
      tag: 'Curriculum'
    },
    {
      en: 'What are the eligibility criteria for the 2026 Campus Placement drive?',
      hi: 'कैंपस प्लेसमेंट ड्राइव 2026 के लिए पात्रता मानदंड क्या हैं?',
      tag: 'Placements'
    },
    {
      en: 'How to calculate CGPA and credit requirements for degree completion?',
      hi: 'डिग्री के लिए सीजीपीए और क्रेडिट्स की गणना कैसे की जाती है?',
      tag: 'Grading'
    }
  ];

  // Initialize with welcoming system message
  useEffect(() => {
    const welcomeMsg: CampusChatMessage = {
      id: 'welcome-0',
      sessionId,
      sender: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते! मैं आपका स्मार्ट कैंपस एआई सहायक हूँ। आप मुझसे कॉलेज विनियमों, असाइनमेंट, परीक्षा दिशानिर्देशों, प्लेसमेंट और सिलेबस के बारे में कोई भी प्रश्न पूछ सकते हैं।'
          : 'Hello! I am your Smart Campus AI Assistant. Ask me anything about university regulations, project guidelines, exam syllabus, campus placement eligibility, or academic procedures.',
      suggestedQuestions: [
        language === 'hi' ? 'कैंपस प्लेसमेंट नियम क्या हैं?' : 'What are the campus placement eligibility rules?',
        language === 'hi' ? 'मेजर प्रोजेक्ट सबमिशन गाइडलाइन्स' : 'Major project submission timeline & format',
        language === 'hi' ? 'हॉस्टल और लाइब्रेरी के समय' : 'Hostel & central library digital access'
      ],
      sources: ['University Academic Handbook 2025-2026', 'Examination Board Regulation §3.2'],
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMsg]);
  }, [language, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    // Add user message to thread
    const userMsg: CampusChatMessage = {
      id: `usr_${Date.now()}`,
      sessionId,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await api.sendCampusChatMessage({
        message: text,
        sessionId,
        language
      });

      if (res) {
        const extractedSources: string[] = Array.isArray(res.sourceCitations)
          ? res.sourceCitations.map((c: any) => c.source || c.topic || String(c))
          : [];

        const assistantMsg: CampusChatMessage = {
          id: `ast_${Date.now()}`,
          sessionId,
          sender: 'assistant',
          text: res.reply || res.text || 'I have processed your query.',
          suggestedQuestions: res.suggestedQuestions || [],
          sources: extractedSources,
          timestamp: new Date().toISOString()
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (err: any) {
      console.error('Campus Chat Error:', err);
      const fallbackMsg: CampusChatMessage = {
        id: `err_${Date.now()}`,
        sessionId,
        sender: 'assistant',
        text:
          language === 'hi'
            ? 'क्षमा करें, संदेश संसाधित करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।'
            : 'I apologize, an error occurred while processing your request. Please check that the backend service is reachable and retry.',
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      voiceAssistant.stopListening();
      setIsListening(false);
    } else {
      if (!voiceAssistant.isSTTSupported()) {
        alert('Speech-to-Text is not supported by your browser. Please use Chrome, Edge, or Safari.');
        return;
      }
      setIsListening(true);
      voiceAssistant.startListening(
        (transcript: string) => {
          setInputText(transcript);
        },
        () => {
          setIsListening(false);
        },
        language === 'hi' ? 'hi-IN' : 'en-US'
      );
    }
  };

  const handleSpeakText = (id: string, text: string) => {
    if (currentlySpeakingId === id) {
      voiceAssistant.stopSpeaking();
      setCurrentlySpeakingId(null);
    } else {
      voiceAssistant.stopSpeaking();
      setCurrentlySpeakingId(id);
      voiceAssistant.speak(
        text,
        language === 'hi' ? 'hi-IN' : 'en-US',
        () => setCurrentlySpeakingId(null)
      );
    }
  };

  const handleClearHistory = async () => {
    if (confirm('Clear all conversation history in this session?')) {
      try {
        await api.clearCampusChatHistory(sessionId);
      } catch (e) {
        // Local state wipe
      }
      setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-xl shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#E5E9EF] dark:border-[#1F2937] bg-[#F7F8FA] dark:bg-[#161F30]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#315B85] to-[#6366F1] flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#202938] dark:text-white flex items-center space-x-2">
              <span>Smart Campus AI Assistant</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] font-medium border border-[#CBD5E1] dark:border-[#334155]">
                Context Aware • RAG Grounded
              </span>
            </h2>
            <p className="text-xs text-[#687386] dark:text-[#9CA3AF]">
              Instant answers for academic rules, projects, campus drives, and curriculum
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#1F2937] text-[#202938] dark:text-gray-200 hover:bg-[#F1F5F9] dark:hover:bg-[#374151] transition-colors"
            title="Toggle between English and Hindi"
          >
            <Languages className="w-3.5 h-3.5 text-[#315B85] dark:text-[#60A5FA]" />
            <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
          </button>

          {/* Clear Chat */}
          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-md text-[#687386] dark:text-[#9CA3AF] hover:text-[#C45454] dark:hover:text-[#EF4444] hover:bg-[#F1F5F9] dark:hover:bg-[#1F2937] transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#FAFAFC] dark:bg-[#0B0F19]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                  isUser
                    ? 'bg-[#315B85] dark:bg-[#2563EB] text-white shadow-sm'
                    : 'bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] text-white shadow-sm'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed transition-all shadow-sm ${
                  isUser
                    ? 'bg-[#315B85] text-white rounded-tr-none'
                    : 'bg-white dark:bg-[#1E293B] text-[#202938] dark:text-[#F3F4F6] border border-[#E5E9EF] dark:border-[#334155] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Grounding Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#E5E9EF] dark:border-[#334155]/60 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-[#687386] dark:text-[#9CA3AF] flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-[#32845A] dark:text-[#10B981]" />
                      <span>Verified Sources:</span>
                    </span>
                    {msg.sources.map((src: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#F1F5F9] dark:bg-[#0B0F19] text-[#315B85] dark:text-[#93C5FD] border border-[#CBD5E1]/60 dark:border-[#334155]"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                )}

                {/* Suggested Questions */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-[#E5E9EF] dark:border-[#334155]/60">
                    <div className="text-[10px] font-semibold text-[#687386] dark:text-[#9CA3AF] mb-1.5">
                      Suggested follow-ups:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((q: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-[11px] text-left px-2.5 py-1 rounded-md bg-[#EAF1F8] dark:bg-[#0B0F19] text-[#315B85] dark:text-[#60A5FA] hover:bg-[#D8E6F5] dark:hover:bg-[#1E293B] border border-[#CBD5E1]/50 dark:border-[#334155] transition-colors flex items-center space-x-1"
                        >
                          <span>{q}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audio Read-Aloud Button */}
                {!isUser && (
                  <div className="mt-2 flex items-center justify-end">
                    <button
                      onClick={() => handleSpeakText(msg.id, msg.text)}
                      className="text-[#687386] dark:text-[#9CA3AF] hover:text-[#315B85] dark:hover:text-[#60A5FA] p-1 rounded transition-colors flex items-center space-x-1 text-[10px]"
                      title={currentlySpeakingId === msg.id ? 'Stop Speaking' : 'Read Out Loud'}
                    >
                      {currentlySpeakingId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-[#C45454]" />
                          <span className="text-[#C45454]">Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white dark:bg-[#1E293B] border border-[#E5E9EF] dark:border-[#334155] rounded-2xl rounded-tl-none p-3.5 shadow-sm flex items-center space-x-2">
              <span className="text-xs text-[#687386] dark:text-[#9CA3AF] font-medium mr-1">
                Campus AI is thinking
              </span>
              <div className="flex items-center space-x-1">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Starters */}
      {messages.length <= 1 && (
        <div className="px-6 py-2.5 bg-white dark:bg-[#111827] border-t border-[#E5E9EF] dark:border-[#1F2937]">
          <div className="text-[11px] font-semibold text-[#687386] dark:text-[#9CA3AF] mb-2 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#6366F1]" />
            <span>Popular Student Queries:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(language === 'hi' ? item.hi : item.en)}
                className="text-left p-2 rounded-lg border border-[#E5E9EF] dark:border-[#1F2937] hover:border-[#6366F1] dark:hover:border-[#6366F1] bg-[#F7F8FA] dark:bg-[#161F30] hover:bg-white dark:hover:bg-[#1E293B] text-xs transition-all group"
              >
                <div className="text-[9px] uppercase tracking-wider font-bold text-[#6366F1] dark:text-[#818CF8] mb-0.5">
                  {item.tag}
                </div>
                <div className="text-[#202938] dark:text-[#F3F4F6] group-hover:text-[#315B85] dark:group-hover:text-[#60A5FA]">
                  {language === 'hi' ? item.hi : item.en}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="p-4 bg-white dark:bg-[#111827] border-t border-[#E5E9EF] dark:border-[#1F2937]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2.5 rounded-lg border transition-all ${
              isListening
                ? 'bg-[#EF4444] text-white border-[#EF4444] animate-pulse shadow-md'
                : 'bg-[#F7F8FA] dark:bg-[#161F30] text-[#687386] dark:text-[#9CA3AF] border-[#E5E9EF] dark:border-[#334155] hover:text-[#315B85] dark:hover:text-white'
            }`}
            title={isListening ? 'Click to stop listening' : 'Speak via microphone (Speech-to-Text)'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isListening
                  ? 'Listening to your voice...'
                  : language === 'hi'
                  ? 'कैंपस, सिलेबस या प्रोजेक्ट के बारे में कुछ भी पूछें...'
                  : 'Ask about campus regulations, exam guidelines, major project or viva...'
              }
              disabled={loading}
              className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-[#F7F8FA] dark:bg-[#161F30] border border-[#CBD5E1] dark:border-[#334155] rounded-lg text-[#202938] dark:text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#315B85] dark:focus:ring-[#6366F1] transition-all"
            />
            {inputText && (
              <span className="absolute right-3 top-2.5 text-[10px] text-[#94A3B8]">
                Press ↵
              </span>
            )}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              !inputText.trim() || loading
                ? 'bg-[#E2E8F0] dark:bg-[#1F2937] text-[#94A3B8] cursor-not-allowed'
                : 'bg-[#315B85] hover:bg-[#27496B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white shadow-sm'
            }`}
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[10px] text-[#687386] dark:text-[#9CA3AF]">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-[#32845A]" />
            <span>Strict University Policy Grounding • Speech & Multi-language Enabled</span>
          </span>
          <span>Shift + Enter for new lines</span>
        </div>
      </div>
    </div>
  );
};
