'use client';
import { motion } from "framer-motion";
import { buildRanges } from "lib/applyFilters";
import RangeCheckboxGroup from "My_UI/forms/checkbox";
import MultiSelect from "My_UI/forms/multiselect";
import SortDropdown from "My_UI/forms/sortDropDown";
import CollectionToggle from "My_UI/forms/toggles";
import Stylish_H2 from "My_UI/stylish_h2";

function toggleRange(current, next) {
    if (current && current[0] === next[0] && current[1] === next[1])
        return null;
    else
        return next;
}

export default function FilterUI({ filters, products, setFilters }) {

    // Derived filter options
    const subCategoriesFromData = Array.from(new Set(products.map(p => p.subcategory).filter(Boolean)));
    const thicknessRanges = buildRanges(products.map(p => p.dimensions?.metric?.thickness || 0).filter(v => v > 0));
    const widthRanges = buildRanges(products.map(p => p.dimensions?.metric?.width || 0).filter(v => v > 0));
    const lengthRanges = buildRanges(products.map(p => p.dimensions?.metric?.length || 0).filter(v => v > 0));

    return (

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto rounded-2xl shadow-lg p-6 md:p-8 mb-8 bg-white border border-gray-100 overflow-visible"
        >
            <div className="flex items-center justify-between mb-6">
                <Stylish_H2 h2="Filters" />
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-end overflow-visible relative z-10">
                <CollectionToggle value={filters.collection} onChange={v => setFilters(f => ({ ...f, collection: v }))} />
                <div className="sm:col-span-2 md:col-span-2 lg:col-span-2 overflow-visible relative z-20">
                    <label className="block text-sm font-medium mb-2">Subcategories</label>
                    <MultiSelect label="Subcategories" options={subCategoriesFromData} value={filters.subcategories} onChange={v => setFilters(f => ({ ...f, subcategories: v }))} />
                </div>
                <SortDropdown value={filters.sort} onChange={v => setFilters(f => ({ ...f, sort: v }))} />
            </div>

            {/* Dimension filters in a separate row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                <RangeCheckboxGroup title="Thickness (mm)" options={thicknessRanges} value={filters.thicknessRange} onChange={v => setFilters(f => ({ ...f, thicknessRange: toggleRange(f.thicknessRange, v) }))} />
                <RangeCheckboxGroup title="Width (cm)" options={widthRanges} value={filters.widthRange} onChange={v => setFilters(f => ({ ...f, widthRange: toggleRange(f.widthRange, v) }))} />
                <RangeCheckboxGroup title="Length (cm)" options={lengthRanges} value={filters.lengthRange} onChange={v => setFilters(f => ({ ...f, lengthRange: toggleRange(f.lengthRange, v) }))} />
            </div>
        </motion.div>
    )
}