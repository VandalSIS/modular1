interface LogoProps {
  className?: string;
  /** When true, renders only the M monogram (favicon-style mark) */
  monogram?: boolean;
}

/**
 * Modus Construct wordmark.
 * Scalable inline SVG that mirrors the printed brand: bold "Modus" with a
 * red dot. Uses currentColor for the wordmark so it adapts to the surrounding
 * text colour (set className text-* on the parent).
 */
export function Logo({ className, monogram = false }: LogoProps) {
  if (monogram) {
    return (
      <svg
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Modus"
      >
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="44"
          fontWeight="800"
          letterSpacing="-2"
          fill="currentColor"
        >
          M
        </text>
        <circle cx="50" cy="48" r="6" fill="#a8202b" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 96"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Modus"
    >
      <text
        x="0"
        y="74"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="92"
        fontWeight="800"
        letterSpacing="-3"
        fill="currentColor"
      >
        Modus
      </text>
      <circle cx="306" cy="76" r="11" fill="#a8202b" />
    </svg>
  );
}
