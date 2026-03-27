"use client"

import { motion } from "framer-motion"
import {
  Truck,
  Container,
  PackageSearch,
  ArrowRight,
} from "lucide-react"
import Stylish_H2 from "My_UI/stylish_h2"
import { useLanguage } from "lib/LanguageContext"

export default function HowShippingWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      title: t("steps.items.select.title"),
      desc: t("steps.items.select.desc"),
      icon: PackageSearch,
    },
    {
      id: 2,
      title: t("steps.items.fill.title"),
      desc: t("steps.items.fill.desc"),
      icon: Container,
    },
    {
      id: 3,
      title: t("steps.items.ship.title"),
      desc: t("steps.items.ship.desc"),
      icon: Truck,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="w-full py-20 md:py-32 my-8 md:my-14 bg-accent1">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Stylish_H2 h2={t("steps.title")} className="mb-2 text-center text-lg uppercase tracking-wider font-semibold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 md:mb-14 mt-2 text-sm text-muted-foreground text-center"
        >
          {t("steps.subtitle")}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative flex flex-col items-center rounded-xl bg-primary text-white px-5 py-8 md:py-10 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white"
                >
                  <Icon className="h-auto w-2/3 stroke-1" />
                </motion.div>

                {/* Text */}
                <h3 className="text-sm font-semibold text-white">
                  <span className="font-extrabold tracking-wider">0{index + 1}  — </span>{step.title}
                </h3>
                <p className="mt-2 text-xs text-white/80">
                  {step.desc}
                </p>

                {/* Arrow (desktop only) */}
                {index !== steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                  >
                    <ArrowRight
                      className="absolute left-full top-1/2 hidden -translate-y-1/2 text-secondary h-10 stroke-3 md:block"
                    />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Confidence footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 rounded-xl text-black px-4 py-3 text-center text-xs"
        >
          {t("steps.footer")}
        </motion.div>
      </div>
    </section>
  )
}
