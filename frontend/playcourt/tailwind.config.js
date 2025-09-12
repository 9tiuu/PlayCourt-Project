const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
    flowbite.content(),
  ],
  plugins: [
    // ...
    require('flowbite/plugin'),
  ],
  theme: {
    colors: {
      color1:'#A74FFF',
      color2:'#5F00BF',
      color3:'#27273A',
      color4:'#1B1B28',
      color5:'#0F0F15',
      color6:'#0A0A0A',
      color7:'#5765F2'
    },
  }
};

// #5F00BF #27273A #1B1B28 #0F0F15 #0A0A0A
