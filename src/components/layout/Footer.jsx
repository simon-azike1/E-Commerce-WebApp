import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const quickLinks = [
    ['/', 'Home'],
    ['/shop', 'Shop'],
    ['/services', 'Services'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
    ['/cart', 'Cart'],
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@shopflow.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: '123 Commerce St, NY 10001' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className="bg-charcoal text-stone-light mt-auto"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <div className="font-display text-xl font-bold text-white flex items-center gap-2 group">
                <motion.span
                  className="text-terra"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  ●
                </motion.span>
                <motion.span
                  className="group-hover:text-terra transition-colors duration-300"
                  whileHover={{ x: 3 }}
                >
                  ShopFlow
                </motion.span>
              </div>
            </Link>
            <motion.p
              className="text-sm mt-3 text-stone-light max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Quality products, delivered with care. Your trusted partner for premium shopping experiences.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-stone-light hover:bg-terra hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-terra rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(([to, label], index) => (
                <motion.li
                  key={to}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={to}
                    className="text-sm text-stone-light hover:text-terra transition-all duration-300 flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-0 h-0.5 bg-terra group-hover:w-4 transition-all duration-300"
                      whileHover={{ width: 16 }}
                    />
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-terra rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={item.text}
                  className="flex items-start gap-3 text-sm text-stone-light"
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="text-terra flex-shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <item.icon size={16} />
                  </motion.div>
                  <span className="hover:text-white transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
         
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-stone-light">
            © {new Date().getFullYear()} ShopFlow. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-stone-light hover:text-terra transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
