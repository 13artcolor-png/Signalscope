'use client';

import TVWidget from './TVWidget';

export default function OverviewPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Aperçu</h1>
      <p className="text-sm text-neutral-600">
        Résumé compte, stats, drawdown, alertes, news…
      </p>

      {/* Widget TradingView (ou placeholder si non prêt) */}
      <TVWidget />
    </div>
  );
}
