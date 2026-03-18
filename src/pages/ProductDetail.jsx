import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Plus, Minus, Star, Truck, Shield, RotateCcw, Heart, Share2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const PLACEHOLDER = 'https://placehold.co/600x600/F0EBE1/AEA9A3?text=No+Image';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cartItem = cart.find((i) => i._id === id);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    setImageLoaded(false);
    getProduct(id)
      .then((r) => setProduct(r.data.product))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) addToCart(product);
    toast.success(`${qty} × ${product.name} added to cart`, {
      icon: <CheckCircle size={18} className="text-green-500" />,
      duration: 2000,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      duration: 1500,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard', { duration: 1500 });
  };

  /* ── Loading skeleton ── */
  if (loading) return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-5 pt-4">
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-10 w-4/5 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-14 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  /* ── Not found ── */
  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mb-6"
      >
        <ShoppingBag size={48} className="text-gray-400" />
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3"
      >
        Product not found
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-stone text-base mb-8 max-w-md"
      >
        Sorry, we couldn't find the product you're looking for. It might have been removed or doesn't exist.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-terra/25"
        >
          <ChevronLeft size={18} />
          Back to shop
        </Link>
      </motion.div>
    </div>
  );

  const images = product.images?.length > 0 ? product.images.map((i) => i.url) : [PLACEHOLDER];
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const savePct = hasDiscount ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;

  const features = [
    { icon: Truck, label: 'Free Delivery', sub: 'On orders over ₦50,000' },
    { icon: Shield, label: 'Secure Payment', sub: '100% secure transactions' },
    { icon: RotateCcw, label: 'Easy Returns', sub: '30-day return policy' },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cream/30 pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone hover:text-terra transition-colors px-4 py-2 rounded-lg hover:bg-terra/5"
          >
            <motion.span
              animate={{ x: [-3, 0, -3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronLeft size={18} />
            </motion.span>
            Back to shop
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
              </AnimatePresence>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.stock === 0 && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-charcoal/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full"
                  >
                    Out of Stock
                  </motion.span>
                )}
                {hasDiscount && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-terra text-white text-xs font-bold px-3 py-1.5 rounded-full"
                  >
                    Save {savePct}%
                  </motion.span>
                )}
                {product.featured && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
                  >
                    <Star size={12} className="fill-white" />
                    Featured
                  </motion.span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlist}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isWishlisted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:text-red-500'
                  }`}
                >
                  <Heart size={18} className={isWishlisted ? 'fill-white' : ''} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:text-terra flex items-center justify-center transition-all duration-300"
                >
                  <Share2 size={18} />
                </motion.button>
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-3 overflow-x-auto pb-2"
              >
                {images.map((url, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      i === activeImg 
                        ? 'border-terra shadow-lg shadow-terra/30' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ── Info ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Category Badge */}
            {product.category?.name && (
              <motion.div variants={itemVariants}>
                <Link
                  to={`/shop?category=${product.category._id}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-terra/10 to-orange-500/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:from-terra/20 hover:to-orange-500/20 transition-all duration-300"
                >
                  {product.category.name}
                </Link>
              </motion.div>
            )}

            {/* Title */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
                {product.name}
              </h1>
            </motion.div>

            {/* Rating */}
            {product.rating && (
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= Math.floor(product.rating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-stone">
                  {product.rating} ({product.reviewCount || 0} reviews)
                </span>
              </motion.div>
            )}

            {/* Price */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap">
              <span className="text-3xl md:text-4xl font-bold text-terra">
                ₦{product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-stone-light line-through">
                    ₦{product.comparePrice.toLocaleString()}
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.3 }}
                    className="bg-gradient-to-r from-terra to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-terra/30"
                  >
                    Save {savePct}%
                  </motion.span>
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-stone text-base leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </motion.div>

            {/* Stock Info */}
            {product.stock > 0 && product.stock <= 10 && (
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-3 rounded-xl"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CheckCircle size={18} />
                </motion.div>
                Only {product.stock} left in stock - Order soon!
              </motion.div>
            )}

            {product.stock > 10 && (
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl"
              >
                <CheckCircle size={18} />
                In Stock - Ready to ship
              </motion.div>
            )}

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center mx-auto mb-2">
                    <feature.icon size={18} className="text-terra" />
                  </div>
                  <p className="text-xs font-semibold text-charcoal">{feature.label}</p>
                  <p className="text-xs text-stone mt-0.5">{feature.sub}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Add to Cart */}
            {product.stock > 0 ? (
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                {/* Qty Selector */}
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="w-12 h-14 flex items-center justify-center text-stone hover:bg-terra hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <motion.span
                    key={qty}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-12 h-14 flex items-center justify-center text-base font-bold text-charcoal"
                  >
                    {qty}
                  </motion.span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    disabled={qty >= product.stock}
                    className="w-12 h-14 flex items-center justify-center text-stone hover:bg-terra hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-terra to-orange-600 hover:from-orange-600 hover:to-terra text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-terra/30"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                variants={itemVariants}
                disabled
                className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-500 font-semibold py-4 rounded-xl cursor-not-allowed"
              >
                <ShoppingBag size={20} />
                Out of Stock
              </motion.button>
            )}

            {/* Cart Notice */}
            {cartItem && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-stone bg-cream/50 rounded-xl px-4 py-3"
              >
                <span className="font-semibold text-terra">{cartItem.quantity}</span> of this item already in your cart.{' '}
                <Link to="/cart" className="text-terra font-semibold hover:underline">
                  View cart →
                </Link>
              </motion.p>
            )}

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex items-center gap-2 text-xs text-stone">
                <Shield size={14} className="text-terra" />
                Secure Checkout
              </div>
              <div className="flex items-center gap-2 text-xs text-stone">
                <Truck size={14} className="text-terra" />
                Fast Delivery
              </div>
              <div className="flex items-center gap-2 text-xs text-stone">
                <RotateCcw size={14} className="text-terra" />
                Easy Returns
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
