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
      },
      width: {
        272: "17rem",
        200: "12.3rem",
      },
    },
  },
  plugins: [],
};

