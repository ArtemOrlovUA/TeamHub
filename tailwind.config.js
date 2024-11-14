/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primaryBold: ['Montserrat-Bold'],
        primaryRegular: ['Montserrat-Regular'],
      },
    },
  },
  plugins: [],
};
