import type { CategoryLabel } from '../../data/products';

interface CategoryTabsProps {
  categories: CategoryLabel[];
  active: CategoryLabel;
  onChange: (cat: CategoryLabel) => void;
}

export default function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 w-max mx-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold border
              transition-colors duration-150 cursor-pointer
              ${
                active === cat
                  ? 'bg-[#3B1A0E] text-white border-[#3B1A0E]'
                  : 'bg-transparent text-[#3B1A0E] border-[#3B1A0E] hover:bg-[#3B1A0E]/10'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
