import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Target, 
  BookOpen, 
  Gamepad2, 
  HelpCircle, 
  Trophy, 
  Award, 
  LineChart, 
  Bot, 
  User, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  Layers, 
  Settings, 
  Users,
  ChevronRight
} from 'lucide-react';
import { UserRole, NavTab, UserProfile } from '../types';

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isAi?: boolean;
  highlight?: boolean;
}

interface SidebarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
  role?: UserRole;
  currentRole?: UserRole;
  activeTab?: NavTab | string;
  onSelectTab?: (tab: NavTab) => void;
  user?: UserProfile;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  role,
  currentRole,
  activeTab,
  onSelectTab,
  user,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const effectiveRole = currentRole || role || 'learner';
  const effectiveTab = (activeTab || currentView || 'dashboard') as NavTab;

  const learnerNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'competency_insights', label: 'Competency Gaps', icon: Target, badge: 'AI' },
    { id: 'learning_path', label: 'Personalized Path', icon: Map },
    { id: 'pragya_play', label: 'Pragya Play', icon: Gamepad2, highlight: true },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'achievements', label: 'Badges & Quests', icon: Award },
    { id: 'progress_analytics', label: 'Skill Analytics', icon: LineChart },
    { id: 'igot_integration', label: 'iGOT Karmayogi', icon: Layers, badge: 'DoPT' },
  ];

  const adminNavItems: NavItem[] = [
    { id: 'admin_analytics', label: 'Capacity Analytics', icon: BarChart3 },
    { id: 'content_studio', label: 'AI Content Studio', icon: FileText, badge: 'Upload' },
    { id: 'ai_quiz_gen', label: 'AI Quiz Generator', icon: Sparkles, isAi: true },
    { id: 'ai_game_gen', label: 'AI Game Generator', icon: Gamepad2, isAi: true },
    { id: 'content_review', label: 'Content Review & QA', icon: CheckCircle2, badge: 'Audit' },
    { id: 'igot_integration', label: 'iGOT Synchronization', icon: Layers },
    { id: 'competency_insights', label: 'Competency Framework', icon: Target },
    { id: 'dashboard', label: 'Learner View Preview', icon: LayoutDashboard },
  ];

  const items = (effectiveRole === 'admin' || effectiveRole === 'trainer' || effectiveRole === 'faculty') 
    ? adminNavItems 
    : learnerNavItems;

  const handleSelect = (tabId: NavTab) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    } else if (onNavigate) {
      onNavigate(tabId);
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-20 left-0 z-40 h-[calc(100vh-6rem)] w-64 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between py-5 px-3.5 transition-transform duration-300 ease-in-out shrink-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-1.5 overflow-y-auto pr-1">
          <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            {effectiveRole === 'admin' ? 'Administrative Suite' : 'Learner Navigation'}
          </div>

          {items.map((item) => {
            const Icon = item.icon;
            const isActive = effectiveTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-bold'
                    : item.highlight
                    ? 'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100/80 font-bold'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-white'
                        : item.isAi
                        ? 'text-indigo-600'
                        : item.highlight
                        ? 'text-indigo-600'
                        : 'text-slate-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold ${
                      isActive
                        ? 'bg-indigo-500 text-white'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-amber-100 text-amber-900 animate-pulse">
                    PLAY
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Capacity Building Banner */}
        <div className="mt-4 pt-3 border-t border-slate-100 px-1">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-300">
                MoSPI Capacity
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-800 text-indigo-200 font-mono">
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-200 mt-1 leading-snug">
              India's Official Statistical System
            </p>
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
              <span>iGOT Sync</span>
              <span className="text-emerald-400 font-semibold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-ping"></span>
                Connected
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
