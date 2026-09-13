import React, { useState } from 'react';
import { PageId } from '../types';

interface CaseDetailPageProps {
  caseId: string;
  onNavigate: (page: PageId) => void;
  onOpenCounselorRelay: () => void;
}

export const CaseDetailPage: React.FC<CaseDetailPageProps> = ({
  caseId,
  onNavigate,
  onOpenCounselorRelay,
}) => {
  const [checklist, setChecklist] = useState({
    reviewLogs: true,
    assessSafety: true,
    shelterCoord: false,
    outreachMessage: false,
    supervisorSubmit: false,
  });

  const [clinicalNotes, setClinicalNotes] = useState<string[]>([
    'Sep 5, 11:15 AM - Dr. S. Vance: Distress delta (+13) crosses secondary intervention trigger. Client reports disrupted sleep and fear during evening hours. Recommending priority shelter intake slot.',
  ]);
  const [noteInput, setNoteInput] = useState('');
  const [caseStatus, setCaseStatus] = useState('Under Review');

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClinicalNotes((prev) => [...prev, `Today, ${now} - Dr. S. Vance: ${noteInput.trim()}`]);
    setNoteInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Bar with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => onNavigate('counselor-cases')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-800 transition-colors cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span>Back to Caseload</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Case Status:</span>
          <select
            value={caseStatus}
            onChange={(e) => setCaseStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:outline-none"
          >
            <option value="Active">Active</option>
            <option value="Under Review">Under Review</option>
            <option value="Escalated">Escalated</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap mb-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {caseId || 'CASE-1042'}
            </h1>
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
              <span>CRITICAL PRIORITY</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 text-slate-700">
              Hash: 0x4e9a...7b2f8
            </span>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm">
            Privacy-focused review • Assigned District: <span className="font-bold text-slate-800">Metro North (Region 2)</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCounselorRelay}
            className="px-5 py-2.5 rounded-xl bg-[#005c55] hover:bg-[#0f766e] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Initiate Relay Outreach</span>
          </button>
        </div>
      </div>

      {/* Bento Metric Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Distress Index</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-rose-600">78</span>
            <span className="text-sm font-semibold text-slate-400">/100</span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
              +13 pts in 48h
            </span>
          </div>
          <p className="text-xs text-rose-800/90 mt-2 font-medium">
            Exceeds intervention threshold (70 pts). Elevated concern for night safety.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Primary Care Vector</p>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">Domestic Safety</h3>
          <p className="text-xs text-slate-500 mt-2">
            Associated with safe relocation resources and domestic dispute de-escalation.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Engagement Frequency</p>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">Daily Cadence</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>Active within last 25 minutes</span>
          </p>
        </div>
      </div>

      {/* Grid: Graph & Explainability (8 cols) and Action Checklist (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* SECTION 1: SVG DISTRESS TREND */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Distress Trend (Last 14 Days)</h3>
                <p className="text-xs text-slate-500">Tracking daily calculated trauma and stress trajectory</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                  <span className="w-3 h-0.5 bg-teal-600"></span>
                  Distress Curve
                </span>
                <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                  <span className="w-3 h-0.5 border-b border-rose-500 border-dashed"></span>
                  Threshold (70)
                </span>
              </div>
            </div>

            {/* Custom Responsive SVG Chart */}
            <div className="w-full h-56 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="40" y1="40" x2="580" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="90" x2="580" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="140" x2="580" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="180" x2="580" y2="180" stroke="#e2e8f0" strokeWidth="1" />

                {/* Y-axis labels */}
                <text x="10" y="45" fontSize="10" fill="#94a3b8">100</text>
                <text x="15" y="70" fontSize="10" fill="#f43f5e" fontWeight="bold">70</text>
                <text x="15" y="145" fontSize="10" fill="#94a3b8">40</text>
                <text x="20" y="185" fontSize="10" fill="#94a3b8">0</text>

                {/* Threshold line at 70 (y = 70) */}
                <line x1="40" y1="70" x2="580" y2="70" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Gradient area under the line */}
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#005c55" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#005c55" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Points: Aug 22(45 -> y=130), Aug 25(48 -> y=125), Aug 28(52 -> y=118), Aug 31(62 -> y=98), Sep 2(65 -> y=92), Sep 5(78 -> y=68) */}
                {/* Coordinates: (80, 130), (180, 125), (280, 118), (380, 98), (480, 92), (560, 68) */}
                <path
                  d="M 80 130 L 180 125 L 280 118 L 380 98 L 480 92 L 560 68 L 560 180 L 80 180 Z"
                  fill="url(#areaGrad)"
                />
                <path
                  d="M 80 130 L 180 125 L 280 118 L 380 98 L 480 92 L 560 68"
                  fill="none"
                  stroke="#005c55"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Circles for data points */}
                <circle cx="80" cy="130" r="4" fill="#005c55" />
                <circle cx="180" cy="125" r="4" fill="#005c55" />
                <circle cx="280" cy="118" r="4" fill="#005c55" />
                <circle cx="380" cy="98" r="4" fill="#005c55" />
                <circle cx="480" cy="92" r="4" fill="#005c55" />
                <circle cx="560" cy="68" r="6" fill="#ba1a1a" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-10 mt-2">
              <span>Aug 22</span>
              <span>Aug 25</span>
              <span>Aug 28</span>
              <span>Aug 31</span>
              <span>Sep 2</span>
              <span className="text-rose-600 font-bold">Sep 5 (Today)</span>
            </div>
          </div>

          {/* SECTION 2: EXPLAINABILITY BREAKDOWN */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">Explainable Factor Weights</h3>
            <p className="text-xs text-slate-500 mb-6">
              Deterministic, non-blackbox telemetry parsing for transparent clinical verification.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-800">Somatic Tension / Distress Markers</span>
                  <span className="text-rose-600 font-bold">82% High</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-800">Language Shift &amp; Verbal Urgency</span>
                  <span className="text-amber-600 font-bold">74% Elevated</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-800">Check-In Cadence Irregularity</span>
                  <span className="text-amber-600 font-bold">68% Moderate</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-800">Social Isolation Indicator</span>
                  <span className="text-teal-700 font-bold">55% Guarded</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: RECENT REFLECTION LOGS */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">De-Identified Reflections</h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                <div className="flex items-center justify-between font-bold text-rose-950 mb-1">
                  <span>Sep 5, 2026 • 10:30 AM (Most Recent)</span>
                  <span className="bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded text-[10px]">Critical</span>
                </div>
                <p className="text-rose-900/90 italic leading-relaxed">
                  "I don't think I can stay here much longer. The arguments are getting worse and I'm scared to go to
                  sleep. I need a place to go this weekend."
                </p>
                <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center gap-2 text-[11px] text-rose-800">
                  <span className="font-semibold">Flagged Markers:</span>
                  <span>Sleep disruption, escalating physical confrontation, request for shelter</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between font-bold text-slate-800 mb-1">
                  <span>Sep 2, 2026 • 04:15 PM</span>
                  <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px]">Moderate</span>
                </div>
                <p className="text-slate-600 italic leading-relaxed">
                  "Felt really overwhelmed today, tried the breathing exercises but it didn't help much. Just trying to
                  keep head down."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Checklist & Clinical Notes Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Checklist */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-teal-700">checklist</span>
              <span>Counselor Safety Protocol</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Mandatory actions prior to closing case</p>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.reviewLogs}
                  onChange={() => toggleCheck('reviewLogs')}
                  className="mt-0.5 rounded text-teal-700 focus:ring-teal-500"
                />
                <span className={checklist.reviewLogs ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Review recent audio/textual check-in logs
                </span>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.assessSafety}
                  onChange={() => toggleCheck('assessSafety')}
                  className="mt-0.5 rounded text-teal-700 focus:ring-teal-500"
                />
                <span className={checklist.assessSafety ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Assess immediate physical safety risk
                </span>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.shelterCoord}
                  onChange={() => toggleCheck('shelterCoord')}
                  className="mt-0.5 rounded text-teal-700 focus:ring-teal-500"
                />
                <span className={checklist.shelterCoord ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Coordinate with Metro North safe shelter intake
                </span>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.outreachMessage}
                  onChange={() => toggleCheck('outreachMessage')}
                  className="mt-0.5 rounded text-teal-700 focus:ring-teal-500"
                />
                <span className={checklist.outreachMessage ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Prepare confidential outreach message via the counselor relay
                </span>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.supervisorSubmit}
                  onChange={() => toggleCheck('supervisorSubmit')}
                  className="mt-0.5 rounded text-teal-700 focus:ring-teal-500"
                />
                <span className={checklist.supervisorSubmit ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Update clinical notes and submit to regional supervisor
                </span>
              </label>
            </div>
          </div>

          {/* Clinical Notes Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-teal-700">note_alt</span>
              <span>Internal Clinical Notes</span>
            </h3>

            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto text-xs">
              {clinicalNotes.map((note, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-700 leading-relaxed">
                  {note}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Append private clinical observation..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none bg-slate-50/50"
              />
              <button
                type="submit"
                disabled={!noteInput.trim()}
                className="w-full py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs disabled:opacity-40 transition-colors cursor-pointer"
              >
                Add Clinical Note
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
