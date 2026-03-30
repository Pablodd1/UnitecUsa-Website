"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Lock, Unlock, Plus, Minus, Trash2 } from "lucide-react"
import { useLanguage } from "lib/LanguageContext"
import Link from "next/link"

import { 
  initExperienceCart, 
  getExperienceCart, 
  getSelectedContainer,
  getVolumeStats,
  isReadyForCheckout,
  getAllContainerTypes,
  selectContainer,
  clearContainerSelection,
  removeItemFromCart,
  updateItemQuantity
} from "lib/cart/experienceCart.core"

import ContainerSelectionModal from "./ContainerSelectionModal"
import ContainerVisual from "./ContainerVisual"
import ContainerHUD from "./ContainerHUD"

export default function ExperienceCartDrawer() {
  const [open, setOpen] = useState(false)
  const [showContainerModal, setShowContainerModal] = useState(false)
  const [cart, setCart] = useState(null)
  const [reload, setReload] = useState(0)
  const { language } = useLanguage()
  const isSpanish = language === 'es'

  const t = {
    cart: isSpanish ? "Carrito" : "Cart",
    empty: isSpanish ? "El carrito está vacío" : "Cart is empty",
    selectContainer: isSpanish ? "Selecciona un contenedor" : "Select a container",
    checkout: isSpanish ? "Proceder al Pago" : "Proceed to Payment",
    locked: isSpanish ? "Completa el 95% para continuar" : "Complete 95% to proceed",
    remove: isSpanish ? "Eliminar" : "Remove",
    close: isSpanish ? "Cerrar" : "Close"
  }

  useEffect(() => {
    initExperienceCart()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCart(getExperienceCart())
    }, 100)
    return () => clearInterval(interval)
  }, [reload])

  const handleOpen = () => {
    const selected = getSelectedContainer()
    if (!selected) {
      setShowContainerModal(true)
    } else {
      setOpen(true)
    }
  }

  const volStats = getVolumeStats()
  const ready = isReadyForCheckout()

  return (
    <>
      <button 
        onClick={handleOpen}
        className="fixed bottom-4 right-4 z-30 bg-black text-white p-4 rounded-full shadow-xl hover:bg-gray-800 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
      </button>

      <ContainerSelectionModal 
        open={showContainerModal} 
        onClose={() => setShowContainerModal(false)} 
      />

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <header className="flex items-center justify-between p-4 border-b bg-gray-50">
                <h2 className="text-lg font-bold">{t.cart}</h2>
                <button 
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart?.selectedContainer ? (
                  <>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">
                          {cart.selectedContainer.name}
                        </h3>
                        <button 
                          onClick={() => {
                            clearContainerSelection()
                            setShowContainerModal(true)
                            setOpen(false)
                          }}
                          className="text-xs text-gray-500 hover:text-black"
                        >
                          {isSpanish ? "Cambiar" : "Change"}
                        </button>
                      </div>
                      
                      <ContainerVisual 
                        fillPercent={volStats.percent}
                        containerType={cart.selectedContainer.type}
                      />
                    </div>

                    <ContainerHUD />

                    <div className="space-y-2">
                      {cart.items.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">
                          {t.empty}
                        </p>
                      ) : (
                        cart.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                {item.qty} x {(item.volume || 0).toFixed(4)} m³
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => {
                                  updateItemQuantity(item.id, item.qty - 1)
                                  setReload(r => r + 1)
                                }}
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-sm font-medium">{item.qty}</span>
                              <button 
                                onClick={() => {
                                  updateItemQuantity(item.id, item.qty + 1)
                                  setReload(r => r + 1)
                                }}
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  removeItemFromCart(item.id)
                                  setReload(r => r + 1)
                                }}
                                className="p-1 hover:bg-red-100 text-red-500 rounded ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">{t.empty}</p>
                    <button 
                      onClick={() => setShowContainerModal(true)}
                      className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
                    >
                      {t.selectContainer}
                    </button>
                  </div>
                )}
              </main>

              <footer className="p-4 border-t">
                {cart?.selectedContainer ? (
                  <Link 
                    href={ready ? "/checkout" : "#"}
                    onClick={(e) => !ready && e.preventDefault()}
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                      ready 
                        ? "bg-black text-white hover:bg-gray-800" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
       
