import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
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

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // If tab is 'landing', render standalone full-screen landing page
  if (currentTab === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setCurrentTab('dashboard')}
        onExploreFeature={(featureId) => setCurrentTab(featureId)}
      />
    );
  }

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Student Dashboard';
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
      case 'history':
        return 'Project History & Artifacts';
      case 'settings':
        return 'Settings & AI Memory';
      default:
        return 'Campus AI';
    }
  };

  return (
    <div className="flex h-screen bg-[#F7F8FA] overflow-hidden text-[#202938]">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onSelectTab={setCurrentTab} title={getPageTitle()} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F8FA]">
          <div className="max-w-6xl mx-auto pb-12">
            {currentTab === 'dashboard' && <DashboardPage onNavigate={setCurrentTab} />}
            {currentTab === 'pdf-analyzer' && <PDFAnalyzerPage />}
            {currentTab === 'agent-workspace' && <AgentWorkspacePage />}
            {currentTab === 'research' && <ResearchPage />}
            {currentTab === 'assignments' && <AssignmentPage />}
            {currentTab === 'presentations' && <PresentationPage />}
            {currentTab === 'viva' && <VivaPage />}
            {currentTab === 'study-planner' && <StudyPlannerPage />}
            {currentTab === 'history' && <HistoryPage />}
            {currentTab === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
