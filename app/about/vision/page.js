"use client";

import React from 'react';
import { Eye, Rocket, Globe2, Users, Award, TrendingUp, Building2, MapPin } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';

export default function VisionPage() {
    const { t } = useLanguage();
    const { activeBrand } = useBrand();
    
    return (
        <main className="w-full">
            {/* Hero Section */}
            <section 
                className="bg-cover bg-center bg-no-repeat relative py-24 text-white"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/raster/containers.webp)' }}
            >
                <div className="mx-auto max-w-6xl px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider">
                        {t('about.vision.title', activeBrand)}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed italic">
                        {t('about.vision.p1', activeBrand)}
                    </p>
                </div>
            </section>

            {/* Vision Statement */}
            <section className="py-20">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-lg relative overflow-hidden">
                        <div className="flex justify-center mb-8">
                            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-xl">
                                <Eye className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 uppercase tracking-wide">
                            {activeBrand === 'unitec' ? 'Our Future Vision' : 'Where We\'re Heading'}
                        </h2>
                        
                        <p className="text-xl text-gray-700 leading-relaxed text-center mb-12">
                            {t('about.vision.p1', activeBrand)}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                    <Rocket className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Innovation Leadership</h3>
                                <p className="text-gray-600 text-sm">Pioneering the future of construction</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                    <Globe2 className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{activeBrand === 'unitec' ? 'National Reach' : 'Regional Expansion'}</h3>
                                <p className="text-gray-600 text-sm">{activeBrand === 'unitec' ? 'Across North America' : 'Across Latin American markets'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Pillars */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-wide">
                        Strategic Pillars
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-gray-200">01</span>
                            <h3 className="text-lg font-bold mb-2">Simplification</h3>
                            <p className="text-gray-600 text-sm">Making construction easier</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-gray-200">02</span>
                            <h3 className="text-lg font-bold mb-2">Design Excellence</h3>
                            <p className="text-gray-600 text-sm">Setting industry trends</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-gray-200">03</span>
                            <h3 className="text-lg font-bold mb-2">Sustainability</h3>
                            <p className="text-gray-600 text-sm">Environmental responsibility</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-gray-200">04</span>
                            <h3 className="text-lg font-bold mb-2">Partnership</h3>
                            <p className="text-gray-600 text-sm">Collaborative ecosystem</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Headquarters with Google Maps */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-black text-white p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -ml-16 -mt-16 blur-2xl" />
                            <div className="flex justify-center mb-6">
                                <MapPin className="w-12 h-12 text-yellow-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-6 uppercase tracking-widest text-center">{t('whoWeAre.headquarters.title', activeBrand)}</h3>
                            <address className="not-italic text-lg space-y-2 text-gray-300 text-center">
                                <p>{t('whoWeAre.headquarters.address', activeBrand)}</p>
                                <p>{t('whoWeAre.headquarters.city', activeBrand)}</p>
                                <p>{t('whoWeAre.headquarters.country', activeBrand)}</p>
                            </address>
                            <div className="mt-8 text-center bg-white/5 py-4 rounded-xl backdrop-blur-sm">
                                <p className="text-white font-bold text-xl tracking-wider">{t('whoWeAre.headquarters.phone', activeBrand)}</p>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden h-64 md:h-auto min-h-[300px] shadow-lg border border-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.7221458267713!2d-80.32240568497836!3d25.83166598355336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b9c2ffffffff%3A0x0!2s6120%20NW%2074th%20Ave%2C%20Doral%2C%20FL%2033166!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                                title="Office Location"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
