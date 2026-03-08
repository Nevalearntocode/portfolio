"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  ShoppingBag,
  Smartphone,
  Search,
  Zap,
  Pencil,
  Star,
  Globe,
} from "lucide-react";
import { TiltCard } from "./TiltCard";

const capabilities = [
  { icon: Calendar,     label: "Đặt lịch hẹn"     },
  { icon: ShoppingBag,  label: "Cửa hàng online"  },
  { icon: Smartphone,   label: "Thân thiện mobile" },
  { icon: Search,       label: "Tối ưu Google"     },
  { icon: Zap,          label: "Tải trang nhanh"   },
  { icon: Pencil,       label: "Dễ cập nhật"       },
  { icon: Star,         label: "Hiển thị đánh giá" },
  { icon: Globe,        label: "Luôn trực tuyến"   },
];

export function SkillsCard() {
  return (
    <TiltCard className="rounded-2xl border border-black/[0.08] bg-white/60 backdrop-blur-sm p-6 flex flex-col gap-4 h-full">
      <div>
        <p className="text-xs font-semibold text-[#111]/40 uppercase tracking-widest mb-1">
          Bạn nhận được gì
        </p>
        <h2 className="text-base font-bold text-[#111]">Có trong mỗi website</h2>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#a3b899]/10 border border-[#a3b899]/20"
          >
            <cap.icon className="w-3.5 h-3.5 text-[#5a7a55] shrink-0" />
            <span className="text-xs font-medium text-[#111]/80 leading-tight">{cap.label}</span>
          </motion.div>
        ))}
      </div>
    </TiltCard>
  );
}
