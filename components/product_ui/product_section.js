'use client';

import AddToContainer from "My_UI/cart/addToContainer";
import GetFinalPrice from "My_UI/getFinalPrice";
import Image from "next/image";
import NotFoundPage from "../../app/not-found";
import calcSheetVol from "utils/getSheetVol";
import { useLanguage } from "lib/LanguageContext";

const CONTAINERS = [
    {
        id: "20ft",
        label_en: "20ft Standard Container",
        label_es: "Contenedor Standard 20ft",
        dimensions: { length: 5.9, width: 2.35, height: 2.39 },
    },
    {
        id: "40ft",
        label_en: "40ft High Cube Container",
        label_es: "Contenedor High Cube 40ft",
        dimensions: { length: 12.03, width: 2.35, height: 2.69 },
    },
];

function calculateUnitsPerContainer(productVolume, containerVolume, itemsPerBox = 1) {
    if (!productVolume || productVolume <= 0 || !containerVolume || containerVolume <= 0) return 0;
    const unitsPerContainer = Math.floor(containerVolume / productVolume);
    const boxes = Math.floor(unitsPerContainer / itemsPerBox);
    return { units: unitsPerContainer, boxes };
}

function ContainerCapacity({ product, lang }) {
    const dimensions = product.dimensions?.metric || product.dimensions;
    const itemsPerBox = product.itemsPerBox || 1;
    
    const productVolume = calcSheetVol(dimensions);
    
    if (!productVolume.value || productVolume.value <= 0) {
        return null;
    }

    return (
        <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-4">
                {lang === 'es' ? 'Capacidad por Contenedor' : 'Container Capacity'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONTAINERS.map((container) => {
                    const containerVolume = container.dimensions.length * container.dimensions.width * container.dimensions.height;
                    const { units, boxes } = calculateUnitsPerContainer(productVolume.value, containerVolume, itemsPerBox);
                    
                    const volumeInCubicMeters = productVolume.value * units;
                    const volumeInCubicFeet = volumeInCubicMeters * 35.3147;
                    
                    return (
                        <div key={container.id} className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-sm">
                                    {lang === 'es' ? container.label_es : container.label_en}
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 space-y-1">
                                <div className="flex justify-between">
                                    <span>{lang === 'es' ? 'Unidades:' : 'Units:'}</span>
                                    <span className="font-semibold">{units.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{lang === 'es' ? 'Cajas:' : 'Boxes:'}</span>
                                    <span className="font-semibold">{boxes.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{lang === 'es' ? 'Volumen Total:' : 'Total Volume:'}</span>
                                    <span className="font-semibold">
                                        {volumeInCubicMeters.toFixed(2)} m³ / {volumeInCubicFeet.toFixed(1)} ft³
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ProductSpecifications({ product, lang }) {
    const metric = product.dimensions?.metric;
    const imperial = product.dimensions?.imperial;
    
    if (!metric && !imperial) return null;

    return (
        <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-semibold mb-3">
                {lang === 'es' ? 'Especificaciones Técnicas' : 'Technical Specifications'}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                {metric && (
                    <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium text-xs text-gray-500 mb-2 uppercase">
                            {lang === 'es' ? 'Métrico (LATAM)' : 'Metric (LATAM)'}
                        </h4>
                        <div className="space-y-1">
                            {metric.width && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{lang === 'es' ? 'Ancho:' : 'Width:'}</span>
                                    <span>{metric.width} {metric.widthUnit || 'cm'}</span>
                                </div>
                            )}
                            {metric.length && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{lang === 'es' ? 'Largo:' : 'Length:'}</span>
                                    <span>{metric.length} {metric.lengthUnit || 'cm'}</span>
                                </div>
                            )}
                            {metric.thickness && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{lang === 'es' ? 'Espesor:' : 'Thickness:'}</span>
                                    <span>{metric.thickness} {metric.thicknessUnit || 'mm'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {imperial && (
                    <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium text-xs text-gray-500 mb-2 uppercase">
                            {lang === 'es' ? 'Imperial (USA)' : 'Imperial (USA)'}
                        </h4>
                        <div className="space-y-1">
                            {imperial.width && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{lang === 'es' ? 'Ancho:' : 'Width:'}</span>
                                    <span>{imperial.width} {imperial.widthUnit || 'in'}</span>
                                </div>
                            )}
                            {imperial.length && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{lang === 'es' ? 'Largo:' : 'Length:'}</span>
                                    <span>{imperial.length} {imperial.lengthUnit || 'ft'}</span>
                                </div>
                            )}
                            {imperial.thickness && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{lang === 'es' ? 'Espesor:' : 'Thickness:'}</span>
                                    <span>{imperial.thickness} {imperial.thicknessUnit || 'in'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function PriceBreakdown({ product, lang }) {
    const basePrice = product.basePrice || 0;
    const itemsPerBox = product.itemsPerBox || 1;
    
    const pricePerUnit = basePrice;
    const pricePerBox = basePrice * itemsPerBox;
    
    const container20ft = CONTAINERS[0];
    const container40ft = CONTAINERS[1];
    
    const productVolume = calcSheetVol(product.dimensions.metric || product.dimensions);
    const volume20ft = container20ft.dimensions.length * container20ft.dimensions.width * container20ft.dimensions.height;
    const volume40ft = container40ft.dimensions.length * container40ft.dimensions.width * container40ft.dimensions.height;
    
    const units20ft = calculateUnitsPerContainer(productVolume.value, volume20ft, itemsPerBox);
    const units40ft = calculateUnitsPerContainer(productVolume.value, volume40ft, itemsPerBox);
    
    const total20ft = units20ft.units * pricePerUnit;
    const total40ft = units40ft.units * pricePerUnit;

    return (
        <div className="mt-4 bg-blue-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3">
                {lang === 'es' ? 'Información de Precios' : 'Pricing Information'}
            </h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">{lang === 'es' ? 'Precio por unidad:' : 'Price per unit:'}</span>
                    <span className="font-semibold">${pricePerUnit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">{lang === 'es' ? 'Unidades por caja:' : 'Units per box:'}</span>
                    <span className="font-semibold">{itemsPerBox}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">{lang === 'es' ? 'Precio por caja:' : 'Price per box:'}</span>
                    <span className="font-semibold">${pricePerBox.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-blue-800">
                        <span>{lang === 'es' ? 'Contenedor 20ft completo:' : '20ft Container (full):'}</span>
                        <span className="font-semibold">${total20ft.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-blue-800">
                        <span>{lang === 'es' ? 'Contenedor 40ft completo:' : '40ft Container (full):'}</span>
                        <span className="font-semibold">${total40ft.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductSection({ product }) {
    const { language: lang } = useLanguage();
    const isSpanish = lang === 'es';

    return (
        product ?
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                {/* Image */}
                <div className="flex justify-center items-center h-[400px] md:h-[500px] bg-gray-50 rounded-xl p-4 relative w-full order-1">
                    <Image
                        src={product.image?.url || product.image || '/raster/product.jpg'}
                        alt={product.name || 'Product Image'}
                        className="object-contain p-4 mix-blend-multiply"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="order-2">
                    <h1 className="text-xl md:text-2xl tracking-wide uppercase mb-2 font-bold">
                        {product.name}
                    </h1>
                    
                    {/* Category badge */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-xs rounded-full">
                            {product.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-xs rounded-full">
                            {product.subcategory}
                        </span>
                        {product.collection && (
                            <span className="px-3 py-1 bg-blue-100 text-xs rounded-full text-blue-800">
                                {product.collection}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {product.description}
                    </p>

                    {/* Price Display */}
                    <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">
                                <GetFinalPrice basePrice={product.basePrice} discountPercent={product.discountPercent} />
                            </span>
                            <span className="text-sm text-gray-500">
                                {isSpanish ? 'por unidad' : 'per unit'}
                            </span>
                        </div>
                    </div>

                    {/* Container Capacity */}
                    <ContainerCapacity product={product} lang={lang} />

                    {/* Pricing Info */}
                    <PriceBreakdown product={product} lang={lang} />

                    {/* Technical Specs Toggle */}
                    <ProductSpecifications product={product} lang={lang} />

                    {/* Add to Cart */}
                    <div className="mt-6 pt-4 border-t">
                        <AddToContainer
                            item={{
                                id: product.id,
                                name: product.name,
                                dimensions: product.dimensions,
                                price: product.basePrice,
                                itemsPerBox: product.itemsPerBox
                            }}
                            isProductPage
                        />
                    </div>
                </div>
            </section>
        : <NotFoundPage />
    );
}
