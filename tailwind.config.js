module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#007bff",
        "custom-gray": "#f6f6f6",
      },
      spacing: {
        128: "32rem",
      },
      fontFamily: {
        sans: ["YourCustomFont", "sans-serif"],
        inknut: ["Inknut Antiqua", "serif"],
        abyssinica: ["Abyssinica SIL", "serif"],
        inder: ["Inder", "serif"],
        josefin: ["Josefin", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        default: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "3px 3px 8px rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          "text-shadow": "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow": {
          "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-lg": {
          "text-shadow": "3px 3px 8px rgba(0, 0, 0, 0.75)",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
