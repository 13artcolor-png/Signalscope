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
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function NewTradePage() {
  const [step, setStep] = useState(1);
  const [tradeType, setTradeType] = useState("LONG");

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {step === 1 ? "Configuration du Trade" : "Analyse & Détails"}
          </CardTitle>
          <div className="flex items-center justify-between mt-2">
            <div
              className={cn(
                "w-1/2 h-1 rounded-full mr-2",
                step === 1 ? "bg-blue-500" : "bg-gray-300"
              )}
            />
            <div
              className={cn(
                "w-1/2 h-1 rounded-full",
                step === 2 ? "bg-blue-500" : "bg-gray-300"
              )}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <form className="space-y-6">
              {/* Type de trade */}
              <div>
                <Label>Type de trade</Label>
                <RadioGroup
                  value={tradeType}
                  onValueChange={setTradeType}
                  className="flex space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="LONG" id="long" />
                    <Label htmlFor="long">LONG</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="SHORT" id="short" />
                    <Label htmlFor="short">SHORT</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Actif */}
              <div>
                <Label>Paire de devises</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Sélectionner un actif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eurusd">EUR/USD</SelectItem>
                    <SelectItem value="gbpusd">GBP/USD</SelectItem>
                    <SelectItem value="dax">DAX</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Source : Google Sheets. Le tableau est rafraîchi automatiquement.
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

              {/* Stop / Take Profit */}
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

              {/* Bouton suivant */}
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>Suivant</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-gray-600">👉 Ici tu pourras mettre l’analyse et les détails du trade.</p>
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
