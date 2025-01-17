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
        cblack: "#222831",
        cgray: "#393E46",
        cyellow: "#FFD369",
        cwhite: "#EEEEEE"
      },
      fontFamily: {
        code: ["code"],
        oswald: ["oswald"],
        martel: ["martel"]
      }
    },
  },
  plugins: [],
} satisfies Config;
