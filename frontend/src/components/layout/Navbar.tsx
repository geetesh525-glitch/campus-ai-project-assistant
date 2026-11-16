import React from 'react';
import { Sparkles, FileUp, Bell, Sun, Moon, LogOut, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onSelectTab: (tab: string) => void;
  title?: string;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectTab, title, onLogout }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    if (onLogout) onLogout();
  };

  return (
    <header className="h-16 bg-white dark:bg-[#111827] border-b border-[#E5E9EF] dark:border-[#1F2937] px-6 flex items-center justify-between z-10 transition-colors">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-base font-semibold text-[#202938] dark:text-white">
            {title || 'Academic Workspace'}
          </h1>
          <p className="text-xs text-[#687386] dark:text-[#9CA3AF]">
            {user?.institution || 'Undergraduate Computer Science & Engineering • Academic Year 2026'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Quick Upload Action */}
        <button
          onClick={() => onSelectTab('pdf-analyzer')}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#202938] dark:text-gray-200 bg-white dark:bg-[#1F2937] border border-[#E5E9EF] dark:border-[#374151] rounded hover:bg-[#F7F8FA] dark:hover:bg-[#374151] transition-colors"
        >
          <FileUp className="w-3.5 h-3.5 text-[#687386] dark:text-[#9CA3AF]" />
          <span>Upload PDF</span>
        </button>

        {/* Multi-Agent Action */}
        <button
          onClick={() => onSelectTab('agent-workspace')}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#315B85] dark:bg-[#2563EB] rounded hover:bg-[#27496B] dark:hover:bg-[#1D4ED8] transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Multi-Agent Task</span>
        </button>

        <div className="h-4 w-[1px] bg-[#E5E9EF] dark:bg-[#374151] mx-1"></div>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md border border-[#E5E9EF] dark:border-[#374151] text-[#687386] dark:text-[#9CA3AF] hover:text-[#202938] dark:hover:text-white hover:bg-[#F7F8FA] dark:hover:bg-[#1F2937] transition-colors"
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#F59E0B]" />
          ) : (
            <Moon className="w-4 h-4 text-[#315B85]" />
          )}
        </button>

        {/* User Profile Tag & Logout */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#E5E9EF] dark:border-[#374151]">
          <div className="w-7 h-7 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center text-xs font-bold shrink-0 border border-[#CBD5E1] dark:border-[#334155]">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ST'}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-medium text-[#202938] dark:text-white leading-none">
              {user?.name || 'Student'}
            </div>
            <div className="text-[10px] text-[#687386] dark:text-[#9CA3AF] mt-0.5">
              {user?.role ? user.role.toUpperCase() : 'STUDENT'}
            </div>
          </div>

          <button
            onClick={handleLogoutClick}
            className="p-1.5 text-[#687386] dark:text-[#9CA3AF] hover:text-[#C45454] dark:hover:text-[#EF4444] rounded hover:bg-[#F7F8FA] dark:hover:bg-[#1F2937] transition-colors"
            title="Sign out of student account"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
