
import Collections_UI from "My_UI/collections/main";
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "Interior PVC & WPC Panels | Walls, Ceilings & Decorative Solutions | Unitec USA Design",
        description:
            "Premium PVC and WPC panels for interior walls, ceilings, and decorative applications. Waterproof, antimicrobial, fire-resistant, and zero maintenance.",
        alternates: {
            canonical: `${process.env.BASE_URL}/interiors`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Interior Building Solutions – Unitec USA Design",
            description:
                "Elegant, durable PVC and WPC panels designed for modern interior spaces.",
            url: `${process.env.BASE_URL}/interiors`,
            images: [
                {
                    url: `/raster/interior.webp` || process.env.DEFAULT_IMAGE,
                    width: 1200,
                    height: 630,
                    alt:"Unitec USA Design – Innovative PVC & WPC Building Materials",
                },
            ],
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Interior Building Solutions – Unitec USA Design",
            description:
                "Modern PVC & WPC interior panels for walls, ceilings, and decorative finishes.",
            images: [`/raster/interior.webp` || process.env.DEFAULT_IMAGE],
        },
    };
}


export default async function Collections({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"Interior Design Solutions"}
            description={"Transform interior spaces with Unitec’s premium PVC and WPC panels. Designed for walls, ceilings, decorative finishes, and high-humidity environments, our interior solutions combine elegant aesthetics with antimicrobial, waterproof, and maintenance-free performance—perfect for homes, offices, healthcare, and hospitality spaces."}
            cover={{
                src: '/raster/interior.webp',
                alt: '/raster/collection-interior'
            }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Interior",
                ...(sp.subcategories ? { subcategories: [sp.subcategories] } : {}),
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="Interior"
        />
    );
}
