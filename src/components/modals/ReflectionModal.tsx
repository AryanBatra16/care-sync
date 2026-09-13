import React from 'react';
import { CheckInReflection } from '../../types';

interface ReflectionModalProps {
  reflection: CheckInReflection | null;
  onClose: () => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({ reflection, onClose }) => {
  if (!reflection) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#213145]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#9cf2e8]/40 flex items-center justify-center text-[#005c55]">
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </div>
            <h3 className="text-lg font-bold text-[#0b1c30]">Private Reflection</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#6e7977] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="bg-[#eff4ff] p-4 rounded-xl flex items-center gap-4">
          <span className="text-3xl">{reflection.emoji}</span>
          <div>
            <p className="text-sm font-bold text-[#0b1c30]">{reflection.date}</p>
            <p className="text-xs text-[#005c55] font-semibold">{reflection.mood} • {reflection.time}</p>
          </div>
        </div>

        <div className="space-y-2 text-[#0b1c30]">
          <p className="text-xs text-[#6e7977] uppercase tracking-wider font-bold">Personal Journal Entry</p>
          <div className="text-sm leading-relaxed bg-[#f8f9ff] border border-slate-200/60 p-4 rounded-xl text-slate-800 italic">
            {reflection.detailedNote}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#3e4947] flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
            Private session view
          </span>
          <button
            onClick={onClose}
            className="bg-[#005c55] hover:bg-[#0f766e] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
