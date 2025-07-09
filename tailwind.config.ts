import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kodchasan)", "sans-serif"],
        body: ["var(--font-kodchasan)", "sans-serif"], // Adicionei esta linha
        heading: ["var(--font-orbitron)", "sans-serif"], // Adicionei esta linha
        kodchasan: ["var(--font-kodchasan)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;