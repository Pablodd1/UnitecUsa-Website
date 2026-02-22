
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "PVC Laminates | LAMINAS | Sheet Materials | Unitec USA Design",
        description: "High-quality PVC laminates and sheets for interior applications. Durable, waterproof, and available in various finishes.",
    };
}

export default async function LaminasPage({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"LAMINAS - PVC Sheets"}
            description={"Explore our premium collection of PVC laminates and sheet materials. The LAMINAS collection includes foam boards, marble finishes, and PVC boards perfect for walls, ceilings, and decorative applications. Easy to cut, install, and maintain."}
            cover={{ src: '/raster/interior.webp', alt: 'LAMINAS PVC Sheets' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Interior",
                subcategories: ["FOAM BOARD", "MARMOL", "PAREDES", "PVC BOARD"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
        />
    );
}
