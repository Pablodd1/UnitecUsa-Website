"use client"

import React from "react"
import { motion } from "framer-motion"
import { Container } from "lucide-react"
import { containerFillPercent } from "lib/cart/cart.utils"

export default function MiniContainerView({ container }) {
  const { filledTotal } = containerFillPercent(container)
  
  // Get color based on fill percentage
  const getFillColor = (percent) => {
    if (percent >= 100) return "#10B981" // Green
    if (percent >= 95) return "#EF4444" // Orange/Red
    if (percent >= 70) return "#F59E0B" // Yellow
    return "#3B82F6" // Blue
  }

  const fillColor = getFillColor(filledTotal)

  const hashDelay = React.useMemo(() => {
    const hash = container.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return (hash % 20) / 100
  }, [container.name])
  
  return (
    <motion.div
      className="flex flex-col items-center py-4 px-6 border-b border-gray-100 last:border-b-0"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: hashDelay }}
    >
      {/* Container Header */}
      <div className="flex w-full items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Container className="w-5 h-5 text-gray-400" />
          <span className="text-xs font-medium text-gray-600">{container.name}</span>
        </div>
        <span className="text-xs font-medium text-gray-500">{container.items.length} items</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: fillColor, width: `${Math.min(filledTotal, 100)}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(filledTotal, 100)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Fill Percentage */}
      <div className="mt-1 text-xs font-medium text-gray-600">
        {filledTotal.toFixed(0)}% full
      </div>
    </motion.div>
  )
}
