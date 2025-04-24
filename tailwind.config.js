/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8758ff",
        secondary: "rgba(107, 76, 230, 0.1)",
        light: "#8758ffad",
      },
    },
  },
  plugins: [],
};
