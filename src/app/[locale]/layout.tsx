import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://minhtam.tech'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const pageUrl = locale === 'en' ? BASE : `${BASE}/vi`

  return {
    metadataBase: new URL(BASE),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pageUrl,
      languages: { en: BASE, vi: `${BASE}/vi` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: pageUrl,
      siteName: 'Minh Tâm',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1366, height: 728 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t("title"),
      description: t("description"),
      images: ['/og-image.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${dmSans.variable} ${dmMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
