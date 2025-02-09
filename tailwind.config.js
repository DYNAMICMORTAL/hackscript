/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure this is correct
  theme: {
    extend: {
        fontFamily: {
          f1: ["f1", "sans-serif"],
          "f1-bold": ["f1-bold", "sans-serif"],
          "f1-wide": ["f1-wide", "sans-serif"],
      },
    },
  },
  plugins: [],
};
