"use client";

import { motion } from "framer-motion";
import { useMessengerUrl } from "@/hooks/use-mobile";

export function HeroSection() {
  const messengerUrl = useMessengerUrl();

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Video background */}
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.2] origin-bottom brightness-40"
      />

      {/* Blurred pill behind content */}
      <div className="absolute z-[1] w-[801px] h-[384px] bg-black rounded-full blur-[77.5px] opacity-80 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-5xl sm:text-[76px] leading-[1.1] font-bold text-white tracking-tight mb-4"
        >
          Modern websites.{" "}
          <span className="font-['Instrument_Serif'] italic text-[#d0bcff] not-italic" style={{ fontStyle: "italic" }}>
            Built to convert.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          className="text-lg text-[#ccc3d9] max-w-xl mb-10"
        >
          I design and build fast, beautiful websites for local businesses - from landing pages to full storefronts. Ready in days, not months.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          className="flex items-center gap-5"
        >
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full bg-[#7b39fc] text-white text-sm font-semibold hover:scale-[0.97] transition-transform shadow-lg shadow-[#7b39fc]/20"
          >
            Get Started
          </a>
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Browse Templates
          </a>
        </motion.div>
      </div>
    </section>
  );
}
