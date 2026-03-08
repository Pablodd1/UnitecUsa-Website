import productData from "StaticData/products_full.json";
import matchesSearchQuery from "./handleSearch";

// fields to return (easy to manage / edit)
const FIELDS = [
  "name",
  "basePrice",
  "discountPercent",
  "image",
  "id",
  "dimensions",
  "collection",
  "subcategory",
];


export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const searchQuery = searchParams.get("query");
  const onlyDiscounted = searchParams.get("onlyDiscounted") === "true";
  const currentPage = Number(searchParams.get("currentPage")) || 1;

  const nopaginate = searchParams.get("nopaginate") === "true";

  const ITEMS_PER_PAGE = 15;

  // Filter pipeline (order matters)
  const filteredProducts = productData
    .filter((item) =>
      onlyDiscounted ? Number(item.discountPercent) > 0 : true
    )
    .filter((item) =>
      matchesSearchQuery(item, searchQuery)
    );

  const totalItems = filteredProducts.length;

  if (nopaginate) {
    const allItems = filteredProducts.map((item) =>
      FIELDS.reduce((acc, field) => {
        acc[field] = item[field];
        return acc;
      }, {})
    );
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

  return Response.json({
    currentPage,
    totalItems,
    items: paginatedItems,
  });
}
