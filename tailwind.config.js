/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#050811',
          slate: '#0a0f1d',
          card: '#0f172a',
          cyan: '#00f3ff',
          green: '#00ff66',
          red: '#ff0055',
          amber: '#ffaa00',
          purple: '#9d4edd',
          blue: '#1e293b',
        }
      },
      fontFamily: {
        cyber: ['Cyberbang-7O9OB', 'monospace'],
        rachela: ['RachelaClaudie', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      animation: {
        'scanbeam': 'scanbeam 3s ease-in-out infinite',
        'glitch': 'glitch 1s ease-in-out infinite alternate',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-fall': 'matrix-fall 10s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scanbeam: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(1000%)', opacity: '0.8' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(0, 243, 255, 0.6))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.2))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 243, 255, 0.4), inset 0 0 15px rgba(0, 243, 255, 0.1)',
        'neon-green': '0 0 15px rgba(0, 255, 102, 0.4), inset 0 0 15px rgba(0, 255, 102, 0.1)',
        'neon-red': '0 0 15px rgba(255, 0, 85, 0.4), inset 0 0 15px rgba(255, 0, 85, 0.1)',
      }
    },
  },
  plugins: [],
}