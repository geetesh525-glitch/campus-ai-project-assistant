import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & App
    appName: 'Campus AI',
    tagline: 'Intelligent Academic & Campus Platform',
    portalSSO: 'University Single Sign-On',
    welcomeBack: 'Welcome back',
    
    // Navigation
    dashboard: 'Dashboard',
    smartChat: 'Smart Campus Chat',
    pdfAnalyzer: 'PDF & Notes Assistant',
    projectAssistant: 'AI Project Studio',
    careerAssistant: 'Career & Placement',
    aiWorkspace: '5-Agent Workspace',
    research: 'Research Assistant',
    assignments: 'Assignment Manager',
    presentations: 'Presentation Generator',
    viva: 'Viva Preparation',
    studyPlanner: 'Study Timetable & Planner',
    adminPortal: 'Admin & Knowledge Base',
    history: 'Project History',
    settings: 'Settings & Privacy',
    
    // Actions & Badges
    uploadPdf: 'Upload PDF',
    multiAgentTask: 'Multi-Agent Task',
    voiceAssistant: 'Voice Assistant',
    signOut: 'Sign Out',
    activeSession: 'Active Session',
    search: 'Search...',
    askAi: 'Ask Campus AI...',
    generate: 'Generate',
    download: 'Download',
    save: 'Save',
    clear: 'Clear',
    
    // Quick Actions
    analyzePdfDesc: 'Extract notes & RAG Q&A',
    startResearchDesc: 'Synthesize topic literature',
    createAssignmentDesc: 'Draft structured answers',
    generatePresentationDesc: 'Build slide deck with notes',
    practiceVivaDesc: 'Mock oral defense questions',
    campusChatDesc: 'Instant campus queries & advice',
    projectStudioDesc: 'BTech capstone ideas & architecture',
    careerHubDesc: 'Resume review & mock interviews',
  },
  hi: {
    // Brand & App
    appName: 'कैंपस AI',
    tagline: 'बुद्धिमान शैक्षणिक और कैंपस प्लेटफॉर्म',
    portalSSO: 'विश्वविद्यालय सिंगल साइन-ऑन',
    welcomeBack: 'स्वागत है',
    
    // Navigation
    dashboard: 'डैशबोर्ड',
    smartChat: 'स्मार्ट कैंपस चैट',
    pdfAnalyzer: 'पीडीएफ और नोट्स सहायक',
    projectAssistant: 'AI प्रोजेक्ट स्टूडियो',
    careerAssistant: 'करियर और प्लेसमेंट',
    aiWorkspace: '5-एजेंट कार्यक्षेत्र',
    research: 'शोध सहायक',
    assignments: 'असाइनमेंट प्रबंधक',
    presentations: 'प्रस्तुति जनरेटर',
    viva: 'वाइवा तैयारी',
    studyPlanner: 'अध्ययन समय-सारणी',
    adminPortal: 'व्यवस्थापक और ज्ञानकोष',
    history: 'प्रोजेक्ट इतिहास',
    settings: 'सेटिंग्स और गोपनीयता',
    
    // Actions & Badges
    uploadPdf: 'पीडीएफ अपलोड करें',
    multiAgentTask: 'मल्टी-एजेंट कार्य',
    voiceAssistant: 'आवाज सहायक',
    signOut: 'लॉग आउट',
    activeSession: 'सक्रिय सत्र',
    search: 'खोजें...',
    askAi: 'कैंपस AI से पूछें...',
    generate: 'उत्पन्न करें',
    download: 'डाउनलोड',
    save: 'सहेजें',
    clear: 'साफ़ करें',
    
    // Quick Actions
    analyzePdfDesc: 'नोट्स और RAG प्रश्नोत्तर निकालें',
    startResearchDesc: 'विषय साहित्य का संश्लेषण करें',
    createAssignmentDesc: 'संरचित उत्तर तैयार करें',
    generatePresentationDesc: 'नोट्स के साथ स्लाइड बनाएं',
    practiceVivaDesc: 'मौखिक परीक्षा का अभ्यास करें',
    campusChatDesc: 'त्वरित कैंपस प्रश्न और सलाह',
    projectStudioDesc: 'BTech प्रोजेक्ट विचार और आर्किटेक्चर',
    careerHubDesc: 'रिज्यूमे समीक्षा और मॉक इंटरव्यू',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('campus_ai_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('campus_ai_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
