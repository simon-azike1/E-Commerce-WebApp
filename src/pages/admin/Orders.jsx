import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Filter, Search, Download, TrendingUp, Package, Clock, CheckCircle } from 'lucide-react';
import { getAdminOrders, exportOrders } from '../../api/index';
import { StatusBadge, Spinner, EmptyState } from '../../components/ui/AdminUI';
import toast from 'react-hot-toast';

const STATUSES = ['all', 'pending', 'confirmed', 'processing', 'dispatched', 'delivered', 'cancelled'];

export default function Orders() {
  const { theme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 15;
  const pages = Math.ceil(total / limit);

  useEffect(() => {
    setLoading(true);
    const params = { page, limit };
    if (status !== 'all') params.status = status;
    getAdminOrders(params)
      .then((r) => { setOrders(r.data.orders); setTotal(r.data.total); })
      .finally(() => setLoading(false));
  }, [status, page]);

  const handleExport = () => {
    const headers = 'Order#,Customer,Phone,Items,Total,Status,Type,Date\\n';
    const csvRows = orders.map(o => [
      o.orderNumber,
      o.customer?.name || '',
      o.customer?.phone || '',
      o.items?.length || 0,
      o.total || 0,
      o.status,
      o.fulfillmentType,
      new Date(o.createdAt).toISOString().split('T')[0]
    ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','));
    const csv = headers + csvRows.join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAnalytics = () => {
    toast.success('Analytics coming soon!');
  };

  // Calculate stats
  const stats = {
    total: total,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing' || o.status === 'confirmed').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
  };

  const statCards = [
    { label: 'Total Orders', value: stats.total, icon: Package, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50' },
    { label: 'Processing', value: stats.processing, icon: TrendingUp, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50' },
    { label: 'Delivered', value: stats.delivered, icon: CheckCircle, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ShoppingBag size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders</h1>
                <p className="text-sm text-gray-500">Manage and track all customer orders</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-cream border border-cream-dark hover:border-terra text-charcoal hover:text-terra font-medium px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
              onClick={handleExport}
            >
              <Download size={18} />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-terra hover:bg-terra-dark text-white font-medium px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-terra/25"
            >
              <TrendingUp size={18} />
              View Analytics
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-surface rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full"
                >
                  +12%
                </motion.span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-surface rounded-2xl p-4 mb-6 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order number, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-gray-500 text-sm mr-2">
                <Filter size={16} />
                <span className="hidden sm:inline">Filter:</span>
              </div>
              {STATUSES.map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setStatus(s); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-300 ${
                    status === s
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-surface rounded-2xl overflow-hidden shadow-sm"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Spinner size={32} />
              <p className="text-gray-500 text-sm mt-4">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <EmptyState 
              icon={ShoppingBag} 
              title="No orders found" 
              sub="Orders will appear here once customers place them." 
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    {['Order #', 'Customer', 'Phone', 'Items', 'Total', 'Type', 'Status', 'Date', ''].map((h) => (
                      <th 
                        key={h} 
                        className="text-left px-5 py-4 text-xs font-bold text-[#C4602A] dark:text-[#E8845A] uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <AnimatePresence mode="wait">
                  <tbody>
                    {orders.map((order, i) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.03 }}
                        className="hover:bg-blue-50/50 dark:hover:bg-gray-800 transition-colors duration-200 group"
                      >
                        <td className="px-5 py-4">
                          <span className="font-semibold text-gray-900 dark:text-white font-mono">{order.orderNumber}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                              {order.customer?.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <span className="text-gray-700 dark:text-gray-200 font-medium">{order.customer?.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">{order.customer?.phone}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-xs">
                            {order.items?.length}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">₦{order.total?.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${
                            order.fulfillmentType === 'delivery' 
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                              : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                          }`}>
                            {order.fulfillmentType === 'delivery' ? <Package size={12} /> : <ShoppingBag size={12} />}
                            {order.fulfillmentType}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-4 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString('en-NG', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: '2-digit' 
                          })}
                        </td>
                        <td className="px-5 py-4">
                          <Link 
                            to={`/admin/orders/${order._id}/detail`} 
                            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-xs font-semibold whitespace-nowrap group-hover:underline"
                          >
                            View Details
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight size={14} />
                            </motion.span>
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </AnimatePresence>
              </table>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {pages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6"
          >
            <p className="text-sm text-gray-500">
              Showing page <span className="font-semibold text-gray-700">{page}</span> of{' '}
              <span className="font-semibold text-gray-700">{pages}</span>
            </p>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Previous
              </motion.button>
              
              <div className="flex items-center gap-1.5">
                {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                  let p = i + 1;
                  if (pages > 5) {
                    if (page > 3) p = page - 2 + i;
                    if (p > pages) p = pages - 4 + i;
                  }
                  return (
                    <motion.button
                      key={p}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                        p === page 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/30' 
                          : 'border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-500'
                      }`}
                    >
                      {p}
                    </motion.button>
                  );
                })}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage(Math.min(pages, page + 1))}
                disabled={page === pages}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
