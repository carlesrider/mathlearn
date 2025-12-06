'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Difficulty, GameMode, Grade, Operation, Question, SessionState } from '@/src/types/game';
import { generateQuestion } from '@/src/lib/gameConfig';

interface GameStore {
  profileName: string;
  grade: Grade | null;
  operations: Operation[];
  difficulty: Difficulty | null;
  mode: GameMode | null;
  currentQuestion: Question | null;
  session: SessionState;
  setProfileName: (value: string) => void;
  setGrade: (grade: Grade) => void;
  toggleOperation: (operation: Operation) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: GameMode) => void;
  startRound: () => void;
  answerQuestion: (isCorrect: boolean) => void;
  resetSession: () => void;
}

const baseSession: SessionState = {
  score: 0,
  totalQuestions: 0,
  streak: 0,
  incorrect: 0
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      profileName: '',
      grade: null,
      operations: [],
      difficulty: null,
      mode: null,
      currentQuestion: null,
      session: baseSession,
      setProfileName: (value) => set({ profileName: value }),
      setGrade: (grade) => set({ grade }),
      toggleOperation: (operation) => {
        const exists = get().operations.includes(operation);
        const operations = exists
          ? get().operations.filter((op) => op !== operation)
          : [...get().operations, operation];
        set({ operations });
      },
      setDifficulty: (difficulty) => set({ difficulty }),
      setMode: (mode) => set({ mode }),
      startRound: () => {
        const { grade, operations, difficulty, mode } = get();
        if (!grade || !difficulty || !mode || operations.length === 0) return;
        const question = generateQuestion(grade, operations, difficulty, mode);
        set({ currentQuestion: question });
      },
      answerQuestion: (isCorrect) => {
        const session = get().session;
        const updated: SessionState = {
          totalQuestions: session.totalQuestions + 1,
          score: isCorrect ? session.score + 1 : session.score,
          streak: isCorrect ? session.streak + 1 : 0,
          incorrect: isCorrect ? session.incorrect : session.incorrect + 1
        };
        set({ session: updated });
        get().startRound();
      },
      resetSession: () => set({ session: baseSession, currentQuestion: null })
    }),
    {
      name: 'mathlearn-storage'
    }
  )
);

export const GameProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
