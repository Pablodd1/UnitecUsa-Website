'use client'
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MultiSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  function toggle(val) {
    onChange(value.includes(val) ? value.filter(v => v !== val) : [...value, val]);
  }

  function clearAll(e) {
    e.stopPropagation();
    onChange([]);
  }

  return (
    <div className="relative col-span-2 md:col-span-1">
      <motion.button
        ref={buttonRef}
        aria-label="Toggle selection"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm flex justify-between items-center bg-white hover:border-gray-400 transition-colors"
      >
        <span className="truncate font-medium">
          {value.length ? `${value.length} selected` : label}
        </span>
        <div className="flex items-center gap-2">
          {value.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-black text-white text-xs px-2 py-0.5 rounded-full"
            >
              {value.length}
            </motion.div>
          )}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </motion.button>
      
      {open && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/50 flex items-start justify-center pt-20 px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{label}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {value.length} option{value.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {value.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearAll}
                      className="text-sm text-gray-500 hover:text-black flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <X size={14} />
                      Clear all
                    </motion.button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Options Grid */}
              <div className="p-6 max-h-[60vh] overflow-auto">
                {options.length === 0 ? (
                  <p className="text-gray-500 py-8 text-center">No options available</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {options.map(opt => (
                      <motion.label
                        key={opt}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-4 text-base p-4 rounded-xl cursor-pointer border-2 transition-all ${
                          value.includes(opt) 
                            ? 'border-black bg-black/5' 
                            : 'border-gray-200 hover:border-gray-400 bg-white'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          value.includes(opt) 
                            ? 'bg-black border-black' 
                            : 'border-gray-300 bg-white'
                        }`}>
                          {value.includes(opt) && <Check size={16} className="text-white" />}
                        </div>
                        <input
                          type="checkbox"
                          checked={value.includes(opt)}
                          onChange={() => toggle(opt)}
                          className="hidden"
                        />
                        <span className={`font-medium truncate ${value.includes(opt) ? "text-black" : "text-gray-700"}`}>
                          {opt}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {options.length} option{options.length !== 1 ? 's' : ''} available
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen(false)}
                  className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
