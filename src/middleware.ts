import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { DEFAULT_LOCALE } from "./i18n/config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|vi)/:path*"],
};
