'use client';

import { useEffect, useState } from 'react';

interface Props {
  seconds: number;
  onFinish: () => void;
  running: boolean;
}

export default function Timer({ seconds, onFinish, running }: Props) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!running) return;
    setTimeLeft(seconds);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, running, onFinish]);

  const percent = Math.max(0, (timeLeft / seconds) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm font-bold text-sky-800">
        <span>⏳</span>
        <span>{timeLeft}s</span>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-skySplash/30">
        <div className="h-3 bg-gradient-to-r from-candyPink to-skySplash" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
