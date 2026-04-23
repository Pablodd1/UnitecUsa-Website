
/**
 * Normalizes a string by removing accents and converting to lowercase.
 */
function normalize(str) {
    if (!str || typeof str !== "string") return "";
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

/**
 * Safely checks if a product matches a search query
 */
function matchesSearchQuery(product, query) {
    if (!query || typeof query !== "string") return true;

    const normalizedQuery = normalize(query).trim();
    if (!normalizedQuery) return true;

    const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

    const fieldsToSearch = [
        product.name,
        product.collection,
        product.subcategory,
        product.category,
        product.description,
        product.id,
        product.unit,
        product.dimensions,
    ].map(normalize);

    // AND logic: all words in the query must match at least one field
    return queryWords.every((word) => {
        return fieldsToSearch.some((field) => field.includes(word));
    });
}

export default matchesSearchQuery;