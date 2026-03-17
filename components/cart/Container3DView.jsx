"use client"

import React from "react"
import { motion } from "framer-motion"

/**
 * Container3DView - 3D-style container visualization
 * Shows container with items inside as colored blocks
 */
export default function Container3DView({
  size = "20ft",
  width = 2.35,
  height = 2.39,
  length = 5.9,
  items = [],
  fillPercent = 0,
  isInteractive = false,
  onSelect,
  className = "",
  scale = 1
}) {
  // Calculate dimensions for display (scaled for visual)
  const displayWidth = width * 80 * scale
  const displayHeight = height * 80 * scale
  const displayLength = length * 30 * scale

  // Get fill color based on percentage
  const getFillColor = (percent) => {
    if (percent >= 100) return "#10B981" // Green
    if (percent >= 95) return "#EF4444" // Orange/Red
    if (percent >= 70) return "#F59E0B" // Yellow
    return "#3B82F6" // Blue
  }

  const fillColor = getFillColor(fillPercent)

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        width: displayLength,
        height: displayHeight + 20,
        perspective: "1000px"
      }}
      whileHover={isInteractive ? { scale: 1.02 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      onClick={isInteractive ? onSelect : undefined}
    >
      {/* Container Box - 3D Effect */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(-20deg) rotateY(-10deg)"
        }}
      >
        {/* Top Face */}
        <motion.div
          className="absolute bg-gradient-to-b from-gray-300 to-gray-400 border-2 border-gray-500"
          style={{
            width: displayLength,
            height: displayWidth,
            transform: `translateZ(${displayHeight / 2}px)`,
            transformOrigin: "center",
            left: 0,
            top: displayHeight / 4
          }}
        />

        {/* Front Face (with door detail) */}
        <motion.div
          className="absolute bg-gradient-to-b from-green-700 to-green-800 border-2 border-gray-600"
          style={{
            width: displayLength,
            height: displayHeight,
            transform: `rotateX(-90deg) translateZ(${displayWidth / 2}px)`,
            transformOrigin: "center bottom"
          }}
        >
          {/* Door Lines */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-2 bg-gray-600 opacity-50" />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400 opacity-30" />
        </motion.div>

        {/* Right Face */}
        <motion.div
          className="absolute bg-gradient-to-r from-green-600 to-green-700 border-2 border-gray-600"
          style={{
            width: displayWidth,
            height: displayHeight,
            transform: `rotateY(90deg) translateZ(${displayLength / 2}px)`,
            transformOrigin: "center right"
          }}
        />

        {/* Items inside container */}
        {items.length > 0 && (
          <div
            className="absolute"
            style={{
              width: displayLength * 0.8,
              height: displayHeight * 0.6,
              transform: `translateZ(${displayHeight / 3}px) translateX(${displayLength * 0.1}px) translateY(${displayHeight * 0.1}px)`,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(30px, 1fr))",
              gap: "2px",
              padding: "4px"
            }}
          >
            {items.slice(0, 20).map((item, index) => (
              <motion.div
                key={index}
                className="rounded-sm"
                style={{
                  backgroundColor: item.color || "#60A5FA",
                  height: `${15 + Math.random() * 15}px`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fill Level Indicator */}
      <div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full"
      >
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: fillColor, width: `${Math.min(fillPercent, 100)}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(fillPercent, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs font-medium text-gray-600 min-w-[40px] text-right">
            {fillPercent.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Size Label */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700">
        {size} ({width}m × {length}m × {height}m)
      </div>
    </motion.div>
  )
}
