const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'black' : '#000000',
      'red': '#EF4444',
      'blue': '#0EA5E9',
      'space-cadet':'#283044',
      'alice-blue' : '#E8F1F2',
      'shadow-blue' : '#7785AC',
      'paradise-pink' : '#EF476F',
      'blush':'#E55381',
    },
  },
  plugins: [Myclass
  ],
}
