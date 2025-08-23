import React, { useState } from 'react';
import { BottomNavigation, Page } from '@/components/layout/BottomNavigation';
import PrivacyPolicyContent from './PrivacyPolicyPage';
import { HomePage } from './HomePage';
import { HealthyTipsPage } from './HealthyTipsPage';
import { CalendarPage } from './CalendarPage';
import { CommunityPage } from './CommunityPage';
import { ProfilePage } from './ProfilePage';
import { ContactPage } from './ContactPage';
import { TrolleyPage } from './TrolleyPage';
import AboutPage from './AboutPage';
import { useBackNavigation } from '@/hooks/useBackNavigation';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  useBackNavigation(currentPage, setCurrentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'tips':
        return <HealthyTipsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'community':
        return <CommunityPage />;
      case 'trolley':
        return <TrolleyPage />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPolicyContent />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        {renderPage()}
      </main>
      
      <BottomNavigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
    </div>
  );
};

export default Index;
