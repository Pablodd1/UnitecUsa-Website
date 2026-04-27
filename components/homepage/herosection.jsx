"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./herosection.module.css";
import MyButton from "My_UI/btn/main";
import { Facebook, Instagram } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";
import { useBrand } from "lib/BrandContext";
import SearchForm from "components/navbar/search";

// TikTok icon component since lucide-react doesn't have it
const TikTokIcon = ({ className, strokeWidth }) => (
    <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        strokeWidth={strokeWidth}
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
);

const socials = [
    { Icon: Facebook, label: "Facebook", link: "https://www.facebook.com/unitecusadesign/" },
    { Icon: Instagram, label: "Instagram", link: "https://www.instagram.com/unitecusadesign/" },
    { Icon: TikTokIcon, label: "TikTok", link: "https://www.tiktok.com/@unitecusadesign" },
];

export default function HeroSec() {
    const { t, getCompanyText } = useLanguage();
    const { activeBrand } = useBrand();

    const companyKey = activeBrand === 'unitec' ? 'unitec' : 'binw';
    const heroTitle = getCompanyText(companyKey, 'heroTitle');
    const heroSubtitle = getCompanyText(companyKey, 'heroSubtitle');
    const heroCta = getCompanyText(companyKey, 'heroCta');

    const titleParts = heroTitle.split(/ (.*)/);
    const titleStart = titleParts[0] || '';
    const titleHighlightEnd = titleParts[1] ? titleParts[1].split(/ (.*)/) : ['', ''];
    const titleHighlight = titleHighlightEnd[0] || '';
    const titleEnd = titleHighlightEnd[1] || '';

    return (
        <main className="overflow-hidden min-h-screen relative">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/raster/containes.avif"
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/hero-video.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                    <Image
                        src="/raster/containes.avif"
                        alt="Hero background"
                        fill
                        priority
                        className="object-cover"
                    />
                </video>
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/30 z-10"></div>
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
                            className="text-2xl sm:text-3xl md:text-6xl md:leading-18 tracking-wide font-semibold w-full md:w-11/12 drop-shadow-lg"
                        >
                            {titleStart} <motion.strong
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                                className="bg-primary/90 rounded-2xl px-2 text-orange-800 inline-block"
                            >{titleHighlight}</motion.strong> {titleEnd}
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
                            className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        >
                            <MyButton
                                label={heroCta}
                                href="/collections"
                                className={{
                                    btn: "bg-primary px-6 py-2.5 h-12 hover:bg-white transition-all duration-300 hover:scale-105 text-sm md:text-base shadow-lg",
                                    label: "font-bold"
                                }}
                            />
                            
                            <div className="w-full max-w-sm">
                                <SearchForm full={true} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className={`hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 flex-col items-center justify-evenly gap-2 ${styles.bannerLink} z-30`}
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
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Icon strokeWidth={1} className="fill-white/80 text-white w-full min-h-fit h-auto max-w-12 hover:fill-primary hover:text-primary transition-all duration-300" />
                        </motion.a>
                    ))}
                </motion.div>

            </section>
        </main>
    );
}
