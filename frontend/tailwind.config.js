/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#AEC4DC',
        customCream: '#FFFDF8',
        customLightGray: '#374151',
        customGray: '#585353',
        customDarkGray: '#181212',
      },

      fontFamily: {
        inknut: ['"Inknut Antiqua"', 'serif'],
      },
    },
  },
  plugins: [],
}
