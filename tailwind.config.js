/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        valk: {
          bg: '#08090D',
          surface: '#0D1118',
          card: '#111722',
          cardHover: '#161F2E',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(56, 189, 248, 0.3)',
        },
        freya: {
          gold: '#E5B558',
          goldLight: '#F5D07A',
          goldDark: '#B8860B',
          rose: '#E06D8A',
          roseLight: '#F472B6',
          violet: '#9D4EDD',
          violetLight: '#C084FC',
          glow: 'rgba(229, 181, 88, 0.35)',
        },
        bryn: {
          silver: '#E0E6ED',
          silverLight: '#F1F5F9',
          steel: '#38BDF8',
          steelDark: '#0284C7',
          deepBlue: '#0F172A',
          crimson: '#EF4444',
          crimsonDark: '#991B1B',
          glow: 'rgba(56, 189, 248, 0.35)',
        },
        priority: {
          critical: '#EF4444',
          high: '#F97316',
          moderate: '#EAB308',
          low: '#22C55E',
          safe: '#22C55E',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        display: ['Cinzel', 'Space Grotesk', 'serif'],
        sans: ['Inter', 'Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-freya': 'glowFreya 3s ease-in-out infinite alternate',
        'glow-bryn': 'glowBryn 3s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowFreya: {
          '0%': { boxShadow: '0 0 15px rgba(229, 181, 88, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(229, 181, 88, 0.5)' },
        },
        glowBryn: {
          '0%': { boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(56, 189, 248, 0.5)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
