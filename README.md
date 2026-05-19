# Unitec USA - High-Performance Materials Platform & Logistics Engine

Welcome to the **Unitec USA** e-commerce and logistics orchestration platform. This project represents a single-codebase, dual-identity system built on Next.js 16 (Turbopack) and custom React architecture. It integrates a real-time, medical/industrial-grade container simulator with a dynamic, SEO-optimized product catalog.

---

## 🚀 Getting Started

First, install dependencies:
```bash
npm install
```

To run the development server:
```bash
npm run dev
```

To compile and check production build output:
```bash
npm run build
```

---

## 🛠️ Core Architecture & Logic Workflows

This website operates with high standards of performance, security, and user experience. Below are the key workflows integrated into the codebase:

### 1. The Multi-Brand Context System (`utils/BrandContext.js`)
*   **Single-Codebase, Dual-Brand Philosophy:** Both **Unitec USA** and **Building Innovation** share a underlying software architecture.
*   **Isolation & Enforcement:** In this repository, the provider is hard-locked to `"unitec"`, dynamically injecting the correct corporate styling (HSL colors, typography), assets (Logo, Favicons), and SEO metadata.

### 2. Dual-Constraint Logistics Engine (`utils/cart/cart.utils.js`)
*   **Multi-Constraint Optimization:** Validates all orders against two distinct physical limits simultaneously:
    1.  **Volume Capacity:** Fixed at **33m³** (for 20ft containers) and **76m³** (for 40ft containers).
    2.  **Weight Payload:** Capped at **28,000 kg** (standard international export threshold).
*   **Dynamic Runtime Fallback:** If a product does not have a pre-calculated unit weight inside `products_full.json`, the engine computes it dynamically at runtime using the formula:
    $$\text{Area (sqm)} = \left(\frac{\text{width}}{100}\right) \times \left(\frac{\text{length}}{100}\right)$$
    $$\text{Unit Weight} = \text{Area (sqm)} \times \text{weightPerSqm}$$
*   **Packaging Multipliers:** Dynamically factors packaging standards:
    $$\text{Item Weight} = \text{Unit Weight} \times \text{itemsPerBox} \times \text{qty}$$
*   **Checkout Lock:** The checkout button dynamically locks and unlocks. Fulfillment requires reaching a **"Strategic Ready State"** of $\ge 99\%$ Volume **OR** $\ge 99\%$ Weight.

### 3. Front Desk Chatbot Widget
*   **Omnipresent Assistant:** Integrated smoothly across the site with a user-friendly conversational interface.
*   **Dismissibility:** Equipped with a standard `X` close button to hide the front desk chatbot whenever needed, remembering the user's preference.

### 4. Advanced Catalog Filters & Global Search
*   **Multilayer Filtering:** Products can be filtered dynamically by collections, subcategories, and dimensions.
*   **Search Integration:** Offers real-time keyboard search and filtration at the collection level, enabling high-performance client-side query matching.

### 5. Multilingual Localization (Spanish & English)
*   **Hydration-Safe Localization:** Persistent language settings are saved via a secure cookie (`NEXT_LOCALE`), avoiding hydration errors and layout shifts.
*   **Splash Screen Handoff:** Includes a mandatory branded splash screen with video transitions, gracefully handing off context between Unitec USA and Building Innovation.

---

## 🔍 Pending Verification & Website Standards

To maintain production-grade compliance, ensure the following items are verified:

- [ ] **Favicon Rendering:** Verify that `unitec-favicon.png` displays correctly in standard/dark browser tab interfaces.
- [ ] **Weight Limits Disabling Tests:** Verify that "Add to Cart" safely caps product quantities when adding one more unit would exceed the remaining weight allowance.
- [ ] **Spanish Blog Slug Validation:** Ensure all dynamic routes under `/blog/[slug]` match their corresponding entry keys in `blogs_es.json`.
- [ ] **Cross-Browser Verification:** Test interactive container rendering (specifically the selection modal's progress bars) on mobile iOS Safari, Android Chrome, and desktop platforms.
- [ ] **Database Pre-calculations:** Always run `node update_weights.js` after editing the primary CSV database to ensure maximum performance from pre-computed fields.