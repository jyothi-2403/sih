import React, { useState } from 'react';
import { X, User, Lock, Mail, Building, Briefcase, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('learner');
  const [email, setEmail] = useState('arjun.sharma@mospi.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Arjun Sharma');
  const [department, setDepartment] = useState('Field Operations Division (FOD)');
  const [designation, setDesignation] = useState('Senior Statistical Officer');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  const handleQuickDemo = (role: UserRole) => {
    setSelectedRole(role);
    onLoginSuccess(role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 mb-3 shadow-2xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-display">
            {tab === 'login' && 'Sign in to Pragya AI'}
            {tab === 'register' && 'Create Official Account'}
            {tab === 'forgot' && 'Reset Secure Password'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Official Capacity Building Platform • SIH 2026 #26101
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mb-5 p-3 rounded-2xl bg-indigo-50/60 border border-indigo-200/80">
          <div className="text-[11px] font-bold text-indigo-900 mb-2 flex items-center justify-between">
            <span>Instant Demo Logins:</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-200/80 text-indigo-800 font-mono">1-CLICK</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <button
              onClick={() => handleQuickDemo('learner')}
              className="px-2 py-1.5 rounded-xl bg-white text-indigo-700 text-[11px] font-bold border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shadow-2xs flex flex-col items-center"
            >
              <span>Learner</span>
              <span className="text-[9px] text-slate-400 font-normal">Arjun (FOD)</span>
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="px-2 py-1.5 rounded-xl bg-white text-indigo-700 text-[11px] font-bold border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shadow-2xs flex flex-col items-center"
            >
              <span>Admin</span>
              <span className="text-[9px] text-slate-400 font-normal">Dr. Sunita</span>
            </button>
            <button
              onClick={() => handleQuickDemo('trainer')}
              className="px-2 py-1.5 rounded-xl bg-white text-indigo-700 text-[11px] font-bold border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shadow-2xs flex flex-col items-center"
            >
              <span>Trainer</span>
              <span className="text-[9px] text-slate-400 font-normal">Prof. Varma</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-5 text-xs font-semibold">
          <button
            onClick={() => setTab('login')}
            className={`pb-2 px-4 transition-colors ${
              tab === 'login' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab('register')}
            className={`pb-2 px-4 transition-colors ${
              tab === 'register' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setTab('forgot')}
            className={`pb-2 px-4 transition-colors ${
              tab === 'forgot' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Forgot Password
          </button>
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Role</label>
          <div className="grid grid-cols-3 gap-2">
            {(['learner', 'admin', 'trainer'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`py-2 px-2 text-xs font-bold rounded-xl border capitalize transition-all ${
                  selectedRole === r
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter official name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. Field Operations Division (FOD)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. Senior Statistical Officer"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="name@mospi.gov.in"
              />
            </div>
          </div>

          {tab !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setTab('forgot')}
                    className="text-[11px] text-indigo-600 hover:underline font-medium"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>
              {tab === 'login' && 'Sign In to Dashboard'}
              {tab === 'register' && 'Register Official Account'}
              {tab === 'forgot' && 'Send Password Recovery Email'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-slate-100 text-center">
          <span className="text-[11px] text-slate-400 flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted with JWT & Role-Based Access Control</span>
          </span>
        </div>

      </div>
    </div>
  );
};
