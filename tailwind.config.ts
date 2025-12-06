import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#ffea9c",
          DEFAULT: "#f4c14f",
          dark: "#d4a63e"
        }
      }
    }
  },
  plugins: []
};
