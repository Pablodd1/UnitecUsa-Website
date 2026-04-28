import FAQ_UI from "My_UI/faq/main";
import faqData from "StaticData/faqs.json";

export const metadata = {
    title: "FAQ & Technical Resources | Unitec USA Design",
    description: "Frequently asked questions about ordering, shipping, installation, and technical unit conversions for our PVC and WPC products.",
    openGraph: {
        title: "Help Center – Unitec USA Design",
        description: "Find answers to common questions and technical reference guides.",
        type: "website",
    }
};

export default function FAQPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
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
