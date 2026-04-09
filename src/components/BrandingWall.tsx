"use client";

import Image from "next/image";
import { works } from "@/data/works";

export function BrandingWall() {
  const [w1, w2, w3, w4] = works;

  return (
    <section className="py-12 px-0 bg-[#0e0e0e] overflow-hidden">
      <div className="grid grid-cols-12 grid-rows-2 gap-2 h-[400px] md:h-[600px]">
        {/* Large left */}
        <div className="col-span-12 md:col-span-7 row-span-1 relative overflow-hidden group">
          <Image
            src={w1.thumbnail}
            alt={w1.title}
            fill
            className="object-cover grayscale opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
            sizes="60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Top right */}
        <div className="col-span-6 md:col-span-5 row-span-1 relative overflow-hidden group">
          <Image
            src={w2.thumbnail}
            alt={w2.title}
            fill
            className="object-cover grayscale opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
            sizes="40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7b39fc]/10 to-transparent" />
        </div>

        {/* Bottom left small */}
        <div className="col-span-6 md:col-span-3 row-span-1 relative overflow-hidden group">
          <Image
            src={w3.thumbnail}
            alt={w3.title}
            fill
            className="object-cover grayscale opacity-25 group-hover:opacity-55 transition-all duration-700"
            sizes="25vw"
          />
        </div>

        {/* Bottom right large */}
        <div className="col-span-12 md:col-span-9 row-span-1 relative overflow-hidden group">
          <Image
            src={w4.thumbnail}
            alt={w4.title}
            fill
            className="object-cover grayscale opacity-50 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-700"
            sizes="75vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <p className="text-3xl md:text-4xl font-serif italic text-white/30 group-hover:text-white/70 transition-colors">
              The Archive
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
