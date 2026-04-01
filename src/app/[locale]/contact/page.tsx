import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactPageContent } from "@/components/ContactPageContent";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minhtam.tech";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  const pageUrl = locale === "en" ? `${BASE}/contact` : `${BASE}/vi/contact`;

  return {
    metadataBase: new URL(BASE),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pageUrl,
      languages: { en: `${BASE}/contact`, vi: `${BASE}/vi/contact` },
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

export default function ContactPage() {
  return <ContactPageContent />;
}
