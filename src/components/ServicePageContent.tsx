"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useMessengerUrl } from "@/hooks/use-mobile";
import type { ServiceData } from "@/data/services";

export function ServicePageContent({
  service,
  locale,
}: {
  service: ServiceData;
  locale: string;
}) {
  const t = useTranslations("servicesPage");
  const messengerUrl = useMessengerUrl();
  const copy = locale === "vi" ? service.vi : service.en;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0e0e0e] px-6 sm:px-12 pt-32 pb-24">
        <div className="max-w-screen-md mx-auto flex flex-col gap-20">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs uppercase tracking-widest text-[#7b39fc]">
              {copy.industry}
            </span>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
                {copy.headline}
              </h1>
              <p className="text-3xl sm:text-4xl font-bold text-white/30 leading-snug">
                {copy.subline}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-bold text-white">{service.days}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{t("stat_days")}</span>
              </div>
              <div className="w-px bg-white/10 self-stretch" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-bold text-white">{service.pageCount}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{t("stat_pages")}</span>
              </div>
              <div className="w-px bg-white/10 self-stretch" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-bold text-white">{service.isRealClient ? t("live_label") : t("demo_label")}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{t("stat_demo")}</span>
              </div>
            </div>
          </motion.div>

          {/* Body + Features */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <p className="text-white/70 text-base leading-relaxed">{copy.body}</p>

            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-white/30">{t("features_label")}</p>
              <div className="flex flex-wrap gap-2">
                {copy.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-full border border-white/10 text-sm text-white/60 bg-white/[0.03]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Demo preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p className="text-xs uppercase tracking-widest text-white/30">{t("preview_label")}</p>
            <a
              href={service.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 block"
            >
              <Image
                src={service.thumbnail}
                alt={copy.industry}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-[#7b39fc]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-5xl">↗</span>
              </div>
            </a>
            <a
              href={service.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 w-fit"
            >
              {service.isRealClient ? t("visit_live") : t("view_demo")}
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          {/* CTA */}
          <div className="flex flex-col gap-6 pt-8 border-t border-white/[0.06]">
            <p className="text-2xl sm:text-3xl font-bold text-white">{t("cta_heading")}</p>
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group w-fit"
            >
              <span className="bg-[#7b39fc] text-white px-6 py-3 rounded-full text-sm font-medium group-hover:bg-[#9b59ff] transition-colors">
                {t("cta_button")}
              </span>
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
