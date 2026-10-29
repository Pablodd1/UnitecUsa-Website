import productData from "static_data/products_full.json";
import matchesSearchQuery from "./handleSearch";
import { matchesSubcategoryFilter } from "lib/applyFilters";

const FIELDS = [
  "id",
  "slug",
  "name",
  "basePrice",
  "price",
  "currency",
  "price_per_m2",
  "discountPercent",
  "image",
  "image_alt_text",
  "dimensions",
  "width_cm",
  "length_cm",
  "thickness_mm",
  "units_per_box",
  "m2_per_box",
  "weight_kg_per_box",
  "container_volume_m3_per_unit",
  "boxes_per_container_20ft",
  "boxes_per_container_40ft",
  "m2_per_container_20ft",
  "m2_per_container_40ft",
  "collection",
  "subcategory",
  "category",
  "locale_variants",
];

function normalizeImage(img) {
  return img || '/raster/product.jpg';
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get("query");
  const onlyDiscounted = searchParams.get("onlyDiscounted") === "true";
  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const collection = searchParams.get("collection");
  const category = searchParams.get("category");
  const subcategoriesStr = searchParams.get("subcategories");
  const subcategories = subcategoriesStr ? subcategoriesStr.split(',').filter(Boolean) : [];

  const nopaginate = searchParams.get("nopaginate") === "true";
  const ITEMS_PER_PAGE = 15;

  const filteredProducts = productData
    .filter((item) =>
      onlyDiscounted ? Number(item.discountPercent) > 0 : true
    )
    .filter((item) => {
      if (collection && collection !== 'All' && item.collection?.toLowerCase() !== collection.toLowerCase()) return false;
      if (category && category !== 'All' && item.category?.toLowerCase() !== category.toLowerCase()) return false;

      if (!matchesSubcategoryFilter(item.subcategory, subcategories)) return false;
      return true;
    })
    .filter((item) =>
      matchesSearchQuery(item, searchQuery)
    );

  const totalItems = filteredProducts.length;

  if (nopaginate) {
    const rawItems = filteredProducts.map((item) =>
      FIELDS.reduce((acc, field) => {
        acc[field] = item[field];
        return acc;
      }, {})
    );
    const allItems = rawItems.map((it) => ({ ...it, image: normalizeImage(it.image) }));
    return Response.json({
      currentPage: 1,
      totalItems,
      items: allItems,
    });
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedItems = filteredProducts
    .slice(startIndex, endIndex)
    .map((item) =>
      FIELDS.reduce((acc, field) => {
        acc[field] = item[field];
        return acc;
      }, {})
    );

  const safePaginated = paginatedItems.map((it) => ({ ...it, image: normalizeImage(it.image) }));

  return Response.json({
    currentPage,
    totalItems,
    items: safePaginated,
  });
}
