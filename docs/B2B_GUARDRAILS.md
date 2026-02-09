# B2B Guardrails

Engineering rules to keep the Boyle Bags site B2B-only and consistent across local and production.

## Prohibited retail patterns

- **No add-to-cart** — All conversion flows go to RFQ / quote request, not a cart.
- **No unit or dollar prices** on shop or product listing pages (no “from $X”, price ranges, or per-unit display).
- **No star ratings or reviews** — No review widgets, aggregate scores, or “customer reviews” sections.
- **No “Sold Out”** — Use “Made to Order” or equivalent if availability needs to be stated.
- **No inventory counts** — Do not show “in stock” or numeric stock levels.
- **No quote cart or “add to quote list”** — Single-product RFQ flow only; no multi-product aggregation for quote.

## Required CTAs

- **Shop / product listing:** Primary action is “View Specs & Quote” (or equivalent) linking to a product/RFQ path, not checkout.
- **Product detail / RFQ entry:** Primary CTA is “Request Quote (MOQ Applies)” or “Request Tiered Quote (MOQ Applies)” → `/custom`.
- **Sample intent:** Sub-MOQ or sample requests must route to “Request Sample Pack” / `/sample-pack`, not to the main quote form.

## MOQ language rules

- **Minimum order quantity is 500 units** everywhere it is stated.
- Use consistent phrasing: “MOQ: 500 pcs”, “Minimum order 500 units”, “500-unit minimum”.
- Any quote or form flow must enforce MOQ (e.g. quantity &lt; 500 blocked or redirected to sample pack).
- Footer or shop notice: “All orders are subject to a strict 500-unit minimum to ensure wholesale pricing efficiency. Requests below this threshold cannot be processed.”

## Link conventions

- **Shop listing:** Cards link to product/RFQ via `ctaHref` from `SHOP_KITS` (e.g. `/products/canvas-tote-bag` or future product pages).
- **Main RFQ:** `/custom` — volume quotation request (500+ units).
- **Samples:** `/sample-pack` — for sample requests and sub-MOQ intent.
- **No cart or checkout URLs** — Do not introduce `/cart`, `/checkout`, or retail-style basket routes.

## Data source

- **Shop listing grid:** Single source of truth is `src/lib/shopKits.ts` (`SHOP_KITS`). Use it for both EN and ES shop pages.
- **Product detail pages (PDPs):** May use `content.products` (e.g. `/shop/[slug]`) or product-specific pages (e.g. `/products/canvas-tote-bag`). Do not duplicate kit definitions between `shopKits.ts` and `content.products` for the same purpose; use `shopKits` for the grid only.
