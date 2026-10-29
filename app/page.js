import RecommendationsSection from "My_UI/product_ui/recommended_section";
import HeroSec from "My_UI/homepage/herosection";
import WhyWeSection from "My_UI/homepage/why_we";
import HowShippingWorks from "My_UI/product_ui/steps";
import BuiltForBulk from "My_UI/homepage/buy_bulk";
import WhoItsFor from "My_UI/homepage/for_whom";
import HomeCTA from "My_UI/homepage/home_CTA";
import { getDictionary } from "lib/i18n/getDictionary";
import { buildPageMetadata, getRequestLocale } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/",
    titleEs: "Cielo Raso PVC, Paneles WPC y Pisos SPC por Contenedor",
    titleEn: "PVC Ceiling, WPC Wall Panels & SPC Flooring by Container",
    descriptionEs:
      "Importación directa por contenedor (20ft GP y 40ft HQ) y distribución mayorista de cielo raso PVC, paneles WPC, pisos SPC y láminas tipo mármol UV en EE. UU. y Latinoamérica.",
    descriptionEn:
      "Direct container import (20ft GP and 40ft HQ) and wholesale distribution of PVC ceilings, WPC wall panels, SPC flooring, and UV marble sheets across the US and Latin America.",
  });
}

export default async function HomePage() {
  const lang = await getRequestLocale();
  const dict = getDictionary(lang);

  return (
    <main className="">
      <HeroSec lang={lang} dict={dict} />
      <WhyWeSection lang={lang} dict={dict} />
      <HowShippingWorks lang={lang} dict={dict} />
      <BuiltForBulk lang={lang} dict={dict} />
      <WhoItsFor lang={lang} dict={dict} />
      <HomeCTA lang={lang} dict={dict} />
      <div className="mx-auto bg-white px-12 py-16">
        <RecommendationsSection 
          title={dict.hero.stats.products} 
          lang={lang} 
          dict={dict} 
        />
      </div>
    </main>
  );
}
