import { useEffect, useRef, useState } from "react";

// ⚠️ Flip to true when ready to activate the live countdown
const ACTIVE = false;

const TOTAL = 250;
const START = 100;
const FLOOR = 23;

// Drop schedule: [targetValue, durationMs]
// Fast at first (100→80), then progressively slower, bottoming out at FLOOR
const SCHEDULE: [number, number][] = [
  [80, 5 * 60_000],    // 100→80 in 5 min  (fast)
  [60, 7 * 60_000],    // 80→60  in 7 min  (medium)
  [40, 9 * 60_000],    // 60→40  in 9 min  (slow)
  [FLOOR, 9 * 60_000], // 40→23  in 9 min  (very slow)
];

export interface ScarcityState {
  seats: number;
  total: number;
  pct: number;
  active: boolean;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeIn(t: number) {
  return t * t;
}

function computeSeats(elapsed: number): number {
  let segStart = 0;
  let segFrom = START;

  for (const [segTo, segDuration] of SCHEDULE) {
    const segEnd = segStart + segDuration;
    if (elapsed <= segEnd) {
      const t = easeIn((elapsed - segStart) / segDuration);
      return Math.max(FLOOR, Math.round(lerp(segFrom, segTo, t)));
    }
    segStart = segEnd;
    segFrom = segTo;
  }

  return FLOOR;
}

export function useScarcityCounter(): ScarcityState {
  const [seats, setSeats] = useState(START);
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (!ACTIVE) return;

    const startTime = Date.now();

    function schedule(delay: number) {
      timerRef.current = setTimeout(tick, delay);
    }

    function tick() {
      if (!mountedRef.current) return;

      const elapsed = Date.now() - startTime;

      setActive(true);
      setSeats(computeSeats(elapsed));

      const totalDuration = SCHEDULE.reduce((s, [, d]) => s + d, 0);
      if (elapsed < totalDuration) {
        schedule(8000);
      }
      // else: counter done, no more ticks needed
    }

    schedule(0);

    return () => {
      mountedRef.current = false;
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const pct = Math.round(((TOTAL - seats) / TOTAL) * 100);
  return { seats, total: TOTAL, pct, active };
}
