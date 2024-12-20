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
        customLightPink: '#F6CACB',
        customDarkPink: '#DF9D9D',
        customCream: '#FFFDF8',
        customLightGray: '#374151',
        customGray: '#585353',
        customDarkGray: '#181212',
      },

      fontFamily: {
        inknut: ['"Inknut Antiqua"', 'serif'],
        istok: ['"Istok Web"', 'sans-serif'],
        inclusive: ['"Inclusive Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
