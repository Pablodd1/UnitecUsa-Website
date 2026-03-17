
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "Exterior PVC Building Solutions | Weatherproof & UV Resistant | Unitec USA Design",
        description:
            "Explore exterior-grade PVC building materials designed for facades, cladding, roofing, and outdoor structures. Waterproof, UV-resistant, fire-rated, and maintenance-free.",
        alternates: {
            canonical: `${process.env.BASE_URL}/exteriors`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Exterior Building Solutions – Unitec USA Design",
            description:
                "High-performance PVC sheets engineered for exterior durability, weather resistance, and long-term architectural performance.",
            url: `${process.env.BASE_URL}/exteriors`,
            images: [
                {
                    url: `/raster/exterior.webp` || process.env.DEFAULT_IMAGE,
                    width: 1200,
                    height: 630,
                    alt:"Unitec USA Design – Innovative PVC & WPC Building Materials",
                },
            ],
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Exterior Building Solutions – Unitec USA Design",
            description:
                "Weatherproof, UV-resistant PVC sheets for exterior architectural applications.",
            images: [`/raster/exterior.webp` || process.env.DEFAULT_IMAGE],
        },
    };
}

export default async function Collections({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"Exterior Building Solutions"}
            description={"Discover high-performance PVC sheets designed for exterior applications. Built to withstand moisture, UV exposure, fire, and harsh environmental conditions, our exterior solutions deliver long-lasting durability with zero maintenance—ideal for facades, cladding, roofing, and outdoor architectural elements."}
            cover={{
                src: '/raster/exterior.webp',
                alt: '/raster/collection-exterior'
            }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Exterior",
                ...(sp.subcategories ? { subcategories: [sp.subcategories] } : {}),
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="Exterior"
        />
    );
}
