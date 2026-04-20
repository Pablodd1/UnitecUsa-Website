"use client"
import SeoHead from "components/SeoHead"
import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Volume2, Sparkles, Box as BoxIcon } from "lucide-react"
import { getCart, removeContainer, removeOne, addOne, setQty } from "utils/cart/cart.core"
import { containerFillPercent, calculateRemainingCapacity } from "utils/cart/cart.utils"
import Link from "next/link"
import Image from "next/image"
import Container3DView from "components/cart/Container3DView"
import ContainerProgressHUD from "components/cart/ContainerProgressHUD"
import { useLanguage } from "lib/LanguageContext"
import confetti from "canvas-confetti"


function FlyingProduct({ product }) {
    return (
        <motion.div
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x: -150, y: -100, scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ position: "fixed", left: "50%", top: "30%", zIndex: 9999, pointerEvents: "none" }}
        >
            <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                <Image src={product.image || '/raster/product.jpg'} alt={product.name} fill className="object-cover rounded-full" />
            </div>
        </motion.div>
    )
}

function CelebrationParticles() {
    const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"]
    return (
        <>
            {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: "50%", y: "50%", opacity: 1, scale: 0 }}
                    animate={{ x: `${50 + (Math.random() - 0.5) * 100}%`, y: `${50 + (Math.random() - 0.5) * 100}%`, opacity: 0, rotate: Math.random() * 360 }}
                    transition={{ duration: 1 + Math.random(), ease: "easeOut", delay: Math.random() * 0.3 }}
                    style={{ position: "absolute", width: 12, height: 12, backgroundColor: colors[Math.floor(Math.random() * colors.length)], borderRadius: "50%" }}
                />
            ))}
        </>
    )
}

// TopProgressBar replaced by ContainerProgressHUD

export default function CartPage() {
    const { t, language } = useLanguage()

    const [cart, setCart] = useState([])
    const [mounted, setMounted] = useState(false)
    const [flyingProducts, setFlyingProducts] = useState([])
    const [showCelebration, setShowCelebration] = useState(false)
    const wasFull = useRef(false)

    useEffect(() => {
        const initializeCart = () => {
            setMounted(true)
            setCart(getCart())
        }
        initializeCart()

        const handleCartUpdate = () => {
            setCart([...getCart()])
        }

        window.addEventListener("cart-updated", handleCartUpdate)
        return () => window.removeEventListener("cart-updated", handleCartUpdate)
    }, [])

    useEffect(() => {
        if (mounted && cart.length > 0) {
            const fill = containerFillPercent(cart[0])
            if (fill.filledTotal >= 99 && !wasFull.current) {
                wasFull.current = true
                setShowCelebration(true)
                confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#22c55e", "#3b82f6", "#f59e0b"] })
                setTimeout(() => setShowCelebration(false), 3000)
            }
            if (fill.filledTotal < 99) wasFull.current = false
        }
    }, [cart, mounted])

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

    const handleAddItem = useCallback((containerId, product) => {
        const id = Date.now()
        setFlyingProducts(prev => [...prev, { ...product, tempId: id }])
        setTimeout(() => {
            addOne(containerId, product)
            setFlyingProducts(prev => prev.filter(p => p.tempId !== id))
            updateCart()
        }, 100)
    }, [])

    const handleSetQuantity = (containerId, product, qty) => {
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
            <main className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-4 animate-pulse" />
                    <p className="text-gray-500">{t("recommendations.loading")}</p>
                </div>
            </main>
        )
    }

    if (cart.length === 0) {
        return (
            <main className="w-full min-h-screen bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src="/raster/interior.webp" alt="Background" fill className="object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50" />
                </div>
                <section className="relative z-10 bg-gray-900/40 backdrop-blur-sm py-24 text-white min-h-screen flex items-center justify-center">
                    <div className="mx-auto max-w-2xl px-4 text-center">
                        <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                        <h1 className="text-4xl font-bold mb-4">{t("cart.empty")}</h1>
                        <p className="text-gray-200 mb-8 max-w-md mx-auto">
                            {t("cart.emptyDescription")}
                        </p>
                        <Link 
                            href="/collections"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all hover:scale-105"
                        >
                            {t("cart.browseProducts")}
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </main>
        )
    }

    const container = cart[0]
    const fill = containerFillPercent(container)
    const isFull = fill.filledTotal >= 99
    const itemCount = calculateItemCount()

    const usedVolume = fill.usableVolume - (fill.remainingVolume ?? 0)

    return (
        <>
            <SeoHead 
                title={`${t("cart.title")} | Unitec USA Design`} 
                description={t("cart.emptyDescription")}
                canonical="https://unitecusadesign.com/cart"
            />
            <main className="min-h-screen bg-gray-50 pb-32 relative">
                <div className="absolute inset-0 z-0 h-[50vh]">
                    <Image src="/raster/interior.webp" alt="Background" fill className="object-cover opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50" />
                </div>
            <AnimatePresence>
                {flyingProducts.map((product) => (<FlyingProduct key={product.tempId} product={product} />))}
            </AnimatePresence>
            <AnimatePresence>
                {showCelebration && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
                        <CelebrationParticles />
                        <motion.div initial={{ scale: 0, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                            <Sparkles className="w-8 h-8" />
                            <span className="text-xl font-bold">{t("cart.containerFull")}</span>
                            <Sparkles className="w-8 h-8" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                            <Link href="/collections" className="p-2 hover:bg-gray-100 rounded-lg">
                                <ArrowRight className="w-5 h-5 rotate-180" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold">{t("cart.title")}</h1>
                                <p className="text-sm text-gray-500">{container.name} - {container.dimension?.length}x{container.dimension?.width}x{container.dimension?.height}m</p>
                            </div>
                        </div>
                        <button onClick={() => handleRemoveContainer(cart[0]?.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-6 space-y-6">
                {/* Cinematic Container Visualization + Live HUD */}
                <div className="bg-[#080c14] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    {/* Live Progress HUD — sits above the 3D viewport */}
                    <div className="px-4 pt-6 pb-2">
                        <ContainerProgressHUD
                            fillPercent={fill.filledTotal || 0}
                            usableVolume={fill.usableVolume || 0}
                            usedVolume={usedVolume || 0}
                            remainingVolume={fill.remainingVolume || 0}
                            itemCount={itemCount}
                            size={container.name && container.name.includes('40') ? '40ft' : '20ft'}
                            lang={language}
                        />
                    </div>
                    
                    <div className="aspect-[21/9] md:aspect-[21/8] w-full flex items-center justify-center p-4 bg-[#0a0a0a] overflow-hidden relative">
                        <Container3DView 
                            size={container.name && container.name.includes('40') ? '40ft' : '20ft'}
                            width={container.dimension?.width || 2.35}
                            height={container.dimension?.height || 2.39}
                            length={container.dimension?.length || 12.03}
                            items={container.items || []}
                            fillPercent={fill.filledTotal || 0}
                            isInteractive={false}
                            scale={1.2}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {cart[0]?.items.map((item) => {
                        const remaining = calculateRemainingCapacity(cart[0], item)
                        return (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 relative border border-gray-100">
                                    <Image src={item.image || '/raster/product.jpg'} alt={item.name} fill className="object-contain p-1 mix-blend-multiply" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => handleRemoveItem(cart[0].id, item.id)} className="w-10 h-10 bg-gray-50 rounded-xl hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors">
                                        <Minus size={16} />
                                    </button>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={item.qty}
                                        onChange={(e) => handleSetQuantity(cart[0].id, item, e.target.value)}
                                        className="w-16 text-center border-none bg-gray-50 rounded-xl py-2 px-2 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                                    />
                                    <button onClick={() => handleAddItem(cart[0].id, item)} className="w-10 h-10 bg-gray-50 rounded-xl hover:bg-blue-50 text-blue-500 flex items-center justify-center transition-colors">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs bg-gray-50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Volume2 size={14} className="text-gray-400" />
                                    <span className="font-medium">{item.dimensions?.length}x{item.dimensions?.width}x{item.dimensions?.height}mm</span>
                                </div>
                                <div className={`font-bold px-3 py-1 rounded-full ${remaining > 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
                                    {remaining > 0 ? `+${remaining} ${t("cart.items")}` : t("cart.containerFull")}
                                </div>
                            </div>
                        </motion.div>
                        )
                    })}
                    
                    <Link href="/collections" className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-primary hover:text-primary transition-all group bg-white/50">
                        <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                        <span className="font-bold text-lg">{t("cart.continueShopping")}</span>
                    </Link>
                </div>
            </div>

            <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto">
                    <Link 
                        href={isFull ? "/checkout" : "#"} 
                        className={`group flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg transition-all ${isFull ? "bg-black text-white hover:bg-gray-900 hover:scale-[1.02] shadow-xl" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                    >
                        {isFull ? (
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-yellow-400" />
                                <span>{t("cart.proceedToCheckout")}</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full px-4">
                                <span className="text-gray-500">{t("cart.total")}:</span>
                                <span className="text-black text-xl">${calculateTotal().toLocaleString()} <span className="text-sm font-normal text-gray-400">({itemCount} {t("cart.items")})</span></span>
                            </div>
                        )}
                    </Link>
                    <p className="text-center text-xs text-gray-400 mt-4 italic">
                        * {t("checkout.paymentDesc")}
                    </p>
                </div>
            </footer>
        </main>
        </>
    )
}
