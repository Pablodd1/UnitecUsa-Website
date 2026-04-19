"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SplashScreen component that plays a video before the site content is fully interactable.
 * It uses sessionStorage to ensure it only plays once per session.
 */
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if splash has already played this session
    const hasPlayed = sessionStorage.getItem('splashPlayed')
    if (hasPlayed) {
      setIsVisible(false)
    }
  }, [])

  const handleFinish = () => {
    setIsVisible(false)
    sessionStorage.setItem('splashPlayed', 'true')
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleFinish}
            className="w-full h-full object-cover"
          >
            <source src="/videos/splash.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Skip button for better UX */}
          <button 
            onClick={handleFinish}
            className="absolute bottom-8 right-8 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
