"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewTradePage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [side, setSide] = useState("long");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [notes, setNotes] = useState("");

  // 🔹 Charger la liste des assets depuis Supabase
  useEffect(() => {
    const fetchAssets = async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("id, category, symbol")
        .order("category", { ascending: true });

      if (error) console.error("Erreur chargement assets:", error);
      else setAssets(data || []);
    };

    fetchAssets();
  }, []);

  // 🔹 Sauvegarde du trade
  const handleSaveTrade = async () => {
    if (!selectedAssetId || !entryPrice || !exitPrice) {
      alert("Merci de remplir tous les champs obligatoires");
      return;
    }

    const { error } = await supabase.from("trades").insert([
      {
        asset_id: selectedAssetId,
        side,
        entry_price: parseFloat(entryPrice),
        exit_price: parseFloat(exitPrice),
        notes,
      },
    ]);

    if (error) {
      console.error("Erreur sauvegarde trade:", error);
      alert("Erreur enregistrement trade ❌");
    } else {
      alert("Trade enregistré ✅");
      setSelectedAssetId("");
      setEntryPrice("");
      setExitPrice("");
      setNotes("");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">➕ Nouveau trade</h1>

      {/* Sélecteur d’actifs */}
      <label className="block mb-2">Symbole</label>
      <select
        value={selectedAssetId}
        onChange={(e) => setSelectedAssetId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">-- Choisir un actif --</option>
        {assets.map((a) => (
          <option key={a.id} value={a.id}>
            {a.category} - {a.symbol}
          </option>
        ))}
      </select>

      {/* Sens du trade */}
      <label className="block mb-2">Sens</label>
      <select
        value={side}
        onChange={(e) => setSide(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>

      {/* Prix d’entrée */}
      <label className="block mb-2">Entrée</label>
      <input
        type="number"
        value={entryPrice}
        onChange={(e) => setEntryPrice(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Prix de sortie */}
      <label className="block mb-2">Sortie</label>
      <input
        type="number"
        value={exitPrice}
        onChange={(e) => setExitPrice(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Notes */}
      <label className="block mb-2">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleSaveTrade}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Enregistrer
      </button>
    </div>
  );
}
