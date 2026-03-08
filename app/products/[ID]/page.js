import ProductSection from "My_UI/product_ui/product_section";
import productData from "StaticData/products_full.json";
// import productReview from "StaticData/products.json";
import RecommendationsSection from "My_UI/product_ui/recommended_section";
import ReviewsSection from "My_UI/product_ui/review_section";
import HowShippingWorks from "My_UI/product_ui/steps";
import ProductDimensions from "My_UI/product_ui/dimension";
import ProductUseCases from "My_UI/product_ui/technical";
import ProductStory from "My_UI/product_ui/story";
import NotFoundPage from "../../not-found";

// app/products/[ID]/page.jsx (or equivalent)

export async function generateMetadata({ params }, parent) {
  const parentMeta = await parent;
  const { ID } = await params;

  try {
    const product = productData.find((item) => String(item.id) === String(ID));

    if (!product) {
      return {
        title: "Product Not Found | Unitec USA Design",
        description: "The requested product could not be found.",
      };
    }

    const title = product?.name
      ? `${product.name} | PVC & WPC Building Materials | Unitec USA Design`
      : "Product Details | Unitec USA Design";

    const description = product?.description
      ? String(product.description).slice(0, 160)
      : "Explore high-performance PVC and WPC building materials by Unitec USA Design, engineered for durability, aesthetics, and zero maintenance.";

    const image = product?.image || process.env.DEFAULT_IMAGE || "/raster/interior.webp";

    const canonical = `${process.env.BASE_URL}/products/${ID}`;

    return {
      ...parentMeta,
      title,
      description,
      alternates: { canonical },
      openGraph: {
        ...parentMeta.openGraph,
        title,
        description,
        url: canonical,
        images: [{ url: image, width: 1200, height: 630, alt: product?.name || "Unitec USA Design Product" }],
      },
      twitter: { ...parentMeta.twitter, title, description, images: [image] },
    };
  } catch (error) {
    console.error("Error generating metadata for product:", ID, error);
    return { title: "Product | Unitec USA Design" };
  }
}

async function fetchProduct(id) {
  try {
    return productData.find((item) => String(item.id) === String(id)) || null;
  } catch (error) {
    console.error("Error fetching product:", id, error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const ID = (await params)?.ID;
  const product = await fetchProduct(ID)

  if (!product) return <NotFoundPage />

  // Ensure product has required fields with defaults
  const safeProduct = {
    ...product,
    name: product.name || "Unnamed Product",
    description: product.description || "",
    basePrice: product.basePrice || 0,
    category: product.category || "",
    subcategory: product.subcategory || "",
    collection: product.collection || "",
    itemsPerBox: product.itemsPerBox || 1,
    dimensions: product.dimensions || { metric: {}, imperial: {} },
    image: product.image || "/raster/product.jpg"
  };

  return (
    <main className="">
      <div className="max-w-6xl mx-auto bg-white px-2 md:px-5 lg:px-12 flex flex-col gap-15 py-16">
        <ProductSection product={safeProduct} />
        <ProductStory product={safeProduct} description={safeProduct.description} />
        <ProductDimensions dimension={safeProduct.dimensions} />
        <ProductUseCases description={safeProduct.description} />
      </div>
      <HowShippingWorks />
      <div className="max-w-11/12 mx-auto bg-white px-12 py-16">
        <RecommendationsSection itemID={ID} />
      </div>
    </main>
  );
}
