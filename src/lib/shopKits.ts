// src/lib/shopKits.ts
export type ShopKit = {
    id: string
    name: string
    description: string
    moq: number
    pricingModel: string
    productionNotes: string[]
    ctaLabel: string
    ctaHref: string
  }
  
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
      ctaHref: "/products/canvas-tote-bag",
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
      ctaHref: "/products/canvas-tote-bag",
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
      ctaHref: "/products/canvas-tote-bag",
    },
  ]