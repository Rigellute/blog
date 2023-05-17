const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  theme: {
    spinner: (theme) => ({
      default: {
        color: theme('colors.gray.200', 'gray'),
      },
    }),
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui'), require('tailwindcss-spinner')()],
  purge: ['./src/**/*.tsx', './src/**/*.js'],
};
