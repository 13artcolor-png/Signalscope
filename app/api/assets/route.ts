// app/api/assets/route.ts
import 'server-only';

type Asset = { Category: string; Symbol: string };

function parseCSV(csv: string): Asset[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim());
  const idxCategory = headers.indexOf('Category');
  const idxSymbol = headers.indexOf('Symbol');

  if (idxCategory === -1 || idxSymbol === -1) return [];

  // Parse simple CSV (pas de guillemets imbriqués). Pour ton cas, c’est suffisant.
  const rows = lines.slice(1).map((l) => l.split(',').map((c) => c.trim()));

  const data: Asset[] = [];
  for (const cols of rows) {
    const Category = cols[idxCategory] ?? '';
    const Symbol = cols[idxSymbol] ?? '';
    if (Category && Symbol) data.push({ Category, Symbol });
  }
  return data;
}

export async function GET() {
  const url = process.env.ASSETS_CSV_URL;
  if (!url) {
    return new Response(JSON.stringify({ error: 'ASSETS_CSV_URL manquant' }), { status: 500 });
  }

  const res = await fetch(url, { next: { revalidate: 60 } }); // re-fetch toutes les 60 s
  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Échec téléchargement CSV' }), { status: 502 });
  }

  const csv = await res.text();
  const data = parseCSV(csv); // [{ Category:'FOREX', Symbol:'EURUSD' }, ...]

  // Regroupe par catégorie pour l’UI (plus pratique)
  const grouped = data.reduce<Record<string, string[]>>((acc, a) => {
    (acc[a.Category] ||= []).push(a.Symbol);
    return acc;
  }, {});

  return new Response(JSON.stringify({ data, grouped }), {
    headers: { 'content-type': 'application/json' },
  });
}
