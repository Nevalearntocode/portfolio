"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { awsJourney } from "@/data/aws-journey";

export function LearningTeaserSection() {
  const t = useTranslations("learningTeaser");
  const { sessions } = awsJourney;
  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

  const formattedDate = lastSession
    ? new Date(lastSession.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section className="relative w-full py-32 px-6 sm:px-10 bg-[#0e0e0e]">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(123, 57, 252, 0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <p className="text-xs font-semibold text-[#ccc3d9]/50 uppercase tracking-widest">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {t("title")}
          </h2>
          <p
            className="font-['Instrument_Serif'] italic text-xl text-[#ccc3d9]"
            style={{ fontStyle: "italic" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12"
        >
          {/* Session stats */}
          <div className="flex flex-col gap-2">
            {lastSession ? (
              <>
                <p className="text-xs text-white/30 uppercase tracking-widest">
                  {t("last_session")}
                </p>
                <p className="text-white font-medium">{lastSession.title}</p>
                <p className="text-xs text-white/30">{formattedDate}</p>
              </>
            ) : (
              <p className="text-sm text-white/40">{t("no_sessions")}</p>
            )}
          </div>

          {sessions.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs text-white/30 uppercase tracking-widest">
                {t("sessions_count", { count: sessions.length })}
              </p>
              <div className="flex gap-1">
                {sessions.map((s) => (
                  <div
                    key={s.day}
                    className="w-2 h-6 rounded-sm bg-[#7b39fc]/50"
                    title={`Day ${s.day}: ${s.title}`}
                  />
                ))}
              </div>
            </div>
          )}

          <Link
            href="/learning/aws"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group sm:ml-auto"
          >
            {t("cta")}
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
