"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { awsJourney } from "@/data/aws-journey";

export function LearningHero() {
  const t = useTranslations("learningAws");
  const { course, sessions } = awsJourney;

  const started = new Date(course.startedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-screen-xl mx-auto px-6 sm:px-10 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest">
          {t("badge")}
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          {t("title")}
        </h1>

        <p
          className="font-['Instrument_Serif'] italic text-xl text-[#ccc3d9]"
          style={{ fontStyle: "italic" }}
        >
          {t("subtitle")}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-2">
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 uppercase tracking-widest hover:text-white/60 transition-colors"
          >
            {course.source} ↗
          </a>
          <span className="text-white/10">·</span>
          <span className="text-xs text-white/30">
            {t("started")} {started}
          </span>
          {sessions.length > 0 && (
            <>
              <span className="text-white/10">·</span>
              <span className="text-xs text-white/30">
                {t("sessions_logged", { count: sessions.length })}
              </span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
