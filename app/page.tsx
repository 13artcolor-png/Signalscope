'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- Supabase côté client (clés publiques)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ---------- Helpers anti-plantage ----------
function asNumber(x: any): number | null {
  if (x === null || x === undefined) return null;
  if (typeof x === 'number') return Number.isFinite(x) ? x : null;
  const s = String(x).trim().replace(',', '.');
  if (s === '') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function fmtEuro(x: any): string {
  const n = asNumber(x);
  const v = n === null ? 0 : n;
  return `${v.toFixed(2)} €`;
}
// -------------------------------------------

type Trade = {
  id?: number;
  symbol: string;
  side: 'long' | 'short';
  entry_price: number | null;
  exit_price: number | null;
  volume?: number | null;
  pnl_eur: number | null;
  opened_at: string | null;
  closed_at: string | null;
  notes?: string | null;
};

export default function Page() {
  // formulaire
  const [symbol, setSymbol] = useState('');
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [entry, setEntry] = useState<string>('');
  const [exit, setExit] = useState<string>('');
  const [volume, setVolume] = useState<string>('1');
  const [notes, setNotes] = useState<string>('');

  // données
  const [trades, setTrades] = useState<Trade[]>([]);
  const [status, setStatus] = useState<string>('');

  // stats
  const total = (trades ?? [])
    .map(t => asNumber(t.pnl_eur))
    .filter((n): n is number => n !== null)
    .reduce((a, b) => a + b, 0);
  const wins = (trades ?? [])
    .map(t => asNumber(t.pnl_eur))
    .filter((n): n is number => n !== null && n > 0).length;
  const counted = (trades ?? [])
    .map(t => asNumber(t.pnl_eur))
    .filter((n): n is number => n !== null).length;
  const winRate = counted ? (wins / counted) * 100 : 0;
  const avg = counted ? total / counted : 0;

  async function loadTrades() {
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .order('opened_at', { ascending: false })
      .limit(100);
    if (!error && data) setTrades(data as Trade[]);
  }

  useEffect(() => {
    loadTrades();
  }, []);

  async function saveTrade(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Enregistrement…');

    const eNum = asNumber(entry);
    const xNum = asNumber(exit);
    const vNum = asNumber(volume) ?? 1;

    let pnl: number | null = null;
    if (eNum !== null && xNum !== null) {
      pnl = side === 'long' ? (xNum - eNum) * vNum : (eNum - xNum) * vNum;
    }

    const row: Trade = {
      symbol: symbol.trim() || 'EURUSD',
      side,
      entry_price: eNum,
      exit_price: xNum,
      volume: vNum,
      pnl_eur: pnl,
      opened_at: new Date().toISOString(),
      closed_at: xNum !== null ? new Date().toISOString() : null,
      notes: notes || null,
    };

    const { error } = await supabase.from('trades').insert(row);
    if (error) {
      setStatus('❌ Erreur: ' + error.message);
    } else {
      setStatus('✅ Trade enregistré');
      setSymbol('');
      setEntry('');
      setExit('');
      setVolume('1');
      setNotes('');
      await loadTrades();
    }
  }

  async function closeTrade(id: number) {
    // On ferme en mettant la date de clôture si ce n’est pas déjà fait
    const { error } = await supabase
      .from('trades')
      .update({ closed_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) loadTrades();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="card p-4">
          <div className="text-sm text-neutral-500">Win rate</div>
          <div className="text-2xl font-semibold">{winRate.toFixed(1)}%</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-neutral-500">PnL total</div>
          <div className="text-2xl font-semibold">{fmtEuro(total)}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-neutral-500">PnL moyen / trade</div>
          <div className="text-2xl font-semibold">{fmtEuro(avg)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulaire */}
        <div className="card p-4">
          <h2 className="font-semibold mb-3">Nouveau trade</h2>
          <form onSubmit={saveTrade} className="space-y-3">
            <div>
              <div className="text-sm mb-1">Symbole</div>
              <input
                className="input"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
                placeholder="EURUSD"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm mb-1">Sens</div>
                <select
                  className="input"
                  value={side}
                  onChange={e => setSide(e.target.value as 'long' | 'short')}
                >
                  <option value="long">long</option>
                  <option value="short">short</option>
                </select>
              </div>

              <div>
                <div className="text-sm mb-1">Volume (opt.)</div>
                <input
                  className="input"
                  value={volume}
                  onChange={e => setVolume(e.target.value)}
                  placeholder="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm mb-1">Entrée (opt.)</div>
                <input
                  className="input"
                  value={entry}
                  onChange={e => setEntry(e.target.value)}
                  placeholder="1.0850"
                />
              </div>
              <div>
                <div className="text-sm mb-1">Sortie (opt.)</div>
                <input
                  className="input"
                  value={exit}
                  onChange={e => setExit(e.target.value)}
                  placeholder="1.0900"
                />
              </div>
            </div>

            <div>
              <div className="text-sm mb-1">Notes</div>
              <textarea
                className="input min-h-[100px]"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Pourquoi j’ai pris ce trade ?"
              />
            </div>

            <button className="btn">Enregistrer</button>
            <div className="text-xs text-neutral-500">{status}</div>
          </form>
        </div>

        {/* Liste des trades */}
        <div className="card p-4">
          <h2 className="font-semibold mb-3">Derniers trades</h2>
          <div className="divide-y">
            {trades.map((t) => {
              // calc PnL si pas stocké
              let pnl = t.pnl_eur;
              if ((pnl === null || pnl === undefined) && t.entry_price != null && t.exit_price != null) {
                const eNum = asNumber(t.entry_price);
                const xNum = asNumber(t.exit_price);
                if (eNum !== null && xNum !== null) {
                  pnl = t.side === 'long' ? (xNum - eNum) : (eNum - xNum);
                }
              }
              const pnlNum = asNumber(pnl) ?? 0;
              const isPositive = pnlNum >= 0;

              return (
                <div key={t.id} className="py-2 flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    t.side === 'long' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {t.side}
                  </span>

                  <div className="w-24 font-medium">{t.symbol}</div>

                  <div className="text-sm text-neutral-600">
                    E: {t.entry_price ?? '-'} / S: {t.exit_price ?? '-'}
                  </div>

                  <div className={`ml-auto text-sm px-2 py-1 rounded-full ${
                    isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {fmtEuro(pnlNum)}
                  </div>

                  <div className="text-xs w-16 text-right">
                    {t.closed_at ? 'Clôturé' : 'Ouvert'}
                  </div>

                  {!t.closed_at && t.id && (
                    <button onClick={() => closeTrade(t.id!)} className="btn btn-sm">
                      Clôturer
                    </button>
                  )}
                </div>
              );
            })}

            {trades.length === 0 && (
              <div className="text-sm text-neutral-500">Aucun trade pour l’instant.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
