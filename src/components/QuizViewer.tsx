import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Gamepad2, 
  Award,
  TrendingUp,
  BrainCircuit,
  ArrowLeft
} from 'lucide-react';
import { Quiz, QuizQuestion } from '../types';
import { triggerCelebration } from '../utils/confetti';

interface QuizViewerProps {
  quiz: Quiz;
  onBack: () => void;
  onRewardXP: (xp: number) => void;
  onNavigatePlay: () => void;
  onNavigateCourse: (courseId: string) => void;
}

export const QuizViewer: React.FC<QuizViewerProps> = ({
  quiz,
  onBack,
  onRewardXP,
  onNavigatePlay,
  onNavigateCourse,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ: QuizQuestion = quiz.questions[currentIdx] || quiz.questions[0];

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIdx,
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx + 1 < quiz.questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    return {
      correct: correctCount,
      total: quiz.questions.length,
      percentage: Math.round((correctCount / quiz.questions.length) * 100),
    };
  };

  const finishQuiz = () => {
    setIsCompleted(true);
    const { percentage } = calculateScore();
    const xp = Math.round((percentage / 100) * quiz.xpReward);
    onRewardXP(xp);
    if (percentage >= 70) {
      triggerCelebration();
    }
  };

  const scoreData = calculateScore();

  // Adaptive Learning Recommendation Logic
  let adaptiveFeedback = {
    tier: 'Medium',
    action: 'Maintain Medium Difficulty',
    message: 'Good grasp of standard survey procedures. Keep reinforcing edge case scenarios.',
    badgeColor: 'bg-blue-100 text-blue-800',
  };
  if (scoreData.percentage >= 80) {
    adaptiveFeedback = {
      tier: 'Advanced / Hard',
      action: 'Escalate to Advanced Difficulty',
      message: 'Mastery demonstrated! Pragya AI will now serve higher-tier challenges in microdata econometric modeling.',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    };
  } else if (scoreData.percentage < 50) {
    adaptiveFeedback = {
      tier: 'Fundamental / Easy',
      action: 'Targeted Remediation Recommended',
      message: 'Core concepts require reinforcement. Recommended: Re-read Module 2 and play Concept Match in Pragya Play before retaking.',
      badgeColor: 'bg-rose-100 text-rose-800',
    };
  }

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Assessments</span>
      </button>

      {/* Main Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        
        {!isCompleted ? (
          <div className="space-y-6">
            {/* Header / Progress Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {quiz.topic}
                </span>
                <h2 className="text-lg font-bold text-slate-900 font-display mt-1">
                  {quiz.title}
                </h2>
              </div>
              <div className="text-xs font-bold text-indigo-600">
                Question {currentIdx + 1} of {quiz.questions.length}
              </div>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="py-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const isCorrect = optIdx === currentQ.correctAnswer;
                let optStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";

                if (showExplanation) {
                  if (isCorrect) {
                    optStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                  } else if (isSelected) {
                    optStyle = "bg-rose-50 border-rose-500 text-rose-800";
                  }
                } else if (isSelected) {
                  optStyle = "bg-indigo-50 border-indigo-600 text-indigo-700 font-bold";
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start space-x-3 ${optStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Official Statistical Rationale */}
            {showExplanation && (
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                <strong className="text-indigo-700">Official Statistical Rationale:</strong>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Navigation Button */}
            <div className="pt-4 flex justify-end border-t border-slate-100">
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentIdx] === undefined}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                <span>{currentIdx + 1 < quiz.questions.length ? 'Next Question' : 'Complete Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* COMPLETION REPORT WITH ADAPTIVE DIFFICULTY ENGINE */
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Adaptive Assessment Completed!
              </h3>
              <p className="text-xs text-slate-500">
                Performance evaluated by Pragya AI Adaptive Diagnostic Engine
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <div>
                <div className="text-[11px] text-slate-500">Accuracy</div>
                <div className="text-2xl font-extrabold text-indigo-600 font-mono mt-0.5">{scoreData.percentage}%</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Correct</div>
                <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-0.5">{scoreData.correct} / {scoreData.total}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">XP Awarded</div>
                <div className="text-2xl font-extrabold text-amber-500 font-mono mt-0.5">+{quiz.xpReward} XP</div>
              </div>
            </div>

            {/* Adaptive Learning Decision Box */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-left max-w-lg mx-auto space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-900">
                  <BrainCircuit className="w-4 h-4 text-indigo-600" />
                  <span>Adaptive Difficulty Recalibration</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${adaptiveFeedback.badgeColor}`}>
                  {adaptiveFeedback.action}
                </span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                {adaptiveFeedback.message}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setCurrentIdx(0);
                  setIsCompleted(false);
                  setShowExplanation(false);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={onNavigatePlay}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 flex items-center justify-center space-x-1.5"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Reinforce with Pragya Play</span>
              </button>

              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 flex items-center justify-center space-x-1.5"
              >
                <span>Done & Return</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
