
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "FAQs | PVC & WPC Products, Installation & Warranty | Unitec USA Design",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Find answers to common questions about Unitec USA Design’s PVC and WPC products, installation methods, warranties, fire ratings, and sustainability.",
        alternates: {
            canonical: "https://unitecusadesign.com/preguntas-frecuentes/",
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Unitec USA Design FAQs",
            description:
                "Get clear answers about PVC & WPC materials, product performance, installation, warranties, and ordering from Unitec USA Design.",
            url: "https://unitecusadesign.com/preguntas-frecuentes/",
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Unitec USA Design FAQs",
            description:
                "Everything you need to know about Unitec’s PVC and WPC construction products."
        },
    };
}
export default function PageLayout({children}) {
    return children
}