module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        bubble: ["Bubble Love", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        pink: "#fff0f0",
        "pink-dark": "#a35656",
        orange: "#eea750",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
