"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Building2,
    Layers,
    Grid3X3,
    Globe,
    Handshake,
    MapPin,
    Lightbulb,
    Users,
    ArrowRight,
    Compass
} from "lucide-react";
import SeoHead from "components/SeoHead";
import { useLanguage } from "lib/LanguageContext";
import { useBrand } from "lib/BrandContext";

export default function HistoriaPage() {
    const { language } = useLanguage();
    const { activeBrand } = useBrand();
    const isSpanish = language === "es";

    const whatsappLink = activeBrand === "unitec" ? "https://wa.me/573054233147" : "https://wa.me/13054233147";

    const timelineMilestones = [
        {
            year: "2006",
            icon: Building2,
            title: "Los comienzos",
            desc: "Tecnología y operación entre Colombia y EE. UU."
        },
        {
            year: "2016",
            icon: Layers,
            title: "Un nuevo camino",
            desc: "Entramos al mercado de la construcción con perfilería de aluminio."
        },
        {
            year: "2016 – 2018",
            icon: Grid3X3,
            title: "Innovación en PVC",
            desc: "Identificamos una oportunidad: materiales más livianos, versátiles y eficientes."
        },
        {
            year: "2019 – 2020",
            icon: Globe,
            title: "Miramos más allá",
            desc: "Primeras exportaciones. Comienza nuestra expansión internacional."
        },
        {
            year: "2021 – 2023",
            icon: Handshake,
            title: "Crecemos con aliados",
            desc: "Venezuela, El Salvador, Guatemala, Honduras, Ecuador y Perú."
        },
        {
            year: "2024+",
            icon: Compass,
            title: "Presencia internacional",
            desc: "Operación en EE. UU. y expansión hacia nuevos mercados."
        }
    ];

    const presenceLocations = [
        { country: "Colombia", city: "Medellín" },
        { country: "Ecuador", city: "Quito y Guayaquil" },
        { country: "Venezuela", city: "Barquisimeto" },
        { country: "República Dominicana", city: "Santo Domingo" },
        { country: "El Salvador", city: "San Salvador" },
        { country: "Perú", city: "Lima" }
    ];

    return (
        <>
            <SeoHead
                title={isSpanish ? "Historia Unitec | +20 Años Transformando la Construcción" : "Unitec History | +20 Years Transforming Construction"}
                description={isSpanish
                    ? "Conoce la historia de Unitec USA Design: más de dos décadas de innovación, tecnología y soluciones constructivas en PVC y WPC en LATAM y EE. UU."
                    : "Discover the history of Unitec USA Design: over two decades of innovation, technology, and architectural solutions across LATAM and USA."}
                canonical="https://unitecusadesign.com/nosotros/historia"
            />

            <main className="w-full bg-white overflow-hidden">
                
                {/* Secondary Navigation Pill Bar */}
                <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-6 sticky top-[68px] z-20 backdrop-blur-md bg-slate-100/90">
                    <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
                        <Link
                            href="/nosotros"
                            className="px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Sobre Nosotros
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link
                            href="/nosotros/historia"
                            className="px-5 py-1.5 rounded-full text-xs md:text-sm font-bold bg-[#132c3f] text-white shadow-sm"
                        >
                            Nuestra Historia
                        </Link>
                    </div>
                </div>

                {/* ================= 1. HERO SECTION ================= */}
                <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center bg-slate-950 text-white overflow-hidden">
                    {/* Background Architectural Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/raster/historia_hero.webp"
                            alt="Arquitectura moderna y transformación constructiva"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                        {/* High-contrast gradient overlay to match reference */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30 md:to-transparent" />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                        {/* Left Main Content */}
                        <div className="max-w-2xl">
                            <div>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl md:text-7xl font-black text-sky-400 tracking-tight">
                                        +20
                                    </span>
                                    <span className="text-3xl md:text-5xl font-black text-white tracking-tight">
                                        años
                                    </span>
                                </div>
                                <div className="w-14 h-1.5 bg-sky-400 rounded-full mb-4" />
                                
                                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white uppercase drop-shadow-md">
                                    transformando el sector<br />
                                    de la construcción.
                                </h1>

                                <p className="mt-6 text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-lg drop-shadow">
                                    Productos que duran, renuevan y mejoran cualquier espacio.
                                </p>
                            </div>
                        </div>

                        {/* Right Accent Slogan */}
                        <div className="self-end md:self-center text-right border-r-2 border-sky-400 pr-5 py-2">
                            <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.22em] text-white uppercase leading-relaxed">
                                ESPACIOS<br />
                                QUE INSPIRAN<br />
                                UN MEJOR<br />
                                FUTURO
                            </p>
                        </div>
                    </div>
                </section>


                {/* ================= 2. HISTORIA UNITEC & TIMELINE ================= */}
                <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
                    
                    {/* Header: NUESTRA Historia Unitec */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 pb-16 border-b border-gray-100">
                        <div>
                            <span className="text-sky-500 font-extrabold text-xs md:text-sm tracking-[0.25em] uppercase block mb-1">
                                NUESTRA
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#132c3f] tracking-tight">
                                Historia Unitec
                            </h2>
                        </div>

                        {/* Middle Vertical Separator */}
                        <div className="hidden md:block w-[2px] h-16 bg-gray-200 self-center" />

                        {/* Description */}
                        <p className="max-w-2xl text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                            De la tecnología a las soluciones constructivas en PVC y WPC. Un camino de innovación, crecimiento y nuevas oportunidades que nos ha llevado a más personas y más países.
                        </p>
                    </div>

                    {/* Timeline Graphic */}
                    <div className="pt-16 pb-16">
                        {/* Desktop Horizontal Connected Timeline */}
                        <div className="relative">
                            {/* The Connecting Line (Desktop) */}
                            <div className="hidden lg:block absolute top-[80px] left-[5%] right-[5%] h-[2px] bg-sky-200 z-0" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
                                {timelineMilestones.map((item, index) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center text-center group"
                                        >
                                            {/* Top Line-Art Icon */}
                                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#132c3f] group-hover:border-sky-400 group-hover:text-sky-500 group-hover:shadow-md transition-all duration-300 mb-3">
                                                <IconComponent className="w-7 h-7 stroke-[1.5]" />
                                            </div>

                                            {/* Node Circle */}
                                            <div className="relative z-10 w-4 h-4 rounded-full bg-white border-4 border-sky-400 mb-3 shadow-xs" />

                                            {/* Year */}
                                            <span className="text-lg md:text-xl font-black text-sky-500 mb-1">
                                                {item.year}
                                            </span>

                                            {/* Milestone Title */}
                                            <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2 leading-tight">
                                                {item.title}
                                            </h3>

                                            {/* Milestone Description */}
                                            <p className="text-xs md:text-sm text-slate-500 leading-snug">
                                                {item.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 3 Core Value Pills Card */}
                    <div className="mt-8 bg-slate-50/90 border border-slate-200 rounded-2xl md:rounded-full py-5 px-8 max-w-5xl mx-auto shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                            {/* Pill 1 */}
                            <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:px-6">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 shadow-xs">
                                    <Lightbulb className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-800 text-sm md:text-base">
                                    Innovación
                                </span>
                            </div>

                            {/* Pill 2 */}
                            <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:px-6">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 shadow-xs">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-800 text-sm md:text-base">
                                    Logística internacional
                                </span>
                            </div>

                            {/* Pill 3 */}
                            <div className="flex items-center justify-center gap-3 py-2 md:py-0 md:px-6">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sky-500 shadow-xs">
                                    <Users className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-slate-800 text-sm md:text-base">
                                    Calidad y acompañamiento
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Closing Section Statement */}
                    <div className="mt-14 text-center">
                        <div className="w-12 h-1 bg-sky-400 mx-auto rounded-full mb-4" />
                        <p className="text-base sm:text-lg md:text-xl font-bold text-slate-800 max-w-3xl mx-auto leading-relaxed">
                            Hoy conectamos innovación, diseño y logística{" "}
                            <span className="text-sky-600 font-extrabold">
                                para hacer la construcción más eficiente.
                            </span>
                        </p>
                    </div>

                </section>


                {/* ================= 3. MID BANNER: MÁS DE DOS DÉCADAS ================= */}
                <section className="relative py-20 md:py-24 bg-[#132c3f] text-white overflow-hidden">
                    {/* Background Overlay Texture */}
                    <div 
                        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: "url('/raster/historia_decadas_bg.webp')" }}
                    />
                    
                    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                        <span className="text-sky-300 font-bold text-xs md:text-sm uppercase tracking-[0.28em] block mb-2">
                            DE LA TECNOLOGÍA A LA CONSTRUCCIÓN
                        </span>
                        
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                            Más de dos décadas
                        </h2>
                        
                        <p className="mt-3 text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto">
                            al servicio de la innovación y el desarrollo constructivo.
                        </p>

                        <div className="w-16 h-1 bg-sky-400 mx-auto mt-6 rounded-full" />
                    </div>
                </section>


                {/* ================= 4. NUESTRA PRESENCIA (MAP & COUNTRIES) ================= */}
                <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Left Column: Countries & Details */}
                        <div className="lg:col-span-6">
                            <span className="text-sky-500 font-extrabold text-xs md:text-sm tracking-[0.25em] uppercase block mb-1">
                                NUESTRA PRESENCIA
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#132c3f] tracking-tight leading-tight mb-4">
                                En más países,<br />
                                más posibilidades
                            </h2>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                                Llevamos nuestras soluciones a nuevos mercados y seguimos construyendo relaciones de largo plazo.
                            </p>

                            {/* 2-Column Grid of Locations */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
                                {presenceLocations.map((loc, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 mt-0.5 shrink-0">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                                                {loc.country}
                                            </p>
                                            <p className="text-xs md:text-sm text-slate-500">
                                                {loc.city}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Secondary Countries Divider */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <span className="text-sky-600 font-extrabold text-xs uppercase tracking-wider block mb-1.5">
                                    Y TAMBIÉN EN
                                </span>
                                <p className="font-bold text-slate-800 text-sm md:text-base">
                                    Estados Unidos &bull; Guatemala &bull; Honduras
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Americas Map Graphic */}
                        <div className="lg:col-span-6 flex justify-center items-center">
                            <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] flex items-center justify-center">
                                <Image
                                    src="/raster/historia_mapa.png"
                                    alt="Presencia internacional de Unitec en el continente americano"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* ================= 5. SHOWROOM CTA BANNER ================= */}
                <section className="bg-[#132c3f] text-white">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
                        
                        {/* Left Column: Showroom Info */}
                        <div className="lg:col-span-6 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                No te quedes sin ver<br />
                                nuestros productos.
                            </h2>
                            <div className="w-14 h-1 bg-sky-400 rounded-full my-6" />

                            <p className="text-lg md:text-xl font-semibold text-white/95 mb-6">
                                Visita nuestro showroom:
                            </p>

                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sky-400 shrink-0 mt-1 shadow-inner">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-base sm:text-lg font-bold text-white">
                                        Carrera 42, Auto. S #75-83
                                    </p>
                                    <p className="text-sky-300 text-sm sm:text-base font-medium">
                                        C.C. IDEO Local 274, Itagüí, Medellín
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#F37B24] hover:bg-[#d96616] text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02]"
                                >
                                    <span>Agendar Asesoría en Showroom</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>

                                <Link
                                    href="/colecciones"
                                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-full border border-white/20 transition-all duration-300"
                                >
                                    <span>Explorar Catálogo</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Showroom Photo */}
                        <div className="lg:col-span-6 relative h-[360px] lg:h-auto min-h-[360px]">
                            <Image
                                src="/raster/historia_showroom.webp"
                                alt="Showroom Unitec USA Design en Medellín IDEO"
                                fill
                                className="object-cover object-center"
                            />
                            {/* Subtle dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#132c3f] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}
