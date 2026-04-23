import SearchFrom from "My_UI/navbar/search";
import RecommendationsSection from "My_UI/product_ui/recommended_section";
import Image from "next/image";
import SearchBody from "./body";

export async function generateMetadata(_, parent) {
    const parentMeta = await parent;

    return {
        ...parentMeta,
        title: "Search Results | Unitec USA Design",
        description:
            "Search results for PVC and WPC building materials at Unitec USA Design. Find products by application, finish, and performance requirements.",
        alternates: {
            canonical: `${process.env.BASE_URL}/search`,
        },

        robots: {
            index: false,
            follow: true,
        },

        openGraph: {
            ...parentMeta.openGraph,
            title: "Search Results – Unitec USA Design",
            description:
                "Browse search results across Unitec USA Design’s PVC and WPC building material collections.",
            url: `${process.env.BASE_URL}/search`,
        },

        twitter: {
            ...parentMeta.twitter,
            title: "Search Results – Unitec USA Design",
            description:
                "Find the right PVC and WPC building materials using Unitec USA Design search.",
        },
    };
}

export default async function SearchPage({ searchParams }) {
    const { q: query } = await searchParams

    return (
        <section className="min-h-screen bg-primary flex flex-col items-center justify-center py-10" >

            <Image
                alt="banner"
                className={` ${query ? ' z-0 aspect-2/1 max-h-[428] shadow-md shadow-accent2 object-cover object-top ' : "object-center object-contain"}`}
                fill
                src={`/raster/${query ? "containers.webp" : "contianer front2.png"}`}
            />
            {
                query
                    ? <div className=" w-full bg-linear-0 from-gray-900 to-transparent max-h-[428] h-full aspect-2/1 absolute z-0 inset-1 top-0 left-0" />
                    : null
            }

            <SearchFrom full query={query} />
            {
                query
                        ? <SearchBody query={query} />
                        : <RecommendationsSection title={t('search.noQueryTitle') || (lang === 'es' ? 'Productos Destacados' : 'Featured Products')} />
            }
        </section>

    );
}
