import { useState } from 'react';
import products, { CATEGORIES, CATEGORY_META, type CategoryLabel } from '../../data/products';
import CategoryTabs from '../menu/CategoryTabs';
import CategoryPanel from '../menu/CategoryPanel';
import curvyBg from '../../../assets/designs/curvy-rectangle.png';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryLabel>(CATEGORIES[0]);

  const filtered = products.filter((p) => p.category === activeCategory);
  const meta = CATEGORY_META[activeCategory];

  return (
    <section
      id="menu"
      className="relative py-16 px-4"
      style={{
        backgroundImage: `url(${curvyBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <p className="text-[#3B1A0E] text-xs font-semibold uppercase tracking-widest mb-2">
            Our Menu
          </p>
          <h2 className="font-serif text-[#3B1A0E] font-extrabold text-3xl sm:text-4xl leading-tight">
            Something sweet for every occasion
          </h2>
          <p className="text-[#3B1A0E]/70 text-sm mt-3 max-w-md mx-auto">
            Browse by category, add your favourites to your basket and send your order straight to
            us on WhatsApp.
          </p>
        </div>

        {/* Category tabs */}
        <CategoryTabs
          categories={CATEGORIES as unknown as CategoryLabel[]}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Panel wrapper — dashed border container */}
        <div className="mt-6 border-2 border-dashed rounded-2xl p-6 sm:p-10" style={{ borderColor: '#FDEED1' }}>
          <CategoryPanel
            categoryName={activeCategory}
            meta={meta}
            products={filtered}
          />
          {/* Disclaimer */}
          <p className="text-center text-[#3B1A0E] text-sm font-semibold mt-8 max-w-xl mx-auto leading-relaxed">
            Prices are in Nigerian Naira (₦). Custom designs, flavours and delivery fees are
            confirmed on WhatsApp before payment.
          </p>
        </div>
      </div>
    </section>
  );
}
