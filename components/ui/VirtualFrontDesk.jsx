'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageCircle,
    Phone,
    Mail,
    Calendar,
    HelpCircle,
    Package,
    X,
    Send,
    User,
    ChevronDown,
    MapPin,
    Clock,
    Facebook,
    Instagram
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';
import teamData from 'StaticData/team.json';

const TikTokIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const inquiryTypes = [
    { id: 'general', icon: MessageCircle, label: 'General Inquiry', label_es: 'Consulta General' },
    { id: 'product', icon: Package, label: 'Product Info', label_es: 'Info de Producto' },
    { id: 'quote', icon: Calendar, label: 'Request Quote', label_es: 'Solicitar Cotización' },
    { id: 'support', icon: HelpCircle, label: 'Support', label_es: 'Soporte' },
];

export default function VirtualFrontDesk() {
    const { t, language: lang } = useLanguage();
    const { activeBrand, brand } = useBrand();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('menu');
    const [showTeam, setShowTeam] = useState(false);
    const [showFAQ, setShowFAQ] = useState(false);

    const isSpanish = lang === 'es';

    // Brand-specific data
    const brandData = teamData[activeBrand] || teamData.binw;
    const team = brandData.team || [];
    const contact = brandData.contact || {};
    const social = teamData.social || {};

    const faqs = [
        {
            q: 'What are your shipping times?',
            q_es: '¿Cuáles son los tiempos de envío?',
            a: 'Standard shipping takes 15-25 business days for international orders. Express options available.',
            a_es: 'El envío estándar toma 15-25 días hábiles para pedidos internacionales. Opciones exprés disponibles.'
        },
        {
            q: 'Do you offer samples?',
            q_es: '¿Ofrecen muestras?',
            a: 'Yes! Contact our team to request product samples for your project evaluation.',
            a_es: '¡Sí! Contacta a nuestro equipo para solicitar muestras de productos.'
        },
        {
            q: 'What is the minimum order?',
            q_es: '¿Cuál es el pedido mínimo?',
            a: 'Our minimum order is one full container (20ft or 40ft). We offer volume discounts.',
            a_es: 'Nuestro pedido mínimo es un contenedor completo (20ft o 40ft). Ofrecemos descuentos por volumen.'
        },
        {
            q: 'Do you install products?',
            q_es: '¿Instalan los productos?',
            a: 'We work with certified installers. Contact us for recommendations.',
            a_es: 'Trabajamos con instaladores certificados. Contáctanos para recomendaciones.'
        }
    ];

    // Build contact options dynamically from brand data
    const contactOptions = [
        {
            id: 'whatsapp-main',
            icon: MessageCircle,
            label: 'WhatsApp',
            value: contact.phone,
            url: `https://wa.me/${contact.whatsapp}`
        },
        {
            id: 'phone',
            icon: Phone,
            label: isSpanish ? 'Llamar' : 'Call Us',
            value: contact.phone,
            url: `tel:${contact.phone?.replace(/[^+\d]/g, '')}`
        },
        ...(contact.phone2 ? [{
            id: 'phone2',
            icon: Phone,
            label: isSpanish ? 'Línea 2' : 'Line 2',
            value: contact.phone2,
            url: `tel:${contact.phone2?.replace(/[^+\d]/g, '')}`
        }] : []),
        {
            id: 'email',
            icon: Mail,
            label: isSpanish ? 'Correo' : 'Email',
            value: contact.email,
            url: `mailto:${contact.email}`
        },
    ];

    const tabs = [
        { id: 'menu', label: isSpanish ? 'Menú' : 'Menu', icon: MessageCircle },
        { id: 'team', label: isSpanish ? 'Equipo' : 'Team', icon: User },
        { id: 'contact', label: isSpanish ? 'Contacto' : 'Contact', icon: Phone },
    ];

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9998] flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open Virtual Front Desk"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <MessageCircle size={28} fill="white" />
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Main Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3, type: 'spring', damping: 25 }}
                        className="fixed bottom-24 right-6 z-[9999] w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{brand.name}</h3>
                                    <p className="text-sm text-gray-300">
                                        {isSpanish ? '¡Hola! ¿Cómo podemos ayudarte?' : 'Hi! How can we help you?'}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                setShowTeam(false);
                                                setShowFAQ(false);
                                            }}
                                            className={`p-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
                                        >
                                            <tab.icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="max-h-[450px] overflow-y-auto">
                            {/* Menu Tab */}
                            {activeTab === 'menu' && !showTeam && !showFAQ && (
                                <div className="p-4 space-y-3">
                                    {inquiryTypes.map(type => (
                                        <Link
                                            key={type.id}
                                            href="/contact"
                                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <type.icon size={20} className="text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {isSpanish ? type.label_es : type.label}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {isSpanish ? 'Haz clic para más información' : 'Click for more info'}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}

                                    <button
                                        onClick={() => setShowTeam(true)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <User size={20} className="text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-800">
                                                {isSpanish ? 'Nuestro Equipo' : 'Our Team'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {isSpanish ? 'Conoce a nuestro equipo' : 'Meet our team'}
                                            </p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setShowFAQ(true)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <HelpCircle size={20} className="text-green-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-800">FAQ</p>
                                            <p className="text-xs text-gray-500">
                                                {isSpanish ? 'Preguntas frecuentes' : 'Frequently asked questions'}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Quick Contact */}
                                    <div className="pt-3 border-t">
                                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                                            {isSpanish ? 'Contacto Rápido' : 'Quick Contact'}
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <a
                                                href={`https://wa.me/${contact.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                                            >
                                                <MessageCircle size={16} fill="white" />
                                                WhatsApp
                                            </a>
                                            <a
                                                href={`tel:${contact.phone?.replace(/[^+\d]/g, '')}`}
                                                className="flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                                            >
                                                <Phone size={16} />
                                                {isSpanish ? 'Llamar' : 'Call'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Team Tab */}
                            {(activeTab === 'team' || showTeam) && !showFAQ && (
                                <div className="p-4">
                                    <button
                                        onClick={() => { setShowTeam(false); setActiveTab('menu'); }}
                                        className="text-sm text-primary hover:underline mb-3 flex items-center gap-1"
                                    >
                                        ← {isSpanish ? 'Volver' : 'Back'}
                                    </button>
                                    <div className="space-y-3">
                                        {team.map(member => (
                                            <motion.div
                                                key={member.id}
                                                whileHover={{ scale: 1.02 }}
                                                className="p-3 rounded-xl border border-gray-200 hover:border-primary transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-gray-800">{member.name}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {isSpanish ? member.role_es : member.role}
                                                        </p>
                                                        <p className="text-xs text-primary">
                                                            {isSpanish ? member.specialty_es : member.specialty}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <a
                                                        href={`https://wa.me/${member.whatsapp}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 flex items-center justify-center gap-1 p-1.5 rounded-lg bg-green-500 text-white text-xs hover:bg-green-600"
                                                    >
                                                        <MessageCircle size={12} fill="white" />
                                                        WhatsApp
                                                    </a>
                                                    <a
                                                        href={`tel:${member.phone?.replace(/[^+\d]/g, '')}`}
                                                        className="flex-1 flex items-center justify-center gap-1 p-1.5 rounded-lg bg-blue-500 text-white text-xs hover:bg-blue-600"
                                                    >
                                                        <Phone size={12} />
                                                        {isSpanish ? 'Llamar' : 'Call'}
                                                    </a>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* FAQ Tab */}
                            {showFAQ && (
                                <div className="p-4">
                                    <button
                                        onClick={() => setShowFAQ(false)}
                                        className="text-sm text-primary hover:underline mb-3 flex items-center gap-1"
                                    >
                                        ← {isSpanish ? 'Volver' : 'Back'}
                                    </button>
                                    <div className="space-y-2">
                                        {faqs.map((faq, idx) => (
                                            <details key={idx} className="group rounded-lg border border-gray-200 overflow-hidden">
                                                <summary className="flex items-center justify-between p-3 cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                    <span className="font-medium text-sm text-gray-800">
                                                        {isSpanish ? faq.q_es : faq.q}
                                                    </span>
                                                    <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                                                </summary>
                                                <div className="p-3 text-sm text-gray-600 bg-white">
                                                    {isSpanish ? faq.a_es : faq.a}
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Contact Tab */}
                            {activeTab === 'contact' && (
                                <div className="p-4 space-y-4">
                                    {/* Office Info */}
                                    <div className="p-3 rounded-xl bg-gray-50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin size={16} className="text-primary" />
                                            <span className="font-semibold text-sm">
                                                {activeBrand === 'unitec'
                                                    ? (isSpanish ? 'Showroom' : 'Showroom')
                                                    : (isSpanish ? 'Oficina Principal' : 'Main Office')
                                                }
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{contact.address}</p>
                                        {contact.city && (
                                            <p className="text-sm text-gray-600">{contact.city}</p>
                                        )}
                                        <p className="text-sm text-gray-500">{contact.country}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Clock size={14} className="text-gray-400" />
                                            <span className="text-xs text-gray-500">
                                                {isSpanish ? contact.hours_es : contact.hours}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Contact Options */}
                                    {contactOptions.map(option => (
                                        <a
                                            key={option.id}
                                            href={option.url}
                                            target={option.url.startsWith('http') ? '_blank' : undefined}
                                            rel={option.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${option.id.includes('whatsapp') ? 'bg-green-500' : option.id.includes('phone') ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                                <option.icon size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800">{option.label}</p>
                                                <p className="text-xs text-gray-500">{option.value}</p>
                                            </div>
                                        </a>
                                    ))}

                                    {/* Social Media */}
                                    <div className="pt-3 border-t">
                                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                                            {isSpanish ? 'Síguenos' : 'Follow Us'}
                                        </p>
                                        <div className="flex gap-2">
                                            {social.facebook && (
                                                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700">
                                                    <Facebook size={18} />
                                                </a>
                                            )}
                                            {social.instagram && (
                                                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white hover:opacity-90">
                                                    <Instagram size={18} />
                                                </a>
                                            )}
                                            {social.tiktok && (
                                                <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800">
                                                    <TikTokIcon className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-gray-50 border-t text-center">
                            <p className="text-xs text-gray-500">
                                {isSpanish ? 'Respondemos en menos de 24 horas' : 'We respond within 24 hours'}
                            </p>
                            <Link href="/contact" className="text-xs text-primary font-semibold hover:underline">
                                {isSpanish ? 'Página de contacto' : 'Full Contact Page'} →
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
