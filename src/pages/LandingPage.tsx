import React from 'react';
import { PageId } from '../types';
import { CareSync3DCanvas } from '../components/CareSync3DCanvas';

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full bg-[#f8f9ff] text-[#0b1c30] antialiased">
      {/* HERO SECTION — full-bleed 3D backdrop with centered content over it */}
      <section className="relative w-full overflow-hidden min-h-[640px] sm:min-h-[760px] flex items-center justify-center">
        {/* Full-bleed animated 3D backdrop */}
        <div className="absolute inset-0 z-0">
          <CareSync3DCanvas />
        </div>

        {/* Legibility scrim: soft light spotlight behind the text, animation stays visible at the edges */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 42%, rgba(248,249,255,0.94) 0%, rgba(248,249,255,0.75) 45%, rgba(248,249,255,0.15) 75%, rgba(248,249,255,0) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 z-[1] bg-gradient-to-b from-transparent to-[#f8f9ff] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 sm:py-32 text-center flex flex-col items-center">
          {/* Micro-badge / System Status Chip */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#dce9ff]/70 border border-blue-200/60 shadow-xs backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d166] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d166]" />
            </span>
            <span className="text-xs font-mono font-semibold tracking-wider text-[#0b1c30] uppercase">
              A calmer path, one check-in at a time
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-[#0b1c30] tracking-tight leading-[1.08] mb-5">
            Your gentle companion for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005c55] via-[#00d166] to-[#006398]">
              safety and healing.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal mb-8">
            CareSync listens without judgment, helps you feel grounded in the moment, and connects you with a caring
            counselor whenever you're ready — all while keeping your privacy at the center.
          </p>

          {/* Primary CTA Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={() => onNavigate('register')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#005c55] to-[#006398] text-white font-semibold text-base shadow-lg shadow-teal-900/20 hover:shadow-xl transition-all duration-200 group cursor-pointer"
            >
              <span>Get Started Free</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0b1c30] hover:bg-[#eff4ff] font-semibold text-base transition-all shadow-xs border border-slate-200/70 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#006398] text-xl">play_circle</span>
              <span>Try Demo</span>
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-[#0b1c30] hover:text-[#005c55] font-semibold text-base transition-all cursor-pointer"
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE GRID SYNCHRONIZER & METRIC HIGHLIGHTS */}
      <section id="features" className="w-full bg-[#eff4ff] py-20 lg:py-28 border-y border-slate-200/70">
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
              Every conversational exchange in this prototype runs entirely in your browser — nothing is sent to a
              server, and no real counselor is contacted. It's a working preview of how that routing could work in a
              full deployment.
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
                  No Hold Queue
                </div>
                <div className="text-base font-semibold text-[#0b1c30] mb-2">Respond first, route second</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This prototype's guided companion responds immediately with grounding prompts — no hold music, no
                  waiting on the line. It's a scripted demo and doesn't contact a real counselor or hotline.
                </p>
              </div>
            </div>

            {/* Card 2: Survivor privacy */}
            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between group border border-slate-100">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#006398] mb-6 group-hover:bg-[#006398] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">lock_reset</span>
                </div>
                <div className="font-mono text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Survivor Autonomy
                </div>
                <div className="text-4xl font-headline font-bold text-[#0b1c30] mb-3 tracking-tight">
                  Privacy focused
                </div>
                <div className="text-base font-semibold text-[#0b1c30] mb-2">Private session controls</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This prototype is designed for private support demonstrations. Use synthetic information and avoid
                  entering real identifying details.
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
                  Somatic exercises and breathing pacing execute directly within your browser thread, remaining
                  functional even during connectivity drops.
                </p>
              </div>

              {/* Architecture Note */}
              <div className="mt-8 pt-6 flex items-center justify-between text-xs font-mono border-t border-slate-100">
                <span className="text-slate-400">No server round-trip</span>
                <span className="text-[#005c55] font-bold">RUNS IN-BROWSER</span>
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
                  See How Triage Works
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  A preview of how CareSync could balance survivor privacy with counselor escalation when acute
                  distress signals are detected. No real counselor is contacted in this demo.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('home')}
                    className="px-4 py-2.5 rounded-lg bg-[#00d166] text-[#005324] text-xs font-mono font-bold hover:bg-emerald-300 transition-colors cursor-pointer shadow-md"
                  >
                    TRY THE LIVE DEMO
                  </button>
                  <span className="text-xs font-mono text-slate-400">Status: Nominal Monitoring</span>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric Mini 1: Somatic Distress Score */}
                <div className="p-5 rounded-xl bg-slate-900/50 backdrop-blur-md flex flex-col justify-between border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>SOMATIC DISTRESS</span>
                    <span className="w-2 h-2 rounded-full bg-[#00d166]" />
                  </div>
                  <div className="my-3">
                    <span className="text-2xl font-headline font-bold text-white">Score 22 (Mild)</span>
                    <p className="text-xs text-slate-400 mt-0.5">Grounding Recommended</p>
                  </div>
                  <div className="text-xs font-mono text-teal-300">Pulse: Stable Baseline</div>
                </div>

                {/* Metric Mini 2: Counselor Relay */}
                <div className="p-5 rounded-xl bg-slate-900/50 backdrop-blur-md flex flex-col justify-between border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>COUNSELOR RELAY</span>
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div className="my-3">
                    <span className="text-2xl font-headline font-bold text-white">Standby Pool (Ready)</span>
                    <p className="text-xs text-slate-400 mt-0.5">Support Pool Standby</p>
                  </div>
                  <div className="text-xs font-mono text-sky-300">Queue: Zero Backlog</div>
                </div>

                {/* Metric Mini 3: Privacy Isolation */}
                <div className="p-5 rounded-xl bg-slate-900/50 backdrop-blur-md flex flex-col justify-between border border-slate-700/50">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>IDENTITY SHIELD</span>
                    <span className="w-2 h-2 rounded-full bg-[#00d166]" />
                  </div>
                  <div className="my-3">
                    <span className="text-2xl font-headline font-bold text-white">Anonymous Demo</span>
                    <p className="text-xs text-slate-400 mt-0.5">Demo data for counselor review</p>
                  </div>
                  <div className="text-xs font-mono text-emerald-300">Privacy review ready</div>
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
            CareSync replaces fragmented crisis systems with unified, local coordination across somatic grounding,
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
            <div className="mt-8 pt-4 bg-[#eff4ff] p-3.5 rounded-xl text-xs text-slate-600 leading-relaxed">
              Guided prompts only — this prototype doesn't connect to any wearable or heart-rate sensor.
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
                A mock counselor dashboard demonstrating de-identified case review and escalation triage — this demo
                is not connected to any real crisis line or licensed provider.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500">RELATED EXTERNAL RESOURCE:</div>
                <div className="flex flex-wrap gap-1.5">
                  <a
                    href="tel:988"
                    className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30] hover:bg-slate-50"
                  >
                    Call 988 Lifeline
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 bg-[#eff4ff] p-3.5 rounded-xl text-xs text-slate-600 leading-relaxed">
              Demo data only — no live counselors are notified in this prototype.
            </div>
          </div>

            {/* Category 3: Survivor Privacy */}
          <div className="p-6 rounded-2xl bg-[#e5eeff] shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/60">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#005c55] text-3xl">key</span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                  PRIVATE
                </span>
              </div>
              <h4 className="text-xl font-headline font-bold text-[#0b1c30] mb-2">Survivor Privacy Vault</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Privacy-focused session handling with no advertising identifiers and no persistent history.
              </p>
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500">DEFENSIVE FEATURES:</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">No History</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">No Trackers</span>
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">Ephemeral Sessions</span>
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
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-white text-[#0b1c30]">Demo data only</span>
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

      </section>

      {/* PRIVACY SECTION: anchor target for the header's "Privacy" nav link */}
      <section id="privacy" className="max-w-5xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
        <div className="relative rounded-[2rem] bg-white shadow-xl border border-slate-200/80 p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#005c55] to-[#006398] flex items-center justify-center text-white shadow-lg shadow-teal-900/20 mb-6">
              <span className="material-symbols-outlined text-3xl">shield</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-[#0b1c30] tracking-tight mb-4">
              Your story stays <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005c55] to-[#006398]">yours.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
              CareSync is built privacy-first: conversations are handled client-side, nothing is retained beyond the
              active session, and counselor visibility only ever shows de-identified summaries. This prototype uses
              synthetic demo data throughout.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-full bg-[#eff4ff] border border-slate-200/70 text-xs font-mono font-semibold text-[#0b1c30]">
                Privacy Focused
              </span>
              <span className="px-4 py-2 rounded-full bg-[#eff4ff] border border-slate-200/70 text-xs font-mono font-semibold text-[#0b1c30]">
                No Persistent History
              </span>
              <span className="px-4 py-2 rounded-full bg-[#eff4ff] border border-slate-200/70 text-xs font-mono font-semibold text-[#0b1c30]">
                No Third-Party Trackers
              </span>
              <span className="px-4 py-2 rounded-full bg-[#eff4ff] border border-slate-200/70 text-xs font-mono font-semibold text-[#0b1c30]">
                Demo Data Only
              </span>
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
              Passive Help Lines vs. Active CareSync Autonomy
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
                    <strong className="text-[#0b1c30]">No Async Options:</strong> Support only available via live
                    phone calls, with no self-guided or async support path.
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

            {/* CareSync Autonomous Care */}
            <div className="p-8 rounded-2xl bg-white shadow-xl space-y-6 relative overflow-hidden border border-teal-200/80">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-xl font-headline font-bold text-[#0b1c30]">CareSync Autonomous Care</h4>
                  <p className="text-xs text-slate-500">Closed-loop crisis coordination</p>
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
                    <strong className="text-[#0b1c30]">Privacy-first design:</strong> Clear privacy choices and no
                    advertising identifiers in this prototype.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#005c55] text-lg mt-0.5">check_circle</span>
                  <p className="text-slate-700">
                    <strong className="text-[#0b1c30]">Built for Transparency:</strong> Every score and case shown in
                    this prototype is synthetic demo data — no real counselor is contacted.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#005c55] text-lg mt-0.5">check_circle</span>
                  <p className="text-slate-700">
                    <strong className="text-[#0b1c30]">Always-On Privacy:</strong> Session data lives only in memory
                    and disappears the moment you close the tab.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-teal-50 text-xs font-mono text-teal-900 flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-[#005c55] font-headline font-bold text-lg">Prototype Demo</span>
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
              FREE PROTOTYPE — TRY IT NOW
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-white tracking-tight leading-tight">
              Ready to experience trauma-informed support on your own terms?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Explore the guided check-in or create an account to see how CareSync works — no cost, no commitment,
              synthetic demo data throughout.
            </p>

            {/* Primary Access CTAs */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate('register')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#005c55] text-white font-semibold text-sm hover:bg-[#00d166] hover:text-[#005324] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-teal-900/30 cursor-pointer"
                >
                  <span>Sign Up Free</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap border border-white/10 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  <span>Try the Demo</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#00d166]">lock</span> Zero Data Stored
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#00d166]">schedule</span> No Sign-Up Required to Try
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
