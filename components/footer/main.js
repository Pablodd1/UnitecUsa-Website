"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Globe } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";
import { useBrand } from "lib/BrandContext";
import siteSettings, { getMiamiAddressFormatted, getWhatsAppUrl, getTelUrl, getMailtoUrl } from "lib/siteSettings";

export default function Footer() {
    const { t, getCompanyText, language } = useLanguage();
    const { activeBrand, brand } = useBrand();
    const isSpanish = language === "es";

    const miamiAddress = getMiamiAddressFormatted();
    const medellinAddress = siteSettings.medellin_showroom_address;
    const whatsappHref = getWhatsAppUrl();
    const telHref = getTelUrl();
    const mailtoHref = getMailtoUrl();

    const linkGroups = [
        {
            title: t("footer.information.title"),
            links: [
                { label: t("footer.information.links.productList"), href: "/colecciones" },
                { label: t("footer.information.links.exteriors"), href: "/colecciones/exterior" },
                { label: t("footer.information.links.interiors"), href: "/colecciones/interior" },
                { label: t("footer.information.links.sales"), href: "/colecciones/sales" }
            ],
        },
        {
            title: t("footer.helpful.title"),
            links: [
                { label: t("footer.helpful.links.about"), href: "/nosotros" },
                { label: isSpanish ? "Nuestra Historia" : "Our History", href: "/nosotros/historia" },
                { label: isSpanish ? "Países que Atendemos" : "Countries Served", href: "/paises" },
                { label: isSpanish ? "Guías de Importación y Precios" : "Import & Pricing Guides", href: "/guias" },
                { label: t("footer.helpful.links.business"), href: "/nosotros/business-models" },
                { label: t("footer.helpful.links.supports"), href: "/contacto" },
                { label: t("footer.helpful.links.faqs"), href: "/preguntas-frecuentes" },
                { label: t("footer.helpful.links.search"), href: "/colecciones/search" },
                { label: t("footer.helpful.links.terms"), href: "/terminos" },
                { label: t("footer.helpful.links.privacy"), href: "/politicas" },
            ],
        },
    ];

    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border-t border-slate-800 relative">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* Brand & Mission */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <Link href="/" className="inline-block">
                                <Image
                                    src={brand.logoImage}
                                    alt={`${siteSettings.brand_name} Logo`}
                                    width={220}
                                    height={75}
                                    className="h-16 w-auto object-contain"
                                />
                            </Link>
                            <p className="text-slate-200 leading-relaxed max-w-sm text-sm">
                                {getCompanyText(activeBrand, "description")}
                            </p>
                            {(siteSettings.nit || siteSettings.us_ein) && (
                                <div className="text-xs text-slate-400 space-y-1 pt-1">
                                    {siteSettings.nit && <p>NIT: {siteSettings.nit}</p>}
                                    {siteSettings.us_ein && <p>US EIN: {siteSettings.us_ein}</p>}
                                </div>
                            )}
                        </div>

                        {/* Social Media Links */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                                {t("footer.followUs") || "Follow Us"}
                            </h3>
                            <div className="flex gap-4">
                                {siteSettings.social?.instagram && (
                                    <a href={siteSettings.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-xs">
                                        Instagram
                                    </a>
                                )}
                                {siteSettings.social?.facebook && (
                                    <a href={siteSettings.social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-xs">
                                        Facebook
                                    </a>
                                )}
                                {siteSettings.social?.tiktok && (
                                    <a href={siteSettings.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-xs">
                                        TikTok
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {linkGroups.map((group, idx) => (
                            <div key={idx}>
                                <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-b border-primary/30 pb-2 inline-block">
                                    {group.title}
                                </h2>
                                <ul className="space-y-3 text-sm">
                                    {group.links.map((item, i) => (
                                        <li key={i}>
                                            <Link
                                                href={item.href}
                                                className="text-slate-300 transition-colors hover:text-primary hover:pl-1 block duration-200"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Contact Us Block (Single Source of Truth) */}
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-b border-primary/30 pb-2 inline-block">
                                {t("footer.contact.title")}
                            </h2>
                            <ul className="space-y-4 text-sm text-slate-200">
                                {siteSettings.primary_phone && (
                                    <li>
                                        <a href={telHref} className="group flex items-start gap-3 hover:text-white transition-colors">
                                            <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <div>
                                                <span className="block text-xs text-slate-300">{t("footer.contact.phone")}</span>
                                                <span className="font-medium text-white">{siteSettings.primary_phone}</span>
                                            </div>
                                        </a>
                                    </li>
                                )}
                                {siteSettings.public_email && (
                                    <li>
                                        <a href={mailtoHref} className="group flex items-start gap-3 hover:text-white transition-colors">
                                            <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <div className="overflow-hidden">
                                                <span className="block text-xs text-slate-300">{t("footer.contact.email")}</span>
                                                <span className="font-medium text-white break-all">{siteSettings.public_email}</span>
                                            </div>
                                        </a>
                                    </li>
                                )}
                                <li>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <div className="space-y-2">
                                            <div>
                                                <span className="block text-xs text-slate-300">
                                                    {isSpanish ? "Sede EE. UU. (Miami)" : "US Headquarters (Miami)"}
                                                </span>
                                                <span className="text-white block text-xs leading-relaxed">{miamiAddress}</span>
                                            </div>
                                            {medellinAddress && (
                                                <div>
                                                    <span className="block text-xs text-slate-300">
                                                        {isSpanish ? "Showroom Medellín, Colombia" : "Medellín Showroom, Colombia"}
                                                    </span>
                                                    <span className="text-white block text-xs leading-relaxed">{medellinAddress}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <Link href="/paises" className="group flex items-center gap-2 text-xs text-sky-400 hover:text-sky-300 transition-colors pt-1">
                                        <Globe className="h-4 w-4 shrink-0" />
                                        <span>{isSpanish ? "Ver todos los países que atendemos" : "View all countries served"}</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-300">
                    <p>&copy; {new Date().getFullYear()} {siteSettings.brand_name}. {t("footer.rights")}</p>
                    <div className="flex gap-6">
                        <Link href="/politicas" className="hover:text-slate-300 transition-colors">{t("footer.privacy")}</Link>
                        <Link href="/terminos" className="hover:text-slate-300 transition-colors">{t("footer.terms")}</Link>
                        <Link href="/paises" className="hover:text-slate-300 transition-colors">{isSpanish ? "Países" : "Countries"}</Link>
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp Button - Single Source of Truth */}
            {siteSettings.primary_whatsapp && (
                <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isSpanish ? "Chatear por WhatsApp" : "Chat on WhatsApp"}
                    className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1ebe57] transition-all transform hover:scale-110 flex items-center justify-center group"
                >
                    <MessageCircle className="w-7 h-7" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-medium text-sm">
                        {isSpanish ? "Chatea con nosotros" : "Chat with us"}
                    </span>
                </a>
            )}
        </footer>
    );
}
