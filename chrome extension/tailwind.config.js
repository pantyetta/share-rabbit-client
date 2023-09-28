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
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        rabbitTheme: {
          primary: "#A898FF",
          secondary: "#FF83BE",
          accent: "#8598FF",
          neutral: "#3d3d4d",
          "base-100": "#FDFDFD",
          info: "#A4FFA4",
          success: "#86DEC2",
          warning: "#FFBE83",
          error: "#FF9385",
        },
      },
    ],
  },
};
