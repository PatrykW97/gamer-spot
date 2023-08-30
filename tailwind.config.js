/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "customBlue" : "#242D6C",
        "customPurple" :"#921B79",
        "customYellow" :"#F29A1C",
        "customGreen" : "#32936F"
      },
    },
    
  },
  plugins: [],
};
