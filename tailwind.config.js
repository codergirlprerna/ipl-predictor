/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Base background (used as bg-base everywhere) ──
        base: "#0A1628",

        // ── CricOracle brand colors ──
        brand: {
          orange:        "#FF6B2B",
          "orange-dark": "#E55A1C",
          blue:          "#0A1628",
          "blue-mid":    "#0F2040",
          "blue-card":   "#132238",
          accent:        "#00D4FF",
          gold:          "#FFB800",
        },
        surface: {
          DEFAULT: "#0F2040",
          card:    "#132238",
          hover:   "#1A2E50",
          border:  "#1E3A5F",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "oracle-gradient": "linear-gradient(135deg, #0A1628 0%, #0F2040 50%, #0A1628 100%)",
        "orange-glow":     "linear-gradient(135deg, #FF6B2B, #E55A1C)",
        "accent-glow":     "linear-gradient(135deg, #00D4FF, #0099CC)",
        "card-gradient":   "linear-gradient(145deg, #132238, #0F2040)",
      },
      boxShadow: {
        "orange-glow": "0 0 20px rgba(255, 107, 43, 0.3)",
        "blue-glow":   "0 0 20px rgba(0, 212, 255, 0.2)",
        "card":        "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "pulse-orange": "pulseOrange 2s ease-in-out infinite",
        "slide-up":     "slideUp 0.5s ease-out",
        "fade-in":      "fadeIn 0.4s ease-out",
      },
      keyframes: {
        pulseOrange: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255,107,43,0.3)" },
          "50%":      { boxShadow: "0 0 25px rgba(255,107,43,0.6)" },
        },
        slideUp: {
          "0%":   { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)",    opacity: 1 },
        },
        fadeIn: {
          "0%":   { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}