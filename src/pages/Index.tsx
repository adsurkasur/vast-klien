import React, { useState } from 'react';
import { BottomNavigation, Page } from '@/components/layout/BottomNavigation';
import { HomePage } from './HomePage';
import { HealthyTipsPage } from './HealthyTipsPage';
import { CalendarPage } from './CalendarPage';
import { CommunityPage } from './CommunityPage';
import { ProfilePage } from './ProfilePage';
import { ContactPage } from './ContactPage';
import { TrolleyPage } from './TrolleyPage';
import AboutPage from './AboutPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const historyStack = React.useRef<Page[]>(['home']);
  const backPressedOnce = React.useRef(false);
  const timeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    // On initial mount, push a single dummy state
    if (window.history.state?.dummy !== true) {
      window.history.replaceState({ dummy: true }, "");
    }
  }, []);

  React.useEffect(() => {
    // Track local history stack and push dummy state on every navigation
    if (historyStack.current[historyStack.current.length - 1] !== currentPage) {
      historyStack.current.push(currentPage);
      window.history.pushState({ dummy: true }, "");
    }
  }, [currentPage]);

  React.useEffect(() => {
    function handlePopState() {
      // Pop from local history stack first
      if (historyStack.current.length > 1) {
        historyStack.current.pop(); // Remove current
      }
      const prev = historyStack.current[historyStack.current.length - 1];

      // Home detection logic runs first
      if (prev === 'home') {
        setCurrentPage('home');
        historyStack.current = ['home'];
        window.history.replaceState({ dummy: true }, "");
        backPressedOnce.current = false; // Reset flag only when landing on home
        return; // Stop further navigation logic
      }

      // If not home, process normal navigation
      setCurrentPage(prev);
    }
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // Show double-back-to-exit toast only when user is already on home and presses back
  React.useEffect(() => {
    function handleHomeBack() {
      if (currentPage === 'home') {
        if (!backPressedOnce.current) {
          import('@/hooks/use-toast').then(({ toast }) => {
            toast({ title: 'Press back again to exit', description: 'You are on the home page.' });
          });
          backPressedOnce.current = true;
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          timeoutRef.current = window.setTimeout(() => { backPressedOnce.current = false; }, 2000);
          window.history.pushState({ dummy: true }, ""); // Stay on home
        } else {
          backPressedOnce.current = false;
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          window.history.back(); // Go to previous browser page
        }
      }
    }
    if (currentPage === 'home') {
      window.addEventListener('popstate', handleHomeBack);
      return () => {
        window.removeEventListener('popstate', handleHomeBack);
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      };
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfilePage />;
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
