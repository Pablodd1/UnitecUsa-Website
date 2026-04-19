"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "lib/LanguageContext";
import { useBrand } from "lib/BrandContext";
import { translateText } from "lib/translate";

const productTranslations = {
    en: {
        aboutThisItem: "About this item",
        engineeredFor: "Engineered for durability and high performance.",
        perfectlySuited: "Perfectly suited for",
        variousApplications: "various applications",
        itemsPerBox: "Items per box",
        inStock: "In Stock",
        shipsWithin: "Usually ships within 2-3 work days.",
        shipsFrom: "Ships from",
        soldBy: "Sold by",
        returns: "Returns",
        eligibleForReturn: "Eligible for Return",
        secureTransaction: "Secure transaction",
        ratings: "ratings",
        collection: "Collection",
        category: "Category",
        loading: "Loading translation..."
    },
    es: {
        aboutThisItem: "Acerca de este producto",
        engineeredFor: "Diseñado para durabilidad y alto rendimiento.",
        perfectlySuited: "Perfectamente adecuado para",
        variousApplications: "varias aplicaciones",
        itemsPerBox: "Artículos por caja",
        inStock: "En Stock",
        shipsWithin: "Generalmente envía dentro de 2-3 días hábiles.",
        shipsFrom: "Envía desde",
        soldBy: "Vendido por",
        returns: "Devoluciones",
        eligibleForReturn: "Elegible para devolución",
        secureTransaction: "Transacción segura",
        ratings: "calificaciones",
        collection: "Colección",
        category: "Categoría",
        loading: "Cargando traducción..."
    }
};

const categoryTranslations = {
    en: {
        "PAREDES": "Walls",
        "PISOS": "Floors",
        "TECHOS": "Ceilings",
        "FACHADAS": "Facades",
        "COMPLEMENTOS": "Accessories",
        "EXTERIOR": "Exterior",
        "INTERIOR": "Interior",
        "LAMINAS": "Panels"
    },
    es: {
        "PAREDES": "Paredes",
        "PISOS": "Pisos",
        "TECHOS": "Techos",
        "FACHADAS": "Fachadas",
        "COMPLEMENTOS": "Complementos",
        "EXTERIOR": "Exterior",
        "INTERIOR": "Interior",
        "LAMINAS": "Láminas"
    }
};

const collectionTranslations = {
    en: {
        "INTERIOR": "Interior",
        "EXTERIOR": "Exterior",
        "SALE": "Sale"
    },
    es: {
        "INTERIOR": "Interior",
        "EXTERIOR": "Exterior",
        "SALE": "Venta"
    }
};

export function ProductContent({ product }) {
    const { language } = useLanguage();
    const { activeBrand } = useBrand();
    
    const [translatedName, setTranslatedName] = useState(product.name);
    const [translatedDesc, setTranslatedDesc] = useState(product.description);
    const [isTranslating, setIsTranslating] = useState(false);
    
    const t = productTranslations[language] || productTranslations.en;
    const category = product.category || '';
    const collection = product.collection || '';
    
    const translatedCategory = categoryTranslations[language]?.[category] || category;
    const translatedCollection = collectionTranslations[language]?.[collection] || collection;
    
    const companyName = 'UNITEC USA Design';
    
    useEffect(() => {
        const translateProduct = async () => {
            // Source is es, if target is es, no need to translate
            if (language === 'es') {
                setTranslatedName(product.name);
                setTranslatedDesc(product.description);
                return;
            }
            
            setIsTranslating(true);
            try {
                const [name, desc] = await Promise.all([
                    translateText(product.name, 'en', 'es'),
                    translateText(product.description, 'en', 'es')
                ]);
                setTranslatedName(name);
                setTranslatedDesc(desc);
            } catch (error) {
                console.error('Translation error:', error);
                setTranslatedName(product.name);
                setTranslatedDesc(product.description);
            } finally {
                setIsTranslating(false);
            }
        };
        
        translateProduct();
    }, [language, product.name, product.description]);
    
    const displayName = isTranslating ? t.loading : translatedName;
    const displayDesc = isTranslating ? t.loading : translatedDesc;

    return (
        <div className="lg:col-span-4 flex flex-col pt-2 lg:pt-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                {displayName}
            </h1>
            
            <div className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-wider">
                {translatedCollection} • {translatedCategory}
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center text-yellow-500">
                        ★★★☆☆
                    </span>
                    <span className="text-blue-600 hover:underline cursor-pointer">142 {t.ratings}</span>
                </div>
            </div>

            <div className="mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-2">{t.aboutThisItem}</div>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>{displayDesc}</li>
                    <li>{t.engineeredFor}</li>
                    <li>{t.perfectlySuited} {product.subcategory?.toLowerCase() || t.variousApplications}.</li>
                    {product.itemsPerBox && <li>{t.itemsPerBox}: {product.itemsPerBox}</li>}
                </ul>
            </div>
        </div>
    );
}
