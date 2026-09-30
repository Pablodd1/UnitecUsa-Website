
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "About Unitec USA Design | Innovative PVC & WPC Building Materials",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Learn about Unitec USA Design — our innovation-driven approach to PVC and WPC building materials, sustainability commitment, and industry-leading quality standards.",
        alternates: {
            canonical: "https://unitecusadesign.com/nosotros/",
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "About Unitec USA Design",
            description:
                "Discover the story, values, and innovation behind Unitec USA Design’s advanced PVC and WPC construction solutions.",
            url: "https://unitecusadesign.com/nosotros/",
            images: [
                {
                    url: `/raster/containers.webp`,
                    width: 1200,
                    height: 630,
                    alt:
                        defaultData.title ||
                        "Unitec USA Design – Innovative PVC & WPC Building Materials",
                },
            ],
        },
        twitter: {
            ...parentMeta.twitter,
            title: "About Unitec USA Design",
            description:
                "Explore Unitec USA Design’s mission, sustainability focus, and leadership in modern building materials.",
            images: [`/raster/containers.png` || process.env.DEFAULT_IMAGE],
        },
    };
}
export default function PageLayout({children}) {
    return children
}