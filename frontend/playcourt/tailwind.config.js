const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
      color1:'#1e1e2a',
      color2:'#252736',
      color3:'#494c6a',
      color4:'#292b3c',
      color5:'#33354a',
      color6:'#232331',
      // color7:'#5765F2'
    },
  }
};

// #5F00BF #27273A #1B1B28 #0F0F15 #0A0A0A
