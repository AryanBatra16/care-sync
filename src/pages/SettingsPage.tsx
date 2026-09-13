import React, { useState } from 'react';
import { PageId } from '../types';
import { LANGUAGES, LanguageCode } from '../lib/translations';
import { Emoji } from '../components/Emoji';

interface SettingsPageProps {
  onNavigate: (page: PageId) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  nightContrast: boolean;
  setNightContrast: (v: boolean) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  fontSize: number;
  setFontSize: (v: number) => void;
  compactMode: boolean;
  setCompactMode: (v: boolean) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

type SettingsTab = 'safety' | 'language' | 'appearance' | 'privacy';

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
      checked ? 'bg-[#005c55]' : 'bg-slate-300'
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onNavigate,
  theme,
  setTheme,
  nightContrast,
  setNightContrast,
  highContrast,
  setHighContrast,
  fontSize,
  setFontSize,
  compactMode,
  setCompactMode,
  language,
  setLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('safety');
  const [autoWipeMinutes, setAutoWipeMinutes] = useState('10');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const tabs: { id: SettingsTab; label: string; icon: string; iconColor: string }[] = [
    { id: 'safety', label: 'Safety & Sessions', icon: 'shield', iconColor: 'text-rose-600' },
    { id: 'language', label: 'Language', icon: 'translate', iconColor: 'text-teal-700' },
    { id: 'appearance', label: 'Appearance', icon: 'palette', iconColor: 'text-[#006398]' },
    { id: 'privacy', label: 'Privacy', icon: 'visibility', iconColor: 'text-teal-700' },
  ];

  const fontLabel = fontSize <= 13 ? 'Small' : fontSize >= 19 ? 'Large' : 'Default';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
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
          Adjust accessibility, session safety, and privacy preferences.
        </p>
      </div>

      {savedNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Preferences updated securely in local memory.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left tab nav */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-xs flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#eff4ff] text-[#005c55] shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeTab === tab.id ? 'text-[#005c55]' : tab.iconColor}`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right content panel */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'safety' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-rose-600">shield</span>
                <span>Safety &amp; Session Controls</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Configure how CareSync protects your session data.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
                  <div>
                    <p className="font-bold text-slate-800 flex items-center gap-2">
                      Inactivity Timeout Auto-Purge
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-100 text-amber-800 uppercase tracking-wide">
                        Upcoming
                      </span>
                    </p>
                    <p className="text-slate-500 mt-0.5">Wipe session RAM if no mouse or touch input detected. Not wired up yet — selecting a value doesn't take effect.</p>
                  </div>
                  <select
                    value={autoWipeMinutes}
                    onChange={(e) => setAutoWipeMinutes(e.target.value)}
                    disabled
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 text-slate-400 cursor-not-allowed focus:outline-none"
                  >
                    <option value="5">5 Minutes</option>
                    <option value="10">10 Minutes (Recommended)</option>
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-teal-700">translate</span>
                <span>Language</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Choose your preferred reading language. Applies live to the header, footer, and dashboard greeting —
                full app-wide translation is still in progress.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
                <div>
                  <p className="font-bold text-slate-800 text-xs">Interface Language</p>
                  <p className="text-slate-500 mt-0.5 text-xs">Prompts and guidance will adapt to this tongue.</p>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800 focus:outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#006398]">palette</span>
                  <span>Appearance</span>
                </h3>
                <p className="text-xs text-slate-500">Theme, text size, and display density — applied live across the app.</p>
              </div>

              {/* Theme */}
              <div>
                <p className="font-bold text-slate-800 text-xs mb-2">Theme</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      theme === 'light' ? 'border-[#005c55] bg-teal-50/60' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl"><Emoji>☀️</Emoji></span>
                    <span className="text-xs font-bold text-slate-800">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      theme === 'dark' ? 'border-[#005c55] bg-teal-50/60' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl"><Emoji>🌙</Emoji></span>
                    <span className="text-xs font-bold text-slate-800">Dark</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Dark mode is applied as a color-inversion filter over the whole app rather than a hand-tuned dark
                  palette, so photos are corrected but emoji may look slightly off-color.
                </p>
              </div>

              {/* Font size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-slate-800 text-xs">Font Size</p>
                  <span className="text-xs font-semibold text-slate-500">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={22}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-[#005c55]"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>Small</span>
                  <span className="font-semibold text-slate-600">{fontLabel}</span>
                  <span>Large</span>
                </div>
              </div>

              {/* High contrast */}
              <div className="flex items-center justify-between py-2 border-t border-slate-100 pt-4">
                <div>
                  <p className="font-bold text-slate-800 text-xs">High Contrast Text Mode</p>
                  <p className="text-slate-500 mt-0.5 text-xs">Boosts contrast across the whole app for low-light or glare conditions.</p>
                </div>
                <Toggle checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
              </div>

              {/* Compact mode */}
              <div className="flex items-center justify-between py-2 border-t border-slate-100 pt-4">
                <div>
                  <p className="font-bold text-slate-800 text-xs">Compact Mode</p>
                  <p className="text-slate-500 mt-0.5 text-xs">Tightens spacing across cards and sections to fit more on screen.</p>
                </div>
                <Toggle checked={compactMode} onChange={() => setCompactMode(!compactMode)} />
              </div>

              {/* Night contrast */}
              <div className="flex items-center justify-between py-2 border-t border-slate-100 pt-4">
                <div>
                  <p className="font-bold text-slate-800 text-xs">Night Contrast</p>
                  <p className="text-slate-500 mt-0.5 text-xs">An extra-dim look for late-night use. Stacks with Dark theme.</p>
                </div>
                <Toggle checked={nightContrast} onChange={() => setNightContrast(!nightContrast)} />
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-teal-700">visibility</span>
                <span>Session privacy</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                This prototype keeps check-in state in the active browser session. Use demo data only.
              </p>
            </div>
          )}

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
    </div>
  );
};
