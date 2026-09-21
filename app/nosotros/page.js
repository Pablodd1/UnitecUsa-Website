"use client";

import Link from "next/link";
import { motion } from "framer-motion"
import {
    Boxes,
    Ruler,
    Truck,
    ShieldCheck,
    Globe,
    Users,
    Target,
    ArrowRight,
    Droplets,
    Flame,
    Leaf,
    Zap,
    Handshake,
    Award,
    BookOpen,
    ClipboardCheck,
    Layers,
    Home,
    Grid,
    Layout,
    Volume2,
    Palette
} from "lucide-react"
import MyButton from "My_UI/btn/main"
import SeoHead from "components/SeoHead"
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';

export default function AboutPage() {
    const { language } = useLanguage();
    const { activeBrand } = useBrand();
    const isSpanish = language === 'es';

    const whatsappLink = activeBrand === 'unitec' ? "https://wa.me/573054233147" : "https://wa.me/13054233147";

    return (
        <>
            <SeoHead 
                title={isSpanish ? "Sobre Nosotros | Unitec USA Design" : "About Us | Unitec USA Design"} 
                description={isSpanish 
                    ? "Conozca más sobre la operación de Unitec USA Design en Latinoamérica y nuestras alternativas constructivas." 
                    : "Learn more about Unitec USA Design operations in Latam and our architectural alternatives."}
                canonical="https://unitecusadesign.com/nosotros"
            />
            
            <main className="w-full bg-white overflow-hidden">
                
                {/* Secondary Navigation Pill Bar */}
                <div className="bg-slate-100 border-b border-slate-200 py-2 px-6">
                    <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
                        <Link
                            href="/nosotros"
                            className="px-4 py-1.5 rounded-full text-xs md:text-sm font-bold bg-[#132c3f] text-white shadow-sm"
                        >
                            Sobre Nosotros
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link
                            href="/nosotros/historia"
                            className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Nuestra Historia
                        </Link>
                    </div>
                </div>

                {/* ================= SECTION 1: HERO ================= */}
                <section className="relative py-28 text-white min-h-[60vh] flex items-center justify-center">
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
                    
                    <div className="absolute inset-0 bg-black/65 z-10" />

                    <div className="mx-auto max-w-4xl px-6 relative z-20 text-center flex flex-col items-center gap-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl md:text-5xl font-black leading-tight uppercase tracking-wide drop-shadow-md"
                        >
                            Una marca que hace evolucionar al sector de la construcción en LATAM
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-4"
                        >
                            <span className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 inline-block select-none">
                                Creatividad, diseño y transformación real
                            </span>
                        </motion.div>
                    </div>
                </section>


                {/* ================= SECTION 2: POR QUÉ EXISTIMOS ================= */}
                <section id="existimos" className="py-24 max-w-6xl mx-auto px-6 md:px-8">
                    {/* Centered Separator Header */}
                    <div className="flex items-center justify-center gap-4 mb-16">
                        <div className="flex-1 h-[1px] bg-gray-300" />
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase text-center shrink-0">
                            POR QUÉ EXISTIMOS
                        </h2>
                        <div className="flex-1 h-[1px] bg-gray-300" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                        {/* Left Side (H3 Paragraphs with proportional vertical distribution) */}
                        <div className="lg:col-span-5 flex flex-col justify-between py-1 text-gray-700">
                            <p className="text-base leading-relaxed text-slate-900 font-semibold">
                                Unitec USA Design es la empresa responsable de la operación internacional de Building Innovation en Latinoamérica. Una compañía de materiales arquitectónicos en PVC y WPC con sede principal en Doral (Miami) y showroom en Medellín, que abastece, asesora y acompaña a distribuidores, constructores y arquitectos en la implementación de nuevas técnicas constructivas, eficientes y sofisticadas.
                            </p>
                            <p className="text-[14px] leading-relaxed text-gray-500 font-normal mt-10 md:mt-16">
                                Con más de 20 años de trayectoria en el mercado y presencia en más de 5 países del continente, Unitec se ha consolidado como una organización promotora de nuevas alternativas constructivas en el mercado, ofreciendo un portafolio integrado por más 500 productos con acabados y estilos diferentes, fáciles de instalar y de implementar en cualquier proyecto.
                            </p>
                        </div>

                        {/* Right Side (LO QUE NOS IDENTIFICA Cards) */}
                        <div className="lg:col-span-7 flex flex-col gap-5">
                            <div className="text-center lg:text-left mb-2">
                                <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-widest pb-2 border-b border-gray-200 inline-block">
                                    LO QUE NOS IDENTIFICA
                                </h3>
                            </div>
                            
                            {[
                                { icon: BookOpen, title: "Conocimiento sectorial." },
                                { icon: Globe, title: "Logística internacional" },
                                { icon: Handshake, title: "Experiencia, asesoría y acompañamiento especializado." },
                                { icon: Award, title: "Calidad comprobada y verificada." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.01, x: 5, borderColor: "#132c3f" }}
                                    className="flex gap-4 items-center rounded-2xl border border-gray-200 p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                                >
                                    <div className="text-slate-900 bg-slate-100 p-2.5 rounded-lg flex-shrink-0">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-extrabold text-[15px] text-slate-900 leading-snug">
                                        {item.title}
                                    </h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ================= SECTION 3: PROPÓSITO ================= */}
                <section className="py-24 bg-gray-50/50 border-y border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            
                            {/* Left Side: Propósito Header & Intro */}
                            <div className="lg:col-span-5 flex flex-col gap-5">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase">
                                    PROPÓSITO
                                </h2>
                                <div className="w-12 h-1 bg-[#F37B24] rounded-full mb-2" />
                                <p className="text-md leading-relaxed text-slate-900 font-extrabold">
                                    Hacer que construir sea más eficiente, estético y versátil, reemplazando los sistemas tradicionales por materiales sostenibles y de calidad verificada en PVC y WPC.
                                </p>
                            </div>

                            {/* Right Side: Cómo lo cumplimos big box */}
                            <div className="lg:col-span-7 rounded-[2rem] border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">
                                    CÓMO LO CUMPLIMOS
                                </h3>
                                <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                                    Facilitamos que distribuidores, constructores y arquitectos de Latinoamérica accedan a materiales arquitectónicos con calidad verificada en origen, precios de importación directa y una logística de contenedor que pueden planear y controlar.
                                </p>
                            </div>

                        </div>

                        {/* Workflow Compact Badges underneath */}
                        <div className="mt-16 pt-10 border-t border-gray-200">
                            <div className="flex items-center justify-center gap-4 mb-10">
                                <div className="flex-1 h-[1px] bg-gray-300" />
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase text-center shrink-0">
                                    COMPROMISOS UNITEC
                                </h2>
                                <div className="flex-1 h-[1px] bg-gray-300" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    "Calidad auditada en fábrica antes de cada despacho.",
                                    "Asesoría técnica en la especificación y la instalación.",
                                    "Ficha técnica y garantía documentada en cada referencia.",
                                    "Tiempos y costos de importación claros desde la cotización."
                                ].map((item, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-[#132c3f] text-white p-5 rounded-2xl text-center text-[13px] font-bold shadow-sm hover:scale-102 transition-transform cursor-default duration-300 flex items-center justify-center leading-relaxed"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>


                {/* ================= SECTION 4: POR QUÉ ELEGIRNOS ================= */}
                <section className="py-24 max-w-6xl mx-auto px-6 md:px-8">
                    {/* Centered Separator Header */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="flex-1 h-[1px] bg-gray-250" />
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase text-center shrink-0">
                            POR QUÉ ELEGIRNOS
                        </h2>
                        <div className="flex-1 h-[1px] bg-gray-250" />
                    </div>

                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <p className="text-base text-gray-600 leading-relaxed font-semibold">
                            Somos más que una empresa de materiales constructivos. <span className="text-slate-900 font-extrabold">Somos rentabilidad, eficiencia, innovación y creatividad hecha producto.</span> Una marca que trabaja de la mano del sector constructivo para evolucionar las dinámicas tradicionales y proponer modelos prácticos, estéticos y de cero mantenimiento.
                        </p>
                    </div>

                    {/* Features grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: ShieldCheck, title: "Garantía de 15 a 25 Años", desc: "Durabilidad líder en la industria respaldada por confianza." },
                            { icon: Droplets, title: "100% Impermeables", desc: "Sin humedad, pudrición ni corrosión — nunca." },
                            { icon: ToolCase, title: "Cero Mantenimiento", desc: "Sin pintura, sellado ni barnizado." },
                            { icon: Flame, title: "Resistente al Fuego", desc: "Autoextinguible con baja propagación de llama." },
                            { icon: Leaf, title: "Ecológicos y Sostenibles", desc: "Materiales recuperados 100% reciclables." },
                            { icon: Zap, title: "Instalación Rápida", desc: "Ahorre tiempo y mano de obra en cada proyecto." }
                        ].map((feat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -4, borderColor: "#132c3f" }}
                                className="rounded-3xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                            >
                                <div className="text-slate-900 bg-slate-100 p-2.5 rounded-xl w-fit mb-4">
                                    <feat.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-extrabold text-[15px] text-slate-900 mb-1.5">{feat.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed font-normal">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>


                {/* ================= SECTION 5: SOSTENIBILIDAD Y CALIDAD ================= */}
                <section className="py-24 bg-gray-50/50 border-y border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 md:px-8">
                        {/* Centered Separator Header */}
                        <div className="flex items-center justify-center gap-4 mb-16">
                            <div className="flex-1 h-[1px] bg-gray-250" />
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase text-center shrink-0">
                                SOSTENIBILIDAD Y CALIDAD EN LOS PRODUCTOS
                            </h2>
                            <div className="flex-1 h-[1px] bg-gray-250" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Left Column (H3 Text) */}
                            <div className="lg:col-span-5">
                                <p className="text-[15px] text-gray-700 leading-relaxed font-semibold">
                                    Fabricamos nuestros productos bajo estándares de calidad y certificación ISO 9001, pruebas de laboratorio independientes y auditorías físicas en planta que permiten garantizar la durabilidad de cada artículo constructivo.
                                </p>
                            </div>

                            {/* Right Column (Recuadro Responsables con el Medio Ambiente) */}
                            <div className="lg:col-span-7 rounded-[2rem] border border-gray-200 bg-white p-8 md:p-10 shadow-sm flex flex-col gap-4">
                                <h3 className="text-md font-extrabold text-[#132c3f] uppercase tracking-widest border-b border-gray-100 pb-3">
                                    RESPONSABLES CON EL MEDIO AMBIENTE
                                </h3>
                                <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                                    Contenido de PVC reciclado en todos los productos, 100% reciclables al final de su vida útil y bajas emisiones de VOC, hacen que cada referencia pueda ser utilizada en proyectos de diseño interior, sin afectaciones a la salud y al medio ambiente, con una vida útil prolongada que reduce la frecuencia de reemplazo.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>


                {/* ================= SECTION 6: SOMOS EL ALIADO DE QUIENES VIVEN DE CONSTRUIR ================= */}
                <section className="py-24 max-w-6xl mx-auto px-6 md:px-8 border-b border-gray-100">
                    {/* Header */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-wide uppercase leading-tight">
                            SOMOS EL ALIADO DE QUIENES VIVEN DE CONSTRUIR Y COMERCIALIZAR
                        </h2>
                        <div className="w-16 h-1 bg-[#F37B24] mx-auto mt-4 rounded-full" />
                    </div>

                    {/* Two Big Cards Split Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Card Left */}
                        <div className="rounded-[2.5rem] border border-gray-200 p-8 md:p-10 bg-white shadow-sm flex flex-col gap-8">
                            {/* Block 1 */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-extrabold text-lg text-slate-900 border-l-4 border-[#F37B24] pl-3">
                                    Calidad verificada en origen:
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                                    Auditamos cada producto en fábrica antes del despacho y respaldamos cada referencia con ficha técnica y garantía documentada.
                                </p>
                            </div>
                            
                            {/* Block 2 */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-extrabold text-lg text-slate-900 border-l-4 border-[#F37B24] pl-3">
                                    Control total de la importación:
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                                    Usted arma su contenedor, ve cuánto espacio ocupa cada referencia y confirma su carga completa antes de pagar. Metros cúbicos visibles, costos sin sorpresas.
                                </p>
                            </div>
                        </div>

                        {/* Card Right */}
                        <div className="rounded-[2.5rem] border border-gray-200 p-8 md:p-10 bg-white shadow-sm flex flex-col gap-8">
                            {/* Block 1 */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-extrabold text-lg text-slate-900 border-l-4 border-[#F37B24] pl-3">
                                    Acompañamiento de aliado:
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                                    Detrás de cada relacionamiento comercial tenemos un asesor con nombre propio que ayuda a especificar, cotizar y resolver. En el contenedor no viaja solo carga: viaja la confianza que el cliente ha puesto en usted.
                                </p>
                            </div>
                            
                            {/* Block 2 */}
                            <div className="flex flex-col gap-2">
                                <h3 className="font-extrabold text-lg text-slate-900 border-l-4 border-[#F37B24] pl-3">
                                    Puente entre dos mercados:
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                                    Sede en Doral (Miami) y showroom en Medellín: una sola cadena de suministro que conecta la fábrica con la obra en más de 5 países.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>


                {/* ================= SECTION 7: ASÍ SE IMPORTA CON UNITEC ================= */}
                <section 
                    className="relative py-24 text-white overflow-hidden"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, rgba(19, 44, 63, 0.94), rgba(19, 44, 63, 0.94)), url('/raster/containers.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 text-center">
                        {/* Title & Subtitle */}
                        <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide leading-tight max-w-4xl mx-auto">
                            ASÍ SE IMPORTA CON UNITEC
                        </h2>
                        <p className="mt-4 text-base md:text-lg italic font-normal tracking-wide text-white/80 max-w-2xl mx-auto">
                            Nuestra plataforma refleja cómo se planifica una importación real por contenedor, no por carrito.
                        </p>

                        {/* 3 Columns Workflow Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
                            {[
                                {
                                    id: "01",
                                    title: "VERIFIQUE Y SELECCIONE SUS PRODUCTOS",
                                    desc: "Elija una o varias referencias del catálogo. Podrá apoyar su decisión con la ficha técnica que está al lado de cada artículo."
                                },
                                {
                                    id: "02",
                                    title: "PÓNGALOS EN EL CARRITO Y EN EL CONTENEDOR",
                                    desc: "Vea en tiempo real cuánto espacio ocupa cada producto y cuánta capacidad le queda. (Un contenedor de 20 pies carga ≈ 33 m³)."
                                },
                                {
                                    id: "03",
                                    title: "RECIBA LOS PRODUCTOS",
                                    desc: "Recójalos en nuestro showroom de Medellín, si su contacto fue directo con un asesor o impórtelos vía marítima con trazabilidad, bajo el Incoterm que usted elija (FOB o CIF)."
                                }
                            ].map((step) => (
                                <div 
                                    key={step.id} 
                                    className="relative bg-white/5 backdrop-blur-md border border-white/15 rounded-3xl p-8 shadow-lg flex flex-col justify-between"
                                >
                                    <div className="absolute top-6 right-8 text-5xl font-black text-white/10 italic select-none">
                                        {step.id}
                                    </div>
                                    <div>
                                        <h3 className="text-md font-extrabold tracking-wider leading-snug uppercase mb-4 w-4/5 text-white/95">
                                            {step.title}
                                        </h3>
                                        <p className="text-[13px] text-white/80 leading-relaxed font-normal">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ================= SECTION 8: LO QUE COMERCIALIZAMOS ================= */}
                <section className="py-24 max-w-6xl mx-auto px-6 md:px-8">
                    {/* Centered Separator Header */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="flex-1 h-[1px] bg-gray-250" />
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase text-center shrink-0">
                            LO QUE COMERCIALIZAMOS
                        </h2>
                        <div className="flex-1 h-[1px] bg-gray-250" />
                    </div>

                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed font-semibold">
                            Fabricamos nuestros productos bajo estándares de calidad y certificación ISO 9001, pruebas de laboratorio independientes e inspección física en planta que permiten garantizar la durabilidad de cada artículo constructivo.
                        </p>
                    </div>

                    {/* 6 Grid Categories with Icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
                        {[
                            { icon: Layers, title: "Paneles de pared y revestimientos" },
                            { icon: Home, title: "Techos y cubiertas" },
                            { icon: Grid, title: "Pisos SPC y deck WPC" },
                            { icon: Layout, title: "Fachadas" },
                            { icon: Volume2, title: "Paneles acústicos" },
                            { icon: Palette, title: "Acabados decorativos" }
                        ].map((cat, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md hover:border-[#132c3f] transition-all duration-300 cursor-default group"
                            >
                                <div className="text-slate-900 bg-slate-100 p-2.5 rounded-xl group-hover:bg-[#132c3f] group-hover:text-white transition-all duration-300 flex-shrink-0">
                                    <cat.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-extrabold text-[14px] text-slate-800 leading-snug group-hover:text-[#132c3f] transition-colors duration-300">
                                    {cat.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Catalog Explorer Button */}
                    <div className="text-center mt-12">
                        <MyButton
                            label="EXPLORAR EL CATÁLOGO COMPLETO"
                            href="/colecciones"
                            className={{
                                btn: "bg-[#132c3f] hover:bg-[#1c3e57] px-8 py-3.5 h-12 hover:scale-105 transition-all duration-300 rounded-full text-white shadow-md border-none",
                                label: "font-black text-white uppercase text-[12px] tracking-widest"
                            }}
                        />
                    </div>
                </section>


                {/* ================= SECTION 9: HABLAMOS DE SU PRÓXIMO PROYECTO ================= */}
                <section className="bg-[#132c3f] text-white py-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase italic tracking-wide leading-tight">
                            ¿HABLÁMOS DE SU PRÓXIMO PROYECTO?
                        </h2>
                        
                        <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-2xl mx-auto">
                            Cotice, pida muestras o visite nuestro showroom en Medellín. Un asesor le responde en menos de 24 horas.
                        </p>

                        <div className="mt-6">
                            <MyButton
                                label="HABLE YA CON UN ASESOR"
                                href={whatsappLink}
                                className={{
                                    btn: "bg-white hover:bg-gray-100 px-8 py-3.5 h-12 rounded-full text-slate-900 border-none transition-all duration-300 hover:scale-105 shadow-lg",
                                    label: "font-black text-slate-900 uppercase text-[12px] tracking-widest"
                                }}
                            />
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

function ToolCase({ className, size }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <rect width="20" height="14" x="2" y="7" rx="2" />
            <path d="M16 21V7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v14" />
        </svg>
    )
}
