// Trigger Vercel rebuild: 2026-03-17T17:05:00Z
"use client"

import React from "react"
import FlameProgress from "./FlameProgress.jsx"
import ThreeContainer from "./ThreeContainer.jsx"
import { motion } from "framer-motion"
import Image from "next/image"

/**
 * Container3DView - 3D-style container visualization
 * Shows container with items inside as realistic boxes
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
  const displayWidth = width * 100 * scale
  const displayHeight = height * 100 * scale
  const displayLength = length * 35 * scale

  // Get fill color based on percentage
  const getFillColor = (percent) => {
    if (percent >= 100) return "#10B981" // Green
    if (percent >= 90) return "#F59E0B" // Amber
    return "#3B82F6" // Blue
  }

  const fillColor = getFillColor(fillPercent)
  const [textureSeed, setTextureSeed] = React.useState(0)
  const textures = [
    "/assets/containers/metal_blue.png",
  ]
  const textureIndex = textureSeed % textures.length
  
  // Enable true 3D container rendering by default
  const enableThreeD = true
  // World size for the 3D container (adjust to taste)
  const worldW = Math.max(0.5, displayLength / 40)
  const worldH = Math.max(0.5, displayHeight / 40)
  const worldL = Math.max(0.5, displayLength / 40)

  // Generate boxes based on items
  const containerBoxes = React.useMemo(() => {
    return items.map((item, idx) => ({
      id: idx,
      color: item.color || "#60A5FA",
      image: item.image,
      width: 25 + (idx % 3) * 10,
      height: 25 + (idx % 2) * 15,
      delay: idx * 0.05
    })).slice(0, 50) // Limit for performance
  }, [items])

  return (
    <motion.div
      className={`relative ${className} group`}
      style={{
        width: displayLength,
        height: displayHeight + 40,
        perspective: "1500px"
      }}
      whileHover={isInteractive ? { scale: 1.02 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      onClick={isInteractive ? onSelect : undefined}
    >
      {/* 3D Container Structure */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:rotate-x-[-18deg]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(-12deg) rotateY(-20deg)",
        }}
      >
        {/* Exterior Shell (Three.js) */}
        {enableThreeD && (
          <div className="absolute inset-0 z-10 opacity-40 mix-blend-overlay pointer-events-none">
            <ThreeContainer width={worldW} height={worldH} length={worldL} textures={textures} />
          </div>
        )}

        {/* CSS 3D Model Interior */}
        {/* Back Plane (Deep Inside) */}
        <div 
            className="absolute bg-gray-900 border-2 border-gray-700" 
            style={{
                width: displayLength,
                height: displayHeight,
                transform: `translateZ(-${displayWidth/2}px)`,
                backgroundImage: "url('/assets/containers/interior.png')",
                backgroundSize: 'cover',
                boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)"
            }}
        />

        {/* Floor Face */}
        <div
          className="absolute bg-gray-800 border-2 border-gray-600"
          style={{
            width: displayLength,
            height: displayWidth,
            transform: `rotateX(90deg) translateZ(-${displayHeight / 2}px)`,
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent), url('/assets/containers/interior.png')",
            backgroundPosition: 'bottom',
            backgroundSize: '100% 200%'
          }}
        />

        {/* Side Face (Left) */}
        <div
          className="absolute border-2 border-gray-800"
          style={{
            width: displayWidth,
            height: displayHeight,
            transform: `rotateY(90deg) translateZ(-${displayLength / 2}px)`,
            backgroundImage: "url('/assets/containers/interior.png')",
            backgroundSize: 'cover',
            opacity: 0.8
          }}
        />

        {/* Side Face (Right - with Decals) */}
        <div
          className="absolute border-2 border-gray-600"
          style={{
            width: displayWidth,
            height: displayHeight,
            transform: `rotateY(90deg) translateZ(${displayLength / 2}px)`,
            backgroundImage: "linear-gradient(to right, #1e3a8a, #1d4ed8)",
            boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)"
          }}
        >
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/containers/container_texture_01.svg')", backgroundSize: 'cover' }} />
            <div className="absolute top-4 right-4 text-white/40 font-mono text-[10px] tracking-widest rotate-90 origin-top-right">
              {size.includes('40') ? '45G1' : '22G1'}
            </div>
            <div className="absolute bottom-4 left-4 p-1 bg-white/20 rounded text-[8px] font-bold text-white uppercase tracking-tighter">
                Unit ID: BI-{Math.floor(Math.random()*10000)}
            </div>
        </div>

        {/* Top Face */}
        <div
          className="absolute bg-gray-700 border-2 border-gray-600"
          style={{
            width: displayLength,
            height: displayWidth,
            transform: `rotateX(90deg) translateZ(${displayHeight / 2}px)`,
            backgroundImage: "linear-gradient(to top, #1e3a8a, #1d4ed8)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.3)"
          }}
        />

        {/* INSIDE CARGO - Realistic Boxes Stacking */}
        <div
            className="absolute inset-0 overflow-hidden"
            style={{ transform: "translateZ(0px)" }}
        >
            <div
              className="absolute bottom-0 left-0 w-full flex flex-wrap-reverse content-start justify-center gap-1 p-2"
              style={{
                height: `${fillPercent}%`,
                transition: "height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              {containerBoxes.map((box, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5, y: -100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: box.delay, type: "spring", stiffness: 200 }}
                  className="relative rounded shadow-lg border border-black/10 overflow-hidden"
                  style={{
                    width: box.width,
                    height: box.height,
                    backgroundColor: box.color,
                    backgroundImage: "url('/assets/containers/box_texture.png')",
                    backgroundSize: 'cover'
                  }}
                >
                    {box.image && (
                        <div className="absolute inset-1 bg-white/10 rounded overflow-hidden">
                            <img src={box.image} alt="cargo" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </motion.div>
              ))}
            </div>
        </div>

        {/* Front Open Doors */}
        {/* Left Door */}
        <div
          className="absolute top-0 left-0 h-full w-[50%] border-r-2 border-gray-900 origin-left transition-transform duration-700 group-hover:rotate-y-[-140deg]"
          style={{
            transform: "rotateY(-110deg)",
            backgroundImage: "linear-gradient(to right, #1e3a8a, #1d4ed8)",
            boxShadow: "4px 0 15px rgba(0,0,0,0.5)"
          }}
        >
            <div className="absolute right-2 top-1/4 w-0.5 h-1/2 bg-gray-400 rounded-sm" />
            <div className="absolute right-4 top-1/3 p-1 bg-yellow-400 text-black font-bold text-[6px] rounded leading-none">WARNING</div>
        </div>

        {/* Right Door */}
        <div
          className="absolute top-0 right-0 h-full w-[50%] border-l-2 border-gray-900 origin-right transition-transform duration-700 group-hover:rotate-y-[140deg]"
          style={{
            transform: "rotateY(110deg)",
            backgroundImage: "linear-gradient(to left, #1e3a8a, #1d4ed8)",
            boxShadow: "-4px 0 15px rgba(0,0,0,0.5)"
          }}
        >
            <div className="absolute left-2 top-1/4 w-0.5 h-1/2 bg-gray-400 rounded-sm" />
            <div className="absolute inset-4 border border-white/10 flex items-center justify-center">
                <div className="text-white/20 font-bold text-[20px] rotate-[-15deg] select-none">B.I.</div>
            </div>
        </div>
      </div>

      {/* Fill Status Label below */}
      <div className="absolute -bottom-10 left-0 w-full">
         <div className="flex items-center justify-between mb-1 px-2">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Container capacity</span>
            <span className={`text-xs font-bold ${fillPercent >= 90 ? 'text-orange-500' : 'text-blue-500'}`}>{fillPercent.toFixed(1)}%</span>
         </div>
         <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div 
               className="h-full relative"
               style={{ backgroundColor: fillColor }}
               initial={{ width: 0 }}
               animate={{ width: `${fillPercent}%` }}
               transition={{ duration: 1.5, ease: "circOut" }}
            >
               <div className="absolute inset-0 bg-white/30 animate-pulse" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
            </motion.div>
         </div>
         <div className="mt-2 flex justify-center">
            <FlameProgress percent={fillPercent} />
         </div>
      </div>

      {/* Size Badge */}
      <div className="absolute -top-6 right-2 bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-xl border border-white/20">
        HC {size}
      </div>
    </motion.div>
  )
}
