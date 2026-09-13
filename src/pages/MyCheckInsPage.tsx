import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, PlusCircle, Eye, Trash2, Sparkles, Lock } from 'lucide-react';
import { PageId, CheckInReflection, MoodType } from '../types';
import { MOCK_REFLECTIONS, ASSETS } from '../data/mockData';
import { Emoji } from '../components/Emoji';

interface MyCheckInsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenReflection: (reflection: CheckInReflection) => void;
}

const MOODS: { type: MoodType; emoji: string; tint: string; ring: string }[] = [
  { type: 'Great', emoji: '😊', tint: 'bg-emerald-50', ring: 'border-emerald-500' },
  { type: 'Okay', emoji: '🙂', tint: 'bg-teal-50', ring: 'border-teal-500' },
  { type: 'Neutral', emoji: '😐', tint: 'bg-slate-100', ring: 'border-slate-400' },
  { type: 'Worried', emoji: '😟', tint: 'bg-amber-50', ring: 'border-amber-500' },
  { type: 'Struggling', emoji: '😔', tint: 'bg-rose-50', ring: 'border-rose-500' },
];

const HEAT_COLOR: Record<MoodType, string> = {
  Great: '#10b981',
  Okay: '#14b8a6',
  Neutral: '#94a3b8',
  Worried: '#f59e0b',
  Struggling: '#fb7185',
};

// Anchored to the latest demo reflection's date, so the heatmap stays a stable, honest
// reflection of the mock data instead of always showing blank cells for "today".
const HEATMAP_END = new Date(2026, 8, 5);

export const MyCheckInsPage: React.FC<MyCheckInsPageProps> = ({ onNavigate, onOpenReflection }) => {
  const [reflections, setReflections] = useState(MOCK_REFLECTIONS);
  const [filterMood, setFilterMood] = useState<string>('all');
  const [selectedMood, setSelectedMood] = useState<MoodType>('Okay');
  const [note, setNote] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const filtered = filterMood === 'all'
    ? reflections
    : reflections.filter((r) => r.mood.toLowerCase() === filterMood.toLowerCase());

  const handlePurge = () => {
    if (window.confirm('Are you sure you want to securely shred all local reflection entries? This cannot be undone.')) {
      setReflections([]);
    }
  };

  const moodEmoji: Record<MoodType, string> = { Great: '😊', Okay: '🙂', Neutral: '😐', Worried: '😟', Struggling: '😔' };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const entry: CheckInReflection = {
      id: `ref-${Date.now()}`,
      date: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: selectedMood,
      emoji: moodEmoji[selectedMood],
      summary: note.trim() ? note.trim().slice(0, 80) : `Quick mood log • Feeling ${selectedMood.toLowerCase()}`,
      detailedNote: note.trim() || `Logged a quick "${selectedMood}" check-in from the tracker.`,
      isPrivate: true,
    };
    setReflections((prev) => [entry, ...prev]);
    setNote('');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Build a 35-day heatmap grid ending at HEATMAP_END, coloring only days that have a real mock reflection.
  const heatmapDays = Array.from({ length: 35 }).map((_, i) => {
    const d = new Date(HEATMAP_END);
    d.setDate(d.getDate() - (34 - i));
    const match = reflections.find((r) => {
      const rd = new Date(r.date);
      return rd.toDateString() === d.toDateString();
    });
    return { date: d, mood: match?.mood, emoji: match?.emoji };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
            <Lock className="h-4 w-4" />
            <span>Personal Timeline • Private session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Check-In Journey
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
            A private timeline of your reflections and emotional journey for this prototype session.
          </p>
        </div>

        <button
          onClick={() => onNavigate('guided-check-in')}
          className="px-6 py-3 rounded-2xl bg-[#005c55] hover:bg-[#0f766e] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Check-In</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Quick Mood Logger (left 2/3) */}
        <motion.form
          onSubmit={handleSaveReflection}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs"
        >
          <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-teal-700" />
            Quick Mood Logger
          </h3>
          <p className="text-xs text-slate-500 mb-4">Log how you're feeling right now — it's saved to this timeline.</p>

          <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
            {MOODS.map((m) => (
              <button
                key={m.type}
                type="button"
                onClick={() => setSelectedMood(m.type)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all cursor-pointer ${
                  selectedMood === m.type ? `${m.tint} ${m.ring} scale-105 shadow-xs` : 'border-transparent bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl sm:text-3xl"><Emoji>{m.emoji}</Emoji></span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600">{m.type}</span>
              </button>
            ))}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a short note about how you're feeling (optional)..."
            rows={2}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#005c55] resize-none mb-3"
          />

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            Save Reflection
          </button>

          {savedNotice && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <span>Reflection saved to your timeline.</span>
            </div>
          )}
        </motion.form>

        {/* Streak + Heatmap (right 1/3) */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white mb-2">
              <Flame className="h-6 w-6" />
            </div>
            <div className="text-3xl font-headline font-bold text-slate-900">4</div>
            <div className="text-xs text-slate-500">day streak</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs"
          >
            <h4 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">5-Week Overview</h4>
            <div className="grid grid-cols-7 gap-1">
              {heatmapDays.map((d, i) => (
                <div
                  key={i}
                  title={`${d.date.toLocaleDateString()}${d.mood ? ` • ${d.mood}` : ' • No entry'}`}
                  className="aspect-square rounded-sm"
                  style={{ background: d.mood ? HEAT_COLOR[d.mood] : '#f1f5f9' }}
                />
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Colored squares mark days with a real logged reflection.</p>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Filters and count */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {filtered.length} Recorded Entries
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              {['all', 'Great', 'Okay', 'Neutral', 'Worried', 'Struggling'].map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMood(m)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                    filterMood === m
                      ? 'bg-teal-700 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
              <p className="text-sm font-semibold">Local timeline is clean or purged.</p>
              <button
                onClick={() => setReflections(MOCK_REFLECTIONS)}
                className="mt-4 text-xs font-bold text-teal-700 hover:underline cursor-pointer"
              >
                Restore Demo Reflections
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-teal-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                      <Emoji>{item.emoji}</Emoji>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-slate-900">{item.date}</h3>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{item.time}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {item.mood}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-1">{item.summary}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenReflection(item)}
                    className="self-end sm:self-center px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/70 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Note</span>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Cards (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Stillness Garden Visual Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
            <div className="h-44 w-full bg-slate-900 overflow-hidden relative">
              <img
                src={ASSETS.stillnessGarden}
                alt="Stillness Garden"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300">Inner Grounding</span>
                <p className="text-sm font-bold">The Stillness Garden</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-slate-600 leading-relaxed">
                Take a moment of quiet reflection. Your thoughts belong entirely to you, unindexed by any marketing or
                tracking algorithm.
              </p>
            </div>
          </div>

          {/* Data Purge Vault */}
          <div className="bg-rose-50/70 rounded-2xl p-5 border border-rose-200/80">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-2">
              <Trash2 className="h-5 w-5 text-rose-600" />
              <span>Reflection Data Purge</span>
            </div>
            <p className="text-xs text-rose-800/80 leading-relaxed mb-4">
              Instantly erase all reflection timestamps, mood records, and notes from this device's memory.
            </p>
            <button
              onClick={handlePurge}
              className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 className="h-4 w-4" />
              <span>Wipe All Local History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
