"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  getExperienceCart, 
  getVolumeStats, 
  getWeightStats, 
  initExperienceCart,
  removeItemFromCart,
  updateItemQuantity
} from "lib/cart/experienceCart.core"
import ThreeCartEngine from "components/cart/ThreeCartEngine"
import { Box, Trash2, Plus, Minus, Info, ChevronLeft, LayoutPanelLeft, FileSpreadsheet } from "lucide-react"
import Link from "next/link"
import productsData from "StaticData/products_full.json"

export default function LogisticsLab() {
  const [cart, setCart] = useState(null)
  const [reload, setReload] = useState(0)
  const [productsMap, setProductsMap] = useState({})

  useEffect(() => {
    initExperienceCart()
    // Create a map for fast lookup
    const pMap = {}
    productsData.forEach(p => pMap[p.id] = p)
    setProductsMap(pMap)
    
    const sync = () => setCart({...getExperienceCart()})
    sync()
    const interval = setInterval(sync, 500)
    return () => clearInterval(interval)
  }, [reload])

  if (!cart || !cart.selectedContainer) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center space-y-6">
          <LayoutPanelLeft className="w-16 h-16 mx-auto text-blue-500 opacity-50" />
          <h1 className="text-2xl font-bold tracking-widest uppercase">Logistics Lab Offline</h1>
          <p className="text-gray-500">Please select a container in the shop to initialize simulation.</p>
          <Link href="/collections" className="inline-block bg-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-500 transition-all">
            Enter Catalog
          </Link>
        </div>
      </div>
    )
  }

  const volStats = getVolumeStats()
  const weightStats = getWeightStats()

  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden flex flex-col md:flex-row">
      {/* --- Left Sidebar: Control Panel --- */}
      <aside className="w-full md:w-96 bg-black/40 backdrop-blur-3xl border-r border-white/5 z-20 flex flex-col shadow-2xl">
        <header className="p-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 text-blue-500 mb-6 hover:text-blue-400 transition-colors">
            <ChevronLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Store</span>
          </Link>
          <h1 className="text-3xl font-black italic text-white tracking-tighter leading-none mb-2">
            LOGISTICS<br />LAB <span className="text-blue-600">v5.1</span>
          </h1>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">Precision Export Simulation</p>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {/* Container Type Info */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Current Unit</h3>
              <span className="text-xs font-black text-blue-500 uppercase italic">{cart.selectedContainer.name}</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Internal Volume</span>
                <span className="text-white font-mono">{cart.selectedContainer.volume} m³</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Payload Capacity</span>
                <span className="text-white font-mono">{cart.selectedContainer.maxWeight.toLocaleString()} kg</span>
              </div>
            </div>
          </section>

          {/* Item List */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-2 flex justify-between">
              Manifest <span>{cart.items.length} SKUs</span>
            </h3>
            <div className="space-y-4">
              {cart.items.map(item => (
                <div key={item.id} className="group relative bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-white italic truncate pr-4 uppercase tracking-tight">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">ID: {item.id}</p>
                    </div>
                    <button 
                      onClick={() => {
                        removeItemFromCart(item.id)
                        setReload(r => r + 1)
                      }}
                      className="text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-black/40 rounded-full px-2 py-1 border border-white/5">
                      <button 
                        onClick={() => {
                          updateItemQuantity(item.id, item.qty - 1)
                          setReload(r => r + 1)
                        }}
                        className="p-1 hover:text-blue-500 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-black font-mono w-4 text-center">{item.qty}</span>
                      <button 
                        onClick={() => {
                          updateItemQuantity(item.id, item.qty + 1)
                          setReload(r => r + 1)
                        }}
                        className="p-1 hover:text-blue-500 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Net Vol</p>
                      <p className="text-xs font-black text-white">{(item.volume * item.qty).toFixed(3)} m³</p>
                    </div>
                  </div>
                </div>
              ))}
              {cart.items.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">No Cargo Loaded</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="p-8 border-t border-white/5 bg-black/20">
          <Link 
            href="/checkout"
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black italic uppercase tracking-tighter transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            Finalize Logistics
          </Link>
        </footer>
      </aside>

      {/* --- Main Area: 3D Engine --- */}
      <main className="flex-1 relative">
        <ThreeCartEngine 
          items={cart.items} 
          products={productsMap} 
          container={cart.selectedContainer} 
        />

        {/* Floating Detail Overlays */}
        <div className="absolute top-8 right-8 space-y-4 pointer-events-none">
            <div className="px-6 py-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-6">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Global Density</span>
                    <span className="text-2xl font-black text-white italic">{(volStats.used / volStats.total * 100).toFixed(1)}%</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-purple-500 uppercase tracking-widest">Weight Stress</span>
                    <span className="text-2xl font-black text-white italic">{(weightStats.used / weightStats.total * 100).toFixed(1)}%</span>
                </div>
            </div>
        </div>

        <div className="absolute bottom-12 right-12 flex gap-4 pointer-events-none">
            <div className="flex items-center gap-4 px-6 py-3 bg-blue-600 rounded-full shadow-2xl">
                <Info size={16} className="text-white" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Rotate Scene to Inspect Load Pattern
                </span>
            </div>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  )
}
