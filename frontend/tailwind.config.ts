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
        primary: "#8576FF",
        secondary: "#8576FF",
        accent: "#10B981",
        tema: "#8576FF"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '12rem',
          xs: '-1rem',
        },
        screens: {
          xs: '500px',
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1240px',
          '2xl': '1496px',
        },
      }
    },
  },
  plugins: [],
};
export default config;
