"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import {
  portfolio,
  projectTypes,
  type ProjectType,
  type PortfolioProject,
} from "@/lib/portfolio";
import { Lightbox } from "./Lightbox";

interface PortfolioGridProps {
  locale: Locale;
  dict: Dictionary;
  /** Limit to N projects (used on home featured grid). */
  limit?: number;
  /** Show filters UI. */
  withFilters?: boolean;
}

export function PortfolioGrid({ locale, dict, limit, withFilters = false }: PortfolioGridProps) {
  const [type, setType] = useState<ProjectType | "all">("all");
  const [areaBand, setAreaBand] = useState<"all" | "small" | "medium" | "large">("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [active, setActive] = useState<PortfolioProject | null>(null);

  const filtered = useMemo(() => {
    let items = [...portfolio];
    if (type !== "all") items = items.filter((p) => p.type === type);
    if (areaBand !== "all") {
      items = items.filter((p) => {
        if (areaBand === "small") return p.area <= 15;
        if (areaBand === "medium") return p.area > 15 && p.area <= 30;
        return p.area > 30;
      });
    }
    items.sort((a, b) => (sort === "newest" ? b.year - a.year : a.year - b.year));
    return limit ? items.slice(0, limit) : items;
  }, [type, areaBand, sort, limit]);

  return (
    <section className="bg-canvas py-24 md:py-32">
      <div className="container-tight">
        {!withFilters && (
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">{dict.portofoliu.eyebrow}</span>
              <h2 className="heading-display text-display-xl max-w-[18ch] text-balance">
                {dict.home.portfolioTitle}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-ink/70">
                {dict.home.portfolioLead}
              </p>
            </div>
            <Link
              href={localizedHref("/portofoliu", locale)}
              className="btn-outline self-start md:self-end"
            >
              {dict.common.viewAll}
            </Link>
          </div>
        )}

        {withFilters && (
          <div className="mb-12 flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setType("all")}
                className={chipClass(type === "all")}
                type="button"
              >
                {dict.portofoliu.filterAll}
              </button>
              {projectTypes.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setType(t.slug)}
                  className={chipClass(type === t.slug)}
                  type="button"
                >
                  {t.label[locale]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <select
                className="border border-line bg-canvas px-3 py-2 text-sm uppercase tracking-[0.14em]"
                value={areaBand}
                onChange={(e) =>
                  setAreaBand(e.target.value as "all" | "small" | "medium" | "large")
                }
                aria-label={dict.portofoliu.filterByArea}
              >
                <option value="all">{dict.portofoliu.filterByArea}</option>
                <option value="small">≤ 15 m²</option>
                <option value="medium">16–30 m²</option>
                <option value="large">31+ m²</option>
              </select>
              <select
                className="border border-line bg-canvas px-3 py-2 text-sm uppercase tracking-[0.14em]"
                value={sort}
                onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
                aria-label={dict.portofoliu.sortByYear}
              >
                <option value="newest">{dict.portofoliu.sortByYear} ↓</option>
                <option value="oldest">{dict.portofoliu.sortByYear} ↑</option>
              </select>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-mist">{dict.portofoliu.nothingFound}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, idx) => (
              <motion.button
                key={project.slug}
                type="button"
                onClick={() => setActive(project)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (idx % 6) * 0.05 }}
                className="card group text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={`${project.title[locale]} — ${project.location[locale]}`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="ken-burns object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-5 text-canvas">
                    <p className="text-xs uppercase tracking-[0.18em] opacity-80">
                      {project.location[locale]}
                    </p>
                    <h3 className="mt-1 heading-display text-2xl">{project.title[locale]}</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] opacity-80">
                      <span>
                        {project.area} {dict.common.sqm}
                      </span>
                      <span className="h-3 w-px bg-canvas/40" />
                      <span>{project.duration[locale]}</span>
                      <span className="h-3 w-px bg-canvas/40" />
                      <span>{project.year}</span>
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <Lightbox project={active} locale={locale} dict={dict} onClose={() => setActive(null)} />
    </section>
  );
}

function chipClass(active: boolean) {
  return `border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors duration-200 ${
    active ? "border-ink bg-ink text-canvas" : "border-line text-ink hover:border-ink"
  }`;
}
