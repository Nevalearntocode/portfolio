import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import "./about-room.css";
import { AboutRoom } from "@/components/about-room/AboutRoom";
import data from "@/data/about-room.json";
import type { AboutCategory } from "@/types/about-room";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://minhtam.dev'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const pageUrl = locale === 'en' ? `${BASE}/about` : `${BASE}/vi/about`

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
      siteName: 'Minh Tâm',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function AboutPage() {
  return <AboutRoom categories={data.categories as AboutCategory[]} />;
}
