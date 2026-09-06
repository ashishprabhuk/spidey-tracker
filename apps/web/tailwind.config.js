/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#07111F',
          darker: '#040A14',
          card: '#0B1728',
          panel: '#0D2235',
          panelHeader: '#102B40',
          blue: '#28A9D6',
          brightBlue: '#3AB7DD',
          cyan: '#8DEBFF',
          red: '#EF4B45',
          brightRed: '#FF625A',
          orange: '#FF9F43',
          yellow: '#FFD166',
          green: '#63D47A',
          border: '#1C55A0',
          mutedText: '#8BA9B8',
        },
      },
      fontFamily: {
        arcade: ['"Pixelify Sans"', '"Press Start 2P"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        cyanGlow: '0 0 15px rgba(141, 235, 255, 0.4)',
        redGlow: '0 0 20px rgba(239, 75, 69, 0.6)',
        blueGlow: '0 0 15px rgba(40, 169, 214, 0.5)',
      },
      animation: {
        'scanline-sweep': 'sweep 3s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'target-spin': 'spin 8s linear infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
};
