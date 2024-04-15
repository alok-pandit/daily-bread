const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {},
  darkMode: "class",
  plugins: [require("tailwindcss-radix")()],
};
export default config;
