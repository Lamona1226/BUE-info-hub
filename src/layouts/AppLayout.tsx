import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { CommandSearch } from '@/components/CommandSearch';
import { Dashboard } from '@/pages/Dashboard';
import { FacultiesPage } from '@/pages/FacultiesPage';
import { EnglishRequirementsPage } from '@/pages/EnglishRequirementsPage';
import { RequirementsPage } from '@/pages/RequirementsPage';
import { RequirementsDetailsPage } from '@/pages/RequirementsDetailsPage';
import { FeesPage } from '@/pages/FeesPage';
import { AccommodationPage } from '@/pages/AccommodationPage';
import { TransportationPage } from '@/pages/TransportationPage';
import { RefundPolicyPage } from '@/pages/RefundPolicyPage';
import { PoliciesPage } from '@/pages/PoliciesPage';
import { ComparePage } from '@/pages/ComparePage';
import { ScholarshipsPage } from '@/pages/ScholarshipsPage';
import { ContactsPage } from '@/pages/ContactsPage';
import { ScholarshipPoliciesPage } from '@/pages/ScholarshipPoliciesPage';
import { InstallmentPoliciesPage } from '@/pages/InstallmentPoliciesPage';

const AppLayout = () => {
  const [searchOpen, setSearchOpen] = useState(false);

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
      
      <main className="lg:ml-64 min-h-screen">
        <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard onSearchClick={() => setSearchOpen(true)} />} />
            <Route path="/faculties" element={<FacultiesPage />} />
            <Route path="/english" element={<EnglishRequirementsPage />} />
            <Route path="/requirements" element={<RequirementsPage />} />
            <Route path="/requirements/details" element={<RequirementsDetailsPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/fees/scholarships" element={<ScholarshipsPage />} />
            <Route path="/fees/accommodation" element={<AccommodationPage />} />
            <Route path="/fees/transportation" element={<TransportationPage />} />
            <Route path="/policies/refund" element={<RefundPolicyPage />} />
            <Route path="/policies/scholarship" element={<ScholarshipPoliciesPage />} />
            <Route path="/policies/installment" element={<InstallmentPoliciesPage />} />
            <Route path="/policies/all" element={<PoliciesPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
