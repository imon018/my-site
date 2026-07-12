/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
  amber: {
    500: '#F59E0B'
  },
  dark: '#111111'
}
      colors: {
  primary: "#0F172A",
  secondary: "#1E293B",
  accent: "#C9A227",
  cream: "#FAF7F2",
}
    }
  },
  plugins: []
};
