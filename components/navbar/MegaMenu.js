"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package, Home, Building2, Layers, Droplets, Sparkles, TreeDeciduous, Grid3X3 } from 'lucide-react';

const productCategories = {
    Interior: {
        "PAREDES": {
            page: "/collections/paredes",
            subcategories: ["ROLLO MARMOL", "ACOLCHADO", "MARMOL", "ACUSTICO", "PANEL PS", "PU", "MUROFLEX", "UNIFLEX"]
        },
        "LAMINAS": {
            page: "/collections/laminas",
            subcategories: ["FOAM BOARD", "MARMOL", "PAREDES", "PVC BOARD"]
        },
        "JARDINES ARTIFICIALES": {
            page: "/collections/jardines-artificiales",
            subcategories: ["Vertical Gardens", "Green Walls", "Artificial Plants"]
        },
        "PANELES WPC Y ANGULOS": {
            page: "/collections/paneles-wpc",
            subcategories: ["WPC Interior"]
        },
        "PISOS": {
            page: "/collections/pisos",
            subcategories: ["SPC"]
        },
        "ZOCALOS": {
            page: "/collections/zocalos",
            subcategories: ["SPC"]
        }
    },
    Exterior: {
        "CUBIERTAS UPVC": {
            page: "/collections/cubiertas-upvc",
            subcategories: ["TEJAS"]
        },
        "FACHADAS": {
            page: "/collections/fachadas",
            subcategories: ["FACHADA", "POLIFACHADA"]
        },
        "JARDINES ARTIFICIALES": {
            page: "/collections/jardines-artificiales",
            subcategories: ["Outdoor Gardens", "Faux Foliage", "UV Resistant Plants"]
        },
        "PANELES WPC Y ANGULOS": {
            page: "/collections/paneles-wpc",
            subcategories: ["WPC Exterior"]
        },
        "PISOS DECK": {
            page: "/collections/pisos-deck",
            subcategories: ["DECK"]
        }
    }
};

const categoryIcons = {
    "PAREDES": Layers,
    "LAMINAS": Grid3X3,
    "JARDINES ARTIFICIALES": TreeDeciduous,
    "PANELES WPC Y ANGULOS": Building2,
    "PISOS": Home,
    "PISOS DECK": Home,
    "ZOCALOS": Grid3X3,
    "CUBIERTAS UPVC": Home,
    "FACHADAS": Layers,
};

const MegaMenu = () => {
    return (
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full pt-2 w-screen max-w-[1400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
            <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-2xl rounded-b-2xl border border-gray-700 overflow-hidden mx-4">
                
                {/* Top Banner */}
                <div className="bg-gray-800 px-8 py-4 flex items-center justify-between border-b border-gray-700">
                    <span className="text-white font-bold text-base uppercase tracking-wider">Premium PVC & WPC Building Materials</span>
                    <Link href="/collections" className="flex items-center gap-2 text-white text-sm font-semibold hover:text-gray-300 transition-colors bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20">
                        View All Products <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="flex">
                    {/* Interior Section */}
                    <div className="flex-1 p-8 border-r border-gray-700 hover:bg-gray-800/50 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <Home className="w-6 h-6 text-gray-400" />
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Interior</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {Object.entries(productCategories.Interior).map(([category, data]) => {
                                const Icon = categoryIcons[category] || Package;
                                return (
                                    <div key={category} className="group/item">
                                        <Link
                                            href={data.page}
                                            className="flex items-center gap-2 font-bold text-gray-100 hover:text-white mb-2 text-sm uppercase transition-colors"
                                        >
                                            <Icon className="w-5 h-5" />
                                            {category}
                                        </Link>
                                        <ul className="space-y-1 ml-7">
                                            {data.subcategories.map(sub => (
                                                <li key={sub}>
                                                    <Link
                                                        href={`${data.page}?subcategory=${sub}`}
                                                        className="text-gray-400 hover:text-white text-sm transition-colors block py-1"
                                                    >
                                                        {sub}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Exterior Section */}
                    <div className="flex-1 p-8 border-r border-gray-700 hover:bg-gray-800/50 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="w-6 h-6 text-gray-400" />
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Exterior</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {Object.entries(productCategories.Exterior).map(([category, data]) => {
                                const Icon = categoryIcons[category] || Package;
                                return (
                                    <div key={category} className="group/item">
                                        <Link
                                            href={data.page}
                                            className="flex items-center gap-2 font-bold text-gray-100 hover:text-white mb-2 text-sm uppercase transition-colors"
                                        >
                                            <Icon className="w-5 h-5" />
                                            {category}
                                        </Link>
                                        <ul className="space-y-1 ml-7">
                                            {data.subcategories.map(sub => (
                                                <li key={sub}>
                                                    <Link
                                                        href={`${data.page}?subcategory=${sub}`}
                                                        className="text-gray-400 hover:text-white text-sm transition-colors block py-1"
                                                    >
                                                        {sub}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Featured Section */}
                    <div className="w-80 bg-gradient-to-b from-gray-900 to-black p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-gray-400" />
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Featured</h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-gray-800/50 rounded-xl p-5 hover:bg-gray-700/50 transition-colors cursor-pointer group">
                                <div className="w-full h-28 bg-gray-700/50 rounded-lg mb-4 flex items-center justify-center">
                                    <Layers className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="text-white font-semibold text-base">WPC Panels</h4>
                                <p className="text-gray-400 text-sm mt-1">Premium quality composite panels</p>
                            </div>
                            
                            <div className="bg-gray-800/50 rounded-xl p-5 hover:bg-gray-700/50 transition-colors cursor-pointer group">
                                <div className="w-full h-28 bg-gray-700/50 rounded-lg mb-4 flex items-center justify-center">
                                    <TreeDeciduous className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="text-white font-semibold text-base">Artificial Gardens</h4>
                                <p className="text-gray-400 text-sm mt-1">Zero maintenance green solutions</p>
                            </div>
                        </div>

                        <Link 
                            href="/collections/sales" 
                            className="mt-6 block text-center bg-white hover:bg-gray-200 text-black font-bold py-3 px-4 rounded-lg text-sm transition-colors"
                        >
                            View Sales
                        </Link>
                    </div>
                </div>

                {/* Bottom Banner */}
                <div className="bg-gray-900 px-8 py-3 flex items-center justify-between border-t border-gray-700">
                    <span className="text-gray-400 text-sm">Free shipping on orders over $5,000</span>
                    <span className="text-gray-400 text-sm">15-25 Year Warranties</span>
                    <span className="text-gray-400 text-sm">Global Shipping</span>
                </div>

            </div>
        </div>
    );
};

export default MegaMenu;
