"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Check, X, Info } from "lucide-react"
import Container3DView from "components/cart/Container3DView"
import { addContainer, addOne } from "lib/cart/cart.core"
import { generateID } from "lib/misc"
import { useLanguage } from "lib/LanguageContext"

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
      color: "#3B82F6"
    },
    {
      id: "40ft",
      label: "40ft High Cube Container",
      description: "Ideal for bulk orders",
      width: 2.35,
      height: 2.69,
      length: 12.03,
      volume: 81.2,
      color: "#8B5CF6"
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
      color: "#3B82F6"
    },
    {
      id: "40ft",
      label: "Contenedor High Cube 40ft",
      description: "Ideal para pedidos a granel",
      width: 2.35,
      height: 2.69,
      length: 12.03,
      volume: 81.2,
      color: "#8B5CF6"
    }
  ]
}

export default function ContainerSelectionModal({ isOpen, onClose, product }) {
  const [selectedContainer, setSelectedContainer] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const { language } = useLanguage()
  const isSpanish = language === "es"
  const containers = CONTAINERS[language] || CONTAINERS.en

  const t = {
    title: isSpanish ? "Seleccionar Contenedor" : "Select Container",
    subtitle: isSpanish ? "Elige el tamaño del contenedor para añadir el producto" : "Choose the container size to add your product",
    capacity: isSpanish ? "Capacidad" : "Capacity",
    addToContainer: isSpanish ? "Añadir a Contenedor" : "Add to Container",
    cancel: isSpanish ? "Cancelar" : "Cancel",
    selected: isSpanish ? "Seleccionado" : "Selected",
    volume: isSpanish ? "Volumen" : "Volume"
  }

  const handleSelectContainer = async (containerDef) => {
    setIsAdding(true)

    try {
      // Check if there's already a container of this type
      const existingContainer = containers.find(c => c.id === containerDef.id)

      // Add new container with unique ID
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

      // Add product to the new container
      if (product) {
        addOne(containerId, {
          id: product.id || product.ID,
          name: product.name || product.Name,
          price: product.basePrice || product.price,
          image: product.image,
          dimensions: product.dimensions
        })
      }

      // Close modal after adding
      setTimeout(() => {
        setIsAdding(false)
        onClose()
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
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Package className="text-blue-400" size={28} />
                    {t.title}
                  </h2>
                  <p className="text-gray-400 mt-1">{t.subtitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Product Info Bar */}
            {product && (
              <div className="bg-gray-50 px-8 py-4 border-b flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden border">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  ) : (
                    <Package className="text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t.addToContainer}</p>
                  <p className="font-semibold text-gray-900">{product.name || product.Name}</p>
                </div>
              </div>
            )}

            {/* Container Selection Grid */}
            <div className="p-8 grid md:grid-cols-2 gap-8">
              {containers.map((container, index) => (
                <motion.div
                  key={container.id}
                  className={`relative group cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                    selectedContainer?.id === container.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedContainer(container)}
                >
                  {/* Selection Indicator */}
                  {selectedContainer?.id === container.id && (
                    <motion.div
                      className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check size={16} />
                    </motion.div>
                  )}

                  {/* 3D Container View */}
                  <div className="flex justify-center items-center py-8">
                    <Container3DView
                      size={container.label}
                      width={container.width}
                      height={container.height}
                      length={container.length}
                      fillPercent={0}
                      scale={0.8}
                      className="transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Container Info */}
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-lg text-gray-900">{container.label}</h3>
                    <p className="text-sm text-gray-500">{container.description}</p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Info size={14} />
                        {t.volume}: {container.volume} m³
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">
                        {container.width}m × {container.length}m × {container.height}m
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-8 py-6 border-t flex items-center justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <motion.button
                onClick={() => selectedContainer && handleSelectContainer(selectedContainer)}
                disabled={!selectedContainer || isAdding}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                whileHover={!selectedContainer ? {} : { scale: 1.02 }}
                whileTap={!selectedContainer ? {} : { scale: 0.98 }}
              >
                {isAdding ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Adding...
                  </>
                ) : (
                  <>
                    <Package size={18} />
                    {t.addToContainer}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
