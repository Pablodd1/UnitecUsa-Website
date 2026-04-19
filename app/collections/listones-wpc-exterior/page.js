
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Outdoor WPC Slats | LISTONES WPC EXTERIOR | Unitec USA Design",
        description: "Weatherproof WPC slats and battens for outdoor architectural use.",
    };
}

export default async function Page({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"LISTONES WPC EXTERIOR"}
            description={"Weatherproof WPC slats and battens for outdoor architectural use."}
            cover={{ src: '/raster/exterior.webp', alt: 'LISTONES WPC EXTERIOR' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Exterior",
                category: "LISTONES",
                subcategories: [],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
            currentCollection="Exterior"
        />
    );
}
