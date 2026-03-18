import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: showButton ? 1 : 0, scale: showButton ? 1 : 0.8 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-lg shadow-gray-300/50 bg-terra hover:bg-terra-dark text-white flex items-center justify-center transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-terra focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}
