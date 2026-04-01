"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Volume2, Sparkles } from "lucide-react"
import { getCart, removeContainer, removeOne, addOne, setQty } from "utils/cart/cart.core"
import { containerFillPercent, calculateRemainingCapacity } from "utils/cart/cart.utils"
import Link from "next/link"
import Image from "next/image"
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

function TopProgressBar({ fill, itemCount }) {
    const isFull = fill.filledTotal >= 99
    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-5">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Volumen</p>
                            <p className="text-2xl font-bold">{fill.usableVolume?.toFixed(1)}<span className="text-sm text-gray-400">m³</span></p>
                        </div>
                        <div className="w-px h-10 bg-gray-700" />
                        <div className="text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Items</p>
                            <p className="text-2xl font-bold">{itemCount}</p>
                        </div>
                        <div className="w-px h-10 bg-gray-700" />
                        <div className="text-center">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Llenado</p>
                            <p className={`text-2xl font-bold ${isFull ? "text-green-400" : "text-blue-400"}`}>{fill.filledTotal.toFixed(0)}%</p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${isFull ? "bg-green-500" : "bg-blue-600"}`}>
                        {isFull ? "✓ CONTENEDOR LLENO" : `${fill.remainingVolume?.toFixed(1)}m³ disponible`}
                    </div>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden relative">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${fill.filledTotal}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${isFull ? "bg-gradient-to-r from-green-400 via-green-500 to-green-400" : "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-pulse"}`} />
                </div>
            </div>
        </div>
    )
}

export default function CartPage() {
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
                    <p className="text-gray-500">Cargando...</p>
                </div>
            </main>
        )
    }

    if (cart.length === 0) {
        return (
            <main className="w-full min-h-screen bg-gray-50">
                <section className="bg-gray-900 py-24 text-white">
                    <div className="mx-auto max-w-2xl px-4 text-center">
                        <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                        <h1 className="text-4xl font-bold mb-4">Tu carrito esta vacio</h1>
                        <p className="text-gray-400 mb-8">
                            Selecciona un contenedor y agrega productos para comenzar.
                        </p>
                        <Link 
                            href="/collections"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200"
                        >
                            Ver Productos
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

    return (
        <main className="min-h-screen bg-gray-50 pb-32">
            <AnimatePresence>
                {flyingProducts.map((product) => (<FlyingProduct key={product.tempId} product={product} />))}
            </AnimatePresence>
            <TopProgressBar fill={fill} itemCount={itemCount} />
            <AnimatePresence>
                {showCelebration && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
                        <CelebrationParticles />
                        <motion.div initial={{ scale: 0, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                            <Sparkles className="w-8 h-8" />
                            <span className="text-xl font-bold">¡Contenedor Lleno!</span>
                            <Sparkles className="w-8 h-8" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                            <Link href="/collections" className="p-2 hover:bg-gray-100 rounded-lg">
                                <ArrowRight className="w-5 h-5 rotate-180" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold">Tu Cotizacion</h1>
                                <p className="text-sm text-gray-500">{container.name} - {container.dimension?.length}x{container.dimension?.width}x{container.dimension?.height}m</p>
                            </div>
                        </div>
                        <button onClick={() => handleRemoveContainer(cart[0]?.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg">
                            <Trash2 size={18} />
                        </button>
                    </div>
                    
                    {/* Simple Container Visualization */}
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-12 border-2 border-gray-300 rounded relative overflow-hidden bg-gray-100">
                            <div 
                                className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${isFull ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ height: `${Math.min(fill.filledTotal, 100)}%` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-700">{fill.filledTotal.toFixed(0)}%</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500">
                            <div>Usado: {(fill.usableVolume - fill.remainingVolume)?.toFixed(1)}m³</div>
                            <div>Disponible: {fill.remainingVolume?.toFixed(1)}m³</div>
                            <div>Total: {fill.usableVolume?.toFixed(1)}m³</div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6 space-y-4">
                {cart[0]?.items.map((item) => {
                    const remaining = calculateRemainingCapacity(cart[0], item)
                    return (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-gray-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                                <Image src={item.image || '/raster/product.jpg'} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleRemoveItem(cart[0].id, item.id)} className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-red-50 text-red-500">
                                    <Minus size={14} />
                                </button>
                                <input 
                                    type="number" 
                                    min="0"
                                    value={item.qty}
                                    onChange={(e) => handleSetQuantity(cart[0].id, item, e.target.value)}
                                    className="w-16 text-center border border-gray-200 rounded-lg py-1 px-2 text-sm font-medium focus:outline-none focus:border-blue-500"
                                />
                                <button onClick={() => handleAddItem(cart[0].id, item)} className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-blue-50 text-blue-500">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs bg-gray-50 rounded-lg p-2">
                            <div className="flex items-center gap-1 text-gray-500">
                                <Volume2 size={10} />
                                <span>{item.dimensions?.length}x{item.dimensions?.width}x{item.dimensions?.height}mm</span>
                            </div>
                            <div className={`font-medium ${remaining > 0 ? 'text-green-600' : 'text-orange-500'}`}>
                                {remaining > 0 ? `+${remaining} caben` : 'CONTENEDOR LLENO'}
                            </div>
                        </div>
                    </motion.div>
                    )
                })}
                
                <Link href="/collections" className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500">
                    <Plus size={20} />
                    <span className="font-medium">Agregar mas productos</span>
                </Link>
            </div>

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="max-w-4xl mx-auto">
                    <Link 
                        href={isFull ? "/checkout" : "#"} 
                        className={`flex items-center justify-center gap-3 py-4 rounded-xl font-semibold transition-all ${isFull ? "bg-green-500 text-white hover:bg-green-600 hover:scale-[1.02] shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                    >
                        {isFull ? (<div className="flex items-center gap-3"><Sparkles className="w-5 h-5" /><span>Proceder al Checkout</span></div>) : (`Total: $${calculateTotal().toLocaleString()} (${itemCount} items)`)}
                    </Link>
                </div>
            </footer>
        </main>
    )
}
