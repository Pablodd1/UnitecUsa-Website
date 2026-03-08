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
import teamData from 'StaticData/team.json';

const TikTokIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

export default function ContactPage() {
    const { t, language: lang } = useLanguage();
    const { activeBrand, brand } = useBrand();
    const isSpanish = lang === 'es';
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

    const handleMeetingSubmit = (e) => {
        e.preventDefault();
        const subject = `Meeting Request - ${meetingData.date} at ${meetingData.time}`;
        const body = `I'd like to schedule a meeting.\n\nName: ${meetingData.name}\nEmail: ${meetingData.email}\nPhone: ${meetingData.phone}\nPreferred Date: ${meetingData.date}\nPreferred Time: ${meetingData.time}\n\nNotes:\n${meetingData.notes}`;
        window.location.href = `mailto:info@building-innovation.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <main className="w-full">
            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden py-20 text-white min-h-fit">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/raster/Representation.png"
                        alt="Contact Us"
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
                        {t('contact.hero.title')}
                        <span className="text-gray-300"> {t('contact.hero.subtitle')}</span>
                    </motion.h1>

                    <p className="my-4 max-w-2xl text-sm text-gray-300">
                        {t('contact.hero.description')}
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

            {/* ================= TEAM SECTION ================= */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            {isSpanish ? 'Nuestro Equipo de Ventas' : 'Our Sales Team'}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {isSpanish
                                ? 'Conoce a nuestro equipo especializado. Estamos aquí para ayudarte con tus proyectos.'
                                : 'Meet our specialized team. We are here to help with your projects.'}
                        </p>
                    </motion.div>

                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${team.length <= 4 ? '2 xl:grid-cols-4' : '3 xl:grid-cols-5'} gap-4`}>
                        {team.map((member, idx) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow"
                            >
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold mb-3">
                                        {member.name.charAt(0)}
                                    </div>
                                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-xs text-primary font-medium">
                                        {isSpanish ? member.role_es : member.role}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {member.specialty}
                                    </p>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <a
                                        href={`https://wa.me/${member.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                                    >
                                        <MessageCircle size={16} fill="white" />
                                        WhatsApp
                                    </a>
                                    <a
                                        href={`tel:${member.phone}`}
                                        className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                                    >
                                        <Phone size={16} />
                                        {isSpanish ? 'Llamar' : 'Call'}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= QUICK CONTACT ================= */}
            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* WhatsApp */}
                        <motion.a
                            href={`https://wa.me/${contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-green-500 text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <MessageCircle size={32} fill="white" />
                            <div>
                                <p className="font-bold">WhatsApp</p>
                                <p className="text-sm opacity-90">{contact.phone}</p>
                            </div>
                        </motion.a>

                        {/* Phone 2 (if exists) or Phone */}
                        <motion.a
                            href={`tel:${(contact.phone2 || contact.phone)?.replace(/[^+\d]/g, '')}`}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-blue-500 text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Phone size={32} />
                            <div>
                                <p className="font-bold">{isSpanish ? 'Teléfono' : 'Phone'}</p>
                                <p className="text-sm opacity-90">{contact.phone2 || contact.phone}</p>
                            </div>
                        </motion.a>

                        {/* Phone (main) */}
                        <motion.a
                            href={`tel:${contact.phone?.replace(/[^+\d]/g, '')}`}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Phone size={32} />
                            <div>
                                <p className="font-bold">{isSpanish ? 'Línea Principal' : 'Main Line'}</p>
                                <p className="text-sm opacity-90">{contact.phone}</p>
                            </div>
                        </motion.a>

                        {/* Email */}
                        <motion.a
                            href={`mailto:${contact.email}`}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-gray-800 text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Mail size={32} />
                            <div>
                                <p className="font-bold">Email</p>
                                <p className="text-sm opacity-90">{contact.email}</p>
                            </div>
                        </motion.a>
                    </div>
                </div>
            </section>

            {/* ================= CONTACT CONTENT ================= */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="mx-auto grid max-w-6xl gap-8 md:gap-12 px-4 lg:grid-cols-5">
                    <Stylish_H2 h2={t('contact.talkTeam')} className="col-span-full tracking-widest uppercase text-xs md:text-sm lg:text-lg" />

                    {/* LEFT INFO */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {isSpanish ? '¿Tienes preguntas?' : 'Have Questions?'}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {t('contact.whether')}
                            </p>
                        </div>

                        {/* Contact cards */}
                        <div className="space-y-4">
                            <InfoCard
                                icon={MapPin}
                                title={activeBrand === 'unitec'
                                    ? 'Showroom'
                                    : (isSpanish ? 'Oficina Principal' : 'Main Office')}
                                value={`${contact.address}${contact.city ? ', ' + contact.city : ''}`}
                                hint={contact.country}
                            />
                            <InfoCard
                                icon={Clock}
                                title={isSpanish ? 'Horario de Atención' : 'Business Hours'}
                                value={isSpanish ? contact.hours_es : contact.hours}
                                hint={isSpanish ? 'Respondemos en 24 horas' : 'We respond within 24 hours'}
                            />
                        </div>

                        {/* Social Media */}
                        <div className="pt-4">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                {isSpanish ? 'Síguenos' : 'Follow Us'}
                            </h3>
                            <div className="flex gap-3">
                                {social.facebook && (
                                    <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                                        <Facebook size={24} />
                                    </a>
                                )}
                                {social.instagram && (
                                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                                        <Instagram size={24} />
                                    </a>
                                )}
                                {social.tiktok && (
                                    <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                                        <TikTokIcon className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Book Meeting Button */}
                        <button
                            onClick={() => setShowScheduler(!showScheduler)}
                            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-90 transition-opacity"
                        >
                            <Calendar size={24} />
                            {isSpanish ? 'Agendar Una Reunión' : 'Book a Meeting'}
                        </button>

                        {/* Meeting Scheduler */}
                        <AnimatePresence>
                            {showScheduler && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white rounded-xl p-6 shadow-lg border"
                                >
                                    <h3 className="font-bold text-lg mb-4">
                                        {isSpanish ? 'Selecciona fecha y hora' : 'Select Date & Time'}
                                    </h3>
                                    <form onSubmit={handleMeetingSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder={isSpanish ? 'Tu nombre' : 'Your Name'}
                                                value={meetingData.name}
                                                onChange={(e) => setMeetingData({ ...meetingData, name: e.target.value })}
                                                className="w-full rounded-lg border px-3 py-2 text-sm"
                                                required
                                            />
                                            <input
                                                type="email"
                                                placeholder={isSpanish ? 'Tu email' : 'Your Email'}
                                                value={meetingData.email}
                                                onChange={(e) => setMeetingData({ ...meetingData, email: e.target.value })}
                                                className="w-full rounded-lg border px-3 py-2 text-sm"
                                                required
                                            />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder={isSpanish ? 'Tu teléfono' : 'Your Phone'}
                                            value={meetingData.phone}
                                            onChange={(e) => setMeetingData({ ...meetingData, phone: e.target.value })}
                                            className="w-full rounded-lg border px-3 py-2 text-sm"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="date"
                                                value={meetingData.date}
                                                onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                                                className="w-full rounded-lg border px-3 py-2 text-sm"
                                                required
                                            />
                                            <select
                                                value={meetingData.time}
                                                onChange={(e) => setMeetingData({ ...meetingData, time: e.target.value })}
                                                className="w-full rounded-lg border px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="">{isSpanish ? 'Seleccionar hora' : 'Select Time'}</option>
                                                <option value="9:00 AM">9:00 AM</option>
                                                <option value="10:00 AM">10:00 AM</option>
                                                <option value="11:00 AM">11:00 AM</option>
                                                <option value="12:00 PM">12:00 PM</option>
                                                <option value="1:00 PM">1:00 PM</option>
                                                <option value="2:00 PM">2:00 PM</option>
                                                <option value="3:00 PM">3:00 PM</option>
                                                <option value="4:00 PM">4:00 PM</option>
                                                <option value="5:00 PM">5:00 PM</option>
                                            </select>
                                        </div>
                                        <textarea
                                            placeholder={isSpanish ? 'Notas adicionales (opcional)' : 'Additional notes (optional)'}
                                            value={meetingData.notes}
                                            onChange={(e) => setMeetingData({ ...meetingData, notes: e.target.value })}
                                            className="w-full rounded-lg border px-3 py-2 text-sm"
                                            rows={3}
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-3 px-6 rounded-xl bg-black text-white font-bold hover:bg-gray-900 transition-colors"
                                        >
                                            {isSpanish ? 'Solicitar Reunión' : 'Request Meeting'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT FORM */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold">
                                {t('contact.requestQuote')}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {t('contact.provideDetails')}
                            </p>

                            <form className="mt-6 grid gap-4 sm:grid-cols-2">
                                <Input label={t('contact.fullName')} placeholder="John Doe" />
                                <Input label={t('contact.companyName')} placeholder="Your Company LLC" />
                                <Input label={t('contact.email')} placeholder="your-name@example.com" />
                                <Input label={t('contact.phone')} placeholder="+1 234 567 890" />

                                <div className="sm:col-span-2">
                                    <Input
                                        label={t('contact.estimatedVolume')}
                                        placeholder="e.g. 1x 40ft container"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Textarea
                                        label={t('contact.projectDetails')}
                                        placeholder="Describe product types, quantities, destination, and timeline..."
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit" aria-label="Submit Form"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900 active:scale-[0.98]"
                                    >
                                        <Send size={16} />
                                        {t('contact.sendInquiry')}
                                    </button>
                                </div>
                            </form>

                            <p className="mt-4 text-xs text-gray-500">
                                {t('contact.responseTimeText')}
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
        <div className="flex items-start gap-4 rounded-xl border p-4">
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
