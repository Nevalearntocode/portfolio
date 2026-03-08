"use client";

import { TiltCard } from "./TiltCard";

export function AvailabilityCard() {
  return (
    <TiltCard className="rounded-2xl border border-black/[0.08] bg-white/60 backdrop-blur-sm px-5 py-4 flex items-center gap-3">
      <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-[#4ade80] shrink-0" />
      <div>
        <p className="text-sm font-semibold text-[#111]">Đang nhận khách hàng mới</p>
        <p className="text-xs text-[#111]/50">Sẵn sàng ngay · Hoàn thiện trong 2–3 tuần</p>
      </div>
    </TiltCard>
  );
}
