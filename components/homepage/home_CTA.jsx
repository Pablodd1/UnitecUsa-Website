"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import MyButton from "My_UI/btn/main"
import { useBrand } from "lib/BrandContext"

export default function HomeCTA() {
    const { t } = useLanguage();
    const { activeBrand } = useBrand();

    return (
        <section className="py-24 bg-black text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-4 text-center"
            >
                <h2 className="text-3xl font-bold">
                    {t("cta.title", activeBrand)}
                </h2>

                <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                    {t("cta.text", activeBrand)}
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 flex justify-center"
                >
                    <MyButton
                        label={t("cta.btn", activeBrand)}
                        href="/collections"
                        className={{
                            btn: "bg-secondary px-5 py-2 h-10 hover:bg-primary transition-all duration-300",
                            label: " "
                        }}
                        icon={<motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ArrowRight size={16} />
                        </motion.div>}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
