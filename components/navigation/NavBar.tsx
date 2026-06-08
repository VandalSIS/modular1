"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import { site } from "@/lib/site";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "../brand/Logo";

interface NavBarProps {
  locale: Locale;
  dict: Dictionary;
}

export function NavBar({ locale, dict }: NavBarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links: { href: string; label: string }[] = [
    { href: "/carcase", label: dict.nav.carcase },
    { href: "/containere", label: dict.nav.containere },
    { href: "/portofoliu", label: dict.nav.portofoliu },
    { href: "/proces", label: dict.nav.proces },
    { href: "/despre", label: dict.nav.despre },
  ];

  const isActive = (href: string) => {
    const full = localizedHref(href, locale);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-out-expo ${
        scrolled || open ? "bg-canvas/90 backdrop-blur-md shadow-[0_1px_0_rgba(15,15,16,0.06)]" : "bg-transparent"
      }`}
    >
      <div className="container-tight flex h-16 items-center justify-between md:h-20">
        <Link
          href={localizedHref("/", locale)}
          className="flex items-center gap-2 text-ink"
          aria-label={`${site.name} — ${dict.nav.home}`}
        >
          <Logo className="h-6 w-auto md:h-7" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={localizedHref(link.href, locale)}
              className={`relative text-sm font-medium uppercase tracking-[0.16em] transition-colors duration-300 hover:text-ochre ${
                isActive(link.href) ? "text-ink" : "text-ink/70"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 mx-auto h-px w-6 bg-ochre"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher current={locale} />
          <Link
            href={localizedHref("/oferta", locale)}
            className="hidden btn-primary md:inline-flex"
          >
            {dict.nav.oferta}
          </Link>
          <button
            type="button"
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-6 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <motion.nav
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-line bg-canvas px-6 pb-8 pt-4"
            >
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizedHref(link.href, locale)}
                      className={`flex items-baseline justify-between border-b border-line py-4 ${
                        isActive(link.href) ? "text-ochre" : "text-ink"
                      }`}
                    >
                      <span className="heading-display text-2xl">{link.label}</span>
                      <span className="text-xs uppercase tracking-[0.18em] text-mist">
                        0{links.indexOf(link) + 1}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={localizedHref("/oferta", locale)}
                className="btn-primary mt-6 w-full"
              >
                {dict.nav.oferta}
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
