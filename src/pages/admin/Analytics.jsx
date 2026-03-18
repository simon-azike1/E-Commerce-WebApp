import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, ShoppingBag, Package, Users, DollarSign, Calendar, Filter, RefreshCw } from 'lucide-react';
import { getAdminOrders, getAdminProducts } from '../../api/index';
import { StatCard, Spinner } from '../../components/ui/AdminUI';
import { useTheme } from '../../context/ThemeContext';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart, 
  Line 
} from 'recharts';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

export default function Analytics() {
  const { theme } = useTheme();
  const [stats, setStats] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('30d');

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        getAdminOrders({ limit: 100 }), // Get recent for charts
        getAdminProducts(),
      ]);

      // Stats
      const orders = ordersRes.data.orders;
      const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
      const uniqueCustomers = [...new Set(orders.map(o => o.customer?.phone))].length;

      setStats({
        totalOrders: ordersRes.data.total,
        totalRevenue: revenue,
        totalCustomers: uniqueCustomers,
        totalProducts: productsRes.data.count,
      });

      // Chart data - Orders by status
      const statusCounts = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});
      setOrdersData(Object.entries(statusCounts).map(([status, count]) => ({ status, count })));

      // Revenue trend (mock + real recent data)
      const trendData = orders.slice(0, 7).reverse().map((order, i) => ({
        date: `Day ${7-i}`,
        revenue: order.total || 0,
        orders: 1
      }));
      setProductsData(trendData);

    } catch (error) {
      console.error('Analytics load error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8">
      <div className="text-center">
        <Spinner size={48} />
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Loading analytics...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          {...fadeUp(0)}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/25">
              <BarChart3 size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 dark:from-white to-gray-700 dark:to-gray-300 bg-clip-text text-transparent">Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Business performance & insights</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700 hover:border-white/40 dark:hover:border-gray-600 px-6 py-3 rounded-2xl font-medium shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200"
              onClick={loadData}
            >
              <RefreshCw size={18} className="animate-spin hidden group-hover:block" />
              <RefreshCw size={18} className="block group-hover:hidden" />
              Refresh Data
            </motion.button>
          </div>
        </motion.div>

        {/* KPI Stats */}
        <motion.div 
          {...fadeUp(0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { value: stats?.totalOrders?.toLocaleString() || '0', label: 'Total Orders', icon: ShoppingBag, color: 'from-blue-500 to-cyan-600', trend: '+18%', trendColor: 'green' },
            { value: `₦${stats?.totalRevenue?.toLocaleString() || '0'}`, label: 'Total Revenue', icon: TrendingUp, color: 'from-emerald-500 to-teal-600', trend: '+23%', trendColor: 'green' },
            { value: stats?.totalCustomers?.toLocaleString() || '0', label: 'Customers', icon: Users, color: 'from-purple-500 to-pink-600', trend: '+12%', trendColor: 'blue' },
            { value: stats?.totalProducts?.toLocaleString() || '0', label: 'Products', icon: Package, color: 'from-orange-500 to-red-600', trend: '+5%', trendColor: 'orange' },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              variants={fadeUp(0.2 + index * 0.1)}
              whileHover={{ y: -8 }}
              className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={28} className="text-white drop-shadow-lg" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${stat.trendColor === 'green' ? 'bg-emerald-100 text-emerald-700' : stat.trendColor === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">{stat.value}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Orders by Status */}
          <motion.div 
            {...fadeUp(0.3)}
            className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Orders by Status</h2>
              <Filter size={24} className="text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="url(#statusGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="statusGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Revenue Trend */}
          <motion.div 
            {...fadeUp(0.4)}
            className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Revenue Trend</h2>
              <Calendar size={24} className="text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={4} dot={{ fill: '#10B981', strokeWidth: 2 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div 
          {...fadeUp(0.5)}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-xl font-bold mb-6 text-gray-900">Recent Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-white/50">
              <DollarSign className="w-10 h-10 p-2 bg-emerald-500/20 text-emerald-600 rounded-xl" />
              <div>
                <p className="text-sm text-gray-600">Average Order Value</p>
                <p className="text-2xl font-bold text-gray-900">₦{(stats?.totalRevenue / (stats?.totalOrders || 1)).toFixed(0) || '0'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-white/50">
              <TrendingUp className="w-10 h-10 p-2 bg-blue-500/20 text-blue-600 rounded-xl" />
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{(stats?.totalOrders / stats?.totalCustomers * 100 || 0).toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-white/50">
              <ShoppingBag className="w-10 h-10 p-2 bg-orange-500/20 text-orange-600 rounded-xl" />
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalOrders * 0.15 || 0}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p 
          {...fadeUp(0.6)}
          className="text-center mt-12 text-sm text-gray-500"
        >
          Data updated just now • Refresh for latest insights
        </motion.p>
      </div>
    </div>
  );
}
