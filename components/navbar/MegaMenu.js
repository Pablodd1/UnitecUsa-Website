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
    LayoutGrid,
    Trees,
    Sparkles,
    Zap,
    Pipette,
    Maximize,
    Box,
    PanelTop,
    Waves
} from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'utils/BrandContext';

const productCategories = {
    Interior: {
        "CIELO RASO PVC": {
            page: "/collections/interior",
            icon: PanelTop,
            collection: "INTERIOR",
            subcategories: []
        },
        "ILUMINACIÓN": {
            page: "/collections/interior",
            icon: Zap,
            collection: "INTERIOR",
            subcategories: ["Perfil LED", "Transformador LED", "Control"]
        },
        "JARDINES ARTIFICIALES": {
            page: "/collections/jardines-artificiales",
            icon: Trees,
            collection: "INTERIOR",
            subcategories: ["Línea Moss"]
        },
        "LÁMINAS": {
            page: "/collections/laminas",
            icon: LayoutGrid,
            collection: "INTERIOR",
            subcategories: ["Laminas Foam Board", "Laminas Mármol PVC", "Laminas PVC Board", "Laminas Sintéticas"]
        },
        "LISTONES": {
            page: "/collections/interior",
            icon: Layers,
            collection: "INTERIOR",
            subcategories: ["Listones PVC Cielo Raso", "Listones PVC Interior"]
        },
        "PANELES Y ÁNGULOS": {
            page: "/collections/paneles-wpc",
            icon: Building2,
            collection: "INTERIOR",
            subcategories: ["Paneles WPC Interior", "Paneles WPC redondos"]
        },
        "PAREDES": {
            page: "/collections/paredes",
            icon: Box,
            collection: "INTERIOR",
            subcategories: ["Paneles Acrílicos de Mármol", "Paneles Acolchados", "Paneles Acústicos", "Paneles PS Interior", "Paredes Acolchadas", "Paredes Muroflex", "Paredes PU ArqUnitec", "Rollos Adhesivos de mármol"]
        },
        "CINTAS Y PEGANTES": {
            page: "/collections/interior",
            icon: Pipette,
            collection: "INTERIOR",
            subcategories: ["Cinta Adhesiva Metálica", "Cinta Adhesiva de Papel", "Pegatec Blanco", "Pegatec Transparente"]
        },
        "PISOS Y ZÓCALOS": {
            page: "/collections/pisos",
            icon: Home,
            collection: "INTERIOR",
            subcategories: ["Piso SPC", "Zócalos SPC"]
        }
    },
    Exterior: {
        "CUBIERTAS": {
            page: "/collections/cubiertas-upvc",
            icon: Home,
            collection: "EXTERIOR",
            subcategories: ["Cubierta Ondulada ROMA", "UPVC 2.5mm Blanca Onda Alta", "UPVC 2.0mm Blanca Onda Baja", "Teja PVC Terracota Colonial", "Teja UPVC Tipo Zinc", "Cubierta Acanalada UPVC 11.80", "Cubierta Traslúcida Onda Alta Opal"]
        },
        "JARDINES EXTERIORES": {
            page: "/collections/jardines-artificiales",
            icon: Trees,
            collection: "EXTERIOR",
            subcategories: []
        },
        "REVESTIMIENTOS": {
            page: "/collections/fachadas",
            icon: Building2,
            collection: "EXTERIOR",
            subcategories: ["Listones WPC Exterior", "Paneles WPC Exterior", "Fachada Deck", "Fachada Exterior PVC", "Paredes Uniflex", "Polifachada"]
        },
        "PISOS DECK": {
            page: "/collections/pisos-deck",
            icon: Waves,
            collection: "EXTERIOR",
            subcategories: ["Piso Deck"]
        }
    }
};

const MegaMenu = () => {
    const { language, t } = useLanguage();
    const { brand } = useBrand();

    return (
        <div
            className="hidden lg:block absolute top-full pt-2 w-[900px] max-w-[calc(100vw-2rem)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50"
            style={{ left: 'calc(50vw - 50% - 450px)' }}
        >
            <div className="bg-white/98 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-3xl border border-gray-100 overflow-hidden">

                {/* Minimal Header */}
                <div className="bg-gray-50/80 px-10 py-4 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                        <span className="text-gray-900 font-black text-[10px] uppercase tracking-[0.2em]">
                            {language === 'es' ? brand.heroTagline_es : brand.heroTagline}
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
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">{t('nav.interiors')}</h3>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{language === 'es' ? 'Soluciones Internas' : 'Indoor Solutions'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-y-7">
                            {Object.entries(productCategories.Interior).map(([category, data]) => {
                                // Simple mapping for category keys to translation keys
                                // Helper to map category names to translation keys
                                const getCatKey = (name) => {
                                    if (name === "CIELO RASO PVC") return "cieloRasoPvc";
                                    if (name === "ILUMINACIÓN") return "iluminacion";
                                    if (name === "JARDINES ARTIFICIALES") return "jardinesArtificiales";
                                    if (name === "LÁMINAS") return "laminas";
                                    if (name === "LISTONES") return "listones";
                                    if (name === "PANELES Y ÁNGULOS") return "panelesWpc";
                                    if (name === "PAREDES") return "paredes";
                                    if (name === "CINTAS Y PEGANTES") return "complementos";
                                    if (name === "PISOS Y ZÓCALOS") return "pisos";
                                    return name.toLowerCase().replace(/ /g, '');
                                };
                                const tKey = `nav.${getCatKey(category)}`;

                                return (
                                    <div key={category} className="group/item">
                                        <Link
                                            href={`${data.page}?category=${category}&collection=${data.collection}`}
                                            className="flex items-center gap-3 font-bold text-gray-900 group-hover/item:text-blue-600 mb-3 text-xs uppercase tracking-widest transition-all"
                                        >
                                            <data.icon className="w-4 h-4" />
                                            {t(tKey) !== tKey ? t(tKey) : category}
                                        </Link>
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 ml-1 border-l-2 border-gray-100 pl-4 py-1">
                                            {data.subcategories.map(sub => {
                                                const getSubKey = (name) => {
                                                    if (name === "Perfil LED") return "perfilLed";
                                                    if (name === "Transformador LED") return "transformadorLed";
                                                    if (name === "Control") return "control";
                                                    if (name === "Línea Moss") return "lineaMoss";
                                                    if (name === "Laminas Foam Board") return "laminasFoamBoard";
                                                    if (name === "Laminas Mármol PVC") return "laminasMarmolPvc";
                                                    if (name === "Laminas PVC Board") return "laminasPvcBoard";
                                                    if (name === "Laminas Sintéticas") return "laminasSinteticas";
                                                    if (name === "Listones PVC Cielo Raso") return "listonesPvcCieloRaso";
                                                    if (name === "Listones PVC Interior") return "listonesPvcInterior";
                                                    if (name === "Paneles WPC Interior") return "panelesWpcInterior";
                                                    if (name === "Paneles WPC redondos") return "panelesWpcRedondos";
                                                    if (name === "Paneles Acrílicos de Mármol") return "panelesAcrilicosMarmol";
                                                    if (name === "Paneles Acolchados") return "panelesAcolchados";
                                                    if (name === "Paneles Acústicos") return "panelesAcusticos";
                                                    if (name === "Paneles PS Interior") return "panelesPsInterior";
                                                    if (name === "Paredes Acolchadas") return "paredesAcolchadas";
                                                    if (name === "Paredes Muroflex") return "paredesMuroflex";
                                                    if (name === "Paredes PU ArqUnitec") return "paredesPuArqUnitec";
                                                    if (name === "Rollos Adhesivos de mármol") return "rollosAdhesivosMarmol";
                                                    if (name === "Cinta Adhesiva Metálica") return "cintaAdhesivaMetalica";
                                                    if (name === "Cinta Adhesiva de Papel") return "cintaAdhesivaPapel";
                                                    if (name === "Pegatec Blanco") return "pegatecBlanco";
                                                    if (name === "Pegatec Transparente") return "pegatecTransparente";
                                                    if (name === "Piso SPC") return "pisoSpc";
                                                    if (name === "Zócalos SPC") return "zocalosSpc";
                                                    return name.toLowerCase().replace(/ /g, '');
                                                };
                                                const tSubKey = `nav.${getSubKey(sub)}`;

                                                return (
                                                    <Link
                                                        key={sub}
                                                        href={`${data.page}?subcategory=${sub}&collection=${data.collection}`}
                                                        className="text-gray-400 hover:text-gray-900 text-[10px] font-black uppercase transition-all whitespace-nowrap hover:scale-105"
                                                    >
                                                        {t(tSubKey) !== tSubKey ? t(tSubKey) : sub}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            href="/collections/interior"
                            className="flex items-center justify-center gap-3 bg-blue-600 text-white py-4 mt-12 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all shadow-md group/all"
                        >
                            {language === 'es' ? 'Explorar Todo Interior' : 'Explore All Interior'}
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
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">{t('nav.exteriors')}</h3>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{language === 'es' ? 'Resistencia Climática' : 'Climate Resistant'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-y-7">
                            {Object.entries(productCategories.Exterior).map(([category, data]) => {
                                const getCatKey = (name) => {
                                    if (name === "CUBIERTAS") return "cubiertas";
                                    if (name === "JARDINES EXTERIORES") return "jardinesArtificiales";
                                    if (name === "REVESTIMIENTOS") return "fachadas";
                                    if (name === "PISOS DECK") return "pisosdeck";
                                    return name.toLowerCase().replace(/ /g, '');
                                };
                                const tKey = `nav.${getCatKey(category)}`;

                                return (
                                    <div key={category} className="group/item">
                                        <Link
                                            href={`${data.page}?collection=${data.collection}`}
                                            className="flex items-center gap-3 font-bold text-gray-900 group-hover/item:text-emerald-700 mb-3 text-xs uppercase tracking-widest transition-all"
                                        >
                                            <data.icon className="w-4 h-4" />
                                            {t(tKey) !== tKey ? t(tKey) : category}
                                        </Link>
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 ml-1 border-l-2 border-gray-100 pl-4 py-1">
                                            {data.subcategories.map(sub => {
                                                const getSubKey = (name) => {
                                                    if (name === "Ondulada ROMA") return "cubiertaOnduladaRoma";
                                                    if (name === "UPVC 2.5mm Blanca Onda Alta") return "upvc25Alta";
                                                    if (name === "UPVC 2.0mm Blanca Onda Baja") return "upvc20Baja";
                                                    if (name === "Teja PVC Terracota Colonial") return "tejaPvcTerracota";
                                                    if (name === "Teja UPVC Tipo Zinc") return "tejaUpvcZinc";
                                                    if (name === "Cubierta Acanalada UPVC 11.80") return "acanaladaUpvc1180";
                                                    if (name === "Cubierta Traslúcida Onda Alta Opal") return "traslucidaOndaAltaOpal";
                                                    if (name === "Listones WPC Exterior") return "listonesWpcExterior";
                                                    if (name === "Paneles WPC Exterior") return "panelesWpcExterior";
                                                    if (name === "Fachada Deck") return "fachadaDeck";
                                                    if (name === "Fachada Exterior PVC") return "fachadaExteriorPvc";
                                                    if (name === "Paredes Uniflex") return "paredesUniflex";
                                                    if (name === "Polifachada") return "polifachada";
                                                    if (name === "Piso Deck") return "pisosdeck";
                                                    return name.toLowerCase().replace(/ /g, '');
                                                };
                                                const tSubKey = `nav.${getSubKey(sub)}`;

                                                return (
                                                    <Link
                                                        key={sub}
                                                        href={`${data.page}?subcategory=${sub}&collection=${data.collection}`}
                                                        className="text-gray-400 hover:text-gray-900 text-[10px] font-black uppercase transition-all whitespace-nowrap hover:scale-105"
                                                    >
                                                        {t(tSubKey) !== tSubKey ? t(tSubKey) : sub}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            href="/collections/exterior"
                            className="flex items-center justify-center gap-3 bg-emerald-600 text-white py-4 mt-12 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all shadow-md group/all"
                        >
                            {language === 'es' ? 'Explorar Todo Exterior' : 'Explore All Exterior'}
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
