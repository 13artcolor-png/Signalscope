# SignalScope (MVP)
Journal de trading minimal (Next.js 14 + Tailwind + Supabase).

## Variables à configurer sur Vercel
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## Table `trades` (Supabase)
Colonnes minimales : symbol (text), side (text), entry_price (numeric), exit_price (numeric),
pnl_eur (numeric, optionnel), opened_at (timestamptz, optionnel), closed_at (timestamptz, optionnel), notes (text, optionnel).

## Lancement local (optionnel)
- npm install
- npm run dev
