import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Tag, Check, X, FolderOpen, Search, Grid, List, Filter, ArrowUpRight } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../api/index';
import { Spinner, EmptyState, ConfirmModal } from '../../components/ui/AdminUI';
import toast from 'react-hot-toast';

export default function Categories() {
  const { theme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    getCategories().then((r) => setCategories(r.data.categories)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditId(null); setFormName(''); setFormDesc(''); setShowAdd(true); };
  const openEdit = (cat) => { setShowAdd(false); setEditId(cat._id); setFormName(cat.name); setFormDesc(cat.description || ''); };
  const cancel = () => { setShowAdd(false); setEditId(null); setFormName(''); setFormDesc(''); };

  const handleSave = async () => {
    if (!formName.trim()) { toast.error('Category name is required'); return; }
    setSaving(true);
    try {
      if (editId) { await updateCategory(editId, { name: formName.trim(), description: formDesc.trim() }); toast.success('Category updated successfully'); }
      else { await createCategory({ name: formName.trim(), description: formDesc.trim() }); toast.success('Category created successfully'); }
      cancel(); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Something went wrong'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteCategory(deleting._id); toast.success(`${deleting.name} deleted successfully`); setDeleting(null); load(); }
    catch { toast.error('Failed to delete category'); }
  };

  // Filter categories by search
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

  const InlineForm = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-4 p-5"
    >
      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Category Name <span className="text-red-500">*</span>
        </label>
        <input
          autoFocus
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="e.g. Electronics, Clothing, Accessories"
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 bg-white"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Description <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={formDesc}
          onChange={(e) => setFormDesc(e.target.value)}
          placeholder="Brief description of this category"
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 bg-white"
        />
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={cancel}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <X size={16} /> Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-60 shadow-lg shadow-blue-500/30"
        >
          {saving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </motion.div>
              Saving...
            </>
          ) : (
            <>
              <Check size={16} /> {editId ? 'Update' : 'Create'}
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Tag size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Categories</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {categories.length} {categories.length !== 1 ? 'categories' : 'category'} organized
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAdd}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-blue-500/30"
          >
            <Plus size={18} /> Add Category
          </motion.button>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 mr-2">View:</span>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow text-blue-500' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow text-blue-500' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add Form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white border-2 border-blue-500/30 rounded-2xl mb-6 shadow-lg shadow-blue-500/10"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Plus size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Add New Category</h3>
                  <p className="text-xs text-gray-500">Create a new category for your products</p>
                </div>
              </div>
              <InlineForm />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm"
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <Spinner size={32} />
                <p className="text-gray-500 text-sm">Loading categories...</p>
              </div>
            </motion.div>
          ) : filteredCategories.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <FolderOpen size={40} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {searchQuery ? 'No categories found' : 'No categories yet'}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                    {searchQuery
                      ? 'Try adjusting your search terms'
                      : 'Categories help customers browse your products more easily.'}
                  </p>
                </div>
                {!searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/30"
                  >
                    <Plus size={16} /> Add Your First Category
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((cat, i) => (
                <motion.div
                  key={cat._id}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-purple-500/30 transition-all duration-300"
                >
                  {editId === cat._id ? (
                    <div className="bg-purple-50 -m-5 p-5 rounded-2xl">
                      <InlineForm />
                    </div>
                  ) : (
                    <>
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                          <Tag size={22} className="text-white" />
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openEdit(cat)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:border-blue-500 hover:text-blue-500 text-gray-400 transition-colors bg-white"
                          >
                            <Pencil size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setDeleting(cat)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:border-red-500 hover:text-red-500 text-gray-400 transition-colors bg-white"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{cat.name}</h3>
                        {cat.description && (
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{cat.description}</p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="bg-gray-100 px-2 py-1 rounded-md font-mono">{cat.slug}</span>
                        </div>
                      </div>

                      {/* Hover Accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <div>
                {filteredCategories.map((cat, i) => (
                  <motion.div
                    key={cat._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group"
                  >
                    {editId === cat._id ? (
                      <div className="bg-purple-50 p-5">
                        <InlineForm />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <Tag size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">{cat.name}</p>
                          {cat.description && (
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{cat.description}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1 font-mono">{cat.slug}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openEdit(cat)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:border-blue-500 hover:text-blue-500 text-gray-400 transition-colors bg-white"
                          >
                            <Pencil size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setDeleting(cat)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:border-red-500 hover:text-red-500 text-gray-400 transition-colors bg-white"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Footer */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>
                Showing <span className="font-semibold text-gray-900">{filteredCategories.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{categories.length}</span> categories
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              All categories are active
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setDeleting(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={28} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Delete Category?
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{deleting.name}"</span>? 
                This action cannot be undone. Products in this category will not be deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleting(null)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-red-700 transition-colors shadow-lg shadow-red-500/30"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
