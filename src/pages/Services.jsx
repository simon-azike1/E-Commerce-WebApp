import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      image: 'https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/13a1b1685-695b-46a7-b458-671a5d6d87dd.png',
      title: 'Home Delivery',
      desc: 'We deliver straight to your door. After you place your order, we arrange delivery with a trusted rider and keep you updated on WhatsApp.',
      features: ['Same-day dispatch', 'Real-time tracking', 'Secure packaging'],
      color: 'from-terra to-orange-600',
    },
    {
      image: 'https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/1d4ab64af-ffc1-4dd0-b361-e858e5fce22f.png',
      title: 'Quality Guarantee',
      desc: 'Every product in our store is personally vetted. If an item doesn\'t meet your expectation, we make it right — no questions asked.',
      features: ['Handpicked items', 'Quality checked', '100% satisfaction'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      image: 'https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/1cfec6121-bef3-4e31-9655-af0cb1dae7e6.png',
      title: 'Easy Returns',
      desc: 'Changed your mind? We offer a hassle-free return process. Reach out on WhatsApp within 48 hours of receiving your order.',
      features: ['48-hour window', 'Free return pickup', 'Full refund'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      image: 'https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/10475cac6-501f-4b16-bc9e-79030733fc5d.png',
      title: 'WhatsApp Support',
      desc: 'Get real-time support directly on WhatsApp. Our team is available Monday to Saturday, 8am to 6pm to answer any questions.',
      features: ['Fast response', 'Personal assistance', 'Order updates'],
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const steps = [
    { step: '01', title: 'Browse', desc: 'Find what you love in our curated catalogue.' },
    { step: '02', title: 'Add to Cart', desc: 'Select your items and quantities.' },
    { step: '03', title: 'Place Order', desc: 'Submit your order — no payment needed upfront.' },
    { step: '04', title: 'We Confirm', desc: 'We reach out on WhatsApp to confirm and arrange delivery.' },
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
    <div className="min-h-screen bg-gradient-to-b from-white to-cream/30">
      {/* Hero Section with Video Background */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden border-b border-cream-dark">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/1a2b3c4d5-e6f7-8g9h-0i1j-2k3l4m5n6o7p.png"
        >
          <source src="https://www.pexels.com/download/video/6649434/" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3750284/3750284-hd_1920_1080_25fps.webm" type="video/webm" />
        </video>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream/90 via-cream/80 to-white/85" />
        
        {/* Additional Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

        {/* Decorative Animated Elements */}
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

        {/* Hero Content */}
        <div className="relative h-full max-w-6xl mx-auto px-4 md:px-6 flex items-center mt-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight"
            >
              Services built{' '}
              <span className="text-terra">around you</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-stone text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              From the moment you browse to the moment your order arrives, we've
              got you covered with services designed to make shopping easy and stress-free.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-cream-dark/50"
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-terra" />
                <span className="text-sm text-stone">Trusted by 0+ customers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-terra" />
                <span className="text-sm text-stone">Fast response time</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-terra fill-terra" />
                <span className="text-sm text-stone">4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

    
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-terra/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Our Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
              Everything you need for a{' '}
              <span className="text-terra">great experience</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map(({ image, title, desc, features, color }, index) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-terra/30 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`} />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                      {title}
                    </h3>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <p className="text-stone text-sm md:text-base leading-relaxed mb-6">
                    {desc}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2">
                    {features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center gap-2 text-sm text-stone"
                      >
                        <CheckCircle size={14} className="text-terra flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative bg-gradient-to-br from-charcoal to-stone-900 py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border border-white rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block bg-white/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              How it works
            </h2>
            <p className="text-stone-light text-sm mt-3 max-w-lg mx-auto">
              Getting your order is as easy as 1-2-3-4. Here's what to expect.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {steps.map(({ step, title, desc }, index) => (
              <motion.div
                key={step}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="relative text-center group"
              >
                {/* Step Number Circle */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-terra/20 group-hover:border-terra/30 transition-all duration-300">
                    <span className="text-3xl font-bold text-terra/60 group-hover:text-terra transition-colors">
                      {step}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-stone-light text-sm leading-relaxed">{desc}</p>

                {/* Connector Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-terra/50 to-transparent -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-terra/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
              The ShopFlow difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Personal Touch',
                desc: 'Every order is handled by real people who care about your satisfaction.',
                stat: '100%',
                statLabel: 'Personal handling',
              },
              {
                title: 'Fast Communication',
                desc: 'We respond quickly on WhatsApp to keep you informed every step of the way.',
                stat: '< 1hr',
                statLabel: 'Avg. response time',
              },
              {
                title: 'Trusted Quality',
                desc: 'We only stock products we believe in and would use ourselves.',
                stat: '4.9/5',
                statLabel: 'Customer rating',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-cream to-white border border-gray-200 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <p className="text-3xl md:text-4xl font-bold text-terra mb-2">{item.stat}</p>
                <p className="text-xs text-stone uppercase tracking-wider mb-4">{item.statLabel}</p>
                <h3 className="font-semibold text-charcoal text-lg mb-2">{item.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/2b3c4d5e6-f7g8-9h0i-1j2k-3l4m5n6o7p8q.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-terra/95 via-orange-600/90 to-terra-dark/95" />
        
        {/* Decorative Elements */}
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

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to shop?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Browse our catalogue and place your first order today. Experience the difference of shopping with care.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-white text-terra font-semibold px-8 md:px-10 py-4 rounded-xl hover:bg-cream transition-all duration-300 shadow-lg shadow-black/20"
              >
                Go to Shop
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>

            {/* Additional Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-white/20">
              <Link to="/contact" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                Chat with us
              </Link>
              <Link to="/about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                Learn more about us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
