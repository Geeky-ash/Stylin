import type { ApiProduct } from '../api';

interface ApiProductCardProps {
  product: ApiProduct;
  index: number;
}

export default function ApiProductCard({ product, index }: ApiProductCardProps) {
  return (
    <article
      className="group overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 dark:hover:border-white/10 animate-cardUp"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 border-b border-gray-200/50 dark:border-white/5">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/product_blazer.png';
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Source badge */}
        {product.source && (
          <span className="absolute top-2.5 left-2.5 glass-dark flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white">
            {product.sourceIcon && (
              <img
                src={product.sourceIcon}
                alt=""
                className="h-3.5 w-3.5 rounded-sm"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            {product.source}
          </span>
        )}

        {/* Stock indicator */}
        {product.inStock === false && (
          <span className="absolute top-2.5 right-2.5 rounded-full bg-red-500/80 px-2 py-0.5 text-[10px] font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight mb-2 line-clamp-2 min-h-[2.5em]">
          {product.title}
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold text-gray-900 dark:text-gray-100 tabular-nums">
            {product.price || 'See price'}
          </span>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-accent-glow transition-all duration-200 hover:bg-accent-hover hover:scale-105 hover:shadow-lg active:scale-95 no-underline"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Shop
          </a>
        </div>
      </div>
    </article>
  );
}
