// Trigger Vercel rebuild: 2026-03-17T17:05:00Z
"use client"

import React from "react"
import FlameProgress from "./FlameProgress.jsx"
import ThreeContainer from "./ThreeContainer.jsx"
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
  const [textureSeed, setTextureSeed] = React.useState(0)
  const textures = [
    "/assets/containers/container_texture_01.svg",
    "/assets/containers/container_texture_02.svg",
    "/assets/containers/container_texture_03.svg",
    "/assets/containers/container_texture_04.svg",
  ]
  const textureIndex = textureSeed % textures.length
  // Enable true 3D container rendering by default
  const enableThreeD = true
  // World size for the 3D container (adjust to taste)
  const worldW = Math.max(0.5, displayLength / 40)
  const worldH = Math.max(0.5, displayHeight / 40)
  const worldL = Math.max(0.5, displayLength / 40)

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        width: displayLength,
        height: displayHeight + 20,
        perspective: "1200px"
      }}
      whileHover={isInteractive ? { scale: 1.02 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      onClick={isInteractive ? onSelect : undefined}
    >
      {/* Container Box - Hyperrealistic 3D Effect (Three.js true 3D container overlay) */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(-15deg) rotateY(-25deg)",
          boxShadow: "20px 30px 40px rgba(0,0,0,0.3)"
        }}
      >
        {enableThreeD && (
          <div className="absolute inset-0 z-20" style={{ pointerEvents: 'none' }}>
            <ThreeContainer width={worldW} height={worldH} length={worldL} textures={textures} />
          </div>
        )}
        {/* Fallback CSS 3D visuals below will render underneath the Three.js canvas */}
      </div>
        {/* Top Face */}
        <motion.div
          className="absolute border-2 border-gray-600"
          style={{
            backgroundImage: `url(${textures[textureIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: displayLength,
            height: displayWidth,
            transform: `translateZ(${displayHeight / 2}px)`,
            transformOrigin: "center",
            left: 0,
            top: displayHeight / 4,
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)"
          }}
        />

        {/* Front Face (Open Door showing inside) */}
        <motion.div
          className="absolute border-2 border-gray-700 bg-gray-900"
          style={{
            width: displayLength,
            height: displayHeight,
            transform: `rotateX(-90deg) translateZ(${displayWidth / 2}px)`,
            transformOrigin: "center bottom",
            boxShadow: "inset 0px 10px 30px 10px rgba(0,0,0,0.9)"
          }}
        >
          {/* Items inside container */}
          {items.length > 0 && (
            <div
              className="absolute bottom-0 left-0"
              style={{
                width: displayLength * 0.95,
                height: displayHeight * (fillPercent / 100),
                display: "flex",
                flexWrap: "wrap-reverse",
                alignContent: "flex-start",
                gap: "2px",
                padding: "4px",
                overflow: "hidden"
              }}
            >
              {items.slice(0, 40).map((item, index) => {
                  const itemWidth = React.useMemo(() => 20 + Math.random() * 20, [])
                  const itemHeight = React.useMemo(() => 20 + Math.random() * 30, [])
                  return (
                    <motion.div
                      key={index}
                      className="rounded-sm shadow-md border border-white/20"
                      style={{
                        backgroundColor: item.color || "#60A5FA",
                        width: `${itemWidth}px`,
                        height: `${itemHeight}px`,
                        boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.3), 2px 2px 5px rgba(0,0,0,0.5)"
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                    />
                  )
                })}
            </div>
          )}

          {/* Left Door open */}
          <div
            className="absolute top-0 left-0 h-full border-r-2 border-gray-800"
            style={{
              width: "50%",
              transformOrigin: "left",
              transform: "rotateY(-110deg)",
              background: `
                linear-gradient(to right, rgba(0,0,0,0.6), rgba(255,255,255,0.1)),
                repeating-linear-gradient(0deg, #1e3a8a 0px, #1e3a8a 15px, #1d4ed8 15px, #1d4ed8 30px)
              `,
              boxShadow: "inset 2px 0 10px rgba(0,0,0,0.5)"
            }}
          >
             <div className="absolute right-2 top-1/4 w-1 h-1/2 bg-gray-400 rounded-sm shadow-sm" />
          </div>

          {/* Right Door open */}
          <div
            className="absolute top-0 right-0 h-full border-l-2 border-gray-800"
            style={{
              width: "50%",
              transformOrigin: "right",
              transform: "rotateY(110deg)",
              background: `
                linear-gradient(to left, rgba(0,0,0,0.6), rgba(255,255,255,0.1)),
                repeating-linear-gradient(0deg, #1e3a8a 0px, #1e3a8a 15px, #1d4ed8 15px, #1d4ed8 30px)
              `,
              boxShadow: "inset -2px 0 10px rgba(0,0,0,0.5)"
            }}
          >
             <div className="absolute left-2 top-1/4 w-1 h-1/2 bg-gray-400 rounded-sm shadow-sm" />
             <div className="absolute left-4 top-1/3 w-8 h-12 bg-yellow-500/80 rounded flex items-center justify-center text-[6px] font-bold">INFO</div>
          </div>
        </motion.div>

        {/* Right Face (Side of container) */}
        <motion.div
          className="absolute border-2 border-gray-600"
          style={{
            width: displayWidth,
            height: displayHeight,
            transform: `rotateY(90deg) translateZ(${displayLength / 2}px)`,
            transformOrigin: "center right",
            background: `
              linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(0,0,0,0.4)),
              repeating-linear-gradient(90deg, #1e3a8a 0px, #1e3a8a 20px, #1d4ed8 20px, #1d4ed8 40px)
            `,
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)"
          }}
        >
           {/* Container Decals */}
           <div className="absolute top-4 right-4 text-white/70 font-mono text-xs tracking-widest rotate-90 origin-top-right">
              {size.includes('40') ? '45G1' : '22G1'}
           </div>
           <div className="absolute top-4 left-4 w-16 h-4 bg-white/80 rounded-sm flex items-center justify-center text-[8px] font-bold text-blue-900">
              B.I. LOGISTICS
           </div>
        </motion.div>
      </div>

      {/* Fill Level Indicator */}
      <div
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full"
      >
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-gray-100">
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full relative"
              style={{ backgroundColor: fillColor, width: `${Math.min(fillPercent, 100)}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(fillPercent, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-white/20 w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
            </motion.div>
          </div>
          <span className="text-sm font-bold text-gray-700 min-w-[45px] text-right">
            {fillPercent.toFixed(0)}%
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 6 }}>
          <FlameProgress percent={fillPercent} />
        </div>
      </div>

      {/* Regenerate Textures Button */}
      <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => setTextureSeed((s) => (s + 1) % textures.length)}
          className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
        >
          Regenerate Textures
        </button>
      </div>
      {/* Size Label */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
        {size} ({width}m × {length}m × {height}m)
      </div>
    </motion.div>
  )
}
