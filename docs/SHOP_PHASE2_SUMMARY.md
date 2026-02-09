# Phase 2 — /shop robust + production-ready

## Root cause (why it ever showed only 2 cards)

- **Single cause:** The card count comes only from `SHOP_KITS` in `src/lib/shopKits.ts`. There is no other data source, no filtering, and no env-based logic for the grid.
- **Historical “2 cards”:** At one point `SHOP_KITS` was defined with only two entries (Event Saver Kit, Retail Ready Kit). Swag Stash Starter was added later. Once the array had three items, both local and production showed three cards. There is no map/keys/undefined bug that drops a card; the only way to see two cards is for `SHOP_KITS` to have length 2 (or one item to be invalid so a key is missing and React skips it — we now assert so that cannot happen silently).

## Files changed

| File | Change |
|------|--------|
| **src/lib/shopKits.ts** | Added `assertShopKits()` run at module load: throws if `SHOP_KITS.length !== 3`, or any kit is missing required fields (`id`, `name`, `description`, `moq`, `pricingModel`, `productionNotes`, `ctaLabel`, `ctaHref`), or `productionNotes` is not an array, or `moq` is not a non-negative number. Replaced the previous dev-only `console.warn` with this hard assertion so build fails if data is wrong. |
| **src/app/shop/page.tsx** | Import `EXPECTED_SHOP_KIT_COUNT`. Added dev-only warning banner: when `NODE_ENV !== 'production'` and `SHOP_KITS.length !== EXPECTED_SHOP_KIT_COUNT`, render an amber banner above the grid; still render all `SHOP_KITS` (no filtering). |
| **src/app/es/shop/page.tsx** | Same dev-only banner and `EXPECTED_SHOP_KIT_COUNT` import as EN shop. |

## Single source of truth

- **Cards:** Rendered only from `SHOP_KITS` via `SHOP_KITS.map((kit) => <ShopKitCard key={kit.id} kit={kit} />)` in both `src/app/shop/page.tsx` and `src/app/es/shop/page.tsx`. No `content.products` or any other array used for the grid.
- **Validation:** `assertShopKits()` runs when `shopKits.ts` is first loaded (e.g. during `next build`). If the array length or any required field is wrong, the build fails.

## How to verify local vs production parity

1. **TypeScript:** `npx tsc --noEmit` — must pass.
2. **Build:** `npm run build` — must pass (assert runs; if `SHOP_KITS` is invalid, build throws).
3. **Dev:** `npm run dev` → open `http://localhost:3001/shop` — must show 3 cards (Event Saver Kit, Retail Ready Kit, Swag Stash Starter). No amber banner (because length is 3).
4. **Prod:** After deploy, `/shop` shows the same 3 cards; no banner in production.
5. **Break test:** Temporarily remove one item from `SHOP_KITS` or delete a required field → `npm run build` should fail with the assertion error.
