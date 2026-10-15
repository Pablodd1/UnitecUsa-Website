"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, Menu, X, FileText, ChevronDown, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { CartButton } from './cartBtn';
import SearchFrom from './search';
import Logo from 'My_UI/logo';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from 'lib/LanguageContext';
import MegaMenu from './MegaMenu';
import CatalogDropdown from './CatalogDropdown';
import { getCatalogsByLanguage } from 'utils/catalogsData';

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
    const { t, language } = useLanguage();
    const isSpanish = language === 'es';
    const q = searchParams?.q;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileCatalogsOpen, setMobileCatalogsOpen] = useState(false);
    const activeCatalogs = getCatalogsByLanguage(isSpanish ? 'Español' : 'English');

    const handleContactClick = () => {
        import('lib/analytics').then(({ trackContactClick }) => trackContactClick());
    };

    return (
        <header className="sticky top-0 z-30 bg-slate-900/95 shadow-accent2 border-b border-slate-800 shadow-md backdrop-blur-md text-white pr-8 pl-5 py-2.5">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between relative">

                {/* Mobile Menu Button + Mobile Brand Logo */}
                <div className="flex items-center gap-3 lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} aria-label="Home">
                        <Logo size={90} className="h-9 w-auto brightness-0 invert object-contain" />
                    </Link>
                </div>

                {/* Navigation Links - Desktop */}
                <nav className="items-center hidden lg:flex">
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

                    {/* Search Bar */}
                    <div className="hidden sm:block">
                        <SearchFrom query={q} />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-1">
                        <CartButton />
                        <LanguageToggle />
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
                        transition={{ duration: 0.25 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white text-slate-900 shadow-2xl border-b border-gray-200 py-5 px-6 max-h-[85vh] overflow-y-auto z-50"
                    >
                        <nav className="flex flex-col divide-y divide-gray-100">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="py-2.5 first:pt-0 last:pb-0"
                                >
                                    {item.catalogDropdown ? (
                                        <div>
                                            <button
                                                onClick={() => setMobileCatalogsOpen(!mobileCatalogsOpen)}
                                                className="text-sm uppercase tracking-widest font-bold text-slate-900 hover:text-emerald-700 flex items-center justify-between py-2 transition-colors w-full text-left"
                                            >
                                                <span className="flex items-center">
                                                    <FileText className="w-4 h-4 mr-2.5 text-emerald-700" />
                                                    {t(`nav.${item.id}`)}
                                                </span>
                                                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${mobileCatalogsOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {mobileCatalogsOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="pl-6 mt-1 space-y-2 overflow-hidden pb-2"
                                                    >
                                                        {activeCatalogs.map((cat) => (
                                                            <a
                                                                key={cat.id}
                                                                href={cat.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 py-1.5"
                                                            >
                                                                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                                <span>{cat.name}</span>
                                                            </a>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                if (item.id === 'contact') handleContactClick();
                                            }}
                                            className="text-sm uppercase tracking-widest font-bold text-slate-900 hover:text-emerald-700 flex items-center py-2 transition-colors"
                                        >
                                            {item.id === 'home' ? (
                                                <Home className="w-4 h-4 mr-2.5 text-emerald-700" />
                                            ) : item.icon ? (
                                                <span className="mr-2.5 text-emerald-700">{item.icon}</span>
                                            ) : null}
                                            {t(`nav.${item.id}`)}
                                        </Link>
                                    )}

                                    {/* Submenu items (e.g. Sobre Nosotros / Nuestra Historia) */}
                                    {item.submenu && (
                                        <div className="pl-6 mt-1 space-y-1.5 border-l-2 border-slate-100 ml-2">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-1.5 transition-colors"
                                                >
                                                    {subItem.title || t(`nav.${subItem.label}`)}
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    {/* Quick Interior / Exterior links under Products List on mobile */}
                                    {item.megaMenu && (
                                        <div className="pl-6 mt-1 space-y-1.5 border-l-2 border-slate-100 ml-2">
                                            <Link
                                                href="/colecciones/interior?collection=interior"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-1.5 transition-colors"
                                            >
                                                {isSpanish ? 'Colección Interior' : 'Interior Collection'}
                                            </Link>
                                            <Link
                                                href="/colecciones/exterior?collection=exterior"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-1.5 transition-colors"
                                            >
                                                {isSpanish ? 'Colección Exterior' : 'Exterior Collection'}
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </nav>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 pt-4 border-t border-gray-200 sm:hidden text-slate-900"
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
