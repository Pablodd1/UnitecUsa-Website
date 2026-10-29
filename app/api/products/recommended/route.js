import productData from "static_data/products_full.json";

const FIELDS = [
    "id",
    "slug",
    "name",
    "basePrice",
    "price",
    "currency",
    "price_per_m2",
    "discountPercent",
    "image",
    "image_alt_text",
    "dimensions",
    "width_cm",
    "length_cm",
    "thickness_mm",
    "units_per_box",
    "m2_per_box",
    "weight_kg_per_box",
    "container_volume_m3_per_unit",
    "collection",
    "subcategory",
    "category",
    "locale_variants",
];

function pickRandomItems(items, count, excludeId = null) {
    const pool = excludeId
        ? items.filter((item) => item.id !== excludeId && item.slug !== excludeId)
        : [...items];

    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

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
            (item) =>
                String(item.id) === String(currentProductID) ||
                String(item.slug) === String(currentProductID)
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

    if (resultItems.length === 0) {
        resultItems = pickRandomItems(productData, 8);
    }

    const uniqueItems = Array.from(
        new Map(
            resultItems
                .filter((item) => item.id !== currentProductID && item.slug !== currentProductID)
                .map((item) => [item.id, item])
        ).values()
    ).slice(0, 8);

    return Response.json({
        currentProductID: currentProductID ?? null,
        items: uniqueItems.map(pickFields),
    });
}
