"use client";

import { useEffect, useRef } from "react";

const NUM_BOIDS = 60;
const SPEED_LIMIT = 4;
const MIN_DISTANCE = 15; // fixed separation radius
const MARGIN = 50;
const TURN_FACTOR = 0.3;

interface BoidsProps {
  separation?: number;   // avoidFactor      default 0.05
  alignment?: number;    // matchingFactor   default 0.05
  cohesion?: number;     // centeringFactor  default 0.005
  visualRange?: number;  // px radius        default 60
}

export function BoidsCanvas({
  separation = 0.05,
  alignment = 0.05,
  cohesion = 0.005,
  visualRange = 60,
}: BoidsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sepRef = useRef(separation);
  const aliRef = useRef(alignment);
  const cohRef = useRef(cohesion);
  const vrRef  = useRef(visualRange);

  useEffect(() => { sepRef.current = separation; }, [separation]);
  useEffect(() => { aliRef.current = alignment;  }, [alignment]);
  useEffect(() => { cohRef.current = cohesion;   }, [cohesion]);
  useEffect(() => { vrRef.current  = visualRange; }, [visualRange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    interface Boid { x: number; y: number; vx: number; vy: number; }

    const boids: Boid[] = Array.from({ length: NUM_BOIDS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 4 - 2,
    }));

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    });
    ro.observe(canvas);

    // Mouse flee
    const mouse = { x: -9999, y: -9999 };
    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    function update() {
      for (const b of boids) {
        let centerX = 0, centerY = 0;
        let avgVX = 0, avgVY = 0;
        let moveX = 0, moveY = 0;
        let neighbors = 0;

        for (const o of boids) {
          if (o === b) continue;
          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          // Separation — fixed radius, independent of visual range
          if (d < MIN_DISTANCE) {
            moveX += b.x - o.x;
            moveY += b.y - o.y;
          }

          // Cohesion + Alignment — visual range
          if (d < vrRef.current) {
            centerX += o.x;
            centerY += o.y;
            avgVX += o.vx;
            avgVY += o.vy;
            neighbors++;
          }
        }

        if (neighbors > 0) {
          centerX /= neighbors;
          centerY /= neighbors;
          avgVX /= neighbors;
          avgVY /= neighbors;

          b.vx += (centerX - b.x) * cohRef.current;
          b.vy += (centerY - b.y) * cohRef.current;
          b.vx += (avgVX - b.vx) * aliRef.current;
          b.vy += (avgVY - b.vy) * aliRef.current;
        }

        b.vx += moveX * sepRef.current;
        b.vy += moveY * sepRef.current;

        // Mouse flee
        const mdx = b.x - mouse.x;
        const mdy = b.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 80 && md > 0) {
          b.vx += (mdx / md) * 1.5;
          b.vy += (mdy / md) * 1.5;
        }

        // Soft boundary
        if (b.x < MARGIN)     b.vx += TURN_FACTOR;
        if (b.x > W - MARGIN) b.vx -= TURN_FACTOR;
        if (b.y < MARGIN)     b.vy += TURN_FACTOR;
        if (b.y > H - MARGIN) b.vy -= TURN_FACTOR;

        // Speed limit
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed > SPEED_LIMIT) {
          b.vx = (b.vx / speed) * SPEED_LIMIT;
          b.vy = (b.vy / speed) * SPEED_LIMIT;
        }

        b.x += b.vx;
        b.y += b.vy;
      }
    }

    // Swallow silhouette — built once, reused every frame
    const bird = new Path2D();
    bird.moveTo(8, 0);
    bird.bezierCurveTo(5, -0.5, 3, -4, 0, -8);
    bird.bezierCurveTo(-1, -9, -3, -8, -4, -7);
    bird.bezierCurveTo(-5, -5, -4, -3, -4, -2);
    bird.lineTo(-9, -2);
    bird.lineTo(-7, 0);
    bird.lineTo(-9, 2);
    bird.lineTo(-4, 2);
    bird.bezierCurveTo(-4, 3, -5, 5, -4, 7);
    bird.bezierCurveTo(-3, 8, -1, 9, 0, 8);
    bird.bezierCurveTo(3, 4, 5, 0.5, 8, 0);
    bird.closePath();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const b of boids) {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(Math.atan2(b.vy, b.vx));
        ctx.scale(0.8, 0.8);
        ctx.fillStyle = "rgba(140, 90, 255, 0.10)";
        ctx.fill(bird);
        ctx.fillStyle = "rgba(180, 140, 255, 0.38)";
        ctx.fill(bird);
        ctx.restore();
      }
    }

    let raf: number;
    function loop() { update(); draw(); raf = requestAnimationFrame(loop); }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "auto" }}
    />
  );
}
