"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset before reveal (px). Default 16. */
  y?: number;
  as?: keyof Pick<HTMLElementTagNameMap, "div" | "section" | "article" | "header" | "footer" | "li">;
}

/**
 * Scroll-reveal wrapper.
 *
 * Uses an IntersectionObserver via `useInView` for accurate detection that
 * works across Next.js client-side navigations (where `whileInView` can miss
 * elements that are already visible on mount). A short fallback timer also
 * ensures content is shown even if the observer never fires (e.g. reduced
 * motion, prerendered viewport, or ad-blocker quirks).
 */
export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
  const [forceShow, setForceShow] = useState(false);

  // Safety net: after 250ms, if nothing has triggered the observer (e.g. the
  // element was rendered already inside the viewport during a client-side
  // navigation), force the visible state so content never gets stuck hidden.
  useEffect(() => {
    const t = setTimeout(() => setForceShow(true), 250);
    return () => clearTimeout(t);
  }, []);

  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    },
  };

  const MotionComponent = motion[as] as typeof motion.div;
  const isVisible = inView || forceShow || shouldReduceMotion;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
