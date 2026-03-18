import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Package, Search } from 'lucide-react';
import { getAdminProducts, deleteProduct } from '../../api/index';
import { Spinner, EmptyState, ConfirmModal } from '../../components/ui/AdminUI';
import toast from 'react-hot-toast';

const PLACEHOLDER = 'https://placehold.co/60x60/F0EBE1/C4602A?text=?';

export default function Products() {
  const { theme } = useTheme();
  const [products,  setProducts]  = useState([]);
  const [filtered,  setFiltered]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [deleting,  setDeleting]  = useState(null);
  const [search,    setSearch]    = useState('');

  const load = () => {
    setLoading(true);
    getAdminProducts()
      .then((r) => { setProducts(r.data.products); setFiltered(r.data.products); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(products.filter((p) =>
      p.name.toLowerCase().includes(q) || p.category?.name?.toLowerCase().includes(q)
    ));
  }, [search, products]);

  const handleDelete = async () => {
    try {
      await deleteProduct(deleting._id);
      toast.success(`${deleting.name} removed`);
      setDeleting(null);
      load();
    } catch { toast.error('Failed to delete product'); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 max-w-6xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between mb-6 gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-text">Products</h1>
          <p className="text-text-muted text-sm mt-1">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Plus size={16} /> Add product
          </Link>
        </motion.div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative mb-5"
      >
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          type="text" placeholder="Search products…" value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-border focus:border-primary rounded-xl text-sm outline-none transition-colors bg-surface text-text"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="bg-surface rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center h-48"><Spinner size={28} /></div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Package} title="No products found"
            sub={search ? 'Try a different search term.' : 'Add your first product to get started.'}
            action={!search && (
              <Link to="/admin/products/new" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium">
                <Plus size={14} /> Add product
              </Link>
            )}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-secondary">
                  {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-[#C4602A] dark:text-[#E8845A] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <AnimatePresence>
                <tbody>
                  {filtered.map((product, i) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-surface-secondary dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={product.images?.[0]?.url || PLACEHOLDER} alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-700 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-text truncate">{product.name}</p>
                            <p className="text-text-muted text-xs mt-0.5 truncate">{product.description?.slice(0, 50)}…</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-muted whitespace-nowrap">{product.category?.name || '—'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium text-text">₦{product.price?.toLocaleString()}</span>
                        {product.comparePrice > product.price && (
                          <span className="text-text-muted line-through text-xs ml-1">₦{product.comparePrice?.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${product.stock === 0 ? 'text-danger' : product.stock <= 10 ? 'text-warning' : 'text-text'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {product.isFeatured
                          ? <span className="text-xs bg-warning-light dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-semibold px-2 py-0.5 rounded-full">Featured</span>
                          : <span className="text-xs text-text-muted">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.isActive ? 'bg-success-light dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-danger-light dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                          {product.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link to={`/admin/products/${product._id}/edit`}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border dark:border-gray-600 hover:border-primary hover:text-primary text-text-muted dark:text-gray-400 transition-colors">
                              <Pencil size={14} />
                            </Link>
                          </motion.div>
                          <motion.button
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={() => setDeleting(product)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-danger hover:text-danger text-text-muted transition-colors"
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {deleting && (
          <ConfirmModal
            message={`Remove "${deleting.name}" from the storefront? This hides it from customers.`}
            onConfirm={handleDelete}
            onCancel={() => setDeleting(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}