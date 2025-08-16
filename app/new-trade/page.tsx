import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function NewTradePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center text-indigo-600">
            📈 Nouveau Trade
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Configure ton trade facilement et proprement.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Type de trade */}
            <div>
              <Label>Type de trade</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">LONG</SelectItem>
                  <SelectItem value="short">SHORT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Paire de devises */}
            <div>
              <Label>Paire de devises</Label>
              <Input placeholder="ex. EUR/USD" />
            </div>

            {/* Prix */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prix d’entrée</Label>
                <Input placeholder="1.0750" type="number" />
              </div>
              <div>
                <Label>Prix de sortie (optionnel)</Label>
                <Input placeholder="1.0800" type="number" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stop Loss (optionnel)</Label>
                <Input placeholder="1.0710" type="number" />
              </div>
              <div>
                <Label>Take Profit (optionnel)</Label>
                <Input placeholder="1.0890" type="number" />
              </div>
            </div>

            {/* Pourcentage & Unité de temps */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Pourcentage de risque</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="%" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1%</SelectItem>
                    <SelectItem value="2">2%</SelectItem>
                    <SelectItem value="3">3%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Unité de temps</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m5">M5</SelectItem>
                    <SelectItem value="h1">H1</SelectItem>
                    <SelectItem value="d1">D1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Ratio et Lot */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ratio Risque/Rendement</Label>
                <Input placeholder="ex. 2.0" type="number" />
              </div>
              <div>
                <Label>Taille du lot</Label>
                <Input placeholder="ex. 0.01" type="number" />
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <Textarea placeholder="Pourquoi j’ai pris ce trade ?" />
            </div>

            <Button type="submit" className="w-full text-lg py-6">
              ✅ Enregistrer le Trade
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
