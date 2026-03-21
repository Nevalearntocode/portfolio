"use client";

import { useEffect, useRef, useState } from "react";

// Generate a winding SVG path that snakes down the full page height
function buildPath(width: number, height: number): string {
  const cx = width / 2;
  const amplitude = width * 0.22;
  const segments = 8;
  const segH = height / segments;
  let d = `M ${cx} 0`;

  for (let i = 0; i < segments; i++) {
    const y1 = (i + 0.5) * segH;
    const y2 = (i + 1) * segH;
    const xDir = i % 2 === 0 ? 1 : -1;
    const cp1x = cx + xDir * amplitude;
    const cp1y = y1 - segH * 0.15;
    const cp2x = cx + xDir * amplitude;
    const cp2y = y1 + segH * 0.15;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cx} ${y2}`;
  }
  return d;
}

export function WindingLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [totalLength, setTotalLength] = useState(0);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  // Measure page dimensions
  useEffect(() => {
    function measure() {
      setDims({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      });
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  // Get total path length after render
  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, [dims]);

  // Drive stroke-dashoffset from scroll
  useEffect(() => {
    if (!totalLength || !pathRef.current) return;
    const path = pathRef.current;

    // Line starts drawing at 30% of hero height
    const startOffset = window.innerHeight * 0.3;

    function onScroll() {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (scrollTop - startOffset) / (maxScroll - startOffset)));
      path.style.strokeDashoffset = String(totalLength * (1 - progress));
    }

    // Set initial dasharray
    path.style.strokeDasharray = String(totalLength);
    path.style.strokeDashoffset = String(totalLength);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [totalLength]);

  if (!dims.width || !dims.height) return null;

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: "difference" }}
      width={dims.width}
      height={dims.height}
      aria-hidden
    >
      <path
        ref={pathRef}
        d={buildPath(dims.width, dims.height)}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        style={{ willChange: "stroke-dashoffset" }}
      />
    </svg>
  );
}
