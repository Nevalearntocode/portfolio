import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { ServicePageContent } from "@/components/ServicePageContent";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minhtam.tech";

export async function generateStaticParams() {
  const locales = ["en", "vi"];
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, industry: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}): Promise<Metadata> {
  const { locale, industry } = await params;
  const service = services.find((s) => s.slug === industry);
  if (!service) return {};

  const copy = locale === "vi" ? service.vi : service.en;
  const pageUrl =
    locale === "en"
      ? `${BASE}/services/${industry}`
      : `${BASE}/vi/services/${industry}`;

  return {
    metadataBase: new URL(BASE),
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${BASE}/services/${industry}`,
        vi: `${BASE}/vi/services/${industry}`,
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: pageUrl,
      siteName: "Minh Tâm",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  const service = services.find((s) => s.slug === industry);
  if (!service) notFound();

  return <ServicePageContent service={service} locale={locale} />;
}
