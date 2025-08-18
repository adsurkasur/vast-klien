import React from 'react';
import { toast } from '@/hooks/use-toast';

import { Page } from '@/components/layout/BottomNavigation';

export const useBackNavigation = (
  currentPage: Page,
  setCurrentPage: (page: Page) => void
) => {
  const historyStack = React.useRef<Page[]>(['home']);
  const backPressedOnce = React.useRef(false);
  const timeoutRef = React.useRef<number | null>(null);

  // Push dummy state on initial mount
  React.useEffect(() => {
    if (window.history.state?.dummy !== true) {
      window.history.replaceState({ dummy: true }, '');
    }
  }, []);

  // Track navigation stack
  React.useEffect(() => {
    if (historyStack.current[historyStack.current.length - 1] !== currentPage) {
      historyStack.current.push(currentPage);
      window.history.pushState({ dummy: true }, '');
    }
  }, [currentPage]);

  // Unified popstate handler for back navigation
  React.useEffect(() => {
    const handlePopState = () => {
      if (currentPage === 'home') {
        if (backPressedOnce.current) {
          // Allow app to exit
          window.history.back();
        } else {
          backPressedOnce.current = true;
          toast({ title: 'Press back again to exit' });
          timeoutRef.current = window.setTimeout(() => {
            backPressedOnce.current = false;
          }, 2000);
          // Push a state to prevent immediate exit
          window.history.pushState({ dummy: true }, '');
        }
      } else {
        if (historyStack.current.length > 1) {
          historyStack.current.pop();
          const prev = historyStack.current[historyStack.current.length - 1];
          setCurrentPage(prev);
        } else {
          // If for some reason history is empty, go to home
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [currentPage, setCurrentPage]);

  return {
    historyStack,
  };
};