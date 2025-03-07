/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Keep dark mode class-based
  theme: {
    extend: {
      colors: {
        red: "#ef4444",
        green: "#22c55e",
        blue: "#3b82f6",
        yellow: "#eab308",
        purple: "#a855f7",
        pink: "#ec4899",
      },
    },
  },
  plugins: [],
};
