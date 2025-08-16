'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>('light');
  const [font, setFont] = useState(100); // 90–120 %

  useEffect(() => {
    const t = (localStorage.getItem('ss_theme') as Theme) || 'light';
    const f = Number(localStorage.getItem('ss_font') || 100);
    setTheme(t);
    setFont(Number.isFinite(f) ? f : 100);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('ss_theme', theme);

    root.style.setProperty('--app-font-scale', `${font}%`);
    localStorage.setItem('ss_font', String(font));
  }, [theme, font]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>

      <div className="card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Thème</div>
            <div className="text-sm text-neutral-500">Clair ou sombre</div>
          </div>
          <div className="flex gap-2">
            <button
              className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setTheme('light')}
            >
              Clair
            </button>
            <button
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setTheme('dark')}
            >
              Sombre
            </button>
          </div>
        </div>

        <div>
          <div className="font-medium mb-1">Taille de police</div>
          <div className="text-sm text-neutral-500 mb-2">
            Ajuste le zoom du texte (90 % à 120 %).
          </div>
          <input
            type="range"
            min={90}
            max={120}
            value={font}
            onChange={(e) => setFont(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-sm text-neutral-500 mt-1">{font}%</div>
        </div>
      </div>
    </div>
  );
}
