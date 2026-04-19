export function buildRanges(values) {
    if (!values.length) return [];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const step = Math.ceil((max - min) / 3) || 1;
    return [0, 1, 2].map(i => ({
        key: i,
        label: `${min + i * step} – ${i === 2 ? max : min + (i + 1) * step}`,
        value: [min + i * step, i === 2 ? max : min + (i + 1) * step]
    }));
}

export function normalizeTaxonomyValue(value) {
    return String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

export function matchesSubcategoryFilter(productSubcategory, requestedSubcategories = []) {
    if (!requestedSubcategories?.length) return true;

    const normalizedProductSubcategory = normalizeTaxonomyValue(productSubcategory);
    if (!normalizedProductSubcategory) return false;

    return requestedSubcategories.some((requested) => {
        const normalizedRequested = normalizeTaxonomyValue(requested);
        if (!normalizedRequested) return false;

        if (normalizedProductSubcategory === normalizedRequested) return true;
        if (normalizedProductSubcategory.includes(normalizedRequested)) return true;

        const requestedTokens = normalizedRequested.split(" ").filter(Boolean);
        return requestedTokens.every((token) => normalizedProductSubcategory.includes(token));
    });
}

export function applyFilters(products, filters) {
    return products.filter(p => {
        if (filters.collection && filters.collection !== 'All' && p.collection?.toLowerCase() !== filters.collection?.toLowerCase()) return false;
        if (filters.category && filters.category !== 'All' && p.category?.toLowerCase() !== filters.category?.toLowerCase()) return false;
        
        const requestedSubs = filters.subcategories || [];
        if (requestedSubs.length && !matchesSubcategoryFilter(p.subcategory, requestedSubs)) return false;

        const inRange = (range, value) => !range?.length || (value >= range[0] && value <= range[1]);

        // Handle new dimensions structure (metric default)
        const dim = p.dimensions?.metric || p.dimension;
        // fallback to old structure if strict migration not done or mixed data? 
        // Use new structure access: dim.thickness (value in new schema is direct property if I wrote it as metric.thickness = value)

        if (!inRange(filters.thicknessRange, dim?.thickness)) return false;
        if (!inRange(filters.widthRange, dim?.width)) return false;
        if (!inRange(filters.lengthRange, dim?.length)) return false;

        return true;
    });
}

export function sortProducts(products, sort) {
    if (!products || !Array.isArray(products)) return [];
    return [...products].sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        const priceA = a.basePrice || 0;
        const priceB = b.basePrice || 0;

        if (sort === 'price-asc') return priceA - priceB;
        if (sort === 'price-desc') return priceB - priceA;
        if (sort === 'name-asc') return nameA.localeCompare(nameB);
        if (sort === 'name-desc') return nameB.localeCompare(nameA);
        return 0;
    });
}
