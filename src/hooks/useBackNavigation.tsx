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
      console.log('useBackNavigation: Forward navigation, resetting backPressedOnce.');
      backPressedOnce.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [currentPage]);

  // Effect to set up the global popstate listener.
  React.useEffect(() => {
    console.log('useBackNavigation: Setting up popstate listener.');

    const handlePopState = () => {
      const lastPage = historyStack.current[historyStack.current.length - 1];
      console.log('handlePopState: Fired!', { lastPage, backPressedOnce: backPressedOnce.current, stack: [...historyStack.current] });

      if (lastPage === 'home') {
        console.log('handlePopState: On home page.');
        if (backPressedOnce.current) {
          console.log('handlePopState: Second back press on home. Allowing exit.');
          // On the second press, we allow the app to exit by doing nothing here,
          // letting the browser complete its default back action.
          return;
        }

        console.log('handlePopState: First back press on home.');
        backPressedOnce.current = true;
        toast({ title: 'Press back again to exit' });
        console.log('handlePopState: Toast shown, setting timeout.');
        timeoutRef.current = window.setTimeout(() => {
          console.log('handlePopState: Timeout fired, resetting backPressedOnce.');
          backPressedOnce.current = false;
        }, 2000);

        // We push a new history state to "catch" this back press and prevent exit.
        console.log('handlePopState: Pushing state to prevent exit.');
        window.history.pushState(null, '');
      } else {
        console.log('handlePopState: Not on home page. Navigating internally.');
        // Any back press on a non-home page should reset the exit flag.
        backPressedOnce.current = false;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        if (historyStack.current.length > 1) {
          historyStack.current.pop();
          const prevPage = historyStack.current[historyStack.current.length - 1];
          console.log('handlePopState: Popped stack. Navigating to', { prevPage, stack: [...historyStack.current] });
          setCurrentPageRef.current(prevPage);
        } else {
          console.log('handlePopState: History stack has only one item. Navigating to home.');
          setCurrentPageRef.current('home');
        }

        // We must push a state here as well to prevent the browser from
        // actually leaving the page.
        console.log('handlePopState: Pushing state to prevent exit on non-home page.');
        window.history.pushState(null, '');
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

    // We need to push an initial state when the hook mounts.
    console.log('useBackNavigation: Pushing initial state.');
    window.history.pushState(null, '');

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