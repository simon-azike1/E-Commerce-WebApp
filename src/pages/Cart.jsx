import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const PLACEHOLDER = 'https://placehold.co/400x400/F0EBE1/AEA9A3?text=Product';

export default function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice, clearCart } = useCart();

  const handleRemove = (item) => {
    removeFromCart(item._id);
    toast.success(`${item.name} removed from cart`, {
      icon: <Trash2 size={18} className="text-terra" />,
      duration: 2000,
    });
  };

  const handleClear = () => {
    clearCart();
    toast.success('Cart cleared', {
      icon: <Package size={18} className="text-terra" />,
      duration: 2000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 },
    },
  };

  // Empty State
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-24 h-24 rounded-2xl bg-cream-dark flex items-center justify-center"
        >
          <ShoppingBag size={48} className="text-stone" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">
            Your cart is empty
          </h2>
          <p className="text-stone text-base max-w-md">
            Looks like you haven't added anything to your cart yet. Explore our collection and find something you'll love.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-terra hover:bg-terra-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-terra/25"
          >
            Explore our shop
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 pb-24 bg-gradient-to-b from-cream to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10 gap-4"
        >
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
              Your Cart
            </h1>
            <p className="text-stone text-sm mt-1">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          <motion.button
            onClick={handleClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-stone hover:text-terra transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-terra/5"
          >
            <Trash2 size={16} />
            Clear all
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="group flex gap-4 md:gap-6 bg-white border border-cream-dark rounded-2xl p-4 md:p-5 items-center hover:shadow-lg hover:border-terra/30 transition-all duration-300"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item._id}`}
                    className="flex-shrink-0 overflow-hidden rounded-xl"
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={item.images?.[0]?.url || PLACEHOLDER}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover bg-cream-dark"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item._id}`}>
                      <motion.h3
                        whileHover={{ color: '#c46c4a' }}
                        className="font-display text-base md:text-lg font-semibold text-charcoal leading-snug line-clamp-2 transition-colors"
                      >
                        {item.name}
                      </motion.h3>
                    </Link>
                    <p className="text-sm md:text-base font-bold text-terra mt-1">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Qty Controls */}
                  <div className="flex items-center border border-cream-dark rounded-xl overflow-hidden flex-shrink-0 bg-cream/50">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        item.quantity > 1
                          ? updateQty(item._id, item.quantity - 1)
                          : handleRemove(item)
                      }
                      className="w-10 h-10 flex items-center justify-center text-stone hover:bg-terra hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </motion.button>
                    <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold border-x border-cream-dark bg-white">
                      {item.quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQty(item._id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-stone hover:bg-terra hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right flex-shrink-0 min-w-[80px]">
                    <p className="text-xs text-stone mb-1">Total</p>
                    <p className="text-sm md:text-base font-bold text-charcoal">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    onClick={() => handleRemove(item)}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex-shrink-0 text-stone-light hover:text-terra transition-colors p-2 rounded-lg hover:bg-terra/10"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-cream-dark rounded-2xl p-6 lg:sticky lg:top-24 shadow-xl shadow-cream-dark/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                <Package size={20} className="text-terra" />
              </div>
              <h2 className="font-display text-xl font-bold text-charcoal">
                Order Summary
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-sm mb-6">
              <div className="flex justify-between items-center py-2 border-b border-cream-dark/50">
                <span className="text-stone">Subtotal</span>
                <span className="font-semibold text-charcoal">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-cream-dark/50">
                <span className="text-stone">Delivery</span>
                <span className="text-stone italic text-xs">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-stone">Discount</span>
                <span className="text-terra font-medium">
                  -₦0
                </span>
              </div>
            </div>

            <div className="bg-cream/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-charcoal font-semibold">Total</span>
                <span className="text-xl font-bold text-terra">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/checkout"
                className="flex items-center justify-center gap-3 bg-terra hover:bg-terra-dark text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-terra/25 hover:shadow-terra/40 w-full"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <Link
              to="/shop"
              className="mt-4 flex items-center justify-center gap-2 text-sm text-stone hover:text-terra transition-colors py-3"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-cream-dark">
              <div className="flex items-center justify-center gap-4 text-xs text-stone">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Protected
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
