"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TiltCard } from "./TiltCard";

type WorkItem = {
  id: string;
  businessType: string;
  businessName: string;
  description: string;
  tag: string;
  image: string;
  liveUrl: string;
};

// Map of fixed data that doesn't need localization (images/URLs)
const baseWorks = [
  { id: "1", image: "https://picsum.photos/seed/flower/800/500", liveUrl: "#" },
  { id: "2", image: "https://picsum.photos/seed/salon/800/500", liveUrl: "#" },
  { id: "3", image: "https://picsum.photos/seed/repair/800/500", liveUrl: "#" },
  { id: "4", image: "https://picsum.photos/seed/bakery/800/500", liveUrl: "#" },
  { id: "5", image: "https://picsum.photos/seed/auto/800/500", liveUrl: "#" },
];

function WorkMiniCard({ work, onClick }: { work: WorkItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 w-48 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left group"
    >
      <div className="relative w-full h-24 overflow-hidden">
        <Image
          src={work.image}
          alt={work.businessName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
            {work.tag}
          </span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs font-semibold text-[#111] dark:text-white">{work.businessName}</p>
        <p className="text-[11px] text-[#111]/50 dark:text-white/50 mt-0.5 line-clamp-2 leading-snug">
          {work.description}
        </p>
      </div>
    </button>
  );
}

export function WorksCard() {
  const t = useTranslations("works");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, scrollLeft: 0, moved: false });

  // Merge translation data with base data
  const localizedItems = t.raw("items") as Array<any>;
  const works: WorkItem[] = baseWorks.map(base => {
    const localized = localizedItems.find(item => item.id === base.id);
    return { ...base, ...localized };
  });

  const selected = selectedId ? works.find(w => w.id === selectedId) : null;

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, scrollLeft: el.scrollLeft, moved: false };

    function onMove(ev: MouseEvent) {
      const delta = ev.clientX - drag.current.startX;
      if (Math.abs(delta) > 4) drag.current.moved = true;
      if (el) {
        el.scrollLeft = drag.current.scrollLeft - delta;
      }
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function handleSelect(w: WorkItem) {
    if (drag.current.moved) return;
    setSelectedId(w.id);
  }

  return (
    <>
      <TiltCard
        id="works"
        className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-6 flex flex-col gap-4"
      >
        <div>
          <p className="text-xs font-semibold text-[#111]/40 dark:text-white/40 uppercase tracking-widest mb-1">
            {t("badge")}
          </p>
          <h2 className="text-base font-bold text-[#111] dark:text-white">{t("title")}</h2>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onMouseDown}
        >
          {works.map((w) => (
            <WorkMiniCard key={w.id} work={w} onClick={() => handleSelect(w)} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-[#111]/40 dark:text-white/40">{t("hint")}</p>
          <Link
            href="/works"
            className="text-xs font-medium text-[#a3b899] hover:text-[#7a9470] transition-colors"
          >
            See all →
          </Link>
        </div>
      </TiltCard>

      <Dialog
        open={selectedId !== null}
        onOpenChange={(open) => { if (!open) setSelectedId(null); }}
      >
        <DialogContent className="max-w-2xl bg-white dark:bg-[#1c1c1c] p-0 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          {selected && (
            <>
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.businessName}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="px-2 py-1 rounded-full bg-[#a3b899] text-white text-xs font-semibold">
                    {selected.tag}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#111] dark:text-white">
                    {selected.businessName}
                  </DialogTitle>
                  <p className="text-xs text-[#111]/50 dark:text-white/50 font-medium">{selected.businessType}</p>
                  <DialogDescription className="text-sm text-[#111]/70 dark:text-white/70 leading-relaxed pt-2">
                    {selected.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 flex gap-3">
                  <a
                    href={selected.liveUrl}
                    className="px-5 py-2 rounded-full bg-[#111] text-white text-sm font-medium hover:bg-[#333] transition-colors"
                  >
                    {t("dialog.visit")}
                  </a>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="px-5 py-2 rounded-full border border-black/10 dark:border-white/20 text-[#111] dark:text-white text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    {t("dialog.close")}
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
