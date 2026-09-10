import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { AssistantMessage } from '../types';

interface PragyaAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateCourse?: (courseId: string) => void;
}

export const PragyaAssistantModal: React.FC<PragyaAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateCourse,
}) => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Namaste! I am your Pragya AI Statistical Assistant. Ask me anything about Indian Official Statistics, MoSPI sampling manuals, CAPI field inspection, or recommended iGOT Karmayogi modules to close your competency gaps.',
      timestamp: 'Just now',
      citations: ['MoSPI GSBPM Standard v2.1', 'NSS 78th Round Manual'],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'How are sampling multipliers calculated in NSS surveys?',
    'What is CAPI paradata and how does it detect speed-running?',
    'Explain the differences between CPI and WPI in India',
    'Which iGOT course helps me master Python for statistics?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          context: 'User is a Junior Statistical Officer in MoSPI preparing for CAPI audits and sample weighting.',
        }),
      });
      const data = await response.json();

      const assistantMsg: AssistantMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Official statistical protocols require adherence to MoSPI operational standards.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || ['MoSPI Official Standard Handbook'],
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: AssistantMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: 'In Indian official surveys, sampling weights represent inverse selection probabilities. For CAPI audits, timestamp paradata confirms interview integrity.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: ['NSS Survey Handbook 2026'],
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[650px] max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 border border-white/10 shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm text-white font-display">Pragya AI Assistant</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  MoSPI Grounded
                </span>
              </div>
              <p className="text-[11px] text-indigo-200">Statistical Knowledge & iGOT Recommender</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white shadow-xs rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs space-y-2'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 mt-2 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-700 block">
                      Grounded Official Sources:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.citations.map((c, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 text-[10px] font-semibold border border-indigo-100"
                        >
                          📄 {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`text-[9px] text-right mt-1 ${
                    msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-slate-500 text-xs pl-9">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></div>
              <span className="text-[11px] font-medium text-slate-400">Consulting MoSPI official manuals...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Prompts */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Quick Queries:</span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-[11px] font-medium shrink-0 transition-colors border border-slate-200"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about sampling formulas, CAPI rules, or iGOT modules..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center space-x-1.5 disabled:opacity-50"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
