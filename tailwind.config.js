/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "default-blue": "#1570ef",
        "border-default": "#C6CACD",
        "text-input-default": "#6B7075",
        "text-primary": "#1C1F23",
        "tertiary": "#6B7075",
        "text-secondary": "#41464C",
        "brand-light3": "#2E90FA",
        "secondary":"#888D92",
        "hover-blue": "#1849A9",
        "hover-grey": "#EFF8FF",
        "input-active": "#1C1F23",
        "white": "#fff",
        "pressed-blue": "#53B1FD"
      },
      width: {
        272: "17rem",
        200: "12.3rem",
      },
      screens: {
        xs: "375px",
      },
      boxShadow: {
        'button-shadow': "0px 0px 0px 4px #2E90FA"
      }
     
    },
  },
  plugins: [],
};

