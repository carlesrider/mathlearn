'use client';

import { texts } from '@/src/constants/texts';
import { Operation } from '@/src/types/game';

interface Props {
  selected: Operation[];
  onToggle: (operation: Operation) => void;
}

const icons: Record<Operation, string> = {
  add: '➕',
  sub: '➖',
  mul: '✖️',
  div: '➗'
};

export default function OperationSelector({ selected, onToggle }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Object.entries(texts.operations).map(([key, label]) => {
        const op = key as Operation;
        const active = selected.includes(op);
        return (
          <button
            key={op}
            onClick={() => onToggle(op)}
            className={`card flex flex-col items-center gap-2 px-4 py-4 text-center text-lg font-bold transition hover:-translate-y-0.5 hover:shadow-xl ${
              active ? 'border-2 border-skySplash bg-skySplash/20' : ''
            }`}
          >
            <span className="text-3xl">{icons[op]}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
