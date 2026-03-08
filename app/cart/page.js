"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, Printer, ShoppingCart, ArrowRight, Package } from "lucide-react"
import { useLanguage } from "lib/LanguageContext"
import { getCart, removeContainer, removeOne, addOne } from "utils/cart/cart.core"
import Link from "next/link"
import Image from "next/image"

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
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Cart is Empty</h1>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Start building your container with our premium PVC and WPC building materials.
                        </p>
                        <Link 
                            href="/collections"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-gray-200"
                        >
                            Browse Products
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
                            <h1 className="text-3xl md:text-5xl font-bold mb-2">Shopping Cart</h1>
                            <p className="text-gray-300">
                                {calculateItemCount()} items in {cart.length} container{cart.length > 1 ? 's' : ''}
                            </p>
                        </div>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                        >
                            <Printer size={20} />
                            Print Summary
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
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Package className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{container.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {container.dimension?.length || 20}ft Container
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveContainer(container.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            aria-label="Remove container"
                                        >
                                            <Trash2 size={20} />
                                        </button>
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
                                                    <p className="text-sm text-gray-500">ID: {item.id}</p>
                                                    {item.price && (
                                                        <p className="text-sm font-medium text-gray-900 mt-1">
                                                            ${item.price.toFixed(2)} each
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleRemoveItem(container.id, item.id)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-12 text-center font-medium">{item.qty}</span>
                                                    <button
                                                        onClick={() => handleAddItem(container.id, item)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
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
                                                {container.items.reduce((sum, item) => sum + item.qty, 0)} items
                                            </span>
                                            {container.items.some(item => item.price) && (
                                                <span className="font-semibold text-gray-900">
                                                    Subtotal: ${container.items.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0).toFixed(2)}
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
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Containers</span>
                                        <span>{cart.length}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Total Items</span>
                                        <span>{calculateItemCount()}</span>
                                    </div>
                                    {calculateTotal() > 0 && (
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
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
                                        <span className="text-lg font-bold">Estimated Total</span>
                                        <span className="text-2xl font-bold">
                                            {calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'Contact for Pricing'}
                                        </span>
                                    </div>
                                </div>

                                <Link 
                                    href="/checkout"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-900"
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={18} />
                                </Link>

                                <Link 
                                    href="/collections"
                                    className="flex w-full items-center justify-center mt-3 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Continue Shopping
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
