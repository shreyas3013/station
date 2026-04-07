/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        bg: '#080808',
        'accent-indigo': '#6366f1',
        'accent-purple': '#a855f7',
        'text-primary': '#f8fafc',
        'text-muted': '#94a3b8',
        'card-bg': 'rgba(255,255,255,0.03)',
        'border-c': 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}

