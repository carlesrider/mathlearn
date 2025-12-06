export type Operation = 'add' | 'sub' | 'mul' | 'div';
export type Difficulty = 'Fàcil' | 'Mitjà' | 'Difícil';
export type Grade = '1r' | '2n' | '3r' | '4t' | '5è' | '6è';
export type GameMode = 'input' | 'options' | 'timed' | 'quick';

export type Question = {
  id: string;
  text: string;
  operands: number[];
  operation: Operation;
  correctAnswer: number;
  options?: number[];
};

export type SessionState = {
  score: number;
  totalQuestions: number;
  streak: number;
  incorrect: number;
};
