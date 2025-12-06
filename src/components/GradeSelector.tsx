'use client';

import { texts } from '@/constants/texts';
import { Grade } from '@/types/game';

interface Props {
  value: Grade | null;
  onChange: (grade: Grade) => void;
}

export default function GradeSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {texts.grades.map((grade) => (
        <button
          key={grade}
          onClick={() => onChange(grade as Grade)}
          className={`card px-4 py-3 text-lg font-bold text-sky-800 transition hover:-translate-y-0.5 hover:shadow-xl ${
            value === grade ? 'border-2 border-candyPink bg-candyPink/20' : ''
          }`}
        >
          {grade}
        </button>
      ))}
    </div>
  );
}
