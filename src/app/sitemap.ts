import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://minhtam.dev'

const pages = [
  { path: '',       priority: 1.0, changeFreq: 'monthly' as const },
  { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
  { path: '/works', priority: 0.8, changeFreq: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFreq }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
    alternates: {
      languages: {
        en: `${BASE}${path}`,
        vi: `${BASE}/vi${path}`,
      },
    },
  }))
}
