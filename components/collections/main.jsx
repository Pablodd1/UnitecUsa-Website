'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductItem from "My_UI/product/item"
import MyPagination from "My_UI/product/pagination";
import { applyFilters, sortProducts } from "lib/applyFilters";
import CollectionHero from "My_UI/collections/collection_hero";
import FilterUI from "My_UI/collections/filters_UI";
import NoProductsFound from "./noproduct";
import MyButton from "My_UI/btn/main";
import { useBrand } from "lib/BrandContext";

export default function Collections_UI({ searchParams = {}, h1, description, productURL, cover, prefilters, currentCollection }) {

    const queryCategory = searchParams?.category;
    const querySubcategory = searchParams?.subcategory;
    const querySubcategoriesParam = searchParams?.subcategories;
    const queryCollection = searchParams?.collection;

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState(prefilters);
    const { activeBrand } = useBrand();

    // Sync filters with URL params
    useEffect(() => {
        const syncFilters = () => {
            if (queryCategory || querySubcategory || queryCollection || querySubcategoriesParam) {
                setFilters(prev => ({
                    ...prev,
                    category: queryCategory || prev.category,
                    collection: queryCollection || prev.collection,
                    subcategories: querySubcategory ? [querySubcategory] : (querySubcategoriesParam ? querySubcategoriesParam.split(',').filter(Boolean) : prev.subcategories)
                }));
            }
        }
        syncFilters()
    }, [queryCategory, querySubcategory, queryCollection, querySubcategoriesParam]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = (extraParams = {}) => {
            setLoading(true);
            const url = new URL(`${productURL}nopaginate=true`, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
            Object.entries(extraParams).forEach(([k, v]) => {
                if (v != null) url.searchParams.set(k, v);
            });
            fetch(url.toString())
                .then(res => res.json())
                .then(data => {
                    if (data?.items) setProducts(data.items);
                    setLoading(false);
                }).catch(() => setLoading(false));
        }
        
        // Get category and collection from URL params
        const searchParams = new URLSearchParams(window?.location?.search || '');
        const categoryFromURL = searchParams.get('category');
        const collectionFromURL = searchParams.get('collection');
        
        // Initial fetch with filters from URL and prefilters
        fetchProducts({
            category: categoryFromURL || prefilters?.category,
            collection: collectionFromURL || prefilters?.collection
        });
    }, [productURL, prefilters?.category, prefilters?.collection]);

    // Apply filters + sorting
    const filtered = applyFilters(products, filters);
    const sortedProducts = sortProducts(filtered, filters.sort);
    const totalItems = sortedProducts.length;

    // Client-side pagination
    const ITEMS_PER_PAGE = 15;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleSetFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const whatsappLink = activeBrand === 'unitec' ? "https://wa.me/573054233147" : "https://wa.me/13054233147";

    return (
        <div className="overflow-visible pb-12">
            <CollectionHero
                h1={h1}
                description={description}
                cover={cover}
            />
            <FilterUI filters={filters} products={products} setFilters={handleSetFilters} currentCollection={currentCollection} />
            {
                loading
                    ? <div className="text-center py-20 text-gray-500">Loading products...</div> :
                    displayedProducts?.length > 0 ?
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-8">
                                {displayedProducts.map((p, index) => <ProductItem key={p.id} item={p} index={index} />)}
                            </div>

                            <div className="my-10">
                                <MyPagination
                                    current={currentPage}
                                    total={totalItems}
                                    pageSize={15}
                                    onChange={setCurrentPage}
                                    className="flex justify-center gap-2"
                                />
                            </div>
                        </>
                        : <NoProductsFound />
            }

            {/* Dynamic WhatsApp Advisor CTA Link */}
            <div className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-150 flex flex-col items-center gap-4 text-center mt-16 bg-gray-50/50 rounded-[2rem]">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 uppercase tracking-wide">
                    ¿No encuentra lo que busca o necesita asesoría técnica?
                </h3>
                <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
                    Hable directamente con uno de nuestros asesores para recibir acompañamiento personalizado, fichas técnicas a la medida o cotizaciones rápidas para sus proyectos.
                </p>
                <MyButton
                    label="Hable ya con un asesor"
                    href={whatsappLink}
                    className={{
                        btn: "bg-[#F37B24] hover:bg-[#E06A1A] px-8 py-3 h-12 hover:scale-105 transition-all duration-300 rounded-full text-white shadow-md border-none mt-2",
                        label: "font-bold text-white uppercase text-[12px] tracking-widest"
                    }}
                />
            </div>
        </div>
    );
}
