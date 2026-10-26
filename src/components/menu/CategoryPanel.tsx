import type { Product, CategoryMeta } from '../../data/products';
import ProductCard from './ProductCard';

interface CategoryPanelProps {
  categoryName: string;
  meta: CategoryMeta;
  products: Product[];
}

export default function CategoryPanel({ categoryName, meta, products }: CategoryPanelProps) {
  return (
    <div>
      {/* Category header */}
      <div className="text-center mb-8">
        <h3 className="font-serif text-[#3B1A0E] font-bold text-3xl sm:text-4xl leading-tight">
          {categoryName}
        </h3>
        <p className="text-[#F5A623] text-[11px] font-bold tracking-widest uppercase mt-2">
          {meta.subtitle}
        </p>
        <p className="text-[#3B1A0E] text-sm font-medium mt-3 max-w-lg mx-auto leading-relaxed">
          {meta.description}
        </p>
        <a
          href={meta.whatsappEnquiryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm text-[#3B1A0E] underline underline-offset-2 font-semibold hover:opacity-70 transition-opacity"
        >
          Ask about {categoryName} on WhatsApp
        </a>
      </div>

      {/* Product cards */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              whatsappEnquiryLink={meta.whatsappEnquiryLink}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-[#3B1A0E]/50 py-12">No items in this category yet.</p>
      )}
    </div>
  );
}
