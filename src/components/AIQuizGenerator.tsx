import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  ArrowRight, 
  Check, 
  Layers,
  FileText
} from 'lucide-react';
import { QuizQuestion, LearningMaterial } from '../types';

interface AIQuizGeneratorProps {
  materials: LearningMaterial[];
  preloadedMaterial?: LearningMaterial | null;
  onPublishQuiz: (newQuiz: { title: string; topic: string; questions: QuizQuestion[] }) => void;
}

export const AIQuizGenerator: React.FC<AIQuizGeneratorProps> = ({
  materials,
  preloadedMaterial,
  onPublishQuiz,
}) => {
  const [topic, setTopic] = useState(preloadedMaterial ? preloadedMaterial.title : 'Survey Sampling & CAPI Paradata');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [count, setCount] = useState(4);
  const [selectedMatId, setSelectedMatId] = useState(preloadedMaterial?.id || materials[0]?.id || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [publishedNotification, setPublishedNotification] = useState(false);

  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([
    {
      id: 'gen-q-1',
      question: 'In official household sample surveys, why are sub-sample weights (multipliers) applied to microdata records?',
      options: [
        'To inflate sample frequencies to represent the true population universe',
        'To artificially balance gender disparities in sample returns',
        'To conceal the personal identities of surveyed households',
        'To reduce computation storage in census databases'
      ],
      correctAnswer: 0,
      explanation: 'Sampling weights equal the reciprocal of the selection probability, ensuring mathematically unbiased parameter estimation.',
      difficulty: 'Medium',
      topic: 'Sampling Theory'
    },
    {
      id: 'gen-q-2',
      question: 'Under the Generic Statistical Business Process Model (GSBPM), which phase precedes "Process"?',
      options: ['Collect', 'Disseminate', 'Evaluate', 'Analyse'],
      correctAnswer: 0,
      explanation: 'GSBPM sequence is: Specify Needs -> Design -> Build -> Collect -> Process -> Analyse -> Disseminate -> Evaluate.',
      difficulty: 'Medium',
      topic: 'GSBPM Lifecycle'
    },
    {
      id: 'gen-q-3',
      question: 'What is the primary indicator used to audit enumerator interview duration and detect speed-running?',
      options: [
        'CAPI paradata timestamps for individual question modules',
        'Tablet battery drain rate',
        'Number of phone calls made by respondent',
        'Office arrival logbook'
      ],
      correctAnswer: 0,
      explanation: 'CAPI paradata captures millisecond timestamps per screen, highlighting abnormally rapid question transitions.',
      difficulty: 'Hard',
      topic: 'CAPI Quality Control'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPublishedNotification(false);
    try {
      const selectedMat = materials.find(m => m.id === selectedMatId);
      const response = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          difficulty,
          count,
          materialText: selectedMat ? selectedMat.summary : topic,
        }),
      });
      const data = await response.json();
      if (data.questions && Array.isArray(data.questions)) {
        setGeneratedQuestions(data.questions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    setGeneratedQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handlePublish = () => {
    onPublishQuiz({
      title: `AI Assessment: ${topic}`,
      topic,
      questions: generatedQuestions,
    });
    setPublishedNotification(true);
    setTimeout(() => setPublishedNotification(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-purple-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Server-Side Gemini Ingestion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            AI Quiz & MCQ Generator
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
            Generate rigorous multiple-choice assessments grounded directly in official statistical documents. Review, edit, and approve questions for immediate course deployment.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Synthesizing MCQs...' : 'Generate New Questions'}</span>
        </button>
      </div>

      {/* Control Configuration Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Generator Configuration</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              placeholder="e.g. Sampling Multipliers"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-1">
              {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    difficulty === d
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Source Material</label>
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

      {/* Generated Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-slate-900 font-display">Generated MCQs</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
              {generatedQuestions.length} Questions Ready
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {publishedNotification && (
              <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1 animate-pulse">
                <Check className="w-4 h-4" />
                <span>Published to Course Catalog!</span>
              </span>
            )}
            <button
              onClick={handlePublish}
              disabled={generatedQuestions.length === 0}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 transition-all flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve & Publish Quiz</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {generatedQuestions.map((q, qIdx) => (
            <div
              key={q.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      Question {qIdx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {q.difficulty}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {q.topic}
                    </span>
                  </div>

                  {editingId === q.id ? (
                    <div className="pt-2 space-y-2">
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-indigo-400 focus:outline-hidden"
                        rows={2}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setGeneratedQuestions(prev => prev.map(item => item.id === q.id ? { ...item, question: editedText } : item));
                            setEditingId(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <h4 className="text-sm font-bold text-slate-900 pt-1">
                      {q.question}
                    </h4>
                  )}
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingId(q.id);
                      setEditedText(q.question);
                    }}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Question"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isCorrect = optIdx === q.correctAnswer;
                  return (
                    <div
                      key={opt}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-slate-50 border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isCorrect && (
                        <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Statistical Explanation */}
              <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950 space-y-0.5">
                <strong className="text-indigo-700 font-bold">Explanation:</strong>
                <p className="text-slate-600">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
