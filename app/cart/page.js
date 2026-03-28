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
import ThreeCartEngine from "components/cart/ThreeCartEngine"

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

    const isAllContainersFull = () => {
        if (cart.length === 0) return false;
        for (const container of cart) {
            const { filledTotal } = containerFillPercent(container);
            // Strict 100% requirement as requested
            if (filledTotal < 99.9) return false;
        }
        return true;
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

                {/* 🟢 Right Side: Interactive Logistics Panel */}
                <section className="bg-white text-black flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-20">
                    <header className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                             <Package className="w-5 h-5 text-blue-600" />
                             <h2 className="font-bold uppercase tracking-tight text-lg">Inventory</h2>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                            {calculateItemCount()} Items
                        </span>
                    </header>

                    {/* Scrollable Item Stream with "Tiny Pictures" and "+" buttons */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        <AnimatePresence>
                             {cart[0]?.items.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors group"
                                >
                                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gray-50 overflow-hidden relative border border-gray-100 p-1">
                                        <Image
                                            src={item.image || '/raster/product.jpg'}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold leading-tight line-clamp-2 uppercase">
                                            {item.name}
                                        </p>
                                        <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-gray-400">
                                            <span className="font-bold text-blue-600 capitalize">#{item.category.toLowerCase()}</span>
                                            <span>•</span>
                                            <span>SKU: {item.id}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                                            <button 
                                                onClick={() => handleRemoveItem(cart[0].id, item.id)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-6 text-center text-xs font-black">{item.qty}</span>
                                            <button 
                                                onClick={() => handleAddItem(cart[0].id, item)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-blue-600"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                             ))}
                        </AnimatePresence>

                        <Link href="/collections" className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all group">
                             <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                             <span className="text-xs font-bold uppercase tracking-widest">Add Products</span>
                        </Link>
                    </div>

                    {/* Checkout "Logic Gate" Integration */}
                    <footer className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                        <div className="space-y-2">
                             <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pricing Model</span>
                                <span className="text-xl font-black text-black">
                                     {calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'Quotation Basis'}
                                </span>
                             </div>
                             
                             <div className="flex flex-col gap-1.5 p-4 bg-white rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase italic">
                                    <span className={isAllContainersFull() ? 'text-green-600' : 'text-orange-500'}>
                                        {isAllContainersFull() ? '✓ READY TO SHIP' : '⚠ FILLING CONTAINER'}
                                    </span>
                                    <span>{containerFillPercent(cart[0]).filledTotal.toFixed(1)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                     <motion.div 
                                        className={`h-full ${isAllContainersFull() ? 'bg-green-500' : 'bg-blue-600'}`}
                                        animate={{ width: `${Math.min(containerFillPercent(cart[0]).filledTotal, 100)}%` }}
                                     />
                                </div>
                                {!isAllContainersFull() && (
                                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 leading-normal">
                                        Minimum 100% capacity required to initiate quote logic and proceed.
                                    </p>
                                )}
                             </div>
                        </div>

                        <Link 
                            href={isAllContainersFull() ? "/checkout" : "#"}
                            onClick={(e) => { if (!isAllContainersFull()) e.preventDefault() }}
                            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isAllContainersFull() ? 'bg-black text-white hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                        >
                            {t('cart.proceedToCheckout')}
                            <ArrowRight size={16} className={isAllContainersFull() ? 'animate-bounce-x' : ''} />
                        </Link>
                    </footer>
                </section>
            </div>
        </main>
    )
}
