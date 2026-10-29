
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Deck Facade | FACHADA DECK",
        description: "Premium deck facade solutions for exterior walls and architectural cladding.",
    };
}

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"FACHADA DECK"}
            description={"Premium deck facade solutions for exterior walls and architectural cladding."}
            cover={{ src: '/raster/exterior.webp', alt: 'FACHADA DECK' }}
            productURL="/api/collections/?"
            prefilters={{
    "collection": "Exterior",
    "category": "PAREDES",
    "subcategories": [
        "FACHADA DECK"
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
