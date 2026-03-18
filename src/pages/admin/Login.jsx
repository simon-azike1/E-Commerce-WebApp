import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { adminLogin } from '../../api/index';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, LogIn, ShieldCheck, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await adminLogin(form);
      if (data.user.role !== 'admin') {
        toast.error('Access denied — admin only');
        return;
      }
      login(data.user, data.accessToken);
      toast.success(`Welcome back, ${data.user.name}`);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

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
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          
          
        
        </motion.div>

        {/* Login Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h2>
            <p className="text-sm text-gray-500">Please enter your credentials to continue</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                <Mail size={14} />
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="admin@shopflow.com"
                  className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 bg-white"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                <Lock size={14} />
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => set('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-12 pr-12 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 bg-white"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => set('remember', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30"
            >
              {loading ? (
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
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Security Notice */}
          <motion.div
            variants={itemVariants}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={14} className="text-green-500" />
              <span>Secure 256-bit encrypted connection</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CheckCircle size={14} className="text-green-500" />
            Admin Access Only
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck size={14} className="text-blue-500" />
            SSL Secured
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="text-center text-xs text-gray-500 mt-8"
        >
          ShopFlow Admin Panel © {new Date().getFullYear()} • All rights reserved
        </motion.p>
      </motion.div>
    </div>
  );
}
