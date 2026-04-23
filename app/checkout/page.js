"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { Printer, Check, ArrowLeft, Building2, User, Mail, Phone, MapPin, FileText, Package, DollarSign, Send, Box as BoxIcon } from "lucide-react"

import { useLanguage } from "lib/LanguageContext"
import { useBrand } from "lib/BrandContext"
import { getCart } from "utils/cart/cart.core"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
    const { t } = useLanguage()
    const { language } = useLanguage()
    const lang = language || 'es'
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

    const shippingData = useMemo(() => {
        if (cart.length === 0 || !formData.country || !formData.state) {
            return { cost: 0, time: "" }
        }

        let costPerContainer = 0
        let time = ""
        const state = formData.state.toUpperCase()
        
        if (formData.country === "US") {
            if (["FL", "FLORIDA"].includes(state)) {
                costPerContainer = 450
                time = "3-5 Business Days"
            } else if (["CA", "CALIFORNIA", "NY", "NEW YORK"].includes(state)) {
                costPerContainer = 1200
                time = "7-10 Business Days"
            } else {
                costPerContainer = 850
                time = "5-8 Business Days"
            }
        } else if (formData.country === "CA") {
            costPerContainer = 1800
            time = "10-14 Business Days"
        } else if (formData.country === "MX") {
            costPerContainer = 1500
            time = "7-10 Business Days"
        }

        return { cost: costPerContainer, time }
    }, [cart.length, formData.country, formData.state])

    const shippingCost = shippingData.cost
    const shippingTime = shippingData.time

    const calculateTotal = () => {
        const itemTotal = cart.reduce((total, container) => {
            return total + container.items.reduce((itemTotal, item) => {
                return itemTotal + (item.price || 0) * item.qty
            }, 0)
        }, 0)
        return itemTotal + shippingCost
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

    const { brand } = useBrand()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const contactEmail = brand?.email || "lidermercadeo@espaciosimportados.com.co";
        const subject = `New Quote Request - ${formData.companyName || formData.contactName} (${referenceId})`;
        
        let itemsSummary = cart.map(container => {
            const items = container.items.map(item => `  - ${item.name} (Qty: ${item.qty})`).join('\n');
            return `Container: ${container.name} (${container.dimension?.length || 20}ft)\n${items}`;
        }).join('\n\n');

        const body = `Quote Request Summary\n` +
            `Reference ID: ${referenceId}\n` +
            `Date: ${new Date().toLocaleDateString()}\n\n` +
            `COMPANY INFORMATION:\n` +
            `Company: ${formData.companyName}\n` +
            `Contact: ${formData.contactName}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone}\n\n` +
            `SHIPPING ADDRESS:\n` +
            `${formData.address}\n` +
            `${formData.city}, ${formData.state} ${formData.zip}\n` +
            `${formData.country}\n\n` +
            `REQUESTED ITEMS:\n` +
            `${itemsSummary}\n\n` +
            `SHIPPING ESTIMATE:\n` +
            `Cost: ${shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'TBD'}\n` +
            `Time: ${shippingTime || 'TBD'}\n\n` +
            `ESTIMATED TOTAL: ${calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'Contact for Pricing'}\n\n` +
            `ADDITIONAL NOTES:\n` +
            `${formData.notes || 'None'}`;

        window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        setSubmitted(true)
        window.scrollTo(0, 0)
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownloadInvoice = async () => {
        try {
            const fullCart = getCart()
            // Flatten: extract all items from all containers
            const flatItems = []
            fullCart.forEach(container => {
                if (container.items && Array.isArray(container.items)) {
                    container.items.forEach(item => {
                        flatItems.push({
                            id: item.id,
                            name: item.name,
                            price: item.basePrice || 0,
                            qty: item.quantity || 1,
                            containerId: container.id,
                            containerName: container.name
                        })
                    })
                }
            })

            const res = await fetch('/API/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    cart: flatItems, 
                    language: lang,
                    reference: referenceId,
                    customer: formData
                })
            })
            if (!res.ok) {
                console.error('Invoice generation failed')
                return
            }

            // Track analytics event
            const { trackInvoiceDownload } = await import('lib/analytics')
            trackInvoiceDownload(referenceId)

            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `unitec-invoice-${referenceId}.pdf`
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Error generating invoice', err)
        }
    }

    if (!mounted) {
        return (
            <main className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">{t("recommendations.loading")}</h1>
                </div>
            </main>
        )
    }

    if (submitted) {
        return (
            <main className="w-full min-h-screen bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src="/raster/interior.webp" alt="Background" fill className="object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50" />
                </div>
                <section className="relative z-10 bg-green-600/90 backdrop-blur-md py-20 text-white min-h-screen flex items-center justify-center">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                        >
                            <Check className="w-12 h-12 text-green-600" />
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("checkout.successTitle")}</h1>
                        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
                            {t("checkout.successDesc")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={handleDownloadInvoice}
                                className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-green-700 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                            >
                                <FileText size={24} />
                                {t("checkout.downloadInvoice") || (lang === 'es' ? 'Descargar Factura' : 'Download Invoice')}
                            </button>
                            <button
                                onClick={handlePrint}
                                className="flex items-center justify-center gap-3 px-10 py-5 bg-green-100 text-green-800 rounded-2xl font-bold text-lg hover:bg-white transition-all hover:scale-105 shadow-xl"
                            >
                                <Printer size={24} />
                                {t("checkout.print")}
                            </button>
                            <Link
                                href="/collections"
                                className="flex items-center justify-center gap-3 px-10 py-5 bg-green-800 text-white rounded-2xl font-bold text-lg hover:bg-green-900 transition-all hover:scale-105 shadow-xl"
                            >
                                {t("checkout.continue")}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Printable Summary */}
                <section ref={printRef} className="py-12 print:py-0 hidden print:block">
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="bg-white rounded-2xl shadow-lg p-8 print:shadow-none">
                            <div className="border-b-2 border-gray-200 pb-6 mb-6 text-center">
                                <h1 className="text-3xl font-bold text-black mb-2">UNITEC USA Design</h1>
                                <h2 className="text-xl font-bold mb-2">{t("checkout.summary")}</h2>
                                <p className="text-gray-600">Request Date: {new Date().toLocaleDateString()}</p>
                                <p className="text-gray-600">Reference: {referenceId}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">{t("checkout.contactInfo")}</h3>
                                    <p className="text-gray-700 text-sm"><strong>{t("checkout.companyName")}:</strong> {formData.companyName}</p>
                                    <p className="text-gray-700 text-sm"><strong>{t("checkout.contactName")}:</strong> {formData.contactName}</p>
                                    <p className="text-gray-700 text-sm"><strong>{t("checkout.email")}:</strong> {formData.email}</p>
                                    <p className="text-gray-700 text-sm"><strong>{t("checkout.phone")}:</strong> {formData.phone}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">{t("checkout.shippingAddress")}</h3>
                                    <p className="text-gray-700 text-sm">{formData.address}</p>
                                    <p className="text-gray-700 text-sm">{formData.city}, {formData.state} {formData.zip}</p>
                                    <p className="text-gray-700 text-sm">{formData.country}</p>
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">{t("checkout.summary")}</h3>
                            {cart.map((container) => (
                                <div key={container.id} className="mb-6 border border-gray-100 rounded-2xl p-6">
                                    <h4 className="font-bold mb-4 flex items-center gap-2 text-lg">
                                        <Package size={20} className="text-gray-400" />
                                        {container.name} ({container.dimension?.length || 20}ft)
                                    </h4>
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="text-left py-3 px-4 font-bold text-gray-600 rounded-l-xl">Product</th>
                                                <th className="text-center py-3 px-4 font-bold text-gray-600">Qty</th>
                                                <th className="text-right py-3 px-4 font-bold text-gray-600">Price</th>
                                                <th className="text-right py-3 px-4 font-bold text-gray-600 rounded-r-xl">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {container.items.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                                    <td className="py-3 px-4 font-medium">{item.name}</td>
                                                    <td className="text-center py-3 px-4">{item.qty}</td>
                                                    <td className="text-right py-3 px-4 font-mono">${item.price?.toFixed(2) || '---'}</td>
                                                    <td className="text-right py-3 px-4 font-bold">
                                                        ${item.price ? (item.price * item.qty).toFixed(2) : '---'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}

                            <div className="bg-gray-50 rounded-2xl p-6 mt-8">
                                <div className="flex justify-between items-center text-gray-700 mb-3 font-medium">
                                    <span>Shipping ({cart.length} container{cart.length !== 1 ? 's' : ''}):</span>
                                    <span className="font-mono">{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'TBD'}</span>
                                </div>
                                {shippingTime && (
                                    <div className="flex justify-between items-center text-gray-500 text-xs mb-4 uppercase tracking-wider">
                                        <span>Estimated Delivery:</span>
                                        <span className="font-bold">{shippingTime}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-2xl font-black text-black pt-4 border-t border-gray-200">
                                    <span>{t("cart.total")}:</span>
                                    <span className="font-mono">{calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'TBD'}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-6 text-center italic leading-tight">
                                    * {t("checkout.paymentDesc")}
                                </p>
                            </div>

                            {formData.notes && (
                                <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <FileText size={18} className="text-yellow-600" />
                                        {t("checkout.notes")}
                                    </h3>
                                    <p className="text-gray-700 text-sm italic">"{formData.notes}"</p>
                                </div>
                            )}

                            <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
                                <p>© {new Date().getFullYear()} UNITEC USA Design. centershop.unitecusadesign.com</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="w-full min-h-screen bg-gray-50 relative">
            <div className="absolute inset-0 z-0 h-[40vh]">
                <Image src="/raster/interior.webp" alt="Background" fill className="object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 bg-gray-900/60 backdrop-blur-sm py-16 md:py-24 text-white">
                <div className="mx-auto max-w-7xl px-4">
                    <Link 
                        href="/cart"
                        className="group inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors font-bold uppercase tracking-widest text-xs"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        {t("checkout.back")}
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">{t("checkout.title")}</h1>
                    <p className="text-xl text-gray-300 font-medium max-w-xl">
                        {t("checkout.subtitle")}
                    </p>
                </div>
            </section>

            <section className="relative z-20 py-8 md:py-16 -mt-10 md:-mt-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10 space-y-10">
                                <section>
                                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-900">
                                        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        {t("checkout.contactInfo")}
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                {t("checkout.companyName")} *
                                            </label>
                                            <div className="relative group">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                                                    placeholder={t("checkout.companyPlaceholder")}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                {t("checkout.contactName")} *
                                            </label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    name="contactName"
                                                    value={formData.contactName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                                                    placeholder={t("checkout.contactPlaceholder")}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                {t("checkout.email")} *
                                            </label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                                                    placeholder={t("checkout.emailPlaceholder")}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                {t("checkout.phone")} *
                                            </label>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                                                    placeholder={t("checkout.phonePlaceholder")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-900">
                                        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-primary">
                                            <MapPin size={20} />
                                        </div>
                                        {t("checkout.shippingAddress")}
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                {t("checkout.street")} *
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                                                placeholder={t("checkout.streetPlaceholder")}
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                    {t("checkout.city")} *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                                                    placeholder="Miami"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                    {t("checkout.state")} *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                                                    placeholder="FL"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                    {t("checkout.zip")} *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="zip"
                                                    value={formData.zip}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900"
                                                    placeholder="33166"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                {t("checkout.country")} *
                                            </label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>{t("checkout.selectCountry")}</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="MX">Mexico</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="AU">Australia</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-900">
                                        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-primary">
                                            <FileText size={20} />
                                        </div>
                                        {t("checkout.otherInfo")}
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                                                {t("checkout.notes")}
                                            </label>
                                            <textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-gray-900 resize-none"
                                                placeholder={t("checkout.notesPlaceholder")}
                                            />
                                        </div>

                                        <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-3xl group cursor-pointer hover:bg-gray-100 transition-colors">
                                            <input
                                                type="checkbox"
                                                name="termsAccepted"
                                                id="termsCheckbox"
                                                checked={formData.termsAccepted}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 w-6 h-6 rounded-lg border-2 border-gray-200 text-primary focus:ring-primary transition-all cursor-pointer"
                                            />
                                            <label htmlFor="termsCheckbox" className="text-sm font-medium text-gray-600 cursor-pointer select-none">
                                                {t("checkout.agreeTerms")}
                                            </label>
                                        </div>
                                    </div>
                                </section>

                                <button
                                    type="submit"
                                    className="w-full group flex items-center justify-center gap-3 py-6 bg-black text-white rounded-3xl font-black text-xl hover:bg-primary transition-all shadow-2xl hover:scale-[1.02]"
                                >
                                    <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    {t("checkout.submit")}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-24 space-y-8">
                                <h2 className="text-2xl font-black flex items-center gap-3 text-gray-900">
                                    <Package className="w-6 h-6 text-primary" />
                                    {t("checkout.summary")}
                                </h2>

                                <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((container) => (
                                        <div key={container.id} className="space-y-4">
                                            <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                                <BoxIcon size={14} />
                                                {container.name}
                                            </div>
                                            {container.items.map((item) => (
                                                <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-50 hover:border-gray-200 transition-colors">
                                                    <div className="flex-shrink-0 w-16 h-16 relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                                        <Image
                                                            src={item.image || '/raster/product.jpg'}
                                                            alt={item.name}
                                                            fill
                                                            className="object-contain p-2 mix-blend-multiply"
                                                        />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-center min-w-0">
                                                        <span className="font-bold text-gray-900 truncate block">{item.name}</span>
                                                        <span className="text-xs font-bold text-gray-400">× {item.qty}</span>
                                                    </div>
                                                    {item.price && (
                                                        <div className="flex items-center text-sm font-black text-gray-900">
                                                            ${(item.price * item.qty).toLocaleString()}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-6 border-t-2 border-gray-50">
                                    <div className="flex justify-between text-sm font-bold text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-gray-900 font-mono">
                                            {calculateTotal() - shippingCost > 0 ? `$${(calculateTotal() - shippingCost).toFixed(2)}` : 'TBD'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start text-sm font-bold text-gray-400">
                                        <span>Shipping</span>
                                        <div className="text-right">
                                            <div className="text-gray-900 font-mono">{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'TBD'}</div>
                                            {shippingTime && <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">ETA: {shippingTime}</div>}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-2xl font-black pt-6 border-t-4 border-gray-50 text-gray-900">
                                        <span>{t("cart.total")}</span>
                                        <span className="font-mono">{calculateTotal() > 0 ? `$${calculateTotal().toFixed(2)}` : 'TBD'}</span>
                                    </div>
                                </div>

                                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                                    <h3 className="font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2 text-primary">
                                        <DollarSign className="w-4 h-4" />
                                        {t("checkout.paymentInfo")}
                                    </h3>
                                    <p className="text-[11px] font-medium text-gray-600 leading-normal">
                                        {t("checkout.paymentDesc")}
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
