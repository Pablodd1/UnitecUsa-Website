
import Collections_UI from "My_UI/collections/main";
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "Colecciones de Productos | Materiales de Construcción PVC y WPC | Unitec USA Design",
        description:
            "Browse Unitec USA Design’s full collection of PVC and WPC building materials, engineered for interior and exterior applications with long-lasting performance and zero maintenance.",
        alternates: {
            canonical: "https://unitecusadesign.com/colecciones/",
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Todas las Colecciones de Productos – Unitec USA Design",
            description:
                "Explore our complete range of innovative PVC and WPC building solutions for residential, commercial, and architectural projects.",
            url: "https://unitecusadesign.com/colecciones/",
            images: [
                {
                    url: `/raster/interior.webp` || process.env.DEFAULT_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: "Unitec USA Design – Innovative PVC & WPC Building Materials",
                },
            ],
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Todas las Colecciones de Productos – Unitec USA Design",
            description:
                "Discover the full range of Unitec USA Design PVC & WPC building materials.",
            images: [`/raster/interior.webp` || process.env.DEFAULT_IMAGE],
        },
    };
}


export default async function Collections({ searchParams }) {
    const sp = (await searchParams) || {};
    return (
        <Collections_UI
            searchParams={sp}
            h1={"MATERIALES PARA TODOS LOS GUSTOS Y PARA TODOS LOS PROYECTOS."}
            description={"Los productos que necesita, listos para entregar e instalar. Más de 500 referencias, entre alternativas constructivas para interiores y para exteriores, categorizadas en 14 colecciones."}
            cover={{
                src: '/raster/interior.webp',
                alt: 'collection banner'
            }}
            productURL="/api/collections/?"
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
