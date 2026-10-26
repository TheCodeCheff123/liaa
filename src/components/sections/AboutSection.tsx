import brandImage from '../../../assets/designs/Image 87865.png';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Brand image */}
        <div className="shrink-0 w-72 sm:w-80">
          <img
            src={brandImage}
            alt="Liaa Bakes — Baked with care"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Copy */}
        <div className="flex-1">
          <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest mb-2">
            About Liaa
          </p>
          <h2 className="font-serif text-[#3B1A0E] font-bold text-3xl sm:text-4xl leading-snug mb-5">
            A home kitchen with a luxury touch
          </h2>
          <p className="text-[#3B1A0E]/70 text-sm leading-relaxed mb-3">
            Liaa is a homemade bakery built on one simple idea: celebrations deserve cakes that look
            beautiful and taste even better. Every order is baked fresh in small batches, with quality
            ingredients, careful finishing and attention to the little details.
          </p>
          <p className="text-[#3B1A0E]/70 text-sm leading-relaxed mb-8">
            Whether it is a birthday, a surprise gift, a party table or just a craving, we are happy
            to customise sizes, flavours and designs to fit your moment.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {[
              'Baked fresh to order',
              'Custom designs available',
              'Cakes, pastries & small chops',
              'Easy ordering on WhatsApp',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-[#3B1A0E]/80">
                <i className="ri-checkbox-circle-fill text-[#F5A623] text-base shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
