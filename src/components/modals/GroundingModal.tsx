import React, { useState, useEffect } from 'react';

interface GroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHASES = [
  { label: 'Inhale (4s)', scale: 'scale-125 bg-[#005c55]/25 border-2 border-[#005c55]/40' },
  { label: 'Hold (4s)', scale: 'scale-125 bg-[#005c55]/35 border-2 border-[#005c55]/60' },
  { label: 'Exhale (4s)', scale: 'scale-90 bg-[#005c55]/15 border-2 border-[#005c55]/20' },
  { label: 'Hold (4s)', scale: 'scale-90 bg-[#005c55]/10 border-2 border-[#005c55]/10' },
];

export const GroundingModal: React.FC<GroundingModalProps> = ({ isOpen, onClose }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);

  useEffect(() => {
    if (!isOpen) {
      setPhaseIndex(0);
      setSecondsLeft(4);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhaseIndex((p) => (p + 1) % 4);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPhase = PHASES[phaseIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#213145]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#9cf2e8]/40 flex items-center justify-center text-[#005c55]">
              <span className="material-symbols-outlined text-[24px]">air</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0b1c30]">Box Breathing Exercise</h3>
              <p className="text-xs text-[#3e4947]">Regulate heart rate &amp; calm your nervous system</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#6e7977] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-10 bg-[#eff4ff] rounded-2xl relative overflow-hidden">
          <div
            className={`w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out shadow-inner ${currentPhase.scale}`}
          >
            <span className="text-sm font-bold text-[#005c55] text-center tracking-wide">
              {currentPhase.label}
            </span>
            <span className="text-xs text-[#005c55]/80 font-mono mt-1 font-semibold">{secondsLeft}s</span>
          </div>
          <span className="text-xs text-[#3e4947] mt-6 font-medium">
            Focus on the gentle, rhythmic sensation in your chest
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-[#6e7977] px-1">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#005c55]">self_improvement</span>
            4-4-4-4 Somatic Regulation
          </span>
          <span>Repeat at your own pace</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#dce9ff] text-[#0b1c30] font-semibold hover:bg-[#d3e4fe] transition-colors text-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
};
