/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', ...defaultTheme.fontFamily.sans],
        'sans-sc': ['"Alegreya Sans SC"'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
