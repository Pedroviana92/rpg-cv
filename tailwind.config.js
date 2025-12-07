/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores escuras modernas (inspirado em Rocketseat)
        'dark-950': '#0a0a0a',
        'dark-900': '#121214',
        'dark-800': '#1a1a1e',
        'dark-700': '#202024',
        'dark-600': '#29292e',

        // Cores de destaque vibrantes (Neobrutalist)
        primary: '#8257e5',      // Roxo moderno
        secondary: '#04d361',    // Verde tech
        accent: '#00b8ff',       // Azul ciano
        warning: '#ffc700',      // Amarelo
        danger: '#f75a68',       // Vermelho suave

        // Tons básicos
        dark: '#000000',
        light: '#FFFFFF',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        display: ['Arial Black', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #8257e5',
        'brutal-lg': '6px 6px 0px 0px #8257e5',
        'brutal-xl': '8px 8px 0px 0px #8257e5',
        'brutal-green': '4px 4px 0px 0px #04d361',
        'brutal-cyan': '4px 4px 0px 0px #00b8ff',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1e 50%, #202024 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8257e5 0%, #04d361 100%)',
      },
    },
  },
  plugins: [],
}
