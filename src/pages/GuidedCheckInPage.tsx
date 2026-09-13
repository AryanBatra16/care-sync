import React, { useState } from 'react';
import { PageId, MoodType } from '../types';

interface GuidedCheckInPageProps {
  onNavigate: (page: PageId) => void;
  onOpenGrounding: () => void;
  onOpenCounselor: () => void;
}

export const GuidedCheckInPage: React.FC<GuidedCheckInPageProps> = ({
  onNavigate,
  onOpenGrounding,
  onOpenCounselor,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>('Okay');
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Welcome back. Take all the time you need. There is no right or wrong answer here.',
    },
    {
      sender: 'bot',
      text: 'How would you describe your overall feeling and physical space today? I am listening without judgment.',
    },
  ]);

  const moods: { type: MoodType; label: string; emoji: string; color: string }[] = [
    { type: 'Great', label: 'Great', emoji: '😊', color: 'hover:border-emerald-400 focus:border-emerald-500' },
    { type: 'Okay', label: 'Okay', emoji: '🙂', color: 'hover:border-teal-400 focus:border-teal-500' },
    { type: 'Neutral', label: 'Neutral', emoji: '😐', color: 'hover:border-slate-400 focus:border-slate-500' },
    { type: 'Worried', label: 'Worried', emoji: '😟', color: 'hover:border-amber-400 focus:border-amber-500' },
    { type: 'Struggling', label: 'Struggling', emoji: '😔', color: 'hover:border-rose-400 focus:border-rose-500' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputText('');

    // Responsive empathetic companion reply
    setTimeout(() => {
      let botResponse =
        'Thank you for honoring yourself and sharing that. Your words are locked in your private vault.';
      if (selectedMood === 'Struggling' || selectedMood === 'Worried') {
        botResponse =
          'I hear the weight you are carrying right now. Remember you are not alone, and it is okay to pause. Would you like to do a 60-second breathing exercise together?';
      }
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 700);
  };

  const handleToggleVoice = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setInputText((prev) =>
          prev ? prev + ' I am taking things one hour at a time.' : 'I am taking things one hour at a time.'
        );
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Header Row with Stepper */}
      <div className="mb-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            <span>Step 2 of 3 • Guided Emotional Check-In</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            How is your safety and emotional space right now?
          </h1>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700">
          <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="w-2/3 h-full bg-[#005c55] rounded-full"></div>
          </div>
          <span>66% Complete</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Conversation Container (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden min-h-[580px]">
          {/* Chat header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100/80 border border-teal-200 flex items-center justify-center text-teal-800 font-bold">
                <span className="material-symbols-outlined text-[20px]">spa</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">CareSync Sanctuary AI</h3>
                <p className="text-xs text-slate-500">Zero-trace conversational companion</p>
              </div>
            </div>

            <button
              onClick={onOpenGrounding}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/70 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">air</span>
              <span>Need Grounding?</span>
            </button>
          </div>

          {/* Chat message stream */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 bg-[#f8f9ff]/40">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center shrink-0 text-xs">
                    SC
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#005c55] text-white rounded-br-xs shadow-xs'
                      : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isRecording && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold animate-pulse max-w-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span>Transcribing locally via Web Speech API (RAM-only)...</span>
              </div>
            )}
          </div>

          {/* Quick Mood Selector Bar */}
          <div className="px-5 py-3 border-t border-slate-100 bg-white">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Mood Indicator</p>
            <div className="grid grid-cols-5 gap-2">
              {moods.map((m) => (
                <button
                  key={m.type}
                  onClick={() => setSelectedMood(m.type)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition-all cursor-pointer ${
                    selectedMood === m.type
                      ? 'bg-teal-50 border-[#005c55] shadow-xs text-teal-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xl sm:text-2xl mb-1">{m.emoji}</span>
                  <span className="text-[11px] sm:text-xs">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Input & Action Bar */}
          <form onSubmit={handleSendMessage} className="p-4 sm:p-5 border-t border-slate-100 bg-white flex flex-col gap-3">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type what is on your mind, or choose a prompt above..."
                rows={3}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005c55] focus:border-transparent resize-none bg-slate-50/50"
              />
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`absolute bottom-3 right-3 p-2 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors ${
                  isRecording ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-teal-700 hover:bg-slate-100'
                }`}
                title="Voice dictation (RAM-only)"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isRecording ? 'mic' : 'mic_none'}
                </span>
                <span className="hidden sm:inline text-[11px] font-medium">
                  {isRecording ? 'Listening...' : 'Voice'}
                </span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">lock</span>
                <span>Encrypted on-device before transmission (AES-GCM-256)</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Send Reply
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('check-in-concluded')}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Complete &amp; Conclude Session</span>
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Information Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* 1. Weekly Resonance Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-teal-700">timeline</span>
                <span>Weekly Resonance</span>
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">Past 7 Days</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {[
                { day: 'M', score: 32, label: 'Low', color: 'bg-emerald-500' },
                { day: 'T', score: 40, label: 'Stable', color: 'bg-emerald-400' },
                { day: 'W', score: 48, label: 'Mild', color: 'bg-teal-400' },
                { day: 'T', score: 38, label: 'Stable', color: 'bg-emerald-400' },
                { day: 'F', score: 62, label: 'Elevated', color: 'bg-amber-400' },
                { day: 'S', score: 55, label: 'Mod', color: 'bg-teal-500' },
                { day: 'S', score: 44, label: 'Today', color: 'bg-[#005c55]' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="h-16 w-full bg-slate-100 rounded-lg flex items-end justify-center p-1">
                    <div
                      className={`w-full rounded-sm ${item.color}`}
                      style={{ height: `${item.score}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{item.day}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Your average stress index has remained stable over this cycle with gentle recovery noted today.
            </p>
          </div>

          {/* 2. Privacy Reassurance Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-teal-700">shield</span>
              <span>Sanctuary Guarantees</span>
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Zero Device Logs</p>
                  <p className="text-slate-500 mt-0.5">Session cookies and local cache self-purge on close.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">No Location Tracking</p>
                  <p className="text-slate-500 mt-0.5">IP addresses are hashed and discarded at ingress proxy.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-600">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Human Advocate Oversight</p>
                  <p className="text-slate-500 mt-0.5">You choose when or if a licensed counselor steps in.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Need Immediate Support? Direct Hotline */}
          <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
            <h3 className="text-sm font-bold text-teal-200 mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>Need Immediate Support?</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              If you feel unsafe right now, free confidential advocates are available 24/7.
            </p>
            <div className="space-y-2">
              <a
                href="tel:988"
                className="w-full py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Call 988 Crisis Lifeline</span>
              </a>
              <button
                onClick={onOpenCounselor}
                className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Launch Private Chat Relay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
