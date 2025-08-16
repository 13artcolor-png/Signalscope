
import 'server-only';

function parseCSV(csv: string) {
  const lines = csv.trim().split(/\r?\n/);
  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(',');

  return rows
    .map((line) => line.split(','))
    .filter((cols) => cols.length === headers.length)
    .map((cols) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => (obj[h] = cols[i]));
      return obj;
    });
}

export async function GET() {
  const url = process.env.ASSETS_CSV_URL!;
  const res = await fetch(url, {
    // côté serveur = pas de CORS; on peut aussi mettre un petit cache
    next: { revalidate: 60 }, // re-fetch toutes les 60s (ajuste comme tu veux)
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'CSV fetch failed' }), { status: 500 });
  }

  const csv = await res.text();
  const data = parseCSV(csv); // [{ Category: 'FOREX', Symbol: 'EURUSD' }, ...]
  return new Response(JSON.stringify({ data }), {
    headers: { 'content-type': 'application/json' },
  });
}
