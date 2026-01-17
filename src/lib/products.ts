import { content } from "@/content";

export type KitSlug = "event-saver-kit" | "retail-ready-kit" | "swag-stash-starter";

export type AddOnId = "rush" | "retailReady" | "splitShipment" | "insertCard";

export type AddOnsSelection = {
  rush?: boolean;
  retailReady?: boolean;
  splitShipment?: boolean;
  insertCard?: boolean;
};

export type CalcTotalParams = {
  kitSlug: KitSlug;
  qty: number;
  addOns?: AddOnsSelection;
};

export type CalcTotalResult = {
  subtotal: number;
  fees: number;
  total: number;
};

/**
 * Calculate total price for a kit order with add-ons
 */
export function calcTotal({ kitSlug, qty, addOns = {} }: CalcTotalParams): CalcTotalResult {
  const product = content.products.find((p) => p.slug === kitSlug);
  if (!product) {
    throw new Error(`Product not found: ${kitSlug}`);
  }

  // Find the appropriate tier for the quantity
  const tier = product.tiers
    .slice()
    .sort((a, b) => b.qty - a.qty)
    .find((t) => qty >= t.qty) || product.tiers[product.tiers.length - 1];

  const subtotal = tier.unitPrice * qty;

  // Calculate add-on fees
  let fees = 0;

  if (addOns.rush) {
    const rushAddOn = content.addOns.find((a) => a.id === "rush");
    if (rushAddOn && rushAddOn.pricingType === "flat") {
      fees += rushAddOn.price;
    }
  }

  if (addOns.retailReady) {
    const retailReadyAddOn = content.addOns.find((a) => a.id === "retailReady");
    if (retailReadyAddOn && retailReadyAddOn.pricingType === "perBag") {
      fees += retailReadyAddOn.price * qty;
    }
  }

  if (addOns.splitShipment) {
    const splitShipmentAddOn = content.addOns.find((a) => a.id === "splitShipment");
    if (splitShipmentAddOn && splitShipmentAddOn.pricingType === "flat") {
      fees += splitShipmentAddOn.price;
    }
  }

  if (addOns.insertCard) {
    const insertCardAddOn = content.addOns.find((a) => a.id === "insertCard");
    if (insertCardAddOn && insertCardAddOn.pricingType === "perBag") {
      fees += insertCardAddOn.price * qty;
    }
  }

  return {
    subtotal,
    fees,
    total: subtotal + fees,
  };
}
