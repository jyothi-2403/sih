import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  TrendingDown, 
  TrendingUp, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Layers, 
  Gamepad2,
  HelpCircle,
  Download
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [exported, setExported] = useState(false);

  const deptHeatmap = [
    {
      dept: 'Field Operations Division (FOD)',
      officers: 1420,
      topGap: 'CAPI Paradata Audit & GPS Geotagging',
      gapSeverity: 'High',
      gapPercentage: 38,
      avgXp: 2150,
      syncCompliance: '98%',
    },
    {
      dept: 'National Accounts Division (NAD)',
      officers: 640,
      topGap: 'Supply-Use Tables & Financial Intermediation',
      gapSeverity: 'Medium',
      gapPercentage: 42,
      avgXp: 2890,
      syncCompliance: '100%',
    },
    {
      dept: 'Data Quality & Innovation Division (DQID)',
      officers: 520,
      topGap: 'Automated Micro-editing & Deduplication',
      gapSeverity: 'Low',
      gapPercentage: 22,
      avgXp: 3420,
      syncCompliance: '100%',
    },
    {
      dept: 'Price Statistics Division',
      officers: 890,
      topGap: 'Hedonic Quality Imputation for Consumer Baskets',
      gapSeverity: 'High',
      gapPercentage: 45,
      avgXp: 1980,
      syncCompliance: '94%',
    },
    {
      dept: 'National Statistical Systems Training Academy (NASA)',
      officers: 350,
      topGap: 'AI Prompt Engineering for Microdata Ingestion',
      gapSeverity: 'Medium',
      gapPercentage: 29,
      avgXp: 3800,
      syncCompliance: '100%',
    },
  ];

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/10">
            <Building2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Ministry of Statistics & Programme Implementation (MoSPI)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Organization-Wide Capacity Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Real-time competency analytics, workforce diagnostic heatmaps, and capacity building metrics across all Indian statistical directorates.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>{exported ? 'Report Downloaded!' : 'Export Capacity Report'}</span>
        </button>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Officers Onboarded</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">4,820</div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +14% this quarter
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Quizzes Completed</span>
            <HelpCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">28,450</div>
          <span className="text-[11px] text-indigo-600 font-bold">84% passing accuracy</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Pragya Play Games</span>
            <Gamepad2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">52,190</div>
          <span className="text-[11px] text-purple-600 font-bold">4.2x engagement factor</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Gap Reduction</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">-31.2%</div>
          <span className="text-[11px] text-emerald-700 font-bold">Over past 6 months</span>
        </div>
      </div>

      {/* Directorate Competency Heatmap */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Directorate Competency Gap Heatmap
            </h3>
            <p className="text-xs text-slate-500">Identifies statistical domains requiring immediate faculty intervention</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
            5 Directorates Audited
          </span>
        </div>

        <div className="space-y-3">
          {deptHeatmap.map((item) => (
            <div
              key={item.dept}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-md">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-slate-900">{item.dept}</h4>
                  <span className="text-[10px] text-slate-500">({item.officers} officers)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-500">Primary Gap:</span>
                  <span className="font-semibold text-rose-700">{item.topGap}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-xs shrink-0">
                <div>
                  <span className="text-[10px] text-slate-400 block">Gap Deficit</span>
                  <span className="font-extrabold text-rose-600 font-mono text-sm">{item.gapPercentage}%</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">Avg Officer XP</span>
                  <span className="font-extrabold text-indigo-700 font-mono text-sm">{item.avgXp}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block">iGOT Sync</span>
                  <span className="font-extrabold text-emerald-600 font-mono text-sm">{item.syncCompliance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
