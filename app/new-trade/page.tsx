"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔑 Connexion Supabase avec tes variables d’env.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Asset = {
  Category: string;
  Symbol: string;
};

export default function NewTradePage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [form, setForm] = useState({
    symbol: "",
    direction: "long",
    entry: "",
    exit: "",
    volume: 1,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Charger les assets depuis Google Sheets CSV
  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_ASSETS_CSV_URL!);
        const text = await res.text();

        const rows = text.split("\n").slice(1).filter(Boolean);
        const parsed = rows.map((row) => {
          const [Category, Symbol] = row.split(",");
          return { Category: Category?.trim(), Symbol: Symbol?.trim() };
        });
        setAssets(parsed);
      } catch (err) {
        console.error("Erreur chargement assets:", err);
      }
    }
    fetchAssets();
  }, []);

  // Mise à jour du formulaire
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Envoi dans Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.from("trades").insert([
        {
          symbol: form.symbol,
          direction: form.direction,
          entry: form.entry ? parseFloat(form.entry) : null,
          exit: form.exit ? parseFloat(form.exit) : null,
          volume: parseFloat(String(form.volume)),
          notes: form.notes,
        },
      ]);

      if (error) throw error;

      setMessage("✅ Trade enregistré avec succès !");
      setForm({
        symbol: "",
        direction: "long",
        entry: "",
        exit: "",
        volume: 1,
        notes: "",
      });
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Erreur lors de l'enregistrement du trade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Nouveau trade</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow"
      >
        {/* Sélecteur symbole */}
        <div>
          <label className="block mb-1 font-medium">Symbole</label>
          <select
            name="symbol"
            value={form.symbol}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">-- Choisir un actif --</option>
            {assets.map((a, i) => (
              <option key={i} value={a.Symbol}>
                {a.Category} — {a.Symbol}
              </option>
            ))}
          </select>
        </div>

        {/* Direction */}
        <div>
          <label className="block mb-1 font-medium">Sens</label>
          <select
            name="direction"
            value={form.direction}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>

        {/* Entrée */}
        <div>
          <label className="block mb-1 font-medium">Entrée (opt.)</label>
          <input
            type="number"
            name="entry"
            value={form.entry}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="1.0850"
          />
        </div>

        {/* Sortie */}
        <div>
          <label className="block mb-1 font-medium">Sortie (opt.)</label>
          <input
            type="number"
            name="exit"
            value={form.exit}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="1.0950"
          />
        </div>

        {/* Volume */}
        <div>
          <label className="block mb-1 font-medium">Volume</label>
          <input
            type="number"
            name="volume"
            value={form.volume}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            min={0.01}
            step={0.01}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows={3}
            placeholder="Pourquoi j’ai pris ce trade ?"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>

        {message && (
          <p className="mt-3 text-sm font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
