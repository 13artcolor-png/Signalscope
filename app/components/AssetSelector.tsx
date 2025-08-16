
'use client';

import { useEffect, useMemo, useState } from 'react';

type AssetRow = {
  category: string;
  subcategory: string;
  symbol: string;
  name: string;
};

type Props = {
  value?: string | string[];
  onChange: (val: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
};

/**
 * Menu d'actifs alimenté par Google Sheets (CSV publié).
 * - Regroupe par catégorie
 * - Affiche la sous-catégorie dans le libellé
 * - Compatible simple sélection ou multi-sélection
 *
 * Pour changer la source : passez NEXT_PUBLIC_ASSETS_CSV_URL dans Vercel (ou .env.local)
 */
export default function AssetSelector({
  value,
  onChange,
  placeholder = 'Sélectionner un actif',
  multiple = false,
  className = '',
}: Props) {
  const [rows, setRows] = useState<AssetRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const CSV_URL =
    process.env.NEXT_PUBLIC_ASSETS_CSV_URL ||
    // Valeur par défaut = ton lien Google Sheets en CSV
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTWqCpRlILr1qTpxNsNGujLG1zRYFf7kwjlyqSZwHrbKKZ6ok8InFePXCFSt9Rz_SVklI2zRHjYX43w/pub?output=csv';

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(CSV_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();

        // Parsing CSV très simple (ok pour des cellules sans virgules)
        const lines = text
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean);

        const header = lines[0].split(',').map(x => x.trim().toLowerCase());
        const idxCat = header.indexOf('category');
        const idxSub = header.indexOf('subcategory');
        const idxSym = header.indexOf('symbol');
        const idxName = header.indexOf('name');

        const parsed: AssetRow[] = lines.slice(1).map(line => {
          const cols = line.split(',').map(x => x.trim());
          return {
            category: cols[idxCat] || '',
            subcategory: cols[idxSub] || '',
            symbol: cols[idxSym] || '',
            name: cols[idxName] || '',
          };
        });

        // Filtrer lignes vides
        const clean = parsed.filter(r => r.category && r.symbol);
        setRows(clean);
      } catch (e: any) {
        setErr(e?.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [CSV_URL]);

  // Groupement par catégorie
  const grouped = useMemo(() => {
    return rows.reduce<Record<string, AssetRow[]>>((acc, r) => {
      if (!acc[r.category]) acc[r.category] = [];
      acc[r.category].push(r);
      return acc;
    }, {});
  }, [rows]);

  // gestion du changement simple / multiple
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (multiple) {
      const vals = Array.from(e.target.selectedOptions).map(o => o.value);
      onChange(vals);
    } else {
      onChange(e.target.value);
    }
  }

  const selectValue = multiple ? (Array.isArray(value) ? value : []) : (typeof value === 'string' ? value : '');

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm text-neutral-600">Paire de devises (Google Sheets)</label>

      {loading && (
        <div className="text-sm text-neutral-500">Chargement…</div>
      )}

      {err && (
        <div className="text-sm text-red-600">
          Impossible de charger la liste (CSV). Vérifie le lien publié. Détail : {err}
        </div>
      )}

      {!loading && !err && (
        <select
          multiple={multiple}
          value={selectValue as any}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-700"
        >
          {!multiple && <option value="">{placeholder}</option>}

          {Object.keys(grouped).sort().map(cat => (
            <optgroup key={cat} label={cat}>
              {grouped[cat]
                .sort((a, b) => a.subcategory.localeCompare(b.subcategory) || a.symbol.localeCompare(b.symbol))
                .map(r => {
                  const label = r.subcategory ? `[${r.subcategory}] ${r.symbol} (${r.name || r.symbol})` : `${r.symbol} (${r.name || r.symbol})`;
                  return (
                    <option key={`${r.category}-${r.subcategory}-${r.symbol}`} value={r.symbol}>
                      {label}
                    </option>
                  );
                })}
            </optgroup>
          ))}
        </select>
      )}

      <p className="text-xs text-neutral-400">
        Source : Google Sheets. Modifie le tableau → il sera rafraîchi automatiquement (public CSV).
      </p>
    </div>
  );
}
