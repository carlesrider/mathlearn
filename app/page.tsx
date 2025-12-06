'use client';

import Link from 'next/link';
import { texts } from '@/constants/texts';
import { useGameStore } from '@/context/GameContext';
import GradientBubble from '@/components/GradientBubble';

export default function HomePage() {
  const { profileName, setProfileName } = useGameStore();

  return (
    <div className="relative overflow-hidden">
      <GradientBubble />
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-16 pt-8 sm:px-10">
        <div className="flex flex-col gap-6 rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md sm:p-12">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
              {texts.home.badge}
            </p>
            <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
              {texts.home.title}
            </h1>
            <p className="text-lg text-gray-700 sm:text-xl">{texts.home.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {texts.home.highlights.map((item) => (
              <div key={item.title} className="card p-6 text-left">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 text-xl font-bold text-gray-800">{item.title}</h3>
                <p className="mt-1 text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <label className="flex flex-col text-base font-semibold text-gray-800">
              {texts.home.nameLabel}
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder={texts.home.namePlaceholder}
                className="mt-2 w-full rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 text-lg shadow-sm focus:border-sky-400"
              />
            </label>
            <Link
              href="/seleccio"
              className="game-button fun-gradient text-center text-white shadow-lg md:ml-auto"
            >
              {texts.actions.start}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
