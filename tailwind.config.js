/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      animation: {
        banner: 'banner 15s linear infinite',
      },
      keyframes: {
        banner: {
          '50%': { transform: 'scale(2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
