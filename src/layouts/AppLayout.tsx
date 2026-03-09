import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { AdmissionsAIAssistantPanel } from '@/components/AdmissionsAIAssistantPanel';
import { CommandSearch } from '@/components/CommandSearch';
import { Dashboard } from '@/pages/Dashboard';
import { FacultiesPage } from '@/pages/FacultiesPage';
import { EnglishRequirementsPage } from '@/pages/EnglishRequirementsPage';
import { RequirementsPage } from '@/pages/RequirementsPage';
import { RequirementsDetailsPage } from '@/pages/RequirementsDetailsPage';
import { FeesPage } from '@/pages/FeesPage';
import { DownPaymentPage } from '@/pages/DownPaymentPage';
import { AccommodationPage } from '@/pages/AccommodationPage';
import { TransportationPage } from '@/pages/TransportationPage';
import { RefundPolicyPage } from '@/pages/RefundPolicyPage';
import { PoliciesPage } from '@/pages/PoliciesPage';
import { ComparePage } from '@/pages/ComparePage';
import { ScholarshipsPage } from '@/pages/ScholarshipsPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { MapPage } from '@/pages/MapPage';
import { ScholarshipPoliciesPage } from '@/pages/ScholarshipPoliciesPage';
import { InstallmentPoliciesPage } from '@/pages/InstallmentPoliciesPage';
import { MinimumAdmissionRequirementsPage } from '@/pages/MinimumAdmissionRequirementsPage';

const AppLayout = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Global keyboard shortcut for search
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar onSearchClick={() => setSearchOpen(true)} />
      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <AdmissionsAIAssistantPanel open={assistantOpen} onOpenChange={setAssistantOpen} />
      
      <main className="lg:ml-64 min-h-screen">
        <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard onSearchClick={() => setSearchOpen(true)} />} />
            <Route path="/faculties" element={<FacultiesPage />} />
            <Route path="/english" element={<EnglishRequirementsPage />} />
            <Route path="/requirements" element={<RequirementsPage />} />
            <Route path="/requirements/minimum-admission" element={<MinimumAdmissionRequirementsPage />} />
            <Route path="/requirements/details" element={<Navigate to="/requirements" replace />} />
            <Route path="/requirements/:certificateType" element={<RequirementsDetailsPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/fees/down-payment" element={<DownPaymentPage />} />
            <Route path="/fees/scholarships" element={<ScholarshipsPage />} />
            <Route path="/fees/accommodation" element={<AccommodationPage />} />
            <Route path="/fees/transportation" element={<TransportationPage />} />
            <Route path="/policies/refund" element={<RefundPolicyPage />} />
            <Route path="/policies/scholarship" element={<ScholarshipPoliciesPage />} />
            <Route path="/policies/installment" element={<InstallmentPoliciesPage />} />
            <Route path="/policies/all" element={<PoliciesPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </div>
      </main>

      <button
        type="button"
        onClick={() => setAssistantOpen(true)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Bot className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AppLayout;
