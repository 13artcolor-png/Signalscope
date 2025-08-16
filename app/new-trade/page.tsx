'use client';

import { useState } from 'react';
import AssetSelector from '../components/AssetSelector';

/** 
 * Écran "Nouveau trade" — Étape 1 (Configuration)
 * - Boutons LONG/SHORT (vert/rouge)
 * - Menu d’actifs relié à Google Sheets (AssetSelector)
 * - Champs principaux avec ⚙️ sur ceux à analyser par l’IA
 * - Bouton "Suivant" (pour passer à l'étape Analyse & Détails)
 *
 * ⚠️ Prérequis pour AssetSelector :
 * - Avoir créé app/components/AssetSelector.tsx (fourni précédemment)
 * - (Optionnel) Dans Vercel: NEXT_PUBLIC_ASSETS_CSV_URL = votre lien Google Sheets CSV
 */

export default function NewTradePage() {
  // Sens du trade
  const [side, setSide] = useState<'long' | 'short'>('long');

  // Actif sélectionné (symbol : ex. "EURUSD")
  const [symbol, setSymbol] = useState<string>('');

  // Champs analysés par l'IA (⚙️)
  const [entry, setEntry] = useState<string>('');     // ⚙️
  const [exit, setExit] = useState<string>('');       // ⚙️
  const [sl, setSl] = useState<string>('');           // ⚙️
  const [tp, setTp] = useState<string>('');           // ⚙️
  const [risk, setRisk] = useState<string>('');       // ⚙️
  const [timeUnit, setTimeUnit] = useState<string>(''); // ⚙️
  const [openAt, setOpenAt] = useState<string>('');   // ⚙️
  const [closeAt, setCloseAt] = useState<string>(''); // ⚙️
  const [rr, setRr] = useState<string>('');           // ⚙️
  const [lot, setLot] = useState<string>('');         // ⚙️

  // Non analysé par IA
  const [notes, setNotes] = useState<string>('');

  function goNext() {
    // Ici on se contente d'afficher ce que tu as saisi pour vérifier
    // Dans ta version complète, tu peux rediriger vers /new-trade/analysis?trade=<id>
    console.log({
      side, symbol, entry, exit, sl, tp, risk, timeUnit, openAt, closeAt, rr, lot, notes,
    });
    alert('Étape 1 OK. (Dans la version complète, ce bouton enverra vers la page Analyse & Détails)');
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:ml-64">
      {/* En-tête + étapes */}
      <div className="mb-6">
        <div className="text-xs text-neutral-500">1 / 2</div>
        <h1 className="text-2xl font-bold">Nouveau trade</h1>
        <div className="text-sm text-neutral-500">Configuration du trade</div>
      </div>

      <div className="rounded-2xl border bg-white p-6 space-y-6">
        {/* Type de Trade */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-600">Type de trade</label>
          <SideToggle value={side} onChange={setSide} />
        </div>

        {/* Actif (Google Sheets) */}
        <AssetSelector
          value={symbol}
          onChange={(val) => setSymbol(val as string)}
          placeholder="Sélectionner un actif"
          className="mt-2"
        />

        {/* Grille des champs principaux */}
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Prix d’entrée" ia>
            <input
              className="input"
              inputMode="decimal"
              placeholder="1.0750"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </Field>
          <Field label="Prix de sortie (optionnel)" ia>
            <input
              className="input"
              inputMode="decimal"
              placeholder="1.0800"
              value={exit}
              onChange={(e) => setExit(e.target.value)}
            />
          </Field>

          <Field label="Stop Loss (optionnel)" ia>
            <input
              className="input"
              inputMode="decimal"
              placeholder="1.0710"
              value={sl}
              onChange={(e) => setSl(e.target.value)}
            />
          </Field>
          <Field label="Take Profit (optionnel)" ia>
            <input
              className="input"
              inputMode="decimal"
              placeholder="1.0890"
              value={tp}
              onChange={(e) => setTp(e.target.value)}
            />
          </Field>

          <Field label="Pourcentage de risque" ia>
            <select
              className="input"
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
            >
              <option value="">Sélectionner un pourcentage</option>
              {['0.25','0.5','1','1.5','2','3','5'].map(p => (
                <option key={p} value={p}>{p}%</option>
              ))}
            </select>
          </Field>
          <Field label="Unité de temps" ia>
            <select
              className="input"
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
            >
              <option value="">Sélectionner une unité</option>
              <option value="min">Minutes</option>
              <option value="h">Heures</option>
              <option value="d">Jours</option>
            </select>
          </Field>

          <Field label="Horaire d’ouverture" ia>
            <input
              type="datetime-local"
              className="input"
              value={openAt}
              onChange={(e) => setOpenAt(e.target.value)}
            />
          </Field>
          <Field label="Horaire de clôture" ia>
            <input
              type="datetime-local"
              className="input"
              value={closeAt}
              onChange={(e) => setCloseAt(e.target.value)}
            />
          </Field>

          <Field label="Ratio Risque/Rendement" ia>
            <input
              className="input"
              inputMode="decimal"
              placeholder="ex. 2.0"
              value={rr}
              onChange={(e) => setRr(e.target.value)}
            />
          </Field>
          <Field label="Taille du lot" ia>
            <input
              className="input"
              inputMode="decimal"
              placeholder="ex. 0.01"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
            />
          </Field>
        </div>

        {/* Notes (non analysé IA) */}
        <div>
          <label className="text-sm font-medium text-neutral-600">Notes</label>
          <textarea
            className="input h-28"
            placeholder="Pourquoi j’ai pris ce trade ?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end">
          <button onClick={goNext} className="btn-primary">Suivant</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Petites briques UI ---------- */

function SideToggle({
  value,
  onChange,
}: {
  value: 'long' | 'short';
  onChange: (v: 'long' | 'short') => void;
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-xl border bg-white">
      <button
        onClick={() => onChange('long')}
        className={`px-6 py-2 text-sm font-medium transition ${
          value === 'long'
            ? 'bg-emerald-500 text-white'
            : 'text-neutral-700 hover:bg-neutral-50'
        }`}
      >
        🟢 LONG
      </button>
      <button
        onClick={() => onChange('short')}
        className={`px-6 py-2 text-sm font-medium transition ${
          value === 'short'
            ? 'bg-rose-500 text-white'
            : 'text-neutral-700 hover:bg-neutral-50'
        }`}
      >
        🔴 SHORT
      </button>
    </div>
  );
}

function Field({
  label,
  children,
  ia,
}: {
  label: string;
  children: React.ReactNode;
  ia?: boolean; // si true → petit symbole IA
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xs font-medium text-neutral-600">{label}</span>
        {ia && (
          <span
            title="Analysé par l'IA"
            className="rounded-full border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-600"
          >
            ⚙️
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ---------- Styles utilitaires Tailwind (si pas déjà dans globals.css) ----------
.input { @apply w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-200; }
.btn-primary { @apply px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm hover:bg-black; }
------------------------------------------------------------------------------- */
