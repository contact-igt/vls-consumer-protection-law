"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  deadline: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(deadline: string): TimeLeft | null {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** Renders only when given a real, configured deadline. Always derives the
 * remaining time from that fixed timestamp, so it never resets on refresh. */
export function Countdown({ deadline }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => getTimeLeft(deadline));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (!timeLeft) return null;

  const units: Array<[string, number]> = [
    ["Days", timeLeft.days],
    ["Hours", timeLeft.hours],
    ["Minutes", timeLeft.minutes],
    ["Seconds", timeLeft.seconds],
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-4" role="timer" aria-label="Time remaining to register">
      {units.map(([label, value]) => (
        <div key={label} className="w-16 rounded-lg bg-white/10 py-2.5 text-center sm:w-20">
          <span className="block text-xl font-extrabold text-white sm:text-2xl">{String(value).padStart(2, "0")}</span>
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-brand-gray-300">{label}</span>
        </div>
      ))}
    </div>
  );
}
