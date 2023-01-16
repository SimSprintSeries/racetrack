/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav': '#040B1C',
        'bg': '#081631',
        'green': '#00A64F',
      },
    },
  },
  plugins: [],
}
