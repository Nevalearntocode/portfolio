"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  t: number;
}

const MAX_POINTS = 12;
const TRAIL_DURATION = 280;
const HEAD_WIDTH = 28;

export function TraceLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const rafRef = useRef<number>(0);
  const needsClear = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      points.current.push({ x: e.clientX, y: e.clientY, t: now });
      if (points.current.length > MAX_POINTS) {
        points.current.shift();
      }
    };

    window.addEventListener("mousemove", onMove);

    function draw() {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;

      const now = performance.now();
      const alive = points.current.filter((p) => now - p.t < TRAIL_DURATION);
      points.current = alive;

      if (alive.length < 2) {
        if (needsClear.current) {
          ctx.clearRect(0, 0, canvas!.width, canvas!.height);
          needsClear.current = false;
        }
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      needsClear.current = true;

      // Compute total path length to cap at 120px
      const capped: Point[] = [];
      let totalLen = 0;
      for (let i = alive.length - 1; i >= 0; i--) {
        if (i === alive.length - 1) {
          capped.unshift(alive[i]);
          continue;
        }
        const dx = alive[i + 1].x - alive[i].x;
        const dy = alive[i + 1].y - alive[i].y;
        totalLen += Math.sqrt(dx * dx + dy * dy);
        if (totalLen > 120) break;
        capped.unshift(alive[i]);
      }

      if (capped.length < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw tapered trail from tail to head
      for (let i = 1; i < capped.length; i++) {
        const t = i / (capped.length - 1); // 0 = tail, 1 = head
        const age = now - capped[i].t;
        const ageFactor = Math.max(0, 1 - age / TRAIL_DURATION);
        const opacity = 0.15 * t * ageFactor;
        const width = HEAD_WIDTH * (t * t);

        ctx.beginPath();
        ctx.moveTo(capped[i - 1].x, capped[i - 1].y);
        ctx.lineTo(capped[i].x, capped[i].y);
        ctx.lineWidth = width;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Head glow bloom
      const head = capped[capped.length - 1];
      const headAge = now - head.t;
      const headFactor = Math.max(0, 1 - headAge / TRAIL_DURATION);
      if (headFactor > 0) {
        const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 24);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.22 * headFactor})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(head.x, head.y, 24, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="ar-trace" />;
}
