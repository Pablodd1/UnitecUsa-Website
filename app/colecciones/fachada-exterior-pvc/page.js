
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Outdoor PVC Facade | FACHADA EXTERIOR PVC",
        description: "Durable and weather-resistant PVC facade panels for building exteriors.",
    };
}

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"FACHADA EXTERIOR PVC"}
            description={"Durable and weather-resistant PVC facade panels for building exteriors."}
            cover={{ src: '/raster/exterior.webp', alt: 'FACHADA EXTERIOR PVC' }}
            productURL="/api/collections/?"
            prefilters={{
    "collection": "Exterior",
    "category": "PAREDES",
    "subcategories": [
        "FACHADA EXTERIOR PVC"
    ],
    "thicknessRange": [],
    "widthRange": [],
    "lengthRange": [],
    "sort": "name-asc"
}}
            currentCollection="Exterior"
        />
    );
}
