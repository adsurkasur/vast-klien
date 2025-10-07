import React from "react";
import "./globals.css";
import AppShell from "./AppShell";
import { Suspense } from "react";

import { Analytics } from "@vercel/analytics/next";


import GoogleAnalytics from "../components/GoogleAnalytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Sobat Vast</title>
        {/* Google Analytics scripts are injected via the GoogleAnalytics component below */}
      </head>
      <body>
        <AppShell>{children}</AppShell>
        {/* Google Analytics: only loads in production */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
