import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "SignalScope — Journal de trading",
  description: "MVP Journal de trading (Next.js + Supabase)",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
