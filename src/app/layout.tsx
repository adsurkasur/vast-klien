
import "./globals.css";
import AppShell from "./AppShell";
import { metadata, viewport } from "./metadata";

export { metadata, viewport };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
