
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "WPC Panels & Angles | PANELES WPC | Composite Materials | Unitec USA Design",
        description: "Premium WPC (Wood Plastic Composite) panels and angles for interior applications. Eco-friendly, durable, and beautiful wood-like finishes.",
    };
}

export default async function PanelesWpcPage({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"PANELES WPC Y ANGULOS"}
            description={"Our WPC (Wood Plastic Composite) panels combine the natural beauty of wood with the durability of plastic. Perfect for interior applications, our WPC panels are eco-friendly, moisture-resistant, and available in various wood-like finishes. Includes angles and trim pieces for complete installations."}
            cover={{ src: '/raster/interior.webp', alt: 'WPC Panels' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Interior",
                subcategories: ["WPC Interior"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
        />
    );
}
