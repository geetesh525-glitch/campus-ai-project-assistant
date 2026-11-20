import React from 'react';
import { Sparkles, FileUp, Sun, Moon, LogOut, MessageSquare, Languages, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  onSelectTab: (tab: string) => void;
  title?: string;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectTab, title, onLogout }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, switchRole } = useAuth();
  const { language, setLanguage } = useLanguage();

  const handleLogoutClick = () => {
    logout();
    if (onLogout) onLogout();
  };

  return (
    <header className="h-16 bg-white dark:bg-[#111827] border-b border-[#E5E9EF] dark:border-[#1F2937] px-6 flex items-center justify-between z-10 transition-colors">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-base font-semibold text-[#202938] dark:text-white flex items-center space-x-2">
            <span>{title || 'Academic Workspace'}</span>
          </h1>
          <p className="text-xs text-[#687386] dark:text-[#9CA3AF]">
            {user?.institution || 'Undergraduate Computer Science & Engineering • Academic Year 2026'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2.5">
        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-[#4B5563] dark:text-gray-300 hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] border border-[#CBD5E1]/60 dark:border-[#374151] transition-all"
          title="Switch language between English and Hindi"
        >
          <Languages className="w-3.5 h-3.5 text-[#315B85] dark:text-[#60A5FA]" />
          <span>{language === 'en' ? 'EN' : 'हिन्दी'}</span>
        </button>

        {/* Quick Smart Chat Button */}
        <button
          onClick={() => onSelectTab('campus-chat')}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#202938] dark:text-gray-200 bg-white dark:bg-[#1F2937] border border-[#E5E9EF] dark:border-[#374151] rounded-lg hover:bg-[#F7F8FA] dark:hover:bg-[#374151] transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#315B85] dark:text-[#60A5FA]" />
          <span>Ask Campus AI</span>
        </button>

        {/* Multi-Agent Action */}
        <button
          onClick={() => onSelectTab('agent-workspace')}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#315B85] to-[#6366F1] dark:from-[#2563EB] dark:to-[#4F46E5] rounded-lg hover:opacity-95 transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Multi-Agent Task</span>
        </button>

        <div className="h-4 w-[1px] bg-[#E5E9EF] dark:bg-[#374151] mx-1"></div>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-[#E5E9EF] dark:border-[#374151] text-[#687386] dark:text-[#9CA3AF] hover:text-[#202938] dark:hover:text-white hover:bg-[#F7F8FA] dark:hover:bg-[#1F2937] transition-colors"
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
          <div
            onClick={() => switchRole(user?.role === 'admin' ? 'student' : 'admin')}
            className="w-7 h-7 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center text-xs font-bold shrink-0 border border-[#CBD5E1] dark:border-[#334155] cursor-pointer"
            title="Click to toggle between Student and Admin role"
          >
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ST'}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-[#202938] dark:text-white leading-none">
              {user?.name || 'Student'}
            </div>
            <div className="text-[10px] text-[#687386] dark:text-[#9CA3AF] mt-0.5 flex items-center space-x-1">
              <span>{user?.role ? user.role.toUpperCase() : 'STUDENT'}</span>
              {user?.role === 'admin' && <Shield className="w-2.5 h-2.5 text-[#32845A]" />}
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
