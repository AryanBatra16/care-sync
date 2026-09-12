import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onQuickExit: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onQuickExit }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on Escape key without triggering quick exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        e.preventDefault();
        e.stopPropagation();
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [drawerOpen]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const handleSelectNav = (page: PageId) => {
    onNavigate(page);
    setDrawerOpen(false);
  };

  const isCounselorPortal =
    currentPage === 'counselor-cases' ||
    currentPage === 'case-detail' ||
    currentPage === 'counselor-alerts';
  const isAdminPortal = currentPage === 'admin-portal';
  const isCheckinFlow = currentPage === 'guided-check-in' || currentPage === 'check-in-concluded';

  // Human readable title for current page breadcrumb
  const pageTitles: Record<PageId, string> = {
    'home': 'Home Sanctuary',
    'guided-check-in': 'Guided Check-In',
    'check-in-concluded': 'Check-In Receipt',
    'my-check-ins': 'My Sanctuary',
    'counselor-cases': 'Counselor Cases',
    'case-detail': 'Case Detail Review',
    'counselor-alerts': 'Triage Alerts Feed',
    'admin-portal': 'District Admin Portal',
    'ethics-and-privacy': 'Ethics & Zero-Knowledge',
    'settings': 'Settings & Safety',
    'login': 'Portal Sign In',
    'register': 'Create Account',
    'forgot-password': 'Password Recovery',
  };

  return (
    <>
      {/* Fixed Main Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
        <div className="h-16 md:h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left section: Hamburger Button + Brand Mark */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Hamburger Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative p-2.5 -ml-1.5 rounded-xl text-slate-700 hover:text-[#005c55] hover:bg-[#eff4ff] active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#005c55]/20"
              aria-label="Open navigation menu"
              title="Open menu"
            >
              <span className="material-symbols-outlined text-[24px] transition-transform duration-200 group-hover:scale-110">
                menu
              </span>
              <span className="hidden md:inline text-xs font-semibold text-slate-600 group-hover:text-[#005c55] tracking-wide uppercase">
                Menu
              </span>
              {/* Subtle alert notification dot on hamburger if alerts exist */}
              <span className="absolute top-2 left-7 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            {/* Brand Logo & Name */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#005c55] to-[#0f766e] flex items-center justify-center text-white shadow-sm shadow-teal-900/10 transition-transform group-hover:scale-105">
                <span className="material-symbols-outlined text-[19px]">spa</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0b1c30] group-hover:text-[#005c55] transition-colors leading-none">
                  SanctumCare
                </span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase hidden sm:block mt-0.5">
                  Confidential Sanctuary
                </span>
              </div>
            </button>

            {/* Context Badge */}
            {isCounselorPortal && (
              <div className="hidden sm:flex items-center gap-1.5 bg-[#cce5ff] text-[#00476e] px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                <span className="material-symbols-outlined text-[14px] text-[#006398]">verified_user</span>
                <span>Counselor</span>
              </div>
            )}

            {isAdminPortal && (
              <div className="hidden sm:flex items-center gap-1.5 bg-[#cce5ff] text-[#00476e] px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                <span className="material-symbols-outlined text-[14px] text-[#006398]">shield_person</span>
                <span>Admin</span>
              </div>
            )}

            {isCheckinFlow && (
              <div className="hidden sm:flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1 rounded-full text-[#005c55] text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Zero-Trace</span>
              </div>
            )}
          </div>

          {/* Center breadcrumb / current section */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Active View:</span>
            <span className="font-semibold text-slate-800">{pageTitles[currentPage] || 'Overview'}</span>
          </div>

          {/* Right Action: Quick Exit + Settings/Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Exit (ESC) Emergency Button */}
            <button
              onClick={onQuickExit}
              className="flex items-center gap-1.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-rose-900/10 transition-all cursor-pointer group active:scale-95"
              title="Instantly blanks and redirects screen to neutral portal (Press ESC)"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">
                logout
              </span>
              <span>
                Quick Exit <span className="opacity-80 font-normal hidden sm:inline">(ESC)</span>
              </span>
            </button>

            {/* Context Profile / Settings button */}
            {isCounselorPortal ? (
              <button
                onClick={() => onNavigate('settings')}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer text-left group"
                title="Counselor Profile"
              >
                <div className="w-8 h-8 rounded-full bg-[#0f766e] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  SV
                </div>
                <div className="hidden xl:flex flex-col">
                  <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#005c55]">
                    Dr. Sarah Vance
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">LCSW Lead</span>
                </div>
              </button>
            ) : isAdminPortal ? (
              <button
                onClick={() => onNavigate('settings')}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer text-left group"
                title="Admin Profile"
              >
                <div className="w-8 h-8 rounded-full bg-[#006398] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  AS
                </div>
                <div className="hidden xl:flex flex-col">
                  <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#006398]">
                    Dir. A. Sharma
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">District Admin</span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onNavigate('settings')}
                  className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 hover:text-[#005c55] hover:bg-[#eff4ff] flex items-center justify-center transition-colors cursor-pointer"
                  title="Settings & Privacy Preferences"
                >
                  <span className="material-symbols-outlined text-[19px]">settings</span>
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:text-[#005c55] hover:border-teal-300 hover:bg-teal-50/50 text-xs font-semibold transition-all cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop Overlay for Pop-in Pop-out Menu */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Left Pop-In Pop-Out Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[320px] sm:w-[360px] max-w-[85vw] bg-white text-[#0b1c30] shadow-[0_20px_50px_rgba(0,0,0,0.18)] flex flex-col transform transition-transform duration-300 ease-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        {/* Drawer Header */}
        <div className="h-16 sm:h-20 px-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#005c55] to-[#0f766e] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[19px]">spa</span>
            </div>
            <div>
              <div className="text-base font-bold text-[#0b1c30] leading-none">SanctumCare</div>
              <div className="text-[10px] text-[#005c55] font-semibold mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Encrypted &amp; Private</span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none"
            title="Close menu"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 text-sm">
          {/* SECTION 1: SURVIVOR & CRISIS SANCTUARY */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Sanctuary &amp; Care</span>
              <span className="text-[10px] bg-teal-50 text-teal-800 font-semibold px-2 py-0.5 rounded-full">
                Zero-Knowledge
              </span>
            </div>
            <div className="space-y-1">
              {/* Home */}
              <button
                onClick={() => handleSelectNav('home')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'home'
                    ? 'bg-[#eff4ff] text-[#005c55] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'home' ? 'text-[#005c55]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  cottage
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">Home Sanctuary</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Welcome &amp; crisis readiness
                  </div>
                </div>
              </button>

              {/* Guided Check-in */}
              <button
                onClick={() => handleSelectNav('guided-check-in')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'guided-check-in'
                    ? 'bg-[#eff4ff] text-[#005c55] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'guided-check-in' ? 'text-[#005c55]' : 'text-teal-600'
                  }`}
                >
                  volunteer_activism
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="leading-snug truncate">Guided Check-In</span>
                    <span className="text-[9px] bg-teal-100 text-teal-900 font-bold px-1.5 py-0.2 rounded">
                      Companion
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Private conversational triage
                  </div>
                </div>
              </button>

              {/* My Sanctuary / History */}
              <button
                onClick={() => handleSelectNav('my-check-ins')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'my-check-ins'
                    ? 'bg-[#eff4ff] text-[#005c55] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'my-check-ins' ? 'text-[#005c55]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  menu_book
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">My Sanctuary</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Encrypted personal check-ins
                  </div>
                </div>
              </button>

              {/* Check-In Concluded */}
              <button
                onClick={() => handleSelectNav('check-in-concluded')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'check-in-concluded'
                    ? 'bg-[#eff4ff] text-[#005c55] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'check-in-concluded' ? 'text-[#005c55]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  task_alt
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">Check-In Receipt</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Zero-knowledge session summary
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 2: COUNSELOR & CLINICAL TRIAGE */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Counselor Oversight</span>
              <span className="text-[10px] bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                Clinical
              </span>
            </div>
            <div className="space-y-1">
              {/* Cases Dashboard */}
              <button
                onClick={() => handleSelectNav('counselor-cases')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'counselor-cases'
                    ? 'bg-[#dce9ff] text-[#00476e] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'counselor-cases' ? 'text-[#006398]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  clinical_notes
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">Cases Dashboard</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Distress scores &amp; active triage
                  </div>
                </div>
              </button>

              {/* Triage Alerts */}
              <button
                onClick={() => handleSelectNav('counselor-alerts')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'counselor-alerts'
                    ? 'bg-rose-50 text-rose-900 font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'counselor-alerts' ? 'text-rose-600' : 'text-rose-500'
                  }`}
                >
                  notification_important
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="leading-snug truncate">Triage Alerts Feed</span>
                    <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                      3 New
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Urgent threshold escalations
                  </div>
                </div>
              </button>

              {/* Clinical Case Detail */}
              <button
                onClick={() => handleSelectNav('case-detail')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'case-detail'
                    ? 'bg-[#dce9ff] text-[#00476e] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'case-detail' ? 'text-[#006398]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  troubleshoot
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">Case Review (1042)</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    De-identified psychological trends
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 3: ADMINISTRATION & GOVERNANCE */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Governance &amp; Trust</span>
            </div>
            <div className="space-y-1">
              {/* Admin Portal */}
              <button
                onClick={() => handleSelectNav('admin-portal')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'admin-portal'
                    ? 'bg-[#dce9ff] text-[#00476e] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'admin-portal' ? 'text-[#006398]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  domain
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">District Admin Portal</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Regional metrics &amp; counselor audits
                  </div>
                </div>
              </button>

              {/* Ethics and Privacy */}
              <button
                onClick={() => handleSelectNav('ethics-and-privacy')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'ethics-and-privacy'
                    ? 'bg-[#eff4ff] text-[#005c55] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'ethics-and-privacy' ? 'text-[#005c55]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  verified_user
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">Ethics &amp; Isolation</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Cryptographic isolation proof
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 4: PREFERENCES & ACCESS */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Settings &amp; Access
            </div>
            <div className="space-y-1">
              {/* Settings */}
              <button
                onClick={() => handleSelectNav('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'settings'
                    ? 'bg-[#eff4ff] text-[#005c55] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'settings' ? 'text-[#005c55]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  tune
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">Settings &amp; Preferences</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Quick-exit triggers &amp; audio
                  </div>
                </div>
              </button>

              {/* Login / Auth */}
              <button
                onClick={() => handleSelectNav('login')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  currentPage === 'login' || currentPage === 'register'
                    ? 'bg-[#eff4ff] text-[#005c55] font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                    currentPage === 'login' ? 'text-[#005c55]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  login
                </span>
                <div className="flex-1 min-w-0">
                  <div className="leading-snug truncate">Sign In / Switch Role</div>
                  <div className="text-[11px] text-slate-400 font-normal truncate">
                    Survivor, Counselor, or Admin
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Bar: Crisis & Quick Exit */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 shrink-0 space-y-2.5">
          {/* Emergency ESC Button inside Drawer */}
          <button
            onClick={() => {
              setDrawerOpen(false);
              onQuickExit();
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">
              logout
            </span>
            <span>Emergency Quick Exit (ESC)</span>
          </button>

          {/* 24/7 Lifeline Quick Link */}
          <div className="flex items-center justify-between text-[11px] px-1 text-slate-500">
            <span>24/7 Crisis Support:</span>
            <a
              href="tel:988"
              className="font-bold text-rose-700 hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[13px]">phone_in_talk</span>
              <span>Call / Text 988</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
