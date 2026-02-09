# Phase 2 — Delta audit (production = source of truth)

**Audit date:** Based on live boylebags.com + local repo.  
**Goal:** Complete B2B conversion funnel; implement only missing items.

---

## 1) Live pages summary

| Route | Current UX | Primary CTAs |
|-------|------------|---------------|
| **/** | Hero "Custom Corporate Bags. Delivered On-Spec, On-Time."; subhead B2B/volume; callout "Start Your Volume Order" with MOQ 500. | "Get Tiered Quote (MOQ Applies)" → /custom (x2); "Request Material Samples" → /sample-pack. No prices/cart. |
| **/shop** | Hero "Custom Bag Manufacturing – Bulk & Wholesale"; "Wholesale Only"; trust layer (Direct Pricing, PMS, Global Logistics, Quality Check, Digital Mockups); 3 kits (Event Saver, Retail Ready, Swag Stash Starter); MOQ note in footer. | "Start High-Volume Quote" → /custom; "Request Sample Pack" → /sample-pack; each card "View Specs & Quote" → **/products/canvas-tote-bag** (live). No prices/cart. |
| **/custom** | "Volume Quotation Request (500+ Units)"; form: Quantity, Product Interest, Application/Use, Target Delivery Date, Company, Work Email, Contact Phone, Specific Requirements; trust block. | "Submit Qualified Quote Request". No prices/cart. |
| **/products/canvas-tote-bag** | B2B use cases, industries, Request a Quote section. | "Request Tiered Quote (MOQ Applies)" → /custom?productInterest=Canvas%20Tote%20Bag; "Request Sample Pack" → /sample-pack. No prices/cart. |

---

## 2) Route → file map (Next.js App Router)

| Live route | Local file(s) |
|------------|----------------|
| / | src/app/page.tsx |
| /shop | src/app/shop/page.tsx, content from content.pages["/shop"], grid from SHOP_KITS (src/lib/shopKits.ts), cards from ShopKitCard |
| /custom | src/app/custom/page.tsx, src/app/custom/CustomClient.tsx → CustomRFQForm (src/components/CustomRFQForm.tsx) |
| /products/canvas-tote-bag | src/app/products/canvas-tote-bag/page.tsx → ProductTemplate (src/components/ProductTemplate.tsx) |
| /sample-pack | src/app/sample-pack/page.tsx |
| /contact | src/app/contact/page.tsx |
| /services | src/app/services/page.tsx |
| Nav / global | src/app/layout.tsx (TrustBar, Navbar, footer); Navbar uses content.site.navLinks |

---

## 3) Gap report (Phase-2 checklist)

| Item | Status | Evidence |
|------|--------|----------|
| **A) /custom as primary conversion path** | ✅ | Home and callout CTAs → /custom; shop hero "Start High-Volume Quote" → /custom; product page "Request Tiered Quote" → /custom. Nav has Custom link. |
| **B) MOQ 500 gate blocks submit + message** | ✅ | CustomRFQForm: canSubmit requires meetsMOQ (quantityNum >= 500); button disabled when !meetsMOQ; field error MOQ_SOFT_GATE_MESSAGE. API route: qty < 500 returns 400 with same message. |
| **C) Quote form fields + validation** | ✅ | Quantity (min 500), Target Delivery Date (min today+15 biz days), Product Interest, Application/Use, Company Name, Work Email (no free email), Contact Phone (optional, US format), Specific Requirements (max 500). Client + server validation. |
| **D) Post-submit success state + next steps** | ✅ | After submit: "Request Received." + "Your quote breakdown... will be emailed to {email} within 24 business hours. Do not send a duplicate request." |
| **E) Submission handler with validation** | ✅ | POST /api/lead; type "custom"; validates required fields, MOQ ≥500, delivery date ≥ min, no free email, company length. |
| **F) Query param prefill /custom?kit=...** | ⚠️ | Form prefills productInterest and quantity from URL. **Missing:** `kit` param (e.g. /custom?kit=event-saver) is not read; shop cards on local use /custom?kit= but form does not map kit → productInterest. |
| **G) Nav + primary CTAs aligned to /custom** | ✅ | content.ts navLinks include /custom; home and shop hero CTAs point to /custom. (Live shop cards point to /products/canvas-tote-bag; local repo has /custom?kit= in shopKits.) |

**Only gap to implement:** F — support `kit` query param in CustomRFQForm so that /custom?kit=event-saver (or retail-ready, swag-stash-starter) prefills Product Interest with the kit name.

---

## 4) Implementation (minimal)

- **File:** `src/components/CustomRFQForm.tsx`
- **Change:** Read `searchParams.get("kit")`; if present, resolve kit name from SHOP_KITS (by id) and use it as productInterest prefill so /custom?kit=event-saver (and other kit ids) prefill the form.
- No refactors; no cart/price/reviews; styling unchanged.

---

## 5) Verify

### Local

1. **Build:** `npm run build` — must pass with no errors.
2. **Dev:** `npm run dev` → open `http://localhost:3001` (or your dev port).
3. **Kit prefill:**
   - Open `http://localhost:3001/custom?kit=event-saver` → Product Interest should show or allow "Event Saver Kit".
   - Same for `?kit=retail-ready` (Retail Ready Kit), `?kit=swag-stash-starter` (Swag Stash Starter).
4. **Existing behavior:** `/custom` (no params), `/custom?productInterest=Canvas%20Tote%20Bag`, `/custom?quantity=500` still work; MOQ &lt; 500 blocks submit; success message after submit.

### After deploy (live)

- Home, /shop, /custom, /products/canvas-tote-bag behave as before (no regressions).
- New: `https://boylebags.com/custom?kit=event-saver` (and other kit ids) prefill Product Interest with the kit name once this change is deployed.
