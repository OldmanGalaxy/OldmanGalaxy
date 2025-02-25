import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cblack: "#0a0f1c",
        cgray: "#222831",
        cyellow: "#FFD369",
        cwhite: "#EEEEEE"
      },
      fontFamily: {
        code: ["code", 'sans-serif'],
        oswald: ["oswald", 'sans-serif'],
        martel: ["martel", 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
