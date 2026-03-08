"use client";

import { motion } from "framer-motion";
import { addOne } from "lib/cart/cart.actions";
import AddToContainer from "My_UI/cart/addToContainer";
import GetFinalPrice from "My_UI/getFinalPrice";
import Image from "next/image";
import Link from "next/link";


import { useRouter } from "next/navigation";

export default function ProductItem({ item, isSlides = false, index = 0 }) {
    const router = useRouter();

    return (
        <motion.li
            onClick={() => router.push(`/products/${item.id}`)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className={`${isSlides ? 'embla__slide' : ''} flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full`}
        >
            {/* Image Container */}
            <Link href={`/products/${item.id}`} className='relative h-56 w-full overflow-hidden bg-gray-50'>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="relative h-full w-full"
                >
                    <Image
                        fill
                        aria-label={`Go To product with ID ${item.id}`}
                        src={item.image || '/raster/product.jpg'}
                        alt={item.name || 'Product image'}
                        className="object-contain object-center p-4"
                    />
                </motion.div>
            </Link>

            {/* Content Container */}
            <div className="flex flex-col flex-grow p-4 gap-3">
                {/* Price */}
                <div className="text-lg font-bold">
                    <GetFinalPrice
                        basePrice={item.basePrice}
                        discountPercent={item.discountPercent}
                        className='text-black bg-primary shadow shadow-secondary/75 px-2 py-1 rounded-md tracking-wide font-mono text-sm'
                    />
                </div>

                {/* Product Name */}
                <Link href={`/products/${item.id}`} aria-label={`Go To product with ID ${item.id}`}>
                    <motion.h3
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-base text-gray-800 font-semibold tracking-wide hover:text-primary transition-colors line-clamp-2"
                    >
                        {item.name}
                    </motion.h3>
                </Link>

                {/* Spacer to push button to bottom */}
                <div className="flex-grow"></div>

                <AddToContainer
                    item={{
                        id: item.id,
                        dimensions: item.dimensions,
                        price: item.basePrice,
                        name: item.name,
                        image: item.image?.url || item.image || '/raster/product.jpg'
                    }}
                />
            </div>
        </motion.li>
    )
}