'use client';

import { texts } from '@/constants/texts';
import { Difficulty } from '@/types/game';

interface Props {
  value: Difficulty | null;
  onChange: (difficulty: Difficulty) => void;
}

const gradientMap: Record<Difficulty, string> = {
  'Fàcil': 'from-minty/70 to-white',
  Mitjà: 'from-sunny/70 to-white',
  Difícil: 'from-candyPink/70 to-white'
};

export default function DifficultySelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {texts.difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onChange(difficulty as Difficulty)}
          className={`card bg-gradient-to-br ${gradientMap[difficulty as Difficulty]} px-4 py-5 text-lg font-bold text-gray-800 transition hover:-translate-y-0.5 hover:shadow-xl ${
            value === difficulty ? 'ring-2 ring-candyPink' : ''
          }`}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}
