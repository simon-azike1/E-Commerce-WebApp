import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Package, TrendingUp, Clock,
  ArrowRight, RefreshCw, Plus, Eye,
  Users, DollarSign, AlertCircle, CheckCircle,
  Truck, Settings, BarChart3, FileText, Bell, Menu, X
} from 'lucide-react';
import { getAdminOrders, getAdminProducts } from '../../api/index';
import { StatCard, StatusBadge, Spinner } from '../../components/ui/AdminUI';
import toast from 'react-hot-toast';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: 'easeOut' },
});

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const load = async () => {
    setRefreshing(true);
    try {
      const [ordersRes, pendingRes, productsRes] = await Promise.all([
        getAdminOrders({ limit: 10 }),
        getAdminOrders({ status: 'pending', limit: 1 }),
        getAdminProducts(),
      ]);
      const orders = ordersRes.data;
      const products = productsRes.data;
      const totalRevenue = orders.orders
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, o) => sum + (o.total || 0), 0);
      setStats({
        totalOrders: orders.total,
        pendingOrders: pendingRes.data.total,
        totalProducts: products.count,
        totalRevenue,
      });
      setRecentOrders(orders.orders);
      
      // Generate activities from recent orders
      const newActivities = orders.orders.slice(0, 5).map((order, index) => {
        const icons = { ShoppingBag, Package, Users, DollarSign, AlertCircle };
        const colors = { pending: 'bg-amber-500', confirmed: 'bg-blue-500', processing: 'bg-purple-500', dispatched: 'bg-cyan-500', delivered: 'bg-green-500', cancelled: 'bg-red-500' };
        const messages = {
          pending: 'New order received',
          confirmed: 'Order confirmed',
          processing: 'Order being processed',
          dispatched: 'Order dispatched',
          delivered: 'Order delivered',
          cancelled: 'Order cancelled'
        };
        return {
          icon: icons[Object.keys(icons)[index % 4]] || ShoppingBag,
          text: messages[order.status] || `Order ${order.orderNumber} updated`,
          time: getRelativeTime(new Date(order.createdAt)),
          color: colors[order.status] || 'bg-blue-500',
        };
      });
      setActivities(newActivities);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Helper function to get relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  useEffect(() => { load(); }, []);

  const quickActions = [
    { label: 'Add Product', icon: Plus, href: '/admin/products/new', color: 'from-blue-500 to-cyan-500' },
    { label: 'View Orders', icon: ShoppingBag, href: '/admin/orders', color: 'from-orange-500 to-orange-600' },
    { label: 'Analytics', icon: BarChart3, href: '/admin/analytics', color: 'from-purple-500 to-pink-500' },
    { label: 'Settings', icon: Settings, href: '/admin/settings', color: 'from-gray-600 to-gray-700' },
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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Spinner size={40} />
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">Loading dashboard...</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-20">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <BarChart3 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Store Overview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={load}
              disabled={refreshing}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >
              <motion.div
                animate={refreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw size={18} />
              </motion.div>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                  <Bell size={18} />
                  Notifications
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <motion.div
          {...fadeUp(0)}
          className="hidden md:flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <BarChart3 size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back — here's what's happening in your store</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={load}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-500 font-medium px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm disabled:opacity-50"
            >
              <motion.div
                animate={refreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw size={16} />
              </motion.div>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} className="text-gray-600 dark:text-gray-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} className="text-gray-600 dark:text-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300"
            >
              <Bell size={18} className="text-gray-600 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Rest of the component remains the same - stats, quick actions, recent orders, activity feed */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8"
        >
          {[
            {
              label: 'Total Orders',
              value: stats?.totalOrders ?? 0,
              icon: ShoppingBag,
              color: 'from-blue-500 to-cyan-500',
              bg: 'bg-blue-50',
              sub: 'All time',
              trend: '+12%',
              delay: 0.05,
            },
            {
              label: 'Pending',
              value: stats?.pendingOrders ?? 0,
              icon: Clock,
              color: 'from-amber-500 to-orange-500',
              bg: 'bg-amber-50',
              sub: 'Needs attention',
              trend: '-5%',
              delay: 0.1,
            },
            {
              label: 'Products',
              value: stats?.totalProducts ?? 0,
              icon: Package,
              color: 'from-purple-500 to-pink-500',
              bg: 'bg-purple-50',
              sub: 'In catalogue',
              trend: '+8%',
              delay: 0.15,
            },
            {
              label: 'Revenue',
              value: `₦${(stats?.totalRevenue ?? 0).toLocaleString()}`,
              icon: TrendingUp,
              color: 'from-green-500 to-emerald-500',
              bg: 'bg-green-50',
              sub: 'Confirmed orders',
              trend: '+24%',
              delay: 0.2,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl p-3 md:p-5 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2 md:mb-4">
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon size={16} className="text-white md:hidden" />
                    <stat.icon size={22} className="text-white hidden md:block" />
                  </div>
                </div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: stat.delay + 0.2, type: 'spring' }}
                  className={`text-[10px] md:text-xs font-semibold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full ${
                    stat.trend.startsWith('+')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stat.trend}
                </motion.span>
              </div>
              <p className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">{stat.value}</p>
              <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1 truncate">{stat.label}</p>
              <p className="text-[9px] md:text-xs text-gray-400 dark:text-gray-500 mt-0.5 hidden md:block">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 md:mb-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2"
          >
            <Settings size={16} className="text-gray-400 md:block hidden" />
            Quick Actions
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={action.href}
                  className="flex flex-col items-center gap-2 md:gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl p-3 md:p-5 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon size={20} className="text-white md:hidden" />
                    <action.icon size={24} className="text-white hidden md:block" />
                  </div>
                  <span className="text-[11px] md:text-sm font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">{action.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          {...fadeUp(0.25)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl shadow-sm overflow-hidden mb-6 md:mb-8"
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 flex items-center justify-center">
                <ShoppingBag size={16} className="text-blue-500" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Recent Orders</h2>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Latest customer orders</p>
              </div>
            </div>
            <Link
              to="/admin/orders"
              className="flex items-center gap-1 text-[11px] md:text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <ShoppingBag size={28} className="text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">No orders yet.</p>
              <Link
                to="/admin/products"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Add your first product →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <div key={order._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                        {order.customer?.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{order.customer?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{order.orderNumber}</p>
                      </div>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                      <p className="font-bold text-gray-900 dark:text-white">₦{order.total?.toLocaleString()}</p>
                    </div>
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-blue-600 text-xs font-semibold hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          {...fadeUp(0.35)}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-8 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Bell size={16} className="text-purple-500" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Activity Feed</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Recent store activity</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {activities.length > 0 ? activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-2 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0"
              >
                <div className={`w-2 h-2 rounded-full ${activity.color} mt-1.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{activity.text}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </motion.div>
            )) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No recent activity</p>
            )}
          </div>
          
          <Link
            to="/admin/activity"
            className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
          >
            <FileText size={14} />
            View All Activity
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
