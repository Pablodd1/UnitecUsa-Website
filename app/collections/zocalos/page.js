
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "SPC Baseboards | ZOCALOS | Floor Trim | Unitec USA Design",
        description: "Premium SPC baseboards and floor trims. Perfect finishing touches for your flooring installations.",
    };
}

export default async function ZocalosPage({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"ZOCALOS - Baseboards"}
            description={"Complete your flooring installation with our premium SPC baseboards and trims. The ZOCALOS collection offers the perfect finishing touches for any room, available in various colors and styles to match your SPC flooring."}
            cover={{ src: '/raster/interior.webp', alt: 'Baseboards' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Interior",
                subcategories: ["SPC"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
        />
    );
}
