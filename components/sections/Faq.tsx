"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

export function Faq({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-canvas py-24 md:py-32">
      <div className="container-tight grid gap-12 lg:grid-cols-[1fr,1.6fr]">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">{dict.home.faqTitle}</span>
          <h2 className="heading-display text-display-xl max-w-[18ch] text-balance">
            {dict.home.faqLead}
          </h2>
        </div>
        <ul className="border-t border-line">
          {dict.home.faq.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <li key={item.q} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg md:text-xl"
                >
                  <span className="font-medium text-ink">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center border border-line text-mist transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-ochre text-ochre" : ""
                    }`}
                    aria-hidden
                  >
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-base leading-relaxed text-ink/70">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
