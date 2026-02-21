'use client';
import { motion } from "framer-motion";

export default function RangeCheckboxGroup({ title, options, value, onChange }) {

  return (
    <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <p className="mb-3 text-sm font-semibold text-gray-800">{title}</p>
      <div className="space-y-2">
        {options.map(opt => (
          <motion.label
            key={opt.key}
            whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
            className="flex items-center gap-3 cursor-pointer text-sm py-1.5 px-2 rounded-lg transition-colors"
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${Array.isArray(value) && value[0] === opt.value[0] && value[1] === opt.value[1] ? 'bg-black border-black' : 'border-gray-300 bg-white'}`}>
              {Array.isArray(value) && value[0] === opt.value[0] && value[1] === opt.value[1] && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              checked={Array.isArray(value) &&
                value[0] === opt.value[0] &&
                value[1] === opt.value[1]}
              onChange={() => onChange(opt.value)}
              className="hidden"
            />
            <span className={Array.isArray(value) && value[0] === opt.value[0] && value[1] === opt.value[1] ? "font-semibold" : "text-gray-600"}>
              {opt.label}
            </span>
          </motion.label>
        ))}
      </div>
    </div>
  );
}
