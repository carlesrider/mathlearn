'use client';

import { GameMode } from '@/types/game';
import { texts } from '@/constants/texts';

const descriptions: Record<GameMode, string> = {
  input: 'Escriu el resultat a una casella i rep feedback immediat.',
  options: 'Tria la resposta correcta entre 4 opcions sense pressa.',
  timed: 'Quatre opcions amb un compte enrere ràpid i barra de temps.',
  quick: 'Ronda ràpida de 60 segons per encertar el màxim de respostes.'
};

const icons: Record<GameMode, string> = {
  input: '⌨️',
  options: '🟢',
  timed: '⏱️',
  quick: '⚡'
};

interface Props {
  mode: GameMode;
  active: boolean;
  onSelect: (mode: GameMode) => void;
}

export default function GameModeCard({ mode, active, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(mode)}
      className={`card flex flex-col items-start gap-2 px-5 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-xl ${
        active ? 'ring-2 ring-candyPink' : ''
      }`}
    >
      <div className="flex items-center gap-3 text-xl font-bold text-sky-800">
        <span className="text-3xl">{icons[mode]}</span>
        <span>{texts.modes[mode]}</span>
      </div>
      <p className="text-sm text-gray-700">{descriptions[mode]}</p>
    </button>
  );
}
