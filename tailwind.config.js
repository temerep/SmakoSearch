/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./public/*.{html,js}",
    "./public/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'lviv-dark': "url('../img/lviv-dark.png')",
        'lviv-light' : "url('../img/lviv-light.png')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ]
}

