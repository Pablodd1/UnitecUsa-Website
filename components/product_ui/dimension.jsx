"use client";

import { motion } from "framer-motion";
import { UnfoldVertical, Crop, Move, Layers } from "lucide-react";
import Stylish_H2 from "My_UI/stylish_h2";

import { useLanguage } from "lib/LanguageContext";

const ICONS = {
    width: <UnfoldVertical className="text-current rotate-90 " />,
    height: <Crop className="text-current" />,
    length: <UnfoldVertical className="text-current" />,
    thickness: <Layers className="text-current" />,
};

export default function ProductDimensions({ dimension }) {
    const { language } = useLanguage();
    if (!dimension) return null;

    // Check if we have valid dimensions to show
    const hasDimensions = ['width', 'length', 'thickness'].some(key =>
        dimension?.metric?.[key] || dimension?.imperial?.[key]
    );

    if (!hasDimensions) return null;

    return (
        <section className="mt-20 w-full mx-auto px-4 md:px-0">
            <Stylish_H2 h2={language === 'es' ? "Especificaciones Técnicas" : "Technical Specifications"} />

            <div className="flex items-stretch justify-center flex-wrap w-full gap-6">
                {['width', 'length', 'thickness'].map((key) => {
                    const params = language === 'es' ? dimension?.metric : dimension?.imperial;

                    const val = params?.[key];
                    const unit = params?.[`${key}Unit`];

                    if (!val) return null;

                    return (
                        <motion.div
                            key={key}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 w-full md:w-64 flex flex-col items-center gap-4 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-yellow-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                            <div className="flex items-center justify-center w-14 h-14 bg-gray-50 text-gray-800 rounded-full group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                                {ICONS[key] || <Layers className="text-current w-6 h-6" />}
                            </div>

                            <div className="text-center">
                                <p className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.2em] mb-2">
                                    {language === 'es' ? (key === 'width' ? 'ANCHO' : key === 'length' ? 'LARGO' : 'ESPESOR') : key.toUpperCase()}
                                </p>
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-gray-800">
                                        {Number(val).toLocaleString(language === 'es' ? 'es-ES' : 'en-US', { maximumFractionDigits: 2 })}
                                        <span className="text-sm font-normal text-gray-500 pl-1">{unit}</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <p className="mt-6 text-xs text-gray-500 text-center md:text-left">
                Note: Dimensions with 0 value are not displayed. Relative bars visualize size comparisons for quick understanding.
            </p>
        </section>
    );
}
