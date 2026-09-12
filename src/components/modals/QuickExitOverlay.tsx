import React from 'react';

interface QuickExitOverlayProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirmWipe: () => void;
}

export const QuickExitOverlay: React.FC<QuickExitOverlayProps> = ({ isOpen, onCancel, onConfirmWipe }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 text-center flex flex-col items-center gap-4 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px]">shield</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Safety Quick Exit</h3>
        <p className="text-sm text-slate-600">
          This will instantly purge all local session data, wipe in-memory check-ins, and redirect your browser to a neutral weather portal.
        </p>

        <div className="flex flex-col w-full gap-2.5 pt-2">
          <button
            onClick={() => {
              onConfirmWipe();
              window.location.replace('https://www.google.com');
            }}
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Purge &amp; Redirect to Neutral Site</span>
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
          >
            Stay on SafeCheck
          </button>
        </div>
        <p className="text-xs text-slate-400">Shortcut: Pressing ESC anytime immediately activates this discreet exit.</p>
      </div>
    </div>
  );
};
