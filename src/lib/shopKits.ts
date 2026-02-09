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

if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
  if (SHOP_KITS.length < EXPECTED_SHOP_KIT_COUNT) {
    console.warn(
      `[shopKits] Expected at least ${EXPECTED_SHOP_KIT_COUNT} kits; got ${SHOP_KITS.length}. Local may not match production.`
    );
  }
}