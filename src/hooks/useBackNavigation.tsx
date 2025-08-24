import React from 'react';
import { toast } from '@/hooks/use-toast';
import { Page } from '@/components/layout/BottomNavigation';

export const useBackNavigation = (
  currentPage: Page,
  setCurrentPage: (page: Page) => void
) => {
  const historyStack = React.useRef<Page[]>([currentPage]);
  const backPressedOnce = React.useRef(false);
  const timeoutRef = React.useRef<number | null>(null);
  const setCurrentPageRef = React.useRef(setCurrentPage);
  setCurrentPageRef.current = setCurrentPage;

  // Effect to manage the internal page history stack.
  React.useEffect(() => {
    console.log('useBackNavigation: currentPage changed to', currentPage);
    const lastPageInStack = historyStack.current[historyStack.current.length - 1];
    if (lastPageInStack !== currentPage) {
      console.log('useBackNavigation: Pushing to historyStack', { newPage: currentPage, stack: [...historyStack.current] });
      historyStack.current.push(currentPage);
      // Any forward navigation resets the double-back-to-exit flag.
      backPressedOnce.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Push a new state to browser history for navigation
      window.history.pushState(null, '');
    }
  }, [currentPage]);

  // Effect to set up the global popstate listener.
  React.useEffect(() => {
    console.log('useBackNavigation: Setting up popstate listener.');

    // Push initial state on mount
    window.history.pushState(null, '');
    console.log('useBackNavigation: Pushed initial state on mount.');

    const handlePopState = () => {
      const lastPage = historyStack.current[historyStack.current.length - 1];
      console.log('handlePopState: Fired!', { lastPage, backPressedOnce: backPressedOnce.current, stack: [...historyStack.current] });

      if (historyStack.current.length > 1) {
        // Pop the stack and navigate to previous page
        historyStack.current.pop();
        const prevPage = historyStack.current[historyStack.current.length - 1];
        setCurrentPageRef.current(prevPage);
        backPressedOnce.current = false;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      } else if (lastPage === 'home') {
        // Only allow exit if at home and stack length is 1
        if (backPressedOnce.current) {
          // Second back press at home: allow exit
          return;
        }
        // First back press at home: show toast, set flag, and prevent exit
        backPressedOnce.current = true;
  toast({ title: 'Press back again to exit', duration: 3000 });
        timeoutRef.current = window.setTimeout(() => {
          backPressedOnce.current = false;
        }, 2000);
        // Prevent exit by pushing new state
        window.history.pushState(null, '');
      } else {
        // If stack is empty or not at home, go to home
        setCurrentPageRef.current('home');
        backPressedOnce.current = false;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'p') {
        console.log('useBackNavigation: "P" key pressed, triggering window.history.back()');
        window.history.back();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('useBackNavigation: Cleaning up listeners.');
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // This effect should run only once.

  return {};
};