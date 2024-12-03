import plugin from 'tailwindcss/plugin';

const ExtendedColors = {
  primary: {
    150: '#B6B6ED',
    200: '#9A9AE3',
    250: '#8D8DC7',
    300: '#7877C6',
    350: '#6A6AC3',
    400: '#5656BF',
    450: '#4A4A94',
    500: '#3C3C86',
    550: '#1D1B39',
    600: '#171630',
    650: '#141028',
  },
  secondary: {
    100: '#46446a',
    200: '#ABABDF',
    300: '#7878B6',
    400: '#575689',
    500: '#44426B',
    600: '#333257',
    700: '#272746',
  },
  'dark-card-bg-dark': '#47477c20',
  'dark-card-bg-light': '#7f7fe334',
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, String(val)])
  );

  Object.entries(flattenColorPalette(ExtendedColors)).forEach(([key, val]) => {
    newVars[`--${key}`] = String(val);
  }),
    addBase({
      ':root': newVars,
    });
}

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const config = {
  darkMode: 'class',
  content: ['./code/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        xsm: '365px',
        xxsm: '325px',
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },

      animation: {
        aurora: 'aurora 60s linear infinite',

        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },

        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: { ...ExtendedColors },
    },
  },

  plugins: [
    addVariablesForColors,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities({
        // Class name
        'grid-fluid-fit': (value) => {
          return {
            gridTemplateColumns: 'repeat(auto-fit, minmax(' + value + ', 1fr))', // Desired CSS properties here
            display: 'grid', // Just for example non-dynamic value
          };
        },
        'grid-fluid-fill': (value) => {
          return {
            gridTemplateColumns: 'repeat(auto-fill, minmax(' + value + ', 1fr))', // Desired CSS properties here
            display: 'grid', // Just for example non-dynamic value
          };
        },
      });
    }),
  ],
};
export default config;
