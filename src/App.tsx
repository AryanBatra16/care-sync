/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, CheckInReflection, UserRole } from './types';
import { LanguageCode } from './lib/translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Modals
import { GroundingModal } from './components/modals/GroundingModal';
import { CounselorModal } from './components/modals/CounselorModal';
import { ReflectionModal } from './components/modals/ReflectionModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { GuidedCheckInPage } from './pages/GuidedCheckInPage';
import { CheckInConcludedPage } from './pages/CheckInConcludedPage';
import { MyCheckInsPage } from './pages/MyCheckInsPage';
import { CounselorCasesPage } from './pages/CounselorCasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { CounselorAlertsPage } from './pages/CounselorAlertsPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { EthicsAndPrivacyPage } from './pages/EthicsAndPrivacyPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CASE-1042');
  const [userRole, setUserRole] = useState<UserRole>('guest');

  // Modal states
  const [groundingOpen, setGroundingOpen] = useState(false);
  const [counselorOpen, setCounselorOpen] = useState(false);
  const [reflectionModalItem, setReflectionModalItem] = useState<CheckInReflection | null>(null);

  // Appearance & accessibility preferences (in-memory only, resets on reload —
  // consistent with the rest of the app's "nothing persists" design).
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [nightContrast, setNightContrast] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [compactMode, setCompactMode] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Font size genuinely scales the whole app, since Tailwind's text utilities are rem-based.
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    handleNavigate('case-detail');
  };

  // Dark/Night mode use a CSS filter (invert+hue-rotate) applied to the whole app root —
  // a real, working effect without needing to retheme every component individually.
  // High Contrast deliberately does NOT use a contrast() filter: that pushes light-gray
  // text even lighter (further from a white background), making subtle labels fade out
  // instead of standing out. It's handled instead by index.css's .high-contrast rules,
  // which directly darken the specific muted text colors used across the app.
  const filters: string[] = [];
  if (theme === 'dark') filters.push('invert(1) hue-rotate(180deg)');
  if (nightContrast) filters.push('brightness(0.85)');
  const rootStyle = filters.length ? { filter: filters.join(' ') } : undefined;
  const rootClassName = `min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30] ${compactMode ? 'compact' : ''} ${
    highContrast ? 'high-contrast' : ''
  } ${theme === 'dark' || nightContrast ? 'theme-inverted' : ''}`;

  return (
    <div className={rootClassName} style={rootStyle}>
      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
      />

      {/* Main Content Area (padded for fixed header) */}
      <main className="flex-1 pt-16 md:pt-20">
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} language={language} />}

        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenGrounding={() => setGroundingOpen(true)}
            onOpenReflection={(item) => setReflectionModalItem(item)}
            language={language}
          />
        )}

        {currentPage === 'guided-check-in' && (
          <GuidedCheckInPage
            onNavigate={handleNavigate}
            onOpenGrounding={() => setGroundingOpen(true)}
            onOpenCounselor={() => setCounselorOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'check-in-concluded' && (
          <CheckInConcludedPage
            onNavigate={handleNavigate}
            onOpenGrounding={() => setGroundingOpen(true)}
            onOpenCounselor={() => setCounselorOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'my-check-ins' && (
          <MyCheckInsPage
            onNavigate={handleNavigate}
            onOpenReflection={(item) => setReflectionModalItem(item)}
            language={language}
          />
        )}

        {currentPage === 'counselor-cases' && (
          <CounselorCasesPage
            onNavigate={handleNavigate}
            onSelectCase={handleSelectCase}
            language={language}
          />
        )}

        {currentPage === 'case-detail' && (
          <CaseDetailPage
            caseId={selectedCaseId}
            onNavigate={handleNavigate}
            onOpenCounselorRelay={() => setCounselorOpen(true)}
            language={language}
          />
        )}

        {currentPage === 'counselor-alerts' && (
          <CounselorAlertsPage
            onNavigate={handleNavigate}
            onSelectCase={handleSelectCase}
            language={language}
          />
        )}

        {currentPage === 'admin-portal' && (
          <AdminPortalPage onNavigate={handleNavigate} language={language} />
        )}

        {currentPage === 'ethics-and-privacy' && (
          <EthicsAndPrivacyPage onNavigate={handleNavigate} language={language} />
        )}

        {currentPage === 'settings' && (
          <SettingsPage
            onNavigate={handleNavigate}
            theme={theme}
            setTheme={setTheme}
            nightContrast={nightContrast}
            setNightContrast={setNightContrast}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            fontSize={fontSize}
            setFontSize={setFontSize}
            compactMode={compactMode}
            setCompactMode={setCompactMode}
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            onLoginSuccess={(role) => setUserRole(role)}
            language={language}
          />
        )}

        {currentPage === 'register' && (
          <RegisterPage onNavigate={handleNavigate} language={language} />
        )}

        {currentPage === 'forgot-password' && (
          <ForgotPasswordPage onNavigate={handleNavigate} language={language} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} language={language} />

      {/* Interactive Modals */}
      <GroundingModal
        isOpen={groundingOpen}
        onClose={() => setGroundingOpen(false)}
      />

      <CounselorModal
        isOpen={counselorOpen}
        onClose={() => setCounselorOpen(false)}
      />

      <ReflectionModal
        reflection={reflectionModalItem}
        onClose={() => setReflectionModalItem(null)}
      />
    </div>
  );
}
