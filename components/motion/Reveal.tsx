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
 * Robustness over flair: we try the IntersectionObserver path first, but
 * always show the content within a frame or two if observation has not
 * fired (which happens on Next.js client-side navigations and on some
 * mobile browsers where elements rendered in the initial viewport never
 * trigger an `inView` event). This guarantees content is never stuck
 * invisible.
 */
export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.01 });
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    // Run the safety net on the next animation frame: if the observer
    // doesn't pick up the element synchronously (which is the most common
    // failure mode), we still reveal it without a noticeable delay.
    const raf = requestAnimationFrame(() => {
      // Final fallback: always show after 120ms regardless. Cheaper than
      // pinning logic to viewport math that can break on mobile browsers
      // with dynamic toolbars.
      setForceShow(true);
    });
    const safety = setTimeout(() => setForceShow(true), 120);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, []);

  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
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
