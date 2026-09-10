import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Medal, 
  Award, 
  Filter, 
  Gamepad2, 
  Sparkles 
} from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  entries = [],
  currentUserId,
}) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  const [deptFilter, setDeptFilter] = useState('All');

  const safeEntries = Array.isArray(entries) ? entries : [];
  const filteredEntries = safeEntries.filter((entry) => {
    if (deptFilter === 'All') return true;
    return entry.department.toLowerCase().includes(deptFilter.toLowerCase());
  });

  const top3 = filteredEntries.slice(0, 3);
  const remaining = filteredEntries.slice(3);

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-indigo-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold border border-white/10">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>MoSPI Capacity Building Honours</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            National Statistical Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Recognizing top-performing statistical officers across India who consistently close competency gaps through Pragya Play games and adaptive assessments.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex bg-white/10 p-1 rounded-2xl border border-white/15 text-xs font-bold shrink-0">
          {(['weekly', 'monthly', 'all-time'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-xl capitalize transition-all ${
                timeframe === tf ? 'bg-white text-indigo-900 shadow-md' : 'text-slate-200 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Department Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Division Filter:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {['All', 'FOD', 'NAD', 'DQID', 'Price Statistics', 'NASA'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                deptFilter === dept
                  ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          
          {/* Rank 2 (Silver) */}
          <div className="order-2 md:order-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-extrabold text-sm shadow-xs">
              2
            </div>
            <img
              src={top3[1].avatarUrl}
              alt={top3[1].name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-300 shadow-xs"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900">{top3[1]?.name}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">{top3[1]?.designation}</p>
              <span className="text-[10px] font-semibold text-indigo-600">{top3[1]?.department}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 w-full flex items-center justify-around text-xs">
              <span className="font-extrabold text-indigo-700">{top3[1]?.xp?.toLocaleString()} XP</span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-orange-600">🔥 {top3[1]?.streak}d</span>
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border-2 border-amber-300 shadow-md flex flex-col items-center text-center space-y-3 relative scale-102">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-amber-200">
              <Medal className="w-6 h-6" />
            </div>
            <img
              src={top3[0]?.avatarUrl}
              alt={top3[0]?.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
            />
            <div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-200 text-amber-900">
                Top National Rank
              </span>
              <h4 className="text-base font-extrabold text-slate-900 mt-1">{top3[0]?.name}</h4>
              <p className="text-xs text-slate-600">{top3[0]?.designation}</p>
              <span className="text-[11px] font-bold text-indigo-600">{top3[0]?.department}</span>
            </div>
            <div className="pt-2 border-t border-amber-200 w-full flex items-center justify-around text-xs">
              <span className="font-extrabold text-indigo-700 text-sm">{top3[0]?.xp?.toLocaleString()} XP</span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-orange-600">🔥 {top3[0]?.streak}d</span>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="order-3 md:order-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-sm shadow-xs">
              3
            </div>
            <img
              src={top3[2]?.avatarUrl}
              alt={top3[2]?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-200 shadow-xs"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900">{top3[2]?.name}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">{top3[2]?.designation}</p>
              <span className="text-[10px] font-semibold text-indigo-600">{top3[2]?.department}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 w-full flex items-center justify-around text-xs">
              <span className="font-extrabold text-indigo-700">{top3[2].xp.toLocaleString()} XP</span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-orange-600">🔥 {top3[2].streak}d</span>
            </div>
          </div>

        </div>
      )}

      {/* Detailed Full Rankings Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Officer Details</th>
                <th className="py-3.5 px-4">Division</th>
                <th className="py-3.5 px-4">Level</th>
                <th className="py-3.5 px-4">Streak</th>
                <th className="py-3.5 px-4 text-right">Pragya XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredEntries.map((entry) => {
                const isCurrentUser = entry.id === currentUserId;
                return (
                  <tr
                    key={entry.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isCurrentUser ? 'bg-indigo-50/60 font-bold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        entry.rank === 1 ? 'bg-amber-400 text-white' :
                        entry.rank === 2 ? 'bg-slate-300 text-slate-800' :
                        entry.rank === 3 ? 'bg-amber-200 text-amber-900' :
                        'text-slate-600 bg-slate-100'
                      }`}>
                        {entry.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={entry.avatarUrl}
                          alt={entry.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{entry.name}</span>
                          <span className="text-[11px] text-slate-400">{entry.designation}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {entry.department}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px]">
                        Lvl {entry.level}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-orange-600 font-bold flex items-center space-x-1">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        <span>{entry.streak}d</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-indigo-700 font-mono text-sm">
                      {entry.xp.toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
