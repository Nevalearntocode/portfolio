"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { works } from "@/data/works";
import { useMessengerUrl } from "@/hooks/use-mobile";

function TemplateCard({ work, offset }: { work: (typeof works)[0]; offset?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  return (
    <div className={`group cursor-pointer ${offset ? "md:mt-24" : ""}`}>
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/[0.03]"
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
      >
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className={`object-cover transition-opacity duration-700 ${hovering && work.video ? "opacity-0" : "opacity-80 group-hover:opacity-100"}`}
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
        <div className="mt-5 flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold text-white">{work.title}</h3>
            <p className="text-white/40 text-sm mt-0.5">{work.tag}</p>
          </div>
          <span className="text-xs text-[#d0bcff] uppercase tracking-widest border border-[#7b39fc]/20 px-3 py-1 rounded-full shrink-0">
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
      <Navbar />
      <main className="min-h-screen bg-[#0e0e0e] px-6 sm:px-12 pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-24">

          {/* Client Work */}
          <section className="flex flex-col gap-8">
            <p className="text-xs uppercase tracking-widest text-white/30">{t("client_section")}</p>

            {/* Cẩm Giang case study */}
            <motion.a
              href="https://camgiangshop.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group relative grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors"
            >
              {/* Story */}
              <div className="p-10 md:p-14 flex flex-col gap-8 justify-between order-2 md:order-1">
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#7b39fc]">Cẩm Giang Shop</span>
                    <p className="text-white/40 text-sm mt-1">{t("cam_giang_category")}</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">700k+</span>
                    <span className="text-white/50 text-sm">{t("cam_giang_stat")}</span>
                  </div>
                  <p className="text-white/70 text-base leading-relaxed">{t("cam_giang_body")}</p>
                </div>
                <span className="text-sm text-white/40 group-hover:text-white transition-colors flex items-center gap-2 w-fit">
                  camgiangshop.com
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative aspect-[4/3] md:aspect-auto order-1 md:order-2 overflow-hidden">
                <Image
                  src="/about-room/tools/cam-giang-thumb.jpg"
                  alt="Cẩm Giang Shop"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.a>
          </section>

          {/* Templates */}
          <section className="flex flex-col gap-8">
            <div className="flex items-end justify-between">
              <p className="text-xs uppercase tracking-widest text-white/30">{t("templates_section")}</p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24"
            >
              {works.map((work, i) => (
                <motion.div
                  key={work.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
                >
                  <TemplateCard work={work} offset={i % 2 === 1} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* CTA */}
          <section className="mt-16 mb-8 text-center">
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
              <span className="bg-[#7b39fc] text-white px-5 py-2.5 rounded-full text-sm group-hover:translate-x-2 transition-transform shrink-0">
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
