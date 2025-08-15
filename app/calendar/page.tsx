
export default function Calendar() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Calendrier économique</h1>
      <p className="text-sm text-neutral-600">Flux d’événements, importance, pays, filtre par paire.</p>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';

export default function Calendar() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/calendar').then(r=>r.json()).then(setRows);
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Calendrier économique</h1>
      <div className="card p-3">
        {rows.map((e,i)=>(
          <div key={i} className="py-2 border-b text-sm flex gap-3">
            <div className="w-28">{e.date || e.time || '-'}</div>
            <div className="w-12">{e.country || e.region || '-'}</div>
            <div className="flex-1">{e.event || e.title}</div>
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
