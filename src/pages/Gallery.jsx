import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Package, Check, ZoomIn } from 'lucide-react';
import { getProducts, getCategories } from '../api/index';
import { useCart } from '../context/CartContext';
import ImageLightbox, { ZoomButton } from '../components/ui/ImageLightbox';
import toast from 'react-hot-toast';

const PLACEHOLDER = 'https://placehold.co/600x750/F0EBE1/AEA9A3?text=No+Image';

function GalleryCard({ product }) {
  const { addToCart } = useCart();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const image = product.images?.[0]?.url || PLACEHOLDER;
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;
  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-[#FCEEE6] text-terra-dark text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
              -{discountPct}%
            </span>
          )}

          {outOfStock && (
            <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Out of stock</span>
            </div>
          )}

          <div className="absolute top-3 right-3">
            <ZoomButton onClick={() => setLightboxOpen(true)} />
          </div>

          {/* Add to cart — small button, always visible */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            disabled={outOfStock}
            className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              added ? 'bg-green-500 text-white' : 'bg-charcoal hover:bg-terra text-white'
            } disabled:hidden`}
            aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </motion.button>
        </div>

        {/* Name only */}
        <div className="p-3 text-center">
          <Link to={`/product/${product._id}`} className="hover:text-terra transition-colors">
            <h3 className="font-display text-sm font-semibold text-charcoal leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>
      </motion.div>

      {lightboxOpen && (
        <ImageLightbox
          images={product.images?.length ? product.images.map((i) => i.url) : [PLACEHOLDER]}
          index={0}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

function GallerySkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-card">
      <div className="aspect-[4/5] bg-cream-dark animate-pulse" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 w-4/5 bg-cream-dark rounded animate-pulse" />
        <div className="h-4 w-1/4 bg-cream-dark rounded animate-pulse" />
      </div>
    </div>
  );
}

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({ limit: 100, category: category || undefined })
      .then((r) => setProducts(r.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl md:text-5xl font-bold text-charcoal mb-3">Gallery</h1>
        <p className="text-stone text-base md:text-lg max-w-xl">
          Browse our full collection. Tap any image to view it larger, and add your favourites to the cart right from here.
        </p>
      </motion.div>

      {/* Category chips */}
      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
          <button
            onClick={() => setCategory('')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              !category
                ? 'bg-terra text-white border-terra'
                : 'bg-white text-charcoal border-cream-dark hover:border-terra hover:text-terra'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => setCategory(c._id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                category === c._id
                  ? 'bg-terra text-white border-terra'
                  : 'bg-white text-charcoal border-cream-dark hover:border-terra hover:text-terra'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => <GallerySkeleton key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-cream-dark flex items-center justify-center">
            <Package size={36} className="text-stone" />
          </div>
          <p className="text-lg font-semibold text-charcoal">No products yet</p>
          <p className="text-stone text-sm max-w-sm">
            New pieces are added regularly — check back soon or browse the shop.
          </p>
          <Link to="/shop" className="text-terra font-semibold hover:underline text-sm">
            Go to shop →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => <GalleryCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
