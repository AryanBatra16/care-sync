import React, { useState } from 'react';
import { PageId } from '../types';
import { ASSETS } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [demoMode, setDemoMode] = useState(true);

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden pt-10 pb-20 lg:pt-14 lg:pb-24">
        {/* Calming ambient background glow shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-[600px] pointer-events-none opacity-60">
          <div className="absolute top-10 left-10 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-10 w-[480px] h-[480px] bg-sky-200/40 rounded-full blur-3xl"></div>
          <div className="absolute top-44 left-1/3 w-80 h-80 bg-emerald-200/25 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines and 3 Entry Options */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 shadow-xs mb-5">
                <span className="text-sm">🛡️</span>
                <span className="text-xs sm:text-sm font-semibold text-teal-900 tracking-wide">
                  Zero-Knowledge Architecture • Client-Side Encryption
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
                Your voice matters.<br className="hidden sm:inline" /> Your safety comes first.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                SafeCheck provides a private space for victims to check in, express how they are feeling, and connect with the right support.
              </p>

              {/* The Three Entry Options */}
              <div className="w-full max-w-xl space-y-3.5">
                {/* 1. Victim Check-In (Primary Highlighted Action) */}
                <button
                  onClick={() => onNavigate('guided-check-in')}
                  className="w-full text-left group relative block p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white shadow-xl shadow-teal-900/15 hover:shadow-2xl hover:shadow-teal-900/25 border border-teal-400/40 hover:border-teal-300 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[28px] text-teal-100">favorite</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-xl font-bold tracking-tight text-white">Victim Check-In</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-teal-300/20 border border-teal-200/30 text-[11px] font-semibold text-teal-100">
                            100% Confidential • No Account Needed
                          </span>
                        </div>
                        <p className="text-sm text-teal-100/90 font-medium mt-1">Private and guided check-ins</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 group-hover:translate-x-1 transition-all">
                      <span className="material-symbols-outlined text-[20px] text-white">arrow_forward</span>
                    </div>
                  </div>
                </button>

                {/* Secondary Row: Counselor & Admin Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* 2. Counselor Login */}
                  <button
                    onClick={() => onNavigate('counselor-cases')}
                    className="w-full text-left group p-4 sm:p-4.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/90 hover:border-teal-400/60 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-teal-700">
                        <span className="material-symbols-outlined text-[20px]">medical_services</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                          Counselor Login
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">Monitor and support assigned cases</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-900">
                      <span>Licensed Care Portal</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </button>

                  {/* 3. Official / Admin Login */}
                  <button
                    onClick={() => onNavigate('admin-portal')}
                    className="w-full text-left group p-4 sm:p-4.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/90 hover:border-teal-400/60 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-sky-700">
                        <span className="material-symbols-outlined text-[20px]">verified_user</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                          Official/Admin Login
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">View secure case insights</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-800 group-hover:text-teal-900">
                      <span>Authorized Agency Access</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Micro Reassurance */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-4 pl-1">
                <span className="material-symbols-outlined text-[15px] text-teal-700">lock</span>
                <span>Anonymous token exchange • Zero device logs or location tracking</span>
              </div>
            </div>

            {/* Right Column: 3D Artwork Visual & Glass Badges */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none rounded-3xl p-3 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl border border-white/80 shadow-2xl shadow-slate-900/10">
                <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3]">
                  <img
                    src={ASSETS.heroArtwork}
                    alt="SafeCheck Private E2EE Mental Health Infrastructure Visual"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-semibold tracking-wide">Ephemeral Session Active</span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md border border-teal-400/30 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-teal-200 shadow-xl">
                    <span className="material-symbols-outlined text-[16px] text-teal-300">enhanced_encryption</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider leading-tight">
                        State
                      </span>
                      <span className="text-xs font-bold text-teal-100 leading-tight">E2EE Hash Verified</span>
                    </div>
                  </div>
                </div>

                {/* Sub-card Micro Trust Matrix */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Memory</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">RAM-Only Scrub</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Identity</p>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">Zero Footprint</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Advocates</p>
                    <p className="text-xs font-bold text-teal-800 mt-0.5">Certified 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SCREEN GALLERY JUMP BAR (Super useful for the user to explore all requested screens!) */}
      <section className="w-full bg-slate-100/70 border-y border-slate-200 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-teal-700">dashboard_customize</span>
            <span>Interactive Screens Explorer:</span>
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => onNavigate('guided-check-in')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              1. Guided Check-In
            </button>
            <button
              onClick={() => onNavigate('check-in-concluded')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              2. Concluded Receipt
            </button>
            <button
              onClick={() => onNavigate('my-check-ins')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              3. My Sanctuary (Timeline)
            </button>
            <button
              onClick={() => onNavigate('counselor-cases')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              4. Counselor Cases
            </button>
            <button
              onClick={() => onNavigate('case-detail')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              5. Case Detail (CASE-1042)
            </button>
            <button
              onClick={() => onNavigate('counselor-alerts')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              6. Counselor Alerts
            </button>
            <button
              onClick={() => onNavigate('admin-portal')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              7. Admin Regional Overview
            </button>
            <button
              onClick={() => onNavigate('ethics-and-privacy')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              8. Ethics &amp; Privacy
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              9. Settings
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              10. Login
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-teal-50 border border-slate-200 text-slate-800 font-medium hover:text-teal-800 shadow-2xs transition-colors"
            >
              11. Register
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="w-full bg-white py-20 border-b border-slate-200/70" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-teal-800 uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 mb-3">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Dignity and Discretion in Three Simple Steps
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Designed from the ground up for minimal friction, complete safety, and instant peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 01 */}
            <div className="relative z-10 bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-teal-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                    01
                  </span>
                  <span className="material-symbols-outlined text-[28px] text-teal-700/70">check_circle</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Check In</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Express your feelings and physical safety through low-friction, guided prompts without signing up or
                  leaving browser history.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-bold text-teal-800">
                <span className="material-symbols-outlined text-[16px]">no_encryption_gmailerrorred</span>
                <span>Zero Account Residue</span>
              </div>
            </div>

            {/* Step 02 */}
            <div className="relative z-10 bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-teal-700 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-teal-800/20 group-hover:scale-105 transition-transform">
                    02
                  </span>
                  <span className="material-symbols-outlined text-[28px] text-teal-700/70">lock_reset</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Understand</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Client-side encryption parses subjective distress into objective, anonymized risk metrics without
                  exposing your personal identity.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-bold text-teal-800">
                <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                <span>Encrypted Distress Index</span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="relative z-10 bg-slate-50/80 hover:bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-teal-800 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-teal-900/20 group-hover:scale-105 transition-transform">
                    03
                  </span>
                  <span className="material-symbols-outlined text-[28px] text-teal-700/70">support_agent</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Support</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Seamlessly connect with licensed crisis counselors or authorized trauma advocates on your own terms.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-bold text-teal-800">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Certified Trauma Advocates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SANCTUARY FRAMEWORK */}
      <section className="w-full bg-slate-50/60 py-20" id="privacy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-teal-800 uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 mb-3">
              SANCTUARY FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Psychological Safety and Strict Data Ownership
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Rigorous technical guardrails protect vulnerable individuals at every layer of system architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">visibility_off</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Privacy First</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Zero browser cookies, zero device fingerprinting, and automatic session cleanup to protect your digital
                  trail.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>No Cookies / No Telemetry</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">enhanced_encryption</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Secure Data Handling</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Zero-knowledge client-side encryption ensures only you and consented advocates can view check-in details.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>E2EE Cryptographic Salt</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">insights</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Explainable Risk Insights</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Clear, human-readable triage levels that empower counselors to act swiftly without intrusive
                  surveillance.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>Transparent Triage Scoring</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">psychology</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Human-Centered Support</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Direct routing exclusively to certified, trauma-informed professionals trained in empathetic
                  de-escalation.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>Trauma-Informed Vetting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DEMO BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700/50">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px] text-teal-300">science</span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Exploring SafeCheck in Demo Mode
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-teal-400/20 text-teal-300 border border-teal-400/30">
                  Sandbox
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-1 max-w-xl">
                Synthetic profiles and mock cryptographic check-ins are preloaded so judges, counselors, and reviewers can test live triage and counselor workflows safely.
              </p>
            </div>
          </div>

          {/* Interactive Demo Toggle */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shrink-0">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                demoMode ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
              }`}
            ></span>
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {demoMode ? 'DEMO MODE: ON' : 'DEMO MODE: OFF'}
            </span>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                demoMode ? 'bg-teal-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  demoMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
