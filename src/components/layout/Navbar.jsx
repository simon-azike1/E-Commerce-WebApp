import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { Moon, Sun } from 'lucide-react';

const navLinks = [
  ['/',         'Home'],
  ['/shop',     'Shop'],
  ['/services', 'Services'],
  ['/about',    'About'],
  ['/contact',  'Contact'],
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 bg-cream dark:bg-gray-900 transition-all duration-300 ${
        scrolled ? 'border-b border-cream-dark dark:border-stone-700 shadow-lg backdrop-blur-sm bg-cream/95 dark:bg-gray-900/95' : 'border-b border-transparent dark:border-stone-700'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center h-16 gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-2xl font-bold text-charcoal dark:text-cream flex-shrink-0 group"
        >
          <motion.span
            className="text-terra text-sm"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ●
          </motion.span>
          <motion.span
            className="group-hover:text-terra transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            ShopFlow
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 ml-auto">
          {navLinks.map(([to, label], index) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={to}
                className="relative text-sm font-medium pb-0.5 text-stone group"
              >
                {label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-terra"
                  initial={{ width: 0 }}
                  animate={{ width: location.pathname === to ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <span className={`absolute bottom-0 left-0 h-0.5 bg-terra/30 transition-all duration-300 ${
                  location.pathname === to ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:ml-0 ml-auto">
          {/* Cart */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-cream-dark dark:border-stone-700 text-charcoal dark:text-cream hover:border-terra dark:hover:border-orange-400 hover:text-terra hover:bg-terra/5 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute -top-1.5 -right-1.5 bg-terra text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-cream-dark dark:border-stone-700 text-charcoal dark:text-cream hover:border-terra dark:hover:border-orange-400 hover:bg-terra/5 dark:hover:bg-gray-800 transition-all duration-300"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden flex items-center justify-center text-charcoal hover:text-terra transition-colors duration-300"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-cream dark:bg-gray-900 border-t border-cream-dark dark:border-stone-700 overflow-hidden"
          >
            <motion.div
              className="px-6 py-4 flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map(([to, label], index) => (
                <motion.div
                  key={to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={to}
                    className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 py-2 px-3 rounded-lg ${
                      location.pathname === to
                        ? 'text-terra bg-terra/10'
                        : 'text-stone hover:text-terra hover:bg-terra/5'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Cart link in mobile menu */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  to="/cart"
                  className={`text-sm font-medium transition-all duration-300 flex items-center gap-2 py-2 px-3 rounded-lg ${
                    location.pathname === '/cart'
                      ? 'text-terra bg-terra/10'
                      : 'text-stone hover:text-terra hover:bg-terra/5'
                  }`}
                >
                  <ShoppingBag size={15} />
                  Cart
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-terra text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
