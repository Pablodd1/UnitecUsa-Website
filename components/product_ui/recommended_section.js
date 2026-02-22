'use client'
import EmblaCarousel from "My_UI/slides/main";
import Stylish_H2 from "My_UI/stylish_h2";
import { useEffect, useState } from "react";
import { useLanguage } from "lib/LanguageContext";

const OPTIONS = { slidesToScroll: 'auto' };

export default function RecommendationsSection({ itemID, title }) {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])

    // Determine title to display. If no title passed, or if it matches the legacy default, uses translation.
    const displayTitle = title && title !== "Best Selling Products" ? title : t('recommendations.title');

    // Fetch products
    useEffect(() => {
        const fetchRecommendations = () => {
            setLoading(true);
            fetch(`/API/products/recommended?current=${itemID}`)
                .then(res => res.json())
                .then(data => {
                    setProducts(data.items);
                    setLoading(false);
                }).catch(() => setLoading(false));
        };
        fetchRecommendations()
    }, [itemID]);


    return (
        <section className="my-24 w-11/12">
            <Stylish_H2 h2={displayTitle} />
            {/* <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-8"> */}
            {
                loading
                    ? <div className="text-center  col-span-full min-h-24 w-full min-w-96 py-20 text-gray-500">{t("recommendations.loading")}</div>
                    : <EmblaCarousel slides={products} options={OPTIONS} />
            }
            {/* </div> */}
        </section>
    );
}
