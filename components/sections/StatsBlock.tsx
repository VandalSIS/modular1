import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import type { Dictionary } from "@/lib/i18n";

export function StatsBlock({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: dict.home.stat1Value, suffix: dict.home.stat1Suffix, label: dict.home.stat1Label },
    { value: dict.home.stat2Value, suffix: dict.home.stat2Suffix, label: dict.home.stat2Label },
    { value: dict.home.stat3Value, suffix: dict.home.stat3Suffix, label: dict.home.stat3Label },
    { value: dict.home.stat4Value, suffix: dict.home.stat4Suffix, label: dict.home.stat4Label },
  ];
  return (
    <section className="border-y border-line bg-bone/30 py-20">
      <div className="container-tight">
        <Reveal>
          <div className="mb-12 flex flex-col gap-3 md:mb-16">
            <span className="eyebrow">{dict.home.statsTitle}</span>
            <p className="max-w-xl text-base leading-relaxed text-ink/70">{dict.home.statsLead}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.08} as="div" className="flex flex-col gap-3">
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="heading-display text-display-lg leading-none"
              />
              <span className="text-xs uppercase tracking-[0.18em] text-mist">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
