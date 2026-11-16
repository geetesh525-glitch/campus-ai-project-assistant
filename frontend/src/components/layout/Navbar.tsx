import React from 'react';
import { Sparkles, FileUp, Bell } from 'lucide-react';

interface NavbarProps {
  onSelectTab: (tab: string) => void;
  title?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectTab, title }) => {
  return (
    <header className="h-16 bg-white border-b border-[#E5E9EF] px-6 flex items-center justify-between z-10">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-base font-semibold text-[#202938]">
            {title || 'Academic Workspace'}
          </h1>
          <p className="text-xs text-[#687386]">
            Undergraduate Computer Science & Engineering • Academic Year 2026
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => onSelectTab('pdf-analyzer')}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#202938] bg-white border border-[#E5E9EF] rounded hover:bg-[#F7F8FA] transition-colors"
        >
          <FileUp className="w-3.5 h-3.5 text-[#687386]" />
          <span>Upload PDF</span>
        </button>

        <button
          onClick={() => onSelectTab('agent-workspace')}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#315B85] rounded hover:bg-[#27496B] transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Agent Task</span>
        </button>

        <div className="h-4 w-[1px] bg-[#E5E9EF] mx-1"></div>

        <button
          className="p-1.5 text-[#687386] hover:text-[#202938] rounded hover:bg-[#F7F8FA]"
          title="System notifications"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
