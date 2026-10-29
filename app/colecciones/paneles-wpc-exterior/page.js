
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Outdoor WPC Panels | PANELES WPC EXTERIOR",
        description: "Premium durable outdoor WPC panels for architectural projects and exterior cladding.",
    };
}

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"PANELES WPC EXTERIOR"}
            description={"Premium durable outdoor WPC panels for architectural projects and exterior cladding."}
            cover={{ src: '/raster/exterior.webp', alt: 'Outdoor WPC Panels' }}
            productURL="/api/collections/?"
            prefilters={{
                collection: "Exterior",
                category: "PANELES WPC Y ANGULOS",
                subcategories: ["PANELES WPC EXTERIOR"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="Exterior"
        />
    );
}
