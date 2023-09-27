/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      orange: {
        100: "#FFAB76",
        30: "rgba(255, 171, 118, .3)",
        20: "rgba(255, 171, 118, .2)",
        10: "rgba(255, 171, 118, .1)",
      },
    },
  },
  plugins: [require("daisyui")],
};
