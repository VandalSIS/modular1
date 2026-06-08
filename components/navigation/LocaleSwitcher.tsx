"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { site, type Locale } from "@/lib/site";
import { localeMeta } from "@/lib/i18n";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const swapped = useMemo(() => {
    return (target: Locale) => {
      if (!pathname) return `/${target}`;
      const parts = pathname.split("/");
      if (parts.length > 1 && (site.locales as readonly string[]).includes(parts[1])) {
        parts[1] = target;
        return parts.join("/") || `/${target}`;
      }
      return `/${target}${pathname}`;
    };
  }, [pathname]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-1 px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {localeMeta[current].flag}
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-10 mt-2 min-w-[140px] border border-line bg-canvas shadow-lg"
        >
          {site.locales.map((locale) => (
            <Link
              key={locale}
              href={swapped(locale)}
              role="menuitem"
              onClick={() => {
                // Persist the user's explicit choice for one year so that
                // the middleware respects it on subsequent visits.
                document.cookie = `modus_locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
              }}
              className={`flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-bone ${
                locale === current ? "text-ink" : "text-ink/70"
              }`}
            >
              <span>{localeMeta[locale].label}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-mist">
                {localeMeta[locale].flag}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
