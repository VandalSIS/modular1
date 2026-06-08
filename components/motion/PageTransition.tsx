"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Subtle page-mount fade. Intentionally does NOT use AnimatePresence with
 * `mode="wait"` — that pattern can deadlock Next.js client navigation when
 * the outgoing page contains heavy Suspense boundaries (e.g. R3F
 * configurator) and the exit animation never completes, leaving the new
 * page invisible until a hard refresh.
 *
 * Keying the motion element on `pathname` is enough: React treats it as a
 * fresh mount on every route change and replays the enter animation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
