/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "section-bg": "url('/src/assets/section-bg.png')",
      },
      backgroundSize: {
        full: "1550px 750px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
