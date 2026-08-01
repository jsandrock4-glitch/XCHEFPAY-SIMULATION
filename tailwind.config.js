/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0d14",
        surface: "#121824",
        "surface-light": "#1a2333",
        accent: {
          green: "#00ff9d",
          gold: "#ffb703",
          cyan: "#00e5ff",
          purple: "#7b2cbf"
        }
      },
    },
  },
  plugins: [],
};