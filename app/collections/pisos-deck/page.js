
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "WPC Decking | PISOS DECK | Outdoor Flooring | Unitec USA Design",
        description: "Premium WPC decking for outdoor spaces. Weather-resistant, durable, and beautiful wood-like finishes for decks and patios.",
    };
}

export default async function PisosExteriorPage({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"PISOS DECK - Outdoor Decking"}
            description={"Create beautiful outdoor spaces with our premium WPC decking. The PISOS DECK collection offers weather-resistant, durable, and low-maintenance decking solutions. Perfect for patios, decks, pool areas, and outdoor entertaining spaces. Beautiful wood-like finishes without the upkeep."}
            cover={{ src: '/raster/exterior.webp', alt: 'WPC Decking' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Exterior",
                category: "PISOS",
                subcategories: ["PISOS DECK"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="Exterior"
        />
    );
}
