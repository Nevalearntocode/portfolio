"use client";

import Image from "next/image";
import { TiltCard } from "./TiltCard";

export function HeroCard() {
  return (
    <TiltCard className="rounded-2xl border border-black/[0.08] bg-white/60 backdrop-blur-sm p-8 flex flex-col justify-between min-h-[280px] h-full overflow-hidden relative">
      {/* Accent blob */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#a3b899]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-3 flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a3b899]/20 text-xs font-medium text-[#5a7a55] w-fit">
            Thiết kế Website
          </span>
          <h1 className="text-3xl font-bold text-[#111] leading-tight">
            Xin chào, tôi là Alex.
          </h1>
          <p className="text-sm text-[#111]/60 font-medium">
            Tôi xây dựng website giúp doanh nghiệp địa phương phát triển.
          </p>
          <p className="text-sm text-[#111]/70 leading-relaxed max-w-xs">
            Từ tiệm hoa đến salon, từ tiệm sửa chữa đến cửa hàng bánh — tôi biến doanh nghiệp của bạn thành một website mà khách hàng tin tưởng và ghé thăm mỗi ngày.
          </p>
        </div>

        <div className="shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
            <Image
              src="https://picsum.photos/seed/alex-biz/200/200"
              alt="Alex"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <a
          href="#works"
          onClick={(e) => { e.preventDefault(); document.getElementById("works")?.scrollIntoView({ behavior: "smooth" }); }}
          className="px-4 py-2 rounded-full bg-[#111] text-white text-sm font-medium hover:bg-[#333] transition-colors"
        >
          Xem dự án
        </a>
        <a
          href="mailto:alex@alexbuilds.dev"
          className="px-4 py-2 rounded-full border border-black/10 text-[#111] text-sm font-medium hover:bg-black/5 transition-colors"
        >
          Liên hệ ngay
        </a>
      </div>
    </TiltCard>
  );
}
