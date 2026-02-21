'use client'
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MultiSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle(val) {
    onChange(value.includes(val) ? value.filter(v => v !== val) : [...value, val]);
  }

  return (
    <div ref={dropdownRef} className="relative col-span-2 md:col-span-1">
      <motion.button
        aria-label="Toggle selection"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm flex justify-between items-center bg-white hover:border-gray-400 transition-colors"
      >
        <span className="truncate font-medium">
          {value.length ? `${value.length} selected` : label}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full min-w-[200px] rounded-xl border-2 border-gray-200 bg-white shadow-xl overflow-hidden"
          >
            <div className="max-h-[300px] overflow-auto p-2">
              {options.map(opt => (
                <motion.label
                  key={opt}
                  whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                  className="flex items-center gap-3 text-sm py-2.5 px-3 rounded-lg cursor-pointer transition-colors"
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${value.includes(opt) ? 'bg-black border-black' : 'border-gray-300'}`}>
                    {value.includes(opt) && <Check size={12} className="text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={value.includes(opt)}
                    onChange={() => toggle(opt)}
                    className="hidden"
                  />
                  <span className={value.includes(opt) ? "font-semibold" : ""}>{opt}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
