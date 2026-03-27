import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        tertiary: {
          DEFAULT: "var(--color-tertiary)",
          foreground: "var(--color-tertiary-foreground)",
        },
        neutral: {
          DEFAULT: "var(--color-neutral)",
          foreground: "var(--color-neutral-foreground)",
          muted: "var(--color-neutral-muted)",
          border: "var(--color-neutral-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        label: ["var(--font-body)", "sans-serif"],
        headline: ["var(--font-headline)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;