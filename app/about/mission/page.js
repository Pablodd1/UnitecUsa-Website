"use client";

import React from 'react';
import { Target, Lightbulb, Heart, Globe, CheckCircle } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';

export default function MissionPage() {
    const { t, language: lang } = useLanguage();
    const { activeBrand } = useBrand();
    
    const isSpanish = lang === 'es';
    
    return (
        <main className="w-full">
            {/* Hero Section */}
            <section 
                className="bg-cover bg-center bg-no-repeat relative py-24 text-white"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/raster/containers.webp)' }}
            >
                <div className="mx-auto max-w-6xl px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider">
                        {t('about.mission.title', activeBrand)}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed italic">
                        {t('about.mission.p1', activeBrand)}
                    </p>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-20">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                                <Target className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        
                        <h2 className="text-3xl font-bold text-center mb-8 uppercase tracking-wide">
                            {isSpanish ? 'Nuestro Propósito' : 'Our Purpose'}
                        </h2>
                        
                        <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
                            {t('about.mission.p1', activeBrand)}
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lightbulb className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{isSpanish ? 'Innovación' : 'Innovation'}</h3>
                                <p className="text-gray-600">{isSpanish ? 'Desarrollando nuevos materiales y soluciones' : 'Pioneering new materials and solutions'}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{isSpanish ? 'Alianzas' : 'Partnership'}</h3>
                                <p className="text-gray-600">{isSpanish ? 'Construyendo relaciones a largo plazo' : 'Building long-term relationships'}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{isSpanish ? 'Impacto Global' : 'Global Impact'}</h3>
                                <p className="text-gray-600">{isSpanish ? 'Mejorando la calidad de vida' : 'Enhancing quality of life'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Objectives */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-wide">
                        {isSpanish ? 'Nuestros Compromisos' : 'Our Commitments'}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {t('about.mission.items', activeBrand) && Array.isArray(t('about.mission.items', activeBrand)) ? t('about.mission.items', activeBrand).map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                                <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                                <p className="text-gray-700">{item}</p>
                            </div>
                        )) : null}
                    </div>
                </div>
            </section>
        </main>
    );
}
