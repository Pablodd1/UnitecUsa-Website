"use client"
import React from "react"
import FlameProgress from "./FlameProgress.jsx"
import ThreeContainer from "./ThreeContainer.jsx"
import { motion } from "framer-motion"

/**
 * Container3DView - 3D-style container visualization
 * Shows container with items inside as realistic boxes
 */
export default function Container3DView({
  size = "40ft",
  width = 2.35,
  height = 2.39,
  length = 12.03,
  items = [],
  fillPercent = 0,
  isInteractive = false,
  onSelect,
  className = "",
  scale = 1
}) {
  const displayWidth = width * 100 * scale
  const displayHeight = height * 100 * scale
  const displayLength = length * 35 * scale
  const textures = ["/assets/containers/metal_blue.png"]
  const enableThreeD = true

  const worldW = Math.max(0.5, displayLength / 40)
  const worldH = Math.max(0.5, displayHeight / 40)
  const worldL = Math.max(0.5, displayLength / 40)

  const containerBoxes = React.useMemo(() => {
    return items.map((item, idx) => ({
      id: idx,
      color: item.color || "#60A5FA",
      image: item.image,
      width: 25 + (idx % 3) * 10,
      height: 25 + (idx % 2) * 15,
      delay: idx * 0.05
    })).slice(0, 50) // Capped at 50 for mobile performance
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
        {/* Exterior Shell (Three.js Overlay) */}
        {enableThreeD && (
          <div className="absolute inset-0 z-10 opacity-40 mix-blend-overlay pointer-events-none">
            <ThreeContainer width={worldW} height={worldH} length={worldL} textures={textures} />
          </div>
        )}

        {/* Interior Faces */}
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
        <div
          className="absolute border-2 border-gray-600"
          style={{
            width: displayWidth,
            height: displayHeight,
            transform: `rotateY(90deg) translateZ(${displayLength / 2}px)`,
            backgroundImage: "linear-gradient(to right, #1e3a8a, #1d4ed8)",
          }}
        >
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/containers/container_texture_01.svg')", backgroundSize: 'cover' }} />
        </div>
        <div
          className="absolute bg-gray-700 border-2 border-gray-600"
          style={{
            width: displayLength,
            height: displayWidth,
            transform: `rotateX(90deg) translateZ(${displayHeight / 2}px)`,
            backgroundImage: "linear-gradient(to top, #1e3a8a, #1d4ed8)",
          }}
        />

        {/* Cinematic Particles */}
        <div className="absolute inset-x-[10%] inset-y-[20%] pointer-events-none overflow-hidden opacity-30">
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    initial={{ x: Math.random() * 100 + "%", y: "0%", opacity: 0 }}
                    animate={{ y: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
                />
            ))}
        </div>

        {/* Cargo Stacking (Game-like Logic) */}
        <div className="absolute inset-0" style={{ transform: "translateZ(0px)", perspective: "1000px" }}>
            <div
              className="absolute bottom-[20%] left-[10%] right-[10%] h-[55%] flex flex-wrap-reverse content-end items-end justify-center gap-1.5"
              style={{ transformStyle: "preserve-3d" }}
            >
              {containerBoxes.map((box, idx) => {
                const layerSize = 7;
                const d = Math.floor(idx / layerSize);
                const h = Math.floor(idx / (layerSize * 3));
                return (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, y: -300, scale: 1.5, z: 100 }}
                    animate={{ opacity: 1, scale: 1, y: -h * 22, z: -d * 14, x: (idx % layerSize - 3) * 3 }}
                    transition={{ 
                        delay: (items.length - idx) * 0.02,
                        type: "spring", stiffness: 150, damping: 10,
                        ease: [0.175, 0.885, 0.32, 1.275] 
                    }}
                    className="relative rounded shadow-2xl border border-black/20 overflow-hidden"
                    style={{
                      width: box.width, height: box.height,
                      backgroundColor: box.color,
                      backgroundImage: "url('/assets/containers/box_texture.png')",
                      backgroundSize: 'cover',
                      transformStyle: "preserve-3d",
                    }}
                  >
                      {box.image && (
                          <div className="absolute inset-1.5 flex items-center justify-center">
                              <img src={box.image.url || box.image} alt="" className="max-w-[80%] max-h-[80%] object-contain" />
                          </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/5 to-white/10" />
                      <div className="absolute inset-y-0 right-0 w-[3px] bg-black/40" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/50" />
                  </motion.div>
                );
              })}
            </div>
        </div>

        {/* Doors */}
        <div
          className="absolute top-0 left-0 h-full w-[50%] border-r-2 border-gray-900 origin-left transition-transform duration-700 group-hover:rotate-y-[-140deg]"
          style={{ transform: "rotateY(-110deg)", backgroundImage: "linear-gradient(to right, #1e3a8a, #1d4ed8)" }}
        />
        <div
          className="absolute top-0 right-0 h-full w-[50%] border-l-2 border-gray-900 origin-right transition-transform duration-700 group-hover:rotate-y-[140deg]"
          style={{ transform: "rotateY(110deg)", backgroundImage: "linear-gradient(to left, #1e3a8a, #1d4ed8)" }}
        />
      </div>

      {/* Progress Footer */}
      <div className="absolute -bottom-10 left-0 w-full px-2">
         <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                Llenando contenedor... <span className={`font-mono ${fillPercent >= 100 ? 'text-green-600' : 'text-blue-600'}`}>{fillPercent.toFixed(1)}</span>%
            </span>
         </div>
         <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300">
            <motion.div 
               className="h-full"
               style={{ backgroundColor: fillPercent >= 100 ? '#28a745' : '#1d4ed8' }}
               animate={{ width: `${Math.min(fillPercent, 100)}%` }}
               transition={{ duration: 0.6 }}
            />
         </div>
         <div className="mt-2 flex justify-center scale-75 opacity-70">
            <FlameProgress percent={fillPercent} />
         </div>
      </div>
      
      <div className="absolute -top-6 right-2 bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold border border-white/20 shadow-xl">
        HC {size}
      </div>
    </motion.div>
  )
}
