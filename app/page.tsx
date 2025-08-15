'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabaseClient';

type Side = 'long' | 'short';

type Trade = {
  id: string | number;
  symbol: string;
  side: Side;
  entry_price: number | null;
  exit_price: number | null;
  pnl_eur: number | null;
  opened_at: string | null;
  closed_at: string | null;
  notes: string | null;
};

function StatsBar({ trades }: { trades: Trade[] }) {
  const pnls = trades.map(t => t.pnl_eur ?? 0);
  const total = pnls.reduce((a, b) => a + b, 0);
  const wins = pnls.filter(v => v > 0).length;
  const count = trades.length || 1;
  const winrate = (wins / count) * 100;
  const avg = total / count;

  return (
    <div className="grid md:grid-cols-3 gap-3">
      <div className={`card p-3 ${winrate >= 50 ? 'border-emerald-300' : 'border-rose-300'}`}>
        <div className="text-xs text-neutral-500">Win rate</div>
        <div className="text-xl font-bold">{winrate.toFixed(1)}%</div>
      </div>
      <div className={`card p-3 ${total >= 0 ? 'border-emerald-300' : 'border-rose-300'}`}>
        <div className="text-xs text-neutral-500">PnL total</div>
        <div className="text-xl font-bold">{total.toFixed(2)} €</div>
      </div>
      <div className={`card p-3 ${avg >= 0 ? 'border-emerald-300' : 'border-rose-300'}`}>
        <div className="text-xs text-neutral-500">PnL moyen / trade</div>
        <div className="text-xl font-bold">{avg.toFixed(2)} €</div>
      </div>
    </div>
  );
}

export default function Home() {
  const supabase = getSupabase();

  // Form state
  const [symbol, setSymbol] = useState('EURUSD');
  const [side, setSide] = useState<Side>('long');
  const [entry, setEntry] = useState('');
  const [exit, setExit] = useState('');
  const [volume, setVolume] = useState('1'); // lots / unités
  const [notes, setNotes] = useState('');
  const [msg, setMsg] = useState('');

  const [trades, setTrades] = useState<Trade[]>([]);

  async function loadTrades() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('trades')
      .select('id,symbol,side,entry_price,exit_price,pnl_eur,opened_at,closed_at,notes')
      .order('id', { ascending: false })
      .limit(10);

    if (!error) setTrades((data ?? []) as any);
  }

  useEffect(() => {
    loadTrades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveTrade() {
    if (!supabase) {
      setMsg('Variables manquantes sur Vercel.');
      return;
    }
    setMsg('Enregistrement…');

    const e = entry ? Number(entry) : null;
    const x = exit ? Number(exit) : null;
    const v = volume ? Number(volume) : 1;

    // PnL simple (à adapter à ton marché si besoin)
    let pnl: number | null = null;
    if (e !== null && x !== null) {
      pnl = side === 'long' ? (x - e) * v : (e - x) * v;
    }

    const { error } = await supabase.from('trades').insert({
      symbol,
      side,
      entry_price: e,
      exit_price: x,
      pnl_eur: pnl,
      notes,
      opened_at: new Date().toISOString()
    });

    setMsg(error ? '❌ ' + error.message : '✅ Trade enregistré');
    if (!error) {
      setEntry('');
      setExit('');
      setVolume('1');
      setNotes('');
      await loadTrades();
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SignalScope — Journal de trading</h1>
        <a className="btn-outline" href="https://supabase.com/docs" target="_blank" rel="noreferrer">
          Doc Supabase
        </a>
      </header>

      <StatsBar trades={trades} />

      {!supabase && (
        <p className="text-rose-600">
          Configurez <b>NEXT_PUBLIC_SUPABASE_URL</b> et <b>NEXT_PUBLIC_SUPABASE_ANON_KEY</b> sur Vercel, puis redeploy.
        </p>
      )}

      <section className="grid md:grid-cols-2 gap-4">
        {/* Formulaire */}
        <div className="card p-4 space-y-3">
          <h2 className="font-semibold">Nouveau trade</h2>

          <label className="block">Symbole
            <input
              className="w-full border rounded-lg p-2"
              value={symbol}
              onChange={e => setSymbol(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label> Sens
              <select
                className="w-full border rounded-lg p-2"
                value={side}
                onChange={e => setSide(e.target.value as Side)}
              >
                <option value="long">long 🟢</option>
                <option value="short">short 🔴</option>
              </select>
            </label>

            <label> Entrée (opt.)
              <input
                className="w-full border rounded-lg p-2"
                value={entry}
                onChange={e => setEntry(e.target.value)}
              />
            </label>

            <label> Sortie (opt.)
              <input
                className="w-full border rounded-lg p-2"
                value={exit}
                onChange={e => setExit(e.target.value)}
              />
            </label>

            <label> Volume (opt.)
              <input
                className="w-full border rounded-lg p-2"
                value={volume}
                onChange={e => setVolume(e.target.value)}
              />
            </label>
          </div>

          <label className="block">Notes
            <textarea
              className="w-full border rounded-lg p-2"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </label>

          <div className="flex gap-2">
            <button className="btn" onClick={saveTrade}>Enregistrer</button>
            <button
              className="btn-outline"
              onClick={() => {
                setEntry('');
                setExit('');
                setVolume('1');
                setNotes('');
              }}
            >
              Annuler
            </button>
          </div>

          <div className="min-h-6 text-sm text-neutral-600">{msg}</div>
          <p className="text-xs text-neutral-500">Astuce : crée la table <code>trades</code> dans Supabase.</p>
        </div>

        {/* Derniers trades */}
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Derniers trades</h2>
          <div className="divide-y">
            {trades.map(t => (
              <div key={t.id} className="py-2 flex items-center gap-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    t.side === 'long'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {t.side}
                </span>

                <div className="w-24 font-medium">{t.symbol}</div>

                <div className="text-sm text-neutral-600">
                  E: {t.entry_price ?? '-'} / S: {t.exit_price ?? '-'}
                </div>

                {/* Badge PnL (vert/rouge) */}
                <div
                  className={`ml-auto text-sm px-2 py-1 rounded-full ${
                    (t.pnl_eur ?? 0) >= 0
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {t.pnl_eur === null ? '—' : `${t.pnl_eur.toFixed(2)} €`}
                </div>

                <div className="text-xs w-16 text-right">
                  {t.closed_at ? 'Clôturé' : 'Ouvert'}
                </div>
              </div>
            ))}

            {trades.length === 0 && (
              <div className="text-sm text-neutral-500">Aucun trade pour l’instant.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
