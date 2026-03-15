// Canonical app page routes (no locale prefix).
// Single source of truth for: sitemap, tests, future proxy validation.
export const PAGES = ["/", "/about", "/works"] as const;
export type AppPage = (typeof PAGES)[number];
