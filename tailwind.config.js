// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
      },
      animation: {
        'scroll-left': 'scrollLeft 40s linear infinite',
        'scroll-right': 'scrollRight 40s linear infinite',
      },
    },
  },
  plugins: [],
};
