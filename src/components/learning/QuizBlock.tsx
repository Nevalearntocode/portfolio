"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { QuizQuestion } from "@/data/aws-journey";

type Props = {
  questions: QuizQuestion[];
};

export function QuizBlock({ questions }: Props) {
  const t = useTranslations("learningAws");
  const [mode, setMode] = useState<"review" | "take">("review");
  const [visitorAnswers, setVisitorAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(qId: string, idx: number) {
    if (submitted) return;
    setVisitorAnswers((prev) => ({ ...prev, [qId]: idx }));
  }

  function handleReset() {
    setVisitorAnswers({});
    setSubmitted(false);
  }

  const correctCount = submitted
    ? questions.filter((q) => visitorAnswers[q.id] === q.correctIndex).length
    : 0;

  return (
    <div className="flex flex-col gap-6 mt-2">
      {/* Mode toggle */}
      <div className="flex items-center gap-1 self-start rounded-full border border-white/10 p-0.5 bg-white/[0.03]">
        {(["review", "take"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              handleReset();
            }}
            className={`px-3 py-1 rounded-full text-xs transition-colors duration-150 ${
              mode === m
                ? "bg-[#7b39fc] text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {m === "review" ? t("quiz_mode_review") : t("quiz_mode_take")}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-8">
        {questions.map((q, qi) => (
          <div key={q.id} className="flex flex-col gap-3">
            <p className="text-sm text-white/80 font-medium">
              {qi + 1}. {q.question}
            </p>

            <div className="flex flex-col gap-2">
              {q.options.map((opt, idx) => {
                const letter = ["A", "B", "C", "D"][idx];
                const isCorrect = idx === q.correctIndex;
                const isUserAnswer = idx === q.userAnswerIndex;
                const isVisitorSelected = visitorAnswers[q.id] === idx;
                const isVisitorCorrect = isVisitorSelected && isCorrect;
                const isVisitorWrong = isVisitorSelected && !isCorrect;

                let optClass =
                  "flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-sm transition-colors";

                if (mode === "review") {
                  if (isCorrect) {
                    optClass += " border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-300";
                  } else if (isUserAnswer) {
                    optClass += " border-[#7b39fc]/40 bg-[#7b39fc]/[0.08] text-[#ccc3d9]";
                  } else {
                    optClass += " border-white/[0.06] text-white/40";
                  }
                } else {
                  if (!submitted) {
                    optClass += isVisitorSelected
                      ? " border-[#7b39fc]/40 bg-[#7b39fc]/[0.08] text-white cursor-pointer"
                      : " border-white/[0.06] text-white/50 hover:border-white/20 hover:text-white/70 cursor-pointer";
                  } else {
                    if (isCorrect) {
                      optClass += " border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-300";
                    } else if (isVisitorWrong) {
                      optClass += " border-red-500/40 bg-red-500/[0.08] text-red-300";
                    } else {
                      optClass += " border-white/[0.06] text-white/30";
                    }
                  }
                }

                return (
                  <div
                    key={idx}
                    className={optClass}
                    onClick={() =>
                      mode === "take" && handleSelect(q.id, idx)
                    }
                  >
                    <span className="shrink-0 font-mono text-xs mt-0.5 opacity-60">
                      {letter}
                    </span>
                    <span>{opt}</span>
                    {mode === "review" && isUserAnswer && !isCorrect && (
                      <span className="ml-auto shrink-0 text-xs text-white/30">
                        {t("quiz_your_answer")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {(mode === "review" || submitted) && (
              <p className="text-xs text-white/40 leading-relaxed pl-1 border-l border-white/10">
                {q.explanation}
              </p>
            )}

            {/* Visitor result badge */}
            {mode === "take" && submitted && (
              <div className="flex items-center gap-2 text-xs">
                {visitorAnswers[q.id] === q.correctIndex ? (
                  <span className="text-emerald-400">{t("quiz_result_correct")}</span>
                ) : (
                  <>
                    <span className="text-red-400">{t("quiz_result_wrong")}</span>
                    <span className="text-white/30">
                      {t("quiz_correct")}: {["A", "B", "C", "D"][q.correctIndex]}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Take mode submit / score */}
      {mode === "take" && (
        <div className="flex items-center gap-4 pt-2">
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(visitorAnswers).length < questions.length}
              className="px-4 py-2 rounded-full bg-[#7b39fc] text-white text-xs font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#6a2fe0] transition-colors"
            >
              {t("quiz_submit")}
            </button>
          ) : (
            <>
              <span className="text-sm text-white/60">
                {t("quiz_score", {
                  correct: correctCount,
                  total: questions.length,
                })}
              </span>
              <button
                onClick={handleReset}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Retry
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
