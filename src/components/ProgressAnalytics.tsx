import React from 'react';
import { 
  LineChart, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Award, 
  Gamepad2, 
  Clock, 
  BarChart3, 
  Sparkles 
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProgressAnalyticsProps {
  user: UserProfile;
}

export const ProgressAnalytics: React.FC<ProgressAnalyticsProps> = ({ user }) => {
  const competencyDeltas = [
    { skill: 'Python for Data Analysis', before: 1.5, after: 3.2, gain: '+1.7' },
    { skill: 'Statistical Modeling & Sampling', before: 2.8, after: 4.4, gain: '+1.6' },
    { skill: 'Survey Data Cleaning (Pandas/SQL)', before: 2.0, after: 3.6, gain: '+1.6' },
    { skill: 'Data Visualization & Reporting', before: 1.8, after: 3.1, gain: '+1.3' },
    { skill: 'CAPI & Paradata Quality Auditing', before: 3.0, after: 4.5, gain: '+1.5' },
    { skill: 'CPI / WPI Calculation Methodology', before: 2.2, after: 3.8, gain: '+1.6' },
  ];

  const gameEngagementBreakdown = [
    { mode: 'Quiz Battle Duel', plays: 18, avgScore: 840, xpTotal: 1250 },
    { mode: 'Match the Concept', plays: 12, avgScore: 620, xpTotal: 720 },
    { mode: 'Scenario Challenge', plays: 9, avgScore: 540, xpTotal: 680 },
    { mode: 'Memory Match', plays: 8, avgScore: 480, xpTotal: 500 },
    { mode: 'True or False Blitz', plays: 14, avgScore: 710, xpTotal: 840 },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            <span>Empirical Learning Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Competency Growth & Performance
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Measurable capability escalation: Pragya AI tracks your pre-learning assessment scores against post-module adaptive quiz and game achievements.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-emerald-300">Empirical Skill Gain</span>
          <div className="text-3xl font-extrabold text-white font-mono mt-0.5">+28.4%</div>
          <span className="text-[11px] text-emerald-200">Across 6 Official Skills</span>
        </div>
      </div>

      {/* Before vs After Competency Growth Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Skill Escalation: Diagnostic Baseline vs Current Mastery
            </h3>
            <p className="text-xs text-slate-500">Scale from 1 (Novice) to 5 (Master Official Statistician)</p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              <span className="text-slate-500">Baseline (Before)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
              <span className="text-indigo-600 font-bold">Current (After)</span>
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {competencyDeltas.map((item) => (
            <div key={item.skill} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">{item.skill}</span>
                <span className="text-emerald-600 font-mono">{item.gain} pts</span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative">
                {/* Before bar */}
                <div
                  className="bg-slate-300 h-full rounded-full absolute top-0 left-0"
                  style={{ width: `${(item.before / 5) * 100}%` }}
                ></div>
                {/* After bar */}
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                  style={{ width: `${(item.after / 5) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Baseline: {item.before} / 5</span>
                <span>Current: {item.after} / 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pragya Play Engagement Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Pragya Play Game Engagement
            </h3>
            <p className="text-xs text-slate-500">How gamified micro-learning drives your competency retention</p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl">
            61 Total Game Sessions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {gameEngagementBreakdown.map((gm) => (
            <div key={gm.mode} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <Gamepad2 className="w-4 h-4 text-purple-600" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">{gm.plays} Plays</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{gm.mode}</h4>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] font-mono">
                <span className="text-slate-500">Avg: {gm.avgScore} pts</span>
                <span className="text-amber-600 font-bold">+{gm.xpTotal} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
