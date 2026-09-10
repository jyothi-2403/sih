import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { UserProfile, SkillGap } from '../types';

interface CompetencyInsightsProps {
  user?: UserProfile;
  competencies?: any;
  onNavigatePath?: () => void;
  onGenerateLearningPath?: () => void;
  onUpdateSkills?: (newSkills: { name: string; currentLevel: number; requiredLevel: number }[]) => void;
}

export const CompetencyInsights: React.FC<CompetencyInsightsProps> = ({
  user,
  competencies,
  onNavigatePath,
  onGenerateLearningPath,
  onUpdateSkills,
}) => {
  const defaultRole = user?.designation || 'Senior Statistical Officer';
  const defaultDept = user?.department || 'Field Operations Division (FOD)';

  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [selectedDept, setSelectedDept] = useState(defaultDept);
  const [skills, setSkills] = useState([
    { name: 'Python for Data Analysis', current: 2, required: 5, category: 'Technical' },
    { name: 'Statistical Modeling & Sampling', current: 4, required: 5, category: 'Domain' },
    { name: 'Survey Data Cleaning (Pandas/SQL)', current: 3, required: 4, category: 'Technical' },
    { name: 'Data Visualization & Reporting', current: 2, required: 4, category: 'Communication' },
    { name: 'CAPI & Field Paradata Auditing', current: 4, required: 4, category: 'Domain' },
    { name: 'Official Price Indices (CPI/WPI)', current: 3, required: 4, category: 'Domain' },
    { name: 'Generic Statistical Business Process (GSBPM)', current: 3, required: 4, category: 'Governance' },
  ]);

  const [aiAnalysis, setAiAnalysis] = useState<string>(
    `Based on your diagnostic profile as a Senior Statistical Officer in the Field Operations Division (FOD), your highest priority skill gaps are Python for Data Analysis (Gap: 3/5 - High) and Data Visualization & Reporting (Gap: 2/4 - Medium). 

Strengthening programmatic data wrangling via Python will automate validation checks on large-scale NSS survey schedules and drastically reduce non-sampling errors. Furthermore, enhancing visual reporting skills will empower your division to present rapid policy dashboards for district and national planning bodies.`
  );
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const calculateGap = (current: number, required: number) => {
    const diff = required - current;
    if (diff <= 0) return { gap: 0, label: 'No Gap', color: 'bg-emerald-100 text-emerald-800' };
    if (diff === 1) return { gap: 1, label: 'Low Gap', color: 'bg-blue-100 text-blue-800' };
    if (diff === 2) return { gap: 2, label: 'Medium Gap', color: 'bg-amber-100 text-amber-800' };
    return { gap: diff, label: 'High Gap', color: 'bg-rose-100 text-rose-800' };
  };

  const handleSkillLevelChange = (index: number, newLevel: number) => {
    const updated = [...skills];
    updated[index].current = newLevel;
    setSkills(updated);
  };

  const runAiAnalysis = async () => {
    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/competency/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: selectedRole,
          department: selectedDept,
          skills: skills.map(s => ({
            name: s.name,
            current: s.current,
            required: s.required,
            gap: s.required - s.current,
          })),
        }),
      });
      const data = await response.json();
      if (data.analysis) {
        setAiAnalysis(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pragya Skill Insights</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Competency Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Empirically measuring individual capability against official MoSPI job profile standards. Understand where capacity building is needed and generate a tailored roadmap.
          </p>
        </div>

        <button
          onClick={onGenerateLearningPath}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate My Learning Path</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Role & Dept Context Form */}
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Designation</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Senior Statistical Officer">Senior Statistical Officer (SSO)</option>
              <option value="Junior Statistical Officer">Junior Statistical Officer (JSO)</option>
              <option value="Assistant Director (Statistics)">Assistant Director (Statistics)</option>
              <option value="Data Processing Assistant">Data Processing Assistant (DPA)</option>
              <option value="Deputy Director (National Accounts)">Deputy Director (National Accounts)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">MoSPI Department / Division</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Field Operations Division (FOD)">Field Operations Division (FOD)</option>
              <option value="Survey Design and Research Division (SDRD)">Survey Design and Research Division (SDRD)</option>
              <option value="Data Quality and Informatics Division (DQID)">Data Quality and Informatics Division (DQID)</option>
              <option value="National Accounts Division (NAD)">National Accounts Division (NAD)</option>
              <option value="Price Statistics Division (PSD)">Price Statistics Division (PSD)</option>
            </select>
          </div>
        </div>

        {/* Formula Explainer */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              Competency Formula: <strong className="font-mono text-indigo-700">Gap = Required Level - Current Level</strong>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] font-semibold">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Gap 0: None</span>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800">Gap 1: Low</span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">Gap 2: Medium</span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800">Gap 3+: High</span>
          </div>
        </div>
      </div>

      {/* AI Explanation Box */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-lg border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-300">
            <BrainCircuit className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">
              Gemini AI Diagnostic Assessment
            </h3>
          </div>
          <button
            onClick={runAiAnalysis}
            disabled={isLoadingAi}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 transition-all flex items-center space-x-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAi ? 'animate-spin' : ''}`} />
            <span>{isLoadingAi ? 'Analyzing...' : 'Re-analyze with AI'}</span>
          </button>
        </div>

        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 whitespace-pre-line bg-white/5 p-4 rounded-2xl border border-white/10">
          {aiAnalysis}
        </div>
      </div>

      {/* Skills Matrix Table & Level Adjuster */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Competency Diagnostic Matrix</h3>
            <p className="text-xs text-slate-500">Adjust your current self-assessment score (1-5) to preview live gap recalibration</p>
          </div>
          <span className="text-xs font-bold text-indigo-600">{skills.length} Measured Competencies</span>
        </div>

        <div className="space-y-4">
          {skills.map((skill, idx) => {
            const gapInfo = calculateGap(skill.current, skill.required);
            return (
              <div
                key={skill.name}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-300 transition-all"
              >
                <div className="space-y-1 md:w-1/3">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {skill.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{skill.name}</h4>
                </div>

                {/* Level Adjuster Slider / Buttons */}
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-semibold text-slate-500 mr-2">Current:</span>
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleSkillLevelChange(idx, lvl)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        skill.current === lvl
                          ? 'bg-indigo-600 text-white shadow-xs scale-110'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                  <span className="text-[11px] text-slate-400 pl-2">/ 5</span>
                </div>

                {/* Progress Visual Bar */}
                <div className="md:w-1/4 space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                    <span>Current: {skill.current}</span>
                    <span className="text-indigo-600">Req: {skill.required}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden relative">
                    {/* Required marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-indigo-900 z-10"
                      style={{ left: `${(skill.required / 5) * 100}%` }}
                    ></div>
                    {/* Current fill */}
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.current >= skill.required ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${(skill.current / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Gap Badge */}
                <div className="shrink-0 flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${gapInfo.color}`}>
                    {gapInfo.label} ({gapInfo.gap})
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Pragya AI prioritizes courses addressing <strong>High & Medium Gaps</strong> first in your personalized pathway.
          </p>
          <button
            onClick={() => {
              if (onGenerateLearningPath) {
                onGenerateLearningPath();
              } else if (onNavigatePath) {
                onNavigatePath();
              }
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate My Learning Path</span>
          </button>
        </div>
      </div>

    </div>
  );
};
