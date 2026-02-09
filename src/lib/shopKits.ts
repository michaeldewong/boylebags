/**
 * Canonical source for the /shop listing grid.
 * Used by src/app/shop/page.tsx and src/app/es/shop/page.tsx.
 * Local and production must render the same set; expect exactly 3 kits.
 */
export const EXPECTED_SHOP_KIT_COUNT = 3;

export type ShopKit = {
  id: string;
  name: string;
  description: string;
  moq: number;
  pricingModel: string;
  productionNotes: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const SHOP_KITS: ShopKit[] = [
  {
    id: "event-saver",
    name: "Event Saver Kit",
    description: "Fast-turn solution for events and promotions",
    moq: 500,
    pricingModel: "Volume-Based Pricing",
    productionNotes: [
      "1-color or DTF depending on material",
      "Optimized for speed & budget",
    ],
    ctaLabel: "View Specs & Quote",
    ctaHref: "/custom?kit=event-saver",
  },
  {
    id: "retail-ready",
    name: "Retail Ready Kit",
    description: "Premium finish for retail environments",
    moq: 500,
    pricingModel: "Volume-Based Pricing",
    productionNotes: [
      "Premium screen print or embroidery",
      "Higher QC standards",
    ],
    ctaLabel: "View Specs & Quote",
    ctaHref: "/custom?kit=retail-ready",
  },
  {
    id: "swag-stash-starter",
    name: "Swag Stash Starter",
    description: "Program-friendly starter kit",
    moq: 500,
    pricingModel: "Volume-Based Pricing",
    productionNotes: [
      "Standard screen print",
      "Program pricing available",
      "Reorder-friendly workflow",
    ],
    ctaLabel: "View Specs & Quote",
    ctaHref: "/custom?kit=swag-stash-starter",
  },
];

const REQUIRED_KIT_KEYS: (keyof ShopKit)[] = [
  "id",
  "name",
  "description",
  "moq",
  "pricingModel",
  "productionNotes",
  "ctaLabel",
  "ctaHref",
];

function assertShopKits(): void {
  if (SHOP_KITS.length !== EXPECTED_SHOP_KIT_COUNT) {
    throw new Error(
      `[shopKits] SHOP_KITS must have exactly ${EXPECTED_SHOP_KIT_COUNT} items; got ${SHOP_KITS.length}. Fix src/lib/shopKits.ts.`
    );
  }
  for (let i = 0; i < SHOP_KITS.length; i++) {
    const kit = SHOP_KITS[i];
    for (const key of REQUIRED_KIT_KEYS) {
      const val = kit[key];
      if (val === undefined || val === null) {
        throw new Error(
          `[shopKits] Kit at index ${i} (id: ${kit.id}) missing required field: ${key}`
        );
      }
    }
    if (!Array.isArray(kit.productionNotes)) {
      throw new Error(
        `[shopKits] Kit at index ${i} (id: ${kit.id}) productionNotes must be an array`
      );
    }
    if (typeof kit.moq !== "number" || kit.moq < 0) {
      throw new Error(
        `[shopKits] Kit at index ${i} (id: ${kit.id}) moq must be a non-negative number`
      );
    }
  }
}

assertShopKits();