import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalHistoryContext } from "./local-history-context";

export interface LocalHistoryContextType {
  history: string[];
  push: (path: string) => void;
  pop: () => string | undefined;
  clear: () => void;
}

// LocalHistoryContext is now imported from local-history-context.ts

export function LocalHistoryProvider({ children }: { children: React.ReactNode }) {
  const historyRef = useRef<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Push dummy state on initial mount
  React.useEffect(() => {
    window.history.replaceState({ dummy: true }, "");
  }, []);

  React.useEffect(() => {
    // Push new location to local history
    const path = location.pathname + location.search;
    if (historyRef.current[historyRef.current.length - 1] !== path) {
      historyRef.current.push(path);
    }
  }, [location.key, location.pathname, location.search]);

  React.useEffect(() => {
    function handlePopState() {
      if (historyRef.current.length > 1) {
        historyRef.current.pop(); // Remove current
        const prev = historyRef.current[historyRef.current.length - 1];
        if (prev) navigate(prev, { replace: true });
      } else {
        // At first entry, show a toast or block navigation
        // Optionally, navigate to home or show a modal
        // Example: navigate("/");
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const value: LocalHistoryContextType = {
    history: historyRef.current,
    push: (path) => historyRef.current.push(path),
    pop: () => historyRef.current.pop(),
    clear: () => { historyRef.current = []; },
  };

  return <LocalHistoryContext.Provider value={value}>{children}</LocalHistoryContext.Provider>;
}
