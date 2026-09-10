import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Database, 
  RefreshCw, 
  Gamepad2, 
  HelpCircle,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { LearningMaterial } from '../types';

interface AIContentStudioProps {
  materials: LearningMaterial[];
  onUploadMaterial: (newMat: LearningMaterial) => void;
  onGenerateQuizFromMaterial: (material: LearningMaterial) => void;
  onGenerateGameFromMaterial: (material: LearningMaterial) => void;
}

export const AIContentStudio: React.FC<AIContentStudioProps> = ({
  materials,
  onUploadMaterial,
  onGenerateQuizFromMaterial,
  onGenerateGameFromMaterial,
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(materials[0] || null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPipelineStep, setCurrentPipelineStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const pipelineSteps = [
    { step: 1, name: 'Upload', desc: 'Secure multipart ingestion' },
    { step: 2, name: 'Text Extraction', desc: 'PDF / Office parser' },
    { step: 3, name: 'OCR Pipeline', desc: 'Hindi & English bilingual OCR' },
    { step: 4, name: 'Content Cleaning', desc: 'Remove headers, footers & noise' },
    { step: 5, name: 'Semantic Chunking', desc: '512-token overlap splits' },
    { step: 6, name: 'Vector Embedding', desc: 'ChromaDB collection insertion' },
    { step: 7, name: 'Concept Extraction', desc: 'Statistical ontology taxonomy' },
    { step: 8, name: 'Summary Gen', desc: 'Gemini synthesis' },
    { step: 9, name: 'Quiz Synthesis', desc: 'MCQ generation with distractors' },
    { step: 10, name: 'Game Synthesis', desc: 'Pragya Play packs generation' },
  ];

  const handleSimulatedUpload = async (docTitle: string, fileType: 'pdf' | 'docx' | 'txt') => {
    setIsProcessing(true);
    setCurrentPipelineStep(1);

    for (let i = 1; i <= 10; i++) {
      setCurrentPipelineStep(i);
      await new Promise(r => setTimeout(r, 250));
    }

    const newDoc: LearningMaterial = {
      id: `mat-${Date.now()}`,
      title: docTitle,
      fileName: `${docTitle.toLowerCase().replace(/\s+/g, '_')}.${fileType}`,
      fileType,
      fileSize: '4.2 MB',
      uploadedBy: 'Dr. Sunita Rao (NASA)',
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'ready',
      chunksCount: 18,
      conceptsExtracted: [
        'Survey Design & Sampling Multipliers',
        'Inverse Probability Weights',
        'Paradata Geo-Auditing',
        'Consumer Expenditure Distribution',
      ],
      summary: `Automated analysis of ${docTitle}: Formulates rigorous supervisory and sampling standards for Indian statistical surveys, establishing strict validation rules against artificial data fabrication and non-sampling biases.`,
      generatedQuizzesCount: 4,
      generatedGamesCount: 2,
    };

    onUploadMaterial(newDoc);
    setSelectedMaterial(newDoc);
    setIsProcessing(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleSimulatedUpload(file.name.replace(/\.[^/.]+$/, ""), 'pdf');
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Content Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Learning Material Processing Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Upload official manuals, guidelines, and survey circulars (PDF, PPT, DOCX). Pragya AI automatically extracts text, performs semantic chunking for ChromaDB, and generates adaptive quizzes and interactive games.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center shrink-0">
          <span className="text-[10px] text-indigo-300 font-mono">VECTOR DATABASE</span>
          <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center justify-center space-x-1.5">
            <Database className="w-4 h-4" />
            <span>ChromaDB Ready</span>
          </div>
          <span className="text-[10px] text-slate-400">Collection: mospi_materials</span>
        </div>
      </div>

      {/* Upload Zone & Quick Sample Ingestion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Drag & Drop Upload Zone (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 font-display">Upload New Official Document</h3>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-indigo-600 bg-indigo-50/60'
                : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <Upload className="w-7 h-7" />
            </div>

            <h4 className="text-sm font-bold text-slate-900">Drag & Drop survey schedules or training documents here</h4>
            <p className="text-xs text-slate-500 mt-1">Supports PDF, PPT, PPTX, DOC, DOCX, TXT (up to 50MB)</p>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => handleSimulatedUpload("PLFS Field Inspection Manual", "pdf")}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all inline-flex items-center space-x-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Select Document from Device</span>
              </button>
            </div>
          </div>

          {/* 1-Click Preloaded Government Samples */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-700">1-Click Test with MoSPI Official Standards:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSimulatedUpload("NSS 78th Round Manual on Multiple Indicator Survey", "pdf")}
                className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-left border border-slate-200 hover:border-indigo-200 transition-all"
              >
                <span className="text-[9px] font-bold uppercase text-indigo-600">Sample PDF</span>
                <p className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">NSS 78th Round Manual</p>
                <span className="text-[10px] text-slate-400">Survey Schedule 21.1</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulatedUpload("Consumer Price Index (CPI) Methodology Handbook", "pdf")}
                className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-left border border-slate-200 hover:border-indigo-200 transition-all"
              >
                <span className="text-[9px] font-bold uppercase text-purple-600">Sample PDF</span>
                <p className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">CPI Methodology Guide</p>
                <span className="text-[10px] text-slate-400">Basket & Price Indices</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulatedUpload("GSBPM Implementation Standard for Statistical Operations", "docx")}
                className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-left border border-slate-200 hover:border-indigo-200 transition-all"
              >
                <span className="text-[9px] font-bold uppercase text-blue-600">Sample DOCX</span>
                <p className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">GSBPM Standard Lifecycle</p>
                <span className="text-[10px] text-slate-400">UNECE / MoSPI Framework</span>
              </button>
            </div>
          </div>

        </div>

        {/* Live 10-Step Pipeline Visualizer (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">10-Step Ingestion Pipeline</h3>
            {isProcessing && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 animate-pulse">
                Processing Step {currentPipelineStep}/10
              </span>
            )}
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {pipelineSteps.map((step) => {
              const isDone = currentPipelineStep > step.step || (!isProcessing && selectedMaterial?.status === 'ready');
              const isCurrent = currentPipelineStep === step.step && isProcessing;

              return (
                <div
                  key={step.step}
                  className={`p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : isCurrent
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold scale-102'
                      : 'bg-slate-50 border-slate-200/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isDone ? '✓' : step.step}
                    </span>
                    <span className="font-semibold">{step.name}</span>
                  </div>
                  <span className="text-[10px] opacity-75">{step.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Processed Material Details & AI Generation Triggers */}
      {selectedMaterial && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Status: Ready & Indexed
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">{selectedMaterial.fileName}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display mt-1">
                {selectedMaterial.title}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onGenerateQuizFromMaterial(selectedMaterial)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center space-x-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Generate MCQs with Gemini</span>
              </button>
              <button
                onClick={() => onGenerateGameFromMaterial(selectedMaterial)}
                className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition-all flex items-center space-x-1.5"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Generate Pragya Games</span>
              </button>
            </div>
          </div>

          {/* Material Summary & Extracted Concepts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">AI Synthesized Executive Summary</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedMaterial.summary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Extracted Competency Concepts</h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedMaterial.conceptsExtracted.map((concept) => (
                  <span key={concept} className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-semibold">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
