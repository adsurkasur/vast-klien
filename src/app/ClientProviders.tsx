"use client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LocalHistoryProvider from "@/hooks/local-history";
import { GoogleAuthContextProvider } from "@/hooks/GoogleAuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GoogleAuthContextProvider>
          <LocalHistoryProvider>{children}</LocalHistoryProvider>
        </GoogleAuthContextProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
