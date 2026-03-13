"use client"

import { motion } from "framer-motion"
import { Boxes, Ruler, Layers3, ShieldCheck } from "lucide-react"
import Stylish_H2 from "My_UI/stylish_h2"
import { useBrand } from "lib/BrandContext"

export default function BuiltForBulk() {
    const { t } = useLanguage();
    const { activeBrand } = useBrand();

    const FEATURES = [
        {
            icon: Boxes,
            title: t("bulk.features.container.title", activeBrand),
            desc: t("bulk.features.container.desc", activeBrand),
        },
        {
            icon: Ruler,
            title: t("bulk.features.volume.title", activeBrand),
            desc: t("bulk.features.volume.desc", activeBrand),
        },
        {
            icon: Layers3,
            title: t("bulk.features.multi.title", activeBrand),
            desc: t("bulk.features.multi.desc", activeBrand),
        },
        {
            icon: ShieldCheck,
            title: t("bulk.features.logistics.title", activeBrand),
            desc: t("bulk.features.logistics.desc", activeBrand),
        },
    ]

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className=""
                >
                    <Stylish_H2 h2={t("bulk.title", activeBrand)} />
                    <p className="mt-4 text-gray-600 text-sm">
                        {t("bulk.subtitle", activeBrand)}
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ 
                                scale: 1.05, 
                                y: -10,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                            }}
                            className="rounded-2xl border bg-white p-6 cursor-pointer transition-all duration-300 group"
                        >
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.6 }}
                            >
                                <f.icon className="mb-4 group-hover:text-primary transition-colors duration-300" size={26} />
                            </motion.div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors duration-300">{f.title}</h3>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
