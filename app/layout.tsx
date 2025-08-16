// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Sidebar from './Sidebar'
import { syncAssets } from '@/lib/syncAssets'

export const metadata: Metadata = {
  title: 'SignalScope – Journal de trading',
  description: 'MVP Journal de trading (Next.js + Supabase)',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Synchronisation des actifs au démarrage
  await syncAssets()

  return (
    <html lang="fr">
      <body className="bg-neutral-50 text-neutral-900">
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
