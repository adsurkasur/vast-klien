import AppShell from "./AppShell";


import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

import GoogleAnalytics from "../components/GoogleAnalytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Sobat Vast</title>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SSXNMH6N0M"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SSXNMH6N0M');
          `}
        </Script>
      </head>
      <body>
        <AppShell>{children}</AppShell>
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
