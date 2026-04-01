import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { services } from "@/data/services";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minhtam.tech";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pageUrl =
    locale === "en" ? `${BASE}/services` : `${BASE}/vi/services`;

  const title =
    locale === "vi" ? "Dịch Vụ — Minh Tâm" : "Services — Minh Tâm";
  const description =
    locale === "vi"
      ? "Website theo ngành - thiết kế riêng cho từng loại hình kinh doanh tại An Giang và toàn quốc."
      : "Industry-specific websites built for local businesses - barbershops, restaurants, retail, and more.";

  return {
    metadataBase: new URL(BASE),
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: { en: `${BASE}/services`, vi: `${BASE}/vi/services` },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Minh Tâm",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0e0e0e] px-6 sm:px-12 pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-16">

          {/* Header */}
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-white/30">{t("badge")}</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{t("index_title")}</h1>
            <p className="text-white/50 text-base leading-relaxed">{t("index_subtitle")}</p>
          </div>

          {/* Industry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const copy = locale === "vi" ? service.vi : service.en;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={service.thumbnail}
                      alt={copy.industry}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs uppercase tracking-widest text-[#7b39fc]">
                        {copy.industry}
                      </span>
                      {service.isRealClient && (
                        <span className="text-xs text-white/40 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
                          {t("live_badge")}
                        </span>
                      )}
                    </div>
                    <p className="text-white font-semibold text-sm leading-snug line-clamp-2">
                      {copy.headline}
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-2">
                      <span className="text-xs text-white/30">{service.days} {t("stat_days")}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-xs text-white/30">{service.pageCount} {t("stat_pages")}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
