import AddToContainer from "My_UI/cart/addToContainer";
import GetFinalPrice from "My_UI/getFinalPrice";
import Image from "next/image";
import NotFoundPage from "../../app/not-found";
import { ProductContent } from "./ProductContent.client";
import { BuyBox } from "./BuyBox.client";

export default async function ProductSection({ product }) {

    return (
        product ?
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column - Image (Amazon style) */}
                <div className="lg:col-span-5 flex justify-center items-center h-[500px] lg:h-[600px] bg-white border border-gray-200 rounded-xl p-4 relative w-full sticky top-24">
                    <Image
                        src={product.image?.url || product.image || '/raster/product.jpg'}
                        alt={`${product.name} - ${product.category} - ${product.subcategory} | Unitec USA Design`}
                        className="object-contain p-4 mix-blend-multiply"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Middle Column - Product Info */}
                <ProductContent product={product} />

                {/* Right Column - Buy Box */}
                <BuyBox product={product} />
            </section>
            : <NotFoundPage />
    );
}
