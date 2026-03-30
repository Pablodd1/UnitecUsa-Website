import Collections_UI from "My_UI/collections/main";
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "Sale | Discounted PVC & WPC Building Materials | Unitec USA Design",
        description:
            "Shop discounted PVC and WPC building materials from Unitec USA Design. Limited-time offers on premium, durable, and maintenance-free products.",
        alternates: {
            canonical: `${process.env.BASE_URL}/sale`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Discounted Building Materials – Unitec USA Design",
            description:
                "Limited-time deals on premium PVC and WPC building solutions for bulk and project-based orders.",
            url: `${process.env.BASE_URL}/sale`,
            images: [
                {
                    url: `/raster/sale.webp` || process.env.DEFAULT_IMAGE,
                    width: 1200,
                    height: 630,
                    alt:"Unitec USA Design – Innovative PVC & WPC Building Materials",
                },
            ],
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Sale – Unitec USA Design",
            description:
                "Save on premium PVC & WPC building materials with limited-time offers.",
            images: [`/raster/sale.webp` || `/raster/exterior.webp` || process.env.DEFAULT_IMAGE],
        },
    };
}


export default async function Collections({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"Sale & Clearance Products"}
            description={"Get premium PVC and WPC building materials at reduced prices. Our sale section features discounted, high-quality products ideal for bulk orders, contractor projects, and cost-conscious developments—without compromising on performance, durability, or warranty coverage."}
            cover={{
                src: '/raster/sale.webp' || '/raster/exterior.webp',
                alt: 'Unitec USA Sale & Clearance Products'
            }}
            productURL="/API/collections?onlyDiscounted=true&"
            prefilters={{
                collection: "All",
                subcategories: [],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="All"
        />
    );
}
