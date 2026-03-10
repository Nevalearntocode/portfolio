"use client";

import type { AboutItem, CategoryId } from "@/types/about-room";

interface CardBackProps {
  item: AboutItem;
  categoryId: CategoryId;
}

const REDACTED_LINES = [
  { w: "85%", opacity: 0.18 },
  { w: "72%", opacity: 0.13 },
  { w: "90%", opacity: 0.16 },
  { w: "60%", opacity: 0.11 },
  { w: "78%", opacity: 0.14 },
  { w: "45%", opacity: 0.09 },
];

export function CardBack({ item }: CardBackProps) {
  return (
    <div className="ar-card-face ar-card-back" style={{ position: "absolute", inset: 0 }}>
      <div className="ar-card-title">{item.title}</div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
        {REDACTED_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              height: 11,
              width: line.w,
              borderRadius: 3,
              background: `rgba(244, 241, 232, ${line.opacity})`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          color: "rgba(244, 241, 232, 0.25)",
          textAlign: "center",
          paddingTop: 8,
        }}
      >
        · · LOADING MEMORY · ·
      </div>
    </div>
  );
}
