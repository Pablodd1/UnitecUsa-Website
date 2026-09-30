"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
    Phone,
    Mail,
    MapPin,
    Boxes,
    Clock,
    Truck,
    ShieldCheck,
    Container,
    Send,
    Calendar,
    MessageCircle,
    Facebook,
    Instagram,
    ChevronDown,
    ChevronUp,
    User,
    Users
} from "lucide-react"
import Stylish_H2 from "My_UI/stylish_h2"
import Map from "./map";
import { useLanguage } from "lib/LanguageContext";
import { useBrand } from 'lib/BrandContext';
import teamData from 'static_data/team.json';

const TikTokIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

import SeoHead from "components/SeoHead"

const contactMetadata = {
    title: "Contacto | UNITEC USA Design",
    description: "Ponte en contacto con nuestro equipo de UNITEC USA para consultas, soporte o para agendar una reunión sobre sus proyectos."
};

export default function ContactPage() {
    const { t, language: lang, getCompanyText } = useLanguage();
    const { activeBrand, brand } = useBrand();
    const isSpanish = lang === 'es';
    const companyKey = activeBrand === 'unitec' ? 'unitec' : 'binw';
    
    const contactHeroTitle = getCompanyText(companyKey, 'contact.title');
    const contactHeroSubtitle = getCompanyText(companyKey, 'contact.subtitle');
    const contactHeroDescription = getCompanyText(companyKey, 'contact.description');
    
    const brandData = teamData[activeBrand] || teamData.binw;
    const team = brandData.team || [];
    const contact = brandData.contact || {};
    const social = teamData.social || {};

    const [showScheduler, setShowScheduler] = useState(false);
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [meetingData, setMeetingData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        notes: ''
    });
    const [quoteData, setQuoteData] = useState({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        volume: '',
        details: ''
    });

    const faqs = [
        {
            q: 'What are your shipping times?',
            q_es: '¿Cuáles son los tiempos de envío?',
            a: 'Standard shipping takes 15-25 business days for international orders. Express options available upon request.',
            a_es: 'El envío estándar toma 15-25 días hábiles para pedidos internacionales. Opciones exprés disponibles bajo solicitud.'
        },
        {
            q: 'Do you offer samples?',
            q_es: '¿Ofrecen muestras?',
            a: 'Yes! Contact our team to request product samples for your project evaluation. We provide samples for qualified projects.',
            a_es: '¡Sí! Contacta a nuestro equipo para solicitar muestras de productos para evaluación de tu proyecto.'
        },
        {
            q: 'What is the minimum order?',
            q_es: '¿Cuál es el pedido mínimo?',
            a: 'Our minimum order is one full container (20ft or 40ft). We offer volume discounts for larger orders.',
            a_es: 'Nuestro pedido mínimo es un contenedor completo (20ft o 40ft). Ofrecemos descuentos por volumen.'
        },
        {
            q: 'Do you provide installation?',
            q_es: '¿Brindan instalación?',
            a: 'We work with certified installers across the US. Contact us for recommendations in your area.',
            a_es: 'Trabajamos con instaladores certificados en EE.UU. Contáctanos para recomendaciones en tu área.'
        }
    ];

    const [quoteStatus, setQuoteStatus] = useState({ state: 'idle', message: '' });
    const [meetingStatus, setMeetingStatus] = useState({ state: 'idle', message: '' });

    const handleMeetingSubmit = async (e) => {
        e.preventDefault();
        setMeetingStatus({ state: 'submitting', message: '' });
        const contactEmail = brand?.email || 'lidermercadeo@espaciosimportados.com.co';
        const subject = `Meeting Request - ${meetingData.date} at ${meetingData.time}`;
        const body = `I'd like to schedule a meeting.\n\nName: ${meetingData.name}\nEmail: ${meetingData.email}\nPhone: ${meetingData.phone}\nPreferred Date: ${meetingData.date}\nPreferred Time: ${meetingData.time}\n\nNotes:\n${meetingData.notes}`;

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'meeting',
                    fullName: meetingData.name,
                    email: meetingData.email,
                    phone: meetingData.phone,
                    date: meetingData.date,
                    time: meetingData.time,
                    notes: meetingData.notes
                })
            });
            setMeetingStatus({
                state: 'success',
                message: isSpanish ? '¡Solicitud recibida! Le contactaremos a la brevedad.' : 'Request received! We will contact you shortly.'
            });
        } catch (err) {
            console.warn('API submission fallback to mailto:', err);
        }
        window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();
        setQuoteStatus({ state: 'submitting', message: '' });
        const contactEmail = brand?.email || 'lidermercadeo@espaciosimportados.com.co';
        const subject = `Quote Inquiry - ${quoteData.companyName || quoteData.fullName}`;
        const body = `Quote Request Details:\n\n` +
            `Full Name: ${quoteData.fullName}\n` +
            `Company: ${quoteData.companyName}\n` +
            `Email: ${quoteData.email}\n` +
            `Phone: ${quoteData.phone}\n` +
            `Estimated Volume: ${quoteData.volume}\n\n` +
            `Project Details:\n${quoteData.details}`;

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'quote',
                    fullName: quoteData.fullName,
                    companyName: quoteData.companyName,
                    email: quoteData.email,
                    phone: quoteData.phone,
                    volume: quoteData.volume,
                    details: quoteData.details
                })
            });
            setQuoteStatus({
                state: 'success',
                message: isSpanish ? '¡Gracias! Su cotización ha sido registrada exitosamente.' : 'Thank you! Your quote inquiry has been submitted.'
            });
        } catch (err) {
            console.warn('API submission fallback to mailto:', err);
        }
        window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <>
            <SeoHead 
                title={contactMetadata.title} 
                description={contactMetadata.description}
                canonical="https://unitecusadesign.com/contacto/"
            />
            <main className="w-full">
            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden py-20 text-white min-h-fit">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/raster/Representation.png"
                        alt="Unitec USA Design Support Team and Logistics Representation"
                        fill
                        className="object-cover object-center w-full h-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>

                <div className="mx-auto max-w-6xl px-4 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl text-2xl sm:text-3xl font-bold leading-tight md:text-4xl"
                    >
                        {contactHeroTitle}
                        <span className="text-gray-300"> {contactHeroSubtitle}</span>
                    </motion.h1>

                    <p className="my-4 max-w-2xl text-sm text-gray-300">
                        {contactHeroDescription}
                    </p>

                    {/* Trust signals */}
                    <div className="my-8 grid gap-4 grid-cols-2 md:grid-cols-4">
                        <TrustItem icon={Container} label={t('contact.hero.bulkOrders')} value={t('contact.hero.containerBased')} />
                        <TrustItem icon={Truck} label={t('contact.hero.logistics')} value={t('contact.hero.optimizedPacking')} />
                        <TrustItem icon={Clock} label={t('contact.hero.responseTime')} value={t('contact.hero.within24h')} />
                        <TrustItem icon={ShieldCheck} label={t('contact.hero.handling')} value={t('contact.hero.secureTracked')} />
                    </div>
                </div>
            </section>

            {/* ================= MAP ================= */}
            <Map />

            {/* ================= QUICK CONTACT ================= */}
            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex justify-center items-center gap-4">
                        <motion.a
                            href="https://wa.me/573142332147"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 px-8 rounded-xl bg-green-500 text-white shadow-lg hover:shadow-xl transition-shadow w-full md:w-auto min-w-[300px] justify-center"
                        >
                            <MessageCircle size={32} fill="white" />
                            <div>
                                <p className="font-bold text-lg">WhatsApp</p>
                                <p className="text-sm opacity-90">+57 314 233 2147</p>
                            </div>
                        </motion.a>
                    </div>
                </div>
            </section>

            {/* ================= CONTACT CONTENT ================= */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="mx-auto grid max-w-6xl gap-8 md:gap-12 px-4 lg:grid-cols-5">
                    <Stylish_H2 h2={t('contact.talkTeam')} className="col-span-full tracking-widest uppercase text-xs md:text-sm lg:text-lg" />

                    {/* RIGHT FORM */}
                    <div className="lg:col-span-5 max-w-2xl mx-auto w-full">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold">
                                {t('contact.requestQuote')}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {t('contact.provideDetails')}
                            </p>

                            <form onSubmit={handleQuoteSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                                <Input 
                                    label={isSpanish ? "Nombre Completo" : t('contact.fullName')} 
                                    placeholder="Nombre y Apellido"
                                    value={quoteData.fullName}
                                    onChange={(e) => setQuoteData({ ...quoteData, fullName: e.target.value })}
                                    required 
                                />
                                <Input 
                                    label={isSpanish ? "Nombre de la Empresa" : t('contact.companyName')} 
                                    placeholder="Su Empresa S.A.S."
                                    value={quoteData.companyName}
                                    onChange={(e) => setQuoteData({ ...quoteData, companyName: e.target.value })}
                                />
                                <Input 
                                    label={isSpanish ? "Correo Electrónico" : t('contact.email')} 
                                    type="email"
                                    placeholder="su-nombre@ejemplo.com"
                                    value={quoteData.email}
                                    onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                                    required
                                />
                                <Input 
                                    label={isSpanish ? "Teléfono" : t('contact.phone')} 
                                    placeholder="+57 300 000 0000"
                                    value={quoteData.phone}
                                    onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                                />

                                <div className="sm:col-span-2">
                                    <Input
                                        label={isSpanish ? "Volumen / Contenedores Estimados" : t('contact.estimatedVolume')}
                                        placeholder="e.j. 1x contenedor de 40 pies"
                                        value={quoteData.volume}
                                        onChange={(e) => setQuoteData({ ...quoteData, volume: e.target.value })}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Textarea
                                        label={isSpanish ? "Detalles del Proyecto" : t('contact.projectDetails')}
                                        placeholder="Describa tipos de productos, cantidades, destino y cronograma..."
                                        value={quoteData.details}
                                        onChange={(e) => setQuoteData({ ...quoteData.details, details: e.target.value })}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit" aria-label="Submit Form"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 active:scale-[0.98]"
                                    >
                                        <Send size={16} />
                                        {isSpanish ? "Enviar Consulta" : t('contact.sendInquiry')}
                                    </button>
                                </div>
                            </form>

                            <p className="mt-4 text-xs text-gray-500">
                                {isSpanish ? "Nuestro equipo generalmente responde dentro de 24 horas hábiles." : t('contact.responseTimeText')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FAQ SECTION ================= */}
            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-4xl px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        {isSpanish ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
                    </h2>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
                                >
                                    <span className="font-medium text-gray-900">
                                        {isSpanish ? faq.q_es : faq.q}
                                    </span>
                                    {expandedFAQ === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                <AnimatePresence>
                                    {expandedFAQ === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="bg-gray-50 px-4 pb-4"
                                        >
                                            <p className="text-sm text-gray-600">
                                                {isSpanish ? faq.a_es : faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

/* ================= SUB COMPONENTS ================= */

function TrustItem({ icon: Icon, label, value }) {
    return (
        <div className="rounded-xl bg-white/5 p-3 md:p-4 text-center">
            <Icon strokeWidth={0.5} className="mx-auto mb-3 md:mb-5 h-10 md:h-18 w-auto text-gray-300" />
            <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
            <p className="text-xs md:text-sm font-thin tracking-widest uppercase my-2">{value}</p>
        </div>
    )
}

function InfoCard({ icon: Icon, title, value, hint }) {
    return (
        <div className="flex items-start gap-4 rounded-xl border p-4 break-anywhere">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Icon size={18} />
            </div>
            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm">{value}</p>
                <p className="text-xs text-gray-500">{hint}</p>
            </div>
        </div>
    )
}

function Input({ label, ...props }) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                {label}
            </label>
            <input
                {...props}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-black"
            />
        </div>
    )
}

function Textarea({ label, ...props }) {
    return (
        <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
                {label}
            </label>
            <textarea
                {...props}
                rows={4}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-black"
            />
        </div>
    )
}

