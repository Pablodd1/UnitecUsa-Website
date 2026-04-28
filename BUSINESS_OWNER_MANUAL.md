# 🏗️ Business Owner’s Operational Manual: Unitec USA Design

Welcome to your new digital logistics and export platform. This document serves as your master guide for managing the content, logistics, and technical infrastructure of your website.

---

## 1. Project Ownership & Governance
Your website is built using **Next.js** and is structured as a **Proprietary Logistics Engine**.
*   **Source Code Repository:** [GitHub - UnitecUsa-Website](https://github.com/Pablodd1/UnitecUsa-Website)
*   **Live Production URL:** [https://unitecusadesign.com](https://unitecusadesign.com)
*   **Hosting Platform:** Vercel (recommended for real-time updates).

---

## 2. Managing Your Product Inventory
All products visible on the site are managed via a single data file. This allows you to update prices and descriptions without touching the website's core code.

*   **File Location:** `static_data/products_full.json`
*   **How to Update:**
    1.  Open the file in GitHub.
    2.  Locate the product by its `id`.
    3.  Update the `basePrice`, `description`, or `name`.
    4.  Commit the changes. The website will automatically rebuild with the new data.

---

## 3. The Logistics Engine (Container Configurator)
The website calculates shipping loads based on container volumes. These are calibrated to industry standards but can be adjusted.

*   **Config File:** `utils/cart/containerTypes.js`
*   **Standard Capacities:**
    *   **20ft Container:** 33.0 m³
    *   **40ft High Cube:** 76.0 m³
*   **Adjustment:** If you change shipping providers and need to adjust these limits, update the `volume` field in the file above.

---

## 4. Multilingual SEO & Content Control
All text on the site (English & Spanish) is centralized to ensure consistency for search engines and AI models.

*   **File Location:** `utils/i18n/translations.js`
*   **Tasks:**
    *   **Changing Meta Titles:** Look for the `meta` section in the translation file.
    *   **Updating Contact Info:** Search for phone numbers or addresses in this file to update them globally across the footer, contact page, and AI schemas.

---

## 5. Publishing Blog Articles
The blog is your primary tool for "Topical Authority." AI engines (ChatGPT/Perplexity) prioritize sites with fresh, technical content.

*   **Folder Location:** `content/blog/`
*   **Format:** Articles are written in **Markdown (.md)**.
*   **Process:** 
    1.  Create a new `.md` file in the folder.
    2.  Add the "Frontmatter" (Title, Date, Image, Author) at the top.
    3.  Write your content below.

---

## 6. AI Search Optimization (GEO)
We have implemented **Advanced JSON-LD Schema**. This is "invisible code" that tells AI bots:
1.  **Who you are:** Unitec USA Design (Wholesale entity).
2.  **Where you are:** Doral, Miami, FL.
3.  **What you do:** Bulk export of PVC/WPC materials.

*   **Validation:** You can test how AI sees your site using the [Google Rich Results Test](https://search.google.com/test/rich-results).

---

## 7. Technical Handover Checklist
Before the final handover, ensure you have access to:
- [ ] **GitHub Account:** Admin access to the repository.
- [ ] **Vercel Account:** Owner of the deployment project.
- [ ] **Domain Registrar:** Access to DNS settings for `unitecusadesign.com`.
- [ ] **Google Search Console:** Verification for the domain.

---

## 8. Support, Maintenance & Liability
To ensure the long-term stability of the platform, the following terms apply to the handover:

*   **Final Acceptance:** Upon transfer of the GitHub repository and Vercel project, the platform is considered "Accepted" and delivered in full working order.
*   **Liability Waiver:** The developer is not responsible for system failures, data loss, or visual "breaks" caused by the client or third parties (e.g., unauthorized code edits, deleting JSON fields, or server misconfiguration).
*   **Warranty Period:** A 30-day "Critical Bug Fix" period is included. This covers fixing functional errors existing at the time of delivery. It does *not* include new features or design changes.
*   **Post-Handover Support (Fees):** 
    *   **Hourly Support:** Any work requested after the 30-day window will be billed at the developer's standard hourly rate.
    *   **Maintenance Retainer:** (Optional) A monthly fee can be negotiated to cover security patches, data backups, and small content updates.
    *   **Emergency Fixes:** If the client breaks the site and requires an immediate fix, an "Emergency Rate" will apply.

---

**Technical Support:** This platform was designed to be low-maintenance. Most updates only require editing the `.json` or `.js` files mentioned above. For structural changes, a Next.js developer is recommended.
