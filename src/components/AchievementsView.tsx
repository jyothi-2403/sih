import React from 'react';
import { 
  Award, 
  Trophy, 
  Flame, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Star,
  Target
} from 'lucide-react';
import { Badge, UserProfile } from '../types';

interface AchievementsViewProps {
  user: UserProfile;
  badges?: Badge[];
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  user,
  badges = [],
}) => {
  const safeBadges = Array.isArray(badges) ? badges : [];
  const nextLevelXP = 3000;
  const currentXPInLevel = user.xp % 1000;
  const progressPercent = Math.min(100, Math.round((currentXPInLevel / 1000) * 100));

  const dailyQuests = [
    { id: 'q1', task: 'Complete 1 module in Survey Sampling', progress: '1/1', done: true, xp: 50 },
    { id: 'q2', task: 'Win 2 consecutive rounds in Quiz Battle', progress: '2/2', done: true, xp: 75 },
    { id: 'q3', task: 'Pass an Adaptive Assessment with >80% score', progress: '0/1', done: false, xp: 100 },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold border border-white/10">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Capacity Recognition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Badges & Capacity Milestones
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Earn verified government statistical skill badges as you demonstrate mastery across data cleaning, sampling models, and price indexation.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-amber-200">Current Standing</span>
          <div className="text-2xl font-extrabold text-white font-mono mt-0.5">Lvl {user.level}</div>
          <span className="text-xs text-amber-200 font-semibold">{user.levelTitle}</span>
        </div>
      </div>

      {/* Level XP Progress Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Level Progress</h3>
            <p className="text-xs text-slate-500">Earn 550 more XP to unlock Level 9: Master Survey Architect</p>
          </div>
          <span className="text-xs font-extrabold text-indigo-600 font-mono">
            {user.xp} / {nextLevelXP} XP ({progressPercent}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-indigo-600 h-full rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">Total XP</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{user.xp.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">Daily Streak</div>
            <div className="font-bold text-orange-600 text-sm mt-0.5">🔥 {user.streak} Days</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">Badges Earned</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{safeBadges.filter(b => b.unlocked).length} / {safeBadges.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">Quizzes Passed</div>
            <div className="font-bold text-emerald-600 text-sm mt-0.5">14 Completed</div>
          </div>
        </div>
      </div>

      {/* Daily Quests Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-display">Today's Daily Quests</h3>
          <span className="text-xs font-bold text-amber-600 flex items-center space-x-1">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>Streak Multiplier Active (1.5x)</span>
          </span>
        </div>

        <div className="space-y-2.5">
          {dailyQuests.map((q) => (
            <div
              key={q.id}
              className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between transition-all ${
                q.done ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs ${
                  q.done ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-slate-400'
                }`}>
                  {q.done ? '✓' : ''}
                </span>
                <span className={q.done ? 'line-through opacity-75' : 'font-medium'}>{q.task}</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-[11px] font-mono text-slate-500">{q.progress}</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">
                  +{q.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Competency Badges</h3>
            <p className="text-xs text-slate-500">Official capacity building accreditations awarded through Pragya AI</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
            {safeBadges.filter(b => b.unlocked).length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {safeBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                badge.unlocked
                  ? 'bg-white border-amber-200 shadow-xs hover:border-amber-400'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs ${
                    badge.unlocked ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {badge.unlocked ? badge.icon : <Lock className="w-5 h-5" />}
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    badge.unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{badge.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{badge.description}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{badge.category}</span>
                {badge.unlockedDate && <span>Unlocked {badge.unlockedDate}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
