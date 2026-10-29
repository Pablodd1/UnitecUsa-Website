"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "lib/LanguageContext";
import siteSettings, { getMiamiAddressFormatted, getWhatsAppUrl, getTelUrl, getMailtoUrl } from "lib/siteSettings";

export default function ContactPage() {
    const { t, language } = useLanguage();
    const isSpanish = language === "es";

    const miamiAddress = getMiamiAddressFormatted();
    const medellinAddress = siteSettings.medellin_showroom_address;
    const whatsappHref = getWhatsAppUrl();
    const telHref = getTelUrl();
    const mailtoHref = getMailtoUrl();

    const [formData, setFormData] = useState({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        volume: "",
        details: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || (isSpanish ? "Error al enviar el formulario." : "Error submitting the form."));
            }

            if (typeof window !== "undefined" && typeof window.fbq === "function") {
                window.fbq("track", "Lead", {
                    content_name: "Contact Form Submission",
                    content_category: "Lead Generation",
                    value: formData.volume || "Standard",
                    currency: "USD"
                });
            }

            setSubmitted(true);
            setFormData({
                fullName: "",
                companyName: "",
                email: "",
                phone: "",
                volume: "",
                details: ""
            });
        } catch (err) {
            setErrorMessage(
                err.message || (isSpanish ? "Hubo un problema al procesar su solicitud. Por favor, intente nuevamente." : "There was an issue processing your request. Please try again.")
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-30">
                    <Image
                        src="/raster/exterior.webp"
                        alt={isSpanish ? `Contacto ${siteSettings.brand_name}` : `Contact ${siteSettings.brand_name}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold tracking-wider uppercase mb-4"
                    >
                        {t("contact.badge")}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                    >
                        {t("contact.title")}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light"
                    >
                        {t("contact.subtitle")}
                    </motion.p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">{t("contact.form.title")}</h2>
                            <p className="text-gray-600 mb-8">
                                {t("contact.form.subtitle")}
                            </p>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center shadow-sm"
                                >
                                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                                        <Send className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                        {isSpanish ? "¡Mensaje enviado con éxito!" : "Message sent successfully!"}
                                    </h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {t("contact.form.success") || (isSpanish
                                            ? "Gracias por contactarnos. Hemos recibido tu información correctamente y uno de nuestros asesores se comunicará contigo muy pronto."
                                            : "Thank you for contacting us. We have received your information and an advisor will reach out to you shortly.")}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className="px-6 py-2.5 bg-slate-900 hover:bg-primary text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                                    >
                                        {isSpanish ? "Enviar otro mensaje" : "Send another message"}
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {errorMessage && (
                                        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="contact-fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t("contact.form.fullName")} *
                                        </label>
                                        <input
                                            id="contact-fullName"
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                            placeholder={t("contact.form.placeholders.name")}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contact-companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t("contact.form.companyName")}
                                        </label>
                                        <input
                                            id="contact-companyName"
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                            placeholder={t("contact.form.placeholders.company")}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                {t("contact.form.email")} *
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                                placeholder={t("contact.form.placeholders.email")}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                                {t("contact.form.phone")} *
                                            </label>
                                            <input
                                                id="contact-phone"
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                                placeholder={t("contact.form.placeholders.phone")}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="contact-volume" className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t("contact.form.volume")}
                                        </label>
                                        <select
                                            id="contact-volume"
                                            name="volume"
                                            value={formData.volume}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                        >
                                            <option value="">{t("contact.form.volumeOptions.select")}</option>
                                            <option value="20ft">{t("contact.form.volumeOptions.c20")}</option>
                                            <option value="40ft">{t("contact.form.volumeOptions.c40")}</option>
                                            <option value="multiple">{t("contact.form.volumeOptions.multiple")}</option>
                                            <option value="unsure">{t("contact.form.volumeOptions.unsure")}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="contact-details" className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t("contact.form.details")} *
                                        </label>
                                        <textarea
                                            id="contact-details"
                                            rows={5}
                                            name="details"
                                            value={formData.details}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                                            placeholder={t("contact.form.placeholders.details")}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                                    >
                                        <Send className="w-5 h-5" />
                                        {loading
                                            ? (isSpanish ? "Enviando..." : "Sending...")
                                            : t("contact.form.submit")}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info (Single Source of Truth from site_settings.json) */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">{t("contact.info.title")}</h2>
                            <p className="text-gray-600 mb-8">
                                {t("contact.info.subtitle")}
                            </p>

                            <div className="space-y-6">
                                {/* WhatsApp Direct */}
                                {siteSettings.primary_whatsapp && (
                                    <div className="flex items-start gap-4 p-6 bg-green-50 border border-green-100 rounded-xl">
                                        <div className="w-12 h-12 bg-[#25D366] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MessageCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                                            <a
                                                href={whatsappHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-800 hover:text-primary font-semibold transition-colors"
                                            >
                                                {siteSettings.primary_phone}
                                            </a>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {isSpanish ? "Atención inmediata para cotizaciones y contenedores" : "Immediate assistance for quotes and containers"}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Phone */}
                                {siteSettings.primary_phone && (
                                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                                        <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{t("contact.info.phone.title")}</h3>
                                            <a href={telHref} className="text-gray-600 hover:text-primary transition-colors">
                                                {siteSettings.primary_phone}
                                            </a>
                                            <p className="text-sm text-gray-500 mt-1">{t("contact.info.phone.hours")}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Email */}
                                {siteSettings.public_email && (
                                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                                        <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{t("contact.info.email.title")}</h3>
                                            <a href={mailtoHref} className="text-gray-600 hover:text-primary transition-colors break-all">
                                                {siteSettings.public_email}
                                            </a>
                                            <p className="text-sm text-gray-500 mt-1">{t("contact.info.email.note")}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Office & Showroom Locations */}
                                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-0.5">
                                                {isSpanish ? "Sede Estados Unidos (Miami)" : "United States Headquarters (Miami)"}
                                            </h3>
                                            <p className="text-gray-600 text-sm">{miamiAddress}</p>
                                        </div>
                                        {medellinAddress && (
                                            <div className="pt-2 border-t border-gray-200">
                                                <h3 className="font-bold text-gray-900 mb-0.5">
                                                    {isSpanish ? "Showroom Medellín, Colombia" : "Medellín Showroom, Colombia"}
                                                </h3>
                                                <p className="text-gray-600 text-sm">{medellinAddress}</p>
                                            </div>
                                        )}
                                        {(siteSettings.nit || siteSettings.us_ein) && (
                                            <div className="pt-2 border-t border-gray-200 text-xs text-gray-500">
                                                {siteSettings.nit && <p>NIT: {siteSettings.nit}</p>}
                                                {siteSettings.us_ein && <p>US EIN: {siteSettings.us_ein}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Business Hours */}
                                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">{t("contact.info.hours.title")}</h3>
                                        <p className="text-gray-600">
                                            {t("contact.info.hours.weekdays")}<br />
                                            {t("contact.info.hours.saturday")}<br />
                                            {t("contact.info.hours.sunday")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Response Box */}
                            <div className="mt-8 p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl">
                                <h3 className="font-bold text-lg mb-2">{t("contact.info.fastTrack.title")}</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    {t("contact.info.fastTrack.desc")}
                                </p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <a
                                        href={telHref}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                        {t("contact.info.fastTrack.action")}
                                    </a>
                                    <Link
                                        href="/paises"
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                                    >
                                        <Globe className="w-4 h-4" />
                                        {isSpanish ? "Ver países atendidos" : "View countries served"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">{t("contact.faqPreview.title")}</h2>
                    <p className="text-gray-600 mb-6">
                        {t("contact.faqPreview.desc")}
                    </p>
                    <Link
                        href="/preguntas-frecuentes"
                        className="inline-block px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-primary transition-all"
                    >
                        {t("contact.faqPreview.button")}
                    </Link>
                </div>
            </section>
        </main>
    );
}
