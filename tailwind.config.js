/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        candyPink: '#ff9ac9',
        skySplash: '#8dd9ff',
        sunny: '#ffe164',
        minty: '#a2f5c5'
      }
    }
  },
  plugins: []
};
