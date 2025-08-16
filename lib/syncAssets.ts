
// lib/syncAssets.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Télécharge et parse le CSV
export async function loadAssets() {
  const url = process.env.NEXT_PUBLIC_ASSETS_CSV_URL!;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erreur fetch CSV: ${res.status}`);
  }

  const text = await res.text();
  const rows = text.split("\n").slice(1); // saute l’en-tête

  return rows
    .map((row) => {
      const [category, symbol] = row.split(",");
      if (!category || !symbol) return null;
      return { category: category.trim(), symbol: symbol.trim(), is_active: true };
    })
    .filter(Boolean);
}

// Synchronise avec Supabase
export async function syncAssets() {
  try {
    const assets = await loadAssets();

    const { error } = await supabase
      .from("assets")
      .upsert(assets, { onConflict: "symbol" });

    if (error) {
      console.error("Erreur Supabase sync:", error);
      return { success: false, error };
    }

    console.log("✅ Assets synchronisés:", assets.length);
    return { success: true, count: assets.length };

  } catch (err) {
    console.error("Erreur syncAssets:", err);
    return { success: false, error: err };
  }
}
