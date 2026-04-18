import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deep: '#071a2f',
        surface: '#0d2742',
        'accent-violet': '#2f7fd1',
        'accent-cyan': '#8bd3ff',
        'text-primary': '#eaf4ff',
        'text-muted': 'rgba(186,213,239,0.76)',
        'border-glass': 'rgba(139,211,255,0.22)',
      },
      fontFamily: {
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-conic':
          'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(130deg, #eaf4ff, #8bd3ff, #2f7fd1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease both',
        float: 'float 6s ease-in-out infinite',
        'float-blob': 'floatBlob 12s ease-in-out infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'slide-in-right': 'slideInRight 0.3s ease forwards',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatBlob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '50%': { transform: 'translate(10px, 20px) scale(0.95)' },
          '75%': { transform: 'translate(-20px, -10px) scale(1.03)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
