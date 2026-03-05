import productData from "StaticData/products_full.json";

// fields to return (easy to manage / edit)
const FIELDS = [
    "name",
    "basePrice",
    "discountPercent",
    "image",
    "id",
    "dimensions",
    "collection",
    "subcategory",
];

// Utility: pick random unique items
function pickRandomItems(items, count, excludeId = null) {
    const pool = excludeId
        ? items.filter((item) => item.id !== excludeId)
        : [...items];

    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Utility: extract safe fields
function pickFields(item) {
    return FIELDS.reduce((acc, field) => {
        acc[field] = item[field];
        return acc;
    }, {});
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const currentProductID = searchParams.get("current");

    let resultItems = [];

    if (currentProductID) {
        const currentIndex = productData.findIndex(
            (item) => String(item.id) === String(currentProductID)
        );

        if (currentIndex !== -1) {
            const prevItems = productData.slice(
                Math.max(0, currentIndex - 3),
                currentIndex
            );

            const nextItems = productData.slice(
                currentIndex + 1,
                currentIndex + 6
            );

            resultItems = [...prevItems, ...nextItems];

            // If not enough (edge cases), fill randomly
            if (resultItems.length < 8) {
                const needed = 8 - resultItems.length;
                const fillers = pickRandomItems(
                    productData,
                    needed,
                    currentProductID
                );
                resultItems.push(...fillers);
            }
        }
    }

    // Fallback: no current product → random 8
    if (resultItems.length === 0) {
        resultItems = pickRandomItems(productData, 8);
    }

    // Ensure uniqueness & remove current product if slipped in
    const uniqueItems = Array.from(
        new Map(
            resultItems
                .filter((item) => item.id !== currentProductID)
                .map((item) => [item.id, item])
        ).values()
    ).slice(0, 8);

    return Response.json({
        currentProductID: currentProductID ?? null,
        items: uniqueItems.map(pickFields),
    });
}
