import React, { useState } from 'react';
import { PageId } from '../types';
import { ASSETS } from '../data/mockData';

interface LoginPageProps {
  onNavigate: (page: PageId) => void;
  onLoginSuccess: (role: 'counselor' | 'admin' | 'survivor') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'counselor' | 'admin'>('counselor');

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
    } else {
      onNavigate('admin-portal');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Form (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">lock_person</span>
              <span>Sanctuary Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Sign in to access your authorized care portal or clinical oversight dashboard.
            </p>

            {/* Demo Auto-fill Bar */}
            <div className="mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Demo Role Fill:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDemoCounselor}
                  className="flex-1 py-1.5 px-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200/70 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Dr. Vance (Counselor)
                </button>
                <button
                  type="button"
                  onClick={handleDemoAdmin}
                  className="flex-1 py-1.5 px-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200/70 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Dir. Sharma (Admin)
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Access Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('counselor')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      role === 'counselor'
                        ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Licensed Counselor
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      role === 'admin'
                        ? 'bg-sky-50 border-sky-600 text-sky-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Regional Admin
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Encrypted Identity / Email</label>
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
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Don't have an agency account?</span>
            <button
              onClick={() => onNavigate('register')}
              className="text-teal-800 font-bold hover:underline"
            >
              Request Access →
            </button>
          </div>
        </div>

        {/* Right Visual (5 cols) */}
        <div className="md:col-span-5 bg-slate-900 p-8 flex flex-col justify-between relative overflow-hidden text-white">
          <img
            src={ASSETS.cryptoOrb}
            alt="Cryptographic orb visual"
            className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
          />
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-300 mb-4">
              <span className="material-symbols-outlined text-[24px]">vpn_key</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2">Zero-Trust Clinical Ingress</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every counselor credential is authenticated against multi-party computation nodes. No survivor PII is
              accessible until client approval is granted.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>TLS 1.3 Strict Mutual Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>FIPS 140-3 Hardware Token Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
