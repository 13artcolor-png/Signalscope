"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { RadioGroup } from "@/components/ui/radio-group";

export default function NewTradePage() {
  const [step, setStep] = useState(1);
  const [tradeType, setTradeType] = useState("LONG");

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {step === 1 ? "Configuration du Trade" : "Analyse & Détails"}
          </CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div
              className={`w-1/2 h-1 rounded-full mr-2 ${
                step === 1 ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
            <div
              className={`w-1/2 h-1 rounded-full ${
                step === 2 ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <form className="space-y-6">
              {/* Type de Trade */}
              <div>
                <Label>Type de trade</Label>
                <RadioGroup
                  options={[
                    { label: "🟢 LONG", value: "LONG" },
                    { label: "🔴 SHORT", value: "SHORT" },
                  ]}
                  value={tradeType}
                  onChange={setTradeType}
                />
              </div>

              {/* Actif */}
              <div>
                <Label>Paire de devises</Label>
                <Select>
                  <option value="">Sélectionner un actif</option>
                  <option value="eurusd">EUR/USD</option>
                  <option value="gbpusd">GBP/USD</option>
                  <option value="dax">DAX</option>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Source : Google Sheets. Le tableau se met à jour
                  automatiquement.
                </p>
              </div>

              {/* Prix */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prix d’entrée</Label>
                  <Input placeholder="ex. 1.0750" />
                </div>
                <div>
                  <Label>Prix de sortie</Label>
                  <Input placeholder="ex. 1.0800" />
                </div>
              </div>

              {/* SL / TP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Stop Loss</Label>
                  <Input placeholder="ex. 1.0710" />
                </div>
                <div>
                  <Label>Take Profit</Label>
                  <Input placeholder="ex. 1.0890" />
                </div>
              </div>

              {/* Risk / Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Pourcentage de risque</Label>
                  <Select>
                    <option value="">Sélectionner</option>
                    <option value="1">1%</option>
                    <option value="2">2%</option>
                    <option value="5">5%</option>
                  </Select>
                </div>
                <div>
                  <Label>Unité de temps</Label>
                  <Select>
                    <option value="">Sélectionner</option>
                    <option value="m15">15m</option>
                    <option value="h1">1h</option>
                    <option value="d1">1j</option>
                  </Select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Horaire d’ouverture</Label>
                  <Input type="datetime-local" />
                </div>
                <div>
                  <Label>Horaire de clôture</Label>
                  <Input type="datetime-local" />
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label>Notes</Label>
                <Input placeholder="Pourquoi j’ai pris ce trade ?" />
              </div>

              {/* Bouton Suivant */}
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>Suivant</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-gray-600">
                👉 Ici tu pourras remplir l’analyse détaillée du trade (raisons
                d’entrée, contexte marché, etc.).
              </p>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Retour
                </Button>
                <Button>Enregistrer</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
