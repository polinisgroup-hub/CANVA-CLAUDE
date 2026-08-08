import type { Config } from 'tailwindcss'

/**
 * Design tokens for the "Taller Canva + Claude" landing page.
 * Palette is defined once here and consumed via Tailwind utilities
 * (e.g. `text-ink`, `bg-lavender`, `text-claude`).
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base
        ink: '#17141D', // Negro carbón — texto principal
        muted: '#6F6A76', // Texto secundario
        lavender: '#F4F0FF', // Lavanda muy clara
        // Purples
        purple: '#5B21B6', // Morado
        'purple-deep': '#312E81', // Morado profundo
        // Claude accent
        claude: '#D97757',
        'claude-hover': '#C9684B',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Dancing Script"', '"Playfair Display"', 'cursive'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(23, 20, 29, 0.12)',
        card: '0 18px 50px -20px rgba(23, 20, 29, 0.22)',
        cta: '0 14px 40px -10px rgba(217, 119, 87, 0.5)',
        'cta-hover': '0 20px 55px -10px rgba(217, 119, 87, 0.6)',
        glow: '0 0 80px -10px rgba(91, 33, 182, 0.55)',
      },
      keyframes: {
        'marquee-x': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'marquee-x': 'marquee-x var(--marquee-duration, 40s) linear infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
