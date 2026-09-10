import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Clock, 
  Check, 
  FileText, 
  Sparkles, 
  Gamepad2, 
  HelpCircle, 
  Eye,
  Filter
} from 'lucide-react';

interface ReviewItem {
  id: string;
  title: string;
  contentType: 'quiz' | 'game' | 'summary' | 'concept_taxonomy';
  sourceMaterial: string;
  generatedBy: string;
  generatedAt: string;
  status: 'pending' | 'approved' | 'published' | 'rejected';
  summaryOrQuestion: string;
  reviewerNotes?: string;
}

export const ContentReview: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved' | 'published' | 'rejected'>('pending');
  const [items, setItems] = useState<ReviewItem[]>([
    {
      id: 'rev-1',
      title: 'MCQ Pack: Inverse Probability Weighting in NSS 78th Round',
      contentType: 'quiz',
      sourceMaterial: 'NSS 78th Round Manual on Multiple Indicator Survey.pdf',
      generatedBy: 'Gemini 3.8 Flash',
      generatedAt: '2026-09-09 14:20',
      status: 'pending',
      summaryOrQuestion: '4 multiple-choice questions evaluating sub-sample multiplier derivation for rural primary sampling units (Census villages).',
    },
    {
      id: 'rev-2',
      title: 'Scenario Challenge: CPI Rural Quotation Outlier Verification',
      contentType: 'game',
      sourceMaterial: 'Consumer Price Index (CPI) Methodology Handbook.pdf',
      generatedBy: 'Gemini 3.8 Flash',
      generatedAt: '2026-09-09 16:45',
      status: 'pending',
      summaryOrQuestion: 'Workplace dilemma where enumerator logs 10x grain price jump; tests supervisor spot audit protocols.',
    },
    {
      id: 'rev-3',
      title: 'GSBPM Standard Phase 5 Processing Vocabulary',
      contentType: 'concept_taxonomy',
      sourceMaterial: 'GSBPM Implementation Standard.docx',
      generatedBy: 'Gemini 3.8 Flash',
      generatedAt: '2026-09-08 11:10',
      status: 'approved',
      summaryOrQuestion: '12 core concepts mapped into MoSPI competency ontology (imputation, micro-editing, validation rules).',
    },
    {
      id: 'rev-4',
      title: 'Speed Quiz: CAPI Paradata & Tablet Interview Timing',
      contentType: 'game',
      sourceMaterial: 'PLFS Operational Manual.pdf',
      generatedBy: 'Gemini 3.8 Flash',
      generatedAt: '2026-09-07 09:30',
      status: 'published',
      summaryOrQuestion: 'Rapid 60-second challenge testing enumerator speed-running thresholds and GPS geotagging rules.',
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: 'approved' | 'published' | 'rejected') => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const filteredItems = items.filter(item => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Human-in-the-Loop Quality Assurance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Content Review & Approval Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl leading-relaxed">
            AI Generated Content → Faculty Review → Approve / Edit / Reject → Publish. Guarantees 100% domain fidelity with official MoSPI and NASA statistical standards.
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center shrink-0">
          <span className="text-[10px] text-indigo-300 font-semibold">Pending Human Audit</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-0.5">
            {items.filter(i => i.status === 'pending').length} Items
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        {(['pending', 'approved', 'published', 'rejected', 'all'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl capitalize transition-all ${
              activeFilter === tab
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab === 'all' ? 'All Content' : tab} ({items.filter(i => tab === 'all' ? true : i.status === tab).length})
          </button>
        ))}
      </div>

      {/* Review Cards Grid */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.contentType === 'quiz' ? 'bg-blue-100 text-blue-800' :
                    item.contentType === 'game' ? 'bg-purple-100 text-purple-800' :
                    'bg-indigo-100 text-indigo-800'
                  }`}>
                    {item.contentType.replace('_', ' ')}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'published' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    Status: {item.status.toUpperCase()}
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono">
                    Model: {item.generatedBy}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-display">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.summaryOrQuestion}
                </p>

                <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
                  <span>Source: <strong>{item.sourceMaterial}</strong></span>
                  <span>•</span>
                  <span>Generated: {item.generatedAt}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 pt-2 sm:pt-0">
                {item.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'published')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'rejected')}
                      className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-all flex items-center justify-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject / Revise</span>
                    </button>
                  </>
                )}

                {item.status === 'approved' && (
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'published')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Deploy to Live Catalog</span>
                  </button>
                )}

                {item.status === 'published' && (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center space-x-1 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live in Pragya AI</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
