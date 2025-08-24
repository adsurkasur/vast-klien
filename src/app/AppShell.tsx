"use client";
import ClientProviders from "./ClientProviders";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { getCurrentPage } from "./getCurrentPage";
import Image from "next/image";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPage = getCurrentPage(pathname || "/home");
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
          <Image
            src="/png/vast-beta.png"
            alt="Vast ID Logo"
            width={64}
            height={64}
            className="mb-4"
            priority
          />
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-6"></div>
          <span className="text-xl font-semibold text-orange-500 mb-2">Vast ID</span>
          <span className="text-muted-foreground">Loading, please wait...</span>
        </div>
      }
    >
      <ClientProviders>
        {children}
        <BottomNavigation currentPage={currentPage} />
      </ClientProviders>
    </Suspense>
  );
}
