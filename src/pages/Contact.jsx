import { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Send, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setSubmitting(true);
    const text =
      `Hi, my name is ${form.name}.\n` +
      (form.email ? `Email: ${form.email}\n` : '') +
      (form.phone ? `Phone: ${form.phone}\n` : '') +
      `\n${form.message}`;

    const number = import.meta.env.VITE_STORE_WHATSAPP || '';
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitting(false);
  };

  const contactMethods = [
    {
      Icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with us directly',
      sub: 'Fastest way to reach us',
      color: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50',
      iconBg: 'bg-green-500',
    },
    {
      Icon: Phone,
      label: 'Phone',
      value: '+234 801 234 5678',
      sub: 'Mon – Sat, 8am – 6pm',
      color: 'from-terra to-orange-600',
      bg: 'bg-orange-50',
      iconBg: 'bg-terra',
    },
    {
      Icon: Mail,
      label: 'Email',
      value: 'hello@shopflow.com',
      sub: 'We reply within 24 hours',
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-500',
    },
    {
      Icon: MapPin,
      label: 'Location',
      value: 'Lagos, Nigeria',
      sub: 'Pickup available by appointment',
      color: 'from-purple-500 to-pink-600',
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-500',
    },
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
    <div className="min-h-screen pb-24 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed"
        style={{
          backgroundImage: `url('https://image.qwenlm.ai/public_source/935f14cc-2e32-47a3-aa1c-155d854ae63a/17175d753-8a7f-4c9e-b9c2-8f3e4d5a6b7c.png')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-cream/90 via-cream/85 to-white/90 fixed" />
      
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4 leading-tight"
          >
            We'd love to hear{' '}
            <span className="text-terra">from you</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-stone text-lg leading-relaxed max-w-xl"
          >
            Have a question about a product, an order, or just want to say hello?
            Reach out — we respond fast and personally.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {contactMethods.map(({ Icon, label, value, sub, color, bg, iconBg }, index) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ x: 8, scale: 1.02 }}
                className="group flex items-start gap-5 p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-cream-dark hover:border-terra/30 hover:shadow-lg hover:shadow-terra/10 transition-all duration-300"
              >
                <motion.div
                  className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone mb-1">
                    {label}
                  </p>
                  <p className="font-semibold text-charcoal text-base">{value}</p>
                  <p className="text-stone text-sm mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    {sub}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Additional Info Card */}
            <motion.div
              variants={itemVariants}
              className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-terra to-orange-600 text-white shadow-xl shadow-terra/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-2">
                    Quick Response Guaranteed
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    We typically respond within 1-2 hours during business hours. 
                    For urgent inquiries, WhatsApp is the fastest way to reach us.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleWhatsApp}
              className="bg-white/90 backdrop-blur-sm border border-cream-dark rounded-3xl p-8 md:p-10 flex flex-col gap-6 shadow-2xl shadow-cream-dark/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                  <Send size={20} className="text-terra" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-charcoal">
                    Send us a message
                  </h2>
                  <p className="text-xs text-stone">We'll get back to you shortly</p>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-stone mb-2">
                  Full name <span className="text-terra">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-light">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Ada Johnson"
                    className="w-full border border-cream-dark focus:border-terra focus:ring-2 focus:ring-terra/20 rounded-xl pl-12 pr-4 py-3 text-sm text-charcoal bg-white outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone mb-2">
                    Phone <span className="text-stone-light font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-light">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="08012345678"
                      className="w-full border border-cream-dark focus:border-terra focus:ring-2 focus:ring-terra/20 rounded-xl pl-12 pr-4 py-3 text-sm text-charcoal bg-white outline-none transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone mb-2">
                    Email <span className="text-stone-light font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-light">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="ada@example.com"
                      className="w-full border border-cream-dark focus:border-terra focus:ring-2 focus:ring-terra/20 rounded-xl pl-12 pr-4 py-3 text-sm text-charcoal bg-white outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-stone mb-2">
                  Message <span className="text-terra">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Tell us what you need help with..."
                  className="w-full border border-cream-dark focus:border-terra focus:ring-2 focus:ring-terra/20 rounded-xl px-4 py-3 text-sm text-charcoal bg-white outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#17a851] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25"
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
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <MessageCircle size={20} />
                    Send via WhatsApp
                  </>
                )}
              </motion.button>

              <p className="text-xs text-stone text-center">
                By clicking send, you agree to our{' '}
                <a href="#" className="text-terra hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-terra hover:underline">Privacy Policy</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-terra/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}
