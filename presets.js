// import theme from "universal-components-frontend/presets";
// export default theme;

const theme = {
  safelist: [
    { pattern: /text-+/ },
    { pattern: /bg-+/ },
    { pattern: /border-+/ },
    { pattern: /shadow-+/ },
    { pattern: /w-+/ },
    { pattern: /!bg-+/ },
    { pattern: /outline-+/ },
  ],
  extend: {
    colors: {
      // bg
      bgWhite: '#FFFFFF',
      bgContrast: '#1C1F23',
      bgGreyDark: '#2E3238',
      bgGreyLigth: '#F9F9F9',
      bgBrandDark: '#1570EF',
      bgBrandLight1: '#EFF8FF',
      bgBrandLight2: '#D1E9FF',
      bgBrandLight3: '#2E90FA',
      bgErrorDark: '#FEE4E2',
      bgErrorLight: '#FEF3F2',
      bgSuccessDark: '#D1FADF',
      bgSuccessLight: '#ECFDF3',
      bgWarningDark: '#FEF0C7',
      bgWarningLight: '#FFFAEB',
      bgPressedGrey: '#D1E9FF',
      bgPressedBlue: '#53B1FD',
      bgPressedDestructive: '#F97066',
      bgHover: '#FFFFFF',
      bgHoverGrey: '#FAFDFF',
      bgHoverBlue: '#1849A9',
      bgHoverDestructive: '#912018',
      bgDefaultBlue: '#1570EF',
      bgDefaultDestructive: '#D92D20',
      bgImg: '#F9F9F9',
      bgDisable: '#F9F9F9',

      // icon
      iconWhite: '#fff',
      iconPrimary: '#2E3238',
      iconSecondary: '#888D92',
      iconTertiary: '#E6E8EA',
      iconContrast: '#FFFFFF',
      iconBrand: '#1570EF',
      iconBrandDark: '#1849A9',
      iconError: '#F04438',
      iconSuccess: '#12B76A',
      iconWarning: '#F79009',
      iconDisabled: '#A7ABB0',

      // text
      textDisabled: '#A7ABB0',
      textBrand: '#1849A9',
      textTertiary: '#6B7075',
      textSecondary: '#41464C',
      textPrimary: '#1C1F23',
      textInputDefault: '#6B7075',
      textContrast: '#FFFFFF',
      textInputActive: '#1C1F23',
      textWarning: '#F79009',
      textError: '#D92D20',
      textSuccess: '#039855',

      // border
      borderDefault: '#C6CACD',
      borderDefault50: '#E6E8EA',
      borderHover: '#A7ABB0',
      borderDefaultBlue: '#1570EF',
      borderHoverBlue: '#1849A9',
      borderPressedBlue: '#53B1FD',
      borderActive: '#175CD3',
      borderError: '#F97066',
      borderSuccess: '#32D583',
      borderDisabled: '#E6E8EA',

      // static
      staticBlack: '#000000',
      staticWhite: '#FFFFFF',

      // brand (color primitives)
      brand: {
        25: '#FAFDFF',
        50: '#EFF8FF',
        100: '#D1E9FF',
        200: '#B2DDFF',
        300: '#84CAFF',
        400: '#53B1FD',
        500: '#2E90FA',
        600: '#1570EF',
        700: '#175CD3',
        800: '#1849A9',
        900: '#194185',
      },

      // gray (color primitives)
      gray: {
        white: '#FFFFFF',
        50: '#F9F9F9',
        100: '#E6E8EA',
        200: '#C6CACD',
        300: '#A7ABB0',
        400: '#888D92',
        500: '#6B7075',
        600: '#555B61',
        700: '#41464C',
        800: '#2E3238',
        900: '#1C1F23',
        black: '#000000',
      },

      // yellow (color primitives)
      yellow: {
        50: '#FFFAEB',
        100: '#FEF0C7',
        200: '#FEDF89',
        300: '#FEC84B',
        400: '#FDB022',
        500: '#F79009',
        600: '#DC6803',
        700: '#B54708',
        800: '#93370D',
        900: '#792E0D',
      },

      // green (color primitives)
      green: {
        50: '#ECFDF3',
        100: '#D1FADF',
        200: '#A6F4C5',
        300: '#6CE9A6',
        400: '#32D583',
        500: '#12B76A',
        600: '#039855',
        700: '#027A48',
        800: '#05603A',
        900: '#054F31',
      },

      // red (color primitives)
      red: {
        50: '#FEF3F2',
        100: '#FEE4E2',
        200: '#FECDCA',
        300: '#FDA29B',
        400: '#F97066',
        500: '#F04438',
        600: '#D92D20',
        700: '#B42318',
        800: '#912018',
        900: '#7A271A',
      },

      // additional
      aditional1: 'rgba(42, 43, 48, 0.4)',
      transparent: 'transparent',
    },

    spacing: {
      xs4: '2px',
      xs3: '4px',
      xs2: '8px',
      xs: '12px',
      s: '16px',
      sPlus: '20px',
      m: '24px',
      m1: '28px',
      m2: '32px',
      m3: '36px',
      l: '40px',
      xl: '48px',
      xl2: '56px',
      xl3: '64px',
      xl4: '72px',
    },

    borderRadius: {
      zero: '0px',
      minimal: '4px',
      medium: '8px',
      medium2: '12px',
      medium3: '20px',
      large: '24px',
      large2: '32px',
    },

    borderWidth: {
      1: '1px',
      2: '2px',
    },

    screens: {
      mobile320: '320px',
      mobile375: '375px',
      mobile480: '480px',
      tablet600: '600px',
      tablet768: '768px',
      tablet1024: '1024px',
      desktop1200: '1200px',
      desktop1400: '1400px',
      desktop1440: '1440px',
      desktop1920: '1920px',
    },

    fontSize: {
      heading1: [
        '36px',
        {
          lineHeight: '1.3',
          letterSpacing: '-0.54px',
          fontWeight: '400',
        },
      ],
      heading2: [
        '28px',
        {
          lineHeight: '1.3',
          letterSpacing: '-0.42px',
          fontWeight: '400',
        },
      ],
      heading3: [
        '24px',
        {
          lineHeight: '1.25',
          letterSpacing: '-0.3px',
          fontWeight: '500',
        },
      ],
      heading4: [
        '20px',
        {
          lineHeight: '1.25',
          letterSpacing: '-0.3px',
          fontWeight: '500',
        },
      ],
      body: [
        '16px',
        {
          lineHeight: '1.4',
          letterSpacing: '-0.24px',
          fontWeight: '400',
        },
      ],
      button: [
        '16px',
        {
          lineHeight: '1.4',
          letterSpacing: '-0.24px',
          fontWeight: '500',
        },
      ],
      caption: [
        '14px',
        {
          lineHeight: '1.4',
          letterSpacing: '-0.21px',
          fontWeight: '400',
        },
      ],
    },

    fontWeight: {
      400: '400',
      500: '500',
      600: '600',
    },

    boxShadow: {
      btFocus: '0 0 0 4px rgba(46, 144, 250, 1)',
      loading: '20px 0 rgba(46, 144, 250, 1)',
    },

    letterSpacing: {
      button: '-0.2px',
      textBase: '-0.24px',
    },
  },
};

export default theme;
