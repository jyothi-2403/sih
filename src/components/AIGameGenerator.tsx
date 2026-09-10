import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  Layers, 
  FileText 
} from 'lucide-react';
import { LearningMaterial, Game } from '../types';

interface AIGameGeneratorProps {
  materials: LearningMaterial[];
  preloadedMaterial?: LearningMaterial | null;
  onPublishGame: (game: Partial<Game>) => void;
}

export const AIGameGenerator: React.FC<AIGameGeneratorProps> = ({
  materials,
  preloadedMaterial,
  onPublishGame,
}) => {
  const [gameType, setGameType] = useState<'match_concept' | 'scenario_challenge' | 'true_or_false' | 'quiz_battle'>('match_concept');
  const [topic, setTopic] = useState(preloadedMaterial?.title || 'Survey Sampling & CAPI Paradata');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedMatId, setSelectedMatId] = useState(preloadedMaterial?.id || materials[0]?.id || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [published, setPublished] = useState(false);

  const [generatedGame, setGeneratedGame] = useState<any>({
    title: 'Match: Key Statistical Concepts',
    type: 'match_concept',
    pairs: [
      { concept: 'Primary Sampling Unit', definition: 'First-stage cluster such as Census Village or Urban Frame Block' },
      { concept: 'Design Effect (Deff)', definition: 'Ratio of complex sample variance to simple random sample variance' },
      { concept: 'Sampling Multiplier', definition: 'Inverse probability weight used to compute universe aggregates' },
      { concept: 'CAPI Paradata', definition: 'Auxiliary interview timestamps and spatial coordinates' },
    ],
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPublished(false);
    try {
      const selectedMat = materials.find(m => m.id === selectedMatId);
      const res = await fetch('/api/ai/generate-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: gameType,
          topic,
          difficulty,
          materialText: selectedMat?.summary || topic,
        }),
      });
      const data = await res.json();
      if (data.game) {
        setGeneratedGame(data.game);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    onPublishGame({
      id: `game-gen-${Date.now()}`,
      title: generatedGame.title || `Pragya Play: ${topic}`,
      description: `AI-synthesized game reinforcing ${topic} official statistical protocols.`,
      type: gameType,
      difficulty,
      xpReward: 250,
      duration: '5 mins',
      topic,
    });
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-purple-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Game Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            AI Game Pack Generator
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
            Automatically transform official statistical manuals into 7 interactive Pragya Play mini-games: Concept Match, Scenario Dilemmas, and True/False blitzes.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating Game Pack...' : 'Synthesize Game Pack'}</span>
        </button>
      </div>

      {/* Configuration Matrix */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Game Generator Settings</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Game Mode</label>
            <select
              value={gameType}
              onChange={(e: any) => setGameType(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            >
              <option value="match_concept">Match the Concept</option>
              <option value="scenario_challenge">Scenario Challenge</option>
              <option value="true_or_false">True or False Blitz</option>
              <option value="quiz_battle">Quiz Battle Duel</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              placeholder="e.g. CPI Basket Imputation"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Reference Material</label>
            <select
              value={selectedMatId}
              onChange={(e) => setSelectedMatId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            >
              {materials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Generated Game Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              Preview: {gameType.replace('_', ' ')}
            </span>
            <h3 className="text-base font-bold text-slate-900 font-display mt-1">
              {generatedGame.title || topic}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            {published && (
              <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1 animate-pulse">
                <Check className="w-4 h-4" />
                <span>Published to Pragya Play!</span>
              </span>
            )}
            <button
              onClick={handlePublish}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-200 transition-all flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish to Pragya Play Hub</span>
            </button>
          </div>
        </div>

        {/* Display generated elements depending on type */}
        {gameType === 'match_concept' && generatedGame.pairs && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated Concept Pairs</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {generatedGame.pairs.map((p: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-purple-700">{p.concept}</span>
                  <p className="text-[11px] text-slate-600">{p.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameType === 'scenario_challenge' && generatedGame.scenarios && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated Workplace Dilemmas</h4>
            {generatedGame.scenarios.map((sc: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-slate-900">"{sc.situation}"</p>
                <div className="pl-3 border-l-2 border-indigo-400 space-y-1">
                  <span className="text-indigo-700 font-semibold">Correct Protocol Action:</span>
                  <p className="text-slate-700">{sc.options ? sc.options[sc.correctOption || 0] : 'Standard verification protocol applies.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {gameType === 'true_or_false' && generatedGame.items && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated Statements</h4>
            {generatedGame.items.map((item: any, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800">"{item.statement}"</span>
                <span className={`px-2 py-0.5 rounded font-bold ${item.isTrue ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {item.isTrue ? 'TRUE' : 'FALSE'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
