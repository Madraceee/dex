/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        "dialogBox" : "rgba(0, 0, 0, 0.24) 12px 16px 24px, rgba(0, 0, 0, 0.24) 12px 8px 12px, rgba(0, 0, 0, 0.32) 4px 4px 8px"
      },
      colors:{
        "dialogBorder": "#98a1c03d"
      },
      fontFamily:{
        "primary": "Space Grotesk"
      }
    },
  },
  plugins: [],
}

