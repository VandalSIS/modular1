"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

const ContainerConfigurator = lazy(() =>
  import("./ContainerConfigurator").then((mod) => ({ default: mod.ContainerConfigurator })),
);

function Skeleton() {
  return (
    <div className="flex aspect-[16/9] items-center justify-center border border-line bg-bone/50">
      <span className="text-xs uppercase tracking-[0.2em] text-mist">Loading 3D…</span>
    </div>
  );
}

export function ConfiguratorLoader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton />;

  return (
    <Suspense fallback={<Skeleton />}>
      <ContainerConfigurator locale={locale} dict={dict} />
    </Suspense>
  );
}
