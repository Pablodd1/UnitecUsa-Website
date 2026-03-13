"use client";

import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';

export default function WhoWeArePage() {
    const { t, getCompanyText } = useLanguage();
    const { activeBrand } = useBrand();
    
    const companyKey = activeBrand === 'unitec' ? 'unitec' : 'binw';
    const companyName = getCompanyText(companyKey, 'name');
    const companyTagline = getCompanyText(companyKey, 'tagline');
    
    const intro = t('whoWeAre.intro', activeBrand) || [];
    
    return (
        <main className="w-full">
            {/* Hero Section */}
            <section 
                className="bg-cover bg-center bg-no-repeat relative py-24 text-white"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/raster/containers.webp)' }}
            >
                <div className="mx-auto max-w-6xl px-4 relative z-10">
                    <h1 className="text-4xl font-bold mb-10 text-center uppercase tracking-wider">{t('whoWeAre.title', activeBrand)}</h1>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20 max-w-4xl">

            <section className="mb-16">
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <h2 className="text-3xl font-bold mb-2">{companyName}</h2>
                    <p className="text-xl text-gray-500 italic mb-6">{companyTagline}</p>

                    <div className="text-lg text-gray-700 leading-relaxed text-justify space-y-4">
                        {intro && Array.isArray(intro) ? intro.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        )) : null}
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-2 gap-10 mb-16">
                <div>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide border-b-2 border-primary w-fit pb-1">{t('whoWeAre.mission.title', activeBrand)}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        {t('whoWeAre.mission.text', activeBrand)}
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide border-b-2 border-primary w-fit pb-1">{t('whoWeAre.vision.title', activeBrand)}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        {t('whoWeAre.vision.text', activeBrand)}
                    </p>
                </div>
            </section>

            {/* Headquarters with Google Maps */}
            <section className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-black text-white p-8 md:p-10 rounded-2xl">
                    <div className="flex justify-center mb-6">
                        <MapPin className="w-12 h-12 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 uppercase tracking-widest text-center">{t('whoWeAre.headquarters.title', activeBrand)}</h3>
                    <address className="not-italic text-lg space-y-2 text-gray-300 text-center">
                        <p>{t('whoWeAre.headquarters.address', activeBrand)}</p>
                        <p>{t('whoWeAre.headquarters.city', activeBrand)}</p>
                        <p>{t('whoWeAre.headquarters.country', activeBrand)}</p>
                    </address>
                    <div className="mt-6 text-center">
                        <p className="text-white font-semibold">{getCompanyText(companyKey, 'headquarters.phone')}</p>
                    </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-64 md:h-auto min-h-[300px]">
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
            </section>
            </div>
        </main>
    );
}
