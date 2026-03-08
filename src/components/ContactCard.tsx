"use client";

import { useState } from "react";
import { TiltCard } from "./TiltCard";

const EMAIL = "alex@alexbuilds.dev";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <TiltCard id="contact" className="rounded-2xl border border-black/[0.08] bg-white/60 backdrop-blur-sm px-5 py-4 flex flex-col gap-3">
      <p className="text-xs font-semibold text-[#111]/40 uppercase tracking-widest">Liên hệ</p>
      <button
        onClick={handleCopy}
        className="text-sm text-[#111]/70 hover:text-[#111] transition-colors text-left truncate"
      >
        {copied ? "✓ Đã sao chép!" : EMAIL}
      </button>
      <a
        href={`mailto:${EMAIL}`}
        className="w-full text-center text-sm font-medium py-2 rounded-xl bg-[#a3b899] text-white hover:bg-[#7a9470] transition-colors"
      >
        Gửi tin nhắn →
      </a>
    </TiltCard>
  );
}
