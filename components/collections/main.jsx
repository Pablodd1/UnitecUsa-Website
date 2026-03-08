
'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductItem from "My_UI/product/item"
import MyPagination from "My_UI/product/pagination";
import { applyFilters, sortProducts } from "lib/applyFilters";
import CollectionHero from "My_UI/collections/collection_hero";
import FilterUI from "My_UI/collections/filters_UI";
import NoProductsFound from "./noproduct";


export default function Collections_UI({ searchParams, h1, description, productURL, cover, prefilters }) {

    const queryCategory = searchParams.category;
    const querySubcategory = searchParams.subcategory;
    const queryCollection = searchParams.collection;

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState(prefilters);

    // Sync filters with URL params
    useEffect(() => {
        const syncFilters = () => {
            if (queryCategory || querySubcategory || queryCollection) {
                setFilters(prev => ({
                    ...prev,
                    category: queryCategory || prev.category,
                    collection: queryCollection || prev.collection,
                    subcategories: querySubcategory ? [querySubcategory] : prev.subcategories
                }));
            }
        }
        syncFilters()
    }, [queryCategory, querySubcategory, queryCollection]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = () => {
            setLoading(true);
            fetch(`${productURL}nopaginate=true`)
                .then(res => res.json())
                .then(data => {
                    // API now returns all items
                    setProducts(data.items);
                    setLoading(false);
                }).catch(() => setLoading(false));
        }
        fetchProducts()
    }, [productURL]);

    // Apply filters + sorting
    const filtered = applyFilters(products, filters);
    const sortedProducts = sortProducts(filtered, filters.sort);
    const totalItems = sortedProducts.length;

    // Client-side pagination
    const ITEMS_PER_PAGE = 15;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return (
        <div className="overflow-visible">
            <CollectionHero
                h1={h1}
                description={description}
                cover={cover}
            />
            <FilterUI filters={filters} products={products} setFilters={setFilters} />
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
        </div>
    );
}
