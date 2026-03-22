"use client";

import { useEffect, useRef, useState } from "react";

// ─── Segment 1 ────────────────────────────────────────────────────────────────
// Two full serpentine sweeps across the page width.
// Key constraint: the path's y-coordinate only moves FORWARD (downward).
// Upward excursions within an S-curve are ≤ 4% of content height (~half a viewport),
// so the "pre-drawn" portion is always visible in the same viewport as the tip.
// y-range: y(0.08)..y(0.48), scroll range: 0.08..0.48
function buildSegment1(w: number, y: (t: number) => number): string {
  return [
    `M ${-0.05 * w} ${y(0.08)}`,

    // Sweep 1 right — S-wave: x swings across full width, y creeps 0.08→0.18
    // Each arc goes UP then DOWN in x-space; y excursion stays ≤ 4%
    `C ${0.10 * w} ${y(0.04)}, ${0.36 * w} ${y(0.14)}, ${0.60 * w} ${y(0.10)}`,
    `C ${0.82 * w} ${y(0.04)}, ${1.05 * w} ${y(0.14)}, ${1.10 * w} ${y(0.18)}`,

    // Right-edge curl — large round arc descending 0.18→0.32
    `C ${1.20 * w} ${y(0.24)}, ${1.18 * w} ${y(0.30)}, ${1.04 * w} ${y(0.33)}`,

    // Sweep 2 left — S-wave: y moves 0.33→0.38, max upward excursion 3%
    `C ${0.90 * w} ${y(0.36)}, ${0.58 * w} ${y(0.30)}, ${0.36 * w} ${y(0.34)}`,
    `C ${0.18 * w} ${y(0.38)}, ${0.02 * w} ${y(0.32)}, ${-0.10 * w} ${y(0.36)}`,

    // Left-edge curl — large round arc descending 0.36→0.46
    `C ${-0.20 * w} ${y(0.41)}, ${-0.16 * w} ${y(0.47)}, ${0.04 * w} ${y(0.46)}`,

    // Exit sweep right
    `C ${0.22 * w} ${y(0.45)}, ${0.60 * w} ${y(0.50)}, ${0.94 * w} ${y(0.48)}`,
    `C ${1.06 * w} ${y(0.49)}, ${1.14 * w} ${y(0.49)}, ${1.16 * w} ${y(0.48)}`,
  ].join(" ");
}

// ─── Segment 2 ────────────────────────────────────────────────────────────────
// Same serpentine philosophy in the lower page.
// y-range: y(0.58)..y(0.93), scroll range: 0.58..0.93
function buildSegment2(w: number, y: (t: number) => number): string {
  return [
    `M ${-0.06 * w} ${y(0.58)}`,

    // Sweep A right — S-wave, y moves 0.58→0.68
    `C ${0.10 * w} ${y(0.62)}, ${0.40 * w} ${y(0.56)}, ${0.68 * w} ${y(0.62)}`,
    `C ${0.92 * w} ${y(0.68)}, ${1.08 * w} ${y(0.62)}, ${1.10 * w} ${y(0.68)}`,

    // Right-edge curl — descending 0.68→0.82
    `C ${1.16 * w} ${y(0.74)}, ${1.14 * w} ${y(0.80)}, ${1.00 * w} ${y(0.82)}`,

    // Sweep B left — S-wave, y moves 0.82→0.87, max upward 4%
    `C ${0.86 * w} ${y(0.84)}, ${0.56 * w} ${y(0.78)}, ${0.34 * w} ${y(0.83)}`,
    `C ${0.16 * w} ${y(0.88)}, ${-0.02 * w} ${y(0.82)}, ${-0.08 * w} ${y(0.87)}`,

    // Exit sweep right toward footer
    `C ${-0.14 * w} ${y(0.92)}, ${0.28 * w} ${y(0.96)}, ${0.62 * w} ${y(0.93)}`,
    `C ${0.86 * w} ${y(0.91)}, ${1.10 * w} ${y(0.95)}, ${1.14 * w} ${y(0.93)}`,
  ].join(" ");
}

function rangeProgress(scroll: number, max: number, from: number, to: number) {
  return Math.max(0, Math.min(1, (scroll - max * from) / (max * (to - from))));
}

export function WindingLine() {
  const s1Ref = useRef<SVGPathElement>(null);
  const s2Ref = useRef<SVGPathElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0, vh: 0 });
  const [lengths, setLengths] = useState({ s1: 0, s2: 0 });

  // Measure page dimensions on mount + resize
  useEffect(() => {
    function measure() {
      setDims({
        w:  document.documentElement.scrollWidth,
        h:  document.documentElement.scrollHeight,
        vh: window.innerHeight,
      });
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  // Capture path lengths after paths are rendered
  useEffect(() => {
    if (!dims.w) return;
    setLengths({
      s1: s1Ref.current?.getTotalLength() ?? 0,
      s2: s2Ref.current?.getTotalLength() ?? 0,
    });
  }, [dims]);

  // Drive both paths on scroll
  useEffect(() => {
    if (!lengths.s1 || !lengths.s2) return;
    const p1 = s1Ref.current!;
    const p2 = s2Ref.current!;

    p1.style.strokeDasharray  = String(lengths.s1);
    p1.style.strokeDashoffset = String(lengths.s1);
    p2.style.strokeDasharray  = String(lengths.s2);
    p2.style.strokeDashoffset = String(lengths.s2);

    function onScroll() {
      const scroll = window.scrollY;
      const max    = document.documentElement.scrollHeight - window.innerHeight;
      // Segment 1: draws from 1% to 43% scroll
      p1.style.strokeDashoffset = String(lengths.s1 * (1 - rangeProgress(scroll, max, 0.01, 0.43)));
      // Segment 2: draws from 58% to 96% scroll — gap between segments
      p2.style.strokeDashoffset = String(lengths.s2 * (1 - rangeProgress(scroll, max, 0.58, 0.96)));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lengths]);

  if (!dims.w || !dims.h) return null;

  const yOff   = dims.vh;                // hero takes full viewport height
  const yRange = dims.h - dims.vh;
  const y      = (t: number) => yOff + t * yRange;

  const d1 = buildSegment1(dims.w, y);
  const d2 = buildSegment2(dims.w, y);

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none overflow-visible"
      style={{ zIndex: 0 }}
      width={dims.w}
      height={dims.h}
      aria-hidden
    >
      {/* Glow — segment 1 */}
      <path d={d1} fill="none" stroke="var(--brand)" strokeWidth="80"
        strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.06"
        style={{ filter: "blur(28px)" }} />

      {/* Sharp — segment 1 */}
      <path ref={s1Ref} d={d1} fill="none" stroke="var(--brand)"
        strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"
        strokeOpacity="0.50" style={{ willChange: "stroke-dashoffset" }} />

      {/* Glow — segment 2 */}
      <path d={d2} fill="none" stroke="var(--brand)" strokeWidth="80"
        strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.05"
        style={{ filter: "blur(28px)" }} />

      {/* Sharp — segment 2 */}
      <path ref={s2Ref} d={d2} fill="none" stroke="var(--brand)"
        strokeWidth="32" strokeLinecap="round" strokeLinejoin="round"
        strokeOpacity="0.40" style={{ willChange: "stroke-dashoffset" }} />
    </svg>
  );
}
