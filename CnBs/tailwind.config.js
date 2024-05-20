/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        primary: "#814C02",
        secondary: "#816802",
      },
      fontFamily:{
        'poppins': ['Poppins'],
      },
      container:{
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: '3rem',
        },
      },
    },
  },
  plugins: [],
}

