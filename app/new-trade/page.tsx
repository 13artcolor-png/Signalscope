"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NewTradePage() {
  const [step, setStep] = useState(1);
  const [tradeType, setTradeType] = useState("LONG");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl bg-white shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {step === 1 ? "⚡ Configuration du Trade" : "📊 Analyse & Détails"}
          </CardTitle>

          {/* Progression */}
          <div className="flex items-center justify-between mt-4">
            <div className={`flex-1 h-2 rounded-full mr-2 ${step >= 1 ? "bg-blue-500" : "bg-gray-200"}`} />
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? "bg-purple-500" : "bg-gray-200"}`} />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <form className="space-y-6">
              {/* Type de trade */}
              <div>
                <Label className="text-gray-700">Type de trade</Label>
                <RadioGroup
                  value={tradeType}
                  onValueChange={setTradeType}
                  className="flex space-x-6 mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="LONG" id="long" />
                    <Label htmlFor="long" className="cursor-pointer font-medium">LONG</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="SHORT" id="short" />
                    <Label htmlFor="short" className="cursor-pointer font-medium">SHORT</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Actif */}
              <div>
                <Label className="text-gray-700">Paire de devises</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="🔎 Sélectionner un actif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eurusd">EUR/USD</SelectItem>
                    <SelectItem value="gbpusd">GBP/USD</SelectItem>
                    <SelectItem value="dax">DAX</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Source : Google Sheets (rafraîchi automatiquement).
                </p>
              </div>

              {/* Prix */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prix d’entrée</Label>
                  <Input placeholder="ex. 1.0750" className="mt-2" />
                </div>
                <div>
                  <Label>Prix de sortie</Label>
                  <Input placeholder="ex. 1.0800" className="mt-2" />
                </div>
              </div>

              {/* Stop / TP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Stop Loss</Label>
                  <Input placeholder="ex. 1.0710" className="mt-2" />
                </div>
                <div>
                  <Label>Take Profit</Label>
                  <Input placeholder="ex. 1.0890" className="mt-2" />
                </div>
              </div>

              {/* Risk / Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Pourcentage de risque</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1%</SelectItem>
                      <SelectItem value="2">2%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Unité de temps</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m15">15m</SelectItem>
                      <SelectItem value="h1">1h</SelectItem>
                      <SelectItem value="d1">1j</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Horaire d’ouverture</Label>
                  <Input type="datetime-local" className="mt-2" />
                </div>
                <div>
                  <Label>Horaire de clôture</Label>
                  <Input type="datetime-local" className="mt-2" />
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label>Notes</Label>
                <Input placeholder="Pourquoi j’ai pris ce trade ?" className="mt-2" />
              </div>

              {/* Bouton */}
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>Suivant ➡</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-gray-600">📋 Ici tu pourras écrire l’analyse et les détails du trade.</p>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>⬅ Retour</Button>
                <Button>✅ Enregistrer</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
