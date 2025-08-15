
import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.FCS_API_KEY!;
  // Remplace l’URL par celle du fournisseur choisi
  const r = await fetch(`https://financialmodelingprep.com/api/v3/economic_calendar?apikey=${key}`);
  const data = await r.json();
  // Nettoie / limite ici si besoin
  return NextResponse.json(data?.slice(0, 100) ?? []);
}
