"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset before reveal (px). Default 16. */
  y?: number;
  as?: keyof Pick<HTMLElementTagNameMap, "div" | "section" | "article" | "header" | "footer" | "li">;
}

export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
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

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
