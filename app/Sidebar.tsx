'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/overview', label: 'Aperçu' },
  { href: '/new-trade', label: 'Nouveau trade' },
  { href: '/journal', label: 'Journal' },
  { href: '/calendar', label: 'Calendrier éco' },
  { href: '/retails', label: 'Retails' },
  { href: '/seasonality', label: 'Saisonnalité' },
  { href: '/accounts', label: 'Comptes' },      // 👈 nouveau
  { href: '/settings', label: 'Paramètres' },   // 👈 nouveau (lien visible)
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 p-4 text-sm">
      <div className="font-semibold mb-4">SignalScope</div>
      <nav className="space-y-2">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + '/');
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block px-2 py-1 rounded ${
                active
                  ? 'bg-neutral-200 dark:bg-neutral-800 font-medium'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  ); 
}
 
