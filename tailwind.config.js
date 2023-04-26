/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'gladiadoras' : "url('./img/gladiadoras.png')",
        'impropenosos' : "url('./img/impropenosos.png')",
      }
    },
  },
  plugins: [],
}

