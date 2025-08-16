

'use client';

import { useState } from 'react';
import AssetSelector from '../components/AssetSelector';

export default function NewTradePage() {
  const [symbol, setSymbol] = useState<string>(''); // valeur choisie
  // … autres états de ton formulaire (sens, entrée, SL, TP, etc.)

  return (
    <div className="p-6">
      {/* … ton entête, boutons LONG/SHORT etc. */}

      {/* Menu d’actifs issu de Google Sheets */}
      <AssetSelector
  value={symbol}
  onChange={(val) => setSymbol(val as string)}
  placeholder="Sélectionner un actif"
/>

        // multiple  // ← décommente si tu veux autoriser multi-sélection
      />

      {/* pour déboguer : */}
      {/* <pre className="text-xs mt-2">{JSON.stringify(symbol, null, 2)}</pre> */}

      {/* … le reste du formulaire */}
    </div>
  );
}
