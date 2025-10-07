"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = "G-SSXNMH6N0M";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams}` : ""),
    });
  }, [pathname, searchParams]);

  return null;
}