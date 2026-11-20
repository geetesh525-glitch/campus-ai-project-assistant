import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AgentWorkspacePage } from './pages/AgentWorkspacePage';
import { PDFAnalyzerPage } from './pages/PDFAnalyzerPage';
import { ResearchPage } from './pages/ResearchPage';
import { AssignmentPage } from './pages/AssignmentPage';
import { PresentationPage } from './pages/PresentationPage';
import { VivaPage } from './pages/VivaPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { CampusChatPage } from './pages/CampusChatPage';
import { ProjectAssistantPage } from './pages/ProjectAssistantPage';
import { CareerAssistantPage } from './pages/CareerAssistantPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { useAuth } from './context/AuthContext';

export function App() {
  const { isAuthenticated } = useAuth();

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const viewParam = params?.get('view');
  const initialTab = viewParam === 'chat' ? 'campus-chat' : viewParam === 'project' ? 'project-assistant' : 'dashboard';
  const bypassLogin = params?.has('view') || isAuthenticated;

  // If user is not authenticated, show login interface as entry gate
  const [showLogin, setShowLogin] = useState<boolean>(() => !bypassLogin);
  const [currentTab, setCurrentTab] = useState<string>(initialTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // 1. Initial Gate: Login Interface before landing / dashboard
  if (showLogin && !isAuthenticated) {
    return (
      <LoginPage
        onSuccess={() => {
          setShowLogin(false);
          setCurrentTab('dashboard');
        }}
        onExploreGuest={() => {
          setShowLogin(false);
          setCurrentTab('landing');
        }}
      />
    );
  }

  // 2. Standalone Landing Page View
  if (currentTab === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => {
          if (!isAuthenticated) {
            setShowLogin(true);
          } else {
            setCurrentTab('dashboard');
          }
        }}
        onExploreFeature={(featureId) => {
          if (!isAuthenticated) {
            setShowLogin(true);
          } else {
            setCurrentTab(featureId);
          }
        }}
        onLoginClick={() => setShowLogin(true)}
      />
    );
  }

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Student Dashboard';
      case 'campus-chat':
        return 'Smart Campus Chatbot (Multilingual & Voice)';
      case 'project-assistant':
        return 'AI Project Studio (Ideas, Architecture & Roadmaps)';
      case 'career-assistant':
        return 'Career & Placement Suite (ATS Resume, Interview & DSA)';
      case 'pdf-analyzer':
        return 'PDF Analyzer & Semantic Search';
      case 'agent-workspace':
        return 'AI Agent Workspace (CrewAI Team)';
      case 'research':
        return 'Research Assistant';
      case 'assignments':
        return 'Assignment Generator';
      case 'presentations':
        return 'Presentation Generator';
      case 'viva':
        return 'Viva Voce Preparation';
      case 'study-planner':
        return 'Study Timetable & Deadlines';
      case 'admin-portal':
        return 'University Administration & Document RAG';
      case 'history':
        return 'Project History & Artifacts';
      case 'settings':
        return 'Settings & AI Memory';
      default:
        return 'Campus AI';
    }
  };

  return (
    <div className="flex h-screen bg-[#F7F8FA] dark:bg-[#0B0F19] overflow-hidden text-[#202938] dark:text-[#F3F4F6] transition-colors duration-200">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'login') {
            setShowLogin(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={() => setShowLogin(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onSelectTab={setCurrentTab}
          title={getPageTitle()}
          onLogout={() => setShowLogin(true)}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F8FA] dark:bg-[#0B0F19] transition-colors">
          <div className="max-w-6xl mx-auto pb-12">
            {currentTab === 'dashboard' && <DashboardPage onNavigate={setCurrentTab} />}
            {currentTab === 'campus-chat' && <CampusChatPage />}
            {currentTab === 'project-assistant' && <ProjectAssistantPage />}
            {currentTab === 'career-assistant' && <CareerAssistantPage />}
            {currentTab === 'pdf-analyzer' && <PDFAnalyzerPage />}
            {currentTab === 'agent-workspace' && <AgentWorkspacePage />}
            {currentTab === 'research' && <ResearchPage />}
            {currentTab === 'assignments' && <AssignmentPage />}
            {currentTab === 'presentations' && <PresentationPage />}
            {currentTab === 'viva' && <VivaPage />}
            {currentTab === 'study-planner' && <StudyPlannerPage />}
            {currentTab === 'admin-portal' && <AdminDashboardPage />}
            {currentTab === 'history' && <HistoryPage />}
            {currentTab === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
