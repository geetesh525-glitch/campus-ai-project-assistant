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
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse
}) => {
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

  return (
    <aside
      className={`bg-white border-r border-[#E5E9EF] h-screen flex flex-col transition-all duration-200 z-20 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E9EF]">
        <div className="flex items-center space-x-2.5 overflow-hidden cursor-pointer" onClick={() => onSelectTab('landing')}>
          <div className="w-8 h-8 rounded bg-[#315B85] flex items-center justify-center text-white shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-[#202938]">Campus AI</span>
              <span className="text-[10px] text-[#687386]">Academic Assistant</span>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="text-[#687386] hover:text-[#202938] p-1 rounded hover:bg-[#F7F8FA]"
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
                  ? 'bg-[#EAF1F8] text-[#315B85] font-semibold'
                  : 'text-[#687386] hover:bg-[#F7F8FA] hover:text-[#202938]'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#315B85]' : 'text-[#687386]'}`} />
              {!collapsed && <span className="ml-3 truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* University Student Profile Tag */}
      <div className="p-3 border-t border-[#E5E9EF]">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-[#EAF1F8] text-[#315B85] flex items-center justify-center text-xs font-bold shrink-0">
            ST
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-[#202938] truncate">Student Portal</div>
              <div className="text-[10px] text-[#32845A] flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#32845A]"></span>
                <span>Active Session</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
