"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react"
import { getCart, removeContainer, removeOne, addOne } from "utils/cart/cart.core"
import { containerFillPercent } from "utils/cart/cart.utils"
import Link from "next/link"
import Image from "next/image"

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
        <main className="min-h-screen bg-gray-50 pb-32">
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/collections" className="p-2 hover:bg-gray-100 rounded-lg">
                            <ArrowRight className="w-5 h-5 rotate-180" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">Tu Cotizacion</h1>
                            <p className="text-sm text-gray-500">Contenedor #{cart[0]?.id?.split('-')[0]}</p>
                        </div>
                    </div>
                    <button onClick={() => handleRemoveContainer(cart[0]?.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg">
                        <Trash2 size={18} />
                    </button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6 space-y-4">
                {cart[0]?.items.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative">
                            <Image src={item.image || '/raster/product.jpg'} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleRemoveItem(cart[0].id, item.id)} className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-red-50">
                                <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-medium">{item.qty}</span>
                            <button onClick={() => handleAddItem(cart[0].id, item)} className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-blue-50">
                                <Plus size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}
                
                <Link href="/collections" className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500">
                    <Plus size={20} />
                    <span className="font-medium">Agregar mas productos</span>
                </Link>
            </div>

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Capacidad usada</span>
                            <span className="font-medium">{containerFillPercent(cart[0]).filledTotal.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: containerFillPercent(cart[0]).filledTotal + '%' }} />
                        </div>
                    </div>
                    <Link href="/checkout" className="block text-center py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800">
                        Proceder al Checkout - Total: ${calculateTotal().toLocaleString()}
                    </Link>
                </div>
            </footer>
        </main>
    )
}
