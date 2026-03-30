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
        "CIELO RASO PVC": { page: "/collections/interior", icon: PanelTop, collection: "INTERIOR", subcategories: ["CIELO RASO PVC"] },
        "ILUMINACION": { page: "/collections/interior", icon: Zap, collection: "INTERIOR", subcategories: ["ILUMINACION"] },
        "JARDINES ARTIFICIALES": { page: "/collections/jardines-artificiales", icon: Trees, collection: "INTERIOR", subcategories: ["JARDINES INTERIOR", "JARDINES MOSS"] },
        "LAMINAS": { page: "/collections/laminas", icon: Grid3X3, collection: "INTERIOR", subcategories: ["FOAM BOARD", "LAMINAS MARMOL PVC", "LAMINAS PVC BOARD", "LAMINAS SINTETICAS"] },
        "LISTONES": { page: "/collections/listones-wpc-exterior", icon: RectangleHorizontal, collection: "INTERIOR", subcategories: ["LISTONES PVC CIELO RASO", "LISTONES PVC INTERIOR ESTRUCTURAL"] },
        "PANELES WPC Y ANGULOS": { page: "/collections/paneles-wpc", icon: Square, collection: "INTERIOR", subcategories: ["PANELES WPC INTERIOR", "PANELES WPC REDONDOS"] },
        "PAREDES": { page: "/collections/paredes", icon: RectangleHorizontal, collection: "INTERIOR", subcategories: ["PANEL PS", "PANELES ACUSTICOS", "PANELES ACOLCHADOS", "PAREDES ACOLCHADAS", "PAREDES MUROFLEX", "PAREDES PU ARQUNITEC", "ROLLOS ADHESIVOS DE MARMOL", "PANELES ACRILICOS MARMOL", "PAREDES UNIFLEX"] },
        "CINTAS": { page: "/collections/cintas", icon: Palette, collection: "INTERIOR", subcategories: ["CINTA ADHESIVA DE PAPEL", "CINTA ADHESIVA METALICA"] },
        "PEGANTES": { page: "/collections/pegantes", icon: Droplets, collection: "INTERIOR", subcategories: ["PEGANTES"] },
        "PISOS": { page: "/collections/pisos", icon: Home, collection: "INTERIOR", subcategories: ["PISOS SPC"] },
        "ZOCALOS": { page: "/collections/zocalos", icon: Maximize, collection: "INTERIOR", subcategories: ["ZOCALOS SPC"] }
    },
    Exterior: {
        "CUBIERTAS UPVC": { page: "/collections/cubiertas-upvc", icon: Sun, collection: "EXTERIOR", subcategories: ["CUBIERTA ACANALADA UPVC BLANCA 11.80", "CUBIERTA ONDULADA ROMA", "CUBIERTA TERMOACUSTICA UPVC 2.0mm BLANCA ONDA BAJA", "CUBIERTA TERMOACUSTICA UPVC 2.5mm BLANCA ONDA ALTA", "CUBIERTA TRASLUCIDA ONDA ALTA OPAL", "LAMINA ALVEOLAR POLICARBONATO", "TEJA PVC TERRACOTA COLONIAL", "TEJA UPVC TIPO ZINC"] },
        "JARDINES ARTIFICIALES": { page: "/collections/jardines-artificiales", icon: Trees, collection: "EXTERIOR", subcategories: ["JARDINES EXTERIOR"] },
        "PAREDES": { page: "/collections/paredes", icon: Box, collection: "EXTERIOR", subcategories: ["FACHADA DECK", "FACHADA EXTERIOR PVC", "PAREDES UNIFLEX", "POLIFACHADA"] },
        "LISTONES": { page: "/collections/listones-wpc-exterior", icon: Maximize, collection: "EXTERIOR", subcategories: ["LISTONES WPC EXTERIOR"] },
        "PANELES WPC Y ANGULOS": { page: "/collections/paneles-wpc-exterior", icon: Square, collection: "EXTERIOR", subcategories: ["PANELES WPC EXTERIOR"] },
        "PISOS": { page: "/collections/pisos-deck", icon: Waves, collection: "EXTERIOR", subcategories: ["PISOS DECK"] }
    }
};

// Optional: dynamic categories fetched from API for a fully populated MegaMenu
const dynamicCategoriesEndpoint = '/API/collections?nopaginate=true'

const MegaMenu = () => {
    const { language, t } = useLanguage();
    const { brand } = useBrand();
    const [dynamicCategories, setDynamicCategories] = React.useState(null);

    // Try to fetch dynamic categories to supplement static data
    React.useEffect(() => {
        let cancelled = false;
        fetch(dynamicCategoriesEndpoint)
            .then((r) => r.json())
            .then((data) => {
                if (!cancelled) setDynamicCategories(data);
            })
            .catch(() => {
                // ignore fetch errors; fall back to static data
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div
            className="hidden lg:block absolute top-full pt-2 w-[750px] max-w-[calc(100vw-2rem)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50"
            style={{ left: 'calc(50vw - 50% - 375px)' }}
        >
            <div className="bg-white/98 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50/80 px-6 py-3 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                        <span className="text-gray-900 font-black text-[10px] uppercase tracking-[0.2em]">
                            {language === 'es' ? brand.heroTagline_es : brand.heroTagline}
                        </span>
                    </div>
                </div>

                <div className="flex divide-x divide-gray-100 h-full min-h-[320px]">
                    <div className="flex-1 p-5 bg-white hover:bg-gray-50/30 transition-colors">
                        <Link href="/collections/interior?collection=interior" className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                                <Home className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter leading-none">{t('nav.interiors')}</h3>
                                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{language === 'es' ? 'Soluciones Internas' : 'Indoor Solutions'}</span>
                            </div>
                        </Link>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {(() => {
                    // Merger of Interior data: restrict to main titles only
                    const dynInt = dynamicCategories && dynamicCategories.Interior ? Object.entries(dynamicCategories.Interior) : []
                    const staticInt = Object.entries(productCategories.Interior || {})
                    const interiorEntriesMerged = Array.from(new Map([...dynInt, ...staticInt]))
                    const allowedInterior = new Set([
                      "CIELO RASO PVC",
                      "ILUMINACION",
                      "JARDINES ARTIFICIALES",
                      "LAMINAS",
                      "LISTONES",
                      "PANELES WPC Y ANGULOS",
                      "PAREDES",
                      "CINTAS",
                      "PEGANTES",
                      "PISOS",
                      "ZOCALOS"
                    ])
                    const interiorEntriesFiltered = interiorEntriesMerged.filter(([category]) => allowedInterior.has(category))
                    const labelMap = {
                      "CIELO RASO PVC": "Cielo raso PVC",
                      "ILUMINACION": "Iluminación",
                      "JARDINES ARTIFICIALES": "Jardines Artificiales",
                      "LAMINAS": "Láminas",
                      "LISTONES": "Listones",
                      "PANELES WPC Y ANGULOS": "Paneles Ángulos",
                      "PAREDES": "Paredes",
                      "CINTAS": "Cintas",
                      "PEGANTES": "Pegantes",
                      "PISOS": "Pisos",
                      "ZOCALOS": "Zócalos"
                    }
                    return interiorEntriesFiltered.map(([category, data]) => {
                      const subParam = (data.subcategories && data.subcategories.length) ? `&subcategories=${data.subcategories.join(',')}` : ''
                      const href = `${data.page}?category=${category}&collection=${data.collection}${subParam}`
                      const label = labelMap[category] || category
                      return (
                        <div key={category} className="group/item mb-2">
                          <Link href={href} className="flex items-center gap-2 font-bold text-gray-900 group-hover/item:text-blue-600 mb-1 text-[12px] uppercase tracking-widest transition-all">
                            <data.icon className="w-4 h-4" />
                            {label}
                          </Link>
                        </div>
                      )
                    })}
                  )}
                </div>
                      )
                    })}
               </div>
                    </div>

                 <div className="flex-1 p-5 bg-gray-50/20 hover:bg-white transition-colors">
                     <Link href="/collections/exterior?collection=exterior" className="flex items-center gap-3 mb-5">
                         <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shadow-sm">
                             <Building2 className="w-5 h-5 text-emerald-600" />
                         </div>
                         <div>
                             <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter leading-none">{t('nav.exteriors')}</h3>
                             <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{language === 'es' ? 'Resistencia Climática' : 'Climate Resistant'}</span>
                         </div>
                     </Link>
                     <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                       {(() => {
                         const dynExt = dynamicCategories && dynamicCategories.Exterior ? Object.entries(dynamicCategories.Exterior) : []
                         const staticExt = Object.entries(productCategories.Exterior || {})
                         const exteriorEntriesMerged = Array.from(new Map([...dynExt, ...staticExt]))
                         const allowedExterior = new Set(["CUBIERTAS UPVC","JARDINES ARTIFICIALES","PAREDES","LISTONES","PANELES WPC Y ANGULOS","PISOS"])
                         const exteriorEntriesFiltered = exteriorEntriesMerged.filter(([category]) => allowedExterior.has(category))
                         const labelMapExt = {
                           "CUBIERTAS UPVC": "Cubiertas UPVC",
                           "JARDINES ARTIFICIALES": "Jardines Artificiales",
                           "PAREDES": "Paredes",
                           "LISTONES": "Listones",
                           "PANELES WPC Y ANGULOS": "Paneles Ángulos",
                           "PISOS": "Pisos"
                         }
                          return exteriorEntriesFiltered.map(([category, data]) => {
                            const subParam = (data.subcategories && data.subcategories.length) ? `&subcategories=${data.subcategories.join(',')}` : ''
                            const href = `${data.page}?category=${category}&collection=${data.collection}${subParam}`
                            const label = labelMapExt[category] || category
                            return (
                               <div key={category} className="group/item">
                                 <Link href={href} className="flex items-center gap-2 font-bold text-gray-900 group-hover/item:text-emerald-700 mb-1 text-[12px] uppercase tracking-widest transition-all">
                                   <data.icon className="w-4 h-4" />
                                   {label}
                                 </Link>
                               </div>
                             )
                         })}
                     </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
