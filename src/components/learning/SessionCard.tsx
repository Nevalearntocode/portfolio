"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LearningSession } from "@/data/aws-journey";
import { QuizBlock } from "./QuizBlock";

type Props = {
  session: LearningSession;
  index: number;
};

export function SessionCard({ session, index }: Props) {
  const t = useTranslations("learningAws");

  const formattedDate = new Date(session.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      className="relative flex gap-6 sm:gap-10"
    >
      {/* Day badge + vertical line */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-white/50">
          {String(session.day).padStart(2, "0")}
        </div>
        <div className="w-px flex-1 bg-white/[0.06] min-h-[2rem]" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-1 pt-2">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-bold text-white">{session.title}</h2>
            {session.videoTimestamp && (
              <span className="text-xs text-white/30 font-mono">
                {session.videoTimestamp}
              </span>
            )}
          </div>
          <p className="text-xs text-white/30">{formattedDate}</p>
          <p className="text-sm text-[#ccc3d9]/70 mt-1">{session.summary}</p>
        </div>

        {/* Topics */}
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-white/30">
            {t("topics_label")}
          </p>
          <ul className="flex flex-col gap-1.5">
            {session.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#7b39fc]/50 shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Key takeaways */}
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-white/30">
            {t("takeaways_label")}
          </p>
          <div className="flex flex-col gap-1.5">
            {session.keyTakeaways.map((item, i) => (
              <p key={i} className="text-sm text-white/60 pl-3 border-l border-[#7b39fc]/30">
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Quiz */}
        {session.quiz.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/30">
              {t("quiz_label")}
            </p>
            <QuizBlock questions={session.quiz} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
