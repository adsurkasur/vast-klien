"use client";
import Script from "next/script";


const GA_MEASUREMENT_ID = "G-SSXNMH6N0M";
// Enable debug logging if NEXT_PUBLIC_GA_DEBUG is set to 'true'
const GA_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === 'true';


export default function GoogleAnalytics() {
  // Only render in production
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        async
        onLoad={GA_DEBUG ? () => console.log('[GA DEBUG] gtag.js script loaded') : undefined}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
            ${GA_DEBUG ? "console.log('[GA DEBUG] gtag call:', arguments);" : ""}
          }
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
          ${GA_DEBUG ? "console.log('[GA DEBUG] gtag config initialized');" : ""}
          // Monkey-patch window.gtag to log all calls if debug is enabled
          if (${GA_DEBUG}) {
            window.gtag = function() {
              console.log('[GA DEBUG] gtag event:', arguments);
              dataLayer.push(arguments);
            }
          }
        `}
      </Script>
    </>
  );
}