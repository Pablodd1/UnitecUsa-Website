import Collections_UI from "My_UI/collections/main";
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "Sale | Discounted PVC & WPC Building Materials",
        description: "Referencias seleccionadas de paneles WPC, láminas tipo mármol y pisos SPC con condiciones especiales para pedidos mayoristas por contenedor.",
        alternates: {
            canonical: "https://unitecusadesign.com/colecciones/sales/",
            languages: {
                es: "https://unitecusadesign.com/es/colecciones/sales/",
                en: "https://unitecusadesign.com/en/colecciones/sales/",
                "x-default": "https://unitecusadesign.com/es/colecciones/sales/",
            },
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Discounted Building Materials – Unitec USA Design",
            description:
                "Limited-time deals on premium PVC and WPC building solutions for bulk and project-based orders.",
            url: "https://unitecusadesign.com/colecciones/sales/",
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
    const sp = (await searchParams) || {};
    return (
        <Collections_UI
            searchParams={sp}
            h1={"Sale & Clearance Products"}
            description={"Get premium PVC and WPC building materials at reduced prices. Our sale section features discounted, high-quality products ideal for bulk orders, contractor projects, and cost-conscious developments—without compromising on performance, durability, or warranty coverage."}
            cover={{
                src: '/raster/sale.webp' || '/raster/exterior.webp',
                alt: 'Unitec USA Sale & Clearance Products'
            }}
            productURL="/api/collections/?onlyDiscounted=true&"
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
