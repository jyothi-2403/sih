import React from 'react';
import { 
  Trophy, 
  Flame, 
  Target, 
  BookOpen, 
  Gamepad2, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Play, 
  Award,
  Zap,
  BarChart2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { UserProfile, Course, SkillGap } from '../types';

interface LearnerDashboardProps {
  user: UserProfile;
  courses: Course[];
  skillGaps?: SkillGap[];
  onNavigate?: (view: string) => void;
  onNavigateTab?: (tab: any) => void;
  onSelectCourse: (courseId: string) => void;
  onLaunchPlay?: (gameId?: string) => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  user,
  courses,
  skillGaps,
  onNavigate,
  onNavigateTab,
  onSelectCourse,
  onLaunchPlay,
}) => {
  const handleNav = (targetView: string) => {
    if (onNavigateTab) {
      if (targetView === 'my-learning') onNavigateTab('learning_path');
      else if (targetView === 'competency') onNavigateTab('competency_insights');
      else if (targetView === 'play') onNavigateTab('pragya_play');
      else if (targetView === 'quizzes') onNavigateTab('quiz_viewer');
      else if (targetView === 'leaderboard') onNavigateTab('leaderboard');
      else if (targetView === 'achievements') onNavigateTab('achievements');
      else if (targetView === 'progress') onNavigateTab('progress_analytics');
      else onNavigateTab(targetView as any);
    } else if (onNavigate) {
      onNavigate(targetView);
    }
  };

  const effectiveGaps = skillGaps || user.skills.map(s => ({
    skill: s.name,
    category: s.category,
    currentLevel: s.currentLevel,
    requiredLevel: s.requiredLevel,
    gap: s.requiredLevel - s.currentLevel,
    classification: (s.requiredLevel - s.currentLevel >= 2 ? 'High' : s.requiredLevel - s.currentLevel > 0 ? 'Medium' : 'No Gap') as any
  }));

  // Find in-progress course
  const activeCourse = courses.find(c => c.progress > 0 && c.progress < 100) || courses[0];
  
  // Weekly activity mock
  const weeklyDays = [
    { day: 'Mon', hours: 1.5, active: true },
    { day: 'Tue', hours: 2.0, active: true },
    { day: 'Wed', hours: 0.8, active: true },
    { day: 'Thu', hours: 2.4, active: true },
    { day: 'Fri', hours: 1.2, active: true },
    { day: 'Sat', hours: 3.1, active: true },
    { day: 'Sun', hours: 1.8, active: true }, // Today
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-indigo-200 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Capacity Building Active • MoSPI {user.department}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Welcome to Pragya AI, {user.name}
          </h1>

          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed max-w-2xl">
            Your personalized learning path has identified <strong>2 priority skill gaps</strong> in Python & Data Visualization. Complete today’s interactive modules and games to elevate your official statistical competency.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('competency')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/30 transition-all flex items-center space-x-1.5"
            >
              <Target className="w-4 h-4" />
              <span>Pragya Skill Insights</span>
            </button>
            <button
              onClick={() => onLaunchPlay()}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 backdrop-blur-md transition-all flex items-center space-x-1.5"
            >
              <Gamepad2 className="w-4 h-4 text-amber-300" />
              <span>Launch Pragya Play Games</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Top 7 Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        
        {/* Overall Competency */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Overall Competency</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{user.overallCompetency}%</div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${user.overallCompetency}%` }}
            ></div>
          </div>
        </div>

        {/* Current Level */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Current Level</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-lg font-extrabold text-slate-900 truncate">Lvl {user.level}</div>
          <div className="text-[11px] font-medium text-slate-500 truncate">{user.levelTitle}</div>
        </div>

        {/* XP */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Total XP</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-600">{user.xp.toLocaleString()}</div>
          <div className="text-[10px] font-bold text-emerald-600 mt-0.5">+150 XP today</div>
        </div>

        {/* Streak */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Learning Streak</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="text-2xl font-extrabold text-orange-600">{user.streak} Days</div>
          <div className="text-[10px] font-medium text-slate-500 mt-0.5">🔥 On fire!</div>
        </div>

        {/* Courses Completed */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Courses</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{user.coursesCompleted} Done</div>
          <div className="text-[10px] font-medium text-slate-500 mt-0.5">2 in progress</div>
        </div>

        {/* Quiz Accuracy */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Quiz Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">{user.quizAccuracy}%</div>
          <div className="text-[10px] font-bold text-indigo-600 mt-0.5">Adaptive Tier: Med</div>
        </div>

        {/* Game Score */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Game Score</span>
            <Gamepad2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-700">{user.gameScore}</div>
          <div className="text-[10px] font-medium text-slate-500 mt-0.5">Pragya Play</div>
        </div>

      </div>

      {/* Main Grid: Continue Learning & Today's Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Continue Learning Active Card */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <h3 className="text-base font-bold text-slate-900 font-display">Continue Learning</h3>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                In Progress • {activeCourse.progress}%
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="space-y-1.5 max-w-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{activeCourse.category}</span>
                  {activeCourse.isIgotSynced && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-100 text-cyan-800">
                      iGOT Synced
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-slate-900">{activeCourse.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{activeCourse.description}</p>
                <div className="flex items-center space-x-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeCourse.duration}</span>
                  </span>
                  <span>•</span>
                  <span>{activeCourse.difficulty}</span>
                  <span>•</span>
                  <span className="text-amber-600 font-semibold">+{activeCourse.xpReward} XP</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                <button
                  onClick={() => onSelectCourse(activeCourse.id)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Resume Course</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onLaunchPlay()}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Play Module Game</span>
                </button>
              </div>
            </div>

            {/* Course Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Module 2: Pandas & Data Wrangling</span>
                <span className="font-bold text-slate-700">{activeCourse.progress}% Completed</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full" 
                  style={{ width: `${activeCourse.progress}%` }}
                ></div>
              </div>
            </div>

          </div>

          {/* Skill Gaps Overview Card with action */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">Priority Competency Gaps</h3>
                <p className="text-xs text-slate-500">Calculated against required level for {user?.designation || 'your role'}</p>
              </div>
              <button
                onClick={() => handleNav('competency')}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
              >
                <span>Full Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {effectiveGaps.slice(0, 4).map((sg) => (
                <div key={sg.skill} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800">{sg.skill}</span>
                    <div className="text-[11px] text-slate-500">
                      Current: <strong>{sg.currentLevel}/5</strong> → Required: <strong>{sg.requiredLevel}/5</strong>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                    sg.classification === 'High'
                      ? 'bg-rose-100 text-rose-800'
                      : sg.classification === 'Medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    Gap: {sg.classification}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Formula: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-[11px]">Gap = Required Level - Current Level</code>
              </span>
              <button
                onClick={() => handleNav('my-learning')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate My Learning Path</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Today's Challenge & Weekly Activity */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Today's Challenge Card */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/20 text-[10px] font-extrabold uppercase tracking-wider">
                  Daily Challenge
                </span>
                <div className="flex items-center space-x-1 text-xs font-bold text-amber-200">
                  <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>+150 XP</span>
                </div>
              </div>

              <h4 className="text-lg font-bold">Quiz Battle: Data Wrangling</h4>
              <p className="text-xs text-amber-100 leading-relaxed">
                Win 3 consecutive rounds against the countdown clock without losing all 3 lives to keep your 7-day streak active!
              </p>

              <button
                onClick={() => handleNav('play')}
                className="w-full mt-2 py-2.5 rounded-xl bg-white text-orange-600 font-bold text-xs shadow-md hover:bg-amber-50 transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-orange-600" />
                <span>Start Challenge Now</span>
              </button>
            </div>
            
            <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
          </div>

          {/* Weekly Learning Activity Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-display">Weekly Activity</h4>
                <p className="text-[11px] text-slate-500">12.8 hours total learning this week</p>
              </div>
              <BarChart2 className="w-4 h-4 text-indigo-600" />
            </div>

            {/* Interactive Bars */}
            <div className="flex items-end justify-between h-36 pt-4 pb-1">
              {weeklyDays.map((item, idx) => {
                const heightPercent = Math.min(100, Math.round((item.hours / 3.5) * 100));
                const isToday = idx === weeklyDays.length - 1;
                return (
                  <div key={item.day} className="flex flex-col items-center space-y-1.5 flex-1 group">
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {item.hours}h
                    </span>
                    <div className="w-6 bg-slate-100 rounded-t-lg h-24 flex items-end overflow-hidden">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 ${
                          isToday ? 'bg-gradient-to-t from-indigo-600 to-cyan-500' : 'bg-indigo-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>
                    <span className={`text-[11px] font-semibold ${isToday ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Recommended Courses Section (with iGOT Karmayogi badge) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Recommended Courses for You</h3>
            <p className="text-xs text-slate-500">Matched through your competency diagnostic & iGOT Karmayogi curriculum</p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-40 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-slate-800 backdrop-blur-xs shadow-xs">
                      {course.difficulty}
                    </span>
                    {course.isIgotSynced && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-xs flex items-center space-x-1">
                        <Layers className="w-3 h-3 mr-0.5" />
                        <span>iGOT</span>
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 text-amber-300 backdrop-blur-xs">
                    +{course.xpReward} XP
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                    {course.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                <div className="text-[11px] text-slate-500">
                  <span>{course.modules.length} Modules</span> • <span>{course.duration}</span>
                </div>
                <button
                  onClick={() => onSelectCourse(course.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition-all flex items-center space-x-1"
                >
                  <span>Open Course</span>
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
