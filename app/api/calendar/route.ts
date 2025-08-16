// app/api/calendar/route.ts
export const dynamic = 'force-dynamic'; // <-- empêche le prerender/export
export const revalidate = 0;             // pas de cache statique

export async function GET() {
  // TODO: remplacer plus tard par un vrai fetch vers ton provider
  // Pour le build, on renvoie des données "mock" sûres
  const mock = [
    {
      date: '2025-08-15',
      time: '08:00',
      country: 'EU',
      event: 'CPI (YoY)',
      actual: '2.3%',
      consensus: '2.4%',
      previous: '2.6%',
      impact: 'High'
    },
    {
      date: '2025-08-15',
      time: '14:30',
      country: 'US',
      event: 'Nonfarm Payrolls',
      actual: null,
      consensus: '175k',
      previous: '185k',
      impact: 'High'
    }
  ];

  return Response.json(mock, { status: 200 });
}
