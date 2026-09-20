
export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    const defaultData = {
        title: "Política de Privacidad | Building Innovation AI - Unitec USA Design",
    };

    return {
        ...parentMeta,
        title: defaultData.title,
        description:
            "Política de Privacidad y Tratamiento de Datos Personales para la aplicación móvil Building Innovation AI y los servicios de Unitec USA Design.",
        alternates: {
            canonical: `https://unitecusadesign.com/politicas`,
        },
        openGraph: {
            ...parentMeta.openGraph,
            title: "Política de Privacidad | Building Innovation AI - Unitec USA Design",
            description:
                "Política de Privacidad y Tratamiento de Datos Personales para la aplicación móvil Building Innovation AI.",
            url: `https://unitecusadesign.com/politicas`,
        },
        twitter: {
            ...parentMeta.twitter,
            title: "Unitec USA Design Privacy Policy",
            description:
                "Our commitment to protecting your data and privacy.",
        },
    };
}
export default function PageLayout({children}) {
    return children
}