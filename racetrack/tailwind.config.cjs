/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav': '#1F1F1F',
        'bg': '#1A1A1A',
        'green': '#00A64F',
        'color': '#faf4ed',
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
}
