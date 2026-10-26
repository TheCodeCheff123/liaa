import { useState, useEffect } from 'react';
import { CartProvider, SOCIAL_LINKS } from './context/CartContext';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import MenuSection from './components/sections/MenuSection';
import HowToOrderSection from './components/sections/HowToOrderSection';
import AboutSection from './components/sections/AboutSection';
import GallerySection from './components/sections/GallerySection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/cart/CheckoutModal';

export default function App() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() { setShowTop(window.scrollY > 400); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <main>
          <HeroSection />
          <MenuSection />
          <HowToOrderSection />
          <AboutSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
        {/* Global overlays */}
        <CartDrawer />
        <CheckoutModal />

        {/* ── Scroll-to-top button — appears after 400px scroll ────────────── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#3B1A0E] shadow-md border border-gray-100 hover:bg-[#F5A623] hover:text-white hover:border-[#F5A623] hover:scale-110 active:scale-95 transition-all duration-200"
          style={{
            bottom: '5.5rem',  /* sits directly above the WhatsApp button */
            opacity: showTop ? 1 : 0,
            pointerEvents: showTop ? 'auto' : 'none',
            transform: showTop ? 'scale(1)' : 'scale(0.7)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          <i className="ri-arrow-up-line text-xl" />
        </button>

        {/* ── Floating WhatsApp button ──────────────────────────────────────── */}
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Liaa on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5d] hover:scale-110 active:scale-95 transition-all duration-200"
          style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.45)' }}
        >
          <i className="ri-whatsapp-fill text-3xl" />
        </a>
      </div>
    </CartProvider>
  );
}
