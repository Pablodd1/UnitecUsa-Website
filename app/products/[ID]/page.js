import ProductSection from "My_UI/product_ui/product_section";
import RecommendationsSection from "My_UI/product_ui/recommended_section";
import ReviewsSection from "My_UI/product_ui/review_section";
import HowShippingWorks from "My_UI/product_ui/steps";
import ProductDimensions from "My_UI/product_ui/dimension";
import ProductUseCases from "My_UI/product_ui/technical";
import ProductStory from "My_UI/product_ui/story";
import ProductSpecsTable from "My_UI/product_ui/ProductSpecsTable";
import NotFoundPage from "../../not-found";

// app/products/[ID]/page.jsx (or equivalent)

export async function generateMetadata({ params }, parent) {
  const parentMeta = await parent;
  const { ID } = await params;

  let product = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/API/products/${ID}?fields=id,name,description,image`,
      { cache: "no-store" }
    );

    if (res.ok) {
      product = await res.json();
    }
  } catch (e) {
    // silent fail – fallback meta will be used
  }

  const title =
    product?.name
      ? `${product.name} | PVC & WPC Building Materials | Unitec USA Design`
      : "Product Details | Unitec USA Design";

  const description =
    product?.description
      ? product.description.slice(0, 160)
      : "Explore high-performance PVC and WPC building materials by Unitec USA Design, engineered for durability, aesthetics, and zero maintenance.";

  const image =
    product?.image?.url || process.env.DEFAULT_IMAGE;

  const canonical = `${process.env.BASE_URL}/products/${ID}`;

  return {
    ...parentMeta,
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      ...parentMeta.openGraph,
      title,
      description,
      url: canonical,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product?.name || "Unitec USA Design Product",
        },
      ],
    },

    twitter: {
      ...parentMeta.twitter,
      title,
      description,
      images: [image],
    },
  };
}

import productData from "StaticData/products_full.json";

async function fetchProduct(id) {
  // Bypass fetch to avoid domain/env issues in Server Component
  const product = productData.find((item) => String(item.id) === String(id));
  if (!product) return null;
  return product;
}



export default async function ProductPage({ params }) {
  const ID = (await params)?.ID;
  const product = await fetchProduct(ID)

  if (!product) return <NotFoundPage />

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `Premium architectural materials by Unitec USA Design.`,
    "image": product.image?.url || process.env.DEFAULT_IMAGE,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Unitec USA Design"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "offerCount": "1",
      "lowPrice": product.basePrice || "0",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Unitec USA Design",
        "url": "https://unitecusadesign.com"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="">
        <div className="max-w-6xl mx-auto bg-white px-2 md:px-5 lg:px-12 flex flex-col gap-15 py-16">
          <ProductSection product={product} />
          <ProductStory product={product} description={product.description} />
          <ProductDimensions dimension={product.dimensions} />
          <ProductUseCases description={product.description} />
          <ProductSpecsTable product={product} />
        </div>
        <HowShippingWorks />
        <div className="max-w-11/12 mx-auto bg-white px-12 py-16">
          <RecommendationsSection itemID={ID} />
          {/* <ReviewsSection reviews={productReview.reviews} /> */}
        </div>
      </main>
    </>
  );
}
