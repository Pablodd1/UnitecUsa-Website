"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import { useLanguage } from "lib/LanguageContext"

// --- PALM TREE SVG ---
function PalmTree({ x, y, scale = 1 }) {
  return (
    <motion.g 
      transform={`translate(${x}, ${y}) scale(${scale})`}
      animate={{ rotate: [0, 1.5, -1, 0.5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: `${x}px ${y + 20}px` }}
    >
      {/* Trunk */}
      <path d="M0,0 Q2,-15 1,-30 Q0,-35 -1,-30 Q-2,-15 0,0" fill="#8B6914" stroke="#6B4F12" strokeWidth="0.5" />
      {/* Leaves */}
      <path d="M0,-30 Q-15,-40 -20,-32" fill="none" stroke="#228B22" strokeWidth="2" strokeLinecap="round" />
      <path d="M0,-30 Q-10,-45 -18,-40" fill="none" stroke="#2E8B2E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M0,-30 Q10,-45 18,-40" fill="none" stroke="#228B22" strokeWidth="2" strokeLinecap="round" />
      <path d="M0,-30 Q15,-40 20,-32" fill="none" stroke="#2E8B2E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M0,-30 Q0,-48 5,-44" fill="none" stroke="#32A032" strokeWidth="1.5" strokeLinecap="round" />
    </motion.g>
  )
}

// --- OCEAN WAVES ---
function OceanWaves() {
  return (
    <g>
      {/* Ocean base */}
      <rect x="0" y="115" width="300" height="45" fill="#0c4a6e" />
      {/* Wave layers */}
      <motion.path
        d="M0,120 Q30,115 60,120 Q90,125 120,120 Q150,115 180,120 Q210,125 240,120 Q270,115 300,120 L300,160 L0,160 Z"
        fill="#0369a1"
        fillOpacity="0.6"
        animate={{ d: [
          "M0,120 Q30,115 60,120 Q90,125 120,120 Q150,115 180,120 Q210,125 240,120 Q270,115 300,120 L300,160 L0,160 Z",
          "M0,120 Q30,125 60,120 Q90,115 120,120 Q150,125 180,120 Q210,115 240,120 Q270,125 300,120 L300,160 L0,160 Z"
        ]}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.path
        d="M0,125 Q40,120 80,125 Q120,130 160,125 Q200,120 240,125 Q280,130 300,125 L300,160 L0,160 Z"
        fill="#0284c7"
        fillOpacity="0.4"
        animate={{ d: [
          "M0,125 Q40,120 80,125 Q120,130 160,125 Q200,120 240,125 Q280,130 300,125 L300,160 L0,160 Z",
          "M0,125 Q40,130 80,125 Q120,120 160,125 Q200,130 240,125 Q280,120 300,125 L300,160 L0,160 Z"
        ]}}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
      />
    </g>
  )
}

// --- DOCK ---
function Dock() {
  return (
    <g>
      {/* Main dock platform */}
      <path d="M20,105 L140,105 L160,115 L0,115 Z" fill="#8B7355" stroke="#6B5335" strokeWidth="0.5" />
      {/* Dock surface texture */}
      <line x1="30" y1="108" x2="130" y2="108" stroke="#9B8365" strokeWidth="0.3" />
      <line x1="25" y1="111" x2="145" y2="111" stroke="#9B8365" strokeWidth="0.3" />
      {/* Dock posts */}
      <rect x="15" y="105" width="3" height="12" fill="#6B5335" />
      <rect x="50" y="105" width="3" height="12" fill="#6B5335" />
      <rect x="100" y="105" width="3" height="12" fill="#6B5335" />
      <rect x="140" y="105" width="3" height="12" fill="#6B5335" />
      {/* Road */}
      <rect x="0" y="95" width="160" height="12" fill="#4a4a4a" rx="1" />
      <line x1="10" y1="101" x2="30" y2="101" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="40" y1="101" x2="60" y2="101" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="70" y1="101" x2="90" y2="101" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="4 3" />
      <line x1="100" y1="101" x2="120" y2="101" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="4 3" />
    </g>
  )
}

// --- SHIPPING CONTAINER (isometric-ish top-down view) ---
function ShippingContainer({ fillPercent, crateCount }) {
  const containerFill = fillPercent >= 95 ? "#166534" : "#1e3a5f"
  const doorColor = fillPercent >= 100 ? "#22c55e" : "#94a3b8"

  return (
    <g transform="translate(85, 55)">
      {/* Container body - isometric box */}
      {/* Top face */}
      <path d="M0,0 L50,-12 L90,0 L40,12 Z" fill={containerFill} stroke="#334155" strokeWidth="0.8" />
      {/* Left face */}
      <path d="M0,0 L0,35 L40,47 L40,12 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
      {/* Right face */}
      <path d="M40,12 L40,47 L90,35 L90,0 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
      
      {/* Container ridges (corrugation lines) */}
      {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
        <line key={`ridge-l-${i}`} x1={40 * t} y1={12 * t} x2={40 * t} y2={35 + 12 * t} stroke="#475569" strokeWidth="0.3" />
      ))}
      {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
        <line key={`ridge-r-${i}`} x1={40 + 50 * t} y1={12 - 12 * t} x2={40 + 50 * t} y2={47 - 12 * t} stroke="#475569" strokeWidth="0.3" />
      ))}

      {/* Crates inside (visible through top) */}
      {Array.from({ length: Math.min(crateCount, 10) }).map((_, i) => {
        const row = Math.floor(i / 2)
        const col = i % 2
        const cx = 10 + col * 25 + row * 4
        const cy = -4 + row * 5 - col * 3
        return (
          <motion.g 
            key={`crate-${i}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <rect x={cx} y={cy} width="12" height="6" fill="#d97706" stroke="#92400e" strokeWidth="0.4" rx="0.5" />
            <line x1={cx + 6} y1={cy} x2={cx + 6} y2={cy + 6} stroke="#92400e" strokeWidth="0.3" />
          </motion.g>
        )
      })}

      {/* Container doors (right face) */}
      <AnimatePresence>
        {fillPercent >= 100 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <path d="M40,12 L40,47 L90,35 L90,0 Z" fill="#16a34a" fillOpacity="0.3" stroke="#4ade80" strokeWidth="1" />
            <motion.text 
              x="60" y="22" 
              fill="#4ade80" 
              fontSize="5" 
              fontWeight="bold" 
              textAnchor="middle"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              SEALED
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Door handles */}
      <circle cx="62" cy="20" r="1.2" fill={doorColor} />
      <circle cx="68" cy="18" r="1.2" fill={doorColor} />
    </g>
  )
}

// --- DELIVERY TRUCK ---
function DeliveryTruck({ isActive, milestone }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.g
          initial={{ x: -50 }}
          animate={{ x: [null, 45, 45, -50] }}
          transition={{ 
            duration: 3.5,
            times: [0, 0.4, 0.7, 1],
            ease: "easeInOut"
          }}
          key={`truck-${milestone}`}
        >
          <g transform="translate(0, 82)">
            {/* Truck body */}
            <rect x="0" y="0" width="22" height="12" fill="#dc2626" rx="1" />
            {/* Cab */}
            <rect x="22" y="3" width="10" height="9" fill="#b91c1c" rx="1" />
            {/* Windshield */}
            <rect x="24" y="4" width="6" height="4" fill="#bfdbfe" rx="0.5" />
            {/* Wheels */}
            <circle cx="6" cy="13" r="2.5" fill="#1e1e1e" stroke="#555" strokeWidth="0.5" />
            <circle cx="18" cy="13" r="2.5" fill="#1e1e1e" stroke="#555" strokeWidth="0.5" />
            <circle cx="28" cy="13" r="2.5" fill="#1e1e1e" stroke="#555" strokeWidth="0.5" />
            {/* Cargo on truck */}
            <rect x="3" y="-5" width="8" height="5" fill="#d97706" stroke="#92400e" strokeWidth="0.3" rx="0.5" />
            <rect x="12" y="-5" width="8" height="5" fill="#ca8a04" stroke="#92400e" strokeWidth="0.3" rx="0.5" />
          </g>
        </motion.g>
      )}
    </AnimatePresence>
  )
}

// --- CRANE ---
function Crane({ isLifting }) {
  return (
    <g transform="translate(120, 30)">
      {/* Crane tower */}
      <rect x="0" y="0" width="4" height="75" fill="#64748b" stroke="#475569" strokeWidth="0.5" />
      {/* Crane arm */}
      <motion.g
        animate={isLifting ? { rotate: [0, -15, 0] } : { rotate: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ transformOrigin: "2px 0px" }}
      >
        <rect x="-40" y="-2" width="45" height="3" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" />
        {/* Cable */}
        <motion.line
          x1="-30" y1="1" x2="-30"
          animate={isLifting ? { y2: [15, 30, 15] } : { y2: 15 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          stroke="#94a3b8" strokeWidth="0.5"
        />
        {/* Hook */}
        <motion.g
          animate={isLifting ? { y: [15, 30, 15] } : { y: 15 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <g transform="translate(-33, 0)">
            <path d="M0,0 L6,0 L6,3 Q3,6 0,3 Z" fill="#94a3b8" />
          </g>
        </motion.g>
      </motion.g>
      {/* Base */}
      <rect x="-5" y="75" width="14" height="4" fill="#475569" rx="1" />
    </g>
  )
}

// --- CARGO SHIP ---
function CargoShip({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.g
          initial={{ x: 320 }}
          animate={{ x: 160 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <g transform="translate(0, 95)">
            {/* Hull */}
            <path d="M0,15 L10,25 L100,25 L110,15 L100,5 L10,5 Z" fill="#1e3a5f" stroke="#0f172a" strokeWidth="0.8" />
            {/* Deck */}
            <rect x="15" y="5" width="80" height="10" fill="#334155" rx="1" />
            {/* Bridge */}
            <rect x="70" y="-8" width="20" height="13" fill="#475569" rx="1" />
            <rect x="73" y="-5" width="5" height="4" fill="#bfdbfe" rx="0.5" />
            <rect x="80" y="-5" width="5" height="4" fill="#bfdbfe" rx="0.5" />
            {/* Containers on deck */}
            <rect x="20" y="0" width="12" height="5" fill="#dc2626" rx="0.5" />
            <rect x="34" y="0" width="12" height="5" fill="#2563eb" rx="0.5" />
            <rect x="48" y="0" width="12" height="5" fill="#16a34a" rx="0.5" />
            <rect x="27" y="-5" width="12" height="5" fill="#d97706" rx="0.5" />
            <rect x="41" y="-5" width="12" height="5" fill="#7c3aed" rx="0.5" />
            {/* Smoke stack */}
            <rect x="85" y="-15" width="4" height="7" fill="#1e1e1e" rx="0.5" />
            <motion.circle
              cx="87" cy="-18"
              r="2"
              fill="#9ca3af"
              fillOpacity="0.5"
              animate={{ cy: [-18, -28], r: [2, 4], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          </g>
        </motion.g>
      )}
    </AnimatePresence>
  )
}

// --- MILESTONE TOAST ---
function MilestoneToast({ milestone, isSpanish }) {
  const messages = {
    1: { en: "🏗️ Loading Started!", es: "🏗️ ¡Carga Iniciada!" },
    2: { en: "📦 Truck #2 Arrived!", es: "📦 ¡Camión #2 Llegó!" },
    3: { en: "🔧 30% — Building Momentum", es: "🔧 30% — Ganando Impulso" },
    4: { en: "📊 40% — Great Progress!", es: "📊 40% — ¡Gran Progreso!" },
    5: { en: "🔥 HALFWAY! Optimize Your Load", es: "🔥 ¡MITAD! Optimiza Tu Carga" },
    6: { en: "⚡ 60% — Efficiency Rising!", es: "⚡ 60% — ¡Eficiencia Subiendo!" },
    7: { en: "🚀 70% — Almost There!", es: "🚀 70% — ¡Casi Listo!" },
    8: { en: "💎 80% — Expert Loader!", es: "💎 80% — ¡Cargador Experto!" },
    9: { en: "🏆 90% — Maximum Savings!", es: "🏆 90% — ¡Ahorro Máximo!" },
    10: { en: "✅ SEALED — Ready to Ship!", es: "✅ ¡SELLADO — Listo para Enviar!" },
  }

  const msg = messages[milestone]
  if (!msg) return null

  return (
    <AnimatePresence>
      <motion.div
        key={`toast-${milestone}`}
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-2 right-2 z-10 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20 shadow-lg"
      >
        {isSpanish ? msg.es : msg.en}
      </motion.div>
    </AnimatePresence>
  )
}

// ========================
// MAIN COMPONENT
// ========================
export default function PortOfMiamiScene({ fillPercent = 0, containerType = "40ft" }) {
  const { language } = useLanguage()
  const isSpanish = language === 'es'

  const currentMilestone = Math.floor(fillPercent / 10)
  const crateCount = currentMilestone
  const [truckActive, setTruckActive] = useState(false)
  const [lastMilestone, setLastMilestone] = useState(0)
  const [craneLifting, setCraneLifting] = useState(false)
  const [showToast, setShowToast] = useState(0)
  const showShip = fillPercent >= 95

  // Trigger truck animation on milestone change
  useEffect(() => {
    if (currentMilestone > lastMilestone && currentMilestone > 0) {
      setTruckActive(true)
      setCraneLifting(true)
      setShowToast(currentMilestone)

      const truckTimer = setTimeout(() => setTruckActive(false), 3600)
      const craneTimer = setTimeout(() => setCraneLifting(false), 2200)
      const toastTimer = setTimeout(() => setShowToast(0), 4000)

      setLastMilestone(currentMilestone)
      return () => {
        clearTimeout(truckTimer)
        clearTimeout(craneTimer)
        clearTimeout(toastTimer)
      }
    }
  }, [currentMilestone, lastMilestone])

  const statusColor = fillPercent >= 95 ? "#4ade80" : fillPercent >= 50 ? "#f59e0b" : "#3b82f6"
  const statusText = fillPercent >= 100 
    ? (isSpanish ? "Contenedor Sellado" : "Container Sealed")
    : fillPercent >= 95
    ? (isSpanish ? "Listo para Cotizar" : "Ready for Quote")
    : (isSpanish ? "Cargando..." : "Loading...")

  return (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "300/160" }}>
      {/* Milestone Toast */}
      {showToast > 0 && <MilestoneToast milestone={showToast} isSpanish={isSpanish} />}

      <svg viewBox="0 0 300 160" className="w-full h-full" style={{ background: "linear-gradient(180deg, #0c4a6e 0%, #075985 40%, #0369a1 100%)" }}>
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="60%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="300" height="160" fill="url(#skyGrad)" />

        {/* Clouds */}
        <motion.ellipse cx="60" cy="20" rx="20" ry="5" fill="white" fillOpacity="0.08"
          animate={{ cx: [60, 80, 60] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.ellipse cx="200" cy="15" rx="25" ry="6" fill="white" fillOpacity="0.06"
          animate={{ cx: [200, 230, 200] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Background buildings (Miami skyline silhouette) */}
        <rect x="170" y="55" width="8" height="40" fill="#0f172a" fillOpacity="0.4" />
        <rect x="182" y="45" width="10" height="50" fill="#0f172a" fillOpacity="0.3" />
        <rect x="196" y="50" width="7" height="45" fill="#0f172a" fillOpacity="0.35" />
        <rect x="208" y="40" width="12" height="55" fill="#0f172a" fillOpacity="0.3" />
        <rect x="225" y="52" width="9" height="43" fill="#0f172a" fillOpacity="0.25" />
        <rect x="240" y="48" width="8" height="47" fill="#0f172a" fillOpacity="0.3" />
        <rect x="252" y="42" width="14" height="53" fill="#0f172a" fillOpacity="0.25" />
        <rect x="272" y="55" width="10" height="40" fill="#0f172a" fillOpacity="0.2" />

        {/* Land / Ground */}
        <rect x="0" y="90" width="165" height="25" fill="#365314" fillOpacity="0.6" />

        {/* Palm trees */}
        <PalmTree x={10} y={88} scale={0.8} />
        <PalmTree x={155} y={85} scale={0.9} />
        <PalmTree x={30} y={92} scale={0.6} />

        {/* Dock */}
        <Dock />

        {/* Crane */}
        <Crane isLifting={craneLifting} />

        {/* Container */}
        <ShippingContainer fillPercent={fillPercent} crateCount={crateCount} />

        {/* Delivery Truck */}
        <DeliveryTruck isActive={truckActive} milestone={currentMilestone} />

        {/* Ocean */}
        <OceanWaves />

        {/* Cargo Ship at 95%+ */}
        <CargoShip isVisible={showShip} />

        {/* Status bar at bottom */}
        <rect x="0" y="150" width="300" height="10" fill="rgba(0,0,0,0.6)" />
        <motion.rect 
          x="0" y="150" 
          height="10" 
          fill={statusColor}
          fillOpacity="0.4"
          initial={{ width: 0 }}
          animate={{ width: (fillPercent / 100) * 300 }}
          transition={{ duration: 0.8 }}
        />
        <text x="150" y="157" fill="white" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
          {fillPercent.toFixed(1)}% — {statusText}
        </text>
      </svg>
    </div>
  )
}
