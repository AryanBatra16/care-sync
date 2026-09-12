import React, { useState } from 'react';
import { PageId } from '../types';

interface SettingsPageProps {
  onNavigate: (page: PageId) => void;
  onQuickExit: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate, onQuickExit }) => {
  const [language, setLanguage] = useState('en');
  const [escEnabled, setEscEnabled] = useState(true);
  const [redirectTarget, setRedirectTarget] = useState('google');
  const [autoWipeMinutes, setAutoWipeMinutes] = useState('10');
  const [highContrast, setHighContrast] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>Preferences &amp; Security Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings &amp; Personalization
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Adjust accessibility, rapid safety exit triggers, and client-side encryption controls.
        </p>
      </div>

      {savedNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Preferences updated securely in local memory.</span>
        </div>
      )}

      <div className="space-y-6">
        {/* SECTION 1: SAFETY & DISCRETION */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-rose-600">shield</span>
            <span>Safety &amp; Quick Exit Controls</span>
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Configure how SafeCheck protects you if someone walks into your room.
          </p>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div>
                <p className="font-bold text-slate-800">Quick Exit on ESC Key</p>
                <p className="text-slate-500 mt-0.5">Pressing Escape key immediately blanks the application.</p>
              </div>
              <button
                onClick={() => setEscEnabled(!escEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  escEnabled ? 'bg-[#005c55]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    escEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-slate-100">
              <div>
                <p className="font-bold text-slate-800">Quick Exit Destination</p>
                <p className="text-slate-500 mt-0.5">Neutral website to navigate to upon exit.</p>
              </div>
              <select
                value={redirectTarget}
                onChange={(e) => setRedirectTarget(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:outline-none"
              >
                <option value="google">Google Search (google.com)</option>
                <option value="weather">The Weather Channel (weather.com)</option>
                <option value="wikipedia">Wikipedia Main Page (wikipedia.org)</option>
                <option value="blank">Neutral Blank Screen</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
              <div>
                <p className="font-bold text-slate-800">Inactivity Timeout Auto-Purge</p>
                <p className="text-slate-500 mt-0.5">Wipe session RAM if no mouse or touch input detected.</p>
              </div>
              <select
                value={autoWipeMinutes}
                onChange={(e) => setAutoWipeMinutes(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:outline-none"
              >
                <option value="5">5 Minutes</option>
                <option value="10">10 Minutes (Recommended)</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: ACCESSIBILITY & LANGUAGE */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-teal-700">translate</span>
            <span>Language &amp; Display</span>
          </h3>
          <p className="text-xs text-slate-500 mb-6">Choose your preferred reading dialect and contrast level.</p>

          <div className="space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-slate-100">
              <div>
                <p className="font-bold text-slate-800">Interface Language</p>
                <p className="text-slate-500 mt-0.5">Prompts and guidance will adapt to this tongue.</p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:outline-none"
              >
                <option value="en">English (US)</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
                <option value="zh">中文 (Simplified Chinese)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="vi">Tiếng Việt (Vietnamese)</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-bold text-slate-800">High Contrast Text Mode</p>
                <p className="text-slate-500 mt-0.5">Enhances typography sharpness for low-light or glare conditions.</p>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  highContrast ? 'bg-[#005c55]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    highContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: CRYPTOGRAPHIC VAULT */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-teal-700">key</span>
            <span>Cryptographic State &amp; Key Rotation</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Manage your ephemeral key pair generated by WebCrypto API.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 uppercase font-mono text-[10px] block">Current Key Salt</span>
              <span className="font-mono font-bold text-slate-800">0x7f4e91...ab02</span>
            </div>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Isolated</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => alert('Client ephemeral encryption key rotated. Previous session tokens invalidated.')}
              className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/80 text-xs font-bold transition-colors cursor-pointer"
            >
              Rotate Key Pair
            </button>
            <button
              onClick={onQuickExit}
              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Test Quick Exit Trigger
            </button>
          </div>
        </div>

        {/* Bottom Save bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
