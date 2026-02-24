import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ugt: {
          red: "#C70025",
          dark: "#202124"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
