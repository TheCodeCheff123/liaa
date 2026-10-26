import img01 from '../../../assets/designs/image 01.png';
import img02 from '../../../assets/designs/image 02.png';
import img03 from '../../../assets/designs/image 03.png';
import img04 from '../../../assets/designs/image 04.png';
import img05 from '../../../assets/designs/image 05.png';

export default function GallerySection() {
  return (
    <section id="gallery" className="py-0 px-0">

      {/*
        Desktop layout — two independent flex rows so each row has its own column widths.
        Row 1: [img01 narrow] [img04 wide] [img05 tall — absolute right, spans both rows]
        Row 2: [img03 wide]   [img02 narrow]
        img05 is absolutely positioned on the right, spanning the full section height.
      */}

      {/* ── Mobile: single column stack ── */}
      <div className="flex flex-col md:hidden">
        <div className="overflow-hidden">
          <img src={img01} alt="Drip cake with caramel frosting"
            className="w-full h-56 object-cover object-center hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="overflow-hidden">
          <img src={img04} alt="Chocolate strawberry dessert bowl"
            className="w-full h-56 object-cover object-center hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="overflow-hidden">
          <img src={img05} alt="Freshly baked hand pies"
            className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="overflow-hidden">
          <img src={img03} alt="Cupcakes with cream frosting"
            className="w-full h-56 object-cover object-top hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="overflow-hidden">
          <img src={img02} alt="Assorted fried pastry snacks"
            className="w-full h-56 object-cover object-center hover:scale-105 transition-transform duration-500" />
        </div>
      </div>

      {/* ── Desktop: two flex rows + absolute tall right column ── */}
      <div className="hidden md:block relative" style={{ height: '480px' }}>

        {/* Left + centre area: two rows stacked, leaving right ~30% for img05 */}
        <div className="absolute inset-0" style={{ right: '30%' }}>

          {/* Row 1: img01 (narrow) + img04 (wide) */}
          <div className="flex h-1/2">
            <div className="overflow-hidden" style={{ flex: '0 0 38%' }}>
              <img src={img01} alt="Drip cake with caramel frosting"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden" style={{ flex: '1 1 0' }}>
              <img src={img04} alt="Chocolate strawberry dessert bowl"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          {/* Row 2: img03 (wide) + img02 (narrow) */}
          <div className="flex h-1/2">
            <div className="overflow-hidden" style={{ flex: '1 1 0' }}>
              <img src={img03} alt="Cupcakes with cream frosting"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden" style={{ flex: '0 0 38%' }}>
              <img src={img02} alt="Assorted fried pastry snacks"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

        </div>

        {/* Right column: img05 tall portrait, pinned to the right edge */}
        <div className="absolute top-0 bottom-0 right-0 overflow-hidden" style={{ width: '30%' }}>
          <img src={img05} alt="Freshly baked hand pies"
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
        </div>

      </div>

    </section>
  );
}
