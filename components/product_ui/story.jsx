"use client";

import { useState, useEffect } from "react";
import { Home, Building2, Ruler, Layers, Box, Grid3X3, Package } from "lucide-react";
import Stylish_H2 from "My_UI/stylish_h2";
import { useLanguage } from "lib/LanguageContext";
import { translateText } from "lib/translate";

const storyTranslations = {
    en: {
        materialApplication: "Material & Application",
        residentialInteriors: "Residential Interiors",
        residentialText: "Ideal for modern homes, apartments, and interior detailing.",
        commercialSpaces: "Commercial Spaces",
        commercialText: "Designed for offices, retail spaces, and high-traffic areas.",
        architecturalDetailing: "Architectural Detailing",
        architecturalText: "Precision-built for clean lines, trims, and finishing elements.",
        category: "Category",
        type: "Type",
        collection: "Collection",
        packaging: "Packaging",
        itemsPerBox: "item / box",
        notAvailable: "N/A",
        loading: "Translating..."
    },
    es: {
        materialApplication: "Material y Aplicación",
        residentialInteriors: "Interiores Residenciales",
        residentialText: "Ideal para hogares modernos, apartamentos y detalles interiores.",
        commercialSpaces: "Espacios Comerciales",
        commercialText: "Diseñado para oficinas, espacios comerciales y áreas de alto tráfico.",
        architecturalDetailing: "Detalle Arquitectónico",
        architecturalText: "Construido con precisión para líneas limpias, molduras y elementos de acabado.",
        category: "Categoría",
        type: "Tipo",
        collection: "Colección",
        packaging: "Embalaje",
        itemsPerBox: "artículo / caja",
        notAvailable: "N/D",
        loading: "Traduciendo..."
    }
};

export default function ProductStory({ product, description }) {
    const { language } = useLanguage();
    const t = storyTranslations[language] || storyTranslations.en;
    
    const [translatedDesc, setTranslatedDesc] = useState(description);
    const [isTranslating, setIsTranslating] = useState(false);
    
    useEffect(() => {
        const translateDescription = async () => {
            if (language === 'en') {
                setTranslatedDesc(description);
                return;
            }
            
            setIsTranslating(true);
            try {
                const translated = await translateText(description, 'es');
                setTranslatedDesc(translated);
            } catch (error) {
                console.error('Translation error:', error);
                setTranslatedDesc(description);
            } finally {
                setIsTranslating(false);
            }
        };
        
        translateDescription();
    }, [language, description]);
    
    if (!product) return null;
    const { category, subcategory, collection, itemsPerBox } = product;
    
    return (
        <section className="mt-20 ">
            <Stylish_H2 h2={t.materialApplication} className="text-white tracking-widest uppercase text-sm md:text-lg mb-12" />

            <p className="text-sm leading-relaxed text-white max-w-4/5">
                {isTranslating ? t.loading || 'Translating...' : translatedDesc}
            </p>

            {/* Applications */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <ApplicationItem
                    icon={<Home className="h-full w-auto stroke-1" />}
                    title={t.residentialInteriors}
                    text={t.residentialText}
                />

                <ApplicationItem
                    icon={<Building2 className="h-full w-auto stroke-1" />}
                    title={t.commercialSpaces}
                    text={t.commercialText}
                />

                <ApplicationItem
                    icon={<Ruler className="h-full w-auto stroke-1"/>}
                    title={t.architecturalDetailing}
                    text={t.architecturalText}
                />
            </div>

            <section className="mt-10 border-t border-gray-400/30 pt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <HighlightItem
                        icon={<Layers className="text-gray-400" />}
                        label={t.category}
                        value={category}
                    />

                    <HighlightItem
                        icon={<Grid3X3 className="text-gray-400" />}
                        label={t.type}
                        value={subcategory}
                    />

                    <HighlightItem
                        icon={<Box className="text-gray-400" />}
                        label={t.collection}
                        value={collection}
                    />

                    <HighlightItem
                        icon={<Package className="text-gray-400" />}
                        label={t.packaging}
                        value={itemsPerBox ? `${itemsPerBox} ${t.itemsPerBox}` : t.notAvailable}
                    />
                </div>
            </section>
        </section>
    );
}

function ApplicationItem({ icon, title, text }) {
    return (
        <div className="grid relative items-start gap-4 shadow-xl border-gray-700/50 border min-h-fit bg-slate-900 px-6 py-6 rounded-3xl transition-transform hover:-translate-y-1">
            <div className="border-l-4 border-accent1/75 py-2 pl-4">
                <p className="text-base font-bold text-white tracking-wide uppercase">
                    {title}
                </p>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                    {text}
                </p>
            </div>
            <div className="absolute top-4 right-4 h-1/2 opacity-10 text-white">
                {icon}
            </div>
        </div>
    );
}

function HighlightItem({ icon, label, value }) {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 rounded-lg text-white">
                {icon}
            </div>

            <div className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                    {label}
                </p>
                <p className="text-sm font-semibold text-white leading-tight">
                    {value}
                </p>
            </div>
        </div>
    );
}
