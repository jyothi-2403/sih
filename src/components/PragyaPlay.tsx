import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Trophy, 
  Flame, 
  Heart, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle, 
  Zap, 
  Award, 
  Layers, 
  Volume2, 
  VolumeX, 
  ArrowLeft,
  Lightbulb,
  ShieldAlert
} from 'lucide-react';
import { Game } from '../types';
import { triggerCelebration } from '../utils/confetti';

interface PragyaPlayProps {
  games: Game[];
  activeGameId?: string;
  onRewardXP: (xp: number) => void;
  onBackToDashboard: () => void;
}

export const PragyaPlay: React.FC<PragyaPlayProps> = ({
  games,
  activeGameId,
  onRewardXP,
  onBackToDashboard,
}) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(
    games.find(g => g.id === activeGameId) || null
  );

  // Active game play states
  const [gameMode, setGameMode] = useState<string | null>(selectedGame ? selectedGame.type : null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Quiz Battle & Speed Challenge states
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  // Match the Concept states
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchWrong, setMatchWrong] = useState<boolean>(false);

  // Memory Match states
  interface MemoryCard {
    id: string;
    text: string;
    pairKey: string;
    isConcept: boolean;
    isFlipped: boolean;
    isMatched: boolean;
  }
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  // Scenario Challenge states
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswer, setScenarioAnswer] = useState<number | null>(null);
  const [showScenarioHint, setShowScenarioHint] = useState(false);
  const [scenarioSubmitted, setScenarioSubmitted] = useState(false);

  // True / False states
  const [tfIndex, setTfIndex] = useState(0);
  const [tfSelected, setTfSelected] = useState<boolean | null>(null);
  const [tfFeedback, setTfFeedback] = useState<boolean | null>(null);

  // Level Challenge stage (1 to 5)
  const [currentStage, setCurrentStage] = useState(1);

  // Select game handler
  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    setGameMode(game.type);
    resetGameState(game.type);
  };

  const resetGameState = (type: string) => {
    setQuizIndex(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setTimeLeft(type === 'speed_challenge' ? 60 : 15);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setGameOver(false);
    setEarnedXP(0);
    setMatchedPairs([]);
    setSelectedConcept(null);
    setScenarioIndex(0);
    setScenarioAnswer(null);
    setShowScenarioHint(false);
    setScenarioSubmitted(false);
    setTfIndex(0);
    setTfSelected(null);
    setTfFeedback(null);
    setCurrentStage(1);

    if (type === 'memory_match') {
      initializeMemoryMatch();
    }
  };

  // Timer for Quiz Battle & Speed Challenge
  useEffect(() => {
    if (!gameMode || gameOver || isAnswerRevealed) return;
    if (gameMode !== 'quiz_battle' && gameMode !== 'speed_challenge') return;

    if (timeLeft <= 0) {
      if (gameMode === 'quiz_battle') {
        // Lost life on timeout
        handleQuizTimeout();
      } else if (gameMode === 'speed_challenge') {
        endGame(score * 15);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameMode, gameOver, isAnswerRevealed, score]);

  const handleQuizTimeout = () => {
    setIsAnswerRevealed(true);
    setStreak(0);
    const newLives = lives - 1;
    setLives(newLives);
    if (newLives <= 0) {
      endGame(score * 20);
    }
  };

  const endGame = (calculatedXp: number) => {
    setGameOver(true);
    const finalXp = Math.max(50, calculatedXp);
    setEarnedXP(finalXp);
    onRewardXP(finalXp);
    triggerCelebration();
  };

  // Questions for Quiz Battle & Speed
  const battleQuestions = [
    {
      q: "Which sampling technique guarantees representation across distinct sub-populations?",
      opts: ["Stratified Random Sampling", "Snowball Sampling", "Convenience Sampling", "Judgmental Sampling"],
      correct: 0,
      exp: "Stratified sampling divides the universe into homogeneous strata to minimize variance across sub-groups."
    },
    {
      q: "Under GSBPM, what is the primary objective of the 'Process' phase?",
      opts: ["Clean, code, validate and impute survey microdata", "Design survey questionnaires", "Conduct field interviews", "Publish press releases"],
      correct: 0,
      exp: "Phase 5 'Process' cleans data, detects outliers, and applies sampling weights."
    },
    {
      q: "What does CAPI stand for in modern official survey operations?",
      opts: ["Computer Assisted Personal Interviewing", "Central Agency Price Indicator", "Consumer Account Purchasing Index", "Census Auditing Protocol India"],
      correct: 0,
      exp: "CAPI equips field enumerators with tablets for real-time validation and GPS logging."
    },
    {
      q: "Why is the Geometric Mean favored over Arithmetic Mean in Elementary Price Aggregates?",
      opts: ["Satisfies the time reversal test and avoids upward substitution bias", "Takes less computational time", "Is mandated by the Constitution", "Ignores price fluctuations"],
      correct: 0,
      exp: "Jevons index (geometric mean) accounts for subtle consumer substitution when relative prices shift."
    },
    {
      q: "In National Accounts, what is the formula connecting GDP at Market Prices and GVA at Basic Prices?",
      opts: ["GDP = GVA + Product Taxes - Product Subsidies", "GDP = GVA - Taxes + Subsidies", "GDP = GVA × Multiplier", "GDP = GVA ÷ Population"],
      correct: 0,
      exp: "Product net indirect taxes bridge basic price production with final market acquisition value."
    }
  ];

  const handleSelectQuizOption = (optIdx: number) => {
    if (isAnswerRevealed || gameOver) return;
    setSelectedOption(optIdx);
    setIsAnswerRevealed(true);

    const isCorrect = optIdx === battleQuestions[quizIndex].correct;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 100 + (newStreak * 20);
      setScore(prev => prev + points);
    } else {
      setStreak(0);
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        endGame(score + 50);
        return;
      }
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex + 1 < battleQuestions.length) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setTimeLeft(15);
    } else {
      endGame(score + 100);
    }
  };

  // Match the Concept Setup
  const conceptPairs = [
    { id: 'p1', concept: 'Primary Sampling Unit (PSU)', def: 'First-stage cluster (Census village or Urban Frame Block)' },
    { id: 'p2', concept: 'Design Effect (Deff)', def: 'Ratio of complex survey variance to simple random sample variance' },
    { id: 'p3', concept: 'Sampling Multiplier', def: 'Inverse probability weight used to blow up sample to universe' },
    { id: 'p4', concept: 'Paradata', def: 'Auxiliary process data like interview duration and GPS audit timestamps' },
  ];

  const handleConceptClick = (conceptId: string) => {
    if (matchedPairs.includes(conceptId)) return;
    setSelectedConcept(conceptId);
    setMatchWrong(false);
  };

  const handleDefinitionClick = (defId: string) => {
    if (!selectedConcept) return;
    if (selectedConcept === defId) {
      // Matched!
      const nextMatched = [...matchedPairs, defId];
      setMatchedPairs(nextMatched);
      setSelectedConcept(null);
      setScore(prev => prev + 150);
      if (nextMatched.length === conceptPairs.length) {
        endGame(score + 250);
      }
    } else {
      // Wrong match
      setMatchWrong(true);
      setTimeout(() => {
        setSelectedConcept(null);
        setMatchWrong(false);
      }, 700);
    }
  };

  // Memory Match Setup
  const initializeMemoryMatch = () => {
    const rawPairs = [
      { key: 'm1', concept: 'GSBPM', def: 'Statistical Lifecycle Standard' },
      { key: 'm2', concept: 'PLFS', def: 'Periodic Labour Force Survey' },
      { key: 'm3', concept: 'CAPI', def: 'Tablet-Based Survey Collection' },
      { key: 'm4', concept: 'CPI', def: 'Retail Basket Inflation Gauge' },
    ];

    const cards: MemoryCard[] = [];
    rawPairs.forEach((p, idx) => {
      cards.push({
        id: `card-${idx}-concept`,
        text: p.concept,
        pairKey: p.key,
        isConcept: true,
        isFlipped: false,
        isMatched: false,
      });
      cards.push({
        id: `card-${idx}-def`,
        text: p.def,
        pairKey: p.key,
        isConcept: false,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    const shuffled = cards.sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedCardIds([]);
    setMemoryMoves(0);
  };

  const handleFlipCard = (card: MemoryCard) => {
    if (card.isFlipped || card.isMatched || flippedCardIds.length >= 2) return;

    const newCards = memoryCards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
    setMemoryCards(newCards);

    const newFlipped = [...flippedCardIds, card.id];
    setFlippedCardIds(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const firstCard = newCards.find(c => c.id === newFlipped[0])!;
      const secondCard = newCards.find(c => c.id === newFlipped[1])!;

      if (firstCard.pairKey === secondCard.pairKey) {
        // Matched!
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => c.pairKey === firstCard.pairKey ? { ...c, isMatched: true } : c));
          setFlippedCardIds([]);
          setScore(s => s + 100);

          // Check if all matched
          const totalMatched = newCards.filter(c => c.isMatched).length + 2;
          if (totalMatched >= newCards.length) {
            endGame(score + 300);
          }
        }, 500);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setMemoryCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c));
          setFlippedCardIds([]);
        }, 1000);
      }
    }
  };

  // Scenarios Setup
  const scenarios = [
    {
      title: "Suspicious Repetitive Entries in NSS Schedule",
      situation: "While inspecting household consumption returns uploaded from an urban cluster, you notice 15 consecutive households reporting identical monthly expenditures on edible oils down to the exact rupee. What is your supervisory response?",
      hint: "Remember that true household consumption exhibits natural variance based on family size and dietary habits.",
      options: [
        "Flag schedules for suspected enumerator fabrication and dispatch a senior supervisor for physical spot-audit.",
        "Accept data because retail oil prices in that urban ward are uniform across state outlets.",
        "Artificially alter numbers in the office using random variance formulas.",
        "Drop the entire urban ward from the national publication bulletin."
      ],
      correct: 0,
      exp: "Protocol requires immediate field re-interview verification whenever paradata or expenditure distributions suggest artificial survey fabrication."
    },
    {
      title: "Outlier in Price Quotations for CPI",
      situation: "During weekly CPI rural market data collection, one price reporter enters the price of rice at Rs. 450/kg instead of the normal Rs. 45/kg due to a misplaced decimal. How does the automated validation protocol handle this?",
      hint: "Consider both automated statistical tolerances and official sign-off protocols.",
      options: [
        "Flag quotation as an extreme 10x outlier, alert the field investigator, and request urgent confirmation or correction before base calculation.",
        "Automatically delete the rice entry from the state basket.",
        "Leave the quotation unchanged to reflect extreme market inflation.",
        "Shut down the market reporting portal."
      ],
      correct: 0,
      exp: "CPI data systems enforce tolerance bounds (e.g. ±20% monthly change); extreme spikes halt aggregation until verified by the state price supervisory desk."
    }
  ];

  // True or False Setup
  const tfQuestions = [
    {
      statement: "In official statistics, increasing the sample size automatically reduces non-sampling errors.",
      isTrue: false,
      exp: "Increasing sample size only reduces sampling error (variance). Non-sampling errors (e.g. interviewer bias, inaccurate measuring) may actually grow if field staff training is diluted."
    },
    {
      statement: "The Generic Statistical Business Process Model (GSBPM) standardizes production across 8 universal phases.",
      isTrue: true,
      exp: "GSBPM defines 8 phases: Specify Needs, Design, Build, Collect, Process, Analyse, Disseminate, and Evaluate."
    },
    {
      statement: "Under CAPI, interview timestamps and geolocation coordinates are stored as survey paradata.",
      isTrue: true,
      exp: "Paradata monitors interview speed, question durations, and physical location to ensure rigorous field survey fidelity."
    },
    {
      statement: "A Consumer Price Index (CPI) basket remains unchanged indefinitely without need for base year revisions.",
      isTrue: false,
      exp: "CPI baskets must undergo periodic base year revisions to reflect shifting consumer consumption patterns and new goods."
    }
  ];

  const handleTfAnswer = (ans: boolean) => {
    if (tfFeedback !== null) return;
    const currentQ = tfQuestions[tfIndex];
    const isCorrect = ans === currentQ.isTrue;
    setTfSelected(ans);
    setTfFeedback(isCorrect);
    if (isCorrect) {
      setScore(prev => prev + 80);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextTf = () => {
    if (tfIndex + 1 < tfQuestions.length) {
      setTfIndex(prev => prev + 1);
      setTfSelected(null);
      setTfFeedback(null);
    } else {
      endGame(score + 100);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      
      {/* Pragya Play Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-purple-300 text-xs font-bold border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>THE BIGGEST DIFFERENTIATOR</span>
              <span className="text-white/40">•</span>
              <span className="text-white">Learn Through Play</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
              Pragya Play
            </h1>

            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              "Learn through play with AI-powered educational games." Pragya AI converts dense official statistical methodologies into 7 interactive game modes that adapt difficulty and reward XP.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <span className="text-xs text-amber-300 font-bold flex items-center space-x-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>Earn up to +400 XP per game</span>
              </span>
              <span className="text-purple-300">•</span>
              <span className="text-xs text-slate-300">MoSPI Survey Protocols Grounded</span>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end justify-center gap-3 shrink-0">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 flex items-center space-x-1.5 transition-all"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span>{soundEnabled ? 'Game Audio: ON' : 'Game Audio: OFF'}</span>
            </button>

            {gameMode && (
              <button
                onClick={() => {
                  setGameMode(null);
                  setSelectedGame(null);
                }}
                className="px-4 py-2 rounded-xl bg-white text-purple-900 hover:bg-purple-50 font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Choose Another Game</span>
              </button>
            )}
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* GAME SELECTION HUB (If no active game chosen) */}
      {!gameMode && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">7 Interactive Game Modes</h2>
              <p className="text-xs text-slate-500">Pick a game mode to reinforce statistical concepts and boost your competency rating</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
              All 7 Modes Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => handleSelectGame(game)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700">
                      {game.type.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      +{game.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {game.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {game.description}
                  </p>

                  <div className="pt-2 flex items-center space-x-3 text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{game.duration}</span>
                    </span>
                    <span>•</span>
                    <span className="capitalize">{game.difficulty}</span>
                    <span>•</span>
                    <span className="text-indigo-600 font-semibold">{game.topic}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                  <span>Start Game</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GAME OVER CELEBRATION MODAL */}
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-200">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Victory! Game Completed
              </h3>
              <p className="text-xs text-slate-500">
                You conquered {selectedGame?.title || 'Pragya Play Game'}!
              </p>
            </div>

            {/* Score & XP Showcase */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Final Game Score</div>
                <div className="text-2xl font-extrabold text-purple-700 font-mono mt-0.5">{score}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Competency XP Earned</div>
                <div className="text-2xl font-extrabold text-amber-500 font-mono mt-0.5">+{earnedXP} XP</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>MoSPI Statistical Competency increased by +1.4%</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => resetGameState(gameMode || 'quiz_battle')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
              <button
                onClick={() => {
                  setGameOver(false);
                  setGameMode(null);
                  setSelectedGame(null);
                }}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-200 transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Back to Games Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE GAME 1: QUIZ BATTLE / SPEED CHALLENGE */}
      {(gameMode === 'quiz_battle' || gameMode === 'speed_challenge') && !gameOver && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Top Battle Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 text-white shadow-xs">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-purple-300">
                Question {quizIndex + 1} of {battleQuestions.length}
              </span>
              <span className="text-slate-600">|</span>
              <div className="flex items-center space-x-1 text-xs font-mono font-bold text-amber-400">
                <Trophy className="w-4 h-4" />
                <span>Score: {score}</span>
              </div>
            </div>

            {/* Lives (Hearts) for Quiz Battle */}
            {gameMode === 'quiz_battle' && (
              <div className="flex items-center space-x-1.5">
                <span className="text-xs text-slate-400 font-semibold mr-1">Lives:</span>
                {[1, 2, 3].map((heart) => (
                  <Heart
                    key={heart}
                    className={`w-5 h-5 transition-all ${
                      heart <= lives ? 'text-rose-500 fill-rose-500' : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Streak & Timer */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs font-bold text-orange-400">
                <Flame className="w-4 h-4 fill-orange-400" />
                <span>{streak}x Combo</span>
              </div>

              <div className={`flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                timeLeft <= 5 ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-indigo-300'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Question Display */}
          <div className="space-y-4 max-w-3xl mx-auto py-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 text-center leading-relaxed">
              {battleQuestions[quizIndex].q}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {battleQuestions[quizIndex].opts.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === battleQuestions[quizIndex].correct;
                let btnStyle = "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200";

                if (isAnswerRevealed) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 border-rose-500 text-rose-800";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectQuizOption(optIdx)}
                    disabled={isAnswerRevealed}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all flex items-start space-x-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box on reveal */}
            {isAnswerRevealed && (
              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                <strong className="text-indigo-700">Official Statistical Rationale:</strong>
                <p>{battleQuestions[quizIndex].exp}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuizQuestion}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center space-x-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ACTIVE GAME 2: MATCH THE CONCEPT */}
      {gameMode === 'match_concept' && !gameOver && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Match the Concept</h3>
              <p className="text-xs text-slate-500">Click a concept on the left, then click its corresponding definition on the right.</p>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700">
                Matched: {matchedPairs.length} / {conceptPairs.length}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800">
                Score: {score}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Concepts Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Statistical Concepts</h4>
              {conceptPairs.map((p) => {
                const isMatched = matchedPairs.includes(p.id);
                const isSelected = selectedConcept === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => !isMatched && handleConceptClick(p.id)}
                    className={`p-4 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 cursor-default'
                        : isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{p.concept}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                );
              })}
            </div>

            {/* Definitions Column (shuffled order for challenge) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Definitions</h4>
              {[...conceptPairs].reverse().map((p) => {
                const isMatched = matchedPairs.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => !isMatched && handleDefinitionClick(p.id)}
                    className={`p-4 rounded-2xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 cursor-default'
                        : matchWrong && selectedConcept
                        ? 'bg-rose-50 border-rose-300 text-rose-800 animate-shake'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{p.def}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
            <span>Pairs matched correctly earn +150 XP and elevate official statistical competency.</span>
            <button
              onClick={() => resetGameState('match_concept')}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Game</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE GAME 3: MEMORY MATCH */}
      {gameMode === 'memory_match' && !gameOver && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Memory Match</h3>
              <p className="text-xs text-slate-500">Flip cards to pair official statistical acronyms with their full definitions.</p>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700">
                Moves: {memoryMoves}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800">
                Score: {score}
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto py-4">
            {memoryCards.map((card) => {
              const isVisible = card.isFlipped || card.isMatched;
              return (
                <div
                  key={card.id}
                  onClick={() => handleFlipCard(card)}
                  className={`h-28 rounded-2xl border p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 select-none ${
                    card.isMatched
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold opacity-80'
                      : isVisible
                      ? 'bg-white border-indigo-600 text-slate-900 font-semibold shadow-md'
                      : 'bg-gradient-to-br from-indigo-700 to-purple-800 border-indigo-900 text-white shadow-xs hover:scale-102'
                  }`}
                >
                  {isVisible ? (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-indigo-600">
                        {card.isConcept ? 'Concept' : 'Definition'}
                      </span>
                      <p className="text-xs font-bold leading-tight line-clamp-3">
                        {card.text}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-1 text-purple-200">
                      <Gamepad2 className="w-6 h-6" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">PRAGYA</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => resetGameState('memory_match')}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Shuffle Cards</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE GAME 4: SCENARIO CHALLENGE */}
      {gameMode === 'scenario_challenge' && !gameOver && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                Dilemma {scenarioIndex + 1} of {scenarios.length}
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display mt-1">
                {scenarios[scenarioIndex].title}
              </h3>
            </div>
            <button
              onClick={() => setShowScenarioHint(!showScenarioHint)}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 flex items-center space-x-1.5 transition-all"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{showScenarioHint ? 'Hide Hint' : 'Ask Pragya Hint'}</span>
            </button>
          </div>

          {/* Hint alert */}
          {showScenarioHint && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>{scenarios[scenarioIndex].hint}</p>
            </div>
          )}

          {/* Scenario narrative */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            "{scenarios[scenarioIndex].situation}"
          </div>

          {/* Action options */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Supervisory Action</h4>
            {scenarios[scenarioIndex].options.map((opt, optIdx) => {
              const isSelected = scenarioAnswer === optIdx;
              const isCorrect = optIdx === scenarios[scenarioIndex].correct;
              let style = "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200";

              if (scenarioSubmitted) {
                if (isCorrect) style = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
                else if (isSelected) style = "bg-rose-50 border-rose-500 text-rose-800";
              } else if (isSelected) {
                style = "bg-indigo-50 border-indigo-600 text-indigo-700 font-bold";
              }

              return (
                <button
                  key={opt}
                  onClick={() => !scenarioSubmitted && setScenarioAnswer(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start space-x-3 ${style}`}
                >
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Rationale feedback */}
          {scenarioSubmitted && (
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-1">
              <strong className="text-indigo-700">Official MoSPI Protocol Explanation:</strong>
              <p>{scenarios[scenarioIndex].exp}</p>
            </div>
          )}

          {/* Action bar */}
          <div className="pt-2 flex justify-between items-center border-t border-slate-100">
            <span className="text-xs text-slate-500">Correct dilemma solutions directly build supervisory paradata audit competencies.</span>
            {!scenarioSubmitted ? (
              <button
                onClick={() => {
                  setScenarioSubmitted(true);
                  if (scenarioAnswer === scenarios[scenarioIndex].correct) {
                    setScore(s => s + 200);
                  }
                }}
                disabled={scenarioAnswer === null}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 disabled:opacity-50"
              >
                Submit Decision
              </button>
            ) : (
              <button
                onClick={() => {
                  if (scenarioIndex + 1 < scenarios.length) {
                    setScenarioIndex(prev => prev + 1);
                    setScenarioAnswer(null);
                    setScenarioSubmitted(false);
                    setShowScenarioHint(false);
                  } else {
                    endGame(score + 150);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 flex items-center space-x-1.5"
              >
                <span>{scenarioIndex + 1 < scenarios.length ? 'Next Dilemma' : 'Complete Challenge'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ACTIVE GAME 5: TRUE OR FALSE */}
      {gameMode === 'true_or_false' && !gameOver && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                Statement {tfIndex + 1} of {tfQuestions.length}
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display mt-1">
                Fast-Fire True or False
              </h3>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold">
              <span className="text-orange-600 flex items-center space-x-1">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>{streak} Streak</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800">
                Score: {score}
              </span>
            </div>
          </div>

          <div className="py-8 max-w-2xl mx-auto text-center space-y-6">
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
              "{tfQuestions[tfIndex].statement}"
            </h4>

            {/* True / False Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => handleTfAnswer(true)}
                disabled={tfFeedback !== null}
                className={`px-8 py-4 rounded-2xl text-base font-bold transition-all shadow-md flex items-center space-x-2 ${
                  tfSelected === true
                    ? tfFeedback
                      ? 'bg-emerald-600 text-white shadow-emerald-200'
                      : 'bg-rose-600 text-white shadow-rose-200'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>TRUE</span>
              </button>

              <button
                onClick={() => handleTfAnswer(false)}
                disabled={tfFeedback !== null}
                className={`px-8 py-4 rounded-2xl text-base font-bold transition-all shadow-md flex items-center space-x-2 ${
                  tfSelected === false
                    ? tfFeedback
                      ? 'bg-emerald-600 text-white shadow-emerald-200'
                      : 'bg-rose-600 text-white shadow-rose-200'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                }`}
              >
                <XCircle className="w-5 h-5" />
                <span>FALSE</span>
              </button>
            </div>

            {/* Feedback Explanation */}
            {tfFeedback !== null && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 text-left">
                <strong className={tfFeedback ? 'text-emerald-700' : 'text-rose-700'}>
                  {tfFeedback ? '✓ Correct Rationale:' : '✗ Incorrect Rationale:'}
                </strong>
                <p>{tfQuestions[tfIndex].exp}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextTf}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-1"
                  >
                    <span>Next Statement</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ACTIVE GAME 7: LEVEL CHALLENGE */}
      {gameMode === 'level_challenge' && !gameOver && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Level Challenge</h3>
              <p className="text-xs text-slate-500">5-stage difficulty ascent: Graduate from Trainee to Chief Official Statistician.</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold">
              Stage {currentStage} of 5
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 py-4">
            {[
              { lvl: 1, title: 'Trainee Officer', xp: 50 },
              { lvl: 2, title: 'Survey Assistant', xp: 100 },
              { lvl: 3, title: 'Statistical Officer', xp: 180 },
              { lvl: 4, title: 'Senior Analyst', xp: 260 },
              { lvl: 5, title: 'Chief Statistician', xp: 400 },
            ].map((stg) => (
              <div
                key={stg.lvl}
                className={`p-4 rounded-2xl border text-center space-y-1 ${
                  stg.lvl === currentStage
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300'
                    : stg.lvl < currentStage
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider">Level {stg.lvl}</div>
                <div className="text-xs font-bold">{stg.title}</div>
                <div className="text-[10px] font-mono">+{stg.xp} XP</div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <h4 className="text-base font-bold text-slate-900">
              Active Stage {currentStage}: Master sampling multipliers and paradata verification
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Pass this stage assessment with 80% accuracy or higher to advance to the next professional level.
            </p>
            <button
              onClick={() => {
                if (currentStage < 5) {
                  setCurrentStage(prev => prev + 1);
                  setScore(s => s + 150);
                } else {
                  endGame(score + 400);
                }
              }}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all inline-flex items-center space-x-2"
            >
              <span>{currentStage < 5 ? `Pass Stage ${currentStage} Assessment` : 'Complete Level Challenge'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
