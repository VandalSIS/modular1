"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";

export function DirectionsBlock({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const directions = [
    {
      id: "carcase",
      label: "01",
      title: dict.home.directionCarcaseTitle,
      lead: dict.home.directionCarcaseLead,
      bullets: dict.home.directionCarcaseBullets,
      href: "/carcase",
      image: "/projects/carcase-frame-02.jpg",
    },
    {
      id: "containere",
      label: "02",
      title: dict.home.directionContainereTitle,
      lead: dict.home.directionContainereLead,
      bullets: dict.home.directionContainereBullets,
      href: "/containere",
      image: "/projects/container-interior-02.jpg",
    },
  ];

  return (
    <section className="bg-canvas py-24 md:py-32">
      <div className="container-tight">
        <div className="mb-16 flex flex-col gap-4 md:mb-20">
          <span className="eyebrow">{dict.home.directionsTitle}</span>
          <h2 className="heading-display text-display-xl max-w-[20ch] text-balance">
            {dict.home.directionsLead}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {directions.map((d, idx) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="group relative flex flex-col overflow-hidden border border-line bg-canvas"
            >
              <Link href={localizedHref(d.href, locale)} className="absolute inset-0 z-10" aria-label={d.title} />

              <div className="relative aspect-[4/3] overflow-hidden bg-bone">
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="ken-burns object-cover"
                />
                <div className="absolute left-4 top-4 z-[1] flex items-center gap-2 bg-canvas/95 px-3 py-1.5 text-xs uppercase tracking-[0.18em]">
                  <span className="text-mist">{d.label}</span>
                  <span className="h-3 w-px bg-line" />
                  <span className="text-ink">{d.title}</span>
                </div>
              </div>

              <div className="flex flex-col gap-6 p-6 md:p-10">
                <h3 className="heading-display text-display-lg">{d.title}</h3>
                <p className="max-w-md text-base leading-relaxed text-ink/70">{d.lead}</p>
                <ul className="flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink/80">
                  {d.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 h-px w-3 flex-none bg-ochre" />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {dict.common.seeProducts}
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
