"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addProduct, removeProduct } from "lib/cart/cart.actions"
import Image from "next/image"
import GetFinalPrice from "My_UI/getFinalPrice"
import { subscribeCart } from "lib/cart/cart.events"
import { Minus, Plus } from "lucide-react"
import { getCart } from "lib/cart/cart.core"
import { notify } from "lib/notify"
import { useLanguage } from "lib/LanguageContext"

export default function RenderItemsList({ container }) {
    const [items, setItems] = useState(container.items || [])
    const [products, setProducts] = useState({})
    const [loading, setLoading] = useState(true)
    const { language } = useLanguage()
    const isSpanish = language === 'es'

    const t = {
        noProducts: isSpanish ? "No hay productos en este contenedor" : "No products in this container",
        remove: isSpanish ? "Eliminar producto" : "Remove Product",
        add: isSpanish ? "Añadir producto" : "Add product"
    }

    async function fetchProduct(id) {
        const res = await fetch(
            `/API/products/${id}?fields=ID,name,basePrice,image,discountPercent`,
            { cache: "no-store" }
        )
        if (!res.ok) notify("error", "Incomplete data", "Products are not loaded successfully. Please refresh your page.")
        return res.json()
    }

    /* 🔴 LIVE CART SUBSCRIPTION */
    useEffect(() => {
        const sync = () => {
            const fresh = getCart()
                ?.find(c => c.id === container.id)

            // Normalize: support both item.ID and item.id
            const normalized = (fresh?.items || []).map(i => ({
                ...i,
                ID: i.ID || i.id,
                id: i.id || i.ID,
            }))
            setItems(normalized)
        }

        sync()
        return subscribeCart(sync)
    }, [container.id])

    /* Fetch product details when item list changes */
    useEffect(() => {
        const fetchProductDetails = () => {
            if (!items.length) {
                setProducts({})
                setLoading(false)
                return
            }

            let alive = true
            setLoading(true)

            const missingItems = items.filter(item => !products[item.ID]);
            
            if (missingItems.length === 0) {
                setLoading(false)
                return
            }

            Promise.all(
                missingItems.map(async (item) => {
                    try {
                        const data = await fetchProduct(item.ID)
                        return { ID: item.ID, ...data }
                    } catch {
                        // Fallback: use data already stored in the item itself
                        return { ID: item.ID, id: item.ID, name: item.name, basePrice: item.price, image: item.image }
                    }
                })
            ).then(entries => {
                if (!alive) return
                setProducts(prev => ({
                    ...prev,
                    ...Object.fromEntries(entries.map(entry => [entry.ID, entry]))
                }))
                setLoading(false)
            })

            return () => {
                alive = false
            }
        }
        fetchProductDetails()
    }, [items])

    if (loading)
        return (
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-20 rounded-lg bg-gray-100 animate-pulse" />
                ))}
            </div>
        )

    if (!items.length)
        return (
            <div className="py-6 text-center text-sm text-gray-500">
                {t.noProducts}
            </div>
        )

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {items.map(item => {
                    const p = products[item.ID]
                    if (!p) return null

                    const productSchema = {
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": p.name,
                        "image": p.image || "/raster/product.jpg",
                        "offers": {
                            "@type": "Offer",
                            "price": p.basePrice || 0,
                            "priceCurrency": "USD"
                        }
                    };

                    return (
                        <div key={`schema-${item.ID}`}>
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
                            />
                            <motion.div
                                key={item.ID}
                                layout
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex gap-4 rounded-xl border border-accent1 bg-primary p-3"
                            >
                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg relative bg-accent2">
                                    <Image
                                        src={p.image || "/raster/product.jpg"}
                                        alt={p.name}
                                        fill
                                        quality={90}
                                        className="object-contain p-1"
                                    />
                                </div>

                            <div className="flex flex-1 flex-col">
                                <p className="text-sm font-medium leading-tight">
                                    {p.name}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-sm font-semibold">
                                        <GetFinalPrice
                                            basePrice={p.basePrice}
                                            discountPercent={p.discountPercent}
                                        />
                                    </span>

                                        <div className="flex items-center gap-2">
                                        <button
                                            aria-label={t.remove}
                                            onClick={() => removeProduct(container.id, item.ID)}
                                            className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-gray-100"
                                        >
                                            <Minus
                                                size={14}
                                                className={item.qty === 1 ? "text-red-500" : ""}
                                            />
                                        </button>

                                        <input
                                            value={item.qty}
                                            onChange={(e) => addProduct(container.id, item.ID, Number(e.target.value))}
                                            className="min-w-5 max-w-15 text-center text-sm font-medium"
                                        />

                                        <button
                                            aria-label={t.add}
                                            onClick={() => addProduct(container.id, item.ID)}
                                            className="flex h-7 w-7 items-center justify-center rounded-md border hover:bg-gray-100"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        </div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
