
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function parseCSV(text: string) {
  const [header, ...rows] = text.trim().split(/\r?\n/);
  const cols = header.split(',').map(c=>c.trim().toLowerCase());
  return rows.map(r => {
    const cells = r.split(',').map(c=>c.trim());
    const obj: any = {};
    cols.forEach((k,i)=>obj[k]=cells[i]);
    return obj;
  });
}

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({error:'No file'}, {status:400});

  const text = await file.text();
  const rows = parseCSV(text);

  // ⚠️ mapping minimal (à ajuster selon ton CSV)
  const normalized = rows.map((r: any) => {
    // essaie de détecter des noms courants
    const symbol = r.symbol || r['sym'] || r['instrument'] || r['ticker'];
    const sideRaw = (r.side || r['type'] || '').toLowerCase();
    const side = sideRaw.includes('buy') || sideRaw.includes('long') ? 'long' : 'short';
    const entry = Number(r.entry || r['open price'] || r['open'] || r['price']);
    const exit  = r.exit || r['close price'] || r['close'] ? Number(r.exit || r['close price'] || r['close']) : null;
    const pnl   = r.pnl || r['profit'] || r['p/l'] ? Number(r.pnl || r['profit'] || r['p/l']) : null;
    const opened_at = r.opened_at || r['open time'] || r['time'] || r['date'];
    const closed_at = r.closed_at || r['close time'] || null;

    return {
      symbol,
      side,
      entry_price: isNaN(entry) ? null : entry,
      exit_price: exit !== null && !isNaN(exit) ? exit : null,
      pnl_eur: pnl !== null && !isNaN(pnl) ? pnl : null,
      opened_at: opened_at ? new Date(opened_at).toISOString() : null,
      closed_at: closed_at ? new Date(closed_at).toISOString() : null,
      notes: null,
    };
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.from('trades').insert(normalized);
  if (error) return NextResponse.json({error: error.message}, {status:500});

  return NextResponse.json({ok:true, inserted: normalized.length});
}
