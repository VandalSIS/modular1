"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <Image
          src="/projects/container-exterior-01.jpg"
          alt="Container modular Modus Construct livrat la cheie"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/70 via-canvas/40 to-canvas" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/50 via-transparent to-transparent" />
      </motion.div>

      <div className="container-tight relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-24 md:pt-40">
        <motion.div style={{ y: textY, opacity }} className="flex flex-col gap-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            {dict.home.heroEyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="heading-display text-display-2xl max-w-[18ch] text-balance"
          >
            <span className="block">{dict.home.heroTitleA}</span>
            <span className="block text-ochre italic">{dict.home.heroTitleB}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="max-w-xl text-lg leading-relaxed text-ink/75 text-pretty"
          >
            {dict.home.heroLead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href={localizedHref("/oferta", locale)} className="btn-primary">
              {dict.home.heroCtaPrimary}
            </Link>
            <Link href={localizedHref("/portofoliu", locale)} className="btn-outline">
              {dict.home.heroCtaSecondary}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 md:flex"
          aria-hidden
        >
          <span className="rotate-90 text-xs uppercase tracking-[0.22em] text-ink/50">scroll</span>
          <span className="h-12 w-px bg-ink/30 animate-sweep" />
        </motion.div>
      </div>
    </section>
  );
}
