import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        canvas: "#fafaf7",
        ink: "#0f0f10",
        mist: "#888880",
        ochre: "#b08442",
        sage: "#6a8260",
        bone: "#efeae0",
        line: "#e3e1d8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        rise: "rise 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        fadeIn: "fadeIn 500ms ease-out both",
        sweep: "sweep 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
