'use client';

import Link from 'next/link';
import { texts } from '@/src/constants/texts';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-white/60 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-3 font-extrabold text-xl text-sky-800">
          <span className="rounded-2xl bg-sunny px-3 py-1 text-lg">🔢</span>
          <span>Mates per a petits</span>
        </Link>
        <div className="ml-auto flex items-center gap-4 text-sm font-semibold text-sky-700">
          <Link
            href="/com-funciona"
            className="rounded-full px-4 py-2 transition hover:bg-skySplash/40"
          >
            {texts.menu.howItWorks}
          </Link>
          {!isHome && (
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-pink-700 transition hover:bg-candyPink/40"
            >
              {texts.menu.home}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
