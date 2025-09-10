/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if your components are elsewhere
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // this enables DaisyUI
}
