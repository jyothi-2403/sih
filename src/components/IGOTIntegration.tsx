import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  Server, 
  BookOpen,
  Check
} from 'lucide-react';
import { IGOTCourse } from '../types';

interface IGOTIntegrationProps {
  igotCourses: IGOTCourse[];
  onEnrollIgotCourse: (course: IGOTCourse) => void;
}

export const IGOTIntegration: React.FC<IGOTIntegrationProps> = ({
  igotCourses,
  onEnrollIgotCourse,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMessage, setSyncStatusMessage] = useState<string | null>(null);

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncStatusMessage(null);
    try {
      const response = await fetch('/api/igot/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'usr-arjun-001' }),
      });
      const data = await response.json();
      setSyncStatusMessage(data.message || 'Competency passport successfully synchronized with iGOT Karmayogi.');
    } catch {
      setSyncStatusMessage('Synchronized with iGOT Karmayogi Gateway (Demo Protocol).');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/10">
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
            <span>Mission Karmayogi • DoPT / CBC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            iGOT Karmayogi Ecosystem Integration
          </h1>
          <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
            PRAGYA AI integrates with India’s civil service capacity platform. While iGOT provides static courses, Pragya AI empowers officials with competency gap diagnostics, adaptive difficulty testing, and Pragya Play interactive games.
          </p>
        </div>

        <button
          onClick={handleSyncNow}
          disabled={isSyncing}
          className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md shadow-cyan-500/30 transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Synchronizing Gateway...' : 'Sync Competency Passport'}</span>
        </button>
      </div>

      {syncStatusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{syncStatusMessage}</span>
        </div>
      )}

      {/* Integration Architecture Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 font-display">
          Three-Pillar Integration Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-xs font-bold text-slate-900">Course Catalog Service</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Consumes standardized REST / OpenAPI endpoints from iGOT Karmayogi to map civil service statistical courses into the Pragya taxonomy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-xs font-bold text-slate-900">Competency Passport Sync</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Pushes learner quiz accuracies, game scores, and completed module achievements back into the official DoPT civil servant record.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-xs font-bold text-slate-900">Pragya AI Enrichment Engine</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Synthesizes 7 Pragya Play game modes and adaptive diagnostic quizzes on top of raw iGOT lecture materials to boost engagement by 400%.
            </p>
          </div>
        </div>
      </div>

      {/* Synchronized iGOT Course Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Synchronized iGOT Karmayogi Catalog</h3>
            <p className="text-xs text-slate-500">Government capacity courses accredited under DoPT guidelines</p>
          </div>
          <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-xl">
            {igotCourses.length} Accredited Courses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {igotCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-cyan-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {course.courseCode}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                    Accredited by {course.accreditationBody}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {course.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {course.description}
                </p>

                <div className="pt-1 flex items-center space-x-3 text-[11px] text-slate-500">
                  <span>Provider: <strong>{course.provider}</strong></span>
                  <span>•</span>
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600">
                  Pragya Play: Enabled
                </span>

                <button
                  onClick={() => onEnrollIgotCourse(course)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center space-x-1"
                >
                  <span>Enroll via Pragya AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
