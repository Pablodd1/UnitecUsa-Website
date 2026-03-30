"use client"

import { motion } from "framer-motion"
import { useLanguage } from "lib/LanguageContext"

export default function ContainerVisual({ fillPercent = 0, containerType = "20ft" }) {
  const { language } = useLanguage()
  const isSpanish = language === 'es'
  
  const getContainerColor = () => {
    if (fillPercent >= 95) return "#22c55e"
    if (fillPercent >= 75) return "#3b82f6"
    if (fillPercent >= 50) return "#f59e0b"
    return "#ef4444"
  }

  const statusText = fillPercent >= 95 
    ? (isSpanish ? "Listo para Cotizar" : "Ready for Quote")
    : (isSpanish ? "Optimizando Espacio" : "Optimizing Space")

  return (
    <div className="relative w-full h-64 perspective-1000">
      <motion.div 
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 150" className="w-full h-full">
            <defs>
              <linearGradient id="fillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="wireframeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="100%" stopColor="#1f2937" />
              </linearGradient>
            </defs>

            <motion.path
              d="M 30 40 L 100 20 L 170 40 L 170 110 L 100 130 L 30 110 Z"
              fill="none"
              stroke="url(#wireframeGradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M 30 40 L 70 55 L 140 55 L 170 40"
              fill="none"
              stroke="url(#wireframeGradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.path
              d="M 140 55 L 140 110"
              fill="none"
              stroke="url(#wireframeGradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <motion.path
              d="M 70 55 L 70 100"
              fill="none"
              stroke="url(#wireframeGradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <motion.path
              d="M 30 110 L 70 100 L 140 100 L 170 110"
              fill="none"
              stroke="url(#wireframeGradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />

            <motion.rect
              x="35"
              y={110 - (fillPercent * 0.65)}
              width="130"
              height={fillPercent * 0.65}
              fill="url(#fillGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-center">
          <motion.div 
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold"
            style={{ 
              backgroundColor: getContainerColor(),
              color: 'white'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {fillPercent.toFixed(1)}% - {statusText}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
