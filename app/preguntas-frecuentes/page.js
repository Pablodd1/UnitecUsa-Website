import FAQ_UI from "My_UI/faq/main";
import faqsEn from "static_data/faqs.json";
import faqsEs from "static_data/faqs_es.json";
import { getRequestLocale } from "lib/seoMetadata";
import { interpolateSiteSettings } from "lib/siteSettings";

export default async function FAQPage() {
    const locale = await getRequestLocale();
    const faqData = locale === "en" ? faqsEn : faqsEs;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.faqs.map((faq) => ({
            "@type": "Question",
            "name": interpolateSiteSettings(faq.question),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": interpolateSiteSettings(faq.answer),
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <FAQ_UI />
        </>
    );
}
