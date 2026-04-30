"use client";

import { motion } from "framer-motion"
import {
    Boxes,
    Truck,
    Ruler,
    Layers,
    ShieldCheck,
    Globe,
    Users,
    Target,
    ArrowRight,
    Droplets,
    ToolCase,
    Flame,
    Leaf,
    Zap,
    Home,
    Grid,
    Layout,
    Volume2,
    Palette,
} from "lucide-react"
import Stylish_H2 from "My_UI/stylish_h2"
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';

import SeoHead from "components/SeoHead"

export default function AboutPage() {
    const { t, getCompanyText, language } = useLanguage();
    const { activeBrand } = useBrand();
    const isSpanish = language === 'es';
    
    const companyKey = activeBrand === 'unitec' ? 'unitec' : 'binw';
    const aboutHeroTitle = getCompanyText(companyKey, 'aboutHero.title');
    const aboutHeroSubtitle = getCompanyText(companyKey, 'aboutHero.subtitle');
    const aboutHeroDescription = getCompanyText(companyKey, 'aboutHero.description');

    return (
        <>
            <SeoHead 
                title={`About Us | Unitec USA Design`} 
                description={isSpanish 
                    ? "Conoce más sobre nuestra visión, misión y el equipo experto de Unitec USA Design." 
                    : "Learn more about our vision, mission, and the expert team at Unitec USA Design."}
                canonical="https://unitecusadesign.com/about"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Import with Unitec's Container Configurator",
                        "description": "Our specialized 3-step logistical workflow for bulk architectural material export.",
                        "step": [
                            {
                                "@type": "HowToStep",
                                "name": isSpanish ? "Crear Contenedor" : "Create Container",
                                "text": isSpanish ? "Seleccione el tamaño del contenedor para definir su capacidad de envío." : "Select container size to define your shipping capacity."
                            },
                            {
                                "@type": "HowToStep",
                                "name": isSpanish ? "Agregar Productos" : "Add Products",
                                "text": isSpanish ? "Agregue materiales y vea el peso volumétrico en tiempo real." : "Add materials and see real-time volumetric weight."
                            },
                            {
                                "@type": "HowToStep",
                                "name": isSpanish ? "Optimizar y Enviar" : "Optimize and Ship",
                                "text": isSpanish ? "Alcance la capacidad máxima para eficiencia de costos y solicite su cotización." : "Reach maximum capacity for cost efficiency and request your quote."
                            }
                        ]
                    })
                }}
            />
            <main className="w-full">
            {/* ================= HERO ================= */}
            <section className="relative py-24 text-white overflow-hidden min-h-[50vh] flex items-center">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    poster="/raster/containers.webp"
                >
                    <source src="/videos/institutional-hero.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/65 z-10" />

                <div className="mx-auto max-w-6xl px-4 relative z-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl text-3xl font-bold leading-tight md:text-4xl"
                    >
                        {aboutHeroTitle}
                        <span className="text-gray-300"> {aboutHeroSubtitle}</span>
                    </motion.h1>

                    <p className="mt-5 max-w-3xl text-sm text-gray-300">
                        {aboutHeroDescription}
                    </p>
                </div>
            </section>



            {/* ================= STORY ================= */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-4 grid gap-12 lg:grid-cols-2">
                    <div>
                        <Stylish_H2 h2={t('about.story.title')} />

                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            {t('about.story.p1')}
                        </p>

                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            {t('about.story.p2')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Stat icon={Boxes} label={t('about.story.stats.bulk')} />
                        <Stat icon={Ruler} label={t('about.story.stats.dimension')} />
                        <Stat icon={Truck} label={t('about.story.stats.logistics')} />
                        <Stat icon={ShieldCheck} label={t('about.story.stats.safe')} />
                    </div>
                </div>
            </section>


            {/* ================= MISSION & VISION ================= */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-4 grid gap-12 lg:grid-cols-2">

                    {/* MISSION */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Stylish_H2 h2={t('about.mission.title')} />

                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            {t('about.mission.p1')}
                        </p>

                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            {t('about.mission.p2')}
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            {t('about.mission.items') && Array.isArray(t('about.mission.items')) ? t('about.mission.items').map((item, idx) => (
                                <ListItem key={idx} text={item} />
                            )) : null}
                        </ul>
                    </motion.div>

                    {/* VISION */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border bg-white p-6 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold">{t('about.vision.title')}</h3>

                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            {t('about.vision.p1')}
                        </p>

                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            {t('about.vision.p2')}
                        </p>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <Stat icon={Globe} label={t('about.vision.stats.reach')} />
                            <Stat icon={ShieldCheck} label={t('about.vision.stats.sustainable')} />
                            <Stat icon={Target} label={t('about.vision.stats.design')} />
                            <Stat icon={Users} label={t('about.vision.stats.professionals')} />
                        </div>
                    </motion.div>

                </div>
            </section>


            {/* ================= HOW IT WORKS ================= */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <Stylish_H2 h2={t('about.howItWorks.title')} />

                    <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-600">
                        {t('about.howItWorks.subtitle')}
                    </p>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <Step
                            icon={Layers}
                            title={t('about.howItWorks.steps.create.title')}
                            text={t('about.howItWorks.steps.create.desc')}
                        />
                        <Step
                            icon={Boxes}
                            title={t('about.howItWorks.steps.fill.title')}
                            text={t('about.howItWorks.steps.fill.desc')}
                        />
                        <Step
                            icon={Truck}
                            title={t('about.howItWorks.steps.ship.title')}
                            text={t('about.howItWorks.steps.ship.desc')}
                        />
                    </div>
                </div>
            </section>

            {/* ================= WHY CHOOSE UNITEC ================= */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <Stylish_H2 h2={t('about.whyChoose.title')} />

                    <p className="mt-4 max-w-2xl text-sm text-gray-600">
                        {t('about.whyChoose.description')}
                    </p>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <Feature icon={ShieldCheck} title={t('about.whyChoose.features.warranty.title')} text={t('about.whyChoose.features.warranty.desc')} />
                        <Feature icon={Droplets} title={t('about.whyChoose.features.waterproof.title')} text={t('about.whyChoose.features.waterproof.desc')} />
                        <Feature icon={ToolCase} title={t('about.whyChoose.features.maintenance.title')} text={t('about.whyChoose.features.maintenance.desc')} />
                        <Feature icon={Flame} title={t('about.whyChoose.features.fire.title')} text={t('about.whyChoose.features.fire.desc')} />
                        <Feature icon={Leaf} title={t('about.whyChoose.features.eco.title')} text={t('about.whyChoose.features.eco.desc')} />
                        <Feature icon={Zap} title={t('about.whyChoose.features.install.title')} text={t('about.whyChoose.features.install.desc')} />
                    </div>
                </div>
            </section>

            {/* ================= PRODUCT RANGE ================= */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <Stylish_H2 h2={t('about.productRange.title')} />

                    <p className="mt-4 max-w-2xl text-sm text-gray-600">
                        {t('about.productRange.description')}
                    </p>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Stat icon={Layers} label={t('about.productRange.categories.walls')} />
                        <Stat icon={Home} label={t('about.productRange.categories.ceilings')} />
                        <Stat icon={Grid} label={t('about.productRange.categories.flooring')} />
                        <Stat icon={Layout} label={t('about.productRange.categories.facades')} />
                        <Stat icon={Volume2} label={t('about.productRange.categories.acoustic')} />
                        <Stat icon={Palette} label={t('about.productRange.categories.decorative')} />
                    </div>
                </div>
            </section>

            {/* ================= TRUST ================= */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-4 grid gap-12 lg:grid-cols-2">
                    <div>
                        <Stylish_H2 h2={t('about.trust.title')} />

                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            {t('about.trust.description')}
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            {t('about.trust.partners') && Array.isArray(t('about.trust.partners')) ? t('about.trust.partners').map((item, idx) => (
                                <ListItem key={idx} text={item} />
                            )) : null}
                        </ul>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold">
                            {t('about.trust.different.title')}
                        </h3>

                        <div className="mt-4 space-y-4">
                            <Difference
                                icon={Target}
                                title={t('about.trust.different.items.container.title')}
                                text={t('about.trust.different.items.container.desc')}
                            />
                            <Difference
                                icon={Globe}
                                title={t('about.trust.different.items.global.title')}
                                text={t('about.trust.different.items.global.desc')}
                            />
                            <Difference
                                icon={Users}
                                title={t('about.trust.different.items.b2b.title')}
                                text={t('about.trust.different.items.b2b.desc')}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SUSTAINABILITY & QUALITY ================= */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-4 grid gap-12 lg:grid-cols-2">

                    <div>
                        <Stylish_H2 h2={t('about.sustainability.title')} />
                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            {t('about.sustainability.items') && Array.isArray(t('about.sustainability.items')) ? t('about.sustainability.items').map((item, idx) => (
                                <ListItem key={idx} text={item} />
                            )) : null}
                        </ul>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold">{t('about.sustainability.quality.title')}</h3>

                        <ul className="mt-4 space-y-3 text-sm text-gray-700">
                            {t('about.sustainability.quality.items') && Array.isArray(t('about.sustainability.quality.items')) ? t('about.sustainability.quality.items').map((item, idx) => (
                                <ListItem key={idx} text={item} />
                            )) : null}
                        </ul>
                    </div>

                </div>
            </section>

            {/* ================= INNOVATION & CUSTOMER SUCCESS ================= */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-4 grid gap-12 lg:grid-cols-2">

                    <div>
                        <Stylish_H2 h2={t('about.innovation.title')} />
                        <p className="mt-4 text-sm text-gray-600">
                            {t('about.innovation.description')}
                        </p>

                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            {t('about.innovation.items') && Array.isArray(t('about.innovation.items')) ? t('about.innovation.items').map((item, idx) => (
                                <ListItem key={idx} text={item} />
                            )) : null}
                        </ul>
                    </div>

                </div>
            </section>


            {/* ================= CTA ================= */}
            <section className="bg-black py-20 text-white">
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h2 className="text-2xl font-semibold">
                        {t('about.cta.title')}
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm text-gray-300">
                        {t('about.cta.description')}
                    </p>

                    <a
                        href="/contact"
                        className="mx-auto mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                    >
                        {t('about.cta.button')}
                        <ArrowRight size={16} />
                    </a>
                </div>
            </section>
        </main>
        </>
    )
}

/* ================= COMPONENTS ================= */

function Stat({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border p-4">
            <Icon size={20} />
            <span className="text-sm font-medium">{label}</span>
        </div>
    )
}

function Step({ icon: Icon, title, text }) {
    return (
        <div className="rounded-2xl border bg-white p-6 text-center">
            <Icon className="mx-auto mb-3" size={24} />
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{text}</p>
        </div>
    )
}

function Difference({ icon: Icon, title, text }) {
    return (
        <div className="flex gap-3">
            <Icon size={18} />
            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-gray-600">{text}</p>
            </div>
        </div>
    )
}

function ListItem({ text }) {
    return (
        <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            {text}
        </li>
    )
}
function Feature({ icon: Icon, title, text }) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <Icon size={22} className="mb-3" />
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {text}
            </p>
        </div>
    )
}
function IconStat({ icon: Icon, label, subtext }) {
    return (
        <div className="flex items-start gap-3 rounded-xl border p-4">
            <Icon size={20} />
            <div>
                <p className="text-sm font-medium">{label}</p>
                {subtext && (
                    <p className="text-xs text-gray-600">{subtext}</p>
                )}
            </div>
        </div>
    )
}
