
import "./globals.css";
import AppShell from "./AppShell";
import { metadata } from "./metadata";
export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
