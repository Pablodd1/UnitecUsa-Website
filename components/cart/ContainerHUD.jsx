"use client"

import { motion } from "framer-motion"
import { Box, Weight, AlertCircle, CheckCircle } from "lucide-react"
import { useLanguage } from "lib/LanguageContext"
import { getVolumeStats, getWeightStats, isReadyForCheckout, EFFICIENCY_THRESHOLD } from "lib/cart/experienceCart.core"

export default function ContainerHUD() {
  const { language } = useLanguage()
  const isSpanish = language === 'es'

  const volStats = getVolumeStats()
  const weightStats = getWeightStats()
  const ready = isReadyForCheckout()

  const t = {
    volumeOccupied: isSpanish ? "Volumen Ocupado" : "Volume Occupied",
    weightRemaining: isSpanish ? "Peso Restante" : "Weight Remaining",
    optimizing: isSpanish ? "Optimizando Espacio" : "Optimizing Space",
    ready: isSpanish ? "Listo para Cotizar" : "Ready for Quote",
    needMore: isSpanish ? "Añade más para proceder" : "Add more to proceed",
    cubicMeters: "m³",
    kilograms: "kg"
  }

  return (
    <div className="bg-gray-900 text-white rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          {ready ? t.ready : t.optimizing}
        </h3>
        <div className={`flex items-center gap-1 text-sm ${ready ? 'text-green-400' : 'text-amber-400'}`}>
          {ready ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Box className="w-4 h-4 text-blue-400" />
              {t.volumeOccupied}
            </span>
            <span className="font-mono font-bold">
              {volStats.percent.toFixed(1)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ 
                backgroundColor: volStats.percent >= (EFFICIENCY_THRESHOLD * 100) ? '#22c55e' : '#3b82f6'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(volStats.percent, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span>{volStats.used.toFixed(2)} / {volStats.total.toFixed(1)} {t.cubicMeters}</span>
            <span>{t.needMore} (+{volStats.needed.toFixed(2)} {t.cubicMeters})</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Weight className="w-4 h-4 text-purple-400" />
              {t.weightRemaining}
            </span>
            <span className="font-mono font-bold">
              {weightStats.percent.toFixed(1)}%
            </span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="h-full bg-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(weightStats.percent, 100)}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <span>{weightStats.used.toFixed(0)} / {weightStats.total.toLocaleString()} {t.kilograms}</span>
            <span>{weightStats.remaining.toFixed(0)} {t.kilograms} {isSpanish ? "disponible" : "available"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
