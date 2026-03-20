import productData from "StaticData/products_full.json";
import matchesSearchQuery from "../collections/handleSearch";
import { matchesSubcategoryFilter } from "lib/applyFilters";
import fs from 'fs';
import path from 'path';

const FIELDS = [
  "name",
  "basePrice",
  "discountPercent",
  "image",
  "id",
  "category",
  "subcategory",
  "collection",
  "dimensions",
];

function normalizeImage(img) {
  if (!img || typeof img !== 'string') return img;
  const rel = img.startsWith('/') ? img.slice(1) : img;
  const abs = path.resolve(process.cwd(), 'public', rel);
  if (fs.existsSync(abs)) return img;
  return '/raster/product.jpg';
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const nopaginate = searchParams.get("nopaginate") === "true";
  const category = searchParams.get("category");
  const collection = searchParams.get("collection");

  // Basic filtering by query and optional category/collection
  let items = productData.filter((p) => {
    const matches = matchesSearchQuery(p, query);
    const byCat = category ? p.category?.toLowerCase() === category.toLowerCase() : true;
    const byCol = collection ? p.collection?.toLowerCase() === collection.toLowerCase() : true;
    return matches && byCat && byCol;
  }).map((p) => ({ ...p }));

  // Normalize image paths to ensure no broken images
  items = items.map((it) => ({ ...it, image: normalizeImage(it.image) }));

  const ITEMS_PER_PAGE = 15;
  const totalItems = items.length;

  if (nopaginate) {
    return Response.json({ currentPage: 1, totalItems, items: items.map((it) => {
      return FIELDS.reduce((acc, field) => { acc[field] = it[field]; return acc; }, {});
    }) });
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = items.slice(startIndex, startIndex + ITEMS_PER_PAGE).map((it) => {
    return FIELDS.reduce((acc, field) => { acc[field] = it[field]; return acc; }, {});
  });

  return Response.json({ currentPage, totalItems, items: paginated });
}
