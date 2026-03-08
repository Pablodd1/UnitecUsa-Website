"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Printer, Check, ArrowLeft, Building2, User, Mail, Phone, MapPin, FileText, Package, DollarSign, Send } from "lucide-react"
import { useLanguage } from "lib/LanguageContext"
import { getCart } from "utils/cart/cart.core"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
    const { t } = useLanguage()
    const [cart, setCart] = useState([])
    const [mounted, setMounted] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const printRef = useRef()
    const [referenceId] = useState(() => `QR-${Date.now().toString(36).toUpperCase()}`)

    const [formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        notes: "",
        termsAccepted: false
    })

    useEffect(() => {
        const initializeCheckout = () => {
            setMounted(true)
            setCart(getCart())
        }
        initializeCheckout()
    }, [])

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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, you would submit to an API here
        setSubmitted(true)
        window.scrollTo(0, 0)
    }

    const handlePrint = () => {
        window.print()
    }

    if (!mounted) {
        return (
            <main className="w-full min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Loading Checkout...</h1>
                    </div>
                </div>
            </main>
        )
    }

    if (submitted) {
        return (
            <main className="w-full min-h-screen bg-gray-50">
                <section className="bg-green-600 py-20 text-white">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <Check className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Quote Request Submitted!</h1>
                        <p className="text-xl mb-8">
                            Thank you for your interest. Our team will review your request and contact you within 24 business hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handlePrint}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                            >
                                <Printer size={20} />
                                Print Summary
                            </button>
                            <Link
                                href="/collections"
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Printable Summary */}
                <section ref={printRef} className="py-12 print:py-0">
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="bg-white rounded-2xl shadow-lg p-8 print:shadow-none">
                            <div className="border-b-2 border-gray-200 pb-6 mb-6">
                                <h2 className="text-2xl font-bold mb-2">Quote Request Summary</h2>
                                <p className="text-gray-600">Request Date: {new Date().toLocaleDateString()}</p>
                                <p className="text-gray-600">Reference: {referenceId}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Company Information</h3>
                                    <p className="text-gray-700"><strong>Company:</strong> {formData.companyName}</p>
                                    <p className="text-gray-700"><strong>Contact:</strong> {formData.contactName}</p>
                                    <p className="text-gray-700"><strong>Email:</strong> {formData.email}</p>
                                    <p className="text-gray-700"><strong>Phone:</strong> {formData.phone}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                                    <p className="text-gray-700">{formData.address}</p>
                                    <p className="text-gray-700">{formData.city}, {formData.state} {formData.zip}</p>
                                    <p className="text-gray-700">{formData.country}</p>
                                </div>
                            </div>

                            <h3 className="font-semibold text-gray-900 mb-4">Requested Items</h3>
                            {cart.map((container) => (
                                <div key={container.id} className="mb-6 border border-gray-200 rounded-xl p-4">
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Package size={18} />
                                        {container.name} ({container.dimension?.length || 20}ft)
                                    </h4>
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-2 px-3">Product</th>
                                                <th className="text-center py-2 px-3">Qty</th>
                                                <th className="text-right py-2 px-3">Price</th>
                                                <th className="text-right py-2 px-3">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {container.items.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-100">
                                                    <td className="py-2 px-3">{item.name}</td>
                                                    <td className="text-center py-2 px-3">{item.qty}</td>
                                                    <td className="text-right py-2 px-3">${item.price?.toFixed(2) || 'Contact'}</td>
                                                    <td className="text-right py-2 px-3">
                                                        ${item.price ? (item.price * item.qty).toFixed(2) : 'Contact'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}

                            <div className="border-t-2 border-gray-200 pt-4 mt-6">
                                <div className="flex justify-between items-center text-xl font-bold">
                                    <span>Estimated Total:</span>
                                    <span>{calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'Contact for Pricing'}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    *Final pricing includes shipping, taxes, and duties based on destination.
                                </p>
                            </div>

                            {formData.notes && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-gray-900 mb-2">Additional Notes</h3>
                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{formData.notes}</p>
                                </div>
                            )}
                        </div>
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
                    <Link 
                        href="/cart"
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Cart
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">Checkout</h1>
                    <p className="text-gray-300">
                        Complete your quote request. No account required.
                    </p>
                </div>
            </section>

            <section className="py-8 md:py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Contact Information
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Company Name *
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="Your Company LLC"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="contactName"
                                                value={formData.contactName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="+1 234 567 890"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Shipping Address
                                </h2>

                                <div className="space-y-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                            placeholder="123 Business Street"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="Miami"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                State/Province *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="FL"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ZIP/Postal Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="33166"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Country *
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                            placeholder="United States"
                                        />
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Additional Information
                                </h2>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Order Notes (Optional)
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Special instructions, delivery preferences, or questions..."
                                    />
                                </div>

                                <div className="flex items-start gap-3 mb-8">
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                                    />
                                    <label className="text-sm text-gray-600">
                                        I agree to the <Link href="/terms" className="underline hover:text-gray-900">Terms & Conditions</Link> and 
                                        <Link href="/policies" className="underline hover:text-gray-900"> Privacy Policy</Link>. 
                                        I understand this is a quote request and final pricing may vary based on shipping and taxes.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-4 text-white font-semibold hover:bg-gray-900 transition-colors"
                                >
                                    <Send size={20} />
                                    Submit Quote Request
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                    {cart.map((container) => (
                                        <div key={container.id} className="border-b border-gray-100 pb-4 last:border-0">
                                            <h4 className="font-semibold text-sm mb-2">{container.name}</h4>
                                            {container.items.map((item) => (
                                                <div key={item.id} className="flex gap-3 text-sm text-gray-600 py-2 border-b border-gray-50 last:border-0">
                                                    <div className="flex-shrink-0 w-12 h-12 relative bg-gray-50 rounded-md overflow-hidden border border-gray-100">
                                                        <Image
                                                            src={item.image || '/raster/product.jpg'}
                                                            alt={item.name}
                                                            fill
                                                            className="object-contain p-1 mix-blend-multiply"
                                                        />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-between min-w-0">
                                                        <span className="truncate">{item.name}</span>
                                                        <span className="text-xs text-gray-500">Qty: {item.qty}</span>
                                                    </div>
                                                    {item.price && (
                                                        <div className="flex flex-col justify-end text-right">
                                                            <span className="font-semibold text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'Contact for pricing'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping</span>
                                        <span>Calculated later</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Taxes</span>
                                        <span>Calculated later</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 mt-4 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Total Items</span>
                                        <span className="font-bold text-xl">{calculateItemCount()}</span>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Payment Info
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        This is a quote request. No payment is required now. Our team will contact you with final pricing and payment options.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
