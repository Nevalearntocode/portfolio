import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minhtam.tech";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const pageUrl = locale === "en" ? `${BASE}/about` : `${BASE}/vi/about`;

  return {
    metadataBase: new URL(BASE),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pageUrl,
      languages: { en: `${BASE}/about`, vi: `${BASE}/vi/about` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: pageUrl,
      siteName: "Minh Tâm",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

const STACK = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "PostgreSQL",
  "Drizzle ORM",
  "Vercel",
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0e0e0e] px-6 py-32 flex flex-col items-center">
        <div className="max-w-sm w-full mx-auto flex flex-col gap-10">

          {/* Avatar */}
          <Image
            src="/logo.jpg"
            alt="Minh Tâm"
            width={72}
            height={72}
            className="rounded-full object-cover"
          />

          {/* Identity */}
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-white">Minh Tâm</h1>
            <p className="text-white/50 text-sm">
              {t("role")} &middot; {t("location")}
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#7b39fc] animate-pulse shrink-0" />
            <span className="text-sm text-white/50">{t("availability")}</span>
          </div>

          {/* Bio */}
          <p className="text-white/75 text-base leading-relaxed">{t("bio")}</p>

          {/* Stack */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/30 mb-3">
              {t("stack_label")}
            </p>
            <div className="flex flex-wrap gap-2">
              {STACK.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/50 bg-white/[0.03]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group w-fit"
          >
            {t("cta")}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
}
