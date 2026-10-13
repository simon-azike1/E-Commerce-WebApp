import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ImageLightbox({ images = [], index = 0, onClose }) {
  const [current, setCurrent] = useState(index);
  const count = images.length;

  const prev = useCallback(() => setCurrent((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % count), [count]);

  // Keyboard navigation + scroll lock
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  // Touch swipe support
  const [touchX, setTouchX] = useState(null);
  const onTouchStart = (e) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (dx > 60) prev();
    else if (dx < -60) next();
    setTouchX(null);
  };

  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6"
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4">
          {count > 1 && (
            <span className="text-white/80 text-sm font-medium bg-black/40 px-3 py-1.5 rounded-full">
              {current + 1} / {count}
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="ml-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* Prev / Next */}
        {count > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </motion.button>
          </>
        )}

        {/* Full image — responsive: fits viewport without cropping */}
        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          src={images[current]}
          alt={`Image ${current + 1} of ${count}`}
          className="max-w-[92vw] max-h-[82vh] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />

        {/* Thumbnail strip */}
        {count > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 px-4 overflow-x-auto">
            {images.map((url, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  i === current ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Small zoom affordance button used to trigger the lightbox
export function ZoomButton({ onClick, className = '' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
      className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-charcoal hover:bg-white shadow flex items-center justify-center transition-colors ${className}`}
      aria-label="View full image"
      title="View full image"
    >
      <ZoomIn size={16} />
    </motion.button>
  );
}
