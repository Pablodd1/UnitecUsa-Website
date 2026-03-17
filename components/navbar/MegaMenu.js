"use client";

import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Home,
    Building2,
    LayoutGrid,
    Trees,
    Sparkles,
    Zap,
    Maximize,
    Box,
    PanelTop,
    Waves,
    Sun,
    Square,
    RectangleHorizontal,
    Grid3X3,
    Palette,
    Droplets,
    ChevronDown
} from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'utils/BrandContext';

const productCategories = {
    Interior: {
        "CIELO RASO PVC": {
            page: "/collections/interior",
            icon: PanelTop,
            collection: "INTERIOR",
            subcategories: ["CIELO RASO PVC"]
        },
        "ILUMINACIÓN": {
            page: "/collections/interior",
            icon: Zap,
            collection: "INTERIOR",
            subcategories: ["ILUMINACION"]
        },
        "JARDINES ARTIFICIALES": {
            page: "/collections/jardines-artificiales",
            icon: Trees,
            collection: "INTERIOR",
            subcategories: ["JARDINES INTERIOR", "JARDINES MOSS"]
        },
        "LÁMINAS": {
            page: "/collections/laminas",
            icon: Grid3X3,
            collection: "INTERIOR",
            subcategories: ["FOAM BOARD", "LAMINAS MARMOL PVC", "LAMINAS PVC BOARD", "LAMINAS SINTETICAS"]
        },
        "PANELES WPC": {
            page: "/collections/paneles-wpc",
            icon: Square,
            collection: "INTERIOR",
            subcategories: ["PANELES WPC INTERIOR", "PANELES WPC REDONDOS"]
        },
        "PAREDES": {
            page: "/collections/paredes",
            icon: RectangleHorizontal,
            collection: "INTERIOR",
            subcategories: ["PANEL PS", "PANELES ACUSTICOS", "PANELES ACOLCHADOS", "PAREDES ACOLCHADAS", "PAREDES MUROFLEX", "PAREDES PU ARQUNITEC", "ROLLOS ADHESIVOS DE MARMOL", "PANELES ACRILICOS MARMOL"]
        },
        "CINTAS": {
            page: "/collections/cintas",
            icon: Palette,
            collection: "INTERIOR",
            subcategories: ["CINTA ADHESIVA DE PAPEL", "CINTA ADHESIVA METALICA"]
        },
        "PEGANTES": {
            page: "/collections/pegantes",
            icon: Droplets,
            collection: "INTERIOR",
            subcategories: ["PEGANTES"]
        },
        "PISOS": {
            page: "/collections/pisos",
            icon: Home,
            collection: "INTERIOR",
            subcategories: ["PISOS SPC"]
        },
        "ZÓCALOS": {
            page: "/collections/zocalos",
            icon: Maximize,
            collection: "INTERIOR",
            subcategories: ["ZOCALOS SPC"]
        }
    },
    Exterior: {
        "CUBIERTAS": {
            page: "/collections/cubiertas-upvc",
            icon: Sun,
            collection: "EXTERIOR",
            subcategories: ["CUBIERTA ACANALADA UPVC BLANCA 11.80", "CUBIERTA ONDULADA ROMA", "CUBIERTA TERMOACUSTICA UPVC 2.0mm BLANCA ONDA BAJA", "CUBIERTA TERMOACUSTICA UPVC 2.5mm BLANCA ONDA ALTA", "CUBIERTA TRASLUCIDA ONDA ALTA OPAL", "LAMINA ALVEOLAR POLICARBONATO", "TEJA PVC TERRACOTA COLONIAL", "TEJA UPVC TIPO ZINC"]
        },
        "JARDINES EXTERIORES": {
            page: "/collections/jardines-artificiales",
            icon: Trees,
            collection: "EXTERIOR",
            subcategories: ["JARDINES EXTERIOR"]
        },
        "FACHADA DECK": {
            page: "/collections/fachada-deck",
            icon: Box,
            collection: "EXTERIOR",
            dbCategory: "PAREDES",
            dbSubcategory: "FACHADA DECK",
            subcategories: ["FACHADA DECK"]
        },
        "FACHADA EXTERIOR PVC": {
            page: "/collections/fachada-exterior-pvc",
            icon: LayoutGrid,
            collection: "EXTERIOR",
            dbCategory: "PAREDES",
            dbSubcategory: "FACHADA EXTERIOR PVC",
            subcategories: ["FACHADA EXTERIOR PVC"]
        },
        "LISTONES WPC": {
            page: "/collections/listones-wpc-exterior",
            icon: Maximize,
            collection: "EXTERIOR",
            dbCategory: "LISTONES",
            dbSubcategory: "LISTONES WPC EXTERIOR",
            subcategories: ["LISTONES WPC EXTERIOR"]
        },
        "PANELES WPC": {
            page: "/collections/paneles-wpc-exterior",
            icon: Square,
            collection: "EXTERIOR",
            dbCategory: "PANELES WPC Y ANGULOS",
            dbSubcategory: "PANELES WPC EXTERIOR",
            subcategories: ["PANELES WPC EXTERIOR"]
        },
        "PAREDES UNIFLEX": {
            page: "/collections/paredes-uniflex",
            icon: RectangleHorizontal,
            collection: "EXTERIOR",
            dbCategory: "PAREDES",
            dbSubcategory: "PAREDES UNIFLEX",
            subcategories: ["PAREDES UNIFLEX"]
        },
        "POLIFACHADA": {
            page: "/collections/polifachada",
            icon: Grid3X3,
            collection: "EXTERIOR",
            dbCategory: "PAREDES",
            dbSubcategory: "POLIFACHADA",
            subcategories: ["POLIFACHADA"]
        },
        "PISOS DECK": {
            page: "/collections/pisos-deck",
            icon: Waves,
            collection: "EXTERIOR",
            dbCategory: "PISOS",
            dbSubcategory: "PISOS DECK",
            subcategories: ["PISOS DECK"]
        }
    }
};

const MegaMenu = () => {
    const { language, t } = useLanguage();
    const { brand } = useBrand();

    return (
        <div
            className="hidden lg:block absolute top-full pt-2 w-[750px] max-w-[calc(100vw-2rem)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50"
            style={{ left: 'calc(50vw - 50% - 375px)' }}
        >
            <div className="bg-white/98 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl border border-gray-100 overflow-hidden">

                {/* Minimal Header */}
                <div className="bg-gray-50/80 px-6 py-3 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                        <span className="text-gray-900 font-black text-[10px] uppercase tracking-[0.2em]">
                            {language === 'es' ? brand.heroTagline_es : brand.heroTagline}
                        </span>
                    </div>
                </div>

                <div className="flex divide-x divide-gray-100 h-full min-h-[320px]">
                    {/* Interior Section */}
                    <div className="flex-1 p-5 bg-white hover:bg-gray-50/30 transition-colors">
                        <Link
                            href="/collections/interior?collection=INTERIOR"
                            className="flex items-center gap-3 mb-5"
                        >
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                                <Home className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter leading-none">{t('nav.interiors')}</h3>
                                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{language === 'es' ? 'Soluciones Internas' : 'Indoor Solutions'}</span>
                            </div>
                        </Link>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                 {Object.entries(productCategories.Interior).map(([category, data]) => {
                                 const getCatKey = (name) => {
                                     if (name === "CIELO RASO PVC") return "cielorasopvc";
                                     if (name === "ILUMINACIÓN") return "iluminacion";
                                     if (name === "JARDINES ARTIFICIALES") return "jardinesArtificiales";
                                     if (name === "LÁMINAS") return "laminas";
                                     if (name === "PANELES WPC") return "panelesWpc";
                                     if (name === "PAREDES") return "paredes";
                                     if (name === "CINTAS") return "cintas";
                                     if (name === "PEGANTES") return "pegantes";
                                     if (name === "PISOS") return "pisos";
                                     if (name === "ZÓCALOS") return "zocalos";
                                     return name.toLowerCase().replace(/ /g, '').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u');
                                 };
                                 const tKey = `nav.${getCatKey(category)}`;

                                 // Determine DB tags for link
                                 const catParam = data.dbCategory || category;
                                 const href = `${data.page}?category=${catParam}&collection=${data.collection}`;

                                 return (
                                     <div key={category} className="group/item">
                                         <Link
                                             href={href}
                                             className="flex items-center gap-2 font-bold text-gray-900 group-hover/item:text-blue-600 mb-1 text-[12px] uppercase tracking-widest transition-all"
                                         >
                                             <data.icon className="w-4 h-4" />
                                             {t(tKey) !== tKey ? t(tKey) : category}
                                         </Link>
                                     </div>
                                 );
                             })}
                        </div>

                        <Link
                            href="/collections/interior"
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 mt-4 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all shadow-md group/all col-span-2"
                        >
                            {language === 'es' ? 'Explorar Todo Interior' : 'Explore All Interior'}
                            <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Exterior Section */}
                    <div className="flex-1 p-5 bg-gray-50/20 hover:bg-white transition-colors">
                        <Link
                            href="/collections/exterior?collection=EXTERIOR"
                            className="flex items-center gap-3 mb-5"
                        >
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shadow-sm">
                                <Building2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter leading-none">{t('nav.exteriors')}</h3>
                                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{language === 'es' ? 'Resistencia Climática' : 'Climate Resistant'}</span>
                            </div>
                        </Link>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                 {Object.entries(productCategories.Exterior).map(([category, data]) => {
                                 const getCatKey = (name) => {
                                     if (name === "CUBIERTAS") return "cubiertas";
                                     if (name === "JARDINES EXTERIORES") return "jardinesArtificiales";
                                     if (name === "PISOS DECK") return "pisosdeck";
                                     if (name === "FACHADA DECK") return "fachadadeck";
                                     if (name === "FACHADA EXTERIOR PVC") return "fachadaexteriorpvc";
                                     if (name === "LISTONES WPC") return "listoneswpcexterior";
                                     if (name === "PANELES WPC") return "panelesWpcExterior";
                                     if (name === "PAREDES UNIFLEX") return "paredesUniflex";
                                     if (name === "POLIFACHADA") return "polifachada";
                                     return name.toLowerCase().replace(/ /g, '').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u');
                                 };
                                 const tKey = `nav.${getCatKey(category)}`;

                                 // Determine DB tags for link
                                 const catParam = data.dbCategory || category;
                                 const href = `${data.page}?category=${catParam}&collection=${data.collection}`;

                                 return (
                                     <div key={category} className="group/item">
                                         <Link
                                             href={href}
                                             className="flex items-center gap-2 font-bold text-gray-900 group-hover/item:text-emerald-700 mb-1 text-[12px] uppercase tracking-widest transition-all"
                                         >
                                             <data.icon className="w-4 h-4" />
                                             {t(tKey) !== tKey ? t(tKey) : category}
                                         </Link>
                                     </div>
                                 );
                             })}
                        </div>

                        <Link
                            href="/collections/exterior"
                            className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 mt-4 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all shadow-md group/all col-span-2"
                        >
                            {language === 'es' ? 'Explorar Todo Exterior' : 'Explore All Exterior'}
                            <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Minimal Footer */}
                <div className="bg-gray-950 py-2 px-6">
                    <span className="text-white/20 text-[7px] font-black uppercase tracking-widest">Building Innovation © 2026</span>
                </div>

            </div>
        </div>
    );
};

export default MegaMenu;
