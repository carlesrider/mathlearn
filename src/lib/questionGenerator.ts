import { Difficulty, GameMode, Grade, Operation, Question } from '@/types/game';

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `q-${Math.random().toString(16).slice(2)}-${Date.now()}`;
}

type BuildConfig = {
  operation: Operation;
  difficulty: Difficulty;
  grade: Grade;
  mode: GameMode;
  range: { min: number; max: number };
  allowRemainder?: boolean;
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeOperation(operation: Operation, range: { min: number; max: number }, allowRemainder = false) {
  let a = randomInt(range.min, range.max);
  let b = randomInt(range.min, range.max);

  if (operation === 'sub' && a < b) {
    [a, b] = [b, a];
  }

  if (operation === 'div') {
    b = Math.max(1, b);
    if (!allowRemainder) {
      const divisor = Math.max(1, randomInt(range.min, range.max));
      const quotient = randomInt(range.min, range.max);
      a = divisor * quotient;
      b = divisor;
    }
  }

  return { a, b };
}

function buildText(a: number, b: number, operation: Operation) {
  const symbolMap: Record<Operation, string> = {
    add: '+',
    sub: '-',
    mul: '×',
    div: '÷'
  };
  return `${a} ${symbolMap[operation]} ${b} = ?`;
}

function computeAnswer(a: number, b: number, operation: Operation) {
  switch (operation) {
    case 'add':
      return a + b;
    case 'sub':
      return a - b;
    case 'mul':
      return a * b;
    case 'div':
      return Math.round(a / b);
    default:
      return 0;
  }
}

function generateOptions(correct: number, range: { min: number; max: number }) {
  const options = new Set<number>([correct]);
  while (options.size < 4) {
    const variance = randomInt(1, 10);
    const sign = Math.random() > 0.5 ? 1 : -1;
    const candidate = Math.max(range.min, correct + sign * variance * randomInt(1, 2));
    options.add(candidate);
  }
  const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
  return shuffled;
}

export function buildQuestion({
  operation,
  difficulty,
  grade,
  mode,
  range,
  allowRemainder
}: BuildConfig): Question {
  const { a, b } = makeOperation(operation, range, allowRemainder);
  const correctAnswer = computeAnswer(a, b, operation);
  const text = buildText(a, b, operation);
  const question: Question = {
    id: createId(),
    text,
    operands: [a, b],
    operation,
    correctAnswer
  };

  if (mode === 'options' || mode === 'timed' || mode === 'quick') {
    question.options = generateOptions(correctAnswer, range);
  }

  return question;
}
