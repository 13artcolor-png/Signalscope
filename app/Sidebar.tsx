'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/overview', label: 'Aperçu' },
  { href: '/new-trade', label: 'Nouveau trade' },
  { href: '/journal', label: 'Journal' },
  { href: '/calendar', label: 'Calendrier éco' },
  { href: '/retails', label: 'Retails' },       // marché / sentiment
  { href: '/seasonality', label: 'Saisonnalité'},
  { href: '/settings', label: 'Paramètres' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 shrink-0 border-r bg-white">
      <div className="p-4 font-bold text-lg">SignalScope</div>
      <nav className="space-y-1 px-2 pb-4">
        {items.map(it => {
          const active = pathname?.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block rounded-lg px-3 py-2 text-sm
                ${active ? 'bg-black text-white' : 'hover:bg-neutral-100'}`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
