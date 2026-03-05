import productData from "StaticData/products_full.json";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { ID } = await params;

    // Parse requested fields from query string
    const { searchParams } = new URL(request.url);
    const fieldsParam = searchParams.get("fields");
    const fields = fieldsParam ? fieldsParam.split(",") : null;

    // Find product by ID
    const product = productData.find(
        (item) => String(item.id) === String(ID)
    );

    if (!product) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
    }

    // If no fields requested, return full product
    if (!fields) {
        return NextResponse.json({});
    }

    // Pick only requested fields
    const filteredProduct = {};
    for (const field of fields) {
        // Handle ID fetching explicitly if requested as ID vs id
        const key = field === 'ID' ? 'id' : field;
        const targetKey = field === 'dimension' ? 'dimensions' : key; // backward compat request

        if (targetKey in product) {
            filteredProduct[field] = product[targetKey];
        }
    }

    return NextResponse.json(filteredProduct);
}
