
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Uniflex Walls | PAREDES UNIFLEX",
        description: "Flexible and modern wall cladding solutions for diverse architectural needs.",
    };
}

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"PAREDES UNIFLEX"}
            description={"Flexible and modern wall cladding solutions for diverse architectural needs."}
            cover={{ src: '/raster/exterior.webp', alt: 'PAREDES UNIFLEX' }}
            productURL="/api/collections/?"
            prefilters={{
    "collection": "Exterior",
    "category": "PAREDES",
    "subcategories": [
        "PAREDES UNIFLEX"
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
