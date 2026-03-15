"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export function BackExit() {
  return (
    <Link href="/" className="ar-back" aria-label="Back to portfolio">
      <ArrowLeft size={18} strokeWidth={1.8} />
      <span className="sr-only">Back to portfolio</span>
    </Link>
  );
}
