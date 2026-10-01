# Agent Directives & Mandatory Skills

## Mandatory Operational Rule: Always Use Both Core Skill Sets

All AI agents operating in this repository must **ALWAYS** apply and enforce these two core skill domains on every task, modification, and commit:

---

### 1. GitHub Open Code Review & Verification (`code-review`, `autofix`)

Every proposed code change, bug fix, feature, and pull request must undergo a rigorous code review process:

1. **Pre-Commit Diff Review:**
   - Inspect `git diff` for all modified and untracked files before committing.
   - Verify that changes strictly adhere to the project's architecture and avoid unnecessary side effects.
2. **Defensive Programming & Security Check:**
   - **Zero Secret Exposure:** Never commit API keys, tokens, or private credentials.
   - **Input Validation & Anti-Spam:** Ensure all public endpoints and forms implement defensive sanitization, honeypot filters, and rate limiting.
   - **Safe Value Handling:** Guard against undefined/null access on nested objects, arrays, and search parameters.
3. **Automated Verification:**
   - Execute `npm run build` or local test runners before concluding any turn.
   - Ensure the build completes with **0 errors and 0 warnings**.
4. **Git Hygiene & Commit Standards:**
   - Use clear conventional commit messages (`feat:`, `fix:`, `refactor:`, `chore:`).
   - Ensure working trees are kept clean and synchronized with `origin/master`.

---

### 2. Modern Web Quality & React Best Practices (`vercel-react-best-practices`, `seo`, `accessibility`, `core-web-vitals`, `web-quality-audit`)

All frontend and server components must adhere to production-grade web platform standards:

1. **Next.js & React 19 Best Practices:**
   - Eliminate async waterfalls: parallelize independent server queries with `Promise.all`.
   - Prevent unnecessary client-side re-renders: use derived state, memoization where beneficial, and avoid inline component declarations.
   - Optimize bundle size: leverage tree-shakable package imports (e.g., `optimizePackageImports`).
2. **Technical SEO & AI Search (GEO):**
   - Ensure all canonical URLs resolve to `https://unitecusadesign.com/.../` with trailing slashes matching `next.config.js`.
   - Maintain JSON-LD structured data (Organization, WebSite, Product, FAQPage).
   - Maintain AI crawler readability (`robots.txt`, `llms.txt`, `llms-full.txt`).
3. **Accessibility (WCAG 2.2):**
   - Ensure all interactive elements include accessible labels (`aria-label`, button text).
   - Maintain correct heading hierarchies (`<h1>` through `<h3>`).
   - Preserve keyboard navigation and high-contrast focus rings.
4. **Core Web Vitals & Performance:**
   - Use `next/image` with explicit dimensions or fill attributes to eliminate Cumulative Layout Shift (CLS).
   - Preload primary fonts with `display: swap`.
   - Lazy load non-critical client modules and scripts.
