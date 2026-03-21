"use client";

import { useEffect, useRef, useCallback } from "react";

const SPACING = 36;
const RADIUS = 160;
const FORCE = 28;
const LERP = 0.07;

type Dot = {
  originX: number;
  originY: number;
  currentX: number;
  currentY: number;
  el: HTMLDivElement;
};

export function DotGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const isActive = useRef(false);

  const buildGrid = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing
    dotsRef.current.forEach((d) => d.el.remove());
    dotsRef.current = [];

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const cols = Math.floor(w / SPACING);
    const rows = Math.floor(h / SPACING);
    const offsetX = (w - cols * SPACING) / 2;
    const offsetY = (h - rows * SPACING) / 2;

    const fragment = document.createDocumentFragment();

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const x = offsetX + c * SPACING;
        const y = offsetY + r * SPACING;

        const el = document.createElement("div");
        el.style.cssText = `
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          will-change: transform;
          left: ${x}px;
          top: ${y}px;
          transform: translate(-50%, -50%);
        `;
        fragment.appendChild(el);

        dotsRef.current.push({
          originX: x,
          originY: y,
          currentX: 0,
          currentY: 0,
          el,
        });
      }
    }

    container.appendChild(fragment);
  }, []);

  const tick = useCallback(() => {
    const { x: mx, y: my } = mouseRef.current;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const relMx = mx - rect.left;
    const relMy = my - rect.top;

    dotsRef.current.forEach((dot) => {
      const dx = relMx - dot.originX;
      const dy = relMy - dot.originY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetX = 0;
      let targetY = 0;

      if (dist < RADIUS && dist > 0) {
        const strength = Math.pow((RADIUS - dist) / RADIUS, 2);
        targetX = (dx / dist) * strength * FORCE;
        targetY = (dy / dist) * strength * FORCE;
      }

      dot.currentX += (targetX - dot.currentX) * LERP;
      dot.currentY += (targetY - dot.currentY) * LERP;

      if (Math.abs(dot.currentX) > 0.05 || Math.abs(dot.currentY) > 0.05) {
        dot.el.style.transform = `translate(calc(-50% + ${dot.currentX}px), calc(-50% + ${dot.currentY}px))`;
      }
    });

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    buildGrid();

    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = () => {
      isActive.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(buildGrid);
    ro.observe(container);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [buildGrid, tick]);

  return (
    <section className="w-full relative overflow-hidden bg-black" style={{ minHeight: "60vh" }}>
      <div ref={containerRef} className="absolute inset-0" />

      {/* Optional: centered label */}
      <div className="relative z-10 flex items-center justify-center h-full min-h-[60vh] pointer-events-none select-none">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-[0.3em]">
          Available · An Giang
        </p>
      </div>
    </section>
  );
}
