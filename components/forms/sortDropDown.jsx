'use client';
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";

export default function SortDropdown({ value, onChange }) {
    return (
        <div className="relative">
            <label className="block text-sm font-medium mb-2">
                <ArrowUpDown className="inline w-4 h-4 mr-1" />
                Sort By
            </label>
            <motion.select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm bg-white hover:border-gray-400 transition-colors cursor-pointer appearance-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                }}
            >
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
                <option value="price-asc">Price (Low → High)</option>
                <option value="price-desc">Price (High → Low)</option>
            </motion.select>
        </div>
    );
}
