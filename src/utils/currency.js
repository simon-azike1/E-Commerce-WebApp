export const CURRENCIES = [
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'MAD', symbol: 'DH', name: 'Moroccan Dirham' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

const SYMBOLS = {
  NGN: '₦',
  MAD: 'DH',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export function getCurrencySymbol(currencyCode) {
  return SYMBOLS[currencyCode] || '₦';
}

export function formatPrice(amount, currencyCode) {
  const value = Number(amount) || 0;
  return `${getCurrencySymbol(currencyCode)}${value.toLocaleString()}`;
}

// For totals across multiple items, use the most common currency
// (mirrors the approach already used in admin Dashboard/Analytics).
export function getDominantCurrency(items = [], getCurrency = (i) => i.currency) {
  const counts = {};
  for (const item of items) {
    const code = getCurrency(item) || 'NGN';
    counts[code] = (counts[code] || 0) + 1;
  }
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || 'NGN';
}

export default getCurrencySymbol;
