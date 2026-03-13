"use client";

import AddToContainer from "My_UI/cart/addToContainer";
import GetFinalPrice from "My_UI/getFinalPrice";
import { useLanguage } from "lib/LanguageContext";
import { useBrand } from "lib/BrandContext";

const buyBoxTranslations = {
    en: {
        inStock: "In Stock",
        shipsWithin: "Usually ships within 2-3 work days.",
        shipsFrom: "Ships from",
        soldBy: "Sold by",
        returns: "Returns",
        eligibleForReturn: "Eligible for Return",
        secureTransaction: "Secure transaction"
    },
    es: {
        inStock: "En Stock",
        shipsWithin: "Generalmente envía dentro de 2-3 días hábiles.",
        shipsFrom: "Envía desde",
        soldBy: "Vendido por",
        returns: "Devoluciones",
        eligibleForReturn: "Elegible para devolución",
        secureTransaction: "Transacción segura"
    }
};

export function BuyBox({ product }) {
    const { language } = useLanguage();
    const { activeBrand } = useBrand();
    
    const t = buyBoxTranslations[language] || buyBoxTranslations.en;
    const companyName = activeBrand === 'unitec' ? 'UNITEC USA Design' : 'Building Innovation';

    return (
        <div className="lg:col-span-3 pt-2 lg:pt-6">
            <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm sticky top-24">
                <div className="text-3xl font-medium text-gray-900 mb-4">
                    <GetFinalPrice basePrice={product.basePrice} discountPercent={product.discountPercent} />
                </div>

                <div className="mb-4">
                    <div className="text-green-700 font-semibold text-base mb-1">{t.inStock}</div>
                    <div className="text-sm text-gray-600">{t.shipsWithin}</div>
                </div>

                <div className="mb-6 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">{t.shipsFrom}</span>
                        <span className="font-semibold">{companyName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">{t.soldBy}</span>
                        <span className="font-semibold">{companyName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">{t.returns}</span>
                        <span className="font-semibold text-blue-600">{t.eligibleForReturn}</span>
                    </div>
                </div>

                <AddToContainer
                    item={{
                        id: product.id,
                        dimensions: product.dimensions,
                        price: product.basePrice,
                        name: product.name,
                        image: product.image?.url || product.image || '/raster/product.jpg'
                    }}
                    isProductPage
                />
                
                <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-xs text-center border-t border-gray-100 pt-4">
                    <span>🔒 {t.secureTransaction}</span>
                </div>
            </div>
        </div>
    );
}
