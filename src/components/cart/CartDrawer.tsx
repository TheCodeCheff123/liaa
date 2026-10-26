import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const {
    items,
    totalItems,
    totalPriceNGN,
    updateQuantity,
    removeItem,
    clearCart,
    isCartOpen,
    closeCart,
    openCheckout,
    formatNaira,
  } = useCart();

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isCartOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeCart();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your Order"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-[#3B1A0E] font-bold text-xl">
            Your Order
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-semibold text-[#F5A623]">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-[#3B1A0E] hover:text-[#F5A623] transition-colors cursor-pointer p-1 -mr-1"
          >
            <i className="ri-close-line text-2xl" />
          </button>
        </div>

        {/* Scrollable item list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <i className="ri-shopping-basket-2-line text-5xl text-gray-200" />
              <p className="text-gray-400 text-sm">
                Your basket is empty.
                <br />
                Add something sweet!
              </p>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.variantId} className="py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#3B1A0E] font-semibold text-sm leading-snug">
                        {item.productName}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.variantLabel}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[#3B1A0E] font-bold text-sm">
                        {formatNaira(item.priceNGN * item.quantity)}
                      </p>
                      <p className="text-gray-400 text-xs">{formatNaira(item.priceNGN)} each</p>
                    </div>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.productName}`}
                        className="w-8 h-8 flex items-center justify-center text-[#3B1A0E] hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <i className="ri-subtract-line text-sm" />
                      </button>
                      <span className="w-8 text-center text-[#3B1A0E] font-semibold text-sm select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.productName}`}
                        className="w-8 h-8 flex items-center justify-center text-[#3B1A0E] hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <i className="ri-add-line text-sm" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-[#F5A623] text-xs font-medium hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer: total + actions */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#3B1A0E] font-semibold text-sm">Estimated total</p>
                <p className="text-gray-400 text-xs">Delivery fee is confirmed on WhatsApp.</p>
              </div>
              <p className="text-[#3B1A0E] font-extrabold text-lg">{formatNaira(totalPriceNGN)}</p>
            </div>
            <button
              onClick={openCheckout}
              className="w-full bg-[#F5A623] hover:bg-amber-400 text-[#3B1A0E] font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <i className="ri-whatsapp-line text-lg" />
              Place Order via WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="w-full text-gray-400 hover:text-red-500 text-xs font-medium transition-colors cursor-pointer py-1"
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>

      {/* Checkout modal rendered above drawer */}
      <CheckoutModal />
    </>
  );
}
