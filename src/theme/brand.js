/**
 * flow brand palette — single source of truth.
 * Consumed by tailwind.config.js. Runtime CSS variables live in src/index.css.
 *
 * Brand: warm, artisanal terracotta + cream — handcrafted ceramic goods.
 */

export const brand = {
  // Primary — terracotta
  terra: {
    DEFAULT: '#C4602A',
    light:    '#E8845A',
    dark:     '#943F17',
  },

  // Surfaces — warm cream paper
  cream: {
    DEFAULT: '#FAF7F2',
    dark:    '#F0EBE1',
  },

  // Ink — warm charcoal
  charcoal: '#1E1A16',

  // Neutral — warm stone greys
  stone: {
    DEFAULT: '#6B6560',
    light:    '#AEA9A3',
  },

  // Semantic
  danger:   '#DC2626',
  warning:  '#F59E0B',
  success:  '#10B981',
};

// Dark mode overrides (applied via CSS variables in index.css)
export const brandDark = {
  primary:            '#E8845A', // terra-light
  text:               '#FAF7F2',
  'text-muted':       '#9CA3AF',
  border:             '#374151',
  bg:                 '#111827',
  surface:            '#1F2937',
  'surface-secondary':'#111827',
};

// Flat lookup for tooling / swatches
export const swatches = [
  { name: 'Terra',        token: 'terra',            hex: '#C4602A', role: 'Primary brand — CTAs, links, accents' },
  { name: 'Terra Light',  token: 'terra-light',      hex: '#E8845A', role: 'Primary on dark backgrounds' },
  { name: 'Terra Dark',   token: 'terra-dark',       hex: '#943F17', role: 'Primary hover / pressed' },
  { name: 'Cream',        token: 'cream',            hex: '#FAF7F2', role: 'Page background (light)' },
  { name: 'Cream Dark',   token: 'cream-dark',       hex: '#F0EBE1', role: 'Cards, dividers, image placeholders' },
  { name: 'Charcoal',     token: 'charcoal',         hex: '#1E1A16', role: 'Primary text / dark surfaces' },
  { name: 'Stone',        token: 'stone',            hex: '#6B6560', role: 'Secondary text' },
  { name: 'Stone Light',  token: 'stone-light',      hex: '#AEA9A3', role: 'Muted text, borders' },
  { name: 'Success',      token: 'success',          hex: '#10B981', role: 'Positive status' },
  { name: 'Warning',      token: 'warning',          hex: '#F59E0B', role: 'Low-stock / pending status' },
  { name: 'Danger',       token: 'danger',           hex: '#DC2626', role: 'Errors, destructive actions' },
];

// Typography
export const fonts = {
  display: '"Playfair Display", Georgia, serif',
  body:    '"DM Sans", sans-serif',
};

export default { brand, brandDark, swatches, fonts };
