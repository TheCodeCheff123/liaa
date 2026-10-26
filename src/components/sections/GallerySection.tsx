import img01 from '../../../assets/designs/image 01.png';
import img02 from '../../../assets/designs/image 02.png';
import img03 from '../../../assets/designs/image 03.png';
import img04 from '../../../assets/designs/image 04.png';
import img05 from '../../../assets/designs/image 05.png';

export default function GallerySection() {
  return (
    <section id="gallery" className="py-0 px-0">
      {/*
        Bento grid matching design:
        Row 1: 3 equal columns  [img01] [img04] [img05]
        Row 2: 2 columns        [img02 col-span-2] [img03]
      */}
      <div className="grid grid-cols-3 gap-0">

        {/* Row 1 — three equal cells */}
        <div className="overflow-hidden">
          <img
            src={img01}
            alt="Drip cake with caramel frosting"
            className="w-full h-40 md:h-52 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src={img04}
            alt="Chocolate and strawberry dessert bowl"
            className="w-full h-40 md:h-52 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src={img05}
            alt="Freshly baked hand pies"
            className="w-full h-40 md:h-52 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Row 2 — cupcake wide (col-span-2) + pastries */}
        <div className="col-span-2 overflow-hidden">
          <img
            src={img02}
            alt="Cupcakes with cream frosting"
            className="w-full h-40 md:h-52 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src={img03}
            alt="Assorted fried pastry snacks"
            className="w-full h-40 md:h-52 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
}
