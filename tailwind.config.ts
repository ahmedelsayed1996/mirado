import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "1024px",
        xl: "1450px",
        "2xl": "1350px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "Banner-gradient":
          "linear-gradient(180deg, rgba(1, 1, 1, 0.00) 0%, #010101 91.67%)",
      },
      colors: {
        primary: "#d2b469",
        black: "#000000",
        gray: "#D6DDEB",
        secondColor: "#F8F9FA",
      },
      fontFamily: {
        primary: ["primary", "somar-sans"],
      },
    },
  },
  plugins: [],
};
export default config;
