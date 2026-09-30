'use client';
import { motion } from "framer-motion";
import { buildRanges } from "lib/applyFilters";
import RangeCheckboxGroup from "My_UI/forms/checkbox";
import MultiSelect from "My_UI/forms/multiselect";
import SortDropdown from "My_UI/forms/sortDropDown";
import CollectionToggle from "My_UI/forms/toggles";

function toggleRange(current, next) {
    if (current && current[0] === next[0] && current[1] === next[1])
        return null;
    else
        return next;
}

export default function FilterUI({ filters, products, setFilters }) {
    const subCategoriesFromData = Array.from(new Set(products.map(p => p.subcategory).filter(Boolean)));
    const thicknessRanges = buildRanges(products.map(p => p.dimensions?.metric?.thickness || 0).filter(v => v > 0));
    const widthRanges = buildRanges(products.map(p => p.dimensions?.metric?.width || 0).filter(v => v > 0));
    const lengthRanges = buildRanges(products.map(p => p.dimensions?.metric?.length || 0).filter(v => v > 0));

    const optMapping = {
        "Todos": "All",
        "Interior": "Interior",
        "Exterior": "Exterior"
    };
    const optReverseMapping = {
        "All": "Todos",
        "Interior": "Interior",
        "Exterior": "Exterior"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto rounded-[2rem] shadow-lg p-8 md:p-10 mb-12 bg-white border border-gray-150 overflow-visible"
        >
            {/* Section H1 Header */}
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-slate-900 tracking-wider">
                    ENCUENTRE AQUÍ LO QUE NECESITA
                </h2>
                <div className="w-16 h-1 bg-[#F37B24] mx-auto mt-4 rounded-full" />
            </div>

            {/* Workflow Main Row: Colección, Buscar, Subcategorías */}
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 mb-8 overflow-visible relative z-30">
                
                {/* 1. Colección */}
                <div className="flex flex-col">
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest mb-3 block">
                        Colección
                    </h3>
                    <div className="w-full">
                        <CollectionToggle 
                            value={optReverseMapping[filters.collection] || "Todos"} 
                            onChange={v => setFilters(f => ({ ...f, collection: optMapping[v] }))} 
                            options={["Todos", "Interior", "Exterior"]}
                        />
                    </div>
                </div>

                {/* 2. Buscar */}
                <div className="flex flex-col">
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest mb-3 block">
                        Buscar
                    </h3>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Buscar por nombre o descripción..."
                            value={filters.searchQuery || ''}
                            onChange={e => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
                            className="w-full px-4 py-[9.5px] border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#132c3f] focus:border-transparent transition-all text-sm bg-white"
                        />
                        <svg className="absolute right-3.5 top-3.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* 3. Subcategorías */}
                <div className="flex flex-col relative overflow-visible z-40">
                    <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest mb-3 block">
                        Subcategorías
                    </h3>
                    <div className="w-full overflow-visible">
                        <MultiSelect 
                            label="Subcategorías" 
                            options={subCategoriesFromData} 
                            value={filters?.subcategories || []} 
                            onChange={v => setFilters(f => ({ ...f, subcategories: v }))} 
                        />
                    </div>
                </div>

            </div>

            {/* Sort & Dimensions Section (Separated line) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 border-t border-gray-150 items-end overflow-visible relative z-20">
                <div className="lg:col-span-1">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Ordenar por</span>
                    <SortDropdown value={filters.sort} onChange={v => setFilters(f => ({ ...f, sort: v }))} />
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <RangeCheckboxGroup title="Espesor (mm)" options={thicknessRanges} value={filters.thicknessRange} onChange={v => setFilters(f => ({ ...f, thicknessRange: toggleRange(f.thicknessRange, v) }))} />
                    <RangeCheckboxGroup title="Ancho (cm)" options={widthRanges} value={filters.widthRange} onChange={v => setFilters(f => ({ ...f, widthRange: toggleRange(f.widthRange, v) }))} />
                    <RangeCheckboxGroup title="Largo (cm)" options={lengthRanges} value={filters.lengthRange} onChange={v => setFilters(f => ({ ...f, lengthRange: toggleRange(f.lengthRange, v) }))} />
                </div>
            </div>

        </motion.div>
    );
}