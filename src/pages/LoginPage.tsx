import React, { useState } from 'react';
import { PageId } from '../types';

interface LoginPageProps {
  onNavigate: (page: PageId) => void;
  onLoginSuccess: (role: 'counselor' | 'admin' | 'survivor') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'survivor' | 'counselor' | 'admin'>('survivor');

  const handleDemoSurvivor = () => {
    setEmail('demo.survivor@caresync.care');
    setPassword('••••••••••••');
    setRole('survivor');
  };

  const handleDemoCounselor = () => {
    setEmail('dr.vance@caresync.care');
    setPassword('••••••••••••');
    setRole('counselor');
  };

  const handleDemoAdmin = () => {
    setEmail('dir.sharma@caresync.gov');
    setPassword('••••••••••••');
    setRole('admin');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(role);
    if (role === 'counselor') {
      onNavigate('counselor-cases');
    } else if (role === 'admin') {
      onNavigate('admin-portal');
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10">
        {/* Centered clickable brand mark */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center justify-center gap-2.5 mx-auto mb-6 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#005c55] to-[#0f766e] flex items-center justify-center text-white shadow-sm shadow-teal-900/10 transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[19px]">spa</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0b1c30] group-hover:text-[#005c55] transition-colors">
            CareSync
          </span>
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]">lock_person</span>
            <span>Secure Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in to access your authorized care portal or clinical oversight dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Access Role</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('survivor')}
                className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  role === 'survivor'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Survivor
              </button>
              <button
                type="button"
                onClick={() => setRole('counselor')}
                className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  role === 'counselor'
                    ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Counselor
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  role === 'admin'
                    ? 'bg-sky-50 border-sky-600 text-sky-900 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Account Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@caresync.care"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Hardware Token / Passphrase</label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-[11px] font-semibold text-teal-700 hover:underline"
              >
                Forgot credentials?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Authenticate &amp; Open Portal
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">or</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        {/* Quick Demo Fill (secondary action) */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Quick Demo Role Fill
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDemoSurvivor}
              className="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/70 text-xs font-semibold transition-colors cursor-pointer"
            >
              Survivor
            </button>
            <button
              type="button"
              onClick={handleDemoCounselor}
              className="flex-1 py-1.5 px-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200/70 text-xs font-semibold transition-colors cursor-pointer"
            >
              Counselor
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="flex-1 py-1.5 px-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200/70 text-xs font-semibold transition-colors cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>Don't have an agency account?</span>
          <button
            onClick={() => onNavigate('register')}
            className="text-teal-800 font-bold hover:underline"
          >
            Request Access →
          </button>
        </div>
      </div>
    </div>
  );
};
