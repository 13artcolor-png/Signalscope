
'use client';
import { useState } from 'react';

export default function ImportPage() {
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setMsg('Import en cours…');
    const res = await fetch('/api/import', { method:'POST', body: fd });
    const data = await res.json();
    setMsg(res.ok ? `✅ Importé : ${data.inserted} lignes` : `❌ ${data.error}`);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Importer un CSV</h1>
      <form onSubmit={onSubmit} className="card p-4 space-y-3">
        <input name="file" type="file" accept=".csv" className="block" required />
        <button className="btn">Importer</button>
        <div className="text-sm text-neutral-600">{msg}</div>
      </form>
      <p className="text-xs text-neutral-500">
        Exportez le CSV depuis votre broker (MT4/5, cTrader, Oanda…) puis importez-le ici.
      </p>
    </div>
  );
}
