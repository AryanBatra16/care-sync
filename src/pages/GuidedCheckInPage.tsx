import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Wind,
  Mic,
  MicOff,
  Send,
  Lock,
  Shield,
  Check,
  Activity,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { PageId, MoodType } from '../types';
import { BackgroundBlobs } from '../components/BackgroundBlobs';

interface GuidedCheckInPageProps {
  onNavigate: (page: PageId) => void;
  onOpenGrounding: () => void;
  onOpenCounselor: () => void;
}

interface ChatBubble {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const QUICK_REPLIES = ["I'm okay, just checking in", 'I feel safe right now', "I'm anxious", 'I need someone to talk to'];

const nowLabel = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const GuidedCheckInPage: React.FC<GuidedCheckInPageProps> = ({
  onNavigate,
  onOpenGrounding,
  onOpenCounselor,
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>('Okay');
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatBubble[]>([
    {
      sender: 'bot',
      text: 'Welcome back. Take all the time you need. There is no right or wrong answer here.',
      time: nowLabel(),
    },
    {
      sender: 'bot',
      text: 'How would you describe your overall feeling and physical space today? I am listening without judgment.',
      time: nowLabel(),
    },
  ]);

  const moods: { type: MoodType; label: string; emoji: string }[] = [
    { type: 'Great', label: 'Great', emoji: '😊' },
    { type: 'Okay', label: 'Okay', emoji: '🙂' },
    { type: 'Neutral', label: 'Neutral', emoji: '😐' },
    { type: 'Worried', label: 'Worried', emoji: '😟' },
    { type: 'Struggling', label: 'Struggling', emoji: '😔' },
  ];

  const sendText = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: text.trim(), time: nowLabel() }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse =
        'Thank you for honoring yourself and sharing that. Your words are locked in your private vault.';
      if (selectedMood === 'Struggling' || selectedMood === 'Worried') {
        botResponse =
          'I hear the weight you are carrying right now. Remember you are not alone, and it is okay to pause. Would you like to do a 60-second breathing exercise together?';
      }
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse, time: nowLabel() }]);
    }, 900);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendText(inputText);
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
    <div className="relative">
      <BackgroundBlobs />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Top Header Row with Stepper */}
        <div className="mb-6 glass rounded-3xl p-5 sm:p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Step 2 of 3 • Guided Emotional Check-In</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              How is your safety and emotional space right now?
            </h1>
          </div>

          {/* Progress pill */}
          <div className="flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700">
            <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="w-2/3 h-full bg-[#005c55] rounded-full"></div>
            </div>
            <span>66% Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Conversation Container (8 cols) */}
          <div className="lg:col-span-8 flex flex-col glass rounded-3xl shadow-soft overflow-hidden min-h-[580px]">
            {/* Chat header */}
            <div className="p-4 sm:p-5 border-b border-white/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#005c55] to-[#006398] flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">CareSync Care Companion</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    Always here for you
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenGrounding}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 hover:bg-white text-teal-800 border border-white/60 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Wind className="h-4 w-4" />
                <span>Need Grounding?</span>
              </button>
            </div>

            {/* Chat message stream */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`flex items-end gap-2.5 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold ${
                      m.sender === 'user' ? 'bg-gradient-to-tr from-[#006398] to-[#005c55]' : 'bg-gradient-to-tr from-[#005c55] to-[#0f766e]'
                    }`}
                  >
                    {m.sender === 'user' ? 'Me' : <Sparkles className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <div
                      className={`p-4 text-sm leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-br from-[#005c55] to-[#006398] text-white rounded-2xl rounded-br-sm shadow-xs'
                          : 'glass text-slate-800 rounded-2xl rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                    <p className={`text-[10px] text-slate-400 mt-1 ${m.sender === 'user' ? 'text-right' : ''}`}>{m.time}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2.5 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white bg-gradient-to-tr from-[#005c55] to-[#0f766e]">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="glass rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-teal-800 text-xs font-semibold animate-pulse max-w-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  <span>Transcribing locally via Web Speech API (RAM-only)...</span>
                </div>
              )}
            </div>

            {/* Quick Reply Chips */}
            <div className="px-5 pb-3 flex items-center gap-2 overflow-x-auto">
              {QUICK_REPLIES.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendText(chip)}
                  className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white border border-white/60 text-xs font-semibold text-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Quick Mood Selector Bar */}
            <div className="px-5 py-3 border-t border-white/40">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Mood Indicator</p>
              <div className="grid grid-cols-5 gap-2">
                {moods.map((m) => (
                  <button
                    key={m.type}
                    onClick={() => setSelectedMood(m.type)}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedMood === m.type
                        ? 'bg-white/80 border-[#005c55] shadow-xs text-teal-900 font-bold'
                        : 'border-transparent bg-white/40 hover:bg-white/60 text-slate-700'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl mb-1">{m.emoji}</span>
                    <span className="text-[11px] sm:text-xs">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input & Action Bar */}
            <form onSubmit={handleSendMessage} className="p-4 sm:p-5 border-t border-white/40 flex flex-col gap-3">
              <div className="relative flex items-end gap-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type what is on your mind, or choose a prompt above..."
                  rows={2}
                  className="flex-1 rounded-2xl border border-white/60 bg-white/60 p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005c55] focus:border-transparent resize-none"
                />
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`p-3 rounded-full transition-colors cursor-pointer shrink-0 ${
                    isRecording ? 'bg-rose-500 text-white' : 'bg-white/60 text-slate-500 hover:text-teal-700 hover:bg-white'
                  }`}
                  title="Voice dictation (RAM-only)"
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-3 rounded-full bg-gradient-to-br from-[#005c55] to-[#006398] text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Your messages are intended for this private session.</span>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('check-in-concluded')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Complete &amp; Conclude Session</span>
                  <Check className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Information Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* 1. Weekly Resonance Card */}
            <div className="glass rounded-3xl p-5 sm:p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-teal-700" />
                  <span>Weekly Resonance</span>
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">Past 7 Days</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {[
                  { day: 'M', score: 32, color: 'bg-emerald-500' },
                  { day: 'T', score: 40, color: 'bg-emerald-400' },
                  { day: 'W', score: 48, color: 'bg-teal-400' },
                  { day: 'T', score: 38, color: 'bg-emerald-400' },
                  { day: 'F', score: 62, color: 'bg-amber-400' },
                  { day: 'S', score: 55, color: 'bg-teal-500' },
                  { day: 'S', score: 44, color: 'bg-[#005c55]' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="h-16 w-full bg-white/50 rounded-lg flex items-end justify-center p-1">
                      <div className={`w-full rounded-sm ${item.color}`} style={{ height: `${item.score}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600">{item.day}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                Your average stress index has remained stable over this cycle with gentle recovery noted today.
              </p>
            </div>

            {/* 2. Crisis Support */}
            <div className="rounded-3xl p-5 sm:p-6 shadow-md bg-rose-600 text-white">
              <h3 className="text-sm font-bold mb-1 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Crisis Support</span>
              </h3>
              <p className="text-xs text-rose-50/90 mb-4 leading-relaxed">
                If you feel unsafe right now, free confidential advocates are available 24/7.
              </p>
              <div className="space-y-2">
                <a
                  href="tel:988"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call 988 Crisis Lifeline</span>
                </a>
                <a
                  href="sms:741741"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Text HOME to 741741</span>
                </a>
                <button
                  onClick={onOpenCounselor}
                  className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Launch Private Chat Relay</span>
                </button>
              </div>
            </div>

            {/* 3. Privacy Reassurance Card */}
            <div className="glass rounded-3xl p-5 sm:p-6 shadow-soft">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-700" />
                <span>Privacy Guarantees</span>
              </h3>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Session awareness</p>
                    <p className="text-slate-500 mt-0.5">You can close this tab at any time — nothing is saved.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Location privacy reminder</p>
                    <p className="text-slate-500 mt-0.5">Avoid entering identifying or location details in this demo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Human Advocate Oversight</p>
                    <p className="text-slate-500 mt-0.5">You choose when or if a licensed counselor steps in.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
