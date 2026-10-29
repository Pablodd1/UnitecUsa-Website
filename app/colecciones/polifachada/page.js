
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Polyfacade | POLIFACHADA",
        description: "Advanced architectural facade solutions with modern finishes.",
    };
}

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"POLIFACHADA"}
            description={"Advanced architectural facade solutions with modern finishes."}
            cover={{ src: '/raster/exterior.webp', alt: 'POLIFACHADA' }}
            productURL="/api/collections/?"
            prefilters={{
    "collection": "Exterior",
    "category": "PAREDES",
    "subcategories": [
        "POLIFACHADA"
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
