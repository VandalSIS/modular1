"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";

interface CtaBannerProps {
  locale: Locale;
  dict: Dictionary;
  title: string;
  lead: string;
  variant?: "light" | "dark";
}

export function CtaBanner({ locale, dict, title, lead, variant = "dark" }: CtaBannerProps) {
  const dark = variant === "dark";
  return (
    <section className={dark ? "bg-ink text-canvas" : "bg-bone text-ink"}>
      <div className="container-tight grid items-center gap-8 py-20 md:grid-cols-[2fr,1fr] md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          <h2 className="heading-display text-display-xl max-w-[20ch] text-balance">{title}</h2>
          <p className={`max-w-xl text-base leading-relaxed ${dark ? "text-canvas/70" : "text-ink/70"}`}>
            {lead}
          </p>
        </motion.div>
        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <Link
            href={localizedHref("/oferta", locale)}
            className={dark ? "btn bg-canvas text-ink hover:bg-ochre hover:text-canvas" : "btn-primary"}
          >
            {dict.common.quote}
          </Link>
          <Link
            href={localizedHref("/portofoliu", locale)}
            className={
              dark
                ? "btn border border-canvas/40 text-canvas hover:bg-canvas hover:text-ink"
                : "btn-outline"
            }
          >
            {dict.common.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
