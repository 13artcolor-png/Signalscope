"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function NewTradePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-8 py-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg",
                step === s
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              )}
            >
              {s}
            </div>
            <span
              className={cn(
                "font-medium",
                step === s ? "text-purple-600" : "text-gray-500"
              )}
            >
              {s === 1 ? "Configuration du Trade" : "Analyse & Détails"}
            </span>
          </div>
        ))}
      </div>

      {/* Formulaire */}
      <div className="flex justify-center px-4 pb-10">
        <Card className="w-full max-w-4xl shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {step === 1 ? "Configuration du Trade" : "Analyse & Détails"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type de Trade */}
                <div className="flex flex-col gap-2">
                  <Label>Type de Trade</Label>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="w-full bg-green-50 text-green-700 hover:bg-green-100"
                    >
                      LONG
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-red-50 text-red-700 hover:bg-red-100"
                    >
                      SHORT
                    </Button>
                  </div>
                </div>

                {/* Actif */}
                <div className="flex flex-col gap-2">
                  <Label>Paire de devises</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un actif" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eurusd">EUR/USD</SelectItem>
                      <SelectItem value="eurgbp">EUR/GBP</SelectItem>
                      <SelectItem value="usdjpy">USD/JPY</SelectItem>
                      <SelectItem value="gold">Or (XAU/USD)</SelectItem>
                      <SelectItem value="dax">Indice DAX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Prix entrée */}
                <div className="flex flex-col gap-2">
                  <Label>Prix d’entrée</Label>
                  <Input placeholder="1.0750" type="number" />
                </div>

                {/* Prix sortie */}
                <div className="flex flex-col gap-2">
                  <Label>Prix de sortie</Label>
                  <Input placeholder="1.0890" type="number" />
                </div>

                {/* SL */}
                <div className="flex flex-col gap-2">
                  <Label>Stop Loss</Label>
                  <Input placeholder="1.0710" type="number" />
                </div>

                {/* TP */}
                <div className="flex flex-col gap-2">
                  <Label>Take Profit</Label>
                  <Input placeholder="1.0890" type="number" />
                </div>

                {/* Pourcentage risque */}
                <div className="flex flex-col gap-2">
                  <Label>Pourcentage de risque</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un %" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5%</SelectItem>
                      <SelectItem value="1">1%</SelectItem>
                      <SelectItem value="2">2%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Unité de temps */}
                <div className="flex flex-col gap-2">
                  <Label>Unité de temps</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une unité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m5">M5</SelectItem>
                      <SelectItem value="m15">M15</SelectItem>
                      <SelectItem value="h1">H1</SelectItem>
                      <SelectItem value="d1">D1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ratio */}
                <div className="flex flex-col gap-2">
                  <Label>Ratio Risque / Rendement</Label>
                  <Input placeholder="2.0" type="number" />
                </div>

                {/* Taille du lot */}
                <div className="flex flex-col gap-2">
                  <Label>Taille du lot</Label>
                  <Input placeholder="0.01" type="number" />
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label>Notes</Label>
                  <Input placeholder="Pourquoi j’ai pris ce trade ?" />
                </div>
              </div>
            )}

            {/* Boutons navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="rounded-xl"
                >
                  Retour
                </Button>
              )}
              {step < 2 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="ml-auto rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-md"
                >
                  Suivant
                </Button>
              ) : (
                <Button className="ml-auto rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                  Enregistrer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
