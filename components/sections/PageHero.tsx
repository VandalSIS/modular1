"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  alt: string;
}

export function PageHero({ eyebrow, title, lead, image, alt }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 80]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-canvas pt-24 md:pt-32"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          quality={88}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-canvas/40 to-canvas" />
      </motion.div>
      <div className="container-tight flex flex-col gap-6 pb-12 pt-12 md:pb-20 md:pt-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="heading-display text-display-2xl max-w-[16ch] text-balance"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="max-w-xl text-lg leading-relaxed text-ink/70 text-pretty"
        >
          {lead}
        </motion.p>
      </div>
    </section>
  );
}
