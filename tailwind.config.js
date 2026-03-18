/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:    { DEFAULT: '#FAF7F2', dark: '#F0EBE1' },
        terra:    { DEFAULT: '#C4602A', light: '#E8845A', dark: '#943F17' },
        charcoal: { DEFAULT: '#1E1A16' },
        stone:    { DEFAULT: '#6B6560', light: '#AEA9A3' },
        text:     'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        border:   'var(--color-border)',
        primary:  'var(--color-primary)',
        'primary-dark': '#943F17',
        surface:  'var(--color-surface)',
        'surface-secondary': 'var(--color-surface-secondary)',
        danger:   '#DC2626',
        warning:  '#F59E0B',
        success:  '#10B981',
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