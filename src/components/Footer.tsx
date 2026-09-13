import React from 'react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
      {/* 24/7 Crisis Hotline Alert Banner */}
      <div className="bg-rose-50/80 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-600 text-[20px] shrink-0">emergency</span>
            <span className="text-xs sm:text-sm font-bold text-rose-950">
              24/7 Crisis Lifeline: Call or Text 988 | Emergency: 911
            </span>
            <span className="hidden md:inline text-xs text-rose-800">
              — Free, confidential, immediate support 24/7.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-800">CareSync Foundation © 2025</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span>Zero-trace session guaranteed: Ephemeral client-side encryption active.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('ethics-and-privacy')}
            className="hover:text-teal-800 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Ethics &amp; Privacy
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="hover:text-teal-800 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Safety Protocol
          </button>
          <button
            onClick={() => onNavigate('admin-portal')}
            className="hover:text-teal-800 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Cryptographic Audit
          </button>
        </div>
      </div>
    </footer>
  );
};
