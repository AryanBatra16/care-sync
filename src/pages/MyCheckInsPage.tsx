import React, { useState } from 'react';
import { PageId, CheckInReflection } from '../types';
import { MOCK_REFLECTIONS, ASSETS } from '../data/mockData';

interface MyCheckInsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenReflection: (reflection: CheckInReflection) => void;
}

export const MyCheckInsPage: React.FC<MyCheckInsPageProps> = ({ onNavigate, onOpenReflection }) => {
  const [reflections, setReflections] = useState(MOCK_REFLECTIONS);
  const [filterMood, setFilterMood] = useState<string>('all');

  const filtered = filterMood === 'all'
    ? reflections
    : reflections.filter((r) => r.mood.toLowerCase() === filterMood.toLowerCase());

  const handlePurge = () => {
    if (window.confirm('Are you sure you want to securely shred all local reflection entries? This cannot be undone.')) {
      setReflections([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Personal Sanctuary • Local Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Check-In Journey
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
            A private, encrypted timeline of your reflections and emotional journey. Decrypted only inside your local
            browser session.
          </p>
        </div>

        <button
          onClick={() => onNavigate('guided-check-in')}
          className="px-6 py-3 rounded-2xl bg-[#005c55] hover:bg-[#0f766e] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>New Check-In</span>
        </button>
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
              <span className="material-symbols-outlined text-[48px] text-slate-300 mb-2">delete_sweep</span>
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
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-teal-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                      {item.emoji}
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
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>View Note</span>
                  </button>
                </div>
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
              <span className="material-symbols-outlined text-[20px] text-rose-600">cleaning_services</span>
              <span>Sanctuary Data Purge</span>
            </div>
            <p className="text-xs text-rose-800/80 leading-relaxed mb-4">
              Instantly erase all reflection timestamps, mood records, and notes from this device's memory.
            </p>
            <button
              onClick={handlePurge}
              className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">delete_forever</span>
              <span>Wipe All Local History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
