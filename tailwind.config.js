/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#FFFFFF",
        Secondary: "#F5F5F5",
        Theme: "#F09136",
        Dark: "#303030",
      },
    },
  },
  plugins: [],
};
