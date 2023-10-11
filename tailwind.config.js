/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //background
        bgWhite: "#FFFFFF",
        bgContrast: "#1C1F23",
        bgGreyDark: "#2E3238",
        bgGreyLigth: "#F9F9F9",
        bgBrandDark: "#1570EF",
        bgBrandLight1: "#EFF8FF",
        bgBrandLight2: "#D1E9FF",
        bgBrandLight3: "#2E90FA",
        bgErrorDark: "#FEE4E2",
        bgErrorLight: "#FEF3F2",
        bgSuccessDark: "#D1FADF",
        bgSuccessLight: "#ECFDF3",
        bgWarningDark: "#FEF0C7",
        bgWarningLight: "#FFFAEB",
        bgPressedGrey: "#D1E9FF",
        bgPressedBlue: "#53B1FD",
        bgPressedDestructive: "#F97066",
        bgHover: "#FFFFFF",
        bgHoverGrey: "#EFF8FF",
        bgHoverBlue: "#1849A9",
        bgHoverDestructive: "#912018",
        bgDefaultBlue: "#1570EF",
        bgDefaultDestructive: "#D92D20",
        bgImg: "#F9F9F9",
        bgDisable: "#F9F9F9",

        // icon
        bgIcon: "#C4C4C4", 
        iconWhite: "#fff",
        iconPrimary: "#2E3238",
        iconSecondary: "#888D92",
        iconContrast: "#FFFFFF",
        iconBrand: "#1570EF",
        iconBrandDark: "#1849A9",
        iconError: "#F04438",
        iconSuccess: "#12B76A",
        iconWarning: "#F79009",
        iconDisabled: "#A7ABB0",

        // border
        border: "rgba(0, 0, 0, 0.20)",
        borderDefault: "#C6CACD",
        borderDefaultBlue: "#1570EF",
        borderHover: "#A7ABB0",
        borderHoverBlue: "#1849A9",
        borderPressedBlue: "#53B1FD",
        borderActive: "#175CD3",
        borderError: "#F97066",
        borderSuccess: "#32D583",
        borderDisabled: "#E6E8EA",

        // text
        textPrimary: "#1C1F23",
        textSecondary: "#41464C",
        textTertiary: "#6B7075",
        textContrast: "#FFFFFF",
        textBrand: "#1849A9",
        textInputDefault: "#6B7075",
        textInputActive: "#1C1F23",
        textError: "#D92D20",
        textSuccess: "#039855",
        textWarning: "#F79009",
        textDisabled: "#A7ABB0",

        mainColors: {
          staticBlack: "rgba(0, 0, 0, 1)",
          staticWhite: "rgba(255, 255, 255, 1)",
        },
      },
      spacing: {
        xs4: "2px",
        xs3: "4px",
        xs2: "8px",
        xs: "12px",
        s: "16px",
        sPlus: "20px",
        m: "24px",
        m1: "38px",
        m2: "32px",
        l: "40px",
        xl: "48px",
        xl2: "56px",
        xl3: "64px",
        xl4: "72px",
      },
      letterSpacing: {
        button: "-0.2px",
        textBase: "-0.24px",
      },
      screens: {
        xs: "375px",
      },
      boxShadow: {
        "button-shadow": "0px 0px 0px 4px #2E90FA",
      },
      screens: {
         mobile320: "320px",
        mobile375: "375px",
        mobile480: "480px",
        tablet600: "600px",
        tablet768: "768px",
        tablet1024: "1024px",
        desktop1200: "1200px",
        desktop1440: "1440px",
        desktop1920: "1920px",
      },
      borderRadius: {
        zero: "0px",
        minimal: "4px",
        medium: "8px",
        medium2: "12px",
        medium3: "20px",
        large: "24px",
        large2: "32px",
      },
      dropShadow: {
        focusButton: "0px 0px 4px #2E90FA",
      },
    },
  },
  plugins: [],
};

// 320
// 375
// 480
// 600
// 768
// 1024
// 1200
// 1440
// 1920
