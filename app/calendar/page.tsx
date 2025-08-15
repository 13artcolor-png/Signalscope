'use client';

import { useEffect, useState } from 'react';

type EventRow = {
  date?: string;
  time?: string;
  country?: string;
  region?: string;
  event?: string;
  title?: string;
  actual?: string | number;
  consensus?: string | number;
  previous?: string | number;
  impact?: string | number;
  importance?: string | number;
};

export default function CalendarPage() {
  const [rows, setRows] = useState<EventRow[]>([]);

  useEffect(() => {
    // Appelle ton API interne (ou mets des données factices)
    fetch('/api/calendar')
      .then((r) => r.json())
      .then((data) => setRows(Array.isArray(data) ? data : []))
      .catch(() => setRows([]));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Calendrier économique</h1>
      <p className="text-sm text-neutral-600 mb-3">
        Flux d’événements, importance, pays, filtre par paire.
      </p>

      <div className="card p-3">
        {rows.length === 0 && (
          <div className="text-sm text-neutral-500">Aucun événement.</div>
        )}
        {rows.map((e, i) => (
          <div key={i} className="py-2 border-b text-sm flex gap-3">
            <div className="w-28">{e.date || e.time || '-'}</div>
            <div className="w-12">{e.country || e.region || '-'}</div>
            <div className="flex-1">{e.event || e.title || '-'}</div>
            <div className="w-24">{e.actual ?? '-'}</div>
            <div className="w-24">{e.consensus ?? '-'}</div>
            <div className="w-24">{e.previous ?? '-'}</div>
            <div className="w-20 text-right">{e.impact ?? e.importance ?? '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
