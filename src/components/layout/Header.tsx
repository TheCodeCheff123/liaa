import { useEffect, useState } from 'react';
import { useCart, SOCIAL_LINKS } from '../../context/CartContext';
import logoNormal from '../../../assets/designs/Logo normal.png';
import MobileNavDrawer from './MobileNavDrawer';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#FCCEE8] text-[#3B1A0E] text-xs py-2 px-4 flex items-center justify-between">
        <span>Sales are ongoing. Place an order now! 🎂🎉 </span>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs font-medium">Follow us</span>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="ri-instagram-fill text-base text-[#3B1A0E] hover:text-[#F5A623] transition-colors" />
          </a>
          <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <i className="ri-tiktok-fill text-base text-[#3B1A0E] hover:text-[#F5A623] transition-colors" />
          </a>
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <i className="ri-whatsapp-fill text-base text-[#3B1A0E] hover:text-[#F5A623] transition-colors" />
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="#top" className="flex items-center shrink-0 py-2">
            <img src={logoNormal} alt="Liaa Bakes" className="h-10 w-auto" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#3B1A0E] text-sm font-medium px-4 py-3 rounded-xl hover:bg-[#F5A623]/10 hover:text-[#F5A623] transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              onClick={openCart}
              aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
              className="relative flex items-center justify-center w-11 h-11 rounded-xl text-[#3B1A0E] hover:bg-[#F5A623]/10 hover:text-[#F5A623] transition-all duration-150 cursor-pointer"
            >
              <i className="ri-shopping-basket-2-line text-2xl" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#F5A623] text-[#3B1A0E] text-[10px] font-bold min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full leading-none px-1">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Order CTA — desktop only */}
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#F5A623] text-[#3B1A0E] font-bold text-sm px-6 py-3 rounded-full hover:bg-amber-400 active:scale-95 transition-all duration-150"
            >
              <i className="ri-whatsapp-line text-base" />
              Order Via WhatsApp
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-[#3B1A0E] hover:bg-[#3B1A0E]/8 transition-all cursor-pointer"
            >
              <i className="ri-menu-line text-2xl" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
