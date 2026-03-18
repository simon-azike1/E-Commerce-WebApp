import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const PLACEHOLDER = 'https://placehold.co/400x400/F0EBE1/AEA9A3?text=No+Image';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

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

  return (
    <Link
      to={`/product/${product._id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift hover:-translate-y-1 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          loading="lazy"
        />

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
      <div className="p-4 flex flex-col gap-1">
        {product.category?.name && (
          <span className="text-terra text-[11px] font-bold uppercase tracking-widest">
            {product.category.name}
          </span>
        )}
        <h3 className="font-display text-base font-semibold text-charcoal leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-semibold text-charcoal">
            ₦{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-stone-light line-through">
              ₦{product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-card">
      <div className="aspect-square bg-cream-dark animate-pulse" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-1/3 bg-cream-dark rounded animate-pulse" />
        <div className="h-4 w-4/5 bg-cream-dark rounded animate-pulse" />
        <div className="h-4 w-1/4 bg-cream-dark rounded animate-pulse mt-1" />
      </div>
    </div>
  );
}