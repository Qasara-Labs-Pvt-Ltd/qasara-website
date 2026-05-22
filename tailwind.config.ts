import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#080B14",
          subtle: "#0D1220",
          card: "#111827",
          elevated: "#151B2C",
        },
        ink: {
          DEFAULT: "#F9FAFB",
          muted: "#9CA3AF",
          dim: "#6B7280",
        },
        line: {
          DEFAULT: "#1F2937",
          subtle: "#161D2E",
        },
        brand: {
          blue: "#2563EB",
          teal: "#0D9488",
          purple: "#7C3AED",
          amber: "#F59E0B",
          mint: "#00D4AA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        "tightest-2": "-0.045em",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        "nebula": "nebula 22s ease-in-out infinite",
        "nebula-slow": "nebula 30s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "draw": "draw 1.4s ease-out forwards",
      },
      keyframes: {
        nebula: {
          "0%, 100%": {
            transform: "translate3d(0,0,0) scale(1)",
            opacity: "0.55",
          },
          "50%": {
            transform: "translate3d(2%, -3%, 0) scale(1.08)",
            opacity: "0.75",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        draw: {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
