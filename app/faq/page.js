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
    return (
        <FAQ_UI faqs={faqData.faqs} conversions={faqData.unitConversions} />
    );
}
