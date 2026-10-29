"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";
import siteSettings, { getWhatsAppUrl } from "lib/siteSettings";

export default function HistoriaPage() {
    const { language } = useLanguage();
    const isSpanish = language === "es";

    const whatsappLink = getWhatsAppUrl();

    const timelineMilestones = isSpanish
        ? [
            {
                year: "2006",
                icon: "/raster/icons/historia_icon_01.webp",
                title: "Los comienzos",
                desc: "Tecnología y operación entre Colombia y EE. UU."
            },
            {
                year: "2016",
                icon: "/raster/icons/historia_icon_02.webp",
                title: "Un nuevo camino",
                desc: "Entramos al mercado de la construcción con perfilería de aluminio."
            },
            {
                year: "2016 – 2018",
                icon: "/raster/icons/historia_icon_03.webp",
                title: "Innovación en PVC",
                desc: "Identificamos una oportunidad: materiales más livianos, versátiles y eficientes."
            },
            {
                year: "2019 – 2020",
                icon: "/raster/icons/historia_icon_04.webp",
                title: "Miramos más allá",
                desc: "Primeras exportaciones. Comienza nuestra expansión internacional."
            },
            {
                year: "2021 – 2023",
                icon: "/raster/icons/historia_icon_05.webp",
                title: "Crecemos con aliados",
                desc: "Venezuela, El Salvador, Guatemala, Honduras, Ecuador y Perú."
            },
            {
                year: "2024+",
                icon: "/raster/icons/historia_icon_06.webp",
                title: "Presencia internacional",
                desc: "Operación en EE. UU. y expansión hacia nuevos mercados."
            }
        ]
        : [
            {
                year: "2006",
                icon: "/raster/icons/historia_icon_01.webp",
                title: "The Beginnings",
                desc: "Technology and commercial operations connecting Colombia and the US."
            },
            {
                year: "2016",
                icon: "/raster/icons/historia_icon_02.webp",
                title: "A New Path",
                desc: "Entered the construction sector supplying architectural aluminum profiles."
            },
            {
                year: "2016 – 2018",
                icon: "/raster/icons/historia_icon_03.webp",
                title: "PVC Innovation",
                desc: "Expanded into lightweight, versatile, and water-resistant PVC building materials."
            },
            {
                year: "2019 – 2020",
                icon: "/raster/icons/historia_icon_04.webp",
                title: "Looking Beyond",
                desc: "First international container exports, launching our regional expansion."
            },
            {
                year: "2021 – 2023",
                icon: "/raster/icons/historia_icon_05.webp",
                title: "Growing with Partners",
                desc: "Expanded distribution across Venezuela, El Salvador, Guatemala, Honduras, Ecuador, and Peru."
            },
            {
                year: "2024+",
                icon: "/raster/icons/historia_icon_06.webp",
                title: "International Presence",
                desc: "Consolidated US operations in Doral, Miami and expanded across the Americas."
            }
        ];

    const identityPillars = isSpanish
        ? [
            { title: "Innovación", icon: "/raster/icons/identidad_icon_01.webp" },
            { title: "Logística internacional", icon: "/raster/icons/identidad_icon_02.webp" },
            { title: "Calidad y acompañamiento", icon: "/raster/icons/identidad_icon_03.webp" }
        ]
        : [
            { title: "Innovation", icon: "/raster/icons/identidad_icon_01.webp" },
            { title: "International Logistics", icon: "/raster/icons/identidad_icon_02.webp" },
            { title: "Quality & Support", icon: "/raster/icons/identidad_icon_03.webp" }
        ];

    const presenceLocations = isSpanish
        ? [
            { country: "Estados Unidos", city: "Doral - Miami" },
            { country: "Colombia", city: "Medellín" },
            { country: "Venezuela", city: "Barquisimeto" },
            { country: "Ecuador", city: "Quito y Guayaquil" },
            { country: "República Dominicana", city: "Santo Domingo" },
            { country: "El Salvador", city: "San Salvador" },
            { country: "Perú", city: "Lima" }
        ]
        : [
            { country: "United States", city: "Doral - Miami" },
            { country: "Colombia", city: "Medellín" },
            { country: "Venezuela", city: "Barquisimeto" },
            { country: "Ecuador", city: "Quito & Guayaquil" },
            { country: "Dominican Republic", city: "Santo Domingo" },
            { country: "El Salvador", city: "San Salvador" },
            { country: "Peru", city: "Lima" }
        ];

    return (
        <main className="w-full bg-white overflow-hidden">
            {/* Secondary Navigation Pill Bar */}
            <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-6 sticky top-[68px] z-20 backdrop-blur-md bg-slate-100/90">
                <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
                    <Link
                        href="/nosotros"
                        className="px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        {isSpanish ? "Sobre Nosotros" : "About Us"}
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                        href="/nosotros/historia"
                        className="px-5 py-1.5 rounded-full text-xs md:text-sm font-bold bg-[#132c3f] text-white shadow-sm"
                    >
                        {isSpanish ? "Nuestra Historia" : "Our History"}
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
            <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center bg-slate-950 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/raster/historia_hero.webp"
                        alt={isSpanish ? "Arquitectura moderna y transformación constructiva" : "Modern architecture and construction transformation"}
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                    <div className="max-w-2xl">
                        <div>
                            <div className="flex items-baseline gap-3 mb-3">
                                <span className="text-6xl sm:text-7xl md:text-8xl font-black text-sky-400 tracking-tight leading-none">
                                    +20
                                </span>
                                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                                    {isSpanish ? "años" : "years"}
                                </span>
                            </div>
                            <div className="w-16 h-1.5 bg-sky-400 rounded-full mb-6" />

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.12] text-white uppercase drop-shadow-md">
                                {isSpanish ? (
                                    <>
                                        <span className="whitespace-nowrap">Transformando el</span><br />
                                        <span className="whitespace-nowrap">sector de la</span><br />
                                        <span className="whitespace-nowrap">construcción.</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="whitespace-nowrap">Transforming the</span><br />
                                        <span className="whitespace-nowrap">construction</span><br />
                                        <span className="whitespace-nowrap">industry.</span>
                                    </>
                                )}
                            </h1>

                            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-lg drop-shadow">
                                {isSpanish
                                    ? "Productos que duran, renuevan y mejoran cualquier espacio."
                                    : "Architectural materials that endure, renovate, and elevate every space."}
                            </p>
                        </div>
                    </div>

                    <div className="self-end md:self-center text-right border-r-2 border-sky-400 pr-5 py-2">
                        <p className="text-xs sm:text-sm md:text-base font-bold tracking-[0.22em] text-white uppercase leading-relaxed">
                            {isSpanish ? (
                                <>ESPACIOS<br />QUE INSPIRAN<br />UN MEJOR<br />FUTURO</>
                            ) : (
                                <>SPACES<br />THAT INSPIRE<br />A BETTER<br />FUTURE</>
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= 2. HISTORIA UNITEC & TIMELINE ================= */}
            <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex-1 max-w-xs h-[1px] bg-gray-300" />
                    <h2 className="text-2xl md:text-3xl font-black text-[#132c3f] tracking-wider uppercase text-center shrink-0">
                        {isSpanish ? `HISTORIA ${siteSettings.brand_name}` : `${siteSettings.brand_name} HISTORY`}
                    </h2>
                    <div className="flex-1 max-w-xs h-[1px] bg-gray-300" />
                </div>

                <p className="text-center max-w-3xl mx-auto text-slate-600 text-base md:text-lg leading-relaxed font-normal mb-16">
                    {isSpanish
                        ? "De la tecnología a las soluciones constructivas en PVC y WPC. Un camino de innovación, crecimiento y nuevas oportunidades que nos ha llevado a más personas y más países."
                        : "From technology operations to wholesale PVC, WPC, and SPC architectural materials—a trajectory of product innovation and container logistics across the Americas."}
                </p>

                <div className="pt-8 pb-16">
                    <div className="relative">
                        <div className="hidden lg:block absolute top-[85px] left-[6%] right-[6%] h-[2px] bg-sky-200 z-0" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
                            {timelineMilestones.map((item, index) => (
                                <div
                                    key={index}
                                    className="group cursor-pointer flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 ease-out transform hover:scale-110 hover:z-30 hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-100"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center p-2.5 group-hover:border-sky-400 group-hover:shadow-md group-hover:scale-105 transition-all duration-300 mb-3">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={item.icon}
                                                alt={item.title}
                                                fill
                                                sizes="64px"
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative z-10 w-4 h-4 rounded-full bg-white border-4 border-sky-400 mb-3 shadow-xs group-hover:bg-sky-500 group-hover:border-sky-200 transition-colors" />

                                    <span className="text-lg md:text-xl font-black text-sky-500 mb-1 group-hover:text-sky-600 transition-colors">
                                        {item.year}
                                    </span>

                                    <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2 leading-tight group-hover:text-slate-950 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-xs md:text-sm text-slate-500 leading-snug group-hover:text-slate-700 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-slate-50/90 border border-slate-200 rounded-2xl md:rounded-full py-5 px-8 max-w-5xl mx-auto shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {identityPillars.map((pillar, pIdx) => (
                            <div key={pIdx} className="flex items-center justify-center gap-3 py-2 md:py-0 md:px-6 group">
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center p-2 shadow-xs group-hover:scale-110 transition-transform">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={pillar.icon}
                                            alt={pillar.title}
                                            fill
                                            sizes="48px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-sky-600 transition-colors">
                                    {pillar.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="w-16 h-1 bg-sky-400 mx-auto rounded-full mb-6" />
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#132c3f] max-w-4xl mx-auto leading-relaxed tracking-tight">
                        {isSpanish ? "Hoy conectamos innovación, diseño y logística " : "Today we connect innovation, design, and logistics "}
                        <span className="text-sky-500 font-black">
                            {isSpanish ? "para hacer la construcción más eficiente." : "to make construction more efficient."}
                        </span>
                    </p>
                </div>
            </section>

            {/* ================= 3. MID BANNER: MÁS DE DOS DÉCADAS ================= */}
            <section className="relative py-24 md:py-32 bg-[#132c3f] text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/raster/historia_decadas_bg.webp"
                        alt={isSpanish ? "Innovación y desarrollo constructivo" : "Construction innovation and development"}
                        fill
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[#132c3f]/50" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <span className="text-sky-300 font-bold text-xs md:text-sm uppercase tracking-[0.28em] block mb-2">
                        {isSpanish ? "DE LA TECNOLOGÍA A LA CONSTRUCCIÓN" : "FROM TECHNOLOGY TO CONSTRUCTION"}
                    </span>

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                        {isSpanish ? "Más de dos décadas" : "Over Two Decades"}
                    </h2>

                    <p className="mt-4 text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto">
                        {isSpanish
                            ? "al servicio de la innovación y el desarrollo constructivo."
                            : "at the service of architectural innovation and building development."}
                    </p>

                    <div className="w-20 h-1 bg-sky-400 mx-auto mt-6 rounded-full" />
                </div>
            </section>

            {/* ================= 4. NUESTRA PRESENCIA (MAP & COUNTRIES) ================= */}
            <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    <div className="lg:col-span-5">
                        <span className="text-sky-500 font-extrabold text-xs md:text-sm tracking-[0.25em] uppercase block mb-1">
                            {isSpanish ? "NUESTRA PRESENCIA" : "OUR PRESENCE"}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#132c3f] tracking-tight leading-tight mb-4">
                            {isSpanish ? (
                                <>En más países,<br />más posibilidades</>
                            ) : (
                                <>More countries,<br />more possibilities</>
                            )}
                        </h2>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                            {isSpanish
                                ? "Llevamos nuestras soluciones a nuevos mercados y seguimos construyendo relaciones de largo plazo."
                                : "We deliver container-load architectural materials to markets across the Americas and build long-term distribution partnerships."}
                        </p>

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

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <span className="text-sky-600 font-extrabold text-xs uppercase tracking-wider block mb-1.5">
                                {isSpanish ? "Y TAMBIÉN EN" : "AND ALSO IN"}
                            </span>
                            <p className="font-bold text-slate-800 text-sm md:text-base">
                                Guatemala &bull; Honduras
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex justify-center items-center">
                        <div className="w-full flex items-center justify-center p-2">
                            <Image
                                src="/raster/historia_mapa.png"
                                alt={isSpanish
                                    ? `Presencia internacional de ${siteSettings.brand_name} en el continente americano`
                                    : `International presence of ${siteSettings.brand_name} across the Americas`}
                                width={2157}
                                height={1802}
                                className="w-full h-auto max-w-3xl xl:max-w-[880px] 2xl:max-w-[980px] object-contain drop-shadow-md hover:drop-shadow-lg transition-all duration-300"
                                unoptimized
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= 5. SHOWROOM BANNER (Single Source of Truth) ================= */}
            <section className="relative min-h-[420px] md:min-h-[480px] flex items-center bg-[#132c3f] text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/raster/historia_showroom.webp"
                        alt={isSpanish
                            ? `Showroom ${siteSettings.brand_name} en Medellín IDEO`
                            : `${siteSettings.brand_name} Showroom in Medellín IDEO`}
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#132c3f]/90 via-[#132c3f]/60 to-transparent lg:w-1/2" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16">
                    <div className="max-w-xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                            {isSpanish ? (
                                <>No te quedes sin ver<br />nuestros productos.</>
                            ) : (
                                <>Experience our<br />products in person.</>
                            )}
                        </h2>
                        <div className="w-14 h-1 bg-sky-400 rounded-full my-6" />

                        <p className="text-lg md:text-xl font-semibold text-white/95 mb-6">
                            {isSpanish ? "Visita nuestro showroom:" : "Visit our showroom:"}
                        </p>

                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sky-400 shrink-0 mt-1 shadow-inner">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-base sm:text-lg font-bold text-white">
                                    {siteSettings.medellin_showroom_address}
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
                                <span>{isSpanish ? "Agendar Asesoría en Showroom" : "Schedule a Showroom Visit"}</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>

                            <Link
                                href="/colecciones"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-full border border-white/20 transition-all duration-300"
                            >
                                <span>{isSpanish ? "Explorar Catálogo" : "Explore Catalog"}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
