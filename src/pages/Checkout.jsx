import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Store, MessageCircle, User, Phone, Mail, Package, Truck, CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { placeOrder } from '../api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    fulfillmentType: 'pickup',
    street: '',
    city: '',
    state: '',
    notes: '',
    customerNote: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.fulfillmentType === 'delivery' && !formData.street.trim()) {
      newErrors.street = 'Street address is required for delivery';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors above');
      // Scroll to first error
      const firstError = document.querySelector('.input-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        customer: { 
          name: formData.name.trim(), 
          phone: formData.phone.trim(), 
          email: formData.email.trim() 
        },
        items: cart.map((item) => ({ productId: item._id, quantity: item.quantity })),
        fulfillmentType: formData.fulfillmentType,
        deliveryAddress: formData.fulfillmentType === 'delivery'
          ? { 
              street: formData.street.trim(), 
              city: formData.city.trim(), 
              state: formData.state.trim(), 
              notes: formData.notes.trim() 
            }
          : undefined,
        customerNote: formData.customerNote.trim(),
      };

      const { data } = await placeOrder(payload);
      clearCart();

      navigate('/order-confirmation', {
        state: {
          orderNumber: data.order.orderNumber,
          total: data.order.total,
          waLink: data.waLink,
          fulfillmentType: data.order.fulfillmentType,
        },
      });

      toast.success('Order placed successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Input Component
  const InputField = ({ icon: Icon, label, sublabel, type, value, onChange, placeholder, error, name }) => (
    <motion.div variants={itemVariants}>
      <label className="block text-xs font-semibold text-stone mb-2">
        {label}
        {sublabel && <span className="text-stone-light font-normal ml-1">{sublabel}</span>}
      </label>
      <div className="relative">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-stone-light'}`}>
          <Icon size={18} />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border rounded-xl pl-12 pr-12 py-3 text-sm text-charcoal bg-white outline-none transition-all duration-300 ${
            error 
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 input-error' 
              : 'border-cream-dark focus:border-terra focus:ring-2 focus:ring-terra/20'
          }`}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle size={16} />
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-500 mt-1.5 ml-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );

  // Empty State
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-24 h-24 rounded-2xl bg-cream-dark flex items-center justify-center"
        >
          <Package size={48} className="text-stone" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">
            Your cart is empty
          </h2>
          <p className="text-stone text-base">
            Add some products before checking out.
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
            className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-terra/25"
          >
            <ChevronLeft size={18} className="rotate-180" />
            Back to shop
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 pb-24 bg-gradient-to-b from-cream to-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone hover:text-terra transition-colors px-4 py-2 rounded-lg hover:bg-terra/5"
          >
            <motion.div
              animate={{ x: [-3, 0, -3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronLeft size={18} />
            </motion.div>
            Back to cart
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
            Secure Checkout
          </h1>
          <p className="text-stone text-sm">
            Complete your order in a few simple steps
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" noValidate>
          {/* Left: Form Fields */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact Details */}
            <motion.div variants={itemVariants} className="bg-white border border-cream-dark rounded-2xl p-6 shadow-lg shadow-cream-dark/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                  <User size={20} className="text-terra" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-charcoal">
                    Contact Details
                  </h2>
                  <p className="text-xs text-stone">We'll use this to reach you about your order</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  icon={User}
                  label="Full name"
                  sublabel="(required)"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  placeholder="Ada Johnson"
                  error={errors.name}
                />
                <InputField
                  icon={Phone}
                  label="Phone number"
                  sublabel="(required)"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  placeholder="08012345678"
                  error={errors.phone}
                />
                <div className="sm:col-span-2">
                  <InputField
                    icon={Mail}
                    label="Email address"
                    sublabel="(optional)"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    placeholder="ada@example.com"
                    error={errors.email}
                  />
                </div>
              </div>
            </motion.div>

            {/* Fulfillment Type */}
            <motion.div variants={itemVariants} className="bg-white border border-cream-dark rounded-2xl p-6 shadow-lg shadow-cream-dark/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                  <Package size={20} className="text-terra" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-charcoal">
                    Delivery Method
                  </h2>
                  <p className="text-xs text-stone">Choose how you want to receive your order</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: 'pickup', label: 'Pick Up', sub: 'Collect from our store', Icon: Store },
                  { value: 'delivery', label: 'Delivery', sub: 'Delivered to your address', Icon: Truck },
                ].map(({ value, label, sub, Icon }) => (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => handleInputChange('fulfillmentType', value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                      formData.fulfillmentType === value
                        ? 'border-terra bg-gradient-to-br from-terra/10 to-orange-500/5 shadow-md shadow-terra/10'
                        : 'border-cream-dark hover:border-stone-light hover:bg-cream/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      formData.fulfillmentType === value ? 'bg-terra text-white' : 'bg-cream-dark text-stone'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${formData.fulfillmentType === value ? 'text-terra' : 'text-charcoal'}`}>
                        {label}
                      </p>
                      <p className="text-xs text-stone mt-1">{sub}</p>
                    </div>
                    {formData.fulfillmentType === value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-terra rounded-full flex items-center justify-center"
                      >
                        <CheckCircle size={14} className="text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Delivery Address */}
            <AnimatePresence>
              {formData.fulfillmentType === 'delivery' && (
                <motion.div
                  variants={itemVariants}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-lg shadow-cream-dark/5">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                        <MapPin size={20} className="text-terra" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-semibold text-charcoal">
                          Delivery Address
                        </h2>
                        <p className="text-xs text-stone">Where should we deliver your order?</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <InputField
                        icon={MapPin}
                        label="Street address"
                        sublabel="(required)"
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={(value) => handleInputChange('street', value)}
                        placeholder="12 Awolowo Road"
                        error={errors.street}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                          icon={Store}
                          label="City"
                          sublabel="(optional)"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={(value) => handleInputChange('city', value)}
                          placeholder="Lagos"
                          error={errors.city}
                        />
                        <InputField
                          icon={MapPin}
                          label="State"
                          sublabel="(optional)"
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={(value) => handleInputChange('state', value)}
                          placeholder="Lagos State"
                          error={errors.state}
                        />
                      </div>
                      <InputField
                        icon={MessageCircle}
                        label="Landmark / Notes"
                        sublabel="(optional)"
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={(value) => handleInputChange('notes', value)}
                        placeholder="Near the Total filling station"
                        error={errors.notes}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Order Note */}
            <motion.div variants={itemVariants} className="bg-white border border-cream-dark rounded-2xl p-6 shadow-lg shadow-cream-dark/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                  <MessageCircle size={20} className="text-terra" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-charcoal">
                    Note to Seller
                  </h2>
                  <p className="text-xs text-stone">Any special instructions? (optional)</p>
                </div>
              </div>
              <textarea
                value={formData.customerNote}
                onChange={(e) => handleInputChange('customerNote', e.target.value)}
                placeholder="Size preferences, color choices, delivery instructions..."
                rows={4}
                className="w-full border border-cream-dark focus:border-terra focus:ring-2 focus:ring-terra/20 rounded-xl px-4 py-3 text-sm text-charcoal bg-white outline-none transition-all duration-300 resize-none"
              />
            </motion.div>
          </motion.div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-cream-dark rounded-2xl p-6 lg:sticky lg:top-24 shadow-xl shadow-cream-dark/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                <CreditCard size={20} className="text-terra" />
              </div>
              <h2 className="font-display text-xl font-bold text-charcoal">
                Order Summary
              </h2>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-3 mb-6 max-h-64 overflow-y-auto pr-2">
              {cart.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between items-center gap-3 py-2 border-b border-cream-dark/50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-charcoal line-clamp-1">{item.name}</p>
                    <p className="text-xs text-stone">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-charcoal flex-shrink-0">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Totals */}
            <div className="bg-cream/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone text-sm">Subtotal</span>
                <span className="text-charcoal font-medium">₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone text-sm">Delivery</span>
                <span className="text-stone text-xs italic">Calculated later</span>
              </div>
              <hr className="border-cream-dark my-3" />
              <div className="flex justify-between items-center">
                <span className="text-charcoal font-semibold">Total</span>
                <span className="text-xl font-bold text-terra">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              {submitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </motion.div>
                  Placing order...
                </>
              ) : (
                <>
                  <MessageCircle size={20} />
                  Place Order via WhatsApp
                </>
              )}
            </motion.button>

            {/* Info Text */}
            <p className="text-xs text-stone mt-4 text-center leading-relaxed">
              You'll be redirected to WhatsApp to complete your order with our team.
            </p>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-cream-dark">
              <div className="flex items-center justify-center gap-4 text-xs text-stone">
                <div className="flex items-center gap-1.5">
                  <Shield size={14} className="text-terra" />
                  Secure
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-terra" />
                  Verified
                </div>
                <div className="flex items-center gap-1.5">
                  <Package size={14} className="text-terra" />
                  Tracked
                </div>
              </div>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
