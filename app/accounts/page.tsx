'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';

type Account = {
  id: string;
  name: string | null;
  broker: string | null;
  currency: string | null;
  balance: number | null;
  created_at: string | null;
};

export default function AccountsPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Account[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('accounts').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setRows(data || []);
      } catch (e: any) {
        // Sécurise même si la table n’existe pas encore
        setError('Aucun compte trouvé (ou table "accounts" absente pour le moment).');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Comptes</h1>

      <p className="text-sm text-neutral-600">
        Liste de tes comptes de trading (par broker). Tu pourras les connecter plus tard à TradingView / cTrader / MT5.
      </p>

      {loading ? (
        <div className="text-sm text-neutral-500">Chargement…</div>
      ) : rows.length === 0 ? (
        <div className="card p-4">
          <div className="text-sm">{error ?? 'Aucun compte pour le moment.'}</div>
          <div className="text-xs text-neutral-500 mt-1">
            (Astuce : crée la table <code>accounts</code> dans Supabase — instructions plus bas.)
          </div>
        </div>
      ) : (
        <div className="card p-0 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-3">Nom</th>
                <th className="p-3">Broker</th>
                <th className="p-3">Devise</th>
                <th className="p-3">Solde</th>
                <th className="p-3">Créé le</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-b last:border-0">
                  <td className="p-3">{a.name ?? '—'}</td>
                  <td className="p-3">{a.broker ?? '—'}</td>
                  <td className="p-3">{a.currency ?? '—'}</td>
                  <td className="p-3">{a.balance ?? 0}</td>
                  <td className="p-3">{a.created_at ? new Date(a.created_at).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-xs text-neutral-500">
        Besoin d’aide ? Va dans <Link href="/settings" className="underline">Paramètres</Link> pour les intégrations.
      </div>
    </div>
  );
}
