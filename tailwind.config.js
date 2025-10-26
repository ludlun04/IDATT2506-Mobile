/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        text: "#E6E0E9",
        primary: "#D0BCFE",
        'on-primary': "#381E72",
        surface: "#141218",
        'on-surface': "#CAC4D0",
        background: "#0F0D13",
        'selected-surface': "#49454F"
      }
    },
  },
  plugins: [],
};
