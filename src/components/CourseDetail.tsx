import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Award, 
  Gamepad2, 
  HelpCircle, 
  CheckCircle2, 
  Play, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  FileText,
  Code,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { Course, Module } from '../types';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onLaunchPlay: (gameId?: string) => void;
  onLaunchQuiz: (quizId?: string) => void;
  onOpenCertificate: (courseTitle: string) => void;
  onMarkModuleComplete: (courseId: string, moduleId: string) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  course,
  onBack,
  onLaunchPlay,
  onLaunchQuiz,
  onOpenCertificate,
  onMarkModuleComplete,
}) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'learn' | 'play' | 'practice' | 'test'>('learn');
  const [practiceAnswer, setPracticeAnswer] = useState<number | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  const activeModule = course.modules[activeModuleIndex] || course.modules[0];

  const handleCompleteCurrent = () => {
    onMarkModuleComplete(course.id, activeModule.id);
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      
      {/* Back button and breadcrumb */}
      <button
        onClick={onBack}
        className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </button>

      {/* Course Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {course.category}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {course.difficulty}
              </span>
              {course.isIgotSynced && (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center space-x-1">
                  <Layers className="w-3 h-3" />
                  <span>iGOT Karmayogi Synced</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{course.duration}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>{course.modules.length} Core Modules</span>
              </span>
              <span>•</span>
              <span className="text-amber-600 font-bold flex items-center space-x-1">
                <Award className="w-4 h-4 text-amber-500" />
                <span>+{course.xpReward} XP upon completion</span>
              </span>
            </div>
          </div>

          {/* Certificate / Progress Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center shrink-0 w-full sm:w-64 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Overall Progress</span>
              <span className="font-bold text-indigo-600">{course.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>

            {course.progress >= 100 ? (
              <button
                onClick={() => onOpenCertificate(course.title)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 transition-all flex items-center justify-center space-x-1.5"
              >
                <Award className="w-4 h-4" />
                <span>View Official Certificate</span>
              </button>
            ) : (
              <button
                onClick={handleCompleteCurrent}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Module Complete</span>
              </button>
            )}
          </div>
        </div>

        {/* Skills Gained Pills */}
        {((course.skillsGained && course.skillsGained.length > 0) || (course.skills && course.skills.length > 0)) && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 mr-1">Competencies Strengthened:</span>
            {(course.skillsGained || course.skills || []).map((sk) => (
              <span key={sk} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
                ✓ {sk}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Learning Workplace: Modules Sidebar + Content Tab Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Module Nav Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Course Curriculum
            </h3>

            <div className="space-y-1.5">
              {(course.modules || []).map((mod, idx) => {
                const isActive = activeModuleIndex === idx;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setActiveModuleIndex(idx);
                      setPracticeSubmitted(false);
                      setPracticeAnswer(null);
                    }}
                    className={`w-full text-left p-3 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive ? 'bg-white text-indigo-600' : mod.isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {mod.isCompleted ? '✓' : idx + 1}
                      </span>
                      <span className="line-clamp-1">{mod.title}</span>
                    </div>

                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Mini-Game Trigger Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold">
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span>Pragya Play Integration</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reinforce this module’s concepts with fast interactive games to earn bonus competency XP!
            </p>
            <button
              onClick={() => onLaunchPlay()}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Launch Module Game</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Active Module Content Workspace (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          
          {/* Module 4-Tab Bar */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 text-xs font-semibold px-4 pt-2">
            <button
              onClick={() => setActiveTab('learn')}
              className={`py-3 px-4 border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'learn'
                  ? 'border-indigo-600 text-indigo-600 font-bold bg-white rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learn</span>
            </button>

            <button
              onClick={() => setActiveTab('play')}
              className={`py-3 px-4 border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'play'
                  ? 'border-indigo-600 text-indigo-600 font-bold bg-white rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span>Play (Pragya Play)</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`py-3 px-4 border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'practice'
                  ? 'border-indigo-600 text-indigo-600 font-bold bg-white rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Practice Check</span>
            </button>

            <button
              onClick={() => setActiveTab('test')}
              className={`py-3 px-4 border-b-2 flex items-center space-x-1.5 transition-colors ${
                activeTab === 'test'
                  ? 'border-indigo-600 text-indigo-600 font-bold bg-white rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Module Quiz</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-6 sm:p-8 flex-1">
            
            {/* LEARN TAB */}
            {activeTab === 'learn' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                    Module {activeModuleIndex + 1}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 font-display">
                    {activeModule.title}
                  </h2>
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {activeModule.content}
                </div>

                {/* Practical Statistical Code Sample */}
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                    <span className="flex items-center space-x-1.5">
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                      <span>python_nss_cleaner.py</span>
                    </span>
                    <span className="text-emerald-400 font-sans font-bold">MoSPI Python Standard</span>
                  </div>
                  <pre className="overflow-x-auto text-slate-300">
{`import pandas as pd
import numpy as np

# Load National Sample Survey microdata
df = pd.read_csv("nss_schedule_21_microdata.csv")

# Apply survey multiplier weight (Inverse probability of selection)
df['weighted_consumption'] = df['monthly_mpce'] * df['subsample_multiplier']

# Aggregate universe estimates
state_aggregate = df.groupby('state_code')['weighted_consumption'].sum()
print(state_aggregate)`}
                  </pre>
                </div>

                {/* Key Takeaways Card */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                  <div className="text-xs font-bold text-indigo-900 flex items-center space-x-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Official Statistical Key Takeaways</span>
                  </div>
                  <ul className="text-xs text-indigo-950 space-y-1 list-disc list-inside">
                    <li>Always verify whether raw frequencies require normalized or absolute multipliers.</li>
                    <li>Ensure missing item expenditures follow standardized imputation rather than dropping rows.</li>
                    <li>Validate state boundary codes against the latest Local Government Directory (LGD).</li>
                  </ul>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => setActiveTab('play')}
                    className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center space-x-1.5"
                  >
                    <span>Next: Play Game</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCompleteCurrent}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center space-x-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Module Done</span>
                  </button>
                </div>
              </div>
            )}

            {/* PLAY TAB (Pragya Play) */}
            {activeTab === 'play' && (
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Gamepad2 className="w-8 h-8" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Play Module Mini-Games
                  </h3>
                  <p className="text-xs text-slate-600">
                    Pragya AI converts this module’s statistical concepts into 7 game modes: Quiz Battle, Concept Match, Memory Match, and Scenario Challenges.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left pt-2">
                  <div 
                    onClick={() => onLaunchPlay('game-match-1')}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all"
                  >
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Interactive Match</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">Match Statistical Concepts</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Pair PSUs, multipliers, and sampling errors.</p>
                  </div>

                  <div 
                    onClick={() => onLaunchPlay('game-quiz-battle-1')}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer transition-all"
                  >
                    <span className="text-[10px] font-bold text-purple-600 uppercase">Timed Duel</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">Speed Quiz Battle</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Test fast recall under the 60-second timer.</p>
                  </div>
                </div>

                <button
                  onClick={() => onLaunchPlay()}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all inline-flex items-center space-x-2"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Open Full Pragya Play Center</span>
                </button>
              </div>
            )}

            {/* PRACTICE CHECK TAB */}
            {activeTab === 'practice' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                    Interactive Knowledge Check
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Quick Scenario: In NSS survey data cleaning, what is the primary consequence of ignoring non-sampling error checks?
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {[
                    "Unbiased population multipliers remain perfectly calibrated",
                    "Systematic bias enters state poverty and consumption estimates",
                    "Survey processing speed increases without risk",
                    "The number of sample households doubles automatically"
                  ].map((option, optIdx) => {
                    const isSelected = practiceAnswer === optIdx;
                    const isCorrect = optIdx === 1;
                    let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                    if (practiceSubmitted) {
                      if (isCorrect) optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                      else if (isSelected) optionStyle = 'bg-rose-50 border-rose-500 text-rose-800';
                    } else if (isSelected) {
                      optionStyle = 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold';
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => !practiceSubmitted && setPracticeAnswer(optIdx)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all ${optionStyle}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {practiceSubmitted && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1">
                    <strong className="text-indigo-600">Statistical Protocol Explanation:</strong>
                    <p>
                      Non-sampling errors (such as respondent recall bias or data entry typos) do not cancel out with sample size increases and directly skew economic aggregates if uncorrected.
                    </p>
                  </div>
                )}

                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  {!practiceSubmitted ? (
                    <button
                      onClick={() => setPracticeSubmitted(true)}
                      disabled={practiceAnswer === null}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 disabled:opacity-50"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPracticeSubmitted(false);
                        setPracticeAnswer(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TEST TAB (Module Quiz) */}
            {activeTab === 'test' && (
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-2xs">
                  <HelpCircle className="w-8 h-8" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Adaptive Assessment: {activeModule.title}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Test your understanding with 4 adaptive multiple choice questions. Performance determines your next difficulty tier and updates your competency rating.
                  </p>
                </div>

                <button
                  onClick={() => onLaunchQuiz()}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all inline-flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Module Quiz</span>
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
