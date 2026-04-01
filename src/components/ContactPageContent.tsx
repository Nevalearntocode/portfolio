"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MessageCircle, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { owner } from "@/data/owner";
import { useMessengerUrl } from "@/hooks/use-mobile";

function ContactRow({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center justify-between py-5 border-b border-white/[0.06]">
      <div className="flex items-center gap-4">
        <span className="text-white/30 shrink-0">{icon}</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase tracking-widest text-white/30">{label}</span>
          <span className="text-white/80 text-sm font-medium">{value}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {href && (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Open link"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors min-w-[52px] text-center"
        >
          {copied ? "✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function ContactPageContent() {
  const t = useTranslations("contactPage");
  const messengerUrl = useMessengerUrl();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-6 py-32">
        <div className="max-w-lg w-full mx-auto flex flex-col gap-10">

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-white/30">
              {t("badge")}
            </span>
            <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
            <p className="text-white/50 text-sm">{t("subtitle")}</p>
          </div>

          <div className="border-t border-white/[0.06]">
            <ContactRow
              icon={<Mail className="w-4 h-4" />}
              label={t("email")}
              value={owner.email}
              href={`mailto:${owner.email}`}
            />
            <ContactRow
              icon={<Phone className="w-4 h-4" />}
              label={t("phone")}
              value={owner.phone}
              href={`tel:${owner.phone}`}
            />
            <ContactRow
              icon={
                <Image
                  src="/zalo.svg"
                  alt="Zalo"
                  width={20}
                  height={7}
                  className="opacity-40"
                />
              }
              label={t("zalo")}
              value={owner.phone}
              href={owner.socials.zalo}
              external
            />
            <ContactRow
              icon={<MessageCircle className="w-4 h-4" />}
              label={t("messenger")}
              value="facebook.com/callme.Neva"
              href={messengerUrl}
              external
            />
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
