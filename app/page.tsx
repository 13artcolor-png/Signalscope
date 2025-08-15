'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabaseClient';

type Trade = {
  id: number;
  symbol: string;
  side: 'long' | 'short';
  entry_price: number | null;
  exit_price: number | null;
  pnl_eur: number | null;
  opened_at: string | null;
  closed_at: string | null;
  notes: string | null;
};

export default function Home() {
  const supabase = getSupabase();
  const [symbol, setSymbol] = useState('EURUSD');
  const [side, setSide] = useState<'long'|'short'>('long');
  const [entry, setEntry] = useState('');
  const [exit, setExit] = useState('');
  const [notes, setNotes] = useState('');
  const [msg, setMsg] = useState('');
  const [trades, setTrades] = useState<Trade[]>([]);

  async function loadTrades() {
    if (!supabase) return;
    const { data } = await supabase
      .from('trades')
      .select('id,symbol,side,entry_price,exit_price,pnl_eur,opened_at,closed_at,notes')
      .order('id', { ascending: false })
      .limit(10);
    setTrades((data ?? []) as any);
  }
  useEffect(() => { loadTrades(); }, []);

  async function saveTrade() {
    if (!supabase) { setMsg('Variables manquantes sur Vercel.'); return; }
    setMsg('Enregistrement…');
    const { error } = await supabase.from('trades').insert({
      symbol,
      side,
      entry_price: entry ? Number(entry) : null,
      exit_price : exit ? Number(exit) : null,
      notes,
      opened_at: new Date().toISOString()
    });
    setMsg(error ? '❌ ' + error.message : '✅ Trade enregistré');
    if (!error) { setEntry(''); setExit(''); setNotes(''); await loadTrades(); }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SignalScope — Journal de trading</h1>
        <a className="btn-outline" href="https://supabase.com/docs" target="_blank">Doc Supabase</a>
      </header>

      {!supabase && (
        <p className="text-rose-600">Configurez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sur Vercel, puis redeploy.</p>
      )}

      <section className="grid md:grid-cols-2 gap-4">
        <div className="card p-4 space-y-3">
          <h2 className="font-semibold">Nouveau trade</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="col-span-2">Symbole
              <input className="w-full border rounded-lg p-2" value={symbol} onChange={e=>setSymbol(e.target.value)} />
            </label>
            <label> Sens
              <select className="w-full border rounded-lg p-2" value={side} onChange={e=>setSide(e.target.value as any)}>
                <option value="long">long 🟢</option>
                <option value="short">short 🔴</option>
              </select>
            </label>
            <label> Entrée (opt.)
              <input className="w-full border rounded-lg p-2" value={entry} onChange={e=>setEntry(e.target.value)} />
            </label>
            <label> Sortie (opt.)
              <input className="w-full border rounded-lg p-2" value={exit} onChange={e=>setExit(e.target.value)} />
            </label>
            <label className="col-span-2"> Notes
              <textarea className="w-full border rounded-lg p-2" value={notes} onChange={e=>setNotes(e.target.value)} />
            </label>
          </div>
          <div className="flex gap-2">
            <button className="btn" onClick={saveTrade}>Enregistrer</button>
            <button className="btn-outline" onClick={()=>{setEntry('');setExit('');setNotes('');}}>Annuler</button>
          </div>
          <div className="min-h-6 text-sm text-neutral-600">{msg}</div>
          <p className="text-xs text-neutral-500">Astuce : crée la table <code>trades</code> dans Supabase.</p>
        </div>

        <div className="card p-4">
          <h2 className="font-semibold mb-2">Derniers trades</h2>
          <div className="divide-y">
            {trades.map(t => (
              <div key={t.id} className="py-2 flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs ${t.side==='long'?'bg-emerald-100 text-emerald-700':'bg-rose-100 text-rose-700'}`}>{t.side}</span>
                <div className="w-24 font-medium">{t.symbol}</div>
                <div className="text-sm text-neutral-600">E: {t.entry_price ?? '-'} / S: {t.exit_price ?? '-'}</div>
                <div className="ml-auto text-sm">{t.closed_at? 'Clôturé' : 'Ouvert'}</div>
              </div>
            ))}
            {trades.length===0 && <div className="text-sm text-neutral-500">Aucun trade pour l’instant.</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
