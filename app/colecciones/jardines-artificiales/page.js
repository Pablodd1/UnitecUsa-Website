
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "Jardines Artificiales | Artificial Gardens & Green Walls | Unitec USA Design",
        description:
            "Premium artificial gardens, vertical gardens, and green wall solutions. UV-resistant, maintenance-free artificial plants and foliage for interior and exterior decoration.",
        alternates: {
            canonical: "https://unitecusadesign.com/colecciones/jardines-artificiales/",
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Jardines Artificiales – Unitec USA Design",
            description:
                "Transform spaces with beautiful artificial gardens and green walls. Zero maintenance, UV-resistant, and always green.",
            url: "https://unitecusadesign.com/colecciones/jardines-artificiales/",
            images: [
                {
                    url: `/raster/exterior.webp` || process.env.DEFAULT_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: "Unitec USA Design – Jardines Artificiales",
                },
            ],
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Jardines Artificiales – Unitec USA Design",
            description:
                "Premium artificial gardens and green wall solutions for modern spaces.",
            images: [`/raster/exterior.webp` || process.env.DEFAULT_IMAGE],
        },
    };
}


export default async function JardinesArtificiales({ searchParams }) {
    const sp = (await searchParams) || {};
    return (
        <Collections_UI
            searchParams={sp}
            h1={"Jardines Artificiales"}
            description={"Transform any space with our premium artificial gardens and green wall solutions. Our UV-resistant, maintenance-free artificial plants and foliage bring the beauty of nature to interior and exterior spaces without the hassle of watering, pruning, or sunlight requirements. Perfect for commercial spaces, offices, hotels, restaurants, and residential projects seeking year-round green aesthetics."}
            cover={{
                src: '/raster/exterior.webp',
                alt: 'Jardines Artificiales Collection'
            }}
            productURL="/api/collections/?"
            prefilters={{
                collection: "All",
                subcategories: ["JARDINES ARTIFICIALES"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="All"
        />
    );
}
