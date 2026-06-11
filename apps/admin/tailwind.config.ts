import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "\"Cormorant Garamond\"", "Georgia", "serif"],
        manrope: ["var(--font-manrope)", "Manrope", "Inter", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "\"Cormorant Garamond\"", "Georgia", "serif"]
      },
      colors: {
        admin: {
          bg: "#0A0A0A",
          surface: "#111111",
          hover: "#151515",
          border: "#1F1F1F",
          primary: "#D6B45F",
          accent: "#D6B45F",
          text: "#FAFAFA",
          muted: "#A1A1AA"
        }
      },
      boxShadow: {}
    }
  },
  plugins: []
};

export default config;
