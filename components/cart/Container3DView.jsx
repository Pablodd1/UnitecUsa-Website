"use client"
import React, { useEffect, useState } from "react"
import FlameProgress from "./FlameProgress.jsx"
import ThreeContainer from "./ThreeContainer.jsx"
import { motion, useAnimation } from "framer-motion"

/**
 * Container3DView - Cinematic "Director's View" Container
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
  
  const enableThreeD = true
  const worldW = Math.max(0.5, displayLength / 40)
  const worldH = Math.max(0.5, displayHeight / 40)
  const worldL = Math.max(0.5, displayLength / 40)

  const isFull = fillPercent >= 100;
  const controls = useAnimation();

  // Trigger Crane Lift when full
  useEffect(() => {
    if (isFull) {
        controls.start({
            y: -800,
            scale: 0.8,
            transition: { duration: 3, delay: 1, ease: "easeInOut" }
        })
    } else {
        controls.start({ y: 0, scale: 1 })
    }
  }, [isFull, controls])

  // Dynamic Camera Path depending on how full it is
  // Starts angled right, swoops low/center mid-load, pulls back at 100%
  const calcCamera = () => {
      if (fillPercent < 30) return { rX: -5, rY: -35, zoom: 1.1 }
      if (fillPercent < 70) return { rX: -12, rY: -15, zoom: 1.2 }
      if (fillPercent < 100) return { rX: -8, rY: -25, zoom: 1.05 }
      return { rX: -15, rY: 0, zoom: 0.95 } // Locked in dead-center when full
  }
  const camera = calcCamera();

  // Time of Day Lighting (Blue Morning -> Amber Sunset)
  const getLighting = () => {
      if (fillPercent < 50) return { left: "#1e3a8a", right: "#1d4ed8", glow: "rgba(59,130,246,0.3)" } // Morning Blue
      if (fillPercent < 90) return { left: "#312e81", right: "#4338ca", glow: "rgba(79,70,229,0.4)" } // Midday Indigo
      return { left: "#7c2d12", right: "#ea580c", glow: "rgba(234,88,12,0.5)" } // Sunset Amber
  }
  const lighting = getLighting();

  const containerBoxes = React.useMemo(() => {
    return items.map((item, idx) => ({
      ...item,
      width: 25 + (idx % 3) * 10,
      height: 25 + (idx % 2) * 15,
      actualColor: item.color || "#60A5FA"
    })).slice(0, 50)
  }, [items])

  return (
    <motion.div
      className={`relative ${className} group`}
      style={{
        width: displayLength,
        height: displayHeight + 40,
        perspective: "1800px" // Increased perspective for wider cinematic lens
      }}
      whileHover={isInteractive ? { scale: 1.02 } : {}}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      onClick={isInteractive ? onSelect : undefined}
    >
      <motion.div animate={controls} className="w-full h-full">
        {/* 3D Container Structure with Dynamic Camera */}
        <motion.div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
               rotateX: camera.rX,
               rotateY: camera.rY,
               scale: camera.zoom
            }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          {/* Exterior Shell */}
          {enableThreeD && (
            <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none">
              <ThreeContainer width={worldW} height={worldH} length={worldL} textures={["/assets/containers/metal_blue.png"]} />
            </div>
          )}

          {/* Time-of-Day Environment Glow */}
          <motion.div 
            className="absolute inset-0 blur-[100px] pointer-events-none -z-10"
            animate={{ backgroundColor: lighting.glow }}
            transition={{ duration: 2 }}
          />

          {/* Interior Faces */}
          <div 
              className="absolute bg-gray-950 border-2 border-gray-800" 
              style={{
                  width: displayLength, height: displayHeight,
                  transform: `translateZ(-${displayWidth/2}px)`,
                  backgroundImage: "url('/assets/containers/interior.png')", backgroundSize: 'cover',
                  boxShadow: "inset 0 0 150px rgba(0,0,0,0.9)"
              }}
          />
          <div
            className="absolute bg-gray-900 border-2 border-gray-700"
            style={{
              width: displayLength, height: displayWidth,
              transform: `rotateX(90deg) translateZ(-${displayHeight / 2}px)`,
              backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent), url('/assets/containers/interior.png')",
              backgroundPosition: 'bottom', backgroundSize: '100% 200%'
            }}
          />
          <div
            className="absolute border-2 border-gray-800"
            style={{
              width: displayWidth, height: displayHeight,
              transform: `rotateY(90deg) translateZ(-${displayLength / 2}px)`,
              backgroundImage: "url('/assets/containers/interior.png')", backgroundSize: 'cover', opacity: 0.7
            }}
          />
          
          {/* Dynamic Light Responsive Side Wall */}
          <motion.div
            className="absolute border-2 border-gray-700"
            style={{
              width: displayWidth, height: displayHeight,
              transform: `rotateY(90deg) translateZ(${displayLength / 2}px)`,
            }}
            animate={{
              backgroundImage: `linear-gradient(to right, ${lighting.left}, ${lighting.right})`
            }}
            transition={{ duration: 2 }}
          >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/containers/container_texture_01.svg')", backgroundSize: 'cover' }} />
          </motion.div>
          
          <motion.div
            className="absolute bg-gray-800 border-2 border-gray-700"
            style={{
              width: displayLength, height: displayWidth,
              transform: `rotateX(90deg) translateZ(${displayHeight / 2}px)`,
            }}
            animate={{
                backgroundImage: `linear-gradient(to top, ${lighting.left}, ${lighting.right})`
            }}
            transition={{ duration: 2 }}
          />

          {/* Cinematic Cinematic Particles (Changing color at sunset) */}
          <div className="absolute inset-x-[5%] inset-y-[10%] pointer-events-none overflow-hidden opacity-40">
              {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      animate={{ 
                          y: ["0%", "100%", "0%"],
                          x: ["-10%", "10%", "-10%"],
                          opacity: [0, 1, 0],
                          backgroundColor: fillPercent > 80 ? "#fdba74" : "#ffffff" 
                      }}
                      transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, ease: "linear" }}
                      style={{ 
                          left: Math.random() * 100 + "%", 
                          top: Math.random() * 100 + "%",
                          filter: `blur(${Math.random() > 0.5 ? 1 : 0}px)`
                      }}
                  />
              ))}
          </div>

          {/* Cargo Stacking with Cinematic Depth of Field */}
          <div className="absolute inset-0" style={{ transform: "translateZ(0px)", perspective: "1200px" }}>
              <div
                className="absolute bottom-[20%] left-[8%] right-[8%] h-[60%] flex flex-wrap-reverse content-end items-end justify-center gap-1.5"
                style={{ transformStyle: "preserve-3d" }}
              >
                {containerBoxes.map((box, idx) => {
                  const layerSize = 7;
                  const d = Math.floor(idx / layerSize);
                  const h = Math.floor(idx / (layerSize * 3));
                  
                  // Calculate Depth of Field: Boxes deeper (higher d) blur when up close
                  const currentMaxDepth = Math.floor(containerBoxes.length / layerSize);
                  let blurPx = 0;
                  if (camera.zoom > 1.1 && currentMaxDepth - d > 3) blurPx = 2; // Blur far background
                  if (isFull && d < 2) blurPx = 1; // Blur foreground slightly when full container lock
                  
                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, y: -400, scale: 1.5, z: 200, rotateX: 45 }}
                      animate={{ 
                          opacity: 1, scale: 1, 
                          y: -h * 22, z: -d * 14, 
                          x: (idx % layerSize - 3) * 3,
                          rotateX: 0,
                          filter: `blur(${blurPx}px)`
                      }}
                      transition={{ 
                          delay: (items.length - idx) * 0.015,
                          type: "spring", stiffness: 120, damping: 12,
                          ease: [0.175, 0.885, 0.32, 1.275] 
                      }}
                      className="relative rounded shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-black/30 overflow-hidden"
                      style={{
                        width: box.width, height: box.height,
                        backgroundColor: box.actualColor,
                        backgroundImage: "url('/assets/containers/box_texture.png')", backgroundSize: 'cover',
                        transformStyle: "preserve-3d",
                      }}
                    >
                        {box.image && (
                            <div className="absolute inset-1.5 flex items-center justify-center bg-white/5 backdrop-blur-[1px] border border-white/10 rounded-sm">
                                <img src={box.image.url || box.image} alt="" className="max-w-[85%] max-h-[85%] object-contain contrast-125 saturate-150" />
                            </div>
                        )}
                        {/* Dynamic Light Catch */}
                        <motion.div 
                            className="absolute inset-0 pointer-events-none" 
                            animate={{ background: `linear-gradient(to top right, transparent, ${lighting.glow})` }}
                            transition={{ duration: 2 }}
                        />
                        <div className="absolute inset-y-0 right-0 w-[4px] bg-black/60" />
                        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black/70" />
                    </motion.div>
                  );
                })}
              </div>
          </div>

          {/* Animated Doors (Slam shut when full) */}
          <motion.div
            className="absolute top-0 left-0 h-full w-[50%] border-r-2 border-gray-950 origin-left"
            animate={{ 
                rotateY: isFull ? 0 : -110,
                backgroundImage: `linear-gradient(to right, ${lighting.left}, ${lighting.right})`
            }}
            transition={{ duration: isFull ? 0.5 : 2, ease: isFull ? "circIn" : "easeInOut" }}
          >
              {isFull && <div className="absolute inset-0 bg-black/50" />}
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 h-full w-[50%] border-l-2 border-gray-950 origin-right"
            animate={{ 
                rotateY: isFull ? 0 : 110,
                backgroundImage: `linear-gradient(to left, ${lighting.left}, ${lighting.right})`
            }}
            transition={{ duration: isFull ? 0.5 : 2, ease: isFull ? "circIn" : "easeInOut" }}
          >
              {isFull && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <motion.div 
                         initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }}
                         className="border-4 border-green-500 text-green-500 font-black text-4xl rotate-[-15deg] p-4 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                      >
                         SEALED
                      </motion.div>
                  </div>
              )}
          </motion.div>
        </motion.div>

        {/* Cinematic Letterboxing (Appears during camera movements) */}
        {!isFull && (
            <>
               <div className="absolute top-0 left-0 right-0 h-2 bg-black z-20" />
               <div className="absolute bottom-0 left-0 right-0 h-2 bg-black z-20" />
            </>
        )}
      </motion.div>

      {/* Modern Progress HUD */}
      {!isFull && (
          <div className="absolute -bottom-10 left-0 w-full px-2">
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                    Llenando contenedor... <span className="font-mono text-blue-500">{fillPercent.toFixed(1)}</span>%
                </span>
             </div>
             <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden shadow-inner border border-gray-400">
                <motion.div 
                   className="h-full bg-blue-600"
                   animate={{ width: `${Math.min(fillPercent, 100)}%` }}
                   transition={{ duration: 0.6 }}
                />
             </div>
          </div>
      )}
      
      {!isFull && (
          <div className="absolute -top-6 right-2 bg-black text-white px-3 py-1 rounded text-xs font-black tracking-widest border border-white/20 shadow-2xl">
            {size} HC
          </div>
      )}
    </motion.div>
  )
}
