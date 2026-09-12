import React from 'react';
import { PageId } from '../types';
import { ASSETS } from '../data/mockData';

interface CheckInConcludedPageProps {
  onNavigate: (page: PageId) => void;
  onOpenGrounding: () => void;
  onOpenCounselor: () => void;
  onQuickExit: () => void;
}

export const CheckInConcludedPage: React.FC<CheckInConcludedPageProps> = ({
  onNavigate,
  onOpenGrounding,
  onOpenCounselor,
  onQuickExit,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 md:p-12 text-center flex flex-col items-center">
        {/* Animated Checkmark badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-50 border-2 border-teal-200 text-[#005c55] flex items-center justify-center shadow-inner mb-6 animate-in zoom-in-50 duration-300">
          <span className="material-symbols-outlined text-[36px] sm:text-[44px]">check_circle</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Zero-Knowledge Check-In Concluded</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Your Check-In Has Been Safely Recorded
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed mb-8">
          Your thoughts have been encrypted with your personal ephemeral key. No unencrypted records exist on any cloud
          server or browser cache.
        </p>

        {/* Cryptographic Session Receipt Box */}
        <div className="w-full max-w-md bg-slate-50 border border-slate-200/90 rounded-2xl p-5 mb-8 text-left space-y-3">
          <div className="flex items-center justify-between text-xs pb-2.5 border-b border-slate-200">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              Session Fingerprint
            </span>
            <span className="font-mono font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
              0x4e9a...7b2f8
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Timestamp:</span>
            <span className="font-semibold text-slate-800">Today, 10:42 AM (Local)</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Isolation Layer:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
              <span>AES-GCM-256 + Argon2id</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Browser Cache:</span>
            <span className="font-semibold text-slate-800">Scrubbed on tab close</span>
          </div>
        </div>

        {/* Next Gentle Steps & Actions */}
        <div className="w-full max-w-md flex flex-col gap-3">
          <button
            onClick={onOpenGrounding}
            className="w-full py-3.5 px-6 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">air</span>
            <span>Ground Yourself (Breathing Exercise)</span>
          </button>

          <button
            onClick={onOpenCounselor}
            className="w-full py-3.5 px-6 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
            <span>Connect with a Licensed Counselor</span>
          </button>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onNavigate('my-check-ins')}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              View My Sanctuary
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        </div>

        {/* Urgent Exit Reminder */}
        <div className="mt-10 pt-6 border-t border-slate-100 w-full flex items-center justify-center gap-4 text-xs text-slate-400">
          <span>Close window anytime to wipe memory</span>
          <span>•</span>
          <button
            onClick={onQuickExit}
            className="text-rose-600 hover:text-rose-700 font-semibold underline cursor-pointer"
          >
            Instant Discretion Exit
          </button>
        </div>
      </div>
    </div>
  );
};
