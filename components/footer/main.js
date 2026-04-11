"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import Logo from 'My_UI/logo';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';
import teamData from 'StaticData/team.json';
import { useState } from 'react';

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const socials = [
    { Icon: Facebook, label: "Facebook", key: "facebook" },
    { Icon: Instagram, label: "Instagram", key: "instagram" },
    { Icon: TikTokIcon, label: "TikTok", key: "tiktok" },
];

const Footer = () => {
    const { t, getCompanyText } = useLanguage();
    const { activeBrand, brand } = useBrand();

    const brandData = teamData[activeBrand] || teamData.binw;
    const contact = brandData.contact || {};
    const social = teamData.social || {};

    const navData = {
        logo: {
            text: brand.name
        },
        contact: {
            phone: contact.phone,
            phone2: contact.phone2 || null,
            email: contact.email,
            address: activeBrand === 'unitec'
                ? [contact.address, contact.city, contact.country]
                : [contact.address, contact.country].filter(Boolean)
        },
        information: [
            { title: t("footer.information.links.productList"), link: "/collections" },
            { title: t("footer.information.links.exteriors"), link: "/collections/exterior" },
            { title: t("footer.information.links.interiors"), link: "/collections/interior" },
            { title: t("footer.information.links.sales"), link: "/collections/sales" }
        ],
        helpfulLinks: [
            { title: t("footer.helpful.links.whoWeAre"), link: "/about/who-we-are" },
            { title: t("footer.helpful.links.ourMission"), link: "/about/mission" },
            { title: t("footer.helpful.links.ourVision"), link: "/about/vision" },
            { title: t("footer.helpful.links.quality"), link: "/about/quality" },
            { title: t("footer.helpful.links.business"), link: "/about/business-models" },
            { title: t("footer.helpful.links.supports"), link: "/contact" },
            { title: t("footer.helpful.links.faqs"), link: "/faq" },
            { title: t("footer.helpful.links.search"), link: "/collections/search" }
        ]
    };

    const [isSubscribed, setIsSubscribed] = useState(false);

    return (
        <footer className="bg-black text-gray-300 pt-16">
            <div className="container mx-auto px-6">
                <section className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_0.7fr_0.75fr_1fr] gap-y-16 lg:gap-y-2' >
                    <article className='lg:w-2/3 sm:col-span-2 md:col-span-3 lg:col-span-1' >
                        {/* Logo Section */}
                        <div className="text-center mb-0 w-fit mx-auto ">
                            <Logo size={150} className="mx-auto bg-primary p-1 mb-3 rounded-md" />
                        </div>

                        {/* Contact Section */}
                        <div className="text-center mb-8 flex flex-col gap-1">
                            <p className="text-lg text-accent1 uppercase tracking-widest font-semibold">{t("footer.contact.title")}</p>
                            
                            {activeBrand === 'unitec' && (
                                <p className="text-sm font-bold text-gray-400 mt-2">{t("footer.contact.moreInfo")}</p>
                            )}
                            <p className="text-sm font-medium">{navData.contact.phone} {navData.contact.phone2 ? `/ ${navData.contact.phone2}` : ""}</p>
                            
                            {activeBrand === 'unitec' && (
                                <p className="text-sm font-bold text-gray-400 mt-2">{t("footer.contact.visitShowroom")}</p>
                            )}
                            {navData.contact.address.map((line, i) => (
                                <p key={i} className="text-sm font-medium">{line}</p>
                            ))}
                        </div>

                    </article>

                    {/* Information Section */}
                    <div className="mb-8">
                        <h3 className="text-xl mb-4 text-accent1 ">{t("footer.information.title")}</h3>
                        <ul className="space-y-2 px-2" >
                            {navData.information.map((item, index) => (
                                <li key={index}>
                                    <a href={item.link} className="uppercase tracking-widest font-semibold text-sm">{item.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Helpful Links Section */}
                    <div className="mb-8 ">
                        <h3 className="text-xl mb-4 text-accent1">{t("footer.helpful.title")}</h3>
                        <ul className="space-y-2 px-2">
                            {navData.helpfulLinks.map((item, index) => (
                                <li key={index}>
                                    <a href={item.link} className="uppercase tracking-widest font-semibold text-sm">{item.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Subscribe Section */}
                    <div className="text-center mb-8 max-w-64 float-right mx-auto lg:mr-0 relative lg:ml-auto w-full sm:col-span-2 md:col-span-3 lg:col-span-1 ">
                        <p className="text-lg">{t("footer.subscribe.title")}</p>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                const email = e.target.email.value;
                                if (!email) return;
                                
                                setIsSubscribed(true);
                                
                                const subject = encodeURIComponent("Website Subscription Request");
                                const body = encodeURIComponent(`New subscription request from: ${email}\n\nPlease add this email to the mailing list.`);
                                window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
                                
                                setTimeout(() => setIsSubscribed(false), 5000);
                            }}
                            className="flex flex-col justify-center my-5"
                        >
                            <input
                                name="email"
                                type="email"
                                required
                                disabled={isSubscribed}
                                placeholder={isSubscribed ? "Thank you!" : t("footer.subscribe.placeholder")}
                                className="p-2 rounded-t-lg placeholder:text-accent2 border-2 border-primary text-black disabled:bg-gray-100"
                            />
                            <button 
                                type="submit"
                                aria-label='Subscribe Button' 
                                disabled={isSubscribed}
                                className={`bg-primary text-secondary font-semibold transition-all ease-in duration-300 cursor-pointer tracking-superwide uppercase py-2 px-3.5 rounded-b-lg ${isSubscribed ? 'opacity-50' : 'hover:bg-secondary hover:text-white'}`}
                            >
                                {isSubscribed ? "✓ Subscribed" : t("footer.subscribe.btn")}
                            </button>
                        </form>
                    </div>
                </section>

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative flex justify-center space-x-4 border-t-2 border-gray-100 py-5"
                >
                    {socials.map(({ Icon, key }, index) => {
                        const link = social[key];
                        if (!link) return null;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link href={link || ''} aria-label={`Go To ${key}`} className={`w-8 h-8 p-1 overflow-hidden flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-all duration-300`}>
                                    <Icon strokeWidth={1} className=" text-white fill-secondary w-full min-h-fit h-auto max-w-12" />
                                </Link>
                            </motion.div>
                        );
                    })}
                    {/* Bottom Copyright */}
                    <div className="text-center font-serif text-sm absolute right-0">
                        <p>{t('footer.rights')} &copy; - 2026 {brand.name}.</p>
                    </div>
                </motion.div>


            </div>
        </footer>
    );
};

export default Footer;