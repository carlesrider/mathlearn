'use client';

import { useRouter } from 'next/navigation';
import GradeSelector from '@/components/GradeSelector';
import OperationSelector from '@/components/OperationSelector';
import DifficultySelector from '@/components/DifficultySelector';
import GameModeCard from '@/components/GameModeCard';
import { texts } from '@/constants/texts';
import { getAllowedGameModes, describeRange } from '@/lib/gameConfig';
import { useGameStore } from '@/context/GameContext';
import { GameMode } from '@/types/game';
import GradientBubble from '@/components/GradientBubble';

export default function SelectionPage() {
  const router = useRouter();
  const {
    grade,
    difficulty,
    operations,
    mode,
    setGrade,
    setDifficulty,
    toggleOperation,
    setMode,
    startRound,
    resetSession
  } = useGameStore();

  const allowModes = grade && difficulty && operations.length > 0;
  const firstOperation = operations[0];
  const recommendedModes = allowModes && firstOperation ? getAllowedGameModes(grade!, firstOperation, difficulty!) : [];

  const handleStart = () => {
    if (!grade || !difficulty || operations.length === 0 || !mode) return;
    resetSession();
    startRound();
    router.push(`/joc/${mode}`);
  };

  const modeList = recommendedModes.length > 0 ? recommendedModes : (['input', 'options', 'timed'] as GameMode[]);

  return (
    <div className="relative overflow-hidden">
      <GradientBubble />
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 pb-14 pt-8 sm:px-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">{texts.home.badge}</p>
          <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">{texts.selection.title}</h1>
          <p className="text-gray-700">{texts.selection.ready}</p>
        </header>

        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-sky-900">{texts.selection.gradeLabel}</h2>
          <p className="text-sm text-gray-700">Ajustem els números segons el curs.</p>
          <div className="mt-4">
            <GradeSelector value={grade} onChange={setGrade} />
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-sky-900">{texts.selection.operationLabel}</h2>
          <p className="text-sm text-gray-700">Pots escollir més d&apos;una operació.</p>
          <div className="mt-4">
            <OperationSelector selected={operations} onToggle={toggleOperation} />
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-sky-900">{texts.selection.difficultyLabel}</h2>
          <p className="text-sm text-gray-700">Canviem rangs de números i complexitat.</p>
          <div className="mt-4">
            <DifficultySelector value={difficulty} onChange={setDifficulty} />
          </div>
          {grade && difficulty && operations.length > 0 && (
            <p className="mt-3 text-sm text-gray-700">
              Rang aproximat: {operations
                .map((op) => `${texts.operations[op]} ${describeRange(grade, op, difficulty)}`)
                .join(' · ')}
            </p>
          )}
        </div>

        <div className="card p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-sky-900">{texts.selection.modesTitle}</h2>
            <span className="text-sm text-gray-700">
              {allowModes ? 'Escull un mode per començar' : "Completa els passos d&apos;abans"}
            </span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {modeList.map((gameMode) => (
              <GameModeCard key={gameMode} mode={gameMode} active={mode === gameMode} onSelect={setMode} />
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              disabled={!allowModes || !mode}
              onClick={handleStart}
              className={`game-button fun-gradient text-white ${!allowModes || !mode ? 'opacity-50' : ''}`}
            >
              {texts.actions.start}
            </button>
            <p className="text-sm text-gray-700">Modes suggerits segons el teu curs i l&apos;operació triada.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
