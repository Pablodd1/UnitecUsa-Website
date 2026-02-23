"use client";

import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Home,
    Building2,
    Layers,
    LayoutGrid,
    Trees,
    Sparkles
} from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';

const productCategories = {
    Interior: {
        "PAREDES": {
            page: "/collections/paredes",
            icon: Layers,
            collection: "INTERIOR",
            subcategories: ["ROLLO MARMOL", "ACOLCHADO", "MARMOL", "ACUSTICO", "PANEL PS", "PU", "MUROFLEX", "UNIFLEX"]
        },
        "LAMINAS": {
            page: "/collections/laminas",
            icon: LayoutGrid,
            collection: "INTERIOR",
            subcategories: ["FOAM BOARD", "MARMOL", "PAREDES", "PVC BOARD"]
        },
        "JARDINES ARTIFICIALES": {
            page: "/collections/jardines-artificiales",
            icon: Trees,
            collection: "INTERIOR",
            subcategories: ["Vertical Gardens", "Green Walls"]
        },
        "PANELES WPC": {
            page: "/collections/paneles-wpc",
            icon: Building2,
            collection: "INTERIOR",
            subcategories: ["WPC INTERIOR"]
        },
        "PISOS": {
            page: "/collections/pisos",
            icon: Home,
            collection: "INTERIOR",
            subcategories: ["SPC"]
        },
        "ZOCALOS": {
            page: "/collections/zocalos",
            icon: LayoutGrid,
            collection: "INTERIOR",
            subcategories: ["SPC"]
        }
    },
    Exterior: {
        "CUBIERTAS UPVC": {
            page: "/collections/cubiertas-upvc",
            icon: Home,
            collection: "EXTERIOR",
            subcategories: ["TEJAS"]
        },
        "FACHADAS": {
            page: "/collections/fachadas",
            icon: Layers,
            collection: "EXTERIOR",
            subcategories: ["FACHADA", "POLIFACHADA"]
        },
        "JARDINES EXTERIORES": {
            page: "/collections/jardines-artificiales",
            icon: Trees,
            collection: "EXTERIOR",
            subcategories: ["Outdoor Gardens", "Faux Foliage"]
        },
        "WPC EXTERIOR": {
            page: "/collections/paneles-wpc",
            icon: Building2,
            collection: "EXTERIOR",
            subcategories: ["WPC EXTERIOR"]
        },
        "PISOS DECK": {
            page: "/collections/pisos-deck",
            icon: Home,
            collection: "EXTERIOR",
            subcategories: ["DECK"]
        }
    }
};

const MegaMenu = () => {
    const { lang } = useLanguage();

    return (
        <div className="hidden lg:block fixed left-1/2 -translate-x-1/2 top-[60px] pt-2 w-[900px] max-w-[calc(100vw-2rem)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
            <div className="bg-white/98 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-3xl border border-gray-100 overflow-hidden">

                {/* Minimal Header */}
                <div className="bg-gray-50/80 px-10 py-4 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                        <span className="text-gray-900 font-black text-[10px] uppercase tracking-[0.2em]">
                            {lang === 'es' ? 'Materiales de Construcción' : 'Building Materials'}
                        </span>
                    </div>
                </div>

                <div className="flex divide-x divide-gray-100 h-full min-h-[400px]">
                    {/* Interior Section */}
                    <div className="flex-1 p-10 bg-white hover:bg-gray-50/30 transition-colors">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
                                <Home className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">Interior</h3>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{lang === 'es' ? 'Soluciones Internas' : 'Indoor Solutions'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-y-7">
                            {Object.entries(productCategories.Interior).map(([category, data]) => (
                                <div key={category} className="group/item">
                                    <Link
                                        href={`${data.page}?collection=${data.collection}`}
                                        className="flex items-center gap-3 font-bold text-gray-900 group-hover/item:text-blue-600 mb-3 text-xs uppercase tracking-widest transition-all"
                                    >
                                        <data.icon className="w-4 h-4" />
                                        {category}
                                    </Link>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 ml-1 border-l-2 border-gray-100 pl-4 py-1">
                                        {data.subcategories.map(sub => (
                                            <Link
                                                key={sub}
                                                href={`${data.page}?subcategory=${sub}&collection=${data.collection}`}
                                                className="text-gray-400 hover:text-gray-900 text-[10px] font-black uppercase transition-all whitespace-nowrap hover:scale-105"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/collections/interior"
                            className="flex items-center justify-center gap-3 bg-blue-600 text-white py-4 mt-12 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all shadow-md group/all"
                        >
                            {lang === 'es' ? 'Explorar Todo Interior' : 'Explore All Interior'}
                            <ArrowRight size={16} className="group-hover/all:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Exterior Section */}
                    <div className="flex-1 p-10 bg-gray-50/20 hover:bg-white transition-colors">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-sm">
                                <Building2 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">Exterior</h3>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{lang === 'es' ? 'Resistencia Climática' : 'Climate Resistant'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-y-7">
                            {Object.entries(productCategories.Exterior).map(([category, data]) => (
                                <div key={category} className="group/item">
                                    <Link
                                        href={`${data.page}?collection=${data.collection}`}
                                        className="flex items-center gap-3 font-bold text-gray-900 group-hover/item:text-emerald-700 mb-3 text-xs uppercase tracking-widest transition-all"
                                    >
                                        <data.icon className="w-4 h-4" />
                                        {category}
                                    </Link>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 ml-1 border-l-2 border-gray-100 pl-4 py-1">
                                        {data.subcategories.map(sub => (
                                            <Link
                                                key={sub}
                                                href={`${data.page}?subcategory=${sub}&collection=${data.collection}`}
                                                className="text-gray-400 hover:text-gray-900 text-[10px] font-black uppercase transition-all whitespace-nowrap hover:scale-105"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/collections/exterior"
                            className="flex items-center justify-center gap-3 bg-emerald-600 text-white py-4 mt-12 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all shadow-md group/all"
                        >
                            {lang === 'es' ? 'Explorar Todo Exterior' : 'Explore All Exterior'}
                            <ArrowRight size={16} className="group-hover/all:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Modern Footer */}
                <div className="bg-gray-950 py-4 px-10 flex justify-between items-center">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Premium Quality</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">Sustainable Materials</span>
                        </div>
                    </div>
                    <span className="text-white/20 text-[8px] font-black uppercase tracking-widest">Building Innovation © 2026</span>
                </div>

            </div>
        </div>
    );
};

export default MegaMenu;
