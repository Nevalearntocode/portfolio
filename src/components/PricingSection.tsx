"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { useMessengerUrl } from "@/hooks/use-mobile";

type PricingPackage = {
  id: string;
  name: string;
  price: string;
  recommended?: boolean;
  features: string[];
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function PricingSection() {
  const t = useTranslations("pricing");
  const messengerUrl = useMessengerUrl();
  const packages = t.raw("packages") as PricingPackage[];

  return (
    <section className="w-full py-24 px-6 sm:px-10">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("title")}</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: pkg.recommended ? 0 : i === 0 ? 0.08 : 0.08,
              }}
              className={`relative flex flex-col gap-5 rounded-2xl p-6 border transition-all duration-300 ${
                pkg.recommended
                  ? "border-[#a3b899]/50 bg-[#a3b899]/8 md:-mt-4 md:mb-[-4px] hover:border-[#a3b899] hover:shadow-[0_0_32px_rgba(163,184,153,0.12)]"
                  : "border-white/8 bg-white/3 hover:border-white/16"
              }`}
            >
              {pkg.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-3 py-1 rounded-full bg-[#a3b899] text-white whitespace-nowrap">
                  {t("recommended")}
                </span>
              )}

              <div>
                <p className="text-base font-semibold text-white">{pkg.name}</p>
                <p className="text-sm text-white/40 mt-0.5">{pkg.price}</p>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/60">
                    <Check size={13} className="text-[#a3b899] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center text-sm font-medium py-2.5 rounded-xl transition-colors ${
                  pkg.recommended
                    ? "bg-[#a3b899] text-white hover:bg-[#8faa85]"
                    : "bg-white/6 text-white/60 hover:bg-white/10"
                }`}
              >
                {t("cta")}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xs text-white/30 text-center"
        >
          ⓘ All plans require a domain (~£10/yr) and monthly hosting. Included from Growth onwards.
        </motion.p>
      </div>
    </section>
  );
}
