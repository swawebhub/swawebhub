import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        master: {
          DEFAULT: "#FFD400",
          50: "#FFFbe0",
          100: "#FFF3b0",
          400: "#FFE14D",
          500: "#FFD400",
          600: "#E6BE00",
        },
        darkgreen: "#1C3F09",
        ink: "#0A0A0A",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "blob": {
          "0%,100%": { borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%" },
          "50%": { borderRadius: "58% 42% 38% 62% / 56% 59% 41% 44%" },
        },
        "gradient-shift": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "blob-float-1": {
          "0%,100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(40px, -40px) scale(1.08)" },
          "50%": { transform: "translate(0, -60px) scale(1)" },
          "75%": { transform: "translate(-40px, -40px) scale(0.94)" },
        },
        "blob-float-2": {
          "0%,100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(-50px, 30px) scale(0.94)" },
          "50%": { transform: "translate(-30px, 60px) scale(1.08)" },
          "75%": { transform: "translate(30px, 30px) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        "slide-in": "slide-in 0.4s ease forwards",
        "float": "float 6s ease-in-out infinite",
        "blob": "blob 14s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "blob-float-1": "blob-float-1 12s ease-in-out infinite",
        "blob-float-2": "blob-float-2 15s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(28,63,9,0.35)",
        card: "0 4px 24px -8px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
