
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "UPVC Roofing | CUBIERTAS UPVC | Roof Sheets | Unitec USA Design",
        description: "Premium UPVC roofing sheets and tiles. Weatherproof, UV-resistant, and durable for exterior applications.",
    };
}

export default async function CubiertasUpvcPage({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"CUBIERTAS UPVC - Roofing"}
            description={"Protect your property with our premium UPVC roofing solutions. The CUBIERTAS UPVC collection offers weatherproof, UV-resistant, and durable roofing materials including tiles and sheets. Perfect for residential, commercial, and industrial applications."}
            cover={{ src: '/raster/exterior.webp', alt: 'UPVC Roofing' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Exterior",
                subcategories: ["TEJAS"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
        />
    );
}
