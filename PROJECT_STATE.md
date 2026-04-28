# Antigravity AI Context Bridge: Current Project State

**Last Updated:** April 28, 2026
**Current Branch:** master
**Identity:** [Dynamic based on repo: Unitec USA Design / Building Innovation]

## 1. Recent Accomplishments (Completed Today)
- **Logistics Engine Upgrade:** Successfully implemented dual-constraint tracking. The cart now monitors both **Volume (33m³/76m³)** and **Weight (28,000kg)**.
- **Weight Data Integration:** 338 products have been updated with real-time weights calculated from the master CSV.
- **SEO Blog Infrastructure:** Implemented dynamic layout-based metadata for Spanish articles (`/blog/[slug]`).
- **UI Progress Bars:** Added visual Volume and Weight bars to the `CartControlPanel.jsx`.
- **Brand Isolation:** `BrandContext.js` is now configured to force the repository's native brand, preventing identity overlap.

## 2. Active Logic & "The Brain"
- **Fulfillment Rule:** Checkout unlocks at 99% of Volume **OR** 99% of Weight.
- **Data Multipliers:** The system strictly follows `UnitValue * itemsPerBox * qty`.
- **Metadata:** SEO tags are generated server-side in `layout.js` and the dynamic blog layouts.

## 3. Pending / Next Steps
- **Cart Validation Tests:** Verify that the "Add to Cart" button correctly disables when a user tries to add an item that exceeds the remaining weight (even if volume is available).
- **Blog Content:** Ensure the 5 initial Spanish articles in `blogs_es.json` match the slugs expected by the URL structure.
- **Brand-Specific Favicons:** Verify that the `unitec-favicon.png` and BI favicons are displaying correctly across all browsers.

## 4. Instructions for the Next AI Agent
1.  **Read `README_LOGISTICS_SEO.md`** for the full technical breakdown.
2.  **Read `utils/cart/cart.utils.js`** to understand the current container math.
3.  **Check `static_data/products_full.json`** for the latest weight attributes.
4.  Maintain the **Brand Isolation** by not changing the `activeBrand` state in `BrandContext.js`.
