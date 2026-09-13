import React, { useState } from 'react';
import { PageId } from '../types';

interface RegisterPageProps {
  onNavigate: (page: PageId) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [accountType, setAccountType] = useState<'survivor' | 'counselor' | 'official'>('survivor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agencyCode, setAgencyCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
            <span>Registration &amp; Key Issuance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your CareSync Access
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Survivors can check in immediately without an account. Use this form if you wish to persist an encrypted
            vault or register as a care provider.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-[48px] text-[#005c55] mb-2">mark_email_read</span>
            <h3 className="text-lg font-bold text-slate-900">Encrypted Invitation Dispatched</h3>
            <p className="text-xs text-slate-600 mt-2 max-w-md leading-relaxed">
              We have generated your client-side key envelope. Please confirm via your provided relay handle to complete
              zero-knowledge initialization.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#005c55] text-white text-xs font-bold hover:bg-[#0f766e] transition-colors cursor-pointer"
            >
              Proceed to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Account Profile</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'survivor', label: 'Survivor Vault', icon: 'favorite' },
                  { id: 'counselor', label: 'Counselor', icon: 'medical_services' },
                  { id: 'official', label: 'Official / Admin', icon: 'verified_user' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAccountType(item.id as any)}
                    className={`py-3 px-2 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                      accountType === item.id
                        ? 'bg-teal-50 border-[#005c55] text-teal-950 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] mb-1">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {accountType === 'survivor' ? 'Discreet Handle or Email' : 'Professional Agency Email'}
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={accountType === 'survivor' ? 'discreet_user@relay.local' : 'counselor@hospital.org'}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {accountType !== 'survivor' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Agency Verification Code</label>
                <input
                  type="text"
                  required
                  value={agencyCode}
                  onChange={(e) => setAgencyCode(e.target.value)}
                  placeholder="e.g. SC-METRO-9982"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Passphrase (Argon2id Master Key)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 12 characters recommended"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded text-teal-700 focus:ring-teal-500"
              />
              <span>
                I agree to the <span className="font-semibold text-slate-900">Zero-Knowledge Sanctuary Charter</span>{' '}
                and understand that lost encryption keys cannot be recovered by server administrators.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Initialize Encrypted Identity
            </button>

            <div className="text-center pt-3 text-xs text-slate-500">
              <span>Already registered? </span>
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-teal-800 font-bold hover:underline"
              >
                Sign In Instead
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
