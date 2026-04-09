import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LearningHero } from "@/components/learning/LearningHero";
import { SessionTimeline } from "@/components/learning/SessionTimeline";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minhtam.tech";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.learningAws" });
  const pageUrl =
    locale === "en"
      ? `${BASE}/learning/aws`
      : `${BASE}/vi/learning/aws`;

  return {
    metadataBase: new URL(BASE),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${BASE}/learning/aws`,
        vi: `${BASE}/vi/learning/aws`,
      },
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

export default async function AwsLearningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0e0e0e]">
        <LearningHero />
        <SessionTimeline />
      </main>
      <Footer />
    </>
  );
}
