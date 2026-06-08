"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

export function ProcessTimeline({ dict, dense = false }: { dict: Dictionary; dense?: boolean }) {
  return (
    <section className={`bg-canvas ${dense ? "py-16" : "py-24 md:py-32"}`}>
      <div className="container-tight">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <span className="eyebrow">{dict.proces.eyebrow}</span>
          <h2 className="heading-display text-display-xl max-w-[18ch] text-balance">
            {dict.home.processTitle}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-ink/70">{dict.home.processLead}</p>
        </div>

        <ol className="relative space-y-12 border-l border-line pl-8 md:space-y-16 md:pl-12">
          {dict.proces.steps.map((step, idx) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[34px] top-2 flex h-3 w-3 items-center justify-center md:-left-[50px]">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-ochre/30" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ochre" />
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="heading-display text-2xl md:text-3xl">{step.title}</h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-mist">{step.duration}</span>
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-ink/70">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
