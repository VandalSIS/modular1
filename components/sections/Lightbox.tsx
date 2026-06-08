"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import type { PortfolioProject } from "@/lib/portfolio";
import { QuickLeadModal } from "../forms/QuickLeadForm";

interface LightboxProps {
  project: PortfolioProject | null;
  locale: Locale;
  dict: Dictionary;
  onClose: () => void;
}

export function Lightbox({ project, locale, dict, onClose }: LightboxProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [project?.slug]);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (project ? (i + 1) % project.gallery.length : i));
      if (e.key === "ArrowLeft")
        setIndex((i) => (project ? (i - 1 + project.gallery.length) % project.gallery.length : i));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-stretch bg-ink/80 backdrop-blur-sm"
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={onClose}
            aria-label="Close"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 m-auto flex h-[92vh] w-full max-w-6xl flex-col bg-canvas md:flex-row"
          >
            <div className="relative aspect-[4/3] flex-1 overflow-hidden bg-ink md:aspect-auto">
              <Image
                key={project.gallery[index]}
                src={project.gallery[index]}
                alt={`${project.title[locale]} — ${index + 1}`}
                fill
                sizes="(min-width:768px) 60vw, 100vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + project.gallery.length) % project.gallery.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-canvas/90 p-3 transition-colors hover:bg-canvas"
                aria-label={dict.common.previous}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % project.gallery.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-canvas/90 p-3 transition-colors hover:bg-canvas"
                aria-label={dict.common.next}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
                {project.gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1 w-6 transition-colors ${i === index ? "bg-canvas" : "bg-canvas/40"}`}
                  />
                ))}
              </div>
            </div>

            <aside className="flex w-full flex-col gap-6 overflow-y-auto bg-canvas p-6 md:w-96 md:p-10">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center border border-line bg-canvas hover:bg-bone md:right-6 md:top-6"
              >
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <div className="flex flex-col gap-2">
                <span className="eyebrow">{project.location[locale]}</span>
                <h3 className="heading-display text-3xl text-balance">
                  {project.title[locale]}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-ink/70">{project.description[locale]}</p>
              <dl className="grid grid-cols-2 gap-y-4 border-y border-line py-6 text-sm">
                <Stat label={dict.portofoliu.areaLabel} value={`${project.area} m²`} />
                <Stat label={dict.portofoliu.durationLabel} value={project.duration[locale]} />
                <Stat label={dict.portofoliu.yearLabel} value={`${project.year}`} />
              </dl>
              <div className="flex flex-col gap-2">
                <span className="eyebrow">{dict.portofoliu.finishesLabel}</span>
                <ul className="flex flex-col gap-1 text-sm text-ink/70">
                  {project.finishes[locale].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-2 h-px w-2 flex-none bg-ochre" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-4">
                <QuickLeadModal
                  locale={locale}
                  dict={dict}
                  projectContext={project.title[locale]}
                  defaultInterest={mapTypeToInterest(project.type)}
                  triggerClassName="btn-primary w-full justify-center"
                />
              </div>
            </aside>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function mapTypeToInterest(type: PortfolioProject["type"]): string {
  switch (type) {
    case "carcasa":
      return "carcasa";
    case "container":
    case "birou":
      return "container";
    case "casa":
    case "cabana":
      return "casa";
    case "magazin":
      return "birou";
    case "sanitar":
      return "sanitar";
    case "paza":
      return "container";
    default:
      return "altul";
  }
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[10px] uppercase tracking-[0.18em] text-mist">{label}</dt>
      <dd className="text-base text-ink">{value}</dd>
    </div>
  );
}
