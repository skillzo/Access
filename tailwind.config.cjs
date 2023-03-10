/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        "access-blue": "#173f80",
        "p-ash": "#878787",
      },
    },
  },
  plugins: [],
};

// colour guide
// p = primary
