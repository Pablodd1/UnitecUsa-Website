import productData from "static_data/products_full.json";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const resolvedParams = await params;
    const lookupKey = String(resolvedParams.id || resolvedParams.ID || "").trim();

    const { searchParams } = new URL(request.url);
    const fieldsParam = searchParams.get("fields");
    const fields = fieldsParam ? fieldsParam.split(",") : null;

    // Find product by ID or keyword slug (case-insensitive)
    const lowerKey = lookupKey.toLowerCase();
    const product = productData.find(
        (item) =>
            String(item.id).toLowerCase() === lowerKey ||
            String(item.slug || "").toLowerCase() === lowerKey
    );

    if (!product) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
    }

    if (!fields) {
        return NextResponse.json(product);
    }

    const filteredProduct = {};
    for (const field of fields) {
        const key = field === 'ID' ? 'id' : field;
        const targetKey = field === 'dimension' ? 'dimensions' : key;

        if (targetKey in product) {
            filteredProduct[field] = product[targetKey];
        }
    }

    return NextResponse.json(filteredProduct);
}
