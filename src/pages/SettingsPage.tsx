import React, { useState } from 'react';
import { PageId } from '../types';

interface SettingsPageProps {
  onNavigate: (page: PageId) => void;
}

type SettingsTab = 'safety' | 'language' | 'privacy';

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('safety');
  const [language, setLanguage] = useState('en');
  const [autoWipeMinutes, setAutoWipeMinutes] = useState('10');
  const [highContrast, setHighContrast] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const tabs: { id: SettingsTab; label: string; icon: string; iconColor: string }[] = [
    { id: 'safety', label: 'Safety & Sessions', icon: 'shield', iconColor: 'text-rose-600' },
    { id: 'language', label: 'Language & Display', icon: 'translate', iconColor: 'text-teal-700' },
    { id: 'privacy', label: 'Privacy', icon: 'visibility', iconColor: 'text-teal-700' },
  ];

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
          )}

          {activeTab === 'language' && (
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
