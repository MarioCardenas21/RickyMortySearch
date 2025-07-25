const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'portal-glow': 'portalGlow 1.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        portalGlow: {
          '0%, 100%': {
            boxShadow: '0 0 5px 2px #00ff00',
          },
          '50%': {
            boxShadow: '0 0 20px 6px #00ff00',
          },
        },
      },
    },
  },
  plugins: [],
};
