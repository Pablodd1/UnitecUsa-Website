"use client"

import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { Container } from "lucide-react"
import { useLanguage } from "lib/LanguageContext"
import { CONTAINER_TYPES, getAllContainerTypes } from "lib/cart/containerTypes"
import { selectContainer, initExperienceCart, getSelectedContainer } from "lib/cart/experienceCart.core"
import { useEffect } from "react"

const Modal = dynamic(() => import("My_UI/MyModal/main"))

export default function ContainerSelectionModal({ open, onClose }) {
  const { language } = useLanguage()
  const isSpanish = language === 'es'

  const t = {
    title: isSpanish ? "Elige tu Contenedor" : "Choose Your Container",
    subtitle: isSpanish 
      ? "Selecciona un contenedor para comenzar tu experiencia de compra" 
      : "Select a container to start your purchase experience",
    selectBtn: isSpanish ? "Seleccionar" : "Select",
    capacity: isSpanish ? "Capacidad" : "Capacity",
    maxWeight: isSpanish ? "Peso Máximo" : "Max Weight",
  }

  const handleSelect = (containerType) => {
    selectContainer(containerType)
    onClose()
  }

  const containers = getAllContainerTypes()

  return (
    <Modal
      open={open}
      onClose={onClose}
      noGap
      wrapperClasses="w-full lg:min-w-xl max-w-2xl bg-white shadow-xl"
    >
      <header className="text-center pb-6 pt-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Container className="w-[54px] h-[54px] mx-auto mb-4 text-black" />
          <h2 className="text-2xl font-bold text-black mb-2">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </motion.div>
      </header>

      <main className="px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {containers.map((container, index) => (
              <motion.button
                key={container.id}
                onClick={() => handleSelect(container.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-4 border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all group text-left"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                
                <div className="flex justify-center mb-3">
                  <svg 
                    viewBox="0 0 100 60" 
                    className={container.id === "20ft" ? "w-24 h-16" : "w-32 h-16"}
                  >
                    <defs>
                      <linearGradient id={`grad-${container.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#374151" />
                        <stop offset="100%" stopColor="#1f2937" />
                      </linearGradient>
                    </defs>
                    <path
                      d={container.id === "20ft" 
                        ? "M 10 20 L 50 10 L 90 20 L 90 50 L 50 60 L 10 50 Z"
                        : "M 5 20 L 50 5 L 95 20 L 95 50 L 50 65 L 5 50 Z"
                      }
                      fill="none"
                      stroke={`url(#grad-${container.id})`}
                      strokeWidth="2"
                    />
                    <path
                      d={container.id === "20ft"
                        ? "M 10 20 L 30 28 L 70 28 L 90 20"
                        : "M 5 20 L 35 32 L 65 32 L 95 20"
                      }
                      fill="none"
                      stroke={`url(#grad-${container.id})`}
                      strokeWidth="2"
                    />
                    <path
                      d={container.id === "20ft"
                        ? "M 30 28 L 30 50"
                        : "M 35 32 L 35 58"
                      }
                      fill="none"
                      stroke={`url(#grad-${container.id})`}
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <h3 className="text-lg font-bold mb-2 text-center">
                  {isSpanish ? container.nameEs : container.name}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.capacity}</span>
                    <span className="font-medium">{container.volume} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.maxWeight}</span>
                    <span className="font-medium">{container.maxWeight.toLocaleString()} kg</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </Modal>
  )
}
