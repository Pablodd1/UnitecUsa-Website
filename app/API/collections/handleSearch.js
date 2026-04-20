
/**
 * Safely checks if a product matches a search query
 */
function matchesSearchQuery(product, query) {
    if (!query || typeof query !== "string") return true;

    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;

    const fieldsToSearch = [
        product.name,
        product.collection,
        product.subcategory,
        product.category,
        product.description,
    ];

    return fieldsToSearch.some((field) => {
        if (!field || typeof field !== "string") return false;
        return field.toLowerCase().includes(normalizedQuery);
    });
}
export default matchesSearchQuery;