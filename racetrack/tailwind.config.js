/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark100: "#1a1a1a",
        bright100: "#faf4ed",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        slideLeft: {
          "0%": {
            transform: "translateX(1.5rem)",
            opacity: "0%",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(1.5rem)",
            opacity: "0%",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "100%",
          },
        },
        slideRight: {
          "0%": {
            transform: "translateX(-1.5rem)",
            opacity: "0%",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
        slideDown: {
          "0%": {
            transform: "translateY(-1.5rem)",
            opacity: "0%",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "100%",
          },
        },
      },
      animation: {
        gradient: "gradient 6s linear infinite",
        slideLeft: "slideLeft 0.5s ease-out",
        slideUp: "slideUp 0.5s ease-out",
        slideRight: "slideRight 0.5s ease-out",
        slideDown: "slideDown 0.2s ease-in",
      },
    },
  },
  plugins: [],
};
