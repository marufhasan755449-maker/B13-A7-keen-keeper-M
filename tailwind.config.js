/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1B3A2D',
        leaf:   '#2D6A4F',
      },
      fontFamily: {
  sans: ['Geist', 'sans-serif'],
  serif: ['"DM Serif Display"', 'serif'],
},
    },
  },
  plugins: [],
}
