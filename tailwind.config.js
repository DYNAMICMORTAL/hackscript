/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        f1: ["f1", "sans-serif"],
        "f1-bold": ["f1-bold", "sans-serif"],
        "f1-wide": ["f1-wide", "sans-serif"],
      },
      colors: {
        primary: "#E10600",
        secondary: "#ffffff",
        background: "#000000",
        accent: "#29999F",
      },
      dropShadow: {
        glow: "0 0 5px rgba(220, 38, 38, 0.7), 0 0 10px rgba(220, 38, 38, 0.5)",
      },
    },
  },
  plugins: [],
};
