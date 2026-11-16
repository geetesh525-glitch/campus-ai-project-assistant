import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Bot,
  Search,
  BookOpen,
  Presentation,
  Award,
  Calendar,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  onLogout,
}) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pdf-analyzer', label: 'PDF Analyzer', icon: FileText },
    { id: 'agent-workspace', label: 'AI Workspace', icon: Bot },
    { id: 'research', label: 'Research Assistant', icon: Search },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'presentations', label: 'Presentation Generator', icon: Presentation },
    { id: 'viva', label: 'Viva Preparation', icon: Award },
    { id: 'study-planner', label: 'Study Planner', icon: Calendar },
    { id: 'history', label: 'Project History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogoutClick = () => {
    logout();
    if (onLogout) onLogout();
  };

  return (
    <aside
      className={`bg-white dark:bg-[#111827] border-r border-[#E5E9EF] dark:border-[#1F2937] h-screen flex flex-col transition-all duration-200 z-20 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E9EF] dark:border-[#1F2937]">
        <div
          className="flex items-center space-x-2.5 overflow-hidden cursor-pointer"
          onClick={() => onSelectTab('landing')}
        >
          <div className="w-8 h-8 rounded bg-[#315B85] dark:bg-[#2563EB] flex items-center justify-center text-white shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-[#202938] dark:text-white">
                Campus AI
              </span>
              <span className="text-[10px] text-[#687386] dark:text-[#9CA3AF]">
                Academic Assistant
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="text-[#687386] dark:text-[#9CA3AF] hover:text-[#202938] dark:hover:text-white p-1 rounded hover:bg-[#F7F8FA] dark:hover:bg-[#1E293B]"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center rounded-md px-2.5 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] font-semibold'
                  : 'text-[#687386] dark:text-[#9CA3AF] hover:bg-[#F7F8FA] dark:hover:bg-[#1E293B] hover:text-[#202938] dark:hover:text-white'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive
                    ? 'text-[#315B85] dark:text-[#60A5FA]'
                    : 'text-[#687386] dark:text-[#9CA3AF]'
                }`}
              />
              {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle & Student Profile Tag */}
      <div className="p-3 border-t border-[#E5E9EF] dark:border-[#1F2937] space-y-2">
        {/* Quick Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-[#687386] dark:text-[#9CA3AF] hover:bg-[#F7F8FA] dark:hover:bg-[#1E293B] hover:text-[#202938] dark:hover:text-white transition-colors"
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          <div className="flex items-center space-x-2">
            {isDark ? (
              <Sun className="w-4 h-4 text-[#F59E0B]" />
            ) : (
              <Moon className="w-4 h-4 text-[#315B85]" />
            )}
            {!collapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </div>
          {!collapsed && (
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EAF1F8] dark:bg-[#1E293B] font-mono text-[#315B85] dark:text-[#60A5FA]">
              {isDark ? 'DARK' : 'LIGHT'}
            </span>
          )}
        </button>

        {/* User Card */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] flex items-center justify-center text-xs font-bold shrink-0 border border-[#CBD5E1] dark:border-[#334155]">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'ST'}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-medium text-[#202938] dark:text-white truncate">
                  {user?.name || 'Student Portal'}
                </div>
                <div className="text-[10px] text-[#32845A] dark:text-[#10B981] flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#32845A] dark:bg-[#10B981]"></span>
                  <span>Active Session</span>
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={handleLogoutClick}
              className="p-1 rounded text-[#687386] dark:text-[#9CA3AF] hover:text-[#C45454] dark:hover:text-[#EF4444] hover:bg-[#F7F8FA] dark:hover:bg-[#1E293B]"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
