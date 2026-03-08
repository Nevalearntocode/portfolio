"use client";

import { TiltCard } from "./TiltCard";

export function AboutCard() {
  return (
    <TiltCard id="about" className="rounded-2xl border border-black/[0.08] bg-white/60 backdrop-blur-sm p-6 flex flex-col gap-3 h-full">
      <div>
        <p className="text-xs font-semibold text-[#111]/40 uppercase tracking-widest mb-1">Giới thiệu</p>
        <h2 className="text-base font-bold text-[#111]">Tôi là ai</h2>
      </div>

      <p className="text-sm text-[#111]/70 leading-relaxed">
        Tôi là nhà thiết kế website địa phương. Tôi làm việc với các chủ doanh nghiệp nhỏ — không phải tập đoàn lớn — để xây dựng website gọn gàng, dễ dùng và thực sự thu hút khách hàng.
      </p>
      <p className="text-sm text-[#111]/70 leading-relaxed">
        Không thuật ngữ khó hiểu, không rắc rối. Bạn sẽ luôn biết rõ mình nhận được gì và tại sao.
      </p>

      <div className="mt-auto pt-3 border-t border-black/5 flex items-center gap-2">
        <span className="text-base">🌿</span>
        <span className="text-xs text-[#111]/50">Hoạt động địa phương · Đã hỗ trợ 5+ doanh nghiệp</span>
      </div>
    </TiltCard>
  );
}
