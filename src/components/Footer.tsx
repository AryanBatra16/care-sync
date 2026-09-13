import React from 'react';
import { PageId } from '../types';
import { LanguageCode, t } from '../lib/translations';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  language: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const tr = t(language);
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
      {/* 24/7 Crisis Hotline Alert Banner */}
      <div className="bg-rose-50/80 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-600 text-[20px] shrink-0">emergency</span>
            <span className="text-xs sm:text-sm font-bold text-rose-950">
              {tr('footer.hotlineBanner')}
            </span>
            <span className="hidden md:inline text-xs text-rose-800">
              {tr('footer.hotlineSub')}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a href="tel:988" className="font-bold text-rose-800 underline underline-offset-2 hover:text-rose-950">
              Dial 988
            </a>
            <span className="text-rose-300">|</span>
            <a href="sms:988" className="font-bold text-rose-800 underline underline-offset-2 hover:text-rose-950">
              Text 988
            </a>
            <span className="text-rose-300">|</span>
            <a
              href="https://988lifeline.org"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-rose-800 hover:text-rose-950 inline-flex items-center gap-0.5"
            >
              <span>988 Lifeline</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-slate-500">
          {/* Brand column */}
          <div className="flex flex-col gap-2.5 text-center sm:text-left items-center sm:items-start">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#005c55] to-[#0f766e] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-[16px]">spa</span>
              </div>
              <span className="font-bold text-slate-800 text-sm">CareSync</span>
            </button>
            <p className="max-w-[220px]">{tr('footer.tagline')}</p>
          </div>

          {/* Product column */}
          <div className="text-center sm:text-left">
            <div className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-3">{tr('footer.product')}</div>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => onNavigate('guided-check-in')}
                className="hover:text-teal-800 transition-colors text-left cursor-pointer"
              >
                {tr('footer.guidedCheckIn')}
              </button>
              <button
                onClick={() => onNavigate('ethics-and-privacy')}
                className="hover:text-teal-800 transition-colors text-left cursor-pointer"
              >
                {tr('footer.ethicsPrivacy')}
              </button>
            </div>
          </div>

          {/* Legal / Trust column */}
          <div className="text-center sm:text-left">
            <div className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-3">{tr('footer.legalTrust')}</div>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => onNavigate('settings')}
                className="hover:text-teal-800 transition-colors text-left cursor-pointer"
              >
                {tr('footer.safetyProtocol')}
              </button>
              <button
                onClick={() => onNavigate('admin-portal')}
                className="hover:text-teal-800 transition-colors text-left cursor-pointer"
              >
                {tr('footer.privacyReview')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-slate-800">{tr('footer.copyright')}</span>
        </div>
      </div>
    </footer>
  );
};
