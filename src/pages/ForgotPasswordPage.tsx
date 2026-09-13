import React, { useState } from 'react';
import { PageId } from '../types';

interface ForgotPasswordPageProps {
  onNavigate: (page: PageId) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 text-center">
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

        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[26px]">key_off</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">Reset Agency Key</h1>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Authorized personnel can request an account recovery link sent to their designated work email.
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            If an account matches that verified provider address, a re-keying invitation has been dispatched.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Registered Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="counselor@hospital.org"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Send Secure Reset Link
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
          <button
            onClick={() => onNavigate('login')}
            className="text-teal-800 font-bold hover:underline"
          >
            ← Back to Login
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('landing')}
            className="hover:text-slate-800"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};
