import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageId, CheckInReflection, MoodType } from '../types';
import { MOCK_REFLECTIONS } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenGrounding: () => void;
  onOpenReflection: (reflection: CheckInReflection) => void;
}

const MOOD_VALUE: Record<MoodType, number> = {
  Great: 5,
  Okay: 4,
  Neutral: 3,
  Worried: 2,
  Struggling: 1,
};

const AFFIRMATIONS = [
  'You are allowed to take up space and ask for what you need.',
  'Healing is not linear, and every small step still counts.',
  'You survived every hard day so far. That is not nothing.',
  'Your feelings are valid, even the ones that are hard to name.',
  'Rest is productive when your nervous system needs it.',
];

const QUICK_MOODS: { type: MoodType; emoji: string; ring: string }[] = [
  { type: 'Great', emoji: '😊', ring: 'hover:border-emerald-400 focus:border-emerald-500' },
  { type: 'Okay', emoji: '🙂', ring: 'hover:border-teal-400 focus:border-teal-500' },
  { type: 'Neutral', emoji: '😐', ring: 'hover:border-slate-400 focus:border-slate-500' },
  { type: 'Worried', emoji: '😟', ring: 'hover:border-amber-400 focus:border-amber-500' },
  { type: 'Struggling', emoji: '😔', ring: 'hover:border-rose-400 focus:border-rose-500' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenGrounding, onOpenReflection }) => {
  const [ackMood, setAckMood] = useState<MoodType | null>(null);

  const latestReflection = MOCK_REFLECTIONS[0];
  const trend = [...MOCK_REFLECTIONS].reverse();
  const averageMood = (
    MOCK_REFLECTIONS.reduce((sum, r) => sum + MOOD_VALUE[r.mood], 0) / MOCK_REFLECTIONS.length
  ).toFixed(1);
  const todaysAffirmation = AFFIRMATIONS[new Date().getDate() % AFFIRMATIONS.length];

  const stats = [
    { label: 'Check-In Streak', value: '4', unit: 'days', icon: 'local_fire_department', tint: 'bg-orange-50 text-orange-600' },
    { label: 'Average Mood', value: averageMood, unit: '/ 5', icon: 'trending_up', tint: 'bg-blue-50 text-[#006398]' },
    { label: 'Reflections Logged', value: String(MOCK_REFLECTIONS.length), unit: 'entries', icon: 'auto_awesome', tint: 'bg-teal-50 text-[#005c55]' },
    { label: "Today's Mood", value: latestReflection.emoji, unit: latestReflection.mood, icon: 'mood', tint: 'bg-emerald-50 text-emerald-700' },
  ];

  const quickActions: { label: string; desc: string; icon: string; tint: string; onClick: () => void }[] = [
    {
      label: 'Start Check-In',
      desc: 'Talk with your companion',
      icon: 'volunteer_activism',
      tint: 'bg-teal-50 text-[#005c55]',
      onClick: () => onNavigate('guided-check-in'),
    },
    {
      label: 'Ground Yourself',
      desc: 'Breathing & sensory reset',
      icon: 'spa',
      tint: 'bg-emerald-50 text-emerald-700',
      onClick: onOpenGrounding,
    },
    {
      label: 'My Check-Ins',
      desc: 'Browse your private timeline',
      icon: 'menu_book',
      tint: 'bg-blue-50 text-[#006398]',
      onClick: () => onNavigate('my-check-ins'),
    },
  ];

  const handleQuickMood = (mood: MoodType) => {
    setAckMood(mood);
    setTimeout(() => setAckMood(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-6">
      {/* Greeting Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CareSync • Your Wellness Space</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back 🌿</h1>
        <p className="text-slate-600 text-sm mt-1">Here's a gentle look at your wellness today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.tint}`}>
              <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
            </div>
            <div className="text-2xl font-headline font-bold text-slate-900">
              {s.value} <span className="text-sm font-normal text-slate-400">{s.unit}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((q, i) => (
          <motion.button
            key={q.label}
            onClick={q.onClick}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 + i * 0.06 }}
            whileHover={{ y: -3 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 text-left"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${q.tint}`}>
              <span className="material-symbols-outlined text-[22px]">{q.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900 text-sm">{q.label}</div>
              <div className="text-xs text-slate-500">{q.desc}</div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-lg">arrow_forward</span>
          </motion.button>
        ))}
      </div>

      {/* Trend + Affirmation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Mood Trend</h3>
              <p className="text-xs text-slate-500">Your last {trend.length} logged reflections</p>
            </div>
            <span className="material-symbols-outlined text-[18px] text-teal-700">timeline</span>
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${trend.length}, minmax(0, 1fr))` }}>
            {trend.map((r) => (
              <div key={r.id} className="flex flex-col items-center gap-1.5">
                <div className="h-20 w-full bg-slate-100 rounded-lg flex items-end justify-center p-1">
                  <div
                    className="w-full rounded-sm bg-[#005c55]"
                    style={{ height: `${(MOOD_VALUE[r.mood] / 5) * 100}%` }}
                  />
                </div>
                <span className="text-lg">{r.emoji}</span>
                <span className="text-[10px] font-semibold text-slate-500 text-center leading-tight">
                  {r.date.split(',')[0].replace(/^[A-Za-z]+ /, '')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-teal-300 text-[18px]">auto_awesome</span>
            <h3 className="font-bold text-sm text-teal-200">Today's Affirmation</h3>
          </div>
          <p className="text-base leading-relaxed flex-1">"{todaysAffirmation}"</p>
        </div>
      </div>

      {/* Latest Reflection */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl shrink-0">
            {latestReflection.emoji}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Latest Reflection · {latestReflection.date}</h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-lg">{latestReflection.summary}</p>
          </div>
        </div>
        <button
          onClick={() => onOpenReflection(latestReflection)}
          className="shrink-0 px-4 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-xs font-bold transition-colors cursor-pointer"
        >
          View Full Entry
        </button>
      </div>

      {/* Quick Mood Check-in Palette */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="mb-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-teal-700">bolt</span>
            Quick Mood Check-in
          </h3>
          <p className="text-xs text-slate-500">Tap any mood to instantly log how you are feeling right now.</p>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {QUICK_MOODS.map((m) => (
            <button
              key={m.type}
              onClick={() => handleQuickMood(m.type)}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 sm:py-4 px-2 rounded-2xl border-2 border-transparent bg-slate-50 transition-all cursor-pointer hover:scale-105 ${m.ring}`}
            >
              <span className="text-2xl sm:text-3xl">{m.emoji}</span>
              <span className="text-[11px] font-semibold text-slate-600">{m.type}</span>
            </button>
          ))}
        </div>
        {ackMood && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Logged "{ackMood}" check-in! Keep breathing.</span>
          </div>
        )}
      </div>
    </div>
  );
};
