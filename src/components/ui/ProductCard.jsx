import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getCurrencySymbol } from '../../utils/currency';
import ImageLightbox, { ZoomButton } from './ImageLightbox';
import toast from 'react-hot-toast';

const PLACEHOLDER = 'https://placehold.co/400x400/F0EBE1/AEA9A3?text=No+Image';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const { addToCart } = useCart();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const image      = product.images?.[0]?.url || PLACEHOLDER;
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;
  let card = null;

  const priceBlock = (
    <>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-charcoal">
          {getCurrencySymbol(product.currency || 'NGN')}{product.price.toLocaleString()}
        </span>
        {hasDiscount && (
          <span className="text-sm text-stone-light line-through">
            {getCurrencySymbol(product.currency || 'NGN')}{product.comparePrice.toLocaleString()}
          </span>
        )}
      </div>
      {hasDiscount && (
        <span className="inline-block w-fit bg-[#FCEEE6] text-terra-dark text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mt-1">
          -{discountPct}%
        </span>
      )}
    </>
  );

  // ── List row layout ────────────────────────────────────────────────────────
  if (viewMode === 'list') {
    card = (
      <Link
        to={`/product/${product._id}`}
        className="group flex items-center gap-5 md:gap-6 bg-white rounded-2xl p-4 shadow-card hover:shadow-lift transition-all duration-200"
      >
        <div className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0 overflow-hidden rounded-xl bg-cream-dark">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            loading="lazy"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">Out of stock</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <ZoomButton onClick={() => setLightboxOpen(true)} />
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          {product.category?.name && (
            <span className="text-terra text-xs font-bold uppercase tracking-widest">
              {product.category.name}
            </span>
          )}
          <h3 className="font-display text-lg md:text-2xl font-semibold text-charcoal leading-snug line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-1 sm:hidden">{priceBlock}</div>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-3 flex-shrink-0">
          {priceBlock}
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex items-center gap-1.5 bg-charcoal hover:bg-terra text-white text-xs font-semibold px-4 py-2 rounded-xl whitespace-nowrap disabled:hidden transition-colors"
          >
            <Plus size={13} />
            Add to cart
          </button>
        </div>
      </Link>
    );
  }

  // ── Grid card layout ───────────────────────────────────────────────────────
  card = (
    <Link
      to={`/product/${product._id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift hover:-translate-y-1 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          loading="lazy"
        />

        {/* Zoom — opens full image without leaving the page */}
        <div className="absolute top-3 right-3">
          <ZoomButton onClick={() => setLightboxOpen(true)} />
        </div>

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-[#FCEEE6] text-terra-dark text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
            -{discountPct}%
          </span>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center">
            <span className="text-white text-sm font-semibold tracking-wide">Out of stock</span>
          </div>
        )}

        {/* Add to cart — appears on hover */}
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center gap-1.5 bg-charcoal hover:bg-terra text-white text-xs font-semibold px-4 py-2 rounded-xl whitespace-nowrap disabled:hidden"
        >
          <Plus size={13} />
          Add to cart
        </button>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-1.5">
        {product.category?.name && (
          <span className="text-terra text-xs font-bold uppercase tracking-widest">
            {product.category.name}
          </span>
        )}
        <h3 className="font-display text-lg font-semibold text-charcoal leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-semibold text-charcoal">
            {getCurrencySymbol(product.currency || 'NGN')}{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-stone-light line-through">
              {getCurrencySymbol(product.currency || 'NGN')}{product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <>
      {card}
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

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-card">
      <div className="aspect-[4/5] bg-cream-dark animate-pulse" />
      <div className="p-5 flex flex-col gap-2">
        <div className="h-3 w-1/3 bg-cream-dark rounded animate-pulse" />
        <div className="h-5 w-4/5 bg-cream-dark rounded animate-pulse" />
        <div className="h-5 w-1/4 bg-cream-dark rounded animate-pulse mt-1" />
      </div>
    </div>
  );
}