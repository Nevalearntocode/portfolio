"use client";

import { useEffect, useRef } from "react";

export function FogLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      target.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    function tick() {
      const el = ref.current;
      if (el) {
        const lerpFactor = 0.18;
        const dx = target.current.x - current.current.x;
        const dy = target.current.y - current.current.y;

        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          current.current.x += dx * lerpFactor;
          current.current.y += dy * lerpFactor;

          el.style.setProperty("--fog-x", `${current.current.x}px`);
          el.style.setProperty("--fog-y", `${current.current.y}px`);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={ref} className="ar-fog" />;
}
