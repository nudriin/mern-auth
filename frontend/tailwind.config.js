/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Tambahkan data disini agar tidak mengubah data bawaan
    extend: {
      fontFamily : {
        'poppins' : 'Poppins, sans-serif',
        'rubik' : 'Rubik',
        'montserrat' : 'Montserrat, sans-serif',
        'futura' : 'Futura, sans-serif'

      },
      colors : {
        'dark-white' : '#F3F8FF',
        'pink' : '#E26EE5',
        'purple' : '#7E30E1',
        'dark-urple' : '#49108B'
      },
      backgroundImage : {
        'hero-bg' : "url('./src/assets/images/Deco.png')"
      }
    },
  },
  plugins: [],
}

