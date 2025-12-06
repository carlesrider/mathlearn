'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Timer from '@/components/Timer';
import { texts } from '@/constants/texts';
import { useGameStore } from '@/context/GameContext';
import { GameMode, Question } from '@/types/game';

function FeedbackBadge({ correct }: { correct: boolean }) {
  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-bold ${
        correct ? 'bg-minty text-green-800' : 'bg-candyPink text-pink-800'
      }`}
    >
      {correct ? 'Correcte! 😀' : 'Ups! Torna-ho a provar'}
    </span>
  );
}

function Summary({ onBack }: { onBack: () => void }) {
  const { session } = useGameStore();
  const suggestion = session.score >= session.incorrect ? texts.game.suggestionEasy : texts.game.suggestionHard;
  return (
    <div className="card p-6 text-center sm:p-8">
      <h2 className="text-2xl font-extrabold text-sky-900">{texts.game.summaryTitle}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="card bg-minty/40 p-4 text-lg font-bold text-green-800">{texts.game.correct}: {session.score}</div>
        <div className="card bg-candyPink/30 p-4 text-lg font-bold text-pink-800">{texts.game.incorrect}: {session.incorrect}</div>
        <div className="card bg-sunny/40 p-4 text-lg font-bold text-amber-800">Total: {session.totalQuestions}</div>
      </div>
      <p className="mt-4 text-gray-700">{suggestion}</p>
      <button onClick={onBack} className="mt-6 game-button fun-gradient text-white">
        {texts.actions.change}
      </button>
    </div>
  );
}

function QuestionArea({ question, onAnswer, mode }: { question: Question; onAnswer: (correct: boolean) => void; mode: GameMode }) {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const isOptionMode = mode === 'options' || mode === 'timed';
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    setValue('');
    setFeedback(null);
    setTimerKey((prev) => prev + 1);
  }, [question.id]);

  const handleAnswer = (answer: number) => {
    const correct = answer === question.correctAnswer;
    setFeedback(correct);
    onAnswer(correct);
  };

  const handleTimeout = () => {
    setFeedback(false);
    onAnswer(false);
  };

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex gap-2 text-base font-bold text-sky-800">
          <span>{texts.game.question}</span>
          <span className="rounded-full bg-skySplash/40 px-2">{question.operation.toUpperCase()}</span>
        </div>
        {mode === 'timed' && <Timer key={timerKey} seconds={12} onFinish={handleTimeout} running />}
      </div>
      <p className="mt-4 text-center text-4xl font-extrabold text-gray-800 sm:text-5xl">{question.text}</p>

      {isOptionMode ? (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {question.options?.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="game-button bg-white text-sky-900 hover:bg-skySplash/40"
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="number"
            className="w-full max-w-xs rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 text-center text-2xl font-bold shadow-sm"
          />
          <button
            onClick={() => handleAnswer(Number(value))}
            className="game-button fun-gradient text-white"
          >
            Validar
          </button>
        </div>
      )}

      {feedback !== null && (
        <div className="mt-4 flex justify-center">
          <FeedbackBadge correct={feedback} />
        </div>
      )}
    </div>
  );
}

export default function GameModePage() {
  const params = useParams();
  const router = useRouter();
  const mode = params?.mode as GameMode;
  const {
    currentQuestion,
    startRound,
    answerQuestion,
    grade,
    difficulty,
    operations,
    session,
    resetSession
  } = useGameStore();
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (!grade || !difficulty || operations.length === 0) {
      router.push('/seleccio');
      return;
    }
    startRound();
  }, [grade, difficulty, operations, router, startRound]);

  useEffect(() => {
    if (session.totalQuestions >= 10) {
      setShowSummary(true);
    }
  }, [session.totalQuestions]);

  const handleBack = () => {
    resetSession();
    router.push('/seleccio');
  };

  if (!['input', 'options', 'timed', 'quick'].includes(mode)) return notFound();

  if (showSummary) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10 sm:px-10">
        <Summary onBack={handleBack} />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-lg text-gray-700">Carregant pregunta...</div>
    );
  }

  const handleAnswer = (correct: boolean) => answerQuestion(correct);

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 pb-14 pt-8 sm:px-10">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold uppercase text-sky-800">{texts.game.score}</span>
          <span className="text-2xl font-extrabold text-gray-800">
            {session.score}/{session.totalQuestions}
          </span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold uppercase text-sky-800">{texts.game.streak}</span>
          <span className="text-2xl font-extrabold text-gray-800">{session.streak} 🔥</span>
        </div>
        <button onClick={handleBack} className="game-button bg-white text-sky-900 hover:bg-candyPink/30">
          {texts.actions.change}
        </button>
      </div>

      <QuestionArea question={currentQuestion} onAnswer={handleAnswer} mode={mode} />
    </section>
  );
}
