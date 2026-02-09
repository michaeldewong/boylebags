import { ProductTemplate } from "@/components/ProductTemplate";
import type { Metadata } from "next";

const product = {
  slug: "canvas-tote-bag",
  title: "Canvas Tote Bag",
  metaTitle: "Canvas Tote Bag – Bulk & Wholesale | Boyle Bags",
  metaDescription:
    "Custom canvas tote bags for trade shows, corporate events, retail, and institutional programs. MOQ 500 units. Factory-direct.",
  useCases: [
    "Trade shows and conferences — attendee distribution, booth giveaways",
    "Corporate events and gifts — employee appreciation, onboarding kits, holiday giveaways",
    "Retail and customer loyalty — gift-with-purchase, rewards programs",
    "Nonprofit and fundraising — awareness campaigns, donor appreciation",
    "Educational and institutional — school and university swag, orientation giveaways",
  ],
  industries: [
    "Corporations (marketing, HR, internal comms)",
    "Event organizers and conference producers",
    "Retailers and loyalty program operators",
    "Nonprofits and advocacy organizations",
    "Schools, colleges, and universities",
  ],
};

export const metadata: Metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  alternates: {
    canonical: `/products/${product.slug}`,
  },
};

export default function CanvasToteBagPage() {
  return <ProductTemplate product={product} />;
}
