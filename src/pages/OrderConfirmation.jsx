import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, ShoppingBag, ArrowRight, Package, Truck, Store } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderConfirmationPage() {
  const { state } = useLocation();

  // Guard: if someone navigates here directly with no state, redirect to shop
  if (!state?.orderNumber) return <Navigate to="/shop" replace />;

  const { orderNumber, total, waLink, fulfillmentType } = state;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-gradient-to-br from-cream via-white to-cream-dark relative overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-terra/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl w-full relative z-10"
      >
        {/* Success Icon with Animation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Animated Rings */}
            <motion.div
              className="absolute inset-0 w-24 h-24 bg-green-500/20 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 w-24 h-24 bg-green-500/10 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Main Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring', delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30"
            >
              <CheckCircle size={44} className="text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3">
            Order <span className="text-terra">Confirmed!</span>
          </h1>
          <p className="text-stone text-base leading-relaxed">
            Your order{' '}
            <span className="inline-flex items-center gap-2 bg-cream-dark px-4 py-1.5 rounded-full font-semibold text-charcoal">
              #{orderNumber}
            </span>{' '}
            has been received
          </p>
          <p className="text-stone text-lg mt-4">
            Total:{' '}
            <span className="font-bold text-terra text-xl">
              ₦{total?.toLocaleString()}
            </span>
          </p>
        </motion.div>

        {/* Order Type Badge */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-cream-dark px-5 py-2.5 rounded-full text-sm">
            {fulfillmentType === 'delivery' ? (
              <>
                <Truck size={16} className="text-terra" />
                <span className="text-stone">Delivery to your address</span>
              </>
            ) : (
              <>
                <Store size={16} className="text-terra" />
                <span className="text-stone">Pick up from our store</span>
              </>
            )}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-200 rounded-2xl p-6 mb-8 text-left shadow-lg shadow-green-500/5"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-green-800 font-semibold mb-2">What happens next?</h3>
              <p className="text-sm text-green-700 leading-relaxed">
                Tap the button below to open WhatsApp — your order details will be pre-filled 
                and sent directly to the seller. They will confirm your order, discuss{' '}
                <span className="font-semibold">
                  {fulfillmentType === 'delivery' ? 'delivery' : 'pickup'}
                </span>{' '}
                details, and arrange payment with you.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-cream-dark rounded-2xl p-6 mb-8"
        >
          <h3 className="font-semibold text-charcoal mb-4 text-center">Order Process</h3>
          <div className="flex items-center justify-between gap-2">
            {[
              { step: 1, label: 'Order Placed', done: true },
              { step: 2, label: 'WhatsApp', done: false },
              { step: 3, label: 'Payment', done: false },
              { step: 4, label: 'Delivery', done: false },
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col items-center flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    item.done
                      ? 'bg-green-500 text-white'
                      : 'bg-cream-dark text-stone'
                  }`}
                >
                  {item.done ? <CheckCircle size={14} /> : item.step}
                </motion.div>
                <p className="text-xs text-stone mt-2 text-center">{item.label}</p>
                {index < 3 && (
                  <div className="absolute w-16 h-px bg-cream-dark -mt-4 ml-10" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* WhatsApp CTA Button */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#17a851] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 w-full mb-4"
          >
            <MessageCircle size={20} />
            Open WhatsApp to Confirm Order
            <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xs text-stone text-center mb-8"
        >
          WhatsApp will open in a new tab. If it doesn't open, copy the link and paste it in WhatsApp.
        </motion.p>

        {/* Secondary Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 border border-cream-dark hover:border-terra hover:bg-terra/5 text-stone hover:text-terra text-sm font-medium px-6 py-3 rounded-xl transition-all duration-300"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 border border-cream-dark hover:border-terra hover:bg-terra/5 text-stone hover:text-terra text-sm font-medium px-6 py-3 rounded-xl transition-all duration-300"
          >
            <MessageCircle size={16} />
            Need Help?
          </Link>
        </motion.div>

        {/* Support Info */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-cream-dark text-center"
        >
          <p className="text-xs text-stone">
            Need assistance? Contact us at{' '}
            <a href="mailto:hello@shopflow.com" className="text-terra hover:underline">
              hello@shopflow.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
