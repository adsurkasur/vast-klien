import React, { useState } from 'react';
import { BottomNavigation, Page } from '@/components/layout/BottomNavigation';
import { HomePage } from './HomePage';
import { HealthyTipsPage } from './HealthyTipsPage';
import { CalendarPage } from './CalendarPage';
import { CommunityPage } from './CommunityPage';
import { ProfilePage } from './ProfilePage';
import { ContactPage } from './ContactPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'tips':
        return <HealthyTipsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'community':
        return <CommunityPage />;
      case 'profile':
        return <ProfilePage />;
      case 'contact':
        return <ContactPage />;
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
