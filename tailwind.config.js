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
        ivory: {
          DEFAULT: '#FAF8F5',
          50: '#FCFBF9',
          100: '#FAF8F5',
          200: '#F4EFE6',
          300: '#EAE2D2',
          400: '#DDD1BD',
        },
        champagne: {
          50: '#FDFBF7',
          100: '#F9F5EC',
          200: '#F2E8D5',
          300: '#E8D7B8',
          400: '#DCBF93',
          500: '#C7A267',
        },
        gold: {
          50: '#FAF7EE',
          100: '#F5ECCF',
          200: '#EBDB9F',
          300: '#DEC46A',
          400: '#D4AF37', // Classic metallic gold
          500: '#B8860B', // Dark goldenrod
          600: '#996515',
          700: '#7A4D0F',
          800: '#633D10',
          900: '#4E2F0D',
        },
        charcoal: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#212529',
          900: '#14171F',
          950: '#0B0D12',
        },
        valk: {
          bg: '#FAF8F5',
          surface: '#FFFFFF',
          card: '#FCFAF7',
          cardHover: '#F7F3EB',
          border: 'rgba(212, 175, 55, 0.22)',
          borderHover: 'rgba(212, 175, 55, 0.55)',
        },
        freya: {
          gold: '#D4AF37',
          goldLight: '#F5E6A8',
          goldDark: '#B8860B',
          rose: '#E29578',
          roseLight: '#F7D6C8',
          ivory: '#FFFDF9',
          glow: 'rgba(212, 175, 55, 0.35)',
        },
        bryn: {
          gold: '#C59B27',
          steel: '#5C768D',
          steelLight: '#8CA3B8',
          steelDark: '#3A4E61',
          white: '#FFFFFF',
          champagne: '#F4EFE6',
          glow: 'rgba(197, 155, 39, 0.35)',
        },
        priority: {
          critical: '#C0392B',
          high: '#D35400',
          moderate: '#B8860B',
          low: '#27AE60',
          safe: '#27AE60',
          info: '#2980B9',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        display: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Inter', 'Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'gold-glow': 'goldGlow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        goldGlow: {
          '0%': { boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.45)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFBA52 0%, #F5E8BA 50%, #C59B27 100%)',
        'gold-shimmer': 'linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.25) 50%, rgba(212,175,55,0) 100%)',
        'norse-pattern': 'radial-gradient(circle at center, rgba(212,175,55,0.06) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
