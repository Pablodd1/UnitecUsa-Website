"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Layers, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";
import siteSettings, { getWhatsAppUrl } from "lib/siteSettings";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
};

export default function AboutPage() {
    const { language } = useLanguage();
    const isSpanish = language === "es";

    const whatsappLink = getWhatsAppUrl();

    const valueBullets = isSpanish
        ? [
            "Rápida instalación",
            "Cero mantenimiento con pinturas, solventes ni químicos",
            "Durabilidad entre 15 y 25 años",
            "Resistentes al fuego",
            "Elaborados con materiales recuperados y 100 % reciclables",
            "100 % impermeables"
        ]
        : [
            "Fast installation",
            "Zero maintenance with paints, solvents, or chemicals",
            "15 to 25 years of durability",
            "Fire-resistant performance",
            "Manufactured with recovered and 100% recyclable materials",
            "100% waterproof"
        ];

    const materialSolutions = isSpanish
        ? [
            {
                title: "Láminas tipo mármol",
                desc: "Acabados elegantes para muros interiores con estética de piedra natural y fácil limpieza.",
                href: "/colecciones/laminas"
            },
            {
                title: "Cielo raso en PVC",
                desc: "Soluciones ligeras, durables e impermeables para techos residenciales, comerciales e institucionales.",
                href: "/colecciones/interior"
            },
            {
                title: "Paredes en WPC",
                desc: "Revestimientos acanalados y arquitectónicos que aportan calidez, textura y confort acústico.",
                href: "/colecciones/paneles-wpc"
            },
            {
                title: "Jardines sintéticos",
                desc: "Follaje decorativo de apariencia natural para muros verdes en interiores y exteriores sin riego.",
                href: "/colecciones/jardines-artificiales"
            },
            {
                title: "Pisos",
                desc: "Superficies SPC y deck de alta resistencia al tráfico, la humedad y los cambios de temperatura.",
                href: "/colecciones/pisos"
            },
            {
                title: "Fachadas",
                desc: "Sistemas constructivos exteriores diseñados para soportar sol, lluvia e intemperie sin deterioro.",
                href: "/colecciones/fachadas"
            },
            {
                title: "Listones",
                desc: "Elementos arquitectónicos versátiles para divisiones de ambientes, pérgolas y detalles de diseño.",
                href: "/colecciones/listones-wpc-exterior"
            },
            {
                title: "Adhesivos de pared",
                desc: "Recubrimientos autoadhesivos prácticos para renovar superficies en cuestión de horas.",
                href: "/colecciones/paredes"
            },
            {
                title: "Tejas",
                desc: "Cubiertas termoacústicas UPVC de alta resistencia estructural y protección climática.",
                href: "/colecciones/cubiertas-upvc"
            },
            {
                title: "Zócalos y accesorios",
                desc: "Perfilería, cintas, pegantes y remates para una instalación limpia y profesional de principio a fin.",
                href: "/colecciones/zocalos"
            }
        ]
        : [
            {
                title: "PVC Marble Sheets",
                desc: "High-gloss UV-coated wall sheets delivering natural stone aesthetics with rapid installation.",
                href: "/colecciones/laminas"
            },
            {
                title: "PVC Ceiling Panels",
                desc: "Lightweight, waterproof ceiling systems for residential, commercial, and institutional projects.",
                href: "/colecciones/interior"
            },
            {
                title: "WPC Wall Panels",
                desc: "Fluted and architectural wall cladding providing warmth, texture, and acoustic comfort.",
                href: "/colecciones/paneles-wpc"
            },
            {
                title: "Artificial Vertical Gardens",
                desc: "UV-protected decorative foliage for indoor and outdoor green walls with zero irrigation.",
                href: "/colecciones/jardines-artificiales"
            },
            {
                title: "SPC & Deck Flooring",
                desc: "High-traffic rigid-core SPC flooring and outdoor WPC decking engineered for moisture resistance.",
                href: "/colecciones/pisos"
            },
            {
                title: "Exterior Facades",
                desc: "Weather-resistant exterior cladding designed to withstand sun, rain, and humidity.",
                href: "/colecciones/fachadas"
            },
            {
                title: "Architectural Louvers & Slats",
                desc: "Versatile WPC profiles for room dividers, pergolas, and contemporary architectural accents.",
                href: "/colecciones/listones-wpc-exterior"
            },
            {
                title: "Self-Adhesive Wall Rolls",
                desc: "Fast-application decorative wall coverings for commercial and residential renovations.",
                href: "/colecciones/paredes"
            },
            {
                title: "UPVC Thermoacoustic Roofing",
                desc: "Structural UPVC roofing sheets with thermal and acoustic insulation for industrial and residential roofs.",
                href: "/colecciones/cubiertas-upvc"
            },
            {
                title: "Baseboards & Accessories",
                desc: "Trims, structural adhesives, and finishing profiles for complete professional installations.",
                href: "/colecciones/zocalos"
            }
        ];

    return (
        <main className="w-full bg-white text-slate-900 overflow-hidden">
            {/* Sub-navigation bar to Historia */}
            <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-6 sticky top-[68px] z-20 backdrop-blur-md bg-slate-100/90">
                <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
                    <Link
                        href="/nosotros"
                        className="px-5 py-1.5 rounded-full text-xs md:text-sm font-bold bg-[#132c3f] text-white shadow-sm"
                    >
                        {isSpanish ? "Sobre Nosotros" : "About Us"}
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                        href="/nosotros/historia"
                        className="px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        {isSpanish ? "Nuestra Historia (+20 Años)" : "Our History (+20 Years)"}
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                        href="/paises"
                        className="px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        {isSpanish ? "Países que Atendemos" : "Countries Served"}
                    </Link>
                </div>
            </div>

            {/* ================= 1. HERO SECTION ================= */}
            <section className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#132c3f]">
                <div className="absolute inset-0">
                    <Image
                        src="/raster/nosotros/hero_nosotros.webp"
                        alt={isSpanish
                            ? `${siteSettings.brand_name} - Materiales arquitectónicos para construcción y remodelación`
                            : `${siteSettings.brand_name} - Architectural building and renovation materials`}
                        fill
                        className="object-cover opacity-35 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#132c3f]/80 via-[#132c3f]/65 to-[#132c3f]/95" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center text-white">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-[0.2em] uppercase mb-6 text-sky-300"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        {siteSettings.brand_name}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] mb-6 max-w-4xl mx-auto"
                    >
                        {isSpanish
                            ? "Materiales que hacen más fácil construir, renovar y transformar espacios"
                            : "Materials That Make Building, Renovating, and Transforming Spaces Easier"}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10"
                    >
                        {isSpanish
                            ? `En ${siteSettings.brand_name} llevamos más de dos décadas impulsando soluciones constructivas innovadoras para interiores y exteriores en distintos mercados del continente.`
                            : `At ${siteSettings.brand_name}, we have spent over two decades delivering innovative interior and exterior architectural building solutions across the Americas.`}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/colecciones"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#F37B24] hover:bg-[#e06912] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {isSpanish ? "Conoce nuestras soluciones" : "Explore Our Solutions"}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm font-bold text-sm uppercase tracking-wider transition-all duration-300"
                        >
                            {isSpanish ? "Habla con un asesor" : "Speak with an Advisor"}
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ================= 2. QUIÉNES SOMOS ================= */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeInUp}
                            className="lg:col-span-6 space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-10 bg-sky-500" />
                                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-600">
                                    {isSpanish ? "QUIÉNES SOMOS" : "WHO WE ARE"}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-[#132c3f] tracking-tight leading-tight">
                                {isSpanish
                                    ? "Soluciones constructivas pensadas para el mundo real"
                                    : "Architectural Building Solutions Engineered for the Real World"}
                            </h2>

                            <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed">
                                <p>
                                    {isSpanish
                                        ? `${siteSettings.brand_name} es una empresa enfocada en el desarrollo, importación y comercialización de materiales para construcción, remodelación y diseño de espacios.`
                                        : `${siteSettings.brand_name} specializes in the development, container export, and wholesale distribution of architectural materials for construction, renovation, and interior design.`}
                                </p>
                                <p>
                                    {isSpanish
                                        ? "Nuestro portafolio reúne alternativas prácticas, durables y visualmente atractivas en PVC, WPC y otras líneas complementarias para hogares, comercios y proyectos institucionales."
                                        : "Our catalog brings together practical, durable, and high-design solutions in PVC, WPC, and SPC for residential, commercial, and institutional projects."}
                                </p>
                                <p className="font-medium text-slate-800">
                                    {isSpanish
                                        ? "Creemos en una construcción más ágil, más limpia y más eficiente. Por eso trabajamos con productos que facilitan la instalación, reducen tiempos de obra y responden a las necesidades reales de nuestros clientes."
                                        : "We believe in faster, cleaner, and more efficient construction—providing materials that simplify installation, reduce project timelines, and lower long-term maintenance."}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-6"
                        >
                            <div className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                                <Image
                                    src="/raster/nosotros/quienes_somos.webp"
                                    alt={isSpanish
                                        ? `Showroom y soluciones arquitectónicas ${siteSettings.brand_name}`
                                        : `${siteSettings.brand_name} showroom and architectural solutions`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#132c3f]/50 via-transparent to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= 3. NUESTRO PROPÓSITO (MISIÓN Y VISIÓN) ================= */}
            <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-200/70">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-600 block mb-3">
                            {isSpanish ? "NUESTRO PROPÓSITO" : "OUR PURPOSE"}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#132c3f] tracking-tight">
                            {isSpanish
                                ? "Lo que guía cada paso que damos"
                                : "What Guides Every Step We Take"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Misión */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white rounded-3xl p-8 md:p-10 shadow-md border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-[#132c3f]" />
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-[#132c3f]/10 text-[#132c3f] flex items-center justify-center mb-6">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black text-[#132c3f] mb-4">
                                    {isSpanish ? "Misión" : "Mission"}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                                    {isSpanish
                                        ? "Brindar soluciones innovadoras y sostenibles para el sector de la construcción y la remodelación, con productos de alta calidad que generen valor para clientes, aliados, colaboradores y comunidades."
                                        : "To provide innovative and sustainable building and renovation solutions through high-quality architectural materials that create lasting value for clients, partners, and communities."}
                                </p>
                            </div>
                        </motion.div>

                        {/* Visión */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white rounded-3xl p-8 md:p-10 shadow-md border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-sky-500" />
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-6">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black text-[#132c3f] mb-4">
                                    {isSpanish ? "Visión" : "Vision"}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                                    {isSpanish
                                        ? "Consolidarnos como una marca referente en soluciones constructivas en América, reconocida por su innovación, cumplimiento, cercanía comercial y capacidad de adaptación a cada mercado."
                                        : "To stand as a benchmark architectural materials supplier across the Americas, recognized for product innovation, container logistics reliability, and market adaptability."}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= 4. NUESTRA PROPUESTA DE VALOR ================= */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-5 order-2 lg:order-1"
                        >
                            <div className="relative h-[420px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                                <Image
                                    src="/raster/nosotros/propuesta_valor.webp"
                                    alt={isSpanish ? "Atributos de materiales PVC y WPC" : "PVC and WPC material attributes"}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#132c3f]/70 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <span className="text-xs font-bold uppercase tracking-widest text-sky-300 block mb-1">
                                        {isSpanish ? "Alto Desempeño" : "High Performance"}
                                    </span>
                                    <p className="text-lg font-bold leading-snug">
                                        {isSpanish
                                            ? "Materiales diseñados para resistir el uso real y conservar su estética por décadas."
                                            : "Materials engineered to withstand daily wear and preserve their aesthetic for decades."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-7 order-1 lg:order-2 space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-10 bg-sky-500" />
                                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-600">
                                    {isSpanish ? "POR QUÉ ELEGIRNOS" : "WHY CHOOSE US"}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-[#132c3f] tracking-tight leading-tight">
                                {isSpanish
                                    ? "Productos pensados para durar, rendir y verse bien"
                                    : "Products Engineered to Last, Perform, and Look Exceptional"}
                            </h2>

                            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                                {isSpanish
                                    ? "Nuestras líneas están diseñadas para responder a las exigencias del uso diario, optimizar el tiempo de instalación y ofrecer acabados modernos con bajo mantenimiento."
                                    : "Our product lines are engineered to handle daily demands, streamline installation times, and deliver contemporary architectural finishes with minimal upkeep."}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                {valueBullets.map((bullet, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/30 transition-colors"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                                        <span className="text-sm md:text-base font-bold text-slate-800 leading-snug">
                                            {bullet}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= 5. COMPROMISO CON LA SOSTENIBILIDAD Y LA CALIDAD ================= */}
            <section className="py-20 md:py-28 bg-[#132c3f] text-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-7 space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-10 bg-sky-400" />
                                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-300">
                                    {isSpanish ? "SOSTENIBILIDAD Y CALIDAD" : "SUSTAINABILITY & QUALITY"}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                                {isSpanish
                                    ? "Construir mejor también es pensar en el futuro"
                                    : "Building Better Also Means Thinking Ahead"}
                            </h2>

                            <div className="space-y-4 text-slate-200 text-base md:text-lg leading-relaxed">
                                <p>
                                    {isSpanish
                                        ? `En ${siteSettings.brand_name} promovemos materiales que ayudan a reducir el mantenimiento, optimizar recursos y disminuir el impacto ambiental frente a alternativas tradicionales.`
                                        : `At ${siteSettings.brand_name}, we promote architectural materials that reduce chemical maintenance, optimize resources, and lower environmental impact compared to traditional stone and timber.`}
                                </p>
                                <p>
                                    {isSpanish
                                        ? "Nuestros productos incorporan procesos responsables, materiales recuperados y opciones reciclables, sin dejar de lado el diseño, la resistencia y la practicidad que exige cada proyecto."
                                        : "Our products incorporate recovered polymers and recyclable formulations while maintaining the structural durability and visual precision demanded by commercial and residential projects."}
                                </p>
                                <p className="text-sky-200 font-medium">
                                    {isSpanish
                                        ? "Fabricamos nuestros productos bajo estándares de calidad y certificación ISO 9001, garantizando procesos más seguros, materiales confiables y resultados consistentes en cada aplicación."
                                        : "Our manufacturing partners operate under ISO 9001 quality management standards, ensuring consistent tolerances, safe formulations, and reliable batch-to-batch performance."}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-5"
                        >
                            <div className="relative h-[360px] sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15">
                                <Image
                                    src="/raster/nosotros/sostenibilidad_calidad.webp"
                                    alt={isSpanish ? "Calidad y sostenibilidad en recubrimientos" : "Quality and sustainability in architectural cladding"}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#132c3f]/80 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                                    <div className="w-12 h-12 rounded-xl bg-sky-400 text-[#132c3f] flex items-center justify-center font-black text-sm shrink-0">
                                        ISO
                                    </div>
                                    <div>
                                        <p className="text-sm font-extrabold text-white">
                                            {isSpanish ? "Certificación ISO 9001" : "ISO 9001 Certified"}
                                        </p>
                                        <p className="text-xs text-slate-200">
                                            {isSpanish ? "Calidad verificada y materiales 100 % reciclables" : "Verified quality & 100% recyclable materials"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= 6. CÓMO TRABAJAMOS CON NUESTROS ALIADOS ================= */}
            <section className="py-20 md:py-28 bg-slate-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12 items-center mb-14">
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="h-[2px] w-10 bg-sky-500" />
                                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-600">
                                    {isSpanish ? "MODELO DE OPERACIÓN" : "OPERATING MODEL"}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-[#132c3f] tracking-tight leading-tight">
                                {isSpanish
                                    ? "Flexibilidad logística y acompañamiento comercial"
                                    : "Logistics Flexibility and Commercial Support"}
                            </h2>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                                {isSpanish
                                    ? `En ${siteSettings.brand_name} acompañamos a distribuidores, comercializadores y aliados estratégicos con modelos de negociación claros, seguros y adaptados a cada operación.`
                                    : `At ${siteSettings.brand_name}, we support distributors, importers, and contractors with transparent international trade terms tailored to each supply chain.`}
                            </p>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="relative h-[240px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200">
                                <Image
                                    src="/raster/nosotros/logistica_aliados.webp"
                                    alt={isSpanish ? "Logística internacional por contenedor" : "International container logistics"}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-[#132c3f]/30" />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* FOB */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white rounded-3xl p-8 md:p-10 shadow-md border border-slate-200/80 hover:border-sky-400 transition-all duration-300"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132c3f] text-white text-xs font-black tracking-wider uppercase mb-5">
                                Incoterm FOB
                            </div>
                            <h3 className="text-2xl font-black text-[#132c3f] mb-3">
                                FOB (Free On Board)
                            </h3>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                                {isSpanish
                                    ? "Gestionamos la mercancía hasta el puerto de embarque, permitiendo que el cliente mantenga el control del flete marítimo y del seguro desde ese punto."
                                    : "We manage production, quality inspection, and port loading at origin, allowing the buyer to control ocean freight and marine insurance through their preferred forwarder."}
                            </p>
                        </motion.div>

                        {/* CIF */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white rounded-3xl p-8 md:p-10 shadow-md border border-slate-200/80 hover:border-sky-400 transition-all duration-300"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500 text-white text-xs font-black tracking-wider uppercase mb-5">
                                Incoterm CIF
                            </div>
                            <h3 className="text-2xl font-black text-[#132c3f] mb-3">
                                CIF (Cost, Insurance and Freight)
                            </h3>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                                {isSpanish
                                    ? "Nos encargamos del costo, seguro y flete hasta el puerto de destino, brindando una solución integral y más simple para el proceso de importación."
                                    : "We coordinate product cost, marine insurance, and ocean freight directly to your destination port in Latin America or the Caribbean for a turnkey import experience."}
                            </p>
                        </motion.div>
                    </div>

                    <div className="mt-10 bg-[#132c3f] text-white rounded-2xl p-6 md:p-8 text-center shadow-lg">
                        <p className="text-base md:text-xl font-bold tracking-wide">
                            {isSpanish
                                ? "Nos adaptamos a cada necesidad logística con transparencia, respaldo y seguimiento en todo el proceso."
                                : "We adapt to your container consolidation needs with full cubic-meter transparency and end-to-end support."}
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= 7. NUESTRA PRESENCIA ================= */}
            <section className="py-20 md:py-24 bg-white border-b border-slate-200/70">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-600 block mb-3">
                        {isSpanish ? "PRESENCIA REGIONAL" : "REGIONAL PRESENCE"}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#132c3f] tracking-tight mb-6">
                        {isSpanish ? "Creciendo junto a nuevos mercados" : "Growing Across the Americas"}
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                        {isSpanish
                            ? "Desde nuestras operaciones y alianzas comerciales hemos llevado soluciones constructivas a clientes en Estados Unidos, Colombia, Venezuela, Ecuador, República Dominicana, El Salvador, Guatemala, Honduras y Perú, construyendo relaciones de largo plazo basadas en confianza y cumplimiento."
                            : "Through our Miami headquarters, Medellín showroom, and regional distribution network, we supply container-load and wholesale architectural materials to the United States, Colombia, Venezuela, Ecuador, Dominican Republic, El Salvador, Guatemala, Honduras, and Peru."}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/nosotros/historia"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#132c3f] hover:bg-sky-600 text-white font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            {isSpanish ? "Conoce nuestra historia" : "Explore Our History"}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/paises"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-[#132c3f] font-bold text-sm uppercase tracking-wider transition-all duration-300"
                        >
                            {isSpanish ? "Ver países que atendemos" : "View Countries Served"}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= 8. NUESTRAS SOLUCIONES (DISTINCT CONTENT - NO DUPLICATION) ================= */}
            <section className="py-20 md:py-28 bg-slate-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-600 block mb-3">
                            {isSpanish ? "LO QUE COMERCIALIZAMOS" : "OUR PRODUCT PORTFOLIO"}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#132c3f] tracking-tight mb-4">
                            {isSpanish ? "Un portafolio versátil para interiores y exteriores" : "A Versatile Portfolio for Interiors and Exteriors"}
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-4">
                            {isSpanish
                                ? "Contamos con líneas diseñadas para transformar muros, techos, pisos, fachadas y cubiertas con acabados modernos y funcionales."
                                : "We offer specialized architectural product lines engineered to transform walls, ceilings, floors, facades, and roofs with modern, functional finishes."}
                        </p>
                        <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">
                            {isSpanish
                                ? "Cada referencia cuenta con especificaciones dimensionales por caja y cubicaje por contenedor de 20 y 40 pies para facilitar la planeación de compras mayoristas y proyectos constructivos."
                                : "Every SKU includes box-level dimensional specifications and 20ft/40ft container loading capacities to streamline wholesale purchasing and project planning."}
                        </p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {materialSolutions.map((item, idx) => (
                            <motion.div key={idx} variants={fadeInUp}>
                                <Link
                                    href={item.href}
                                    className="group h-full bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:border-sky-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                            <h3 className="text-lg font-extrabold text-[#132c3f] group-hover:text-sky-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0" />
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ================= 9. CIERRE COMERCIAL (CTA) ================= */}
            <section className="relative py-20 md:py-28 bg-[#132c3f] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="/raster/nosotros/cta_nosotros.webp"
                        alt={isSpanish ? `Proyectos ${siteSettings.brand_name}` : `${siteSettings.brand_name} Projects`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                        {isSpanish
                            ? "¿Buscas un aliado confiable para tu próximo proyecto o negocio?"
                            : "Looking for a Reliable Supplier for Your Next Project or Container Order?"}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-10">
                        {isSpanish
                            ? "Nuestro equipo está listo para asesorarte y ayudarte a encontrar la solución adecuada según tu mercado, tu obra o tu necesidad comercial."
                            : "Our sales engineering team is ready to advise you on product specifications, container consolidation, and FOB/CIF shipping to your destination port."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#F37B24] hover:bg-[#e06912] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {isSpanish ? "Solicitar asesoría" : "Request Commercial Advisory"}
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <Link
                            href="/colecciones"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#132c3f] hover:bg-slate-100 font-bold text-sm uppercase tracking-wider shadow-md transition-all duration-300"
                        >
                            {isSpanish ? "Ver catálogo de productos" : "Browse Product Catalog"}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
