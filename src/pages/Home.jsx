import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, MessageCircle, RotateCcw, Star, Sparkles, TrendingUp, Package , CheckCircle} from 'lucide-react';
import { motion } from 'framer-motion';
import { getProducts, getCategories } from '../api';
import ProductCard, { ProductCardSkeleton } from '../components/ui/ProductCard';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts({ featured: true, limit: 4 }), getCategories()])
      .then(([pRes, cRes]) => {
        setFeatured(pRes.data.products);
        setCategories(cRes.data.categories);
      })
      .finally(() => setLoading(false));
  }, []);

  const trustItems = [
    { icon: Shield, label: 'Trusted Seller', sub: 'Verified & reviewed', color: 'from-blue-500 to-cyan-500' },
    { icon: Truck, label: 'Fast Dispatch', sub: 'Orders sent same day', color: 'from-terra to-orange-500' },
    { icon: MessageCircle, label: 'WhatsApp Support', sub: 'Chat with us directly', color: 'from-green-500 to-emerald-500' },
    { icon: RotateCcw, label: 'Easy Returns', sub: 'Hassle-free process', color: 'from-purple-500 to-pink-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative border-b border-cream-dark overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/149cc1886-1b28-4c1c-88fa-ef4dba31dfdc.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cream/80 via-cream/70 to-white/85" />
        
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-terra/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-display text-5xl md:text-6xl lg:text-4xl font-bold text-charcoal mb-6 leading-tight"
              >
                Shop what <motion.span className="inline-block text-terra" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>moves</motion.span> you
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-stone text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
              >
                Handpicked products, fair prices, and delivery right to your door. 
                Discover quality that speaks for itself.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-terra to-orange-600 hover:from-orange-600 hover:to-terra text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-terra/30"
                  >
                    Browse the shop
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border-2 border-cream-dark hover:border-terra text-charcoal hover:text-terra font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    Learn more
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex gap-8 mt-10 pt-8 border-t border-cream-dark/50"
              >
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-charcoal">0+</p>
                  <p className="text-sm text-stone">Products</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-charcoal">0+</p>
                  <p className="text-sm text-stone">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-charcoal">0</p>
                  <p className="text-sm text-stone flex items-center gap-1">
                    Rating <Star size={14} className="text-terra fill-terra" />
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual - Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex items-center justify-center h-96 relative"
            >
              <motion.div
                className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-terra/20 to-orange-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-64 h-64 rounded-3xl border-2 border-terra/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-48 h-48 rounded-2xl bg-white/90 backdrop-blur-sm shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative w-40 h-40 rounded-xl bg-white shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Package size={48} className="text-terra mx-auto mb-2" />
                  <span className="text-xs text-stone font-medium">Quality Products</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories Section ── */}
      {categories.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-cream/30">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-10"
            >
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
                  Shop by category
                </h2>
                <p className="text-stone text-sm">Find exactly what you're looking for</p>
              </div>
              <Link
                to="/shop"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-terra hover:text-terra-dark transition-colors"
              >
                View all categories <ArrowRight size={16} />
              </Link>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {categories.map((cat, index) => (
                <motion.div key={cat._id} variants={itemVariants}>
                  <Link
                    to={`/shop?category=${cat._id}`}
                    className="group flex items-center gap-4 bg-white border border-cream-dark hover:border-terra rounded-2xl px-5 py-4 text-sm font-medium text-charcoal hover:text-terra transition-all duration-300 hover:shadow-lg hover:shadow-terra/10 hover:-translate-y-1"
                  >
                    {cat.image && (
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        src={cat.image}
                        alt={cat.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-cream-dark"
                      />
                    )}
                    <span className="flex-1">{cat.name}</span>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={16} className="text-terra" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Featured Products Section ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-terra" />
                <span className="text-xs font-bold uppercase tracking-widest text-terra">Featured Picks</span>
              </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-cream">
                  Handpicked for you
                </h2>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-2 text-sm font-medium text-stone hover:text-terra transition-colors group"
            >
              View all products
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featured.length > 0
              ? featured.map((p, index) => (
                  <motion.div key={p._id} variants={itemVariants} custom={index}>
                    <ProductCard product={p} />
                  </motion.div>
                ))
              : (
                <div className="col-span-4 text-center py-16 bg-cream/50 rounded-2xl">
                  <Package size={48} className="text-stone-light mx-auto mb-4" />
                  <p className="text-stone mb-4">No featured products yet.</p>
                  <Link to="/shop" className="text-terra font-semibold hover:underline">
                    Browse all products →
                  </Link>
                </div>
              )
            }
          </motion.div>
        </div>
      </section>

      {/* ── Trust Strip Section ── */}
<section className="bg-gradient-to-br from-charcoal to-stone-900 py-16 md:py-20">
  <div className="max-w-6xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="inline-block bg-white/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4"
      >
        Our Promise
      </motion.span>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
        Why shop with us?
      </h2>
      <p className="text-stone-light text-sm max-w-lg mx-auto">
        We're committed to providing the best shopping experience
      </p>
    </motion.div>
    
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
    >
      {trustItems.map((item, index) => (
        <motion.div
          key={item.label}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-terra/30 transition-all duration-300"
        >
          {/* Number Badge */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-5xl font-bold text-white/10 group-hover:text-terra/20 transition-colors duration-300 absolute top-4 right-6"
          >
            0{index + 1}
          </motion.span>
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-terra transition-colors duration-300">
              {item.label}
            </h3>
            <p className="text-stone-light text-sm leading-relaxed">
              {item.sub}
            </p>
          </div>
          
          {/* Bottom Accent Line */}
          <motion.div
            className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-terra to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      ))}
    </motion.div>

    {/* Divider */}
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-24 h-px bg-gradient-to-r from-transparent via-terra to-transparent mx-auto mt-12"
    />
  </div>
</section>


      {/* ── CTA Section ── */}
<section className="py-16 md:py-20 relative overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url('https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/1b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e.png')`,
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-br from-terra/95 via-orange-600/90 to-terra-dark/95" />
  
  {/* Animated Background Elements */}
  <motion.div
    className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  />
  <motion.div
    className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300/10 rounded-full blur-2xl"
    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
  />
  <motion.div
    className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/10 rounded-full blur-xl"
    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
  />

  {/* Decorative Shapes */}
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute -top-20 -right-20 w-64 h-64 border-2 border-white/10 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute -bottom-16 -left-16 w-48 h-48 border-2 border-white/10 rounded-3xl"
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
    />
  </div>

  <div className="relative max-w-5xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
    >
      {/* Left Content */}
      <div className="text-white">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
        >
          Don't miss out on{' '}
          <span className="text-yellow-300">exclusive deals</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-white/90 text-lg mb-8 leading-relaxed"
        >
          Join thousands of satisfied customers who trust ShopFlow for quality products 
          and exceptional service. Your perfect find is just a click away.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {['Free Delivery', 'Secure Payment', '24/7 Support'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm"
            >
              <CheckCircle size={14} className="text-yellow-300" />
              {item}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-terra font-semibold px-8 py-4 rounded-xl hover:bg-cream transition-all duration-300 shadow-lg shadow-black/20"
            >
              Start Shopping Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-300"
            >
              <MessageCircle size={20} />
              Chat with Us
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="hidden lg:flex items-center justify-center relative"
      >
        {/* Card Stack Visual */}
        <div className="relative w-72 h-80">
          {/* Back Card */}
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30"
          />
          
          {/* Middle Card */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 translate-x-4 translate-y-4"
          />
          
          {/* Front Card */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terra to-orange-500 flex items-center justify-center">
                <Package size={24} className="text-white" />
              </div>
              <div>
                <p className="text-charcoal font-semibold text-sm">Your Order</p>
                <p className="text-stone text-xs">Ready to ship</p>
              </div>
            </div>
            
            <div className="flex-1 bg-cream/50 rounded-xl p-4 mb-4">
              <div className="space-y-2">
                <div className="h-2 bg-cream-dark rounded-full w-full" />
                <div className="h-2 bg-cream-dark rounded-full w-3/4" />
                <div className="h-2 bg-cream-dark rounded-full w-1/2" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-stone">Total</p>
                <p className="text-lg font-bold text-terra">₦24,500</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle size={20} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  </div>
</section>

    </div>
  );
}
