/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom-only': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        "blue": "hsl(190,100%,45%)",
        "bgColor": "#242424",
      },
      keyframes: {
        "infinite-scroll": {
          "0%": { transform: "translateX(0)"},
          "100%": { transform: "translateX(calc(-50% - 40px))"},
        },
        "infinite-scroll-left-to-right": {
          "0%": { transform: "translateX(calc(-50% - 40px))" }, 
          "100%": { transform: "translateX(0)" },
        },
        dotsAnimation: {
          '0%': { content: "''" },
          '33%': { content: "'.'" },
          '66%': { content: "'..'" },
          '100%': { content: "'...'" },
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 40s linear infinite",
        "infinite-scroll-left-to-right": "infinite-scroll-left-to-right 40s linear infinite",
      }
    },
  },
  plugins: [],
}

