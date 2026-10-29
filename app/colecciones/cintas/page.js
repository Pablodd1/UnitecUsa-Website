
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Industrial Tapes | CINTAS | Tapes",
        description: "High-performance adhesive tapes for construction and industrial applications.",
    };
}

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"CINTAS - Industrial Tapes"}
            description={"High-performance adhesive tapes for construction and industrial applications."}
            cover={{ src: '/raster/interior.webp', alt: 'CINTAS - Industrial Tapes' }}
            productURL="/api/collections/?"
            prefilters={{
    "collection": "Interior",
    "category": "CINTAS",
    "thicknessRange": [],
    "widthRange": [],
    "lengthRange": [],
    "sort": "name-asc"
}}
            currentCollection="Interior"
        />
    );
}
