
import Collections_UI from "My_UI/collections/main";
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "Interior PVC & WPC Panels | Walls, Ceilings & Decorative Solutions",
        description: "Revestimientos arquitectónicos para interiores: paneles WPC acanalados, láminas de mármol PVC, cielo raso PVC, paneles acústicos y pisos SPC.",
        alternates: {
            canonical: "https://unitecusadesign.com/colecciones/interior/",
            languages: {
                es: "https://unitecusadesign.com/es/colecciones/interior/",
                en: "https://unitecusadesign.com/en/colecciones/interior/",
                "x-default": "https://unitecusadesign.com/es/colecciones/interior/",
            },
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Interior Building Solutions – Unitec USA Design",
            description:
                "Elegant, durable PVC and WPC panels designed for modern interior spaces.",
            url: "https://unitecusadesign.com/colecciones/interior/",
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
    const sp = (await searchParams) || {};
    return (
        <Collections_UI
            searchParams={sp}
            h1={"Interior Design Solutions"}
            description={"Transform interior spaces with Unitec’s premium PVC and WPC panels. Designed for walls, ceilings, decorative finishes, and high-humidity environments, our interior solutions combine elegant aesthetics with antimicrobial, waterproof, and maintenance-free performance—perfect for homes, offices, healthcare, and hospitality spaces."}
            cover={{
                src: '/raster/interior.webp',
                alt: '/raster/collection-interior'
            }}
            productURL="/api/collections/?"
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
