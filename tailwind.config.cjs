/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "p-blue": "#173f80",
        "p-ash": "#878787",
        "td-ash": "#878787",
        "p-orange": "#fe8101",
      },
    },
  },
  plugins: [],
};

// colour guide
// p = primary
// td = text ash
