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
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const initializeCart = () => {
            setMounted(true)
            setCart(getCart())
        }
        initializeCart()
    }, [])

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
            if (filledTotal < 99) return false;
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
        <main className="w-full min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gray-900 py-12 md:py-20 text-white">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-2">{t('cart.title')}</h1>
                            <p className="text-gray-300">
                                {calculateItemCount()} {t('cart.itemsIn')} {cart.length} {cart.length > 1 ? t('cart.containers') : t('cart.container')}
                            </p>
                        </div>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                        >
                            <Printer size={20} />
                            {t('cart.printSummary')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Cart Content */}
            <section className="py-8 md:py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((container, containerIndex) => (
                                <motion.div
                                    key={container.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: containerIndex * 0.1 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                                >
                                    {/* Container Header */}
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <Package className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{container.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {container.dimension?.length || 20}ft Container
                                                </p>
                                            </div>
                                        </div>

                                        {/* Container Fill Progress */}
                                        <div className="flex-1 w-full md:max-w-xs md:mx-auto">
                                            {(() => {
                                                const { filledTotal } = containerFillPercent(container);
                                                return (
                                                    <div className="flex flex-col gap-1 w-full">
                                                        <div className="flex justify-between text-xs font-semibold">
                                                            <span className={filledTotal >= 99 ? "text-green-600 text-sm" : "text-gray-600"}>
                                                                {filledTotal >= 99 ? t('cart.containerFull') : t('cart.containerFilling')}
                                                            </span>
                                                            <span className={filledTotal >= 99 ? "text-green-600 text-sm" : "text-gray-900"}>{filledTotal.toFixed(1)}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                            <div 
                                                                className={`h-2 rounded-full transition-all duration-300 ${filledTotal >= 99 ? "bg-green-500" : "bg-blue-600"}`} 
                                                                style={{ width: `${filledTotal}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )
                                            })()}
                                        </div>

                                        <button
                                        onClick={() => handleRemoveContainer(container.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        aria-label={t('cart.removeContainer')}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    </div>

                                    {/* 3D Container Visualization */}
                                    <div className="px-6 py-8 bg-gradient-to-b from-gray-100 to-white flex items-center justify-center overflow-hidden">
                                        <Container3DView
                                            size={container.name}
                                            width={container.dimension?.width || 2.35}
                                            height={container.dimension?.height || 2.39}
                                            length={container.dimension?.length || 20}
                                            items={container.items.flatMap(item => 
                                                Array.from({ length: Math.min(item.qty, 10) }).map(() => ({
                                                    color: getContainerItemColor(item.category),
                                                    image: item.image
                                                }))
                                            )}
                                            fillPercent={containerFillPercent(container).filledTotal}
                                            scale={0.9}
                                        />
                                    </div>

                                    {/* Container Items */}
                                    <div className="divide-y divide-gray-100">
                                        {container.items.map((item) => (
                                            <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                <div className="flex-shrink-0 w-20 h-20 relative bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                                                    <Image
                                                        src={item.image || '/raster/product.jpg'}
                                                        alt={item.name}
                                                        fill
                                                        className="object-contain p-2 mix-blend-multiply"
                                                    />
                                                </div>
                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">{t('cart.id')}: {item.id}</p>
                                                    {item.price && (
                                                        <p className="text-sm font-medium text-gray-900 mt-1">
                                                            ${item.price.toFixed(2)} {t('cart.each')}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleRemoveItem(container.id, item.id)}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                                            aria-label={t('cart.decreaseQuantity')}
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <input 
                                                            type="number"
                                                            value={item.qty}
                                                            onChange={(e) => handleSetQty(container.id, item, e.target.value)}
                                                            className="w-16 h-8 text-center font-medium border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                            min="1"
                                                        />
                                                        <button
                                                            onClick={() => handleAddItem(container.id, item)}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                                            aria-label={t('cart.increaseQuantity')}
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Item Total */}
                                                {item.price && (
                                                    <div className="text-right min-w-[100px]">
                                                        <p className="font-semibold text-gray-900">
                                                            ${(item.price * item.qty).toFixed(2)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Container Summary */}
                                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                {container.items.reduce((sum, item) => sum + item.qty, 0)} {t('cart.items')}
                                            </span>
                                            {container.items.some(item => item.price) && (
                                                <span className="font-semibold text-gray-900">
                                                    {t('cart.subtotal')}: ${container.items.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24"
                            >
                                <h2 className="text-xl font-bold mb-6">{t('cart.subtotal')}</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>{cart.length > 1 ? t('cart.containers') : t('cart.container')}</span>
                                        <span>{cart.length}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>{t('cart.items')}</span>
                                        <span>{calculateItemCount()}</span>
                                    </div>
                                    {calculateTotal() > 0 && (
                                        <div className="flex justify-between text-gray-600">
                                            <span>{t('cart.subtotal')}</span>
                                            <span>${calculateTotal().toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">{t('cart.total')}</span>
                                        <span className="text-2xl font-bold">
                                            {calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'Contact for Pricing'}
                                        </span>
                                    </div>
                                </div>

                                {cart.length > 0 && !isAllContainersFull() && (
                                    <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl text-orange-800 text-sm">
                                        <p className="font-medium flex items-center gap-2">⚠️ {t('cart.containerFull')}</p>
                                        <p className="mt-1">Please completely fill all your containers (100%) to proceed with checkout.</p>
                                    </div>
                                )}

                                <Link 
                                    href={isAllContainersFull() ? "/checkout" : "#"}
                                    onClick={(e) => { if (!isAllContainersFull() || cart.length === 0) e.preventDefault() }}
                                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white transition ${isAllContainersFull() && cart.length > 0 ? "bg-black hover:bg-gray-900" : "bg-gray-300 cursor-not-allowed"}`}
                                >
                                    {t('cart.proceedToCheckout')}
                                    <ArrowRight size={18} />
                                </Link>

                                <Link 
                                    href="/collections"
                                    className="flex w-full items-center justify-center mt-3 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {t('cart.continueShopping')}
                                </Link>

                                <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-500">
                                    <p className="mb-2">✓ No account required</p>
                                    <p className="mb-2">✓ Free shipping on orders over $5,000</p>
                                    <p>✓ 15-25 year warranties</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
