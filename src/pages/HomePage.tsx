import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {
  Flame,
  TrendingUp,
  Sparkles,
  Smile,
  HandHeart,
  Leaf,
  BookOpen,
  ArrowRight,
  Zap,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { PageId, CheckInReflection, MoodType } from '../types';
import { MOCK_REFLECTIONS } from '../data/mockData';
import { LanguageCode, t } from '../lib/translations';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenGrounding: () => void;
  onOpenReflection: (reflection: CheckInReflection) => void;
  language: LanguageCode;
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

const QUICK_MOODS: { type: MoodType; emoji: string; tint: string }[] = [
  { type: 'Great', emoji: '😊', tint: 'bg-emerald-50 hover:border-emerald-400' },
  { type: 'Okay', emoji: '🙂', tint: 'bg-teal-50 hover:border-teal-400' },
  { type: 'Neutral', emoji: '😐', tint: 'bg-slate-100 hover:border-slate-400' },
  { type: 'Worried', emoji: '😟', tint: 'bg-amber-50 hover:border-amber-400' },
  { type: 'Struggling', emoji: '😔', tint: 'bg-rose-50 hover:border-rose-400' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenGrounding, onOpenReflection, language }) => {
  const [ackMood, setAckMood] = useState<MoodType | null>(null);
  const tr = t(language);

  const latestReflection = MOCK_REFLECTIONS[0];
  const trend = [...MOCK_REFLECTIONS].reverse().map((r) => ({
    day: r.date.split(',')[0].replace(/^[A-Za-z]+ /, ''),
    mood: MOOD_VALUE[r.mood],
    emoji: r.emoji,
  }));
  const averageMood = (
    MOCK_REFLECTIONS.reduce((sum, r) => sum + MOOD_VALUE[r.mood], 0) / MOCK_REFLECTIONS.length
  ).toFixed(1);
  const todaysAffirmation = AFFIRMATIONS[new Date().getDate() % AFFIRMATIONS.length];

  const stats = [
    { label: 'Check-In Streak', value: '4', unit: 'days', icon: Flame, tint: 'bg-teal-50', iconColor: 'text-[#005c55]' },
    { label: 'Average Mood', value: averageMood, unit: '/ 5', icon: TrendingUp, tint: 'bg-sky-50', iconColor: 'text-[#006398]' },
    { label: 'Reflections Logged', value: String(MOCK_REFLECTIONS.length), unit: 'entries', icon: Sparkles, tint: 'bg-emerald-50', iconColor: 'text-emerald-700' },
    { label: "Today's Mood", value: latestReflection.emoji, unit: latestReflection.mood, icon: Smile, tint: 'bg-cyan-50', iconColor: 'text-cyan-700' },
  ];

  const quickActions: { label: string; desc: string; icon: typeof HandHeart; tint: string; iconColor: string; onClick: () => void }[] = [
    {
      label: 'Start Check-In',
      desc: 'Talk with your companion',
      icon: HandHeart,
      tint: 'bg-teal-50',
      iconColor: 'text-[#005c55]',
      onClick: () => onNavigate('guided-check-in'),
    },
    {
      label: 'Ground Yourself',
      desc: 'Breathing & sensory reset',
      icon: Leaf,
      tint: 'bg-emerald-50',
      iconColor: 'text-emerald-700',
      onClick: onOpenGrounding,
    },
    {
      label: 'My Check-Ins',
      desc: 'Browse your private timeline',
      icon: BookOpen,
      tint: 'bg-sky-50',
      iconColor: 'text-[#006398]',
      onClick: () => onNavigate('my-check-ins'),
    },
  ];

  const handleQuickMood = (mood: MoodType) => {
    setAckMood(mood);
    setTimeout(() => setAckMood(null), 2500);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-6">
        {/* Greeting Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{tr.eyebrow}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{tr.greeting} 🌿</h1>
          <p className="text-slate-600 text-sm mt-1">{tr.subtitle}</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.tint}`}>
                  <Icon className={`h-5 w-5 ${s.iconColor}`} />
                </div>
                <div className="text-2xl font-headline font-bold text-slate-900">
                  {s.value} <span className="text-sm font-normal text-slate-400">{s.unit}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((q, i) => {
            const Icon = q.icon;
            return (
              <motion.button
                key={q.label}
                onClick={q.onClick}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + i * 0.06 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4 text-left"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${q.tint}`}>
                  <Icon className={`h-5 w-5 ${q.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">{q.label}</div>
                  <div className="text-xs text-slate-500">{q.desc}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
              </motion.button>
            );
          })}
        </div>

        {/* Trend + Affirmation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-[#005c55]" />
                  Recent Mood Trend
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Your last {trend.length} logged reflections</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[0, 5]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ background: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0', borderRadius: 12 }}
                  formatter={(val: unknown) => [Number(val).toFixed(1), 'Mood']}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#005c55"
                  strokeWidth={3}
                  dot={{ fill: '#00d166', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-teal-400/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#005c55]" />
              <h3 className="font-bold text-sm text-slate-900">Today's Affirmation</h3>
            </div>
            <p className="relative text-base leading-relaxed flex-1 text-slate-700">"{todaysAffirmation}"</p>
          </motion.div>
        </div>

        {/* Latest Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
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
        </motion.div>

        {/* Quick Mood Check-in Palette */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs"
        >
          <div className="mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-[#005c55]" />
              Quick Mood Check-in
            </h3>
            <p className="text-xs text-slate-500">Tap any mood to instantly log how you are feeling right now.</p>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {QUICK_MOODS.map((m) => (
              <motion.button
                key={m.type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQuickMood(m.type)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 sm:py-4 px-2 rounded-2xl border-2 border-transparent transition-all cursor-pointer ${m.tint}`}
              >
                <span className="text-2xl sm:text-3xl">{m.emoji}</span>
                <span className="text-[11px] font-semibold text-slate-600">{m.type}</span>
              </motion.button>
            ))}
          </div>
          {ackMood && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>Logged "{ackMood}" check-in! Keep breathing.</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
