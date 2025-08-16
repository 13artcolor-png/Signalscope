
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Account = {
  id: string;
  broker: string;
  name: string;
  currency: string;
  balance: number | null;
  created_at: string;
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    broker: '',
    name: '',
    currency: 'EUR',
    balance: '' as string | number,
  });

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setAccounts(data as Account[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      broker: form.broker.trim(),
      name: form.name.trim(),
      currency: form.currency.trim(),
      balance:
        form.balance === '' ? null : Number(String(form.balance).replace(',', '.')),
    };
    if (!payload.broker || !payload.name) return;

    const { error } = await supabase.from('accounts').insert(payload);
    if (!error) {
      setForm({ broker: '', name: '', currency: 'EUR', balance: '' });
      load();
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Comptes</h1>

      <form onSubmit={onSubmit} className="card p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        <div>
          <label className="label">Broker</label>
          <input
            className="input"
            value={form.broker}
            onChange={(e) => setForm({ ...form, broker: e.target.value })}
            placeholder="Ex: IC Markets"
            required
          />
        </div>
        <div>
          <label className="label">Nom du compte</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ex: Compte Démo 01"
            required
          />
        </div>
        <div>
          <label className="label">Devise</label>
          <select
            className="input"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
          >
            <option>EUR</option>
            <option>USD</option>
            <option>GBP</option>
          </select>
        </div>
        <div>
          <label className="label">Solde (optionnel)</label>
          <input
            className="input"
            value={form.balance}
            onChange={(e) => setForm({ ...form, balance: e.target.value })}
            placeholder="Ex: 10000"
            inputMode="decimal"
          />
        </div>
        <div className="flex items-end">
          <button className="btn-primary w-full" type="submit">
            Ajouter
          </button>
        </div>
      </form>

      <div className="card p-0">
        <div className="px-4 py-2 border-b text-xs uppercase text-neutral-500">
          Tes comptes
        </div>
        {loading ? (
          <div className="p-4 text-sm text-neutral-500">Chargement…</div>
        ) : accounts.length === 0 ? (
          <div className="p-4 text-sm text-neutral-500">Aucun compte pour l’instant.</div>
        ) : (
          <div className="divide-y">
            {accounts.map((a) => (
              <div key={a.id} className="px-4 py-3 flex flex-wrap gap-4 text-sm">
                <div className="font-medium">{a.name}</div>
                <div className="text-neutral-500">({a.broker})</div>
                <div className="ml-auto">
                  {a.balance == null ? '—' : Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: a.currency || 'EUR',
                  }).format(a.balance)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
