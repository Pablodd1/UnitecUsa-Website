
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "PVC Wall Panels | PAREDES | Interior Wall Solutions | Unitec USA Design",
        description: "Premium PVC wall panels for interior walls. Waterproof, antimicrobial, and easy to install. Perfect for residential and commercial spaces.",
    };
}

export default async function ParedesPage({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"PAREDES - Wall Panels"}
            description={"Discover our premium range of PVC wall panels designed to transform any interior space. Our PAREDES collection offers waterproof, antimicrobial, and easy-to-install panels perfect for residential and commercial applications. Available in marble, acoustic, and various textured finishes."}
            cover={{ src: '/raster/interior.webp', alt: 'PAREDES Wall Panels' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Interior",
                subcategories: ["ROLLO MARMOL", "ACOLCHADO", "MARMOL", "ACUSTICO", "PANEL PS", "PU", "MUROFLEX", "UNIFLEX"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
        />
    );
}
