"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site, type Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";

export function StickyCTAs({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 320);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const waMessage = encodeURIComponent(
    locale === "ru"
      ? "Здравствуйте! Хочу узнать подробнее о модульных контейнерах Modus."
      : "Bună ziua! Aș dori mai multe detalii despre containerele modulare Modus.",
  );
  const waHref = `https://wa.me/${site.whatsapp}?text=${waMessage}`;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 left-4 z-30 md:hidden"
          >
            <Link
              href={localizedHref("/oferta", locale)}
              className="flex items-center gap-2 bg-ink px-4 py-3 text-xs uppercase tracking-[0.18em] text-canvas shadow-[0_12px_32px_-8px_rgba(15,15,16,0.4)]"
            >
              <span aria-hidden>→</span>
              {dict.nav.oferta}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.5)] transition-transform duration-300 ease-out-expo hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.78.46 3.45 1.27 4.91L2 22l5.36-1.4a9.9 9.9 0 0 0 4.68 1.18h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02A9.85 9.85 0 0 0 12.04 2zm0 18.13a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.18 8.18 0 0 1-1.26-4.32c0-4.53 3.69-8.21 8.22-8.21 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.4 5.81c0 4.53-3.69 8.22-8.21 8.22zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.74-.66-1.23-1.47-1.37-1.72-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.83-.2-.48-.4-.41-.55-.42-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.12.16 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.08.14-1.18-.07-.1-.23-.16-.48-.28z" />
        </svg>
      </a>
    </>
  );
}
