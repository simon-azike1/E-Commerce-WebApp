import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Tag, LogOut, Menu, X, User, ChevronRight, Bell, Settings, HelpCircle, ChevronDown, Home, LogIn, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', color: 'from-blue-500 to-cyan-500', activeColor: 'bg-blue-500' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders', color: 'from-terra to-orange-500', activeColor: 'bg-terra' },
  { to: '/admin/products', icon: Package, label: 'Products', color: 'from-purple-500 to-pink-500', activeColor: 'bg-purple-500' },
  { to: '/admin/categories', icon: Tag, label: 'Categories', color: 'from-green-500 to-emerald-500', activeColor: 'bg-green-500' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics', color: 'from-orange-500 to-amber-500', activeColor: 'bg-orange-500' },
];

const bottomNavItems = [
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/help', icon: HelpCircle, label: 'Help & Support' },
];

export default function Sidebar() {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowLogoutConfirm(false);
    setOpen(false);
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map(({ to, icon: Icon, label, color, activeColor }, index) => {
        const active = location.pathname === to;
        return (
          <motion.div
            key={to}
            initial={mobile ? { opacity: 0, x: -20 } : {}}
            animate={mobile ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={to}
              onClick={() => {
                if (mobile) setOpen(false);
              }}
              className={`group relative flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                active
                  ? `${activeColor} text-white shadow-lg`
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                />
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                active
                  ? 'bg-white/20'
                  : `bg-gradient-to-br ${color} text-white opacity-80 group-hover:opacity-100`
              }`}>
                <Icon size={20} />
              </div>
              <span className={`${collapsed && !mobile ? 'hidden' : 'flex-1'} whitespace-nowrap`}>{label}</span>
            </Link>
          </motion.div>
        );
      })}
    </>
  );

  const userInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -280, opacity: 0 },
  };

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`hidden md:flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-r border-gray-100 dark:border-gray-700 py-6 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-3 px-4 mb-8 ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C4602A] to-[#E8845A] flex items-center justify-center shadow-lg shadow-terra/30 flex-shrink-0">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden"
            >
              <span className="font-bold text-gray-900 dark:text-white text-xl block whitespace-nowrap font-display">ShopFlow</span>
              <span className="text-xs text-[#C4602A] dark:text-[#E8845A] font-medium whitespace-nowrap">
                Admin Dashboard
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 mb-4 mx-auto transition-colors"
        >
          <ChevronRight size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 mb-2"
            >
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Menu</p>
            </motion.div>
          )}
          <NavLinks />
        </nav>

        {/* Bottom Navigation */}
        {!collapsed && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="px-4 mb-2"
            >
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</p>
            </motion.div>
            {bottomNavItems.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* User Profile + Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`border-t border-gray-200 pt-4 mt-4 ${collapsed ? 'px-2' : ''}`}
        >
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-4'} mb-4`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">
              {userInitials}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'admin@shopflow.com'}
                </p>
              </div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowLogoutConfirm(true)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ${
              collapsed ? 'justify-center' : 'w-full px-4'
            }`}
          >
            <LogOut size={18} />
            {!collapsed && 'Logout'}
          </motion.button>
        </motion.div>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              onClick={() => setShowLogoutConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <LogOut size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                  Logout Confirmation
                </h3>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Are you sure you want to logout? You'll need to sign in again to access the admin panel.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-red-700 transition-colors shadow-lg shadow-red-500/30"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* ── Mobile Top Bar ── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold">●</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 text-sm block">ShopFlow</span>
              <span className="text-[10px] text-gray-500">Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen((v) => !v)}
              className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-2 py-2 shadow-lg"
      >
        <div className="flex items-center justify-around">
          {navItems.map(({ to, icon: Icon, label, color }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  active
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  active
                    ? `bg-gradient-to-br ${color} shadow-lg`
                    : 'bg-gray-100'
                }`}>
                  <Icon size={20} className={active ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className="text-[10px] font-medium whitespace-nowrap">{label}</span>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto pb-20"
            >
              <div className="flex flex-col h-full p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <span className="text-white font-bold">●</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white block">ShopFlow</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</span>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Welcome back!</p>
                      <p className="text-xs text-gray-500">{user?.name || 'Admin'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Online
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 flex-1">
                  <div className="px-3 mb-2">
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Menu</p>
                  </div>
                  <NavLinks mobile />
                </nav>

                {/* Bottom Navigation */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="px-3 mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</p>
                  </div>
                  {bottomNavItems.map(({ to, icon: Icon, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Icon size={18} />
                      {label}
                    </Link>
                  ))}
                </div>

                {/* User Profile + Logout */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex items-center gap-3 px-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {userInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || 'admin@shopflow.com'}
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Logout Confirmation */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <LogOut size={28} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Logout Confirmation
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to logout? You'll need to sign in again to access the admin panel.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-red-700 transition-colors shadow-lg shadow-red-500/30"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for mobile fixed header/footer */}
      <div className="md:hidden h-14" />
      <div className="md:hidden h-20" />
    </>
  );
}
