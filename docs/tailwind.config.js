// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../docs/**/*.mdx"], // my markdown stuff is in ../docs, not /src
  darkMode: ["class", '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
  theme: {
    extend: {
      colors: {
        genie: {
          50: "#e9ebf6",
          100: "#c7ccea",
          200: "#a3abdc",
          300: "#7e89ce",
          400: "#636fc3",
          500: "#4855b8",
          600: "#424dae",
          700: "#3943a2",
          800: "#323996",
          900: "#252680",
        },
        gold: {
          50: "#fcfce9",
          100: "#f7f6c9",
          200: "#f1f2a7",
          300: "#ecec85",
          400: "#e6e76d",
          500: "#e2e256",
          600: "#d3d050",
          700: "#c1ba48",
          800: "#aea342",
          900: "#8f7e37",
        },
      },
    },
  },
  plugins: [],
};
