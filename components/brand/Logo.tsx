interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="2" y="6" width="28" height="20" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 6L16 16L30 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 16V26" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
