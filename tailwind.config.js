/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#02050b',
          card: 'rgba(7, 16, 30, 0.72)',
          'card-hover': 'rgba(12, 28, 52, 0.85)',
          border: 'rgba(0, 240, 255, 0.18)',
          'border-bright': '#00f0ff',
          neon: '#00f0ff',
          teal: '#14b8a6',
          emerald: '#10b981',
          accent: '#06b6d4',
          dim: '#94a3b8',
          text: '#f1f5f9',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.35)',
        'neon-cyan-lg': '0 0 50px rgba(0, 240, 255, 0.55)',
        'neon-border': '0 0 15px rgba(0, 240, 255, 0.25), inset 0 0 15px rgba(0, 240, 255, 0.12)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-reverse': 'spin-rev 35s linear infinite',
        'hud-scan': 'hud-scan 4s ease-in-out infinite alternate',
      },
      keyframes: {
        'spin-rev': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' }
        },
        'hud-scan': {
          '0%': { opacity: '0.2', transform: 'translateY(0%)' },
          '100%': { opacity: '0.7', transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
};
