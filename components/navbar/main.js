"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { House, Library, Search, Shapes, User, Menu, X, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CartButton } from './cartBtn';
import SearchFrom from './search';
import Logo from 'My_UI/logo';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';
import MegaMenu from './MegaMenu';
import CatalogDropdown from './CatalogDropdown';

const navItems = [
    { label: 'Home', id: 'home', href: '/', icon: <Logo size={100} className={'h-10 sm:h-12 md:h-14 w-auto brightness-0 invert object-contain min-w-[125px] md:min-w-[150px]'} />, onlyIcon: true },
    {
        label: 'Products List',
        id: 'productList',
        icon: <Library className=' text-inherit h-5' />,
        href: '/colecciones',
        megaMenu: true
    },
    {
        label: 'Catalogs',
        id: 'catalogs',
        icon: <FileText className=' text-inherit h-5' />,
        href: '#',
        catalogDropdown: true
    },
    {
        label: 'Institutional',
        id: 'institutional',
        href: '/nosotros',
        submenu: [
            { label: 'whoWeAre', title: 'Sobre Nosotros', href: '/nosotros' },
            { label: 'ourHistory', title: 'Nuestra Historia', href: '/nosotros/historia' },
        ]
    },
    { label: 'Contact', id: 'contact', href: '/contacto' },
    { label: 'Blog', id: 'blog', href: '/blog' }
];


const NavBar = ({ searchParams }) => {
    const { t } = useLanguage();
    const q = searchParams?.q
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleContactClick = () => {
        import('lib/analytics').then(({ trackContactClick }) => trackContactClick());
    }

    return (
        <header className="sticky top-0 z-30 bg-slate-900/95 shadow-accent2 border-b border-slate-800 shadow-md backdrop-blur-md text-white pr-8 pl-5 py-2.5">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between relative">

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Navigation Links - Desktop */}
                <nav className="items-center flex hidden lg:flex">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`relative group mx-5 first-of-type:mx-0`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            {item.catalogDropdown ? (
                                <button
                                    aria-label="Catalogs"
                                    className="text-sm uppercase tracking-widest font-semibold flex items-center transition-all whitespace-nowrap cursor-pointer text-slate-100 hover:text-primary"
                                >
                                    {
                                        item.icon ?
                                            <span className={`lg:inline-flex ${index > 1 ? "hidden" : "inline-flex"}`} >{item.icon}</span>
                                            : null
                                    }
                                    <span className={`lg:block ${index > 1 ? "hidden" : ""}`}> {t(`nav.${item.id}`)}</span>
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={item.id === 'contact' ? handleContactClick : undefined}
                                    aria-label={`Go To ${item.href}`}
                                    className="text-sm uppercase tracking-widest font-semibold flex items-center transition-all whitespace-nowrap cursor-pointer text-slate-100 hover:text-primary"
                                >
                                    {
                                        item.onlyIcon
                                            ? item.icon
                                            :
                                            <>
                                                {
                                                    item.icon ?
                                                        <span className={`lg:inline-flex ${index > 1 ? "hidden" : "inline-flex"}`} >{item.icon}</span>
                                                        : null
                                                }
                                                <span className={`lg:block ${index > 1 ? "hidden" : ""}`}> {t(`nav.${item.id}`)}</span>
                                            </>
                                    }
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {item.submenu && (
                                <div className="absolute left-5 top-full pt-2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                                    <div className="bg-slate-900/95 backdrop-blur-sm shadow-lg rounded-md border border-slate-800 overflow-hidden flex flex-col min-w-[200px]">
                                        {/* Dropdown Header if needed */}
                                        {/* <div className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100">
                                            {item.label}
                                        </div> */}
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className="px-4 py-3 text-sm hover:bg-slate-800 transition-colors border-b last:border-0 border-slate-800 text-slate-300 hover:text-white"
                                            >
                                                {subItem.title || t(`nav.${subItem.label}`)}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Mega Menu */}
                            {item.megaMenu && <MegaMenu />}

                            {/* Catalog Dropdown */}
                            {item.catalogDropdown && <CatalogDropdown />}
                        </motion.div>
                    ))}
                </nav>

                {/* Actions Area */}
                <div className="flex items-center gap-2 flex-1 justify-end ml-2 md:ml-12">

                    {/* Search Bar - Matching the rounded pill design from screenshot */}
                    <div className="hidden sm:block">
                        <SearchFrom query={q} />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-1">
                        <CartButton />
                        <LanguageToggle />
                        {/* <div className="px-2 hover:bg-white/5 rounded-full transition-all group">
                            <User className="w-fit h-full text-inherit" />
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-200 py-4 px-6 overflow-hidden"
                    >
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.catalogDropdown ? (
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-sm uppercase tracking-widest font-semibold flex items-center py-2 hover:text-primary transition-colors w-full text-left"
                                        >
                                            {item.icon && <span className="mr-2">{item.icon}</span>}
                                            {t(`nav.${item.id}`)}
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                if (item.id === 'contact') handleContactClick();
                                            }}
                                            className="text-sm uppercase tracking-widest font-semibold flex items-center py-2 hover:text-primary transition-colors"
                                        >
                                            {item.icon && <span className="mr-2">{item.icon}</span>}
                                            {t(`nav.${item.id}`)}
                                        </Link>
                                    )}
                                    {item.submenu && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="pl-6 mt-2 space-y-2"
                                        >
                                            {item.submenu.map((subItem, subIndex) => (
                                                <motion.div
                                                    key={subItem.href}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + subIndex * 0.05 }}
                                                >
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="block text-sm text-gray-600 hover:text-black py-1 hover:translate-x-2 transition-transform"
                                                    >
                                                        {subItem.title || t(`nav.${subItem.label}`)}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </nav>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-200 sm:hidden"
                        >
                            <SearchFrom query={q} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default NavBar;
