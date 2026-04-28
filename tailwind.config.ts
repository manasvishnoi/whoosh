import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── New Whoosh Design System ────────────────
        // Primary: Vibrant Indigo (the "Whoosh" purple)
        purple: {
          DEFAULT: "#5D3FD3",
          50:  "#F2EEFD",
          100: "#E5DCFB",
          200: "#C9B7F5",
          300: "#A88FEF",
          400: "#8366E4",
          500: "#5D3FD3",
          600: "#4A2FB0",
          700: "#3A248A",
          800: "#2A1B66",
          900: "#1B1245",
        },
        // Secondary: Mint Energy
        emerald: {
          DEFAULT: "#00D395",
          50:  "#E0FAF1",
          100: "#B8F4DD",
          200: "#7FE9C0",
          300: "#3CDDA1",
          400: "#11D397",
          500: "#00D395",
          600: "#00A876",
          700: "#007F58",
          800: "#005A3F",
          900: "#003828",
        },
        // Tertiary: Terracotta — used as a warm accent only
        orange: {
          DEFAULT: "#C45828",
          50:  "#FCEFE7",
          100: "#F9DDC9",
          200: "#F0B58D",
          300: "#E58A52",
          400: "#D46D2F",
          500: "#C45828",
          600: "#9F4520",
          700: "#7A3318",
          800: "#561F0E",
          900: "#3A1408",
        },
        cream: "#FBF8F3",
        // Brand alias — semantic tokens
        whoosh: {
          // Primary brand (purple)
          purple: "#5D3FD3",
          "purple-dark": "#4A2FB0",
          "purple-light": "#F2EEFD",
          // Secondary (mint)
          green: "#00D395",
          "green-dark": "#00A876",
          "green-light": "#E0FAF1",
          // Accent (terracotta)
          orange: "#C45828",
          "orange-dark": "#954500",
          "orange-light": "#FCEFE7",
          // Surfaces
          cream: "#FBF8F3",
          red: "#EF4444",
          dark: "#0F172A",
          "dark-2": "#1E293B",
          muted: "#64748B",
          surface: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        devanagari: ['"Noto Sans Devanagari"', "sans-serif"],
      },
      backgroundImage: {
        "gradient-whoosh":  "linear-gradient(135deg, #5D3FD3 0%, #00D395 100%)",
        "gradient-purple":  "linear-gradient(135deg, #5D3FD3 0%, #4A2FB0 100%)",
        "gradient-mint":    "linear-gradient(135deg, #00D395 0%, #00A876 100%)",
        "gradient-saffron": "linear-gradient(135deg, #D46D2F 0%, #954500 100%)",
        "gradient-hero":    "linear-gradient(160deg, #F2EEFD 0%, #FBF8F3 50%, #E0FAF1 100%)",
        "gradient-dark":    "linear-gradient(135deg, #0F172A 0%, #1E1A4A 100%)",
        "mesh-purple":
          "radial-gradient(at 20% 20%, rgba(93,63,211,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,211,149,0.10) 0px, transparent 45%), radial-gradient(at 80% 80%, rgba(196,88,40,0.08) 0px, transparent 55%)",
      },
      boxShadow: {
        card: "0 2px 16px rgba(15,23,42,0.06)",
        "card-hover": "0 12px 40px rgba(15,23,42,0.10)",
        purple: "0 8px 24px rgba(93,63,211,0.30)",
        "purple-lg": "0 16px 40px rgba(93,63,211,0.35)",
        green: "0 8px 24px rgba(0,211,149,0.25)",
        orange: "0 8px 24px rgba(196,88,40,0.25)",
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)",
        ring: "0 0 0 4px rgba(93,63,211,0.15)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-in": "slideIn 0.4s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        "gradient-x": "gradientX 6s ease infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
      keyframes: {
        fadeUp:  { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideIn: { "0%": { opacity: "0", transform: "translateX(-20px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        float:   { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-8px)" } },
        pulse2:  { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
        gradientX: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        shimmer: { "0%": { "background-position": "-200% 0" }, "100%": { "background-position": "200% 0" } },
      },
    },
  },
  plugins: [],
};

export default config;
