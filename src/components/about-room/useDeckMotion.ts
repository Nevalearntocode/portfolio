"use client";

import { useMemo } from "react";

export interface IdleOffset {
  translateY: number;
  rotateZ: number;
  duration: number; // seconds
  delay: number;    // seconds (negative for phase offset)
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function useIdleOffsets(count: number): IdleOffset[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        translateY: lerp(-6, 6, seededRandom(i * 2)),
        rotateZ: lerp(-1.2, 1.2, seededRandom(i * 2 + 1)),
        duration: lerp(4.8, 7.2, seededRandom(i * 3 + 7)),
        delay: -seededRandom(i * 4 + 5) * 7.2,
      })),
    [count]
  );
}

export const CARD_WIDTH = 220;
