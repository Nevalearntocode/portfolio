"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { works } from "@/data/works";
import { useMessengerUrl } from "@/hooks/use-mobile";

function GalleryCard({ work, offset }: { work: (typeof works)[0]; offset?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  return (
    <div className={`group cursor-pointer ${offset ? "md:mt-24" : ""}`}>
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-xl glass-card"
        onMouseEnter={() => {
          if (work.video && videoRef.current) {
            setHovering(true);
            videoRef.current.play();
          }
        }}
        onMouseLeave={() => {
          if (work.video && videoRef.current) {
            setHovering(false);
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(24px)" }}
      >
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className={`object-cover transition-all duration-700 ${hovering && work.video ? "opacity-0" : "opacity-80 group-hover:opacity-100 group-hover:scale-105"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {work.video && (
          <video
            ref={videoRef}
            src={work.video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovering ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className={`absolute inset-0 bg-[#7b39fc]/20 flex items-center justify-center transition-opacity duration-500 ${hovering ? "opacity-100" : "opacity-0"}`}>
          <span className="text-white text-5xl">↗</span>
        </div>
      </div>

      <a href={work.url} target="_blank" rel="noopener noreferrer">
        <div className="mt-6 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white">{work.title}</h3>
            <p className="text-[#ccc3d9] text-sm mt-1 font-light">{work.tag}</p>
          </div>
          <span className="text-xs text-[#d0bcff] uppercase tracking-widest border border-[#7b39fc]/20 px-3 py-1 rounded-full">
            {new Date().getFullYear()}
          </span>
        </div>
      </a>
    </div>
  );
}

export function WorksPageContent() {
  const t = useTranslations("worksPage");
  const messengerUrl = useMessengerUrl();

  return (
    <>
      {/* Ambient spotlights */}
      <div className="fixed w-[600px] h-[600px] rounded-full top-[-10%] left-[-10%] z-[-1] blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(123,57,252,0.08) 0%, rgba(123,57,252,0) 70%)" }} />
      <div className="fixed w-[600px] h-[600px] rounded-full bottom-[-20%] right-[-5%] z-[-1] blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(123,57,252,0.08) 0%, rgba(123,57,252,0) 70%)" }} />

      <Navbar />
      <main className="min-h-screen bg-[#0e0e0e] px-6 sm:px-12 pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto">

          {/* Editorial header */}
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-24 md:mb-32 max-w-4xl"
          >
            <h1 className="text-5xl md:text-[72px] font-bold leading-none tracking-tight text-white">
              {t("title")}{" "}
              <span className="font-['Instrument_Serif'] italic font-light text-[#ccc3d9]" style={{ fontStyle: "italic" }}>
                &amp; Archive
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-[#ccc3d9] font-light max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.header>

          {/* Staggered 2-col gallery */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            {works.map((work, i) => (
              <GalleryCard key={work.id} work={work} offset={i % 2 === 1} />
            ))}
          </section>

          {/* CTA */}
          <section className="mt-48 mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{t("cta_heading")}</h2>
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 group"
            >
              <span className="text-lg md:text-xl font-['Instrument_Serif'] italic text-[#ccc3d9] group-hover:text-[#d0bcff] transition-colors" style={{ fontStyle: "italic" }}>
                {t("cta_link")}
              </span>
              <span className="bg-[#7b39fc] text-white p-4 rounded-full group-hover:translate-x-2 transition-transform inline-block">
                →
              </span>
            </a>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
