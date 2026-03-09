"use client";

import Image from "next/image";
import type { AboutItem } from "@/types/about-room";

interface CardFrontProps {
  item: AboutItem;
}

export function CardFront({ item }: CardFrontProps) {
  return (
    <div
      className="ar-card-face ar-card-front"
      style={{ position: "absolute", inset: 0 }}
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
    </div>
  );
}
