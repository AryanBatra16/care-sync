import React from 'react';
import { PageId } from '../types';

interface EthicsAndPrivacyPageProps {
  onNavigate: (page: PageId) => void;
}

export const EthicsAndPrivacyPage: React.FC<EthicsAndPrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-bold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-[15px]">verified_user</span>
          <span>Architectural Integrity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Ethics &amp; Privacy Guarantees
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          A zero-knowledge sanctuary built upon mathematical boundaries, trauma-informed protocols, and uncompromising
          isolation.
        </p>
      </div>

      {/* Synthetic Data Notice Banner */}
      <div className="bg-teal-900 text-white rounded-3xl p-6 sm:p-8 mb-12 border border-teal-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-800 border border-teal-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px] text-teal-300">science</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>100% Synthetic Demo Data Disclosure</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-400/20 text-teal-300 border border-teal-400/30 uppercase">
                Compliance Standard
              </span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
              To protect survivor confidentiality during evaluation and clinical demonstrations, all names, distress
              trajectories, and case hashes presented in this preview are procedurally synthesized. No real survivor
              records are stored in this sandbox environment.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer"
        >
          Return Home
        </button>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Pillar 1 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-5 font-bold">
              <span className="material-symbols-outlined text-[26px]">enhanced_encryption</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Zero-Knowledge Cryptographic Isolation</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              All reflection inputs are encrypted on the survivor's client device using AES-GCM-256 with key derivation
              via Argon2id. Neither server administrators, cloud providers, nor telemetry systems hold the decryption
              keys.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Standard: NIST SP 800-38D</span>
            <span className="text-emerald-700 font-bold">Verified Client-Side</span>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-800 flex items-center justify-center mb-5 font-bold">
              <span className="material-symbols-outlined text-[26px]">memory</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ephemeral In-Memory State</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              CareSync maintains zero persistent browser cookies and zero local tracking cookies. When a session
              concludes or the user hits Quick Exit (ESC), volatile memory buffers are overwritten with zero-bytes.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Buffer Overwrite: DoD 5220.22-M</span>
            <span className="text-emerald-700 font-bold">Zero Trace</span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center mb-5 font-bold">
              <span className="material-symbols-outlined text-[26px]">schema</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Explainable Distress Indexing</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              We reject opaque, black-box AI risk generation. Every distress score is calculated via transparent,
              auditable clinical heuristics that counselors can inspect, verify, and override in real-time.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Auditability: Open Clinical Weights</span>
            <span className="text-emerald-700 font-bold">Full Transparency</span>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-5 font-bold">
              <span className="material-symbols-outlined text-[26px]">handshake</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Survivor Agency &amp; Consensual Triage</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Survivors maintain sovereignty over their own narrative. Counselor engagement occurs only upon mutual
              opt-in or when rigorous, rule-bound safety triggers indicate immediate danger to life.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Ethics: Trauma-Informed Care (TIC)</span>
            <span className="text-emerald-700 font-bold">Empowerment Focused</span>
          </div>
        </div>
      </div>

      {/* Technical Architecture Flow */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs">
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">Cryptographic Pipeline Topology</h3>
        <p className="text-slate-600 text-sm mb-8 max-w-2xl leading-relaxed">
          How survivor telemetry traverses from the client browser to the counselor queue without exposing identifying
          information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              1
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Local Sandbox</h4>
            <p className="text-xs text-slate-500">In-browser AES encryption with ephemeral salt</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              2
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Anonymizing Proxy</h4>
            <p className="text-xs text-slate-500">IP scrubbing and metadata stripping</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              3
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Deterministic Triage</h4>
            <p className="text-xs text-slate-500">Heuristic distress scoring on blind vector</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
            <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm mb-3">
              4
            </span>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Counselor Queue</h4>
            <p className="text-xs text-slate-500">Anonymous hash presented for clinical support</p>
          </div>
        </div>
      </div>
    </div>
  );
};
