"use client";

import { useLanguage } from "lib/LanguageContext";
import Stylish_H2 from "My_UI/stylish_h2";

export default function ProductSpecsTable({ product }) {
    const { language } = useLanguage();
    const isSpanish = language === 'es';

    if (!product) return null;

    // Derived or Default technical data for AI SEO density
    const technicalData = [
        {
            label: isSpanish ? "Material" : "Material",
            value: product.category === 'PAREDES' ? "High-Density PVC / WPC" : "Specialized Polymer Composite"
        },
        {
            label: isSpanish ? "Clasificación de Fuego" : "Fire Rating",
            value: "Class B1 (Flame Retardant)"
        },
        {
            label: isSpanish ? "Resistencia a la Humedad" : "Moisture Resistance",
            value: "100% Waterproof"
        },
        {
            label: isSpanish ? "Instalación" : "Installation",
            value: product.subcategory?.includes("SPC") ? "Click-Lock System" : "Tongue & Groove / Adhesive"
        },
        {
            label: isSpanish ? "Capacidad del Contenedor (20ft)" : "Container Capacity (20ft)",
            value: "~33m³ / Bulk Load"
        },
        {
            label: isSpanish ? "Capacidad del Contenedor (40ft)" : "Container Capacity (40ft)",
            value: "~76m³ / High Cube"
        },
        {
            label: isSpanish ? "Uso Recomendado" : "Recommended Use",
            value: "Residential & Commercial Interiors"
        }
    ];

    return (
        <section className="mt-20 w-full mx-auto px-4 md:px-0">
            <Stylish_H2 h2={isSpanish ? "Ficha Técnica de Datos" : "Technical Data Sheet"} />
            
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {isSpanish ? "Propiedad" : "Property"}
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {isSpanish ? "Valor / Especificación" : "Value / Specification"}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {technicalData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    {item.label}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {item.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-4 text-[10px] text-gray-400 italic">
                {isSpanish 
                    ? "* Estos valores son estándares de la industria para materiales de construcción premium. Solicite la ficha técnica oficial para certificaciones específicas del proyecto."
                    : "* These values are industry standards for premium building materials. Request the official technical sheet for project-specific certifications."}
            </p>
        </section>
    );
}
