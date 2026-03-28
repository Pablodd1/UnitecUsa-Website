"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  FormInput,
  Package,
  TrendingUp,
  ChevronRight,
  Activity,
} from "lucide-react"
import { useLanguage } from "lib/LanguageContext"

/**
 * HowShippingWorks Component
 * Unified premium design for logistics workflow.
 * Version 2.0 - Clean & Interactive
 */
export default function HowShippingWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      id: "01",
      title: t('steps.items.select.title'),
      desc: t('steps.items.select.desc'),
      icon: FormInput,
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      id: "02",
      title: t('steps.items.fill.title'),
      desc: t('steps.items.fill.desc'),
      icon: Package,
      color: "from-indigo-500/20 to-purple-500/20",
    },
    {
      id: "03",
      title: t('steps.items.ship.title'),
      desc: t('steps.items.ship.desc'),
      icon: TrendingUp,
      color: "from-purple-500/20 to-fuchsia-500/20",
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden" id="como-funciona">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            <Activity size={14} className="animate-pulse" />
            <span>Workflow Matrix</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 italic uppercase leading-none">
            {t('steps.title')}
          </h2>
          
          <p className="text-slate-500 text-xl leading-relaxed font-medium">
            {t('steps.subtitle')}
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          
          {/* Abstract Connection Line */}
          <div className="hidden md:block absolute top-[25%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-100 to-transparent z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: "circOut" }}
              whileHover={{ y: -12 }}
              className="relative group z-10"
            >
              <div className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(37,99,235,0.08)] group-hover:border-blue-100">
                
                {/* Step Index Backdrop */}
                <div className="absolute top-10 right-12 text-7xl font-black text-slate-50/80 italic tracking-tighter group-hover:text-blue-50 transition-colors duration-500 pointer-events-none">
                  {step.id}
                </div>

                {/* Visual Icon */}
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-10 transform group-hover:rotate-12 transition-all duration-500 shadow-sm`}>
                  <step.icon size={32} className="text-slate-800" />
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-semibold text-sm">
                    {step.desc}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="mt-10 pt-10 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Initialization Ready</span>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Meta */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-block px-6 py-3 bg-slate-50 rounded-full border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              Global Standard Logistics Protocol v4.0
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
