
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "SPC Flooring | PISOS | Stone Plastic Composite | Unitec USA Design",
        description: "Premium SPC flooring for interior spaces. Waterproof, durable, and easy to install. Perfect for residential and commercial flooring.",
    };
}

export default async function PisosInteriorPage({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"PISOS - SPC Flooring"}
            description={"Upgrade your space with our premium SPC (Stone Plastic Composite) flooring. Our PISOS collection offers 100% waterproof, durable, and easy-to-install flooring solutions. Perfect for residential and commercial spaces, with a wide variety of wood and stone finishes."}
            cover={{ src: '/raster/interior.webp', alt: 'SPC Flooring' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Interior",
                category: "PISOS",
                subcategories: [],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="Interior"
        />
    );
}
