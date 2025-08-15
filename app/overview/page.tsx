export default function Overview() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Aperçu</h1>
      <p className="text-sm text-neutral-600">Résumé compte, stats, drawdown, alertes, news…</p>
    </div>
  );
}

import TVWidget from './TVWidget';

export default function Overview() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Aperçu</h1>
      <TVWidget />
    </div>
  );
}
