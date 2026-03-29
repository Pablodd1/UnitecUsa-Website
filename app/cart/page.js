"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, Printer, ShoppingCart, ArrowRight, Package } from "lucide-react"
import { useLanguage } from "lib/LanguageContext"
import { getCart, removeContainer, removeOne, addOne, setQty } from "utils/cart/cart.core"
import { containerFillPercent } from "utils/cart/cart.utils"
import Link from "next/link"
import Image from "next/image"
import Container3DView from "My_UI/cart/Container3DView"
import ThreeCartEngine from "My_UI/cart/ThreeCartEngine"
import CartControlPanel from "My_UI/cart/CartControlPanel"

// Helper function to get color based on item category
const getContainerItemColor = (category) => {
    const colors = {
        'PAREDES': '#3B82F6',      // Blue
        'LAMINAS': '#8B5CF6',      // Purple
        'PISOS': '#10B981',        // Green
        'CUBIERTAS UPVC': '#F59E0B', // Amber
        'PANELES WPC Y ANGULOS': '#EF4444', // Red
        'default': '#60A5FA'
    }
    return colors[category] || colors.default
}

export default function CartPage() {
    const { t } = useLanguage()
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState({})
    const [mounted, setMounted] = useState(false)
    const [loadingProducts, setLoadingProducts] = useState(false)

    useEffect(() => {
        const initializeCart = () => {
            setMounted(true)
            setCart(getCart())
        }
        initializeCart()
    }, [])

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (cart.length === 0) return
            
            const uniqueIds = Array.from(new Set(cart.flatMap(c => c.items.map(i => i.ID || i.id))))
            const missingIds = uniqueIds.filter(id => !products[id])
            
            if (missingIds.length === 0) return
            
            setLoadingProducts(true)
            try {
                const results = await Promise.all(
                    missingIds.map(async (id) => {
                        const res = await fetch(`/API/products/${id}?fields=ID,name,image,dimensions,category`)
                        return res.json()
                    })
                )
                
                const newProducts = {}
                results.forEach(p => { newProducts[p.ID || p.id] = p })
                
                setProducts(prev => ({ ...prev, ...newProducts }))
            } catch (err) {
                console.error("Failed to fetch products for 3D engine:", err)
            } finally {
                setLoadingProducts(false)
            }
        }
        
        fetchProductDetails()
    }, [cart])

    const updateCart = () => {
        setCart([...getCart()])
    }

    const handleRemoveContainer = (containerId) => {
        removeContainer(containerId)
        updateCart()
    }

    const handleRemoveItem = (containerId, productId) => {
        removeOne(containerId, productId)
        updateCart()
    }

    const handleAddItem = (containerId, product) => {
        addOne(containerId, product)
        updateCart()
    }

    const handleSetQty = (containerId, product, qty) => {
        const val = parseInt(qty)
        if (isNaN(val) || val < 0) return
        setQty(containerId, product, val)
        updateCart()
    }


    const calculateTotal = () => {
        return cart.reduce((total, container) => {
            return total + container.items.reduce((itemTotal, item) => {
                return itemTotal + (item.price || 0) * item.qty
            }, 0)
        }, 0)
    }

    const calculateItemCount = () => {
        return cart.reduce((count, container) => {
            return count + container.items.reduce((itemCount, item) => itemCount + item.qty, 0)
        }, 0)
    }

    if (!mounted) {
        return (
            <main className="w-full min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-20">
                    <div className="text-center">
                        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h1 className="text-3xl font-bold mb-4">Loading Cart...</h1>
                    </div>
                </div>
            </main>
        )
    }

    if (cart.length === 0) {
        return (
            <main className="w-full min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gray-900 py-20 text-white">
                    <div className="mx-auto max-w-6xl px-4 text-center">
                        <ShoppingCart className="w-16 h-16 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('cart.empty')}</h1>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            {t('cart.emptyDescription')}
                        </p>
                        <Link 
                            href="/collections"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-gray-200"
                        >
                            {t('cart.browseProducts')}
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="w-full min-h-screen bg-black text-white">
            {/* 3D-First Interactive Dashboard */}
            <div className="grid lg:grid-cols-[1fr_400px] h-screen overflow-hidden">
                
                {/* 🔴 Left Side: The 3D Engine Stage */}
                <section className="relative flex flex-col p-4 md:p-8 bg-[#0a0a0a]">
                    <header className="flex items-center justify-between mb-8 z-10">
                         <div className="flex items-center gap-4">
                            <Link href="/collections" className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-black uppercase tracking-tighter">
                                    {t('cart.title')}
                                </h1>
                                <p className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">
                                    Container ID: #{cart[0]?.id?.split('-')[0]}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button onClick={() => window.print()} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                                <Printer size={18} />
                            </button>
                            <button onClick={() => handleRemoveContainer(cart[0]?.id)} className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </header>

                    <div className="flex-1 relative min-h-0">
                        {cart.length > 0 && (
                            <ThreeCartEngine 
                                container={cart[0]}
                                items={cart[0]?.items}
                                products={products || {}}
                            />
                        )}
                    </div>
                </section>

                {/* 🟢 Right Side: Interactive Logistics Panel (Extracted Component) */}
                <CartControlPanel 
                    container={cart[0]}
                    onAdd={handleAddItem}
                    onRemove={handleRemoveItem}
                    onSetQty={handleSetQty}
                    totalItems={calculateItemCount()}
                    totalPrice={calculateTotal()}
                    t={t}
                />
            </div>
        </main>
    )
}
