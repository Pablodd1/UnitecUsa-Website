
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Construction Adhesives | PEGANTES | Adhesives",
        description: "Professional building adhesives and bonding solutions for architectural projects.",
    };
}

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"PEGANTES - Adhesives"}
            description={"Professional building adhesives and bonding solutions for architectural projects."}
            cover={{ src: '/raster/interior.webp', alt: 'PEGANTES - Adhesives' }}
            productURL="/api/collections/?"
            prefilters={{
    "collection": "Interior",
    "category": "PEGANTES",
    "thicknessRange": [],
    "widthRange": [],
    "lengthRange": [],
    "sort": "name-asc"
}}
            currentCollection="Interior"
        />
    );
}
