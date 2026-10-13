/** @type {import('tailwindcss').Config} */
import { brand } from './src/theme/brand.js';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:    { DEFAULT: brand.cream.DEFAULT, dark: brand.cream.dark },
        terra:    { DEFAULT: brand.terra.DEFAULT, light: brand.terra.light, dark: brand.terra.dark },
        charcoal: { DEFAULT: brand.charcoal },
        stone:    { DEFAULT: brand.stone.DEFAULT, light: brand.stone.light },
        text:     'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        border:   'var(--color-border)',
        primary:  'var(--color-primary)',
        'primary-dark': brand.terra.dark,
        surface:  'var(--color-surface)',
        'surface-secondary': 'var(--color-surface-secondary)',
        danger:   brand.danger,
        warning:  brand.warning,
        success:  brand.success,
        'danger-light': '#FEE2E2',
        'warning-light': '#FEF3C7',
        'success-light': '#D1FAE5',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(30,26,22,0.08)',
        lift: '0 8px 32px rgba(30,26,22,0.14)',
      },
    },
  },
  plugins: [],
};
