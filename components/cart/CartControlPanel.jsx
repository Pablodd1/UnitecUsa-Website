"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Plus, Minus, Info, ArrowRight, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { containerFillPercent, calculateRemainingCapacity } from "utils/cart/cart.utils"

const CartControlPanel = ({ 
    container, 
    onAdd, 
    onRemove, 
    onSetQty, 
    totalItems, 
    totalPrice, 
    t 
}) => {
    const fill = containerFillPercent(container);
    const isFull = fill.filledTotal >= 99.0 || fill.weightFilledTotal >= 99.0;

    return (
        <section className="bg-white text-black flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-20 h-full border-l border-gray-100">
            {/* Minimalist Header */}
            <header className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                     <div className="flex items-center gap-2 mb-1">
                          <Package className="w-4 h-4 text-blue-600" />
                          <h2 className="font-black uppercase tracking-tighter text-base">Manifest</h2>
                     </div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                        Active Container: #{container?.id?.split('-')[0] || 'NEW'}
                     </p>
                </div>
                <div className="text-right">
                    <span className="block text-2xl font-black tracking-tighter">${totalPrice.toLocaleString()}</span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{totalItems} Units</span>
                </div>
            </header>

            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {container?.items.map((item) => {
                        const remaining = calculateRemainingCapacity(container, item);
                        
                        return (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative bg-white rounded-3xl p-4 border border-gray-100 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Tiny Product Picture */}
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-gray-50 overflow-hidden relative border border-gray-100 p-2 group-hover:scale-105 transition-transform">
                                        <Image
                                            src={item.image || '/raster/product.jpg'}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Metadata */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xs font-black leading-tight line-clamp-2 uppercase tracking-tight mb-1">
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-md uppercase">
                                                {item.category || 'Product'}
                                            </span>
                                            {remaining > 0 && (
                                                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wide">
                                                    +{remaining} More fits
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Interaction Controls */}
                                    <div className="flex flex-col items-center gap-1.5 ml-2">
                                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 p-1">
                                            <button 
                                                onClick={() => onRemove(container.id, item.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-red-500 transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-xs font-black">{item.qty}</span>
                                            <button 
                                                onClick={() => onAdd(container.id, item)}
                                                disabled={remaining <= 0}
                                                className={`w-8 h-8 flex items-center justify-center rounded-lg ${remaining > 0 ? 'hover:bg-white hover:text-blue-600' : 'opacity-20 cursor-not-allowed'} transition-colors`}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>

                {/* Quick Add Placeholder */}
                <Link href="/collections" className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] text-gray-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                     <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all">
                        <Plus size={20} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Products</span>
                </Link>
            </div>

            {/* Logistics Intelligence Footer */}
            <footer className="p-8 bg-[#0a0a0a] text-white rounded-t-[3rem] space-y-6">
                <div className="space-y-4">
                     <div className="flex flex-col gap-3">
                        {/* Volume Progress Bar */}
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic mb-1">
                            <span className="text-blue-400">VOLUME_EFFICIENCY</span>
                            <span className="text-white">{fill.filledTotal.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px] mb-3">
                             <motion.div 
                                className={`h-full rounded-full ${fill.filledTotal >= 99 ? 'bg-green-400' : 'bg-blue-500'}`}
                                animate={{ width: `${fill.filledTotal}%` }}
                                transition={{ type: "spring", stiffness: 30, damping: 12 }}
                             />
                        </div>

                        {/* Weight Progress Bar */}
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic mb-1">
                            <span className="text-amber-400">WEIGHT_LOAD_FACTOR</span>
                            <span className="text-white">{fill.weightFilledTotal.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                             <motion.div 
                                className={`h-full rounded-full ${fill.weightFilledTotal >= 99 ? 'bg-green-400' : 'bg-amber-500'}`}
                                animate={{ width: `${fill.weightFilledTotal}%` }}
                                transition={{ type: "spring", stiffness: 30, damping: 12 }}
                             />
                        </div>

                        {isFull ? (
                             <div className="flex gap-2 items-start p-3 bg-green-500/10 rounded-2xl border border-green-500/20 mt-4">
                                <ShieldCheck size={14} className="text-green-400 shrink-0 mt-0.5" />
                                <p className="text-[9px] font-bold text-green-400 uppercase leading-relaxed tracking-wider">
                                    OPTIMAL LOAD REACHED. {fill.filledTotal >= 99 ? 'VOLUME' : 'WEIGHT'} CAPACITY SECURED. READY FOR SHIPMENT.
                                </p>
                            </div>
                        ) : (
                            <div className="flex gap-2 items-start p-3 bg-white/5 rounded-2xl border border-white/5 mt-4">
                                <Info size={14} className="text-blue-400 shrink-0 mt-0.5" />
                                <p className="text-[9px] font-bold text-white/40 uppercase leading-relaxed tracking-wider">
                                    A minimum of 99% volume or weight capacity is required to proceed. Current status: {Math.max(fill.filledTotal, fill.weightFilledTotal).toFixed(0)}%.
                                </p>
                            </div>
                        )}
                     </div>
                </div>

                <Link 
                    href={isFull ? "/checkout" : "#"}
                    onClick={(e) => { if (!isFull) e.preventDefault() }}
                    className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group ${isFull ? 'bg-white text-black hover:bg-blue-500 hover:text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-95' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                >
                    <span className="relative z-10">{t('cart.proceedToCheckout')}</span>
                    <ArrowRight size={16} className={`relative z-10 ${isFull ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
                    {isFull && (
                        <motion.div 
                            className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={false}
                        />
                    )}
                </Link>
            </footer>
        </section>
    )
}

export default CartControlPanel
