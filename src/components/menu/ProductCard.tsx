import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  whatsappEnquiryLink: string;
}

export default function ProductCard({ product, whatsappEnquiryLink }: ProductCardProps) {
  const { addItem, formatNaira, openCart } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  function handleOrder(variant: Product['variants'][number]) {
    addItem(variant, product.name);
    openCart();
    setAdded(variant.id);
    setTimeout(() => setAdded(null), 1200);
  }

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: '0 12px 32px rgba(245,166,35,0.22)',
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      className="bg-[#FFFDF7] rounded-2xl border-2 border-dashed flex flex-col overflow-hidden"
      style={{ borderColor: '#F7AB1A' }}
    >
      {/* Card body */}
      <div className="flex flex-col flex-1 px-6 pt-6 pb-4 gap-0">

        {/* Title — centred */}
        <h4 className="text-[#3B1A0E] font-bold text-xl text-center leading-tight mb-5">
          {product.name}
        </h4>

        {/* Variant rows — each separated by a thin line */}
        <div className="flex flex-col flex-1">
          {product.variants.map((variant, idx) => {
            const isJustAdded = added === variant.id;
            const isLast = idx === product.variants.length - 1;
            return (
              <div
                key={variant.id}
                className={`flex items-center justify-between gap-4 py-3.5 ${!isLast ? 'border-b border-[#3B1A0E]/10' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[#3B1A0E] text-sm font-normal">{variant.label}</p>
                  <p className="text-[#3B1A0E] text-base font-bold mt-1">
                    {formatNaira(variant.priceNGN)}
                  </p>
                </div>
                <button
                  onClick={() => handleOrder(variant)}
                  aria-label={`Add ${variant.label} of ${product.name} to cart`}
                  className={`
                    flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full text-sm font-semibold
                    transition-all duration-200 cursor-pointer
                    ${isJustAdded
                      ? 'bg-green-600 text-white scale-95'
                      : 'bg-[#3B1A0E] text-white hover:bg-[#F5A623] hover:text-[#3B1A0E]'
                    }
                  `}
                >
                  <i className={`text-sm leading-none ${isJustAdded ? 'ri-check-line' : 'ri-add-line'}`} />
                  <span>{isJustAdded ? 'Added' : 'Order'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Description text — shown below variants when present (e.g. small chops, brownies, pastry box) */}
        {product.description && (
          <p className="text-[#3B1A0E]/70 text-sm text-center leading-snug mt-3">
            {product.description}
          </p>
        )}
      </div>

      {/* Quick Order On WhatsApp — pinned to card bottom */}
      <div className="px-6 pb-5 pt-3">
        <a
          href={whatsappEnquiryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[#2CA84E] text-sm font-semibold hover:underline"
        >
          Quick Order On WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
