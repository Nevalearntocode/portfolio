"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { owner } from "@/data/owner";

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone */}
      <a
        href={`tel:${owner.phone}`}
        title={owner.phone}
        className="w-12 h-12 rounded-full bg-[#25d366] shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-150"
      >
        <Phone className="w-5 h-5 text-white" strokeWidth={2} />
      </a>

      {/* Zalo — white background so blue logo is visible */}
      <a
        href={owner.socials.zalo}
        target="_blank"
        rel="noopener noreferrer"
        title="Zalo"
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-150 border border-[#0068ff]/20"
      >
        <Image src="/zalo.svg" alt="Zalo" width={32} height={11} />
      </a>
    </div>
  );
}
