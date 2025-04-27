/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./export/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        indeterminate: "indeterminate 1s infinite linear",
        rcTriggerZoomIn:
          "rcTriggerZoomIn 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        rcTriggerZoomOut:
          "rcTriggerZoomOut 0.2s cubic-bezier(0.6, -0.3, 0.74, 0.05) forwards",
        "new-feature-beacon": "new-feature-beacon 2s infinite",
      },
      keyframes: {
        indeterminate: {
          "0%": {
            transform: "translateX(0) scaleX(0)",
          },
          "40%": {
            transform: "translateX(0) scaleX(0.4)",
          },
          "100%": {
            transform: "translateX(100%) scaleX(0.5)",
          },
        },
        rcTriggerZoomIn: {
          "0%": { opacity: "0", transform: "scale(0, 0)" },
          "100%": { opacity: "1", transform: "scale(1, 1)" },
        },
        rcTriggerZoomOut: {
          "0%": { opacity: "1", transform: "scale(1, 1)" },
          "100%": { opacity: "0", transform: "scale(0, 0)" },
        },
        "new-feature-beacon": {
          "0%": {
            transform: "scale(1)",
            backgroundColor: "rgba(79, 70, 229, 0.2)",
          },
          "55%": {
            backgroundColor: "rgba(79, 70, 229, 0.5)",
            transform: "scale(1.6)",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgba(79, 70, 229, 0.2)",
          },
        },
      },
      transitionProperty: {
        width: "width",
      },
      colors: {
        primary: {
          DEFAULT: "#A8E40F",
          light: "#BEF264",
          tint: "#ecfccb",
          dark: "#84CC16",
          text: "#4D7C0F",
          textlight: "#65A30D",
        },
        fontcolor: {
          default: "#030712",
          light: "#6B7280",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".overflow-wrap-anywhere": {
          "overflow-wrap": "anywhere",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  safelist: [
    // this safe list is used to prevent compiler to not apply styles to the element (FeatureAnnouncementContextWrapper)
    "w-[156px] h-full min-h-[-webkit-fill-available] -my-4 -ml-4 rounded-l-lg",
    "bg-indigo-600/20 animate-new-feature-beacon border-indigo-600",
    "ring-white",
    "z-[29]",
  ],
};
