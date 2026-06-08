"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

export function Testimonials({ dict }: { dict: Dictionary }) {
  const items = [
    {
      quote: dict.home.testimonial1Quote,
      author: dict.home.testimonial1Author,
      role: dict.home.testimonial1Role,
    },
    {
      quote: dict.home.testimonial2Quote,
      author: dict.home.testimonial2Author,
      role: dict.home.testimonial2Role,
    },
    {
      quote: dict.home.testimonial3Quote,
      author: dict.home.testimonial3Author,
      role: dict.home.testimonial3Role,
    },
  ];
  return (
    <section className="bg-bone/40 py-24 md:py-32">
      <div className="container-tight">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <span className="eyebrow">{dict.home.testimonialsTitle}</span>
          <h2 className="heading-display text-display-xl max-w-[18ch] text-balance">
            {dict.home.testimonialsLead}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, idx) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="flex h-full flex-col justify-between gap-8 bg-canvas p-8"
            >
              <blockquote className="heading-display text-2xl leading-snug text-balance text-pretty">
                <span aria-hidden className="block text-ochre text-3xl leading-none">"</span>
                {t.quote}
              </blockquote>
              <figcaption>
                <p className="text-sm font-medium text-ink">{t.author}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-mist">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
