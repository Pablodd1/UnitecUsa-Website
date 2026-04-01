import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import { addContainer, addOne } from "lib/cart/cart.core"
import { generateID } from "lib/misc"
import { useLanguage } from "lib/LanguageContext"
import { useRouter } from "next/navigation"

// Container definitions
const CONTAINERS = {
  en: [
    {
      id: "20ft",
      label: "20ft Standard Container",
      description: "Perfect for smaller orders",
      width: 2.35,
      height: 2.39,
      length: 5.9,
      volume: 33.1,
      image: "/assets/small_container.jpg"
    },
    {
      id: "40ft",
      label: "40ft High Cube Container",
      description: "Ideal for bulk orders",
      width: 2.35,
      height: 2.69,
      length: 12.03,
      volume: 81.2,
      image: "/assets/big_container.jpg"
    }
  ],
  es: [
    {
      id: "20ft",
      label: "Contenedor Standard 20ft",
      description: "Perfecto para pedidos pequeños",
      width: 2.35,
      height: 2.39,
      length: 5.9,
      volume: 33.1,
      image: "/assets/small_container.jpg"
    },
    {
      id: "40ft",
      label: "Contenedor High Cube 40ft",
      description: "Ideal para pedidos a granel",
      width: 2.35,
      height: 2.69,
      length: 12.03,
      volume: 81.2,
      image: "/assets/big_container.jpg"
    }
  ]
}

export default function ContainerSelectionModal({ isOpen, onClose, product }) {
  const [selectedContainer, setSelectedContainer] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const { language } = useLanguage()
  const router = useRouter()
  const isSpanish = language === "es"
  const containers = CONTAINERS[language] || CONTAINERS.en

  const t = {
    title: isSpanish ? "Selecciona el Contenedor" : "Select Your Container",
    addToContainer: isSpanish ? "Añadir a Contenedor" : "Add to Container",
    cancel: isSpanish ? "Cancelar" : "Cancel"
  }

  const handleSelectContainer = async (containerDef) => {
    setIsAdding(true)
    try {
      const containerId = generateID()
      addContainer({
        id: containerId,
        name: containerDef.label,
        dimension: {
          length: containerDef.length,
          width: containerDef.width,
          height: containerDef.height
        },
        meta: {
          internal: {
            length: containerDef.length,
            width: containerDef.width,
            height: containerDef.height
          }
        }
      })

      if (product) {
        addOne(containerId, {
          id: product.id || product.ID,
          name: product.name || product.Name,
          price: product.basePrice || product.price,
          image: product.image,
          dimensions: product.dimensions
        })
      }

      setTimeout(() => {
        setIsAdding(false)
        onClose()
        router.push("/cart")
      }, 500)
    } catch (error) {
      console.error("Error adding to container:", error)
      setIsAdding(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full h-full flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-50 text-white hover:text-gray-300 p-2"
            >
              <X size={32} />
            </button>

            {/* Selection Split */}
            <div className="flex w-full h-full">
              {containers.map((container) => (
                <div
                  key={container.id}
                  className="relative flex-1 group cursor-pointer overflow-hidden border-r last:border-r-0 border-white/20"
                  onClick={() => handleSelectContainer(container)}
                >
                  <Image 
                    src={container.image} 
                    alt={container.label} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 flex flex-col items-center justify-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {container.label}
                    </h2>
                    <motion.div 
                      className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {t.addToContainer}
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
