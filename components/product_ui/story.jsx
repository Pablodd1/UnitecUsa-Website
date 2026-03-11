"use client";

import { Home, Building2, Ruler, Layers, Box, Grid3X3, Package } from "lucide-react";
import Stylish_H2 from "My_UI/stylish_h2";
import { useLanguage } from "lib/LanguageContext";

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
        notAvailable: "N/A"
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
        notAvailable: "N/D"
    }
};

export default function ProductStory({ product, description }) {
    const { language } = useLanguage();
    const t = storyTranslations[language] || storyTranslations.en;
    
    if (!product) return null;
    const { category, subcategory, collection, itemsPerBox } = product;
    
    return (
        <section className="mt-20 ">
            <Stylish_H2 h2={t.materialApplication} />

            <p className="text-sm leading-relaxed text-gray-600 max-w-4/5">
                {description}
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

            <section className="mt-10 border-t border-gray-400  pt-10 ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <HighlightItem
                        icon={<Layers  />}
                        label={t.category}
                        value={category}
                    />

                    <HighlightItem
                        icon={<Grid3X3  />}
                        label={t.type}
                        value={subcategory}
                    />

                    <HighlightItem
                        icon={<Box  />}
                        label={t.collection}
                        value={collection}
                    />

                    <HighlightItem
                        icon={<Package  />}
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
        <div className="grid relative items-start gap-4 shadow-md border-secondary border min-h-fit bg-primary px-3 py-3 rounded-2xl">

            <div className=" border-l-4 border-accent1/75 py-2 pl-2 ml-1">
                <p className="text-sm font-medium text-secondary tracking-wide">
                    {title}
                </p>
                <p className="mt-1 text-xs text-secondary/75 leading-relaxed">
                    {text}
                </p>
            </div>
            <div className="absolute top-2 right-2 mr-1 h-4/5 text-accent1/25">
                {icon}
            </div>
        </div>
    );
}

function HighlightItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4">
            <div className="mt-1 w-auto h-14 text-gray-700">
                {icon}
            </div>

            <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                    {label}
                </p>
                <p className="text-sm font-medium text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    );
}
