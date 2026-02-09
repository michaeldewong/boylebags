# Verification checklist

Use this list to confirm local behavior matches expectations. Run `npm run dev` and open `http://localhost:3001` (or your dev port).

## URLs to check

| URL | What to confirm |
|-----|-----------------|
| **/** | Home: hero headline “Custom Corporate Bags. Delivered On-Spec, On-Time.”; subhead about B2B/volume; primary CTA “Get Tiered Quote (MOQ Applies)” → `/custom`; trust bar at top; no prices, no cart. |
| **/shop** | Shop: hero “Custom Bag Manufacturing – Bulk & Wholesale”; “Wholesale Only” badge; trust layer (Direct Pricing, PMS Color Matching, Global Logistics; Quality Check, Digital Mockups); **exactly 3 kit cards** (Event Saver Kit, Retail Ready Kit, Swag Stash Starter); each card shows name, description, “MOQ: 500 pcs”, “Volume-Based Pricing”, production notes, “View Specs & Quote” button; no prices; footer note about 500-unit minimum. |
| **/custom** | Custom/RFQ: “Volume Quotation Request (500+ Units)”; form with quantity (min 500), delivery date, product interest, application/use, company, work email, etc.; primary CTA “Submit Qualified Quote Request”; no cart, no prices. |
| **/products/canvas-tote-bag** | Product page: “Canvas Tote Bag” headline; B2B use cases, industries, CTA “Request Tiered Quote (MOQ Applies)” and “Request Sample Pack”; no price, no add-to-cart, no reviews. |

## Quick sanity commands

```bash
# TypeScript
npx tsc --noEmit

# Build (must complete without errors)
npm run build
```

## Data consistency

- **Shop grid:** All 3 kits must come from `src/lib/shopKits.ts` (`SHOP_KITS`). EN and ES `/shop` should render the same 3 cards (same source).

## Phase 1 — /shop (local == prod, 3 kits)

1. **Dev server:** `npm run dev` → open `http://localhost:3001/shop` (or your dev port). You should see **3 cards**: Event Saver Kit, Retail Ready Kit, Swag Stash Starter; “Commercial Orders Only” gate; no prices.
2. **Production build:** `npm run build && npm run start` → open `/shop`. Same 3 cards.
3. **Dev warning:** If `SHOP_KITS.length < 3`, the console will show a warning in development only.
