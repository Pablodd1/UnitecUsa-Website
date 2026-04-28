# Project Architecture & Logistics Engine (Documentation)

This repository contains a high-performance building materials e-commerce platform with a sophisticated container logistics engine and SEO-optimized content delivery.

## 1. Core Architecture: Multi-Brand Context
The project is built on a "single codebase, multiple identities" philosophy using the `BrandContext.js` system.

- **Brand Definition (`utils/BrandContext.js`):** All brand assets (Logos, Favicons, HSL Color Palettes, SEO Metadata, and Social Handles) are defined in `BRAND_CONFIG`.
- **Identity Enforcement:** The code uses `BrandProvider` to inject these tokens into the UI. In this specific repository, the `BrandProvider` is hard-locked to either `"unitec"` or `"binw"` to ensure identity isolation.
- **Dynamic Assets:** The `Logo.jsx` and `Favicon` logic automatically swap based on the active brand configuration.

## 2. The Logistics Engine (Container Simulation)
The most critical feature is the real-time container loading simulator located in `utils/cart/cart.utils.js`.

### The Dual-Constraint Model
Unlike standard carts, this system validates items against **two physical limits simultaneously**:
1.  **Volume (m³):** Fixed at **33m³** (20ft) and **76m³** (40ft).
2.  **Weight (kg):** Capped at **28,000 kg** (Standard export limit).

### Key Functions
- **`containerFillPercent`:** Calculates total volume and total weight of all boxes in the cart. 
- **`calculateRemainingCapacity`:** Determines how many units of a specific product can still fit by checking both remaining volume and remaining weight. It returns the **lower** of the two numbers.
- **Fulfillment Logic:** The checkout button is locked until a container reaches a "Strategic Ready" state (99% Volume OR 99% Weight).

## 3. Product Database & Weight Integration
- **File:** `static_data/products_full.json`
- **Weight Calculation:** Product weights are calculated as `Area (m²) × Peso (kg x m²)`. 
- **Multipliers:** All calculations must multiply the unit properties by `itemsPerBox` before applying quantity (`qty`).

## 4. SEO & Spanish Blog Infrastructure
The blog section is designed for maximum search engine indexability.
- **Structure:** `app/blog/layout.js` (Root) and `app/blog/[slug]/layout.js` (Dynamic).
- **Metadata Generation:** The `generateMetadata` function performs a server-side lookup in `blogs_es.json` to inject unique Meta Titles, Descriptions, and Open Graph tags for every individual post.
- **Indexing:** The sitemap and robots configuration ensure all Spanish articles are crawlable by Google.

## 5. Development & Maintenance
- **Updating Weights:** Use the `update_weights.js` utility script to re-calculate product weights if the master CSV data changes.
- **Adding Products:** New products must include `width (cm)`, `length (cm)`, and `itemsPerBox` for the logistics engine to function.
- **Branding Changes:** To update colors or logos, modify the `BRAND_CONFIG` object in `utils/BrandContext.js`.
