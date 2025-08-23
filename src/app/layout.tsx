"use client";
import ClientProviders from "./ClientProviders";
import { BottomNavigation, Page } from "@/components/layout/BottomNavigation";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";

function getCurrentPage(pathname: string): Page {
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/trolley")) return "trolley";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/community")) return "community";
  return "home";
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPage = getCurrentPage(pathname || "/home");
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientProviders>
            {children}
            <BottomNavigation currentPage={currentPage} />
          </ClientProviders>
        </Suspense>
      </body>
    </html>
  );
}
