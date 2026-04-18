import type { Product } from '../data';

interface ProductCardProps {
  product: Product;
  index: number;
  inCart: boolean;
  inWishlist: boolean;
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}

export default function ProductCard({
  product,
  index,
  inCart,
  inWishlist,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <article
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 animate-cardUp"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* Match Badge */}
        <span className="absolute top-2.5 left-2.5 glass-dark flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white">
          <span className="h-[5px] w-[5px] rounded-full bg-accent" />
          {product.match}% Match
        </span>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className={`absolute top-2.5 right-2.5 grid h-8 w-8 place-items-center rounded-full shadow-sm transition-all duration-150 hover:scale-110 ${
            inWishlist
              ? 'bg-red-500'
              : 'bg-white/85 backdrop-blur-sm'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            className={`h-4 w-4 transition-colors duration-150 ${
              inWishlist ? 'text-white fill-white' : 'text-gray-600 fill-none'
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
          {product.brand}
        </div>
        <div className="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
          {product.name}
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold text-gray-900 tabular-nums">
            ${product.price}
            {product.originalPrice && (
              <span className="ml-1 text-xs font-medium text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
            disabled={inCart}
            className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 ${
              inCart
                ? 'bg-green-500 shadow-md shadow-green-500/30'
                : 'bg-accent shadow-md shadow-accent-glow hover:bg-accent-hover hover:shadow-lg hover:shadow-accent-glow'
            }`}
          >
            {inCart ? (
              <>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
