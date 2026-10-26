import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../context/CartContext';
import heroCupcake from '../../../assets/designs/pngegg-341 1.png';
import Sprinkles from './Sprinkles';

const CakeModel3D = lazy(() => import('./CakeModel3D'));

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.12 },
  }),
};

const TICKER_LABELS = ['Birthday Cakes', 'Bento Cakes', 'Naked Cakes', 'Small Chops', 'Pastries'];

export default function HeroSection() {
  function scrollToMenu() {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }

  const fallbackImg = (
    <img
      src={heroCupcake}
      alt="Freshly baked cake"
      className="w-64 sm:w-80 md:w-[360px] object-contain drop-shadow-2xl"
    />
  );

  return (
    /*
     * The section uses padding-bottom to reserve space for the 3D cake that
     * overflows below the dark card. The cake container is positioned absolute
     * relative to this section so no parent clips it.
     */
    <section id="top" className="bg-white relative" style={{ paddingBottom: 'clamp(140px, 28vw, 260px)' }}>

      {/* Falling sprinkles — covers top portion of section */}
      <Sprinkles />

      {/* ── Dark rounded hero card ──────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pt-4">
        {/* Extra bottom padding on mobile so CTAs sit above cake */}
        <div className="bg-[#3B1A0E] rounded-3xl flex flex-col items-center text-center px-6 pt-12 pb-8 sm:pb-8" style={{ paddingBottom: 'clamp(3.5rem, 8vw, 2rem)' }}>

          {/* Eyebrow */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-white/60 text-xs font-semibold uppercase tracking-[0.25em] mb-5"
          >
            Luxury &bull; Homemade &bull; Freshly Baked
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 max-w-2xl"
          >
            Cakes made with love,{' '}
            <span className="block">
              baked for{' '}
              <span className="text-[#F5A623] italic">your moments.</span>
            </span>
          </motion.h1>

          {/* CTAs — spread far apart so they don't overlap the cake */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="w-full flex items-center justify-between mt-6 px-2 sm:px-8 gap-4"
          >
            <button
              onClick={scrollToMenu}
              className="flex items-center gap-2 bg-[#F5A623] text-[#3B1A0E] font-bold px-6 py-3 rounded-full hover:bg-amber-400 transition-colors text-sm whitespace-nowrap"
            >
              View the menu
              <i className="ri-arrow-right-line" />
            </button>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:border-white/60 transition-colors text-sm whitespace-nowrap"
            >
              <i className="ri-whatsapp-line" />
              Order Via WhatsApp
            </a>
          </motion.div>

        </div>
      </div>

      {/*
       * 3D cake — absolutely positioned over the section, centred horizontally,
       * sitting at the bottom of the dark card and overflowing below it.
       * z-index: 20 puts it above everything including the ticker strip.
       * No parent with overflow:hidden or border-radius touches this element.
       */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' as const, delay: 0.35 }}
        style={{
          position: 'absolute',
          /* on mobile push the cake further down toward the ticker strip */
          bottom: 'clamp(-40px, -6vw, 0px)',
          left: 0,
          right: 0,
          margin: '0 auto',
          width: 'min(480px, 92vw)',
          height: 'clamp(280px, 55vw, 500px)',
          zIndex: 20,
          pointerEvents: 'auto',
        }}
      >
        <Suspense fallback={
          <div className="w-full h-full flex items-end justify-center">
            {fallbackImg}
          </div>
        }>
          <CakeModel3D fallback={fallbackImg} />
        </Suspense>
      </motion.div>

      {/* ── Ticker strip ───────────────────────────────────────────────────── */}
      <div className="relative bg-white border-t border-b border-gray-100 py-3 overflow-hidden" style={{ marginTop: '8px' }}>
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
          style={{ background: 'linear-gradient(to right, white 60%, transparent 100%)' }} />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
          style={{ background: 'linear-gradient(to left, white 60%, transparent 100%)' }} />

        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, pass) => (
            <span key={pass} className="flex items-center" aria-hidden={pass > 0 ? true : undefined}>
              {TICKER_LABELS.map((label) => (
                <span key={label} className="flex items-center">
                  <span className="text-[#3B1A0E]/50 text-xs font-semibold uppercase tracking-[0.2em] px-8">
                    {label}
                  </span>
                  <span className="text-[#F5A623] text-xs">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
