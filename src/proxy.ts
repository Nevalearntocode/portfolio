import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// next-intl handles: locale detection, cookie, Accept-Language header,
// redirect bare "/" → "/{defaultLocale}", and redirect un-prefixed
// paths like "/about" → "/en/about"
export const proxy = createMiddleware(routing);

export const config = {
  matcher: [
    // Match all request paths EXCEPT:
    // - api routes
    // - _next/static (static assets)
    // - _next/image (image optimization)
    // - files with extensions (favicon.ico, sitemap.xml, robots.txt, images, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
