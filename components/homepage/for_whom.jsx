"use client"

import { motion } from "framer-motion"
import { Warehouse, HardHat, Ship } from "lucide-react"
import MyButton from "My_UI/btn/main"
import { useLanguage } from "lib/LanguageContext"
import { useBrand } from "lib/BrandContext"

export default function WhoItsFor() {
    const { t } = useLanguage();
    const { activeBrand } = useBrand();

    const USERS = [
        {
            icon: Warehouse,
            title: t("whom.users.wholesalers.title", activeBrand),
            desc: t("whom.users.wholesalers.desc", activeBrand),
        },
        {
            icon: HardHat,
            title: t("whom.users.importers.title", activeBrand),
            desc: t("whom.users.importers.desc", activeBrand),
        },
        {
            icon: Ship,
            title: t("whom.users.manufacturers.title", activeBrand),
            desc: t("whom.users.manufacturers.desc", activeBrand),
        },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 flex flex-col gap-6"
                    >
                        <h2 className="text-3xl lg:text-4xl font-extrabold uppercase text-slate-900 leading-tight">
                            {t("whom.title", activeBrand)}
                        </h2>
                        
                        <div className="flex flex-col gap-4 text-gray-700">
                            <p className="text-[15px] font-bold text-slate-900 leading-relaxed">
                                {t("whom.description1", activeBrand)}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed font-normal">
                                {t("whom.description2", activeBrand)}
                            </p>
                        </div>

                        <div className="mt-2">
                            <MyButton
                                label={t("whom.btn", activeBrand)}
                                href="/nosotros"
                                className={{
                                    btn: "bg-[#132c3f] hover:bg-[#1c3e57] px-6 py-2.5 h-12 hover:scale-105 transition-all duration-300 rounded-full text-white shadow-md border-none",
                                    label: "font-bold text-white uppercase text-[13px] tracking-widest"
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Right Column (Cards Stack) */}
                    <div className="lg:col-span-7 space-y-5">
                        {USERS.map((u, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.01, x: 6, borderColor: "#132c3f" }}
                                className="flex gap-5 items-start rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                            >
                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-slate-900 bg-slate-100 p-2.5 rounded-lg flex-shrink-0 mt-0.5"
                                >
                                    <u.icon className="w-6 h-6" />
                                </motion.div>
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                                        {u.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                                        {u.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
