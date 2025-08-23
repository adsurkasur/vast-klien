

"use client";
import * as React from "react";
import { useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LocalHistoryContext } from "./local-history-context";

export interface LocalHistoryContextType {
  history: string[];
  push: (path: string) => void;
  pop: () => string | undefined;
  clear: () => void;
}

const LocalHistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const historyRef = useRef<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    // Push new location to local history
    const path = pathname + (searchParams ? `?${searchParams.toString()}` : "");
    if (historyRef.current[historyRef.current.length - 1] !== path) {
      historyRef.current.push(path);
    }
  }, [pathname, searchParams]);

  React.useEffect(() => {
    function handlePopState() {
      if (historyRef.current.length > 1) {
        historyRef.current.pop(); // Remove current
        const prev = historyRef.current[historyRef.current.length - 1];
        if (prev) router.replace(prev);
      } else {
        // At first entry, show a toast or block navigation
        // Optionally, navigate to home or show a modal
        // Example: router.replace("/");
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  const value: LocalHistoryContextType = {
    history: historyRef.current,
    push: (path) => historyRef.current.push(path),
    pop: () => historyRef.current.pop(),
    clear: () => { historyRef.current = []; },
  };

  return (
    <LocalHistoryContext.Provider value={value}>
      {children}
    </LocalHistoryContext.Provider>
  );
};

export default LocalHistoryProvider;
