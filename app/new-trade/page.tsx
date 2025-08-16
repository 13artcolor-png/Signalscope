"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewTradePage() {
  const [assets, setAssets] = useState<{ symbol: string; category: string }[]>([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [side, setSide] = useState("long");
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");

  // Charger la liste des actifs depuis Supabase
  useEffect(() => {
    async function fetchAssets() {
      const { data, error } = await supabase
        .from("assets")
        .select("symbol, category")
        .eq("is_active", true)
        .order("category", { ascending: true });

      if (error) {
        console.error("Erreur fetch assets:", error);
      } else {
        setAssets(data || []);
      }
    }

    fetchAssets();
  }, []);

  // Sauvegarde du trade
  async function handleSave() {
    if (!selectedAsset || !entry) {
      alert("⚠️ Choisis un actif et un prix d’entrée !");
      return;
    }

    const { error } = await supabase.from("trades").insert([
      {
        side,
        entry_price: parseFloat(entry),
        exit_price: exit ? parseFloat(exit) : null,
        symbol: selectedAsset, // ⚡ directement depuis le menu déroulant
        status: "open",
      },
    ]);

    if (error) {
      console.error("Erreur insertion trade:", error);
      alert("❌ Erreur sauvegarde");
    } else {
      alert("✅ Trade enregistré !");
      setEntry("");
      setExit("");
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">➕ Nouveau trade</h1>

      {/* Menu déroulant pour l’actif */}
      <label className="block mb-2 font-medium">Symbole</label>
      <select
        value={selectedAsset}
        onChange={(e) => setSelectedAsset(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value="">-- Choisir un actif --</option>
        {assets.map((a, i) => (
          <option key={i} value={a.symbol}>
            {a.category} - {a.symbol}
          </option>
        ))}
      </select>

      {/* Choix du sens */}
      <label className="block mb-2 font-medium">Sens</label>
      <select
        value={side}
        onChange={(e) => setSide(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>

      {/* Prix d’entrée */}
      <label className="block mb-2 font-medium">Entrée</label>
      <input
        type="number"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />

      {/* Prix de sortie (optionnel) */}
      <label className="block mb-2 font-medium">Sortie (optionnel)</label>
      <input
        type="number"
        value={exit}
        onChange={(e) => setExit(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Enregistrer
      </button>
    </div>
  );
}
