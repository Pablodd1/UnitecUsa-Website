import Image from "next/image";
import ProductContent from "./ProductContent.client";
import BuyBox from "./BuyBox.client";

export default function ProductSection({ data }) {
  const imageSrc = data.image?.url || data.image || "/raster/product.jpg";
  const imageAlt = data.image_alt_text || data.name || "Product image";

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Image Gallery */}
        <div className="lg:col-span-5">
          <div className="relative h-[420px] rounded-2xl overflow-hidden bg-gray-100 border border-slate-200/70">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-contain p-4"
            />
          </div>
        </div>

        {/* Summary Info */}
        <div className="lg:col-span-4">
          <ProductContent product={data} />
        </div>

        {/* Price & Container Action Box */}
        <div className="lg:col-span-3 lg:sticky lg:top-24">
          <BuyBox product={data} />
        </div>
      </div>
    </section>
  );
}
