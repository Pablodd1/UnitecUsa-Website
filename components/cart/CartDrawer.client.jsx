"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { subscribeCartUI, closeCart } from "lib/cart/cart.ui"
import { subscribeCart } from "lib/cart/cart.events"
import { getCart } from "lib/cart/cart.core"
import { totalQty } from "lib/cart/cart.selectors"
import RenderItemsList from "./renderItems"
import MiniContainerView from "./MiniContainerView"
import { useLanguage } from "lib/LanguageContext"
import Link from "next/link"

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(0)
  const [containers, setContainers] = useState([])
  const { language } = useLanguage()
  const isSpanish = language === 'es'

  const t = {
    cart: isSpanish ? "Carrito" : "Cart",
    empty: isSpanish ? "El carrito está vacío" : "Cart is empty",
    checkout: isSpanish ? "Pagar" : "Checkout",
    close: isSpanish ? "Cerrar" : "Close"
  }

  /* UI open / close */
  useEffect(() => {
    return subscribeCartUI(
      () => setOpen(true),
      () => setOpen(false)
    )
  }, [])

  /* 🔴 LIVE CART SUBSCRIPTION */
  useEffect(() => {
    const sync = () => {
      const container = getCart()
      setContainers([...container])
      setQty(totalQty())
    }

    sync()
    return subscribeCart(sync)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 h-full w-95 bg-white z-50 shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {t.cart} ({Number(qty)})
              </h2>
              <button
                onClick={closeCart}
                aria-label={t.close}
                className="text-sm opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                    {containers.length ? (
                        containers.map(container => (
                            <MiniContainerView
                                key={container.id}
                                container={container}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-10">
                            {t.empty}
                        </p>
                    )}
                </div>
                {containers.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link href="/cart" onClick={closeCart} className="w-full text-center py-2 px-4 bg-black text-white rounded-md text-sm font-medium">
                            View Full Cart Details
                        </Link>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <Link href="/checkout" aria-label={t.checkout} onClick={closeCart} className="block w-full bg-black text-white text-center py-2 rounded-md">
                {t.checkout}
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
