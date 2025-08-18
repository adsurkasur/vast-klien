import { useEffect } from "react";
import React from "react";
import { useNavigationType, useLocation } from "react-router-dom";

/**
 * useBackNavigation
 * Calls the provided callback when a browser back navigation (POP) occurs.
 * Usage: useBackNavigation(() => { ... });
 */
export function useBackNavigation(onBack: () => void) {
  const navigationType = useNavigationType();
  const location = useLocation();
  const isInitial = React.useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    // Only trigger on POP (back/forward navigation)
    if (navigationType === "POP") {
      onBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);
}
