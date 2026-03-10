"use client";

import Image from "next/image";
import { useState } from "react";
import type { AboutItem } from "@/types/about-room";

interface CardFrontProps {
  item: AboutItem;
}

export function CardFront({ item }: CardFrontProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="ar-card-face ar-card-front"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={item.cover}
        alt={item.title}
        fill
        sizes="(max-width: 767px) calc(100vw - 32px), 220px"
        style={{
          objectFit: "cover",
          objectPosition: `${item.focalX ?? 50}% ${item.focalY ?? 45}%`,
        }}
        draggable={false}
      />

      {/* Film caption strip */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px 14px 12px",
          background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-ibm-plex-mono, monospace)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            color: "rgba(244, 241, 232, 0.9)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </p>
      </div>
    </div>
  );
}
