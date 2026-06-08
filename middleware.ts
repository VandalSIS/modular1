import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { site, type Locale } from "@/lib/site";

const LOCALE_COOKIE = "modus_locale";
const PUBLIC_FILE_RX = /\.(.*)$/;

/**
 * Locale detection.
 *
 * Romanian is the official language of Moldova and the brand's primary
 * audience, so we ALWAYS land on `ro` by default. The `accept-language`
 * header is intentionally ignored on first visit (many devices in MD report
 * `ru` even when the user actually prefers Romanian, which led to the wrong
 * locale being shown). Russian is only served when the visitor has
 * explicitly chosen it via the locale switcher (which sets `LOCALE_COOKIE`).
 */
function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (site.locales as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }
  return site.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/projects/") ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/hero/") ||
    pathname.startsWith("/textures/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
    PUBLIC_FILE_RX.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && (site.locales as readonly string[]).includes(first)) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
