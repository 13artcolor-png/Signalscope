"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AssetRow = {
  category: string;
  symbol: string;
};

type Props = {
  value?: string;
  onChange: (val: string) => void;
};

export default function AssetSelector({ value, onChange }: Props) {
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const CSV_URL =
    process.env.NEXT_PUBLIC_ASSETS_CSV_URL ||
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrxchmmZ1PGxs7UsJgB_6JAdKmrf3Ihl62VuVHgClsD4RTQlFhb-oYySMhEvZLnutq-qZz6YgqsV-U/pub?gid=821512&single=true&output=csv";

  useEffect(() => {
    async function load() {
      const res = await fetch(CSV_URL, { cache: "no-store" });
      const text = await res.text();
      const rows = text.split("\n").slice(1).map((l) => l.trim()).filter(Boolean);

      const parsed: AssetRow[] = rows.map((line) => {
        const [category, symbol] = line.split(",");
        return { category: category.trim(), symbol: symbol.trim() };
      });

      setAssets(parsed);
      setCategories([...new Set(parsed.map((r) => r.category))]);
      if (!selectedCategory && parsed.length > 0) {
        setSelectedCategory(parsed[0].category);
      }
    }
    load();
  }, []);

  const filteredAssets = assets.filter((a) => a.category === selectedCategory);

  return (
    <div className="flex flex-col gap-4">
      {/* Catégories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={cat === selectedCategory ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="rounded-full px-4"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Actifs */}
      <div className="flex flex-wrap gap-2">
        {filteredAssets.map((a) => (
          <Button
            key={a.symbol}
            variant={value === a.symbol ? "default" : "outline"}
            onClick={() => onChange(a.symbol)}
            className={cn(
              "rounded-full px-4 py-1 text-sm",
              value === a.symbol
                ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white"
                : "bg-white"
            )}
          >
            {a.symbol}
          </Button>
        ))}
      </div>
    </div>
  );
}
