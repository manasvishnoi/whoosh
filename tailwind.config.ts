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
        orange: {
          DEFAULT: "#FF8C42",
          50: "#FFF4ED",
          100: "#FFE8D5",
          200: "#FFCBA6",
          300: "#FFA870",
          400: "#FF8C42",
          500: "#FF6B1A",
          600: "#F04E00",
          700: "#C73D00",
          800: "#9E3200",
          900: "#7A2900",
        },
        purple: {
          DEFAULT: "#6B46C1",
          50: "#F5F0FF",
          100: "#EDE0FF",
          200: "#D4BFFF",
          300: "#B794F4",
          400: "#9F7AEA",
          500: "#805AD5",
          600: "#6B46C1",
          700: "#553C9A",
          800: "#44337A",
          900: "#322659",
        },
        cream: "#FAF4E8",
        whoosh: {
          orange: "#FF8C42",
          purple: "#6B46C1",
          cream: "#FAF4E8",
          green: "#10B981",
          red: "#EF4444",
          dark: "#1E293B",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        devanagari: ["Noto Sans Devanagari", "sans-serif"],
      },
      backgroundImage: {
        "gradient-whoosh": "linear-gradient(135deg, #FF8C42 0%, #6B46C1 100%)",
        "gradient-saffron": "linear-gradient(135deg, #FF8C42 0%, #FF6B1A 100%)",
        "gradient-purple": "linear-gradient(135deg, #6B46C1 0%, #553C9A 100%)",
        "gradient-hero": "linear-gradient(135deg, #FAF4E8 0%, #F5F0FF 50%, #FFF4ED 100%)",
      },
      boxShadow: {
        card: "0 2px 16px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.12)",
        orange: "0 4px 20px rgba(255,140,66,0.35)",
        purple: "0 4px 20px rgba(107,70,193,0.35)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-in": "slideIn 0.4s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
