import { useEffect } from "react";

interface MobileBackNavigationOptions {
  isOpen: boolean;
  onClose: () => void;
}

export function useMobileBackNavigation({ isOpen, onClose }: MobileBackNavigationOptions) {
  useEffect(() => {
  function handlePopState(/* event: PopStateEvent */) {
      if (isOpen) {
        onClose();
        // Optionally, push the state back to prevent further navigation
        window.history.pushState(null, "");
      }
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isOpen, onClose]);
}
