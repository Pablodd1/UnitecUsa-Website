"use client";

import { motion } from "framer-motion";
import AddToContainer from "My_UI/cart/addToContainer";
import GetFinalPrice from "My_UI/getFinalPrice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "lib/LanguageContext";

export default function ProductItem({ item, isSlides = false, index = 0 }) {
    const router = useRouter();
    const { language } = useLanguage();
    const isSpanish = language === "es";

    const productSlug = item.slug || item.id;
    const productHref = `/productos/${productSlug}`;
    const displayName = item.locale_variants?.[language]?.name || item.name;
    const displayAlt = item.locale_variants?.[language]?.image_alt_text || item.image_alt_text || displayName || 'Product image';

    return (
        <motion.div
            onClick={() => router.push(productHref)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className={`${isSlides ? 'embla__slide' : ''} flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full`}
        >
            {/* Image Container */}
            <Link href={productHref} className="relative h-56 w-full overflow-hidden bg-gray-50">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="relative h-full w-full"
                >
                    <Image
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        aria-label={displayName}
                        src={item.image || '/raster/product.jpg'}
                        alt={displayAlt}
                        className="object-contain object-center p-4"
                    />
                </motion.div>
            </Link>

            {/* Content Container */}
            <div className="flex flex-col flex-grow p-4 gap-2.5">
                {/* Price & Currency (ISO code, never bare $) */}
                <div className="flex items-baseline justify-between gap-2">
                    <div className="text-base font-bold">
                        <GetFinalPrice
                            basePrice={item.basePrice}
                            price={item.price}
                            currency={item.currency || "USD"}
                            discountPercent={item.discountPercent}
                            className="text-black tracking-wide font-mono text-base font-extrabold"
                        />
                    </div>
                    {item.price_per_m2 > 0 && (
                        <span className="text-[11px] font-semibold text-slate-500 font-mono">
                            {Number(item.price_per_m2).toFixed(2)} {item.currency || "USD"}/m²
                        </span>
                    )}
                </div>

                {/* Product Name */}
                <Link href={productHref} aria-label={displayName}>
                    <motion.h3
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm text-gray-800 font-semibold tracking-wide hover:text-primary transition-colors line-clamp-2"
                    >
                        {displayName}
                    </motion.h3>
                </Link>

                {/* Quick dimensional summary */}
                {(item.width_cm && item.length_cm) && (
                    <p className="text-xs text-slate-500">
                        {item.width_cm} × {item.length_cm} cm
                        {item.thickness_mm ? ` • ${item.thickness_mm} mm` : ''}
                        {item.m2_per_box ? ` • ${item.m2_per_box} m²/${isSpanish ? 'caja' : 'box'}` : ''}
                    </p>
                )}

                <div className="flex-grow" />

                <AddToContainer
                    item={{
                        id: item.id,
                        slug: item.slug,
                        dimensions: item.dimensions,
                        container_volume_m3_per_unit: item.container_volume_m3_per_unit,
                        m2_per_box: item.m2_per_box,
                        units_per_box: item.units_per_box,
                        weight_kg_per_box: item.weight_kg_per_box,
                        price: item.price ?? item.basePrice,
                        currency: item.currency || "USD",
                        name: displayName,
                        image: item.image?.url || item.image || '/raster/product.jpg'
                    }}
                />
            </div>
        </motion.div>
    );
}
