"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el) return;
      const clickable = el.closest('a, button, [role="button"], .cursor-pointer, label, select');
      setHovering(!!clickable);
    };

    const tick = () => {
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={outerRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: "transform" }}
    >
      <div
        className={`rounded-full border-2 border-[#7b39fc] transition-all duration-150 ${
          hovering
            ? "w-5 h-5 animate-cursor-hover"
            : "w-7 h-7"
        }`}
        style={hovering ? { animation: "cursor-hover 0.9s ease-in-out infinite" } : {}}
      />
    </div>
  );
}
