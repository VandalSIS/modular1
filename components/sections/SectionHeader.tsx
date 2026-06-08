import { Reveal } from "../motion/Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  size?: "lg" | "xl" | "2xl";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  size = "xl",
  className,
}: SectionHeaderProps) {
  const headingSize =
    size === "2xl" ? "text-display-2xl" : size === "xl" ? "text-display-xl" : "text-display-lg";
  return (
    <div
      className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""} ${
        className ?? ""
      }`}
    >
      {eyebrow && (
        <Reveal delay={0}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={`heading-display ${headingSize} max-w-[18ch] text-balance`}>{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={`max-w-2xl text-base leading-relaxed text-ink/70 ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
