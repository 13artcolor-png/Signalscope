"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import AssetSelector from "@/components/AssetSelector";

export default function NewTradePage() {
  const [side, setSide] = useState<"long" | "short">("long");

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Nouveau trade</h1>
        <p className="text-gray-500">Configuration du trade</p>
      </div>

      {/* Form Card */}
      <Card className="space-y-6">
        {/* Type de trade */}
        <div className="flex justify-center gap-4">
          <Button
            variant={side === "long" ? "default" : "outline"}
            onClick={() => setSide("long")}
          >
            LONG
          </Button>
          <Button
            variant={side === "short" ? "default" : "outline"}
            onClick={() => setSide("short")}
          >
            SHORT
          </Button>
        </div>

        {/* Paire de devises */}
        <div className="space-y-2">
          <Label>Paire de devises</Label>
          <AssetSelector />
          <p className="text-xs text-gray-500">
            Source : Google Sheets (rafraîchi automatiquement en CSV public)
          </p>
        </div>

        {/* Prix d'entrée */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Prix d'entrée</Label>
            <Input placeholder="1.0750" />
          </div>
          <div className="space-y-2">
            <Label>Prix de sortie</Label>
            <Input placeholder="1.0850" />
          </div>
        </div>

        {/* SL / TP */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Stop Loss (optionnel)</Label>
            <Input placeholder="1.0710" />
          </div>
          <div className="space-y-2">
            <Label>Take Profit (optionnel)</Label>
            <Input placeholder="1.0890" />
          </div>
        </div>

        {/* Risque et lot */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Pourcentage de risque</Label>
            <Input type="number" placeholder="1 %" />
          </div>
          <div className="space-y-2">
            <Label>Taille du lot</Label>
            <Input type="number" placeholder="0.01" />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label>Notes</Label>
          <Input placeholder="Pourquoi j’ai pris ce trade ?" />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button>Suivant</Button>
        </div>
      </Card>
    </div>
  );
}
