'use client';
import { motion } from "framer-motion";

export default function CollectionToggle({ value, onChange }) {
    const options = ["All", "Interior", "Exterior"];
    return (
        <div className="flex flex-col sm:flex-row gap-2 rounded-2xl col-span-2 lg:col-span-1 w-full items-stretch justify-evenly bg-gray-100 p-1.5">
            {options.map(opt => (
                <motion.button
                    key={opt}
                    aria-label={"Select " + opt}
                    onClick={() => onChange(opt)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all w-full sm:w-auto ${value === opt ? "bg-black text-white shadow-lg" : "text-gray-600 hover:bg-white hover:text-black"
                        }`}
                >
                    {opt}
                </motion.button>
            ))}
        </div>
    );
}
