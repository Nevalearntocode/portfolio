import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WorksPageContent } from "@/components/WorksPageContent";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://minhtam.dev'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.works" });
  const pageUrl = locale === 'en' ? `${BASE}/works` : `${BASE}/vi/works`

  return {
    metadataBase: new URL(BASE),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pageUrl,
      languages: { en: `${BASE}/works`, vi: `${BASE}/vi/works` },
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

export default function WorksPage() {
  return <WorksPageContent />;
}
