import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Grid, List, Filter, ChevronDown, ArrowUpDown, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, getCategories } from '../api/index';
import ProductCard, { ProductCardSkeleton } from '../components/ui/ProductCard';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchInput, setSearchInput] = useState('');

  const page = Number(searchParams.get('page') || 1);
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '-createdAt';

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data.categories));
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({
      page, limit: 12,
      category: category || undefined,
      search: search || undefined,
      sort,
    })
      .then((r) => {
        setProducts(r.data.products);
        setTotal(r.data.total);
        setPages(r.data.pages);
      })
      .finally(() => setLoading(false));
  }, [page, category, search, sort]);

  // Fixed: Only delete 'page' when changing other params, not when changing page itself
  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    // Only reset page when changing filters/search, not when changing page
    if (key !== 'page') {
      next.delete('page');
    }
    setSearchParams(next);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setParam('search', searchInput.trim());
  };

  const clearAll = () => {
    setSearchInput('');
    setSearchParams({});
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

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
    <div className="min-h-screen bg-gradient-to-b from-white to-cream/30 pb-20">
      {/* Hero Section with Video Background */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden border-b border-cream-dark">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
      
        >
          <source src="https://www.pexels.com/download/video/7679833/" type="video/mp4" />
          <source src="https://www.pexels.com/download/video/7679833/" type="video/webm" />
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
        <div className="relative h-full max-w-6xl mx-auto px-4 md:px-6 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
      
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4 leading-tight"
            >
              Discover Our{' '}
              <span className="text-terra">Collection</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-stone text-lg md:text-xl leading-relaxed"
            >
              Handpicked products, fair prices, and quality you can trust. Find exactly what you're looking for.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-terra/50 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-terra"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-block bg-terra/10 text-terra text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3"
              >
                Our Collection
              </motion.span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-cream">
                Shop All Products
              </h1>
              {!loading && (
                <p className="text-stone text-sm md:text-base mt-2">
                  Showing <span className="font-semibold text-terra">{total}</span> {total !== 1 ? 'products' : 'product'}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-terra text-white shadow' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-terra text-white shadow' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilter((v) => !v)}
                className={`flex items-center gap-2 border font-medium px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  showFilter
                    ? 'bg-terra text-white border-terra shadow-lg shadow-terra/30'
                    : 'border-gray-200 text-charcoal hover:border-terra hover:text-terra bg-white'
                }`}
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSearch}
          className="relative mb-6"
        >
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-12 py-3 md:py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-stone-600 focus:border-terra dark:focus:border-orange-400 focus:ring-2 focus:ring-terra/20 dark:focus:ring-orange-400/20 rounded-xl md:rounded-2xl text-sm md:text-base text-charcoal dark:text-cream outline-none transition-all duration-300 shadow-sm dark:shadow-none"
            />
            {searchInput && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                type="button"
                onClick={() => { setSearchInput(''); setParam('search', ''); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
              >
                <X size={16} />
              </motion.button>
            )}
          </div>
        </motion.form>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Categories */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Filter size={16} className="text-terra" />
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Category</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setParam('category', '')}
                        className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${
                          !category
                            ? 'bg-terra text-white border-terra shadow-md shadow-terra/30'
                            : 'border-gray-200 text-gray-600 hover:border-terra hover:text-terra bg-white'
                        }`}
                      >
                        All
                      </motion.button>
                      {categories.map((cat) => (
                        <motion.button
                          key={cat._id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setParam('category', cat._id)}
                          className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 ${
                            category === cat._id
                              ? 'bg-terra text-white border-terra shadow-md shadow-terra/30'
                              : 'border-gray-200 text-gray-600 hover:border-terra hover:text-terra bg-white'
                          }`}
                        >
                          {cat.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ArrowUpDown size={16} className="text-terra" />
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Sort By</p>
                    </div>
                    <div className="relative">
                      <select
                        value={sort}
                        onChange={(e) => setParam('sort', e.target.value)}
                        className="appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-charcoal bg-white outline-none focus:border-terra focus:ring-2 focus:ring-terra/20 transition-all duration-300 cursor-pointer"
                      >
                        <option value="-createdAt">Newest First</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Pills */}
        <AnimatePresence>
          {(search || category) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              {search && (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 bg-terra/10 text-terra text-xs font-medium px-4 py-2 rounded-full"
                >
                  <Search size={12} />
                  Search: "{search}"
                  <button onClick={() => { setSearchInput(''); setParam('search', ''); }} className="hover:text-terra-dark">
                    <X size={14} />
                  </button>
                </motion.span>
              )}
              {category && (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 bg-terra/10 text-terra text-xs font-medium px-4 py-2 rounded-full"
                >
                  <Filter size={12} />
                  Category: {categories.find(c => c._id === category)?.name || category}
                  <button onClick={() => setParam('category', '')} className="hover:text-terra-dark">
                    <X size={14} />
                  </button>
                </motion.span>
              )}
              <motion.button
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAll}
                className="text-xs text-gray-500 hover:text-terra font-medium underline"
              >
                Clear all filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5' 
            : 'flex flex-col gap-4'
          }
        >
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ProductCardSkeleton />
              </motion.div>
            ))
          ) : products.length > 0 ? (
            products.map((p) => (
              <motion.div key={p._id} variants={itemVariants}>
                <ProductCard product={p} viewMode={viewMode} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full flex flex-col items-center gap-4 py-16 md:py-20"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-base md:text-lg font-semibold text-charcoal mb-2">No products found</p>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAll}
                  className="border-2 border-terra text-terra text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-terra hover:text-white transition-all duration-300"
                >
                  Clear all filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Pagination */}
        {pages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12"
          >
            <p className="text-sm text-gray-500">
              Page <span className="font-semibold text-charcoal">{page}</span> of{' '}
              <span className="font-semibold text-charcoal">{pages}</span>
            </p>

            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setParam('page', String(Math.max(1, page - 1)))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-terra hover:text-terra disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 bg-white"
              >
                Previous
              </motion.button>

              {/* Page Numbers */}
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
                      onClick={() => setParam('page', String(p))}
                      className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                        p === page
                          ? 'bg-terra text-white border-terra shadow-lg shadow-terra/30'
                          : 'border-gray-200 text-gray-600 hover:border-terra hover:text-terra bg-white'
                      }`}
                    >
                      {p}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setParam('page', String(Math.min(pages, page + 1)))}
                disabled={page === pages}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-terra hover:text-terra disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 bg-white"
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
