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

  useEffect(() => {
    async function fetchAssets() {
      const { data, error } = await supabase
        .from("assets")
        .select("symbol, category")
        .eq("is_active", true)
        .order("category", { ascending: true });

      if (error) console.error(error);
      else setAssets(data || []);
    }

    fetchAssets();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">➕ Nouveau trade</h1>

      {/* Menu déroulant symboles */}
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

      {/* Autres champs */}
      <button className="px-4 py-2 bg-black text-white rounded-lg">
        Enregistrer
      </button>
    </div>
  );
}
