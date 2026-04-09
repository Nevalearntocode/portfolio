"use client";

import { useTranslations } from "next-intl";
import { awsJourney } from "@/data/aws-journey";
import { SessionCard } from "./SessionCard";

export function SessionTimeline() {
  const t = useTranslations("learningAws");
  const sessions = [...awsJourney.sessions].reverse();

  if (sessions.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-16 flex flex-col gap-3">
        <p className="text-white font-medium">{t("no_sessions_title")}</p>
        <p className="text-sm text-white/40">{t("no_sessions_body")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 sm:px-10 pb-32">
      <div className="max-w-2xl flex flex-col">
        {sessions.map((session, i) => (
          <SessionCard key={session.day} session={session} index={i} />
        ))}
      </div>
    </div>
  );
}
