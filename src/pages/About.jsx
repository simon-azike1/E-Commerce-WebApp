import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    {
      title: 'Curated Quality',
      desc: 'Every product is handpicked. We only carry items we believe in.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Personal Service',
      desc: 'Real people, real conversations. We handle every order personally.',
      color: 'from-terra to-orange-600',
    },
    {
      title: 'Fast & Reliable',
      desc: 'We move quickly and keep you informed every step of the way.',
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  const principles = [
    { title: 'Trust First', desc: 'Transparent pricing, no hidden fees' },
    { title: 'Customer Care', desc: 'Your satisfaction is our priority' },
    { title: 'Excellence', desc: 'Premium quality in every detail' },
  ];

  const testimonials = [
    {
      name: 'Adewale O.',
      role: 'Lagos',
      text: 'ShopFlow has completely changed how I shop online. The personal touch and quick responses on WhatsApp make all the difference. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Chioma N.',
      role: 'Abuja',
      text: 'I love that I can chat directly with the team before ordering. The products are exactly as described and delivery was faster than expected.',
      rating: 5,
    },
    {
      name: 'Ibrahim K.',
      role: 'Kano',
      text: 'Finally, an online store that actually cares about customer satisfaction. The quality of products is outstanding and the team is very helpful.',
      rating: 5,
    },
  ];

  const stats = [
    { value: '0+', label: 'Happy Customers' },
    { value: '0+', label: 'Products Available' },
    { value: '0.0', label: 'Average Rating' },
    { value: '24hrs', label: 'Response Time' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative border-b border-cream-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/13727d561-1849-4a01-acb5-7431f1338595.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cream/60 via-cream/50 to-cream-dark/40" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl"
          >
    
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight"
            >
              We believe in quality{' '}
              <span className="text-terra">you can trust</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-stone text-lg md:text-xl leading-relaxed"
            >
              ShopFlow started with a simple idea — make it easy for anyone to find great
              products and have them delivered with care. No complicated checkouts,
              no hidden fees. Just great products and honest service.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -bottom-10 -right-10 w-64 h-64 bg-terra/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-cream-dark">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-terra mb-1">{stat.value}</p>
                <p className="text-sm text-stone">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-0.5 bg-terra" />
                <span className="text-terra font-semibold uppercase tracking-wider text-sm">Our Mission</span>
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-cream mb-6 leading-tight">
                Quality you can feel, service you can trust
              </h2>
              
              <p className="text-stone dark:text-stone-300 leading-relaxed mb-4 text-base md:text-lg">
                We handpick every product in our catalogue to make sure it meets our
                standard for quality and value. If we wouldn't buy it ourselves, it
                doesn't make the shelf.
              </p>
              
              <p className="text-stone dark:text-stone-300 leading-relaxed mb-8 text-base md:text-lg">
                We also believe that buying should be personal. That's why every order
                is handled directly — you place your order, we reach out on WhatsApp,
                and we make sure everything gets to you exactly as expected.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 bg-terra hover:bg-terra-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-terra/25 hover:shadow-terra/40"
                >
                  Browse our products
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center h-96"
            >
              <motion.div
                className="absolute w-72 h-72 rounded-3xl bg-gradient-to-br from-terra/20 to-orange-500/20"
                animate={{ rotate: [0, 5, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute w-56 h-56 rounded-2xl bg-gradient-to-br from-cream-dark to-stone-200 shadow-xl"
                animate={{ rotate: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
              <div className="relative w-48 h-48 rounded-xl bg-white shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <motion.span
                    className="text-5xl font-bold text-terra block"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    100%
                  </motion.span>
                  <span className="text-sm text-stone font-medium">Quality Guaranteed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-charcoal py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-white/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              What we stand for
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Number Badge */}
                <span className="text-6xl font-bold text-white/5 absolute top-4 right-6">
                  0{index + 1}
                </span>
                
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-terra transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-stone-light leading-relaxed">
                    {value.desc}
                  </p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-terra to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-terra/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Our Principles
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
              Built on trust
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-cream-dark rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Number */}
                <span className="inline-block text-4xl font-bold text-terra/30 mb-4">
                  0{index + 1}
                </span>
                
                <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                  {principle.title}
                </h3>
                <p className="text-stone text-sm leading-relaxed">
                  {principle.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-terra/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
              What our customers say
            </h2>
            <p className="text-stone text-sm mt-3 max-w-lg mx-auto">
              Don't just take our word for it. Here's what our customers have to say about their experience with ShopFlow.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-cream to-white border border-cream-dark rounded-2xl p-6 md:p-8 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-terra/20">
                  <Quote size={32} className="fill-current" />
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-terra fill-terra"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-stone text-sm leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-cream-dark">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-terra to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{testimonial.name}</p>
                    <p className="text-xs text-stone">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-cream to-white border-t border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">
              Have questions about our products or services?
            </h2>
            <p className="text-stone text-base mb-8 max-w-xl mx-auto">
              Our team is available Monday to Saturday, 8am to 6pm. Reach out to us on WhatsApp or send us an email.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-terra hover:bg-terra-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-terra/25"
              >
                Browse Products
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border-2 border-terra text-terra hover:bg-terra hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
