'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator, Scale, Ruler, MessageCircle } from 'lucide-react';
import Stylish_H2 from 'My_UI/stylish_h2';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from 'lib/LanguageContext';
import faqsEn from 'StaticData/faqs.json';
import faqsEs from 'StaticData/faqs_es.json';

function FAQItem({ item, isOpen, onClick }) {
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-5 px-6 text-left hover:bg-gray-50 transition-colors group"
            >
                <span className={`font-medium text-lg ${isOpen ? 'text-black' : 'text-gray-600'} group-hover:text-black`}>
                    {item.question}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary transition-transform" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-black transition-transform" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed whitespace-pre-line">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ConversionCard({ title, icon: Icon, items }) {
    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                    <Icon size={20} />
                </div>
                <h3 className="font-bold text-gray-800 uppercase tracking-wide text-sm">{title}</h3>
            </div>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function FAQ_UI() {
    const { t, language } = useLanguage();
    const data = language === 'es' ? faqsEs : faqsEn;
    const faqs = data.faqs;
    const conversions = data.unitConversions;
    
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <Stylish_H2 h2={t("faq.title")} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                {/* FAQs Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                        <div className="p-6 bg-gray-50 border-b border-gray-100">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <MessageCircle className="text-primary" />
                                {t("faq.subtitle")}
                            </h3>
                        </div>
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={faq.id}
                                item={faq}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Technical Reference Section */}
                <div className="space-y-6">
                    <div className="bg-black text-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <Calculator className="text-yellow-400" />
                            {t("faq.referenceTitle")}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">
                            {t("faq.referenceSubtitle")}
                        </p>

                        <div className="space-y-4">
                            <ConversionCard title={t("nav.listones")} icon={Ruler} items={conversions.length} />
                            <ConversionCard title={t("cart.weight")} icon={Scale} items={conversions.weight} />

                            <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                                <h4 className="text-yellow-400 font-bold text-sm mb-2 uppercase">{t("faq.examples")}</h4>
                                <ul className="text-xs text-gray-300 space-y-1 font-mono">
                                    {conversions.examples.map((ex, i) => (
                                        <li key={i}>{ex}</li>
                                    ))}
                                </ul>
                            </div>

                            <p className="text-xs text-gray-500 italic border-t border-gray-800 pt-4">
                                {conversions.note}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

