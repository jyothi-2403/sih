import React from 'react';
import { 
  Map, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  Gamepad2, 
  HelpCircle, 
  BookOpen, 
  Lock,
  Layers,
  Flame
} from 'lucide-react';
import { Course } from '../types';

interface PersonalizedLearningPathProps {
  courses?: Course[];
  onSelectCourse?: (courseId: string) => void;
  onLaunchPlay?: (gameId?: string) => void;
  onNavigatePlay?: () => void;
  onLaunchQuiz?: (quizId?: string) => void;
}

export const PersonalizedLearningPath: React.FC<PersonalizedLearningPathProps> = ({
  courses = [],
  onSelectCourse,
  onLaunchPlay,
  onNavigatePlay,
  onLaunchQuiz,
}) => {
  const handlePlayClick = (gameId?: string) => {
    if (onLaunchPlay) {
      onLaunchPlay(gameId);
    } else if (onNavigatePlay) {
      onNavigatePlay();
    }
  };

  const handleQuizClick = (quizId?: string) => {
    if (onLaunchQuiz) {
      onLaunchQuiz(quizId);
    }
  };

  const handleCourseClick = (courseId: string) => {
    if (onSelectCourse) {
      onSelectCourse(courseId);
    }
  };
  const roadmapSteps = [
    {
      stepNumber: 1,
      courseId: 'course-python-101',
      title: 'Python for Data Analysis & Official Microdata',
      status: 'in_progress',
      progress: 60,
      gapTarget: 'Python for Data Analysis (High Gap: 3)',
      duration: '6 hours',
      modules: '5 modules',
      xpReward: 350,
      description: 'Foundational python programming, pandas wrangling on NSS survey datasets, and automated outlier detection.',
      isIgotSynced: true,
    },
    {
      stepNumber: 2,
      courseId: 'course-survey-sampling',
      title: 'Survey Sampling Design & Error Auditing',
      status: 'next',
      progress: 0,
      gapTarget: 'Statistical Modeling & Sampling (Medium Gap: 2)',
      duration: '8 hours',
      modules: '6 modules',
      xpReward: 400,
      description: 'Stratification, multi-stage cluster sampling, inverse probability weighting multipliers, and CAPI paradata.',
      isIgotSynced: true,
    },
    {
      stepNumber: 3,
      courseId: 'course-cpi-methodology',
      title: 'Consumer Price Index (CPI) & WPI Compilation',
      status: 'locked',
      progress: 0,
      gapTarget: 'Official Price Indices (Medium Gap: 1)',
      duration: '5 hours',
      modules: '4 modules',
      xpReward: 300,
      description: 'Base year revisions, geometric vs arithmetic mean aggregation, and price imputation protocols.',
      isIgotSynced: false,
    },
    {
      stepNumber: 4,
      courseId: 'course-gsbpm-standard',
      title: 'Generic Statistical Business Process Model (GSBPM)',
      status: 'locked',
      progress: 0,
      gapTarget: 'GSBPM Operational Standards (Low Gap: 1)',
      duration: '4 hours',
      modules: '4 modules',
      xpReward: 250,
      description: 'UNECE/MoSPI standard lifecycle from design and build to collection, dissemination, and quality evaluation.',
      isIgotSynced: true,
    },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI-Synthesized Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            My Pragya Learning Journey
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl leading-relaxed">
            Personalized curriculum sequence algorithmically arranged to close your highest competency deficiencies first.
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center shrink-0">
          <div className="text-xs text-indigo-300 font-semibold">Total Journey Value</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-0.5">+1,300 XP</div>
          <div className="text-[11px] text-slate-400 mt-1">4 Verifiable Milestones</div>
        </div>
      </div>

      {/* Sequential Journey Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
        {roadmapSteps.map((step) => {
          const isCurrent = step.status === 'in_progress';
          const isLocked = step.status === 'locked';

          return (
            <div key={step.stepNumber} className="relative group">
              
              {/* Timeline Node Badge */}
              <div
                className={`absolute -left-6 sm:-left-10 top-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-transform group-hover:scale-110 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                    : isLocked
                    ? 'bg-slate-200 text-slate-500'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {isLocked ? <Lock className="w-3.5 h-3.5" /> : step.stepNumber}
              </div>

              {/* Course Step Card */}
              <div
                className={`p-6 rounded-3xl border transition-all ${
                  isCurrent
                    ? 'bg-white border-indigo-300 shadow-md ring-2 ring-indigo-500/10'
                    : isLocked
                    ? 'bg-slate-50 border-slate-200/80 opacity-75'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        Step 0{step.stepNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        Closes: {step.gapTarget}
                      </span>
                      {step.isIgotSynced && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 flex items-center space-x-1">
                          <Layers className="w-3 h-3" />
                          <span>iGOT Karmayogi Synced</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{step.duration}</span>
                      </span>
                      <span>•</span>
                      <span>{step.modules}</span>
                      <span>•</span>
                      <span className="text-amber-600 font-bold">+{step.xpReward} XP</span>
                    </div>

                    {/* In Progress Bar */}
                    {isCurrent && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-semibold text-indigo-600">Active Course Progress</span>
                          <span className="font-bold text-slate-700">{step.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full w-[60%]"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 pt-2 lg:pt-0">
                    <button
                      onClick={() => handleCourseClick(step.courseId)}
                      disabled={isLocked}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                        isCurrent
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                          : isLocked
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-800 hover:bg-slate-900 text-white'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isCurrent ? 'Continue Course' : isLocked ? 'Locked' : 'Start Course'}</span>
                    </button>

                    <button
                      onClick={() => handlePlayClick()}
                      disabled={isLocked}
                      className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>Pragya Play Games</span>
                    </button>

                    <button
                      onClick={() => handleQuizClick()}
                      disabled={isLocked}
                      className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Adaptive Quiz</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
