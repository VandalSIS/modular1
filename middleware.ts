import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { site, type Locale } from "@/lib/site";

const LOCALE_COOKIE = "modus_locale";
const PUBLIC_FILE_RX = /\.(.*)$/;

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (site.locales as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const lang of preferred) {
    if (lang.startsWith("ro")) return "ro";
    if (lang.startsWith("ru")) return "ru";
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
