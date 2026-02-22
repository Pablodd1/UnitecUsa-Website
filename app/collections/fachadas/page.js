
import Collections_UI from "My_UI/collections/main";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;
    return {
        ...parentMeta,
        title: "Exterior Wall Cladding | FACHADA | Facade Panels | Unitec USA Design",
        description: "Premium exterior wall cladding and facade solutions. Weatherproof, UV-resistant, and beautiful designs for building exteriors.",
    };
}

export default async function FachadasPage({ searchParams }) {
    const sp = await searchParams;
    return (
        <Collections_UI
            searchParams={sp}
            h1={"FACHADA - Exterior Walls"}
            description={"Transform building exteriors with our premium wall cladding solutions. The FACHADA collection offers weatherproof, UV-resistant, and aesthetically pleasing panels for facades and exterior walls. Includes traditional FACHADA and modern POLIFACHADA options."}
            cover={{ src: '/raster/exterior.webp', alt: 'Exterior Wall Cladding' }}
            productURL="/API/collections?"
            prefilters={{
                collection: "Exterior",
                subcategories: ["FACHADA", "POLIFACHADA"],
                thicknessRange: [],
                widthRange: [],
                lengthRange: [],
                sort: "name-asc",
            }}
        />
    );
}
