/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this based on your project structure
  ],
  theme: {
    extend: {
      colors:{
        'primary' : '#5F6FFF'
      }
    },
  },
  plugins: [],
}
