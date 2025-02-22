// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
};
