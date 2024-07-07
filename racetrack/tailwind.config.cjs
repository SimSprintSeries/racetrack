/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav': '#1a1a1a',
        'bg': '#1A1A1A',
        'green': '#00A64F',
        'color': '#faf4ed',
      },
      keyframes: {
        gradient: {
          "0%": {backgroundPosition: "100% 50%"},
          "100%": {backgroundPosition: "0% 50%"}
        },
        slideLeft: {
          "0%": {
            transform: "translateX(1.5rem)",
            opacity: "0%"
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "100%"
          }
        },
        slideUp: {
          "0%": {
            transform: "translateY(1.5rem)",
            opacity: "0%"
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "100%"
          }
        },
        slideRight: {
          "0%": {
            transform: "translateX(-1.5rem)",
            opacity: "0%"
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "100%"
          }
        }
      },
      animation: {
        gradient: "gradient 6s linear infinite",
        slideLeft: "slideLeft 0.5s ease-out",
        slideUp: "slideUp 0.5s ease-out",
        slideRight: "slideRight 0.5s ease-out"
      }
    },
  },
  plugins: [
      require("tailwind-gradient-mask-image"),
      plugin(({ matchUtilities, theme }) => {
      matchUtilities(
          {
            "animation-delay": (value) => {
              return {
                "animation-delay": value,
              };
            },
          },
          {
            values: theme("transitionDelay"),
          }
      );
    })
  ],
}
