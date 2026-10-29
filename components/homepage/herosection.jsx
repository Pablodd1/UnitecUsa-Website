"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MyButton from "My_UI/btn/main";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";
import { useBrand } from "lib/BrandContext";
import { siteSettings, getWhatsAppUrl } from "lib/siteSettings";

const TikTokIcon = ({ className }) => (
    <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
);

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378.003 12.003.003c3.21.001 6.228 1.248 8.497 3.52 2.27 2.272 3.515 5.29 3.515 8.501 0 6.628-5.37 11.999-12.003 11.999-2.006-.002-3.98-.502-5.742-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.793 1.453 5.428 0 9.841-4.393 9.843-9.789.002-2.614-1.012-5.074-2.861-6.924C16.518 1.944 14.07 .93 11.558.93 6.13.93 1.72 5.32 1.718 10.716c0 1.69.447 3.34 1.298 4.793L1.926 21.94l6.721-1.786z"/>
        <path d="M16.947 13.912c-.27-.134-1.597-.788-1.845-.878-.248-.09-.429-.134-.61.134-.181.27-.698.878-.857 1.058-.159.18-.318.2-.588.066-.27-.134-1.14-.42-2.17-1.34-.8-.713-1.34-1.593-1.498-1.863-.158-.27-.017-.417.118-.55.121-.12.27-.315.405-.47.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.61-1.467-.836-2.007-.22-.528-.48-.456-.66-.464-.17-.008-.364-.01-.557-.01-.194 0-.51.072-.776.368-.266.296-1.016.992-1.016 2.42 0 1.428 1.039 2.808 1.183 3.002.145.194 2.045 3.123 4.954 4.382.692.3 1.233.479 1.654.613.695.221 1.328.19 1.828.115.557-.083 1.597-.653 1.822-1.284.225-.63.225-1.17.158-1.284-.068-.113-.248-.18-.518-.315z"/>
    </svg>
);

const whatsappLink = getWhatsAppUrl();

const socials = [
    { Icon: WhatsAppIcon, label: "WhatsApp", link: whatsappLink },
    { Icon: Instagram, label: "Instagram", link: siteSettings.social?.instagram || "https://www.instagram.com/unitecusadesign/" },
    { Icon: Linkedin, label: "LinkedIn", link: siteSettings.social?.linkedin || "https://www.linkedin.com/" },
    { Icon: Youtube, label: "YouTube", link: siteSettings.social?.youtube || "https://www.youtube.com/" },
    { Icon: TikTokIcon, label: "TikTok", link: siteSettings.social?.tiktok || "https://www.tiktok.com/@unitecusadesign" },
];

export default function HeroSec() {
    const [, setIsVideoLoaded] = useState(false);
    useEffect(() => {
        setIsVideoLoaded(true);
    }, []);

    const { getCompanyText, language } = useLanguage();
    const { activeBrand } = useBrand();

    const companyKey = activeBrand === 'unitec' ? 'unitec' : 'binw';
    const heroTitle = getCompanyText(companyKey, 'heroTitle');
    const heroSubtitle = getCompanyText(companyKey, 'heroSubtitle');
    const heroCta = getCompanyText(companyKey, 'heroCta');
    const secondaryLabel = language === 'en'
        ? "TALK TO AN ADVISOR & QUOTE YOUR PROJECT"
        : "HABLE Y COTICE SUS PROYECTOS CON UN ASESOR";

    return (
        <main className="overflow-hidden min-h-screen relative">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 z-10"></div>
            </div>

            <section className="relative z-20 pt-16 md:pt-24 pb-12 md:pb-12">
                <div className="relative mx-auto max-w-300 px-4 md:px-6
                        grid gap-y-8 md:gap-y-12 gap-x-8
                        grid-cols-1
                        md:grid-cols-[auto_auto] md:mt-16
                        lg:grid-cols-[1fr_0.75fr] lg:gap-x-2">

                    <figure className="order-2 md:order-1 relative max-h-full flex items-center justify-center overflow-visible hidden md:flex">
                    </figure>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col justify-center gap-4 md:gap-6 text-white"
                    >
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl sm:text-2xl md:text-4xl md:leading-tight tracking-wide font-semibold w-full md:w-11/12 drop-shadow-lg"
                        >
                            {heroTitle}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-sm sm:text-base font-normal text-white/90 w-full md:w-8/12 drop-shadow-md"
                        >
                            {heroSubtitle}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-11/12"
                        >
                            <MyButton
                                label={heroCta}
                                href="/colecciones"
                                className={{
                                    btn: "bg-[#F37B24] px-6 py-2.5 h-12 hover:bg-[#E06A1A] transition-all duration-300 hover:scale-105 text-sm md:text-base shadow-lg border-none",
                                    label: "font-bold uppercase text-white"
                                }}
                            />
                            <MyButton
                                label={secondaryLabel}
                                href={whatsappLink}
                                className={{
                                    btn: "bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 h-12 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-sm md:text-base shadow-lg",
                                    label: "font-bold uppercase text-white"
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className={`hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center justify-evenly gap-3 z-30 bg-[#151f2b] p-3 rounded-full border border-slate-700/50 shadow-2xl`}
                >
                    {socials.map(({ Icon, label, link }, index) => (
                        <motion.a
                            key={label}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-gray-300 hover:text-white hover:bg-slate-700 transition-all duration-300 cursor-pointer"
                        >
                            <Icon className="w-5 h-5" />
                        </motion.a>
                    ))}
                </motion.div>

            </section>
        </main>
    );
}
