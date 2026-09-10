import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  Flame, 
  Trophy, 
  ChevronDown, 
  LogOut, 
  User, 
  Shield, 
  BookOpen, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { UserProfile, NotificationItem, UserRole, NavTab } from '../types';

interface NavbarProps {
  user: UserProfile;
  notifications?: NotificationItem[];
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onSwitchRole?: (role: UserRole) => void;
  onRoleChange?: (role: UserRole) => void;
  currentRole?: UserRole;
  activeTab?: NavTab | string;
  onSelectTab?: (tab: NavTab) => void;
  onOpenAssistant?: () => void;
  onNavigate?: (view: string) => void;
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  notifications = [],
  onOpenAuth,
  onLogout,
  onSwitchRole,
  onRoleChange,
  currentRole,
  activeTab,
  onSelectTab,
  onOpenAssistant,
  onNavigate,
  isLoggedIn = true,
}) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const unreadCount = safeNotifications.filter(n => !n.read).length;

  const handleNav = (target: string) => {
    if (onSelectTab) {
      if (target === 'dashboard') onSelectTab('dashboard');
      else if (target === 'competency') onSelectTab('competency_insights');
      else if (target === 'play') onSelectTab('pragya_play');
      else if (target === 'igot') onSelectTab('igot_integration');
      else if (target === 'leaderboard') onSelectTab('leaderboard');
      else if (target === 'achievements') onSelectTab('achievements');
      else if (target === 'progress') onSelectTab('progress_analytics');
      else if (target === 'profile') onSelectTab('dashboard');
      else if (target === 'landing') onSelectTab('landing');
      else onSelectTab(target as NavTab);
    } else if (onNavigate) {
      onNavigate(target);
    }
  };

  const handleRoleSwitch = (role: UserRole) => {
    if (onRoleChange) {
      onRoleChange(role);
    } else if (onSwitchRole) {
      onSwitchRole(role);
    }
    setShowRoleMenu(false);
  };

  const effectiveRole = currentRole || user?.role || 'learner';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                  PRAGYA <span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  SIH 2026 #26101
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                Learn. Play. Grow.
              </p>
            </div>
          </div>

          {/* Center: Quick navigation pill */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-700">
            <button
              onClick={() => handleNav('dashboard')}
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-xs transition-all"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNav('competency')}
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-xs transition-all"
            >
              Skill Insights
            </button>
            <button
              onClick={() => handleNav('play')}
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-xs transition-all flex items-center space-x-1 text-indigo-700 font-bold"
            >
              <span>Pragya Play</span>
              <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-700 rounded-md text-[9px]">GAMES</span>
            </button>
            <button
              onClick={() => handleNav('igot')}
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-indigo-600 hover:shadow-xs transition-all flex items-center space-x-1"
            >
              <span>iGOT Karmayogi</span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            
            {/* Pragya Assistant AI CTA */}
            {onOpenAssistant && (
              <button
                onClick={onOpenAssistant}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-200/80 rounded-xl hover:bg-indigo-100/70 text-xs font-semibold shadow-2xs transition-all"
                title="Chat with Pragya Assistant"
              >
                <Bot className="w-4 h-4 text-indigo-600" />
                <span>Pragya Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </button>
            )}

            {isLoggedIn ? (
              <>
                {/* Streak Counter */}
                <div 
                  onClick={() => handleNav('achievements')}
                  className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold cursor-pointer hover:bg-orange-100 transition-colors"
                  title="Daily Learning Streak"
                >
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span>{user.streak}d</span>
                </div>

                {/* XP Counter */}
                <div 
                  onClick={() => handleNav('leaderboard')}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold cursor-pointer hover:bg-indigo-100 transition-colors"
                  title="Total XP Earned"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>{user.xp.toLocaleString()} XP</span>
                </div>

                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifs(!showNotifs)}
                    className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                    title="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </button>

                  {showNotifs && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-slate-900">Notifications</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                            {unreadCount} new
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">Pragya Alert Engine</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                        {safeNotifications.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                              !item.read ? 'bg-indigo-50/40' : ''
                            }`}
                            onClick={() => {
                              item.read = true;
                              setShowNotifs(false);
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-semibold text-slate-800">{item.title}</span>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                            </div>
                            <p className="text-slate-600 mt-0.5 leading-relaxed">{item.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Role Switcher Pill */}
                <div className="relative">
                  <button
                    onClick={() => setShowRoleMenu(!showRoleMenu)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="capitalize">{effectiveRole}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {showRoleMenu && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                      <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">Switch Role View</div>
                      <button
                        onClick={() => handleRoleSwitch('learner')}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                          effectiveRole === 'learner' ? 'font-bold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>Learner</span>
                        {effectiveRole === 'learner' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                      </button>
                      <button
                        onClick={() => handleRoleSwitch('admin')}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                          effectiveRole === 'admin' ? 'font-bold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>Administrator</span>
                        {effectiveRole === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                      </button>
                      <button
                        onClick={() => handleRoleSwitch('trainer')}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                          effectiveRole === 'trainer' || effectiveRole === 'faculty' ? 'font-bold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>Trainer / Faculty</span>
                        {(effectiveRole === 'trainer' || effectiveRole === 'faculty') && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover border border-slate-300"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <div className="font-bold text-xs text-slate-900">{user?.name || 'User Profile'}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user?.designation || 'Statistical Officer'}</div>
                        <div className="text-[10px] text-indigo-600 font-semibold mt-0.5">{user?.department || 'MoSPI'}</div>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleNav('profile');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>My Official Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            handleNav('progress');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                          <span>Competency Progress</span>
                        </button>
                        <button
                          onClick={() => {
                            handleNav('igot');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          <span>iGOT Karmayogi Sync</span>
                        </button>
                      </div>
                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            if (onLogout) onLogout();
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2 font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
