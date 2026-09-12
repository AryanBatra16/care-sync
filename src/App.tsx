/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, CheckInReflection, UserRole } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Modals
import { GroundingModal } from './components/modals/GroundingModal';
import { CounselorModal } from './components/modals/CounselorModal';
import { ReflectionModal } from './components/modals/ReflectionModal';
import { QuickExitOverlay } from './components/modals/QuickExitOverlay';

// Pages
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
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CASE-1042');
  const [userRole, setUserRole] = useState<UserRole>('guest');

  // Modal states
  const [groundingOpen, setGroundingOpen] = useState(false);
  const [counselorOpen, setCounselorOpen] = useState(false);
  const [reflectionModalItem, setReflectionModalItem] = useState<CheckInReflection | null>(null);
  const [quickExitOpen, setQuickExitOpen] = useState(false);

  // Global ESC key listener for Safety Quick Exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickExitOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    handleNavigate('case-detail');
  };

  const handleWipeAndRedirect = () => {
    // Purge local storage and session items if any
    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch {
      // Ignored
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onQuickExit={() => setQuickExitOpen(true)}
      />

      {/* Main Content Area (padded for fixed header) */}
      <main className="flex-1 pt-16 md:pt-20">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}

        {currentPage === 'guided-check-in' && (
          <GuidedCheckInPage
            onNavigate={handleNavigate}
            onOpenGrounding={() => setGroundingOpen(true)}
            onOpenCounselor={() => setCounselorOpen(true)}
          />
        )}

        {currentPage === 'check-in-concluded' && (
          <CheckInConcludedPage
            onNavigate={handleNavigate}
            onOpenGrounding={() => setGroundingOpen(true)}
            onOpenCounselor={() => setCounselorOpen(true)}
            onQuickExit={() => setQuickExitOpen(true)}
          />
        )}

        {currentPage === 'my-check-ins' && (
          <MyCheckInsPage
            onNavigate={handleNavigate}
            onOpenReflection={(item) => setReflectionModalItem(item)}
          />
        )}

        {currentPage === 'counselor-cases' && (
          <CounselorCasesPage
            onNavigate={handleNavigate}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentPage === 'case-detail' && (
          <CaseDetailPage
            caseId={selectedCaseId}
            onNavigate={handleNavigate}
            onOpenCounselorRelay={() => setCounselorOpen(true)}
          />
        )}

        {currentPage === 'counselor-alerts' && (
          <CounselorAlertsPage
            onNavigate={handleNavigate}
            onSelectCase={handleSelectCase}
          />
        )}

        {currentPage === 'admin-portal' && (
          <AdminPortalPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'ethics-and-privacy' && (
          <EthicsAndPrivacyPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'settings' && (
          <SettingsPage
            onNavigate={handleNavigate}
            onQuickExit={() => setQuickExitOpen(true)}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            onLoginSuccess={(role) => setUserRole(role)}
          />
        )}

        {currentPage === 'register' && (
          <RegisterPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'forgot-password' && (
          <ForgotPasswordPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

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

      <QuickExitOverlay
        isOpen={quickExitOpen}
        onCancel={() => setQuickExitOpen(false)}
        onConfirmWipe={handleWipeAndRedirect}
      />
    </div>
  );
}
