import { useState, useMemo } from 'react';
import { STYLE_TAGS, PRODUCTS, CATEGORIES } from '../data';
import ProductCard from './ProductCard';

interface ResultsViewProps {
  showToast: (msg: string) => void;
}

export default function ResultsView({ showToast }: ResultsViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [cartItems, setCartItems] = useState<Set<number>>(new Set());
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const handleAddToCart = (id: number) => {
    setCartItems((prev) => new Set(prev).add(id));
    const product = PRODUCTS.find((p) => p.id === id);
    showToast(`${product?.name} added to cart!`);
    setTimeout(() => {
      setCartItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2500);
  };

  const handleToggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from wishlist');
      } else {
        next.add(id);
        showToast('Saved to wishlist ❤️');
      }
      return next;
    });
  };

  return (
    <div className="animate-slideUp">
      {/* ─── Detected Style Header ─── */}
      <section className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Your Vibe: Streetwear
          </h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">AI detected 6 style attributes from your outfit</p>

        {/* Style Tags */}
        <div className="flex flex-wrap gap-2.5">
          {STYLE_TAGS.map((tag, i) => (
            <span
              key={tag.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold tracking-wide cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] animate-tagPop ${
                tag.primary
                  ? 'bg-accent text-white shadow-lg shadow-accent-glow'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-accent/5 hover:text-accent hover:border-accent/20'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {!tag.primary && (
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: tag.color }} />
              )}
              {tag.label}
              <span className="text-[11px] font-medium opacity-70">{tag.confidence}%</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── AI Insight Banner ─── */}
      <div className="mx-4 mt-4 mb-5 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-4 shadow-xl">
        <div className="absolute -top-[40%] -right-[20%] h-48 w-48 rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)]" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-[#5AC8FA] shadow-lg shadow-accent-glow">
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 17.93c-3.95.49-7.43-2.99-6.94-6.94C6.53 9.21 10.07 6.53 13.93 7.06c3.21.44 5.57 3.21 5.57 6.46 0 3.87-3.37 6.93-7.5 6.41zM12 8v4l3 3" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">✨ Style Match: 96% Streetwear</div>
            <div className="text-[12px] leading-relaxed text-gray-400">
              Your look aligns with Urban Streetwear trends. Here are curated picks that match your vibe.
            </div>
          </div>
        </div>
      </div>

      {/* ─── Category Filters ─── */}
      <div className="mb-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`flex-shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
              activeFilter === cat
                ? 'bg-accent text-white shadow-md shadow-accent-glow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ─── Product Grid ─── */}
      <section className="px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Shop Similar
          </h2>
          <button className="text-[13px] font-semibold text-accent hover:opacity-70 transition-opacity">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {filteredProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              inCart={cartItems.has(product.id)}
              inWishlist={wishlist.has(product.id)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg className="mb-3 h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-sm font-medium">No items in this category yet</p>
          </div>
        )}
      </section>
    </div>
  );
}
