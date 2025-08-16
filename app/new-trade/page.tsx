"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewTradePage() {
  const [side, setSide] = useState("long");

  return (
    <div className="min-h-screen bg-neutral-100 p-6 flex items-center justify-center">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
        <CardContent className="p-8">
          {/* Stepper */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-2 font-medium text-blue-600">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                  1
                </div>
                Configuration du trade
              </div>
              <div className="w-10 h-[1px] bg-neutral-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-300 text-neutral-600 text-xs">
                  2
                </div>
                Analyse & Détails
              </div>
            </div>
          </div>

          {/* Type de trade */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={side === "long" ? "default" : "outline"}
              className={`px-8 py-4 rounded-xl text-lg ${
                side === "long" ? "bg-green-500 hover:bg-green-600" : ""
              }`}
              onClick={() => setSide("long")}
            >
              LONG
            </Button>
            <Button
              variant={side === "short" ? "default" : "outline"}
              className={`px-8 py-4 rounded-xl text-lg ${
                side === "short" ? "bg-red-500 hover:bg-red-600" : ""
              }`}
              onClick={() => setSide("short")}
            >
              SHORT
            </Button>
          </div>

          {/* Formulaire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Paire de devises</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un actif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eurusd">EURUSD</SelectItem>
                  <SelectItem value="gbpusd">GBPUSD</SelectItem>
                  <SelectItem value="gold">GOLD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Prix d’entrée</Label>
              <Input type="number" placeholder="1.0750" />
            </div>
            <div>
              <Label>Stop Loss</Label>
              <Input type="number" placeholder="1.0700" />
            </div>
            <div>
              <Label>Take Profit</Label>
              <Input type="number" placeholder="1.0890" />
            </div>
            <div>
              <Label>Pourcentage de risque</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ex: 1%" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5%</SelectItem>
                  <SelectItem value="1">1%</SelectItem>
                  <SelectItem value="2">2%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Unité de temps</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ex: H1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m15">M15</SelectItem>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                  <SelectItem value="d1">D1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Ratio Risque / Rendement</Label>
              <Input type="number" placeholder="2.0" />
            </div>
            <div>
              <Label>Taille du lot</Label>
              <Input type="number" placeholder="0.01" />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end mt-8">
            <Button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              Suivant →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
