/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violeta: '#A261E7',
        violetaClaro: '#fcba03',
        verde: '#57C99B'
      },
      fontSize: {
        // "xxs": [".5rem", "1.5rem"],

        'xxs': ['.7rem', {
          lineHeight: '.4rem',
          letterSpacing: '-0.15em',
          fontWeight: '700',
        }],
      },
      // fontWeight: {
      //   "luloBold": "700",
      //   "lulo": "400",
      // },
      fontFamily: {
        luloBold: ['Lulo Clean Bold', 'sans-serif'],
        lulo: ['Lulo Clean', 'sans-serif'],
      },
      backgroundImage: {
        'grid': "url('/img/bg-grid.png')",
      }
    },



  },
  plugins: [],
}
