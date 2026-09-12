import React, { useState } from 'react';

interface CounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CounselorModal: React.FC<CounselorModalProps> = ({ isOpen, onClose }) => {
  const [relayActive, setRelayActive] = useState(false);
  const [relayInput, setRelayInput] = useState('');
  const [relayMessages, setRelayMessages] = useState<string[]>([
    'SafeCheck Encrypted Counselor Relay connected. A crisis advocate is reviewing your anonymous line.',
  ]);

  if (!isOpen) return null;

  const handleSendRelay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!relayInput.trim()) return;
    setRelayMessages((prev) => [...prev, `You: ${relayInput}`]);
    setRelayInput('');
    setTimeout(() => {
      setRelayMessages((prev) => [
        ...prev,
        'Advocate: We hear you and you are safe. Take a deep breath. Would you like us to connect you with immediate local sheltering resources?',
      ]);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#213145]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006398]">
              <span className="material-symbols-outlined text-[24px]">record_voice_over</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0b1c30]">Private Support Access</h3>
              <p className="text-xs text-[#3e4947]">Confidential support matched to your level of comfort</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#6e7977] hover:text-[#0b1c30] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {!relayActive ? (
          <div className="flex flex-col gap-3">
            <a
              href="tel:988"
              className="p-4 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#005c55]">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-[#0b1c30]">National Crisis Lifeline (988)</div>
                  <div className="text-xs text-[#3e4947]">Immediate telephone counselor dispatch</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#005c55] group-hover:translate-x-1 transition-transform">
                Connect →
              </span>
            </a>

            <a
              href="sms:988"
              className="p-4 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#006398]">
                  <span className="material-symbols-outlined text-[24px]">sms</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-[#0b1c30]">Text Lifeline 988</div>
                  <div className="text-xs text-[#3e4947]">Quiet textual exchange via SMS</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#006398] group-hover:translate-x-1 transition-transform">
                Start Text →
              </span>
            </a>

            <div className="p-4 rounded-xl bg-[#eff4ff] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#005c55]">
                  <span className="material-symbols-outlined text-[24px]">forum</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-[#0b1c30]">Secure Web Relay Chat</div>
                  <div className="text-xs text-[#3e4947]">In-browser TLS 1.3 encrypted messaging</div>
                </div>
              </div>
              <button
                onClick={() => setRelayActive(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#005c55] hover:bg-[#0f766e] text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Launch Relay
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Relay Active (E2EE Session 0x7b2f8)
              </span>
              <button
                onClick={() => setRelayActive(false)}
                className="text-emerald-900 underline text-[11px]"
              >
                Back to options
              </button>
            </div>
            <div className="h-44 overflow-y-auto bg-slate-50 p-3 rounded-xl flex flex-col gap-2 text-xs">
              {relayMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg ${
                    msg.startsWith('You:')
                      ? 'bg-[#005c55] text-white self-end max-w-[80%]'
                      : 'bg-white text-slate-800 border border-slate-200 self-start max-w-[85%]'
                  }`}
                >
                  {msg}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendRelay} className="flex gap-2">
              <input
                type="text"
                value={relayInput}
                onChange={(e) => setRelayInput(e.target.value)}
                placeholder="Type confidential message to advocate..."
                className="flex-1 bg-[#eff4ff] text-xs px-3 py-2 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#005c55]"
              />
              <button
                type="submit"
                className="bg-[#005c55] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#0f766e]"
              >
                Send
              </button>
            </form>
          </div>
        )}

        <p className="text-[11px] text-[#3e4947] text-center pt-1">
          No records or names are shared with external authorities without explicit endangerment cause.
        </p>
      </div>
    </div>
  );
};
