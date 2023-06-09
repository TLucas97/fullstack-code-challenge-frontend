/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      medium: '1290px',
      small: '640px',
      smaller: '480px',
    },
    extend: {
      colors: {
        dark: '#404258',
      },
    },
    fontFamily: {
      sourceCode: ['Source Code Pro', 'monospace'],
    },
  },
  plugins: [],
}
