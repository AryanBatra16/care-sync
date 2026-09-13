import React from 'react';
import { PageId } from '../types';
import { LanguageCode, t } from '../lib/translations';

interface EthicsAndPrivacyPageProps {
  onNavigate: (page: PageId) => void;
  language: LanguageCode;
}

export const EthicsAndPrivacyPage: React.FC<EthicsAndPrivacyPageProps> = ({ onNavigate, language }) => {
  const tr = t(language);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-[15px]">verified_user</span>
          <span>{tr('ethics.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          {tr('ethics.title')}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {tr('ethics.subtitle')}
        </p>
      </div>

      {/* Synthetic Data Notice Banner */}
      <div className="bg-teal-900 text-white rounded-3xl p-6 sm:p-8 mb-12 border border-teal-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-800 border border-teal-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px] text-teal-300">science</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{tr('ethics.bannerTitle')}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-400/20 text-teal-300 border border-teal-400/30 uppercase">
                {tr('ethics.bannerBadge')}
              </span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
              {tr('ethics.bannerBody')}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer"
        >
          {tr('ethics.returnHome')}
        </button>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Pillar 1 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-5 font-bold">
              <span className="material-symbols-outlined text-[26px]">privacy_tip</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{tr('ethics.pillar1Title')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {tr('ethics.pillar1Body')}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{tr('ethics.pillar1Foot')}</span>
            <span className="text-emerald-700 font-bold">{tr('ethics.pillar1FootValue')}</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-800 flex items-center justify-center mb-5 font-bold">
              <span className="material-symbols-outlined text-[26px]">memory</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{tr('ethics.pillar2Title')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {tr('ethics.pillar2Body')}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{tr('ethics.pillar2Foot')}</span>
            <span className="text-emerald-700 font-bold">{tr('ethics.pillar2FootValue')}</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center mb-5 font-bold">
              <span className="material-symbols-outlined text-[26px]">schema</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{tr('ethics.pillar3Title')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {tr('ethics.pillar3Body')}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{tr('ethics.pillar3Foot')}</span>
            <span className="text-emerald-700 font-bold">{tr('ethics.pillar3FootValue')}</span>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-5 font-bold">
              <span className="material-symbols-outlined text-[26px]">handshake</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{tr('ethics.pillar4Title')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {tr('ethics.pillar4Body')}
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{tr('ethics.pillar4Foot')}</span>
            <span className="text-emerald-700 font-bold">{tr('ethics.pillar4FootValue')}</span>
          </div>
        </div>
      </div>

      {/* Support Flow */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs">
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">{tr('ethics.workflowTitle')}</h3>
        <p className="text-slate-600 text-sm mb-8 max-w-2xl leading-relaxed">
          {tr('ethics.workflowSubtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              1
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Local Sandbox</h4>
            <p className="text-xs text-slate-500">Private check-in session</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              2
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Anonymizing Proxy</h4>
            <p className="text-xs text-slate-500">Context review</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              3
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Deterministic Triage</h4>
            <p className="text-xs text-slate-500">Heuristic distress scoring on blind vector</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              4
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Counselor Queue</h4>
            <p className="text-xs text-slate-500">Demo case reference for clinical support</p>
          </div>
        </div>
      </div>
    </div>
  );
};
