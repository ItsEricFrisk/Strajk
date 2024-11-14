/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: "#FFF4F1",
        primaryColor: "#EC315A",
        secondaryColor: "#441D81",
      },
      fontSize: {
        small: "10px",
      },
    },
  },
  plugins: [],
};
