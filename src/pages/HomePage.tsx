import React, { useState } from 'react';
import { PageId } from '../types';
import { Sanctum3DCanvas } from '../components/Sanctum3DCanvas';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Interactive Simulation State
  const [isSurgeActive, setIsSurgeActive] = useState(false);

  // Interactive District Rebate / Coverage Form State
  const [zipInput, setZipInput] = useState('');
  const [zipResult, setZipResult] = useState<string | null>(null);

  const handleSimulateSurge = () => {
    setIsSurgeActive((prev) => !prev);
  };

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = zipInput.trim();
    if (query.length > 0) {
      setZipResult(
        `✨ Verified for District [${query}]: 100% Free Confidential Access Active + Immediate Counselor On-Call Availability.`
      );
    } else {
      setZipResult('Please enter a valid district or ZIP code to check local coverage.');
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#f8f9ff] text-[#0b1c30] antialiased">
      {/* Top Decorative Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-teal-400/20 via-blue-400/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 -left-48 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-96 -right-48 w-[450px] h-[450px] bg-sky-300/25 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-20 lg:pt-14 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Value Proposition */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              {/* Micro-badge / System Status Chip */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#dce9ff]/70 border border-blue-200/60 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d166] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d166]" />
                </span>
                <span className="text-xs font-mono font-semibold tracking-wider text-[#0b1c30] uppercase">
                  NEXT-GEN CRISIS RESILIENCE • ZERO-KNOWLEDGE v3.2
                </span>
              </div>

              {/* Monumental Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-[#0b1c30] tracking-tight leading-[1.08]">
                Autonomous Safety &amp; Sanctuary for the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005c55] via-[#00d166] to-[#006398]">
                  Modern Survivor.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                SanctumCare dynamically isolates survivor identities, conducts trauma-informed conversational triage,
                and routes urgent crisis thresholds to counselors — with 100% zero-knowledge cryptographic privacy.
              </p>

              {/* Primary CTA Cluster */}
              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('guided-check-in')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#005c55] text-white font-semibold text-base shadow-lg shadow-teal-900/20 hover:bg-[#00d166] hover:text-[#005324] transition-all duration-200 group cursor-pointer"
                >
                  <span>Start Confidential Check-In</span>
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
                <button
                  onClick={() => onNavigate('counselor-cases')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff] font-semibold text-base transition-all shadow-xs border border-slate-200/70 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#006398] text-xl">play_circle</span>
                  <span>Explore Clinical Sandbox</span>
                </button>
              </div>

              {/* Micro-metrics Ticker Cards (Floating stack) */}
              <div className="grid grid-cols-2 gap-4 pt-4 w-full max-w-lg">
                <div className="p-4 rounded-xl bg-white shadow-md border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>TRIAGE ACCELERATION</span>
                    <span className="material-symbols-outlined text-[#005c55] text-base">trending_up</span>
                  </div>
                  <div className="text-2xl lg:text-3xl font-headline font-bold text-[#0b1c30] tracking-tight">
                    &lt; 90s<span className="text-sm font-normal text-slate-400"> avg</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Direct clinical escalation speed</p>
                </div>

                <div className="p-4 rounded-xl bg-white shadow-md border border-slate-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>ISOLATION PARITY</span>
                    <span className="material-symbols-outlined text-[#006398] text-base">shield</span>
                  </div>
                  <div className="text-2xl lg:text-3xl font-headline font-bold text-[#0b1c30] tracking-tight">
                    100%
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Zero-trace client-side encryption</p>
                </div>
              </div>

              {/* Social Proof & Compliance Certifications */}
              <div className="pt-4 flex flex-col space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Trusted across 140+ licensed clinical triage networks
                </div>
                <div className="flex flex-wrap items-center gap-5 text-slate-600 font-headline font-semibold text-xs tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00d166]" />
                    ZERO-TRACE E2EE
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#006398]" />
                    TRAUMA-INFORMED PROTOCOL
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#005c55]" />
                    HIPAA COMPLIANT
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    ISO 27001
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Stage & Floating Telemetry HUD */}
            <div className="lg:col-span-6 relative">
              {/* Glass Stage Container */}
              <div className="relative w-full rounded-2xl bg-[#eff4ff]/70 backdrop-blur-2xl shadow-2xl p-3 border border-slate-200/80 overflow-hidden">
                {/* 3D Holographic Canvas Stage */}
                <div className="relative w-full h-[460px] sm:h-[520px] rounded-xl overflow-hidden bg-gradient-to-b from-[#e5eeff] to-[#dce9ff]/90 flex items-center justify-center">
                  <Sanctum3DCanvas />

                  {/* Ambient Backdrop Telemetry Rings */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                    <div
                      className="w-96 h-96 rounded-full border border-dashed border-teal-600/30 animate-spin"
                      style={{ animationDuration: '40s' }}
                    />
                    <div className="absolute w-64 h-64 rounded-full border border-blue-400/25" />
                  </div>

                  {/* HUD Overlay Pill: Top-Left (Cryptographic Isolation) */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-slate-100">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d166] opacity-80" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#005c55]" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#0b1c30]">
                      🛡️ Cryptographic Isolation: <span className="text-[#005c55] font-bold">ACTIVE</span>
                    </span>
                  </div>

                  {/* HUD Overlay Pill: Top-Right (Empathy Mesh) */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-slate-100">
                    <span className="material-symbols-outlined text-[#006398] text-base animate-pulse">
                      favorite
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#0b1c30]">
                      💚 Empathy Engine: <span className="text-[#006398] font-bold">READY</span>
                    </span>
                  </div>

                  {/* HUD Overlay Card: Bottom Center (Emergency Escape Bar) */}
                  <div className="absolute bottom-4 inset-x-4 z-20 mx-auto max-w-sm rounded-xl bg-[#213145]/95 text-white backdrop-blur-xl p-3.5 shadow-2xl border border-slate-700/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-slate-300 uppercase tracking-wider text-[11px]">
                        Safety Quick Exit
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 font-bold">
                        ESC ARMED
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#00d166] text-lg">logout</span>
                        <span className="font-headline font-semibold text-sm text-white tracking-wide">
                          Tap Esc to Instantly Blank
                        </span>
                      </div>
                      <span className="font-mono text-xs text-teal-300 font-bold">0ms Latency</span>
                    </div>
                    <div className="w-full bg-slate-700/80 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#00d166] to-[#006398] h-1.5 rounded-full w-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative overlapping badge */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 z-30 p-4 rounded-xl bg-white shadow-xl items-center gap-3 max-w-xs border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-[#005c55]">
                  <span className="material-symbols-outlined text-2xl">lock</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Local-First Isolation</div>
                  <div className="text-sm font-semibold text-[#0b1c30] font-headline">Zero Persistent Cookies</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 2: LIVE GRID SYNCHRONIZER & METRIC HIGHLIGHTS */}
      <section className="w-full bg-[#eff4ff] py-20 lg:py-28 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#005c55] font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005c55]" />
                Crisis Telemetry Engine
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-[#0b1c30] tracking-tight">
                Real-time triage, zero surveillance.
              </h2>
            </div>
            <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
              Every conversational exchange is computed client-side. Urgent distress score surges route directly to
              licensed trauma counselors before panic overwhelms your nervous system.
            </p>
          </div>

          {/* 3 Key Impact Metric Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Escalation Latency Shaved */}
            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between group border border-slate-100">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#005c55] mb-6 group-hover:bg-[#005c55] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">speed</span>
                </div>
                <div className="font-mono text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Triage Escalation
                </div>
                <div className="text-4xl font-headline font-bold text-[#0b1c30] mb-3 tracking-tight">
                  92% Faster
                </div>
                <div className="text-base font-semibold text-[#0b1c30] mb-2">Crisis Queue De-escalation</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Avoid 45-minute traditional hotline hold queues. AI companion de-escalates panic immediately while
                  relaying clinical alerts to on-duty counselors.
                </p>
              </div>

              {/* Inline Sparkline Graphic (SVG) */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Standard Hotline (45m)</span>
                  <span className="text-[#005c55] font-semibold">SanctumCare (&lt;90s)</span>
                </div>
                <svg className="w-full h-14 overflow-visible" fill="none" viewBox="0 0 280 60">
                  {/* Background reference line */}
                  <path
                    className="text-slate-300"
                    d="M0,50 Q40,48 70,30 T140,10 T210,45 T280,20"
                    stroke="currentColor"
                    strokeDasharray="3 3"
                    strokeWidth="2"
                  />
                  {/* Optimized line */}
                  <path
                    className="text-[#00d166]"
                    d="M0,50 Q40,48 70,40 T140,25 T210,30 T280,32"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <circle className="fill-[#005c55]" cx="140" cy="25" r="4" />
                </svg>
              </div>
            </div>

            {/* Card 2: 100% Zero-Trace Parity */}
            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between group border border-slate-100">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#006398] mb-6 group-hover:bg-[#006398] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">lock_reset</span>
                </div>
                <div className="font-mono text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Survivor Autonomy
                </div>
                <div className="text-4xl font-headline font-bold text-[#0b1c30] mb-3 tracking-tight">
                  100% Zero-Trace
                </div>
                <div className="text-base font-semibold text-[#0b1c30] mb-2">Client Ephemeral Keys</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  No tracking pixels, no advertising identifiers, and no server-side audio recordings. De-identified
                  hashes allow counselor review without exposing survivor identities.
                </p>
              </div>

              {/* Circular Metric Visualization */}
              <div className="mt-8 pt-6 flex items-center gap-4 border-t border-slate-100">
                <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-[#00d166]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="100, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute text-xs font-mono font-bold text-[#0b1c30]">100%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-semibold text-[#0b1c30]">Zero Data Retention</span>
                  <span className="text-xs text-slate-500">Ephemeral RAM Sandbox</span>
                </div>
              </div>
            </div>

            {/* Card 3: 0 ms Cloud Leakage */}
            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between group border border-slate-100">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#0b1c30] mb-6 group-hover:bg-[#0b1c30] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">memory</span>
                </div>
                <div className="font-mono text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Edge Computing
                </div>
                <div className="text-4xl font-headline font-bold text-[#0b1c30] mb-3 tracking-tight">
                  0 ms
                </div>
                <div className="text-base font-semibold text-[#0b1c30] mb-2">Local Edge Response</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Somatic exercises, breathing pacing, and quick-exit redirects execute directly within your browser
                  thread, remaining functional even during connectivity drops.
                </p>
              </div>

              {/* Hardware / Security Status Bar */}
              <div className="mt-8 pt-6 flex flex-col space-y-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Security Ring: E2EE</span>
                  <span className="text-[#005c55] font-bold">SHIELD ARMED</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  <div className="h-2 rounded-full bg-[#00d166]" />
                  <div className="h-2 rounded-full bg-[#00d166]" />
                  <div className="h-2 rounded-full bg-[#00d166]" />
                  <div className="h-2 rounded-full bg-[#00d166]" />
                  <div className="h-2 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Live Edge Controller Mockup Card (Interactive Sandbox Simulator) */}
          <div className="mt-12 p-6 sm:p-10 rounded-2xl bg-[#213145] text-white shadow-2xl relative overflow-hidden border border-slate-700/60">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300">
                  LIVE CLINICAL TRIAGE MESH
                </span>
                <h3 className="text-2xl sm:text-3xl font-headline font-bold text-white tracking-tight">
                  Interactive Triage Simulator
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Experience how SanctumCare instantly balances survivor privacy with rapid counselor escalation when
                  acute distress signals are detected.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSimulateSurge}
                    className="px-4 py-2.5 rounded-lg bg-[#00d166] text-[#005324] text-xs font-mono font-bold hover:bg-emerald-300 transition-colors cursor-pointer shadow-md"
                  >
                    {isSurgeActive ? 'RESTORE NOMINAL MONITORING' : 'TRIGGER SIMULATED CRISIS ESCALATION'}
                  </button>
                  <span
                    className={`text-xs font-mono ${
                      isSurgeActive ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-400'
                    }`}
                  >
                    {isSurgeActive ? 'Status: Urgent Alert Active' : 'Status: Nominal Sanctuary'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric Mini 1: Somatic Distress Score */}
                <div className="p-5 rounded-xl bg-slate-900/50 backdrop-blur-md flex flex-col justify-between border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>SOMATIC DISTRESS</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSurgeActive ? 'bg-rose-500 animate-ping' : 'bg-[#00d166]'
                      }`}
                    />
                  </div>
                  <div className="my-3">
                    <span className="text-2xl font-headline font-bold text-white">
                      {isSurgeActive ? 'Score 89 (Acute)' : 'Score 22 (Mild)'}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isSurgeActive ? 'Threshold 75 Exceeded' : 'Grounding Recommended'}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-teal-300">
                    {isSurgeActive ? 'Priority: Level 1 Urgent' : 'Pulse: Stable Baseline'}
                  </div>
                </div>

                {/* Metric Mini 2: Counselor Relay */}
                <div className="p-5 rounded-xl bg-slate-900/50 backdrop-blur-md flex flex-col justify-between border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>COUNSELOR RELAY</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSurgeActive ? 'bg-amber-400 animate-pulse' : 'bg-blue-400'
                      }`}
                    />
                  </div>
                  <div className="my-3">
                    <span className="text-2xl font-headline font-bold text-white">
                      {isSurgeActive ? 'Dr. Vance (Notified)' : 'Standby Pool (Ready)'}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isSurgeActive ? 'Secure Relay Active' : 'Encrypted Token Standby'}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-sky-300">
                    {isSurgeActive ? 'SLA: Response in < 60s' : 'Queue: Zero Backlog'}
                  </div>
                </div>

                {/* Metric Mini 3: Privacy Isolation */}
                <div className="p-5 rounded-xl bg-slate-900/50 backdrop-blur-md flex flex-col justify-between border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>IDENTITY SHIELD</span>
                    <span className="w-2 h-2 rounded-full bg-[#00d166]" />
                  </div>
                  <div className="my-3">
                    <span className="text-2xl font-headline font-bold text-white">
                      {isSurgeActive ? 'CASE-1042 Mask' : 'SHA-256 Anon'}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">Zero PII Leak Across Relay</p>
                  </div>
                  <div className="text-xs font-mono text-emerald-300">Entropy: 256-bit AES</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: UNIFIED ECOSYSTEM ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#006398] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006398]" />
            Trauma-Informed Modality Fabric
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-[#0b1c30] tracking-tight">
            Coordinated care with the support networks you already trust.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            SanctumCare replaces fragmented crisis systems with unified, local coordination across somatic grounding,
            clinical triage, and regional administrative safety nets.
          </p>
        </div>

        {/* 4 Hardware / Care Category Mosaics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category 1: Somatic & Grounding */}
          <div className="p-6 rounded-2xl bg-[#e5eeff] shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/60">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#005c55] text-3xl">spa</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                  CONNECTED
                </span>
              </div>
              <h4 className="text-xl font-headline font-bold text-[#0b1c30] mb-2">Somatic Grounding</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Interactive 5-4-3-2-1 sensory exercises and paced box breathing to regulate racing nervous systems.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500">SUPPORTED MODALITIES:</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">Box Breathing</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">5-4-3-2-1 Sensory</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">Vagal Reset</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 bg-[#eff4ff] p-3.5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#0b1c30]">Distress Attenuation</span>
                <span className="text-[#005c55] font-bold">-64% Heart Rate</span>
              </div>
              <div className="w-full bg-[#dce9ff] rounded-full h-1.5">
                <div className="bg-[#005c55] h-1.5 rounded-full w-4/5" />
              </div>
            </div>
          </div>

          {/* Category 2: Clinical Counselor Triage */}
          <div className="p-6 rounded-2xl bg-[#e5eeff] shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/60">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#006398] text-3xl">medical_services</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-[#006398]">
                  ACTIVE
                </span>
              </div>
              <h4 className="text-xl font-headline font-bold text-[#0b1c30] mb-2">Counselor Triage Mesh</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                De-identified psychological trends and rapid escalation feeds for licensed crisis response advocates.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500">SUPPORTED NETWORKS:</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">LCSW Triage</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">988 Lifeline</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">Crisis Text</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 bg-[#eff4ff] p-3.5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#0b1c30]">Alert Latency</span>
                <span className="text-[#006398] font-bold">&lt; 45s SLA</span>
              </div>
              <div className="w-full bg-[#dce9ff] rounded-full h-1.5">
                <div className="bg-[#006398] h-1.5 rounded-full w-5/6" />
              </div>
            </div>
          </div>

          {/* Category 3: Zero-Knowledge Vault */}
          <div className="p-6 rounded-2xl bg-[#e5eeff] shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/60">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#005c55] text-3xl">key</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                  ENCRYPTED
                </span>
              </div>
              <h4 className="text-xl font-headline font-bold text-[#0b1c30] mb-2">Survivor Privacy Vault</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Client-side AES-256 session tokens with zero persistent cookies and instant emergency memory purges.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500">DEFENSIVE FEATURES:</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">No History</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">ESC Override</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">Camouflage</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 bg-[#eff4ff] p-3.5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#0b1c30]">Identity Protection</span>
                <span className="text-[#005c55] font-bold">100% Guarded</span>
              </div>
              <div className="w-full bg-[#dce9ff] rounded-full h-1.5">
                <div className="bg-[#00d166] h-1.5 rounded-full w-full" />
              </div>
            </div>
          </div>

          {/* Category 4: District Admin Oversight */}
          <div className="p-6 rounded-2xl bg-[#e5eeff] shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/60">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#006398] text-3xl">domain</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-[#006398]">
                  OVERSIGHT
                </span>
              </div>
              <h4 className="text-xl font-headline font-bold text-[#0b1c30] mb-2">Regional Governance</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Anonymized district heatmaps, counselor workload allocation, and ethical compliance logging.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500">ADMIN STANDARDS:</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">District Heatmap</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">SLA Audit</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">Zero PII Logs</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 bg-[#eff4ff] p-3.5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#0b1c30]">Network Capacity</span>
                <span className="text-[#006398] font-bold">98% Available</span>
              </div>
              <div className="w-full bg-[#dce9ff] rounded-full h-1.5">
                <div className="bg-[#006398] h-1.5 rounded-full w-[98%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Feature Narrative Mosaic with Photo Assets */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl bg-slate-200 border border-slate-200/80">
            <img
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqnW-0e1gC80Ae93YPTqPm1BLST3sz4TAhHJUOCwaAkMayt2xg2w5OTG50rgwkqZ7qPq8nAimasp_H7BU2X9oTWNN46iTcYl-6s-rEx2UUV0T-9cl1MyOJKeDux1-06kCYMnksmIPXs5gL1bLvXF3Jot4TUw1T2ObQuOO40rZLq4DjgswBVwXIb82AHV--HKixf8mTbl3VZgH0fHyZ_GmhPG5upvUtS__et2rElC1J28mdi9v1Yt2R"
              alt="A sunlit, architectural modern sustainable home interior with sleek calming spaces, bathed in soft afternoon light with green plant accents"
            />
          </div>
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono text-[#005c55] font-bold uppercase tracking-widest">
              AUTONOMIC CALIBRATION
            </span>
            <h3 className="text-3xl font-headline font-bold text-[#0b1c30] tracking-tight leading-snug">
              Designed to run quietly in your moment of greatest need.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional crisis hotlines of the past demanded endless bureaucratic intake and painful repetition of
              trauma. SanctumCare runs an empathetic neural model that respects your boundaries, learns your somatic
              baseline, and offers instant refuge without judgment.
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#005c55]">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0b1c30] font-headline">
                    Zero Invasive Questionnaires
                  </div>
                  <div className="text-xs text-slate-500">Conversational AI companion adapts to your comfort level.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPARISON MATRIX & IMPACT CALCULATOR PREVIEW */}
      <section className="w-full bg-[#eff4ff] py-20 lg:py-28 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#005c55] font-semibold">
              Paradigmatic Shift
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-[#0b1c30] tracking-tight">
              Passive Help Lines vs. Active Sanctuary Autonomy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              See why legacy phone hotlines and intake forms fail survivors during acute moments of distress.
            </p>
          </div>

          {/* Side by Side Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Legacy Crisis Hotline */}
            <div className="p-8 rounded-2xl bg-[#e5eeff] shadow-xs space-y-6 border border-slate-200/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                <div>
                  <h4 className="text-xl font-headline font-bold text-[#0b1c30]">Traditional Crisis Hotlines</h4>
                  <p className="text-xs text-slate-500">Fragmented intake queues &amp; invasive disclosures</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-rose-100 text-rose-800 font-semibold">
                  PASSIVE
                </span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-rose-600 text-lg mt-0.5">close</span>
                  <p className="text-slate-600">
                    <strong className="text-[#0b1c30]">Lengthy Hold Queues:</strong> Average 45+ minute hold times
                    when every second of isolation feels intolerable.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-rose-600 text-lg mt-0.5">close</span>
                  <p className="text-slate-600">
                    <strong className="text-[#0b1c30]">Persistent Identity Logs:</strong> Phone numbers, IP logs, and
                    call records logged to remote databases.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-rose-600 text-lg mt-0.5">close</span>
                  <p className="text-slate-600">
                    <strong className="text-[#0b1c30]">Traumatic Re-Explanation:</strong> Survivors must re-explain
                    intrusive trauma details to multiple operators.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-rose-600 text-lg mt-0.5">close</span>
                  <p className="text-slate-600">
                    <strong className="text-[#0b1c30]">Zero Panic Redirection:</strong> No discrete quick-exit escape
                    if an abuser enters the room.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200/60">
                <div className="p-4 rounded-xl bg-[#dce9ff]/60 text-xs font-mono text-slate-500">
                  Estimated Average Delay:{' '}
                  <strong className="text-[#0b1c30] font-headline font-bold text-sm">45 – 90 Minutes</strong>
                </div>
              </div>
            </div>

            {/* SanctumCare Autonomous Sanctuary */}
            <div className="p-8 rounded-2xl bg-white shadow-xl space-y-6 relative overflow-hidden border border-teal-200/80">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-xl font-headline font-bold text-[#0b1c30]">SanctumCare Autonomous Sanctuary</h4>
                  <p className="text-xs text-slate-500">Closed-loop zero-knowledge crisis coordination</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-teal-100 text-teal-900 font-semibold">
                  AUTONOMOUS
                </span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#005c55] text-lg mt-0.5">check_circle</span>
                  <p className="text-slate-700">
                    <strong className="text-[#0b1c30]">Instant Conversational Refuge:</strong> Empathetic companion
                    responds immediately to de-escalate panic without waiting.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#005c55] text-lg mt-0.5">check_circle</span>
                  <p className="text-slate-700">
                    <strong className="text-[#0b1c30]">Zero-Knowledge Privacy:</strong> Client-side cryptographic
                    isolation with zero persistent cookies or IP tracking.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#005c55] text-lg mt-0.5">check_circle</span>
                  <p className="text-slate-700">
                    <strong className="text-[#0b1c30]">Automated Clinical Relay:</strong> Severe distress thresholds
                    instantly ring licensed counselors with anonymized case summaries.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#005c55] text-lg mt-0.5">check_circle</span>
                  <p className="text-slate-700">
                    <strong className="text-[#0b1c30]">Emergency Quick Exit:</strong> Tap <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono text-xs">ESC</kbd> to
                    instantly wipe session memory and camouflage as a neutral portal.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-teal-50 text-xs font-mono text-teal-900 flex items-center justify-between">
                  <span>Estimated Response Time:</span>
                  <span className="text-[#005c55] font-headline font-bold text-lg">&lt; 90 Seconds</span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact & Healing Index Strip */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white shadow-md border border-slate-200/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-2">
                <span className="text-xs font-mono text-[#005c55] font-bold uppercase tracking-wider">
                  Community Resilience Metrics
                </span>
                <h3 className="text-2xl font-headline font-bold text-[#0b1c30] tracking-tight">
                  Measure the Impact of Immediate Care
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Real-time data across regional deployments demonstrates that early, unpressured check-ins prevent acute
                  crisis hospitalizations.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#eff4ff]">
                  <div className="text-xs font-mono text-slate-400">ANNUAL SUPPORT VALUE</div>
                  <div className="text-2xl sm:text-3xl font-headline font-bold text-[#005c55] mt-1">$1,420</div>
                  <span className="text-[11px] text-slate-500">Subsidized survivor care</span>
                </div>
                <div className="p-4 rounded-xl bg-[#eff4ff]">
                  <div className="text-xs font-mono text-slate-400">DE-ESCALATION TIME</div>
                  <div className="text-2xl sm:text-3xl font-headline font-bold text-[#0b1c30] mt-1">4.2 min</div>
                  <span className="text-[11px] text-slate-500">Median somatic relief</span>
                </div>
                <div className="p-4 rounded-xl bg-[#eff4ff]">
                  <div className="text-xs font-mono text-slate-400">PRIVACY PARITY</div>
                  <div className="text-2xl sm:text-3xl font-headline font-bold text-[#006398] mt-1">100%</div>
                  <span className="text-[11px] text-slate-500">Zero data surveillance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HIGH-CONVERTING CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
        <div className="relative rounded-3xl bg-[#213145] text-white shadow-2xl p-8 sm:p-14 lg:p-16 overflow-hidden border border-slate-700/60">
          {/* Luminous Edge Gradient Accents */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-300 text-xs font-mono font-medium backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00d166] animate-pulse" />
              CONFIDENTIAL COMMUNITY ACCESS NOW OPEN
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-white tracking-tight leading-tight">
              Ready to experience trauma-informed support on your own terms?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Check your regional district coverage instantly. Over 140 health agencies and clinical boards now subsidize
              SanctumCare confidential check-ins with 100% free survivor access.
            </p>

            {/* Address / Zip Search Input Cluster */}
            <div className="pt-4 max-w-xl mx-auto">
              <form
                onSubmit={handleZipSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-xl bg-white/10 backdrop-blur-xl shadow-inner border border-white/10"
              >
                <div className="flex items-center gap-3 px-4 py-2.5 w-full">
                  <span className="material-symbols-outlined text-slate-300">location_on</span>
                  <input
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-slate-400 font-body"
                    placeholder="Enter district name or ZIP code"
                    type="text"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#005c55] text-white font-semibold text-sm hover:bg-[#00d166] hover:text-[#005324] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-teal-900/30 cursor-pointer"
                >
                  <span>Check District</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>

              {/* Result Display Container */}
              {zipResult && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/20 text-xs font-mono text-emerald-300 text-center transition-all border border-emerald-400/30">
                  {zipResult}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#00d166]">lock</span> Zero Data Stored
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#00d166]">schedule</span> Instant &lt;90s Response
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#00d166]">cancel</span> 100% Anonymous
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
