import { Difficulty, GameMode, Grade, Operation, Question } from '@/types/game';
import { buildQuestion } from '@/lib/questionGenerator';

type Range = { min: number; max: number };

type GradeRules = {
  operations: Operation[];
  ranges: Record<Operation, Record<Difficulty, Range>>;
  recommendedModes: Record<Difficulty, GameMode[]>;
};

const gradeConfig: Record<Grade, GradeRules> = {
  '1r': {
    operations: ['add', 'sub'],
    ranges: {
      add: {
        'Fàcil': { min: 0, max: 10 },
        Mitjà: { min: 0, max: 20 },
        Difícil: { min: 5, max: 30 }
      },
      sub: {
        'Fàcil': { min: 0, max: 10 },
        Mitjà: { min: 0, max: 20 },
        Difícil: { min: 5, max: 30 }
      },
      mul: {
        'Fàcil': { min: 0, max: 5 },
        Mitjà: { min: 0, max: 5 },
        Difícil: { min: 0, max: 5 }
      },
      div: {
        'Fàcil': { min: 1, max: 5 },
        Mitjà: { min: 1, max: 5 },
        Difícil: { min: 1, max: 5 }
      }
    },
    recommendedModes: {
      'Fàcil': ['options', 'input'],
      Mitjà: ['options', 'input'],
      Difícil: ['timed', 'options']
    }
  },
  '2n': {
    operations: ['add', 'sub'],
    ranges: {
      add: {
        'Fàcil': { min: 0, max: 20 },
        Mitjà: { min: 5, max: 50 },
        Difícil: { min: 10, max: 70 }
      },
      sub: {
        'Fàcil': { min: 0, max: 20 },
        Mitjà: { min: 5, max: 50 },
        Difícil: { min: 10, max: 70 }
      },
      mul: {
        'Fàcil': { min: 0, max: 5 },
        Mitjà: { min: 0, max: 8 },
        Difícil: { min: 0, max: 10 }
      },
      div: {
        'Fàcil': { min: 1, max: 5 },
        Mitjà: { min: 1, max: 10 },
        Difícil: { min: 1, max: 10 }
      }
    },
    recommendedModes: {
      'Fàcil': ['options', 'input'],
      Mitjà: ['options', 'input', 'timed'],
      Difícil: ['timed', 'options']
    }
  },
  '3r': {
    operations: ['add', 'sub', 'mul'],
    ranges: {
      add: {
        'Fàcil': { min: 1, max: 20 },
        Mitjà: { min: 10, max: 50 },
        Difícil: { min: 30, max: 100 }
      },
      sub: {
        'Fàcil': { min: 0, max: 20 },
        Mitjà: { min: 10, max: 50 },
        Difícil: { min: 30, max: 100 }
      },
      mul: {
        'Fàcil': { min: 1, max: 7 },
        Mitjà: { min: 1, max: 10 },
        Difícil: { min: 1, max: 11 }
      },
      div: {
        'Fàcil': { min: 1, max: 10 },
        Mitjà: { min: 1, max: 10 },
        Difícil: { min: 1, max: 10 }
      }
    },
    recommendedModes: {
      'Fàcil': ['options', 'input'],
      Mitjà: ['timed', 'options', 'input'],
      Difícil: ['timed', 'options', 'quick']
    }
  },
  '4t': {
    operations: ['add', 'sub', 'mul', 'div'],
    ranges: {
      add: {
        'Fàcil': { min: 20, max: 150 },
        Mitjà: { min: 50, max: 300 },
        Difícil: { min: 100, max: 500 }
      },
      sub: {
        'Fàcil': { min: 20, max: 150 },
        Mitjà: { min: 50, max: 300 },
        Difícil: { min: 100, max: 500 }
      },
      mul: {
        'Fàcil': { min: 2, max: 12 },
        Mitjà: { min: 2, max: 20 },
        Difícil: { min: 3, max: 30 }
      },
      div: {
        'Fàcil': { min: 2, max: 12 },
        Mitjà: { min: 2, max: 20 },
        Difícil: { min: 3, max: 30 }
      }
    },
    recommendedModes: {
      'Fàcil': ['options', 'input'],
      Mitjà: ['timed', 'options', 'input'],
      Difícil: ['timed', 'quick', 'options']
    }
  },
  '5è': {
    operations: ['add', 'sub', 'mul', 'div'],
    ranges: {
      add: {
        'Fàcil': { min: 50, max: 300 },
        Mitjà: { min: 80, max: 600 },
        Difícil: { min: 150, max: 1000 }
      },
      sub: {
        'Fàcil': { min: 50, max: 300 },
        Mitjà: { min: 80, max: 600 },
        Difícil: { min: 150, max: 1000 }
      },
      mul: {
        'Fàcil': { min: 5, max: 20 },
        Mitjà: { min: 5, max: 40 },
        Difícil: { min: 8, max: 60 }
      },
      div: {
        'Fàcil': { min: 2, max: 15 },
        Mitjà: { min: 5, max: 40 },
        Difícil: { min: 8, max: 60 }
      }
    },
    recommendedModes: {
      'Fàcil': ['options', 'input', 'timed'],
      Mitjà: ['timed', 'quick', 'options'],
      Difícil: ['quick', 'timed', 'options']
    }
  },
  '6è': {
    operations: ['add', 'sub', 'mul', 'div'],
    ranges: {
      add: {
        'Fàcil': { min: 80, max: 500 },
        Mitjà: { min: 100, max: 1000 },
        Difícil: { min: 150, max: 2000 }
      },
      sub: {
        'Fàcil': { min: 80, max: 500 },
        Mitjà: { min: 100, max: 1000 },
        Difícil: { min: 150, max: 2000 }
      },
      mul: {
        'Fàcil': { min: 5, max: 40 },
        Mitjà: { min: 8, max: 80 },
        Difícil: { min: 10, max: 120 }
      },
      div: {
        'Fàcil': { min: 4, max: 40 },
        Mitjà: { min: 8, max: 80 },
        Difícil: { min: 10, max: 120 }
      }
    },
    recommendedModes: {
      'Fàcil': ['options', 'timed', 'input'],
      Mitjà: ['timed', 'quick', 'options'],
      Difícil: ['quick', 'timed', 'options']
    }
  }
};

export function getAllowedGameModes(
  grade: Grade,
  operation: Operation,
  difficulty: Difficulty
): GameMode[] {
  const rules = gradeConfig[grade];
  if (!rules.operations.includes(operation)) return ['input'];
  return rules.recommendedModes[difficulty];
}

export function generateQuestion(
  grade: Grade,
  operations: Operation[],
  difficulty: Difficulty,
  mode: GameMode
): Question {
  const rules = gradeConfig[grade];
  const usableOperations = operations.filter((op) => rules.operations.includes(op));
  const pool = usableOperations.length > 0 ? usableOperations : rules.operations;
  const chosenOperation = pool[Math.floor(Math.random() * pool.length)];
  const range = rules.ranges[chosenOperation][difficulty];
  return buildQuestion({
    mode,
    operation: chosenOperation,
    difficulty,
    grade,
    range,
    allowRemainder: difficulty === 'Difícil'
  });
}

export function describeRange(grade: Grade, operation: Operation, difficulty: Difficulty) {
  const rules = gradeConfig[grade];
  const range = rules.ranges[operation][difficulty];
  return `${range.min}-${range.max}`;
}
