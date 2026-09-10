import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Gamepad2, 
  Target, 
  BookOpen, 
  HelpCircle, 
  TrendingUp, 
  Award, 
  Layers, 
  ShieldCheck, 
  Flame, 
  BrainCircuit, 
  CheckCircle2, 
  Play,
  Zap,
  BarChart3
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onExplore }) => {
  const features = [
    {
      id: 1,
      title: 'AI Competency Analysis',
      desc: 'Diagnoses individual and departmental skill gaps against required MoSPI competencies with automated Gemini explanations.',
      icon: Target,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 2,
      title: 'Personalized Learning',
      desc: 'Dynamically generates custom roadmaps tailored to the learner’s role, designation, and urgent skill deficiencies.',
      icon: BookOpen,
      color: 'from-indigo-600 to-violet-600',
    },
    {
      id: 3,
      title: 'AI Quiz Generation',
      desc: 'Ingests survey manuals and guidelines to synthesize rigorous MCQs with grounded statistical explanations.',
      icon: HelpCircle,
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 4,
      title: 'Game-Based Learning',
      desc: 'Transforms dense methodology into 7 interactive games—Quiz Battle, Matching, Memory, Scenarios, and Speed Blitz.',
      icon: Gamepad2,
      color: 'from-pink-600 to-rose-600',
    },
    {
      id: 5,
      title: 'Adaptive Learning',
      desc: 'Intelligently modulates difficulty based on real-time accuracy (>80% escalates; <50% suggests targeted remediation).',
      icon: BrainCircuit,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 6,
      title: 'Progress Analytics',
      desc: 'Evaluates empirical competency growth (Before vs After) with streak tracking, time analysis, and verifiable certificates.',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 7,
      title: 'iGOT Karmayogi Integration',
      desc: 'Seamlessly links with DoPT and Mission Karmayogi catalog to synchronize civil service competency passports.',
      icon: Layers,
      color: 'from-cyan-600 to-blue-600',
    },
  ];

  const processSteps = [
    { step: 1, label: 'Know Your Skills', desc: 'Map current capabilities' },
    { step: 2, label: 'Find Skill Gaps', desc: 'Identify role deficiencies' },
    { step: 3, label: 'Get Personalized Courses', desc: 'Customized journey roadmap' },
    { step: 4, label: 'Learn Through Games', desc: 'Interactive Pragya Play' },
    { step: 5, label: 'Take Adaptive Quizzes', desc: 'Dynamic difficulty scaling' },
    { step: 6, label: 'Earn XP & Badges', desc: 'Gamified recognition' },
    { step: 7, label: 'Improve Competency', desc: 'Empirical skill escalation' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* SIH Banner */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-sm bg-indigo-600 text-white font-bold text-[10px] tracking-wider uppercase">
              Smart India Hackathon 2026
            </span>
            <span className="text-slate-400">Problem Statement ID: <strong className="text-white">26101</strong></span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">Theme: Smart Education | Category: Software</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>Team: <strong className="text-indigo-400">Runtime Debuggers</strong></span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
              Official Statistical System (MoSPI)
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
              <span>Learn. Play. Grow.</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 font-medium">Capacity Building for India's Official Statistical System</span>
            </div>

            {/* Brand Title */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
              PRAGYA <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600">AI</span>
            </h1>

            {/* Main Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              AI-powered personalized learning with competency analysis, interactive games, adaptive quizzes and intelligent course recommendations.
            </p>

            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              "Pragya AI transforms traditional course content into personalized, adaptive and game-based learning experiences."
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-300 shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span>Explore Pragya AI</span>
              </button>
            </div>

            {/* Micro Stats Banner */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xl font-extrabold text-indigo-600">100%</div>
                <div className="text-[11px] text-slate-500 font-medium">Competency Gap Grounding</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xl font-extrabold text-indigo-600">7 Interactive</div>
                <div className="text-[11px] text-slate-500 font-medium">Pragya Play Game Modes</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xl font-extrabold text-indigo-600">Adaptive</div>
                <div className="text-[11px] text-slate-500 font-medium">Difficulty Engine</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xl font-extrabold text-indigo-600">iGOT Karmayogi</div>
                <div className="text-[11px] text-slate-500 font-medium">Ecosystem Sync Ready</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Visual Learning Journey Flow */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">The Central Learning Journey</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-display">
              From Competency Gap to Measurable Mastery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              A structured, evidence-driven pathway engineered specifically for government statistical officers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {processSteps.map((step, idx) => (
              <div 
                key={step.step}
                className="relative bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col items-center text-center shadow-xs hover:border-indigo-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-3 shadow-xs">
                  {step.step}
                </div>
                <span className="font-bold text-xs text-slate-900 leading-tight">{step.label}</span>
                <span className="text-[10px] text-slate-500 mt-1 leading-snug">{step.desc}</span>
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Core Feature Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Core Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-display">
              Engineered for Capacity Building
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Modern AI algorithms combined with game psychology to make official statistical learning engaging and impactful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-indigo-600">
                    <span>Feature 0{feat.id}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Pragya AI? Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                <span>Mission-Driven Innovation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                Why Pragya AI?
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Traditional capacity building in public administration relies heavily on static PDFs, manual workshops, and passive lecture attendance.
              </p>

              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-900 text-sm font-semibold italic">
                "Pragya AI combines AI + personalized learning + gamification + competency analysis. It does not just recommend what to learn—it understands the learner's competency gaps, converts learning content into interactive games, adapts difficulty according to performance, and measures competency improvement."
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-slate-900">Official Statistical System Alignment:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">Content specifically mapped to NSS schedules, CPI/WPI index calculations, National Accounts GVA, and CAPI paradata protocols.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-slate-900">Human-in-the-Loop AI Validation:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">Statistical administrators and trainers review and approve AI-generated quizzes and game packs prior to publication.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs font-bold text-slate-900">iGOT Karmayogi Ecosystem Integration:</strong>
                    <p className="text-xs text-slate-600 mt-0.5">Designed to sync with DoPT digital competency frameworks, bridging local training with national civil service initiatives.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onGetStarted}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center space-x-2"
                >
                  <span>Launch Demonstration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Card Mockup Graphic */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 rounded-3xl text-white shadow-xl border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-[10px] font-mono text-indigo-300">PRAGYA AI CORE ENGINE</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-indigo-200">Python for Data Analysis</span>
                    <span className="text-amber-400 font-mono">Gap: High (3/5)</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full w-[40%]"></div>
                  </div>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-indigo-200">Survey Sampling & CAPI</span>
                    <span className="text-emerald-400 font-mono">Gap: Low (1/5)</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[80%]"></div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-600/30 rounded-2xl border border-indigo-400/30">
                  <div className="flex items-center space-x-2 text-xs font-bold text-indigo-300">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Gemini AI Recommendation Engine</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                    "Recommend immediate enrollment in Module 2: Pandas Wrangling for NSS Microdata followed by Quiz Battle Game in Pragya Play to bridge python data handling deficiency."
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-indigo-200 pt-2 border-t border-white/10">
                    <span>Adaptive Difficulty: Medium → Hard</span>
                    <span className="text-amber-300">+250 XP Reward</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-white font-bold font-display tracking-tight">PRAGYA AI</span>
            <span className="text-slate-600">•</span>
            <span>"Learn. Play. Grow."</span>
          </div>
          <div>
            <span>Developed by <strong>Runtime Debuggers</strong> for Smart India Hackathon 2026 (Problem Statement 26101)</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
